const { response } = require('express');
const { revForum } = require('../models');

const getRevForums = async (req, res = response) => {
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, revForums] = await Promise.all([
        Forum.countDocuments(query),
        Forum.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        revForums
    })
};
const getRevForum = async (req, res = response) => {
    const { id } = req.params;
    const revForum = await revForum.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
    res.json(revForum);
};
const createRevForum = async (req, res = response) => {

    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const revForumDB = await revForum.findOne().sort({ '_id': -1 }).limit(1);
    const code = revForumDB.code + 1;
    // Generate DATA
    const data = {
        ...body,
        code,
        storage: req.user.storage,
        name: req.body.name.toUpperCase(),
        user: req.user._id
    }
    const revForum = new revForum(data);
    // Save DB
    await forum.save();
    res.status(201).json(revForum);
}
const updateRevForum = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedRevForum = await revForum.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedRevForum)
}
const deleteRevForum = async (req, res = response) => {
    const { id } = req.params;
    const deletedRevForum = await revForum.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedRevForum)
}
module.exports = {
    createRevForum,
    getRevForum,
    getRevForums,
    updateRevForum,
    deleteRevForum
}