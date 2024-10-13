import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kitchen from "./pages/Kitchen";
import AddGroceryToKitchen from "./pages/AddGroceryToKitchen";
import GroceryList from "./pages/GroceryList";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/ui/Navbar";
import BottomNavBar from "./components/ui/BottomNavBar";
import JoinFlat from "./components/ui/JoinFlat";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/kitchen/add" element={<AddGroceryToKitchen />} />
          <Route path="/grocery-list" element={<GroceryList />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/join-flat" element={<JoinFlat />} />{" "}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}
