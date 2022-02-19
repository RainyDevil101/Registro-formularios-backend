const { Schema, model } = require('mongoose')
const ForumSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateAc: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    run: {
        type: String,
        required: true,
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    question1: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    question2: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    question3: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    question4: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    question5: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    obligation: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    statusForum: {
        type: String,
        required: true,
        default: "pending",
    },
    controls: {
        type: Boolean,
        required: true,
    },
    postControl: {
        type: String,
    },
    imgAn: {
        type: String,
        required: true,
    },
    imgRe: {
        type: String,
        required: true,
    },
});
ForumSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model('Forum', ForumSchema);