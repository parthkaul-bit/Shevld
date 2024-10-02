//todo when kitchen empty illustration.

import React, { useState } from "react";
import { Plus, Calendar, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface KitchenItem {
  name: string;
  quantity: number;
  expirationDate: string;
  image: string;
}

interface KitchenItemProps extends KitchenItem {}

const KitchenItem: React.FC<KitchenItemProps> = ({
  name,
  quantity,
  expirationDate,
  image,
}) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-4">
      <Avatar className="h-16 w-16 mr-4">
        <AvatarImage src={image || "/api/placeholder/80/80"} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
        <Badge variant="secondary" className="mt-1">
          <Calendar className="mr-1 h-3 w-3" /> Expires: {expirationDate}
        </Badge>
      </div>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

interface AddGroceryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddGroceryDialog: React.FC<AddGroceryDialogProps> = ({
  isOpen,
  setIsOpen,
}) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Grocery Item</DialogTitle>
        <DialogDescription>
          Enter the details of the new grocery item to add to your kitchen.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input id="quantity" type="number" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="expiration" className="text-right">
            Expiration
          </Label>
          <Input id="expiration" type="date" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Item</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Kitchen: React.FC = () => {
  const [kitchenItems] = useState<KitchenItem[]>([
    {
      name: "Milk",
      quantity: 1,
      expirationDate: "2024-10-05",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Bread",
      quantity: 2,
      expirationDate: "2024-10-03",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Eggs",
      quantity: 12,
      expirationDate: "2024-10-10",
      image: "/api/placeholder/80/80",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search items..." className="pl-8" />
      </div>
      {kitchenItems.map((item, index) => (
        <KitchenItem key={index} {...item} />
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
      />
    </div>
  );
};

export default Kitchen;
