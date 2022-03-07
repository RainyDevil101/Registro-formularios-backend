const { response } = require('express');
const { Position } = require('../models');

const getPositions = async (req, res = response) => {
    
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, positions] = await Promise.all([
        Position.countDocuments(query),
        Position.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        positions
    })
};
const getPosition = async (req, res = response) => {
    const { id } = req.params;
    const position = await Position.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
    res.json(position);
};
const createPosition = async (req, res = response) => {
    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const positionNameDB = await Position.findOne({ name });
    const positionDB = await Position.findOne().sort({ '_id': -1 }).limit(1);
    const code = positionDB.code + 1;
    if (positionNameDB) {
        return res.status(400).json({
            msg: `La entrada "${positionNameDB.name}" ya se encuentra registrada.`
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
    const position = new Position(data);
    // Save DB
    await position.save();
    res.status(201).json(position);
}
const updatePosition = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedPosition = await Position.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedPosition)
}
const deletePosition = async (req, res = response) => {
    const { id } = req.params;
    const deletedPosition = await Position.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedPosition)
}
module.exports = {
    createPosition,
    getPosition,
    getPositions,
    updatePosition,
    deletePosition
}