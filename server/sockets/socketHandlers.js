const groceryModel = require("../models/groceryModel");

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle WebSocket events here, such as:
    socket.on("joinFlat", (flatId) => {
      socket.join(flatId);
      console.log(`User ${socket.id} joined flat ${flatId}`);
    });

    // In your handleSocketConnection function
    socket.on("addGrocery", async (flatId, groceryItem) => {
      try {
        // Logic to add grocery to the database
        const newGrocery = await groceryModel.create({
          name: groceryItem.name,
          quantity: groceryItem.quantity,
          expiryDate: groceryItem.expiryDate,
          flatId: flatId, // Make sure to link the grocery to the right flat
        });

        // Notify all members of the flat
        io.to(flatId).emit("groceryAdded", newGrocery);
        console.log(`User ${socket.id} added grocery:`, newGrocery);
      } catch (error) {
        console.error("Error adding grocery:", error);
      }
    });

    // Example function to get expiring groceries
    const getExpiringGroceries = async () => {
      const currentDate = new Date();
      const expiringGroceries = await Grocery.find({
        expiryDate: {
          $lt: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        }, // Expiring in 3 days
      });

      return expiringGroceries;
    };

    // Set an interval to notify users about expiring groceries
    setInterval(async () => {
      const expiringGroceries = await getExpiringGroceries();

      expiringGroceries.forEach((grocery) => {
        io.to(grocery.flatId).emit("expiringGroceryNotification", grocery);
        console.log(`Notified users about expiring grocery:`, grocery);
      });
    }, 86400000); // Check every 24 hours

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

module.exports = { handleSocketConnection };
