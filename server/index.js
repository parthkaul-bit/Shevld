console.log("Open Notion");
console.log("Make todo list");

/* 
todo make the  Groceries DB API
Groceries Table

| **Field** | **Type** | **Description** |
| --- | --- | --- |
| `_id` | ObjectId | Unique identifier for the grocery item |
| `name` | String | Name of the grocery item |
| `imageUrl` | String | URL for the grocery item image | // this is fetched from unsplash api.
| `purchaseDate` | Date | The date when the grocery was purchased |
| `shelfLife` | Number | Estimated shelf life in days | // fetched from an third party API
| `createdAt` | Date | Date when the grocery item was added |

GET /api/groceries: Retrieve a list of groceries.
POST /api/groceries: Add a new grocery item.
GET /api/groceries/:id: Retrieve a specific grocery item by ID.
*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const groceryRoutes = require("./routes/groceryRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/groceries", groceryRoutes);

// Default route
app.get("/", (req, res) => {
  res.json(`Welcome to the Shelvd API`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
