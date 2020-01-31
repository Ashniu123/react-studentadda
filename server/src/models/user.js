const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
      }
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email_id is required"],
    },
    avatar: {
      type: String,
      default: "",
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "event",
      }
    ],
    sets: [
      {
        type: Schema.Types.ObjectId,
        ref: "set",
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
