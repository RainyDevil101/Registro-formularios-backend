const { Schema, model } = require('mongoose');
const UbicationSchema = Schema({
    name: {
        type: String,
        required: true
    },
    ubicationCode: {
        type: Number,
        default: undefined,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})
UbicationSchema.methods.toJSON = function() {
    const { __v, status, ...data } = this.toObject();
    return data;
}
module.exports = model( 'Ubication', UbicationSchema )