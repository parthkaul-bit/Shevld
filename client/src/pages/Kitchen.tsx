//todo when kitchen empty illustration.
import React, { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  image: string;
}

interface KitchenItemCardProps extends KitchenItem {
  onDelete: () => void;
  onUpdate: (updatedItem: KitchenItem) => void;
}
const KitchenItemCard: React.FC<KitchenItemCardProps> = ({
  id,
  name,
  quantity,
  expirationDate,
  image,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const daysUntilExpiration = Math.ceil(
    (new Date(expirationDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  let tagColor = "bg-green-500";
  if (daysUntilExpiration <= 3) {
    tagColor = "bg-red-500";
  } else if (daysUntilExpiration <= 7) {
    tagColor = "bg-yellow-500";
  }

  const handleUpdate = () => {
    onUpdate({
      id,
      name,
      quantity: editedQuantity,
      expirationDate,
      image,
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <Badge className={`absolute top-2 right-2 ${tagColor} text-white`}>
              Expires in {daysUntilExpiration} days
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor={`quantity-${id}`} className="mr-2">
                  Quantity:
                </Label>
                {isEditing ? (
                  <Input
                    id={`quantity-${id}`}
                    type="number"
                    value={editedQuantity}
                    onChange={(e) => setEditedQuantity(Number(e.target.value))}
                    className="w-20"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{quantity}</span>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{expirationDate}</span>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                {isEditing ? (
                  <Button
                    size="sm"
                    className="rounded-xl"
                    onClick={handleUpdate}
                  >
                    <Check className="h-4 w-4 mr-1" /> Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                )}
                <Button
                  size="sm"
                  className="rounded-xl"
                  variant="destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface AddKitchenItemDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAdd: (item: Omit<KitchenItem, "id">) => void;
}

const AddKitchenItemDialog: React.FC<AddKitchenItemDialogProps> = ({
  isOpen,
  setIsOpen,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      quantity: parseInt(quantity, 10),
      expirationDate,
      image: "/placeholder.svg?height=160&width=320",
    });
    setIsOpen(false);
    setName("");
    setQuantity("");
    setExpirationDate("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Kitchen Item</DialogTitle>
          <DialogDescription>
            Enter the details of the new item to add to your kitchen.
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
              <Label htmlFor="expiration" className="text-right">
                Expiration
              </Label>
              <Input
                id="expiration"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
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

const Kitchen: React.FC = () => {
  const [kitchenItems, setKitchenItems] = useState<KitchenItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const initialItems: KitchenItem[] = [
      {
        id: "1",
        name: "Fresh Milk",
        quantity: 2,
        expirationDate: "2024-10-05",
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "2",
        name: "Whole Grain Bread",
        quantity: 1,
        expirationDate: "2024-10-03",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "3",
        name: "Organic Eggs",
        quantity: 12,
        expirationDate: "2024-10-10",
        image:
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "4",
        name: "Fresh Apples",
        quantity: 6,
        expirationDate: "2024-10-15",
        image:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "5",
        name: "Greek Yogurt",
        quantity: 3,
        expirationDate: "2024-10-08",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "6",
        name: "Chicken Breast",
        quantity: 2,
        expirationDate: "2024-10-02",
        image:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      },
    ];

    setKitchenItems(initialItems);
  }, []);

  const handleDeleteItem = (id: string) => {
    setKitchenItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItem = (newItem: Omit<KitchenItem, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setKitchenItems((prevItems) => [...prevItems, { ...newItem, id }]);
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
          <h1 className="text-3xl font-semibold text-green-700">
            Our Kitchen -some icon here-
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {kitchenItems.map((item) => (
              <KitchenItemCard
                key={item.id}
                {...item}
                onDelete={() => handleDeleteItem(item.id)}
                onUpdate={handleUpdateItem}
              />
            ))}
          </AnimatePresence>
        </div>

        {kitchenItems.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No items in your kitchen.
          </p>
        )}

        <Button
          className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 rounded-full shadow-lg h-14 w-14"
          size="icon"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>

        <AddKitchenItemDialog
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  );
};

export default Kitchen;
