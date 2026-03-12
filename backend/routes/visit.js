import { Router } from "express";
import { authMiddleware, requireAdmin } from "../middlewares/authMiddleware.js";
import Visit from "../models/Visit.js";

const visit = Router();

visit.post("/request", authMiddleware, async (req, res) => {
  try {
    const { listingId, visitDate } = req.body;

    if (!listingId || !visitDate)
      return res
        .status(400)
        .json({ message: "listingId and visitDate required", success: false });

    const existing = await Visit.findOne({
      tenant: req.user._id,
      listing: listingId,
      status: { $in: ["Requested", "Scheduled"] },
    });

    if (existing)
      return res.status(409).json({
        message: "Visit already requested for this listing",
        success: false,
      });

    const newVisit = await Visit.create({
      tenant: req.user._id,
      listing: listingId,
      visibleDate: new Date(visitDate),
      status: "Requested",
    });
    return res.status(201).json({ data: newVisit, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

visit.get("/visits", authMiddleware, async (req, res) => {
  try {
    const visits = await Visit.find({ tenant: req.user._id }).populate(
      "listing",
      "title address price images",
    );

    return res.status(200).json({ data: visits, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

visit.get("/all", requireAdmin, authMiddleware, async (req, res) => {
  try {
    const visits = await Visit.find()
      .populate("tenant", "name email")
      .populate("listing", "title address");

    return res.status(200).json({ data: visits, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

visit.patch("/:id/status", requireAdmin, authMiddleware, async (req, res) => {
  try {
    const { status, adminNotes, visitDate } = req.body;
    const validStatuses = ["Requested", "Scheduled", "Visited", "Decision"];

    if (!validStatuses.includes(status))
      return res
        .status(400)
        .json({ message: "Invalid status", success: false });

    const updated = await Visit.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(adminNotes && { adminNotes }),
        ...(visitDate && { visitDate }),
      },
      { new: true },
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Visit not found", success: false });

    return res.status(200).json({ data: updated, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

export default visit;
