const { Schema, model } = require('mongoose')
const QuestionSchema = Schema({
  name: {
      type: String,
      required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  selection: {
    type: String,
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
  }
});
QuestionSchema.methods.toJSON = function() {
  const { __v, status, ...data } = this.toObject();
  return data;
}
module.exports = model( 'Question', QuestionSchema );