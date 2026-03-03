import mongoose from "mongoose";
const { Schema, model } = mongoose;

const leaseSchema = new Schema(
  {
    tenant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
    inventoryList: [
      {
        item: { type: String }, // e.g., "Air Conditioner"
        condition: { type: String, default: "Good" },
        isVerifiedByTenant: { type: Boolean, default: false },
      },
    ],
    documentsStatus: {
      agreementSigned: { type: Boolean, default: false },
      depositPaid: { type: Boolean, default: false },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    extensionStatus: {
      type: String,
      enum: ["None", "Requested", "Approved", "Denied"],
      default: "None",
    },
    requestedNewEndDate: { type: Date },
  },
  { timestamps: true },
);

const Lease = model("Lease", leaseSchema);
export default Lease;
