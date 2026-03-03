import express from "express";
import listing from "./routes/listing.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React app
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use("/listing", listing);
const PORT = 8080;

app.get("/", (req, res) => {
  res.send(`Hello`);
});

app.listen(PORT, () => {
  console.log(`[Server] :: Server is running at http://localhost:${PORT}`);
});
