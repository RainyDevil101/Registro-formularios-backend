const { response } = require('express');
const { Question } = require('../models');

const getQuestions = async (req, res = response) => {
    
    const { limit = 100000, from = 0 } = req.query;
    const query = { status: true };
    const [total, questions] = await Promise.all([
        Question.countDocuments(query).where('storage').equals(req.user.storage),
        Question.find(query).where('storage').equals(req.user.storage)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
            .sort({ 'name': 1 })
    ]);
    res.json({
        total,
        questions
    })
};
const getQuestion = async (req, res = response) => {
    const { id } = req.params;
    const question = await Question.findById(id).where('status').equals(true)
                                                .where('storage').equals(req.user.storage)
        .populate('user', 'name')
    res.json(question);
};
const createQuestion = async (req, res = response) => {
    const { user, storage, ...body } = req.body;
    const name = req.body.name.toUpperCase();
    const questionNameDB = await Question.findOne({ name });
    const questionDB = await Question.findOne().sort({ '_id': -1 }).limit(1);
    const code = questionDB.code + 1;
    if (questionNameDB) {
        return res.status(400).json({
            msg: `La entrada "${questionNameDB.name}" ya se encuentra registrada.`
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
    const question = new Question(data);
    // Save DB
    await question.save();
    res.status(201).json(question);
}
const updateQuestion = async (req, res = response) => {
    const { id } = req.params;
    const { status, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.storage = req.user.storage;
    data.user = req.user._id;
    const updatedQuestion = await Question.findByIdAndUpdate(id, data, { new: true });
    res.json(updatedQuestion)
}
const deleteQuestion = async (req, res = response) => {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndUpdate(id, { status: false }, { new: true });
    res.json(deletedQuestion)
}
module.exports = {
    createQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion
}