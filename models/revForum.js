const { Schema, model } = require('mongoose')
const revForumSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    revUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateAc: {
        type: Date,
        default: Date.now,
        required: true,
    },
    revDate: {
        type: Boolean,
        required: true,
    },
    revRun: {
        type: Boolean,
        required: true,
    },
    revPosition: {
        type: Boolean,
        required: true,
    },
    revTask: {
        type: Boolean,
        required: true,
    },
    revQuestion1: {
        type: Boolean,
        required: true,
    },
    revQuestion2: {
        type: Boolean,
        required: true,
    },
    revQuestion3: {
        type: Boolean,
        required: true,
    },
    revQuestion4: {
        type: Boolean,
        required: true,
    },
    revQuestion5: {
        type: Boolean,
        required: true,
    },
    revObligation: {
        type: Boolean,
        required: true,
    },
    revStatus: {
        type: Boolean,
        default: true,
        required: true,
    },
    revStatusForum: {
        type: String,
        required: true,
        default: "REVISADO",
    },
    revControls: {
        type: Boolean,
        required: true,
    },
    revPostControl: {
        type: Boolean
    },
    revImgAn: {
        type: Boolean,
        required: true,
    },
    revImgRe: {
        type: Boolean,
        required: true,
    },
});
revForumSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model('revForum', revForumSchema);