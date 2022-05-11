const { Schema, model } = require('mongoose')
const PositionSchema = Schema({
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
PositionSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model( 'Position', PositionSchema );