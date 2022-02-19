const { response } = require('express');
const { Selection } = require('../models');

const getSelections = async (req, res = response) => {
    
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, selections] = await Promise.all([
        Selection.countDocuments(query).where('storage').equals(req.user.storage),
        Selection.find(query).where('storage').equals(req.user.storage)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        selections
    })
};
const getSelection = async (req, res = response) => {
    const { id } = req.params;
    const selection = await Selection.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
    res.json(selection);
};
const createSelection = async (req, res = response) => {
    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const selectionNameDB = await Selection.findOne({ name });
    const selectionDB = await Selection.findOne().sort({ '_id': -1 }).limit(1);
    const code = selectionDB.code + 1;
    if (selectionNameDB) {
        return res.status(400).json({
            msg: `La opción "${selectionNameDB.name}" ya se encuentra registrada.`
        })
    }
    // Generate DATA
    const data = {
        ...body,
        code,
        storage: req.user.storage,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }
    const selection = new Selection(data);
    // Save DB
    await selection.save();
    res.status(201).json(selection);
}
const updateSelection = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedSelection = await Selection.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedSelection)
}
const deleteSelection = async (req, res = response) => {
    const { id } = req.params;
    const deletedSelection = await Option.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedSelection)
}
module.exports = {
    createSelection,
    getSelection,
    getSelections,
    updateSelection,
    deleteSelection
}