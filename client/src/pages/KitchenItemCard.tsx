import React, { useState } from "react";
import { Trash2, Edit, Check, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { KitchenItemCardProps } from "@/types";
import { getExpirationStatus } from "@/utils/expiration";

const KitchenItemCard: React.FC<KitchenItemCardProps> = ({
  id,
  name,
  quantity,
  image,
  expirationDate,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  const { status, color } = getExpirationStatus(expirationDate);

  const handleUpdate = () => {
    if (!isEditing) return;
    onUpdate({
      id,
      name,
      quantity: editedQuantity,
      image,
      expirationDate,
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
      <Card className="w-full overflow-hidden rounded-none">
        <CardContent className="p-0">
          <div className="relative h-48">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-2 left-2 text-white text-sm font-bold py-1 px-2 rounded ${color}`}
            >
              {status}
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={editedQuantity}
                      onChange={(e) =>
                        setEditedQuantity(Number(e.target.value))
                      }
                      className="w-20"
                    />
                    <Button
                      size="sm"
                      className="rounded-xl"
                      onClick={handleUpdate}
                    >
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    Quantity: {quantity}
                  </span>
                )}
              </div>
              <div className="flex justify-end mt-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={onDelete}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KitchenItemCard;
