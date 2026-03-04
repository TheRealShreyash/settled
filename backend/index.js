import express from "express";
import listing from "./routes/listing.js";
import { connectDb } from "./lib/connectDb.js";
import cors from "cors";
import Listing from "./models/Listing.js";

const app = express();

(async () => {
  await connectDb();
})();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React app
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use("/listing", listing);
const PORT = 8080;

app.get("/", async (req, res) => {
  res.send(`Hello`);

  // const data = {
  //   title: "Ashray Flats",
  //   description: "Ashray Flats, Indira Circle",
  //   address: {
  //     street: "address1",
  //     city: "ahmedabad",
  //     state: "gujarat",
  //     pincode: 382475,
  //   },
  //   price: 20000,
  //   status: "Published",
  //   images: [
  //     "https://unsplash.com/photos/rows-of-traditional-wooden-balconies-on-a-white-building-EFbTG8dRyYc",
  //   ],
  //   amenities: [],
  //   availableFrom: new Date(),
  // };

  // await Listing.create(data);
});

app.listen(PORT, () => {
  console.log(`[Server] :: Server is running at http://localhost:${PORT}`);
});
