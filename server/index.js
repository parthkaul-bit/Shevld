// console.log("Open Notion");
// console.log("Make todo list");

/* 
todo make the  Grocery list API
*4. Grocery List*

- **GET /api/grocery-list/:flatId**: Retrieve the grocery list for a specific flat.
- **POST /api/grocery-list/:flatId**: Add an item to the grocery list.
- **PUT /api/grocery-list/:flatId/:itemId**: Update an item in the grocery list.
- **DELETE /api/grocery-list/:flatId/:itemId**: Remove an item from the grocery list.
- POST /api/grocery-list/:flatId/purchase: Mark items as purchased and add them to the kitchen
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const groceryRoutes = require("./routes/groceryRoute");
const flatRoutes = require("./routes/flatRoute");
const kitchenRoutes = require("./routes/kitchenRoute");

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
app.use("/api/flats", flatRoutes);
app.use("/api/kitchen", kitchenRoutes);

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
