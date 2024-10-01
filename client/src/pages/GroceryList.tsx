import React, { useState } from "react";
import { Plus, Search, ShoppingCart } from "lucide-react";
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

interface GroceryItem {
  name: string;
  quantity: number;
  checked: boolean;
}

interface GroceryItemProps extends GroceryItem {
  onToggle: () => void;
}

const GroceryItem: React.FC<GroceryItemProps> = ({
  name,
  quantity,
  checked,
  onToggle,
}) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-4">
      <Checkbox checked={checked} onCheckedChange={onToggle} className="mr-4" />
      <div className="flex-1">
        <h3
          className={`font-semibold ${
            checked ? "line-through text-gray-500" : ""
          }`}
        >
          {name}
        </h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

interface AddGroceryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAdd: (item: Omit<GroceryItem, "checked">) => void;
}

const AddGroceryDialog: React.FC<AddGroceryDialogProps> = ({
  isOpen,
  setIsOpen,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, quantity: parseInt(quantity, 10) });
    setIsOpen(false);
    setName("");
    setQuantity("");
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
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    { name: "Apples", quantity: 5, checked: false },
    { name: "Bread", quantity: 2, checked: false },
    { name: "Cheese", quantity: 1, checked: true },
    { name: "Milk", quantity: 1, checked: false },
    { name: "Eggs", quantity: 12, checked: false },
    { name: "Tomatoes", quantity: 4, checked: true },
    { name: "Chicken", quantity: 1, checked: false },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleToggle = (index: number) => {
    const newItems = [...groceryItems];
    newItems[index].checked = !newItems[index].checked;
    setGroceryItems(newItems);
  };

  const handleAddItem = (newItem: Omit<GroceryItem, "checked">) => {
    setGroceryItems([...groceryItems, { ...newItem, checked: false }]);
  };

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Grocery List</h1>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search items..." className="pl-8" />
      </div>
      {groceryItems.map((item, index) => (
        <GroceryItem
          key={index}
          {...item}
          onToggle={() => handleToggle(index)}
        />
      ))}
      <Button
        className="fixed right-4 bottom-20 rounded-full"
        size="icon"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <AddGroceryDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onAdd={handleAddItem}
      />
    </div>
  );
};

export default GroceryList;
