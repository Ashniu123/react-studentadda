const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  start: {
    type: Date,
    required: [true, 'start Date is required']
  },
  end: {
    type: Date,
    required: [true, 'end Date is required']
  },
  dow: {
    // days of week ~ selectedDays
    type: [Number],
    default: []
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('event', eventSchema);
