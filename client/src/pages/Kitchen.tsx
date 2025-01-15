// import React, { useState, useEffect } from "react";
// import KitchenItemCard from "./KitchenItemCard";
// import { KitchenItem, GroceryItem } from "@/types";
// import axios from "axios";

// const Kitchen: React.FC = () => {
//   const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([]);
//   const flatId = "66ed4eace6e016afe0a5d474";

//   // Fetch Kitchen Items
//   const fetchKitchenItems = async () => {
//     try {
//       const response = await axios.get<KitchenItem[]>(
//         `http://localhost:8080/api/kitchen/${flatId}`
//       );
//       setKitchenItems(response.data);
//     } catch (error) {
//       console.error("Error fetching kitchen items:", error);
//     }
//   };

//   // Add Kitchen Item
//   const addKitchenItem = async (grocery: GroceryItem) => {
//     try {
//       const newItem = {
//         flatId,
//         groceries: [grocery],
//       };

//       const response = await axios.post<KitchenItem>(
//         `http://localhost:8080/api/kitchen/${flatId}`,
//         newItem
//       );
//       setKitchenItems((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error("Error adding kitchen item:", error);
//     }
//   };

//   // Update Kitchen Item
//   const updateKitchenItem = async (updatedItem: KitchenItem) => {
//     try {
//       const response = await axios.put<KitchenItem>(
//         `http://localhost:8080/api/kitchen/${flatId}/${updatedItem._id}`,
//         updatedItem
//       );

//       setKitchenItems((prev) =>
//         prev.map((item) =>
//           item._id === updatedItem._id
//             ? { ...item, groceries: response.data.groceries }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Error updating kitchen item:", error);
//     }
//   };

//   // Delete Grocery from Kitchen Item
//   const deleteKitchenItem = async (
//     kitchenItemId: string,
//     groceryId: string
//   ) => {
//     try {
//       await axios.delete(
//         `http://localhost:8080/api/kitchen/${flatId}/${kitchenItemId}/${groceryId}`
//       );
//       setKitchenItems((prev) =>
//         prev.map((item) =>
//           item._id === kitchenItemId
//             ? {
//                 ...item,
//                 groceries: item.groceries.filter((g) => g._id !== groceryId),
//               }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error("Error deleting grocery item:", error);
//     }
//   };

//   useEffect(() => {
//     fetchKitchenItems();
//   }, []);
//   {
//     console.log(kitchenItems);
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 font-inter">
//       <div className="container mx-auto p-4 sm:p-6 pb-24 max-w-6xl">
//         <header className="mb-8">
//           <h1 className="text-3xl font-semibold text-green-700">Our Kitchen</h1>
//         </header>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {kitchenItems.map((item) =>
//             item.groceries.map((grocery) => (
//               <KitchenItemCard
//                 key={grocery._id}
//                 _id={grocery._id}
//                 quantity={grocery.quantity}
//                 expirationDate={grocery.expirationDate}
//                 imageUrl={grocery.imageUrl}
//                 onDelete={() => deleteKitchenItem(item._id, grocery._id)}
//                 onUpdate={(updatedGrocery) =>
//                   updateKitchenItem({
//                     ...item,
//                     groceries: item.groceries.map((g) =>
//                       g._id === updatedGrocery._id
//                         ? {
//                             ...g, // Keep existing properties
//                             groceryId: g.groceryId, // Ensure groceryId is included
//                             addedBy: g.addedBy, // Ensure addedBy is included
//                             addedAt: g.addedAt, // Ensure addedAt is included
//                             ...updatedGrocery, // Update with new values
//                           }
//                         : g
//                     ),
//                   })
//                 }
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Kitchen;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fetchKitchenItems,
  addKitchenItem,
  updateKitchenItem,
  deleteKitchenItem,
} from "../utils/kitchenUtils";
import KitchenItemCard from "./KitchenItemCard";
import { KitchenItem } from "../types";

const Kitchen: React.FC<{ flatId: string }> = ({ flatId }) => {
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([]);
  useEffect(() => {
    const loadKitchenItems = async () => {
      try {
        const items = await fetchKitchenItems(flatId);
        setKitchenItems(items);
      } catch (error) {
        console.error("Failed to load kitchen items:", error);
      }
    };
    loadKitchenItems();
  }, [flatId]);

  const handleUpdate = async (itemId: string) => {
    // Handle update logic here
  };

  const handleDelete = async (kitchenItemId: string, groceryId: string) => {
    try {
      await deleteKitchenItem(flatId, kitchenItemId, groceryId);
      setKitchenItems((prev) =>
        prev.map((item) =>
          item._id === kitchenItemId
            ? {
                ...item,
                groceries: item.groceries.filter((g) => g._id !== groceryId),
              }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {kitchenItems.map((item) =>
        item.groceries.map((grocery) => (
          <KitchenItemCard
            key={grocery._id}
            imageUrl={grocery.imageUrl}
            quantity={grocery.quantity}
            addedBy={grocery.addedBy}
            expirationDate={new Date(grocery.expirationDate).toISOString()}
            onUpdate={() => handleUpdate(item._id)}
            onDelete={() => handleDelete(item._id, grocery._id)}
          />
        ))
      )}
    </motion.div>
  );
};

export default Kitchen;
