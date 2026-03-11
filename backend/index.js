import express from "express";
import cors from "cors";
import { connectDb } from "./lib/connectDb.js";
import listing from "./routes/listing.js";
import auth from "./routes/auth.js";

const app = express();

(async () => {
  await connectDb();
})();

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use("/listing", listing);
app.use("/auth", auth);
const PORT = 8080;

app.get("/", async (req, res) => {
  res.send(`Hello`);
});

app.listen(PORT, () => {
  console.log(`[Server] :: Server is running at http://localhost:${PORT}`);
});
