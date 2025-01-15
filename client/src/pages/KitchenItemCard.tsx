// import React, { useState } from "react";
// import { Trash2, Edit, Check, MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { motion } from "framer-motion";
// import { KitchenItemCardProps } from "@/types";
// import { getExpirationStatus } from "@/utils/expiration";

// const KitchenItemCard: React.FC<KitchenItemCardProps> = ({
//   _id,
//   quantity,
//   imageUrl,
//   expirationDate,
//   onUpdate,
//   onDelete,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedQuantity, setEditedQuantity] = useState<number>(quantity);

//   const { status, color } = getExpirationStatus(expirationDate);

//   const handleUpdate = () => {
//     if (!isEditing) return;

//     // Ensure the quantity is a positive number
//     if (editedQuantity < 0) {
//       alert("Quantity must be a positive number.");
//       return;
//     }

//     onUpdate({
//       _id,
//       quantity: editedQuantity,
//       imageUrl,
//       expirationDate,
//     });
//     setIsEditing(false);
//   };

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.3 }}
//       className="w-full"
//     >
//       <Card className="w-full overflow-hidden rounded-xl gap-10">
//         <CardContent className="p-0">
//           <div className="relative h-48">
//             <img src={imageUrl} className="w-full h-full object-cover" />
//             <span
//               className={`absolute top-2 left-2 text-white text-sm font-bold py-1 px-2 rounded ${color}`}
//             >
//               {status}
//             </span>
//           </div>
//           <div className="p-4">
//             <h3 className="font-semibold text-lg mb-2">name</h3>
//             <div className="space-y-2">
//               <div className="flex items-center">
//                 {isEditing ? (
//                   <div className="flex items-center space-x-2">
//                     <Input
//                       type="number"
//                       value={editedQuantity}
//                       onChange={(e) =>
//                         setEditedQuantity(Number(e.target.value))
//                       }
//                       className="w-20"
//                       min={0} // Prevent negative values
//                     />
//                     <Button
//                       size="sm"
//                       className="rounded-xl"
//                       onClick={handleUpdate}
//                       aria-label="Save changes"
//                     >
//                       <Check className="h-4 w-4 mr-1" /> Save
//                     </Button>
//                   </div>
//                 ) : (
//                   <span className="text-sm text-gray-500">
//                     Quantity: {quantity}
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-end mt-2">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="sm" aria-label="More options">
//                       <MoreVertical className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     <DropdownMenuItem onClick={() => setIsEditing(true)}>
//                       <Edit className="mr-2 h-4 w-4" /> Edit
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       className="text-red-500"
//                       onClick={() => onDelete(_id)}
//                     >
//                       <Trash2 className="mr-2 h-4 w-4" /> Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default KitchenItemCard;

import React from "react";
import { motion } from "framer-motion";

interface KitchenItemCardProps {
  imageUrl: string;
  quantity: number;
  addedBy: string;
  expirationDate: string;
  onUpdate: () => void;
  onDelete: () => void;
}

const KitchenItemCard: React.FC<KitchenItemCardProps> = ({
  imageUrl,
  quantity,
  addedBy,
  expirationDate,
  onUpdate,
  onDelete,
}) => {
  return (
    <motion.div
      className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={imageUrl}
        alt="Grocery Item"
        className="w-24 h-24 object-cover rounded-full mb-4"
      />
      <p className="text-lg font-bold mb-2">Quantity: {quantity}</p>
      <p className="text-sm text-gray-600 mb-2">Added By: {addedBy}</p>
      <p className="text-sm text-gray-600 mb-4">
        Expiration: {new Date(expirationDate).toLocaleDateString()}
      </p>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onUpdate}
        >
          Update
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default KitchenItemCard;
