const { response } = require('express');
const { Forum } = require('../models');
const getForums = async (req, res = response) => {
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, forums] = await Promise.all([
        Forum.countDocuments(query).where('statusForum').equals("PENDIENTE"),
        Forum.find(query).where('statusForum').equals("PENDIENTE")
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        forums
    })
};
const getForum = async (req, res = response) => {
    const { id } = req.params;
    const forum = await Forum.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
        .populate('position', 'name')
        .populate('task', 'name')
    res.json(forum);
};
const createForum = async (req, res = response) => {

    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const forumDB = await Forum.findOne().sort({ '_id': -1 }).limit(1);
    const code = forumDB.code + 1;
    // Generate DATA
    const data = {
        ...body,
        code,
        storage: req.user.storage,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }
    const forum = new Forum(data);
    // Save DB
    await forum.save();
    res.status(201).json(forum);
}
const updateForum = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedForum = await Forum.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedForum)
}
const deleteForum = async (req, res = response) => {
    const { id } = req.params;
    const deletedForum = await Forum.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedForum)
}
module.exports = {
    createForum,
    getForum,
    getForums,
    updateForum,
    deleteForum
}