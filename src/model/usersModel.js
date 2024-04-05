import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
    },
    name: {
      require: true,
      type: String,
    },
    fatherName: {
      type: String,
    },
    mobileNumber: {
      type: String,
      require: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      require: true,
      type: String,
      select: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    numberVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, autoIndex: false }
);

export default mongoose.model("user", usersSchema);
