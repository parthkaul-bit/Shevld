// GroceryList.tsx
import React, { useState, useEffect } from "react";
import { Plus, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import AddGroceryDialog from "./AddGroceryDialog"; // Import the AddGroceryDialog component

interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean;
  addedBy: string;
}

interface GroceryItemProps extends GroceryItem {
  onToggle: () => void;
  onDelete: () => void;
}

const GroceryItem: React.FC<GroceryItemProps> = ({
  name,
  quantity,
  checked,
  addedBy,
  onToggle,
  onDelete,
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="mb-4 shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={checked}
            onCheckedChange={onToggle}
            className={`h-5 w-5 rounded-full transition-colors duration-200 ${
              checked ? "bg-green-500 text-primary-foreground" : ""
            }`}
          />
          <div className="flex-1 space-y-0.5">
            <h3
              className={`text-base font-medium transition-all duration-300 ${
                checked ? "line-through text-gray-400" : ""
              }`}
            >
              {name}
            </h3>
            <p className="text-xs text-gray-500">Quantity: {quantity}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <User className="h-4 w-4" />
              <span>Added by {addedBy}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const GroceryList: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const initialItems: GroceryItem[] = [
      {
        id: "1",
        name: "Organic Avocados",
        quantity: 5,
        checked: false,
        addedBy: "Emma",
      },
      {
        id: "2",
        name: "Whole Grain Bread",
        quantity: 2,
        checked: false,
        addedBy: "Liam",
      },
      {
        id: "3",
        name: "Greek Yogurt",
        quantity: 1,
        checked: true,
        addedBy: "Olivia",
      },
      {
        id: "4",
        name: "Almond Milk",
        quantity: 1,
        checked: false,
        addedBy: "Noah",
      },
      {
        id: "5",
        name: "Free-range Eggs",
        quantity: 12,
        checked: false,
        addedBy: "Ava",
      },
      {
        id: "6",
        name: "Cherry Tomatoes",
        quantity: 2,
        checked: true,
        addedBy: "Ethan",
      },
      {
        id: "7",
        name: "Grass-fed Chicken",
        quantity: 1,
        checked: false,
        addedBy: "Sophia",
      },
    ];
    setGroceryItems(initialItems);
  }, []);

  const handleToggle = (id: string) => {
    setGroceryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setGroceryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItem = (newItem: Omit<GroceryItem, "checked" | "id">) => {
    const item: GroceryItem = {
      ...newItem,
      id: Date.now().toString(),
      checked: false,
    };
    setGroceryItems((prevItems) => [...prevItems, item]);
  };

  const toBuyItems = groceryItems.filter((item) => !item.checked);
  const boughtItems = groceryItems.filter((item) => item.checked);

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="container mx-auto p-4 sm:p-6 pb-24 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-green-700">
            Our Grocery List
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg mb-4 text-green-700">TO BUY &#x1F6D2;</h2>
            <AnimatePresence>
              {toBuyItems.map((item) => (
                <GroceryItem
                  key={item.id}
                  {...item}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          <div>
            <h2 className="text-lg mb-4 text-green-700">BOUGHT ✅</h2>
            <AnimatePresence>
              {boughtItems.map((item) => (
                <GroceryItem
                  key={item.id}
                  {...item}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDeleteItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <Button
          className="fixed bottom-32 right-40 bg-green-600 hover:bg-green-700 transition-colors duration-200"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Grocery Item
        </Button>

        {/* Add the AddGroceryDialog here */}
        <AddGroceryDialog
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  );
};

export default GroceryList;
