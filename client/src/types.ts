// Grocery Item Interfaces
export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  checked: boolean; // Matches the frontend state, not in schema
  addedBy: string;
  status?: "pending" | "purchased"; // Matches schema enum
  purchasedAt?: Date; // Reflects optional schema field
}

export interface GroceryItemProps extends GroceryItem {
  onToggle: () => void;
  onDelete: () => void;
}

export interface AddGroceryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAdd: (item: Omit<GroceryItem, "checked" | "id" | "status" | "purchasedAt">) => void;
}

// Kitchen Interfaces
export interface KitchenItem {
  _id: string;
  flatId: string;
  groceries: KitchenGrocery[];
  createdAt: Date; // Changed to Date
}

export interface KitchenGrocery {
  groceryId: string;
  quantity: number;
  expirationDate: Date; // Changed to Date
  imageUrl: string;
  addedBy: string;
  addedAt: Date; // Changed to Date
  _id: string;
}

export interface KitchenItemCardProps {
  _id: string;
  quantity: number;
  imageUrl: string;
  expirationDate: Date; // Changed to Date
  onUpdate: (item: {
    _id: string;
    quantity: number; 
    imageUrl: string;
    expirationDate: Date; // Changed to Date
  }) => void;
  onDelete: (id: string) => void;
}

// Grocery List Interfaces
export interface GroceryList {
  flatId: string;
  items: GroceryListItem[];
  createdAt: Date; // Changed to Date
  updatedAt: Date; // Changed to Date
}

export interface GroceryListItem {
  name: string;
  quantity: number;
  status: "pending" | "purchased"; // Matches schema enum
  addedAt: Date; // Changed to Date
  purchasedAt?: Date; // Optional per schema
}
