import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Search, Trash2, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

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
  id,
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
            className="h-5 w-5 rounded-full"
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

interface AddGroceryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAdd: (item: Omit<GroceryItem, "checked" | "id">) => void;
}

const AddGroceryDialog: React.FC<AddGroceryDialogProps> = ({
  isOpen,
  setIsOpen,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addedBy, setAddedBy] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, quantity: parseInt(quantity, 10), addedBy });
    setIsOpen(false);
    setName("");
    setQuantity("");
    setAddedBy("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Grocery List</DialogTitle>
          <DialogDescription>
            Enter the details of the item you want to add to your grocery list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addedBy" className="text-right">
                Added By
              </Label>
              <Input
                id="addedBy"
                value={addedBy}
                onChange={(e) => setAddedBy(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const GroceryList: React.FC = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<{ name: string } | null>({
    name: "John Doe",
  });
  const navigate = useNavigate();

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

  const filteredItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toBuyItems = filteredItems.filter((item) => !item.checked);
  const boughtItems = filteredItems.filter((item) => item.checked);

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <div className="container mx-auto p-4 sm:p-6 pb-24 max-w-6xl">
        <header className="mb-8 ">
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
            {toBuyItems.length === 0 && (
              <p className="text-center text-gray-500">No items to buy.</p>
            )}
          </div>

          <div>
            <h2 className="text-lg mb-4 text-green-700">BOUGHT &#x2705;</h2>
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
            {boughtItems.length === 0 && (
              <p className="text-center text-gray-500">No items bought yet.</p>
            )}
          </div>
        </div>

        <Button
          className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 md:right-80 md:bottom-24 rounded-full shadow-lg h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16"
          size="icon"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        </Button>
      </div>
    </div>
  );
};

export default GroceryList;
