const { response } = require('express');
const { Storage } = require('../models');
const getStorages = async (req, res = response) => {
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, storages] = await Promise.all([
        Storage.countDocuments(query),
        Storage.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        storages
    })
};
const getStorage = async (req, res = response) => {
    const { id } = req.params;
    const storage = await Storage.findById(id).where('status').equals(true)
        .populate('user', 'name')
    res.json(storage);
};
const createStorage = async (req, res = response) => {
    const { user, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const storageNameDB = await Storage.findOne({ name });
    const storageDB = await Storage.findOne().sort({ '_id': -1 }).limit(1);
    const code = storageDB.code + 1;
    if (storageNameDB) {
        return res.status(400).json({
            msg: `La entrada "${storageNameDB.name}" ya se encuentra registrada.`
        })
    }
    // Generate DATA
    const data = {
        ...body,
        code,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }
    const storage = new Storage(data);
    // Save DB
    await storage.save();
    res.status(201).json(storage);
}
const updateStorage = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;
    const updatedStorage = await Storage.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedStorage)
}
const deleteStorage = async (req, res = response) => {
    const { id } = req.params;
    const deletedStorage = await Storage.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedStorage)
}
module.exports = {
    createStorage,
    getStorage,
    getStorages,
    updateStorage,
    deleteStorage
}