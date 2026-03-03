import mongoose from "mongoose";
const { Schema, model } = mongoose;

const visitSchema = new Schema({
  tenant: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  listing: { 
    type: Schema.Types.ObjectId, 
    ref: "Listing", 
    required: true 
  },

  status: {
    type: String,
    enum: ["Requested", "Scheduled", "Visited", "Decision"],
    default: "Requested"
  },

  visitDate: { 
    type: Date, 
    required: true 
  },
  adminNotes: { type: String },
  tenantDecision: {
    type: String,
    enum: ["Pending", "Interested", "Not Interested"],
    default: "Pending"
  }
}, { timestamps: true });

const Visit = model("Visit", visitSchema);
export default Visit;