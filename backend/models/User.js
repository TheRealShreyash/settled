import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "tenant"],
      default: "tenant",
    },

    moveInProcess: {
      documents: {
        idProof: { type: String }, // URL to image/pdf
        agreement: { type: String }, // URL to signed doc
      },
      isVerified: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
