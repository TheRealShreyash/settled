import { Router } from "express";
import Listing from "../models/Listing.js";
import { authMiddleware, requireAdmin } from "../middlewares/authMiddleware.js";

const listing = Router();

listing.get("/list", async (req, res) => {
  try {
    let filters = { status: "Published" };

    if (req.query.state) {
      filters["address.state"] = req.query.state;
    }
    if (req.query.city) {
      filters["address.city"] = req.query.city;
    }
    if (req.query.price) {
      filters.price = { $lte: req.query.price };
    }

    const results = await Listing.find(filters);
    return res.status(200).json({ data: results, success: true });
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }
});

listing.post("/", requireAdmin, authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      price,
      images,
      amenities,
      availableFrom,
    } = req.body;

    const listing = await Listing.create({
      title,
      description,
      address,
      price,
      images: images || [],
      amenities: amenities || [],
      availableFrom: new Date(availableFrom),
      owner: req.user._id,
      status: "Draft",
    });

    return res.status(201).json({ data: newListing, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

listing.get("/:id", async (req, res) => {
  try {
    const result = await Listing.findById(req.params.id);

    if (!result)
      res.status(404).json({ message: "Listing not found", success: false });

    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

listing.patch("/:id/status", requireAdmin, authMiddleware, async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true },
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Listing not found", success: false });

    res.status(200).json({ data: updated, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default listing;
