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
    userRevisor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    dateAc: {
        type: Date,
        required: true
    },
    newDate: {
        type: Date,
        required: true
    },
    dateFormat: {
        type: String,
        required: true
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
    taskName: {
        type: String,
        required: true,
    },
    revisorTask: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
    },
    question1: {
        type: String,
        required: true,
    },
    question2: {
        type: String,
        required: true,
    },
    question3: {
        type: String,
        required: true,
    },
    question4: {
        type: String,
        required: true,
    },
    question5: {
        type: String,
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
        default: "PENDIENTE",
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
    riesgosCriticos: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    controlesCriticos: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    cumplenControles: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    trabControles: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    contestaronPreguntas: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    todosTrabajadores: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    todosIntegrantes: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    supervisorTitular: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    fueronCorregidas: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    oportunidadesEncontradas: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    fortalezaODP: {
        type: String,
        default: "pendiente",
        required: true,
    },
    yesCounter: {
        type: String,
        default: 'pendiente',
        required: true,
    },
    calidad: {
        type: String,
        default: 'pendiente',
        required: true,
    },
});
ForumSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model('Forum', ForumSchema);