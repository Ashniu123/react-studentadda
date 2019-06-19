const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema(
  {
    pageno: {
      type: Number,
      required: [true, 'pageno is required']
    },
    objectref: {
      type: String,
      required: [true, 'objectref is required']
    }
  },
  {
    timestamps: true
  }
);

const setsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#9c27b0'
    },
    notes: {
      type: [notesSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('set', setsSchema);
