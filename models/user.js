
const { Schema, model } = require( 'mongoose' );
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true]
    },
    role: {
        type: String,
        required: [true],
        emun: ['SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE']
    },
    position: {
        type: String,
        required: true,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model( 'User', UserSchema )