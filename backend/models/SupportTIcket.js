import mongoose from "mongoose";
const { Schema, model } = mongoose;

const supportTicketSchema = new Schema(
  {
    tenant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    listing: { type: Schema.Types.ObjectId, ref: "Listing" },
    subject: { type: String, required: true },
    category: {
      type: String,
      enum: ["Maintenance", "Billing", "Extension", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open",
    },

    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

const SupportTicket = model("SupportTicket", supportTicketSchema);
export default SupportTicket;
