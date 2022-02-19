const { response } = require('express');
const { Task } = require('../models');

const getTasks = async (req, res = response) => {

    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, tasks] = await Promise.all([
        Task.countDocuments(query).where('storage').equals(req.user.storage),
        Task.find(query).where('storage').equals(req.user.storage)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        tasks
    })
};

const getTask = async (req, res = response) => {

    const { id } = req.params;
    const task = await Task.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
    res.json(task);
};

const createTask = async (req, res = response) => {

    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const taskNameDB = await Task.findOne({ name });
    const taskDB = await Task.findOne().sort({ '_id': -1 }).limit(1);
    const code = taskDB.code + 1;
    if (taskNameDB) {
        return res.status(400).json({
            msg: `La faena "${taskNameDB.name}" ya se encuentra registrada.`
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
    const task = new Task(data);
    // Save DB
    await task.save();
    res.status(201).json(task);
}
const updateTask = async (req, res = response) => {

    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedTask)
}
const deleteTask = async (req, res = response) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedTask)
}
module.exports = {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
}