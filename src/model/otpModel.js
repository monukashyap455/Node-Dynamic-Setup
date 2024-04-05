import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      require: true,
    },
    expireTime: {
      type: Date,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("otp", otpSchema);
