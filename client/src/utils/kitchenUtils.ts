import axios from "axios";
import { KitchenItem, GroceryItem } from "../types";

export const fetchKitchenItems = async (flatId: string): Promise<KitchenItem[]> => {
  try {
    const response = await axios.get<KitchenItem[]>(
      `http://localhost:8080/api/kitchen/66ed4eace6e016afe0a5d474`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching kitchen items:", error);
    throw error;
  }
};

export const addKitchenItem = async (
  flatId: string,
  grocery: GroceryItem
): Promise<KitchenItem> => {
  try {
    const newItem = { flatId, groceries: [grocery] };
    const response = await axios.post<KitchenItem>(
      `http://localhost:8080/api/kitchen/${flatId}`,
      newItem
    );
    return response.data;
  } catch (error) {
    console.error("Error adding kitchen item:", error);
    throw error;
  }
};

export const updateKitchenItem = async (
  flatId: string,
  updatedItem: KitchenItem
): Promise<KitchenItem> => {
  try {
    const response = await axios.put<KitchenItem>(
      `http://localhost:8080/api/kitchen/${flatId}/${updatedItem._id}`,
      updatedItem
    );
    return response.data;
  } catch (error) {
    console.error("Error updating kitchen item:", error);
    throw error;
  }
};

export const deleteKitchenItem = async (
  flatId: string,
  kitchenItemId: string,
  groceryId: string
): Promise<void> => {
  try {
    await axios.delete(
      `http://localhost:8080/api/kitchen/${flatId}/${kitchenItemId}/${groceryId}`
    );
  } catch (error) {
    console.error("Error deleting grocery item:", error);
    throw error;
  }
};
