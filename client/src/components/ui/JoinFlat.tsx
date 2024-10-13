import { addUserToFlat } from "@/api/flatService";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinFlat() {
  const [flatId, setFlatId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleJoinFlat = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user");
      // @ts-ignore
      const parsedUser = JSON.parse(user);
      console.log("Parsed User:", parsedUser); // Check the parsed user object

      // Now you can access the user ID
      const userId = parsedUser._id; // Correctly accessing userId
      if (!userId) {
        setError("User ID not found.");
        return;
      }

      // Use the flatService function to join the flat
      await addUserToFlat(flatId, userId);

      // On success, redirect or display a success message
      alert("Successfully joined the flat!");
      navigate("/kitchen"); // Navigate to the kitchen page or another page
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to join flat. Please try again.");
    }
  };

  return (
    <div>
      <h1>Join a Flat</h1>
      <form onSubmit={handleJoinFlat}>
        <input
          type="text"
          placeholder="Enter Flat ID"
          value={flatId}
          onChange={(e) => setFlatId(e.target.value)}
          required
        />
        <button type="submit">Join Flat</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
