export interface GroceryItem {
    id: string;
    name: string;
    quantity: number;
    checked: boolean;
    addedBy: string;
  }
  
  export interface GroceryItemProps extends GroceryItem {
    onToggle: () => void;
    onDelete: () => void;
  }
  
  export interface AddGroceryDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onAdd: (item: Omit<GroceryItem, "checked" | "id">) => void;
  }
  