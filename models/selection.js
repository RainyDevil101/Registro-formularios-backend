const { Schema, model } = require('mongoose')
const SelectionSchema = Schema({
  name: {
      type: String,
      required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  storage: {
    type: Schema.Types.ObjectId,
    ref: 'Storage',
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
SelectionSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}
module.exports = model( 'Selection', SelectionSchema );