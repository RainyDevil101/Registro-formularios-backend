
const { Schema, model } = require( 'mongoose' );
const UserSchema = Schema({
    name: {
        type: String,
        required: [true]
    },
    mail: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'CONSULTOR_ROLE', 'VIEWER_ROLE']
    },
    storage: {
        type: Schema.Types.ObjectId,
        ref: 'Storage',
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