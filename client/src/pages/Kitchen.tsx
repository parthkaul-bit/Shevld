// Kitchen.tsx
import React, { useState, useEffect } from "react";
import KitchenItemCard from "./KitchenItemCard";
import { KitchenItem } from "@/types";

const Kitchen: React.FC = () => {
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([]);

  useEffect(() => {
    const initialItems: KitchenItem[] = [
      {
        id: "1",
        name: "Fresh Milk",
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-10",
      },
      {
        id: "2",
        name: "Whole Grain Bread",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-1",
      },
      {
        id: "3",
        name: "Organic Eggs",
        quantity: 12,
        image:
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-15",
      },
      {
        id: "4",
        name: "Fresh Apples",
        quantity: 6,
        image:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-20",
      },
      {
        id: "5",
        name: "Greek Yogurt",
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-05",
      },
      {
        id: "6",
        name: "Chicken Breast",
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-08",
      },
      {
        id: "7",
        name: "Spinach Leaves",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        expirationDate: "2024-10-07",
      },
    ];

    setKitchenItems(initialItems);
  }, []);

  const handleDeleteItem = (id: string) => {
    setKitchenItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const handleUpdateItem = (updatedItem: KitchenItem) => {
    setKitchenItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="container mx-auto p-4 sm:p-6 pb-24 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-green-700">Our Kitchen</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {kitchenItems.map((item) => (
            <KitchenItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              image={item.image}
              expirationDate={item.expirationDate} // Pass expiration date
              onDelete={() => handleDeleteItem(item.id)}
              onUpdate={(updatedItem) => handleUpdateItem(updatedItem)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
