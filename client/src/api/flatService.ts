import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const addUserToFlat = async (flatId: string, userId: string) => {
  try {
    console.log(`Sending request to: ${API_URL}/${flatId}/addUser`); // Log the URL
    console.log(`UserId being sent: ${userId}`); // Log the data

    const response = await axios.put(`${API_URL}/flats/${flatId}/addUser`, {
      userId,
    });

    console.log("Response received:", response.data); // Log the successful response
    return response.data;
  } catch (error: any) {
    console.error("Error occurred:", error); // Log the error
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
