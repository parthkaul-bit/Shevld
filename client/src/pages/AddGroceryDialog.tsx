import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddGroceryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAdd: (item: { name: string; quantity: number; addedBy: string }) => void;
}

const AddGroceryDialog: React.FC<AddGroceryDialogProps> = ({
  isOpen,
  setIsOpen,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    addedBy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.addedBy) {
      alert("Please fill in all fields");
      return;
    }
    onAdd({
      name: formData.name,
      quantity: parseInt(formData.quantity, 10),
      addedBy: formData.addedBy,
    });
    setIsOpen(false);
    setFormData({ name: "", quantity: "", addedBy: "" });
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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addedBy" className="text-right">
                Added By
              </Label>
              <Input
                id="addedBy"
                value={formData.addedBy}
                onChange={(e) =>
                  setFormData({ ...formData, addedBy: e.target.value })
                }
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

export default AddGroceryDialog;
