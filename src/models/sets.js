const mongoose = require("mongoose");

const { Schema } = mongoose;

const setsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#9c27b0",
    },
    notes: {
      type: [
        {
          type: String,
          required: [true, "page is required"],
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("set", setsSchema);
