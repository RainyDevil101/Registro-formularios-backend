const { response } = require('express');
const { Forum, Task } = require('../models');
const { getDayMonthYear } = require('../helpers/DateFormat')

const getForums = async (req, res = response) => {
    const { limit = 90000000000, from = 0 } = req.query;
    const query = { status: true };
    const forums = await 
        Forum.find(query)
            .populate('user', 'name')
            .populate('position', 'name')
            .populate('task', 'name')
            .populate('userRevisor', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'newDate': 1 })
    
    res.json({
        forums
    })
};
const getForum = async (req, res = response) => {
    const { id } = req.params;
    const forum = await Forum.findById(id).where('status').equals(true)
                                                
        .populate('user', 'name')
        .populate('position', 'name')
        .populate('task', 'name')
        .populate('userRevisor', 'name')
        
    res.json(forum);
};
const createForum = async (req, res = response) => {

    const { user, task,...body } = req.body;

    const newDate = new Date()

    const dateFormat = newDate.toISOString().slice(0, 10)
    
    const getTaskName = await Task.findById(req.user.task).where('status').equals(true)

    const taskName = getTaskName.name

    const forumDB = await Forum.findOne().sort({ '_id': -1 }).limit(1);
    const code = forumDB.code + 1;
    // Generate DATA
    const data = {
        ...body,
        code,
        newDate,
        dateFormat,
        taskName,
        task: req.user.task,
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
    const { status, userRevisor, revisorTask, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.revisorTask = req.user.task;
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