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

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Kitchen routes */}
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/kitchen/add" element={<AddGroceryToKitchen />} />

          {/* Grocery List routes */}
          <Route path="/grocery-list" element={<GroceryList />} />

          {/* Recipes routes */}
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          {/* 404 Not Found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}
