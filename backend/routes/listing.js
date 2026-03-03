import { Router } from "express";
import Listing from "../models/Listing.js";

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
    res.status(200).json({ data: results, success: false });
  } catch (error) {
    res.status(500).json({ error: error, success: false });
  }
});

export default listing;
