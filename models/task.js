const { Schema, model } = require('mongoose')
const TaskSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        default: undefined,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
});
TaskSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model( 'Task', TaskSchema );