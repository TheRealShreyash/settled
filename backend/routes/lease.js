import { Router } from "express";
import Lease from "../models/Lease.js";
import { requireAuth, authMiddleware } from "../middleware/auth.js";

const lease = Router();

lease.post("/", requireAuth, authMiddleware, async (req, res) => {
  try {
    const { tenantId, listingId, startDate, endDate, inventoryList } = req.body;

    const newLease = await Lease.create({
      tenant: tenantId,
      listing: listingId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      inventoryList: inventoryList || [],
    });

    return res.status(201).json({ data: newLease, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

lease.get("/leases", authMiddleware, async (req, res) => {
  try {
    const leaseData = await Lease.findOne({ tenant: req.user._id }).populate(
      "listing",
      "title address images amenities",
    );

    if (!leaseData)
      return res
        .status(404)
        .json({ message: "No lease found", success: false });

    return res.status(200).json({ data: leaseData, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

lease.patch("/:id/documents", authMiddleware, async (req, res) => {
  try {
    const { agreementSigned, depositPaid } = req.body;

    const updated = await Lease.findOneAndUpdate(
      { _id: req.params.id, tenant: req.user.userId },
      {
        "documentsStatus.agreementSigned": agreementSigned,
        "documentsStatus.depositPaid": depositPaid,
      },
      { new: true },
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Lease not found", success: false });

    res.status(200).json({ data: updated, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default lease;
