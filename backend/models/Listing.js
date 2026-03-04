import mongoose from "mongoose";
const { Schema, model } = mongoose;

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Draft", "Review", "Published"],
      default: "Draft",
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    availableFrom: { type: Date, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // changed for testing
    },
  },
  { timestamps: true },
);

const Listing = model("Listing", listingSchema);
export default Listing;
