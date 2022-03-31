const { response } = require('express');
const { Forum } = require('../models');
const { getDayMonthYear } = require('../helpers/DateFormat')

const getForums = async (req, res = response) => {
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, forums] = await Promise.all([
        Forum.countDocuments(query),
        Forum.find(query)
            .populate('user', 'name')
            .populate('position', 'name')
            .populate('task', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'newDate': 1 })
    ]);
    res.json({
        total,
        forums
    })
};
const getForum = async (req, res = response) => {
    const { id } = req.params;
    const forum = await Forum.findById(id).where('status').equals(true)
                                                
        .populate('user', 'name')
        .populate('position', 'name')
        .populate('task', 'name')
        
    res.json(forum);
};
const createForum = async (req, res = response) => {

    const { user, storage, ...body } = req.body;

    const newDate = new Date()


    const result = getDayMonthYear(newDate)

    const dayList = result.day
    const monthList = result.month
    const yearList = result.yearDay

    const forumDB = await Forum.findOne().sort({ '_id': -1 }).limit(1);
    const code = forumDB.code + 1;
    // Generate DATA
    const data = {
        ...body,
        code,
        newDate,
        dayList,
        monthList,
        yearList,
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
    const { status, userRevisor, revisorStorage, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.revisorStorage = req.user.storage;
    data.userRevisor = req.user._id;
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