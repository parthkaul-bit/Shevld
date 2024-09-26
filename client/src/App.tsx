import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Kitchen from "./pages/Kitchen";
import AddGroceryToKitchen from "./pages/AddGroceryToKitchen";
import GroceryList from "./pages/GroceryList";
import AddGroceryToList from "./pages/AddGroceryToList";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      {/* Define routes */}
      <Routes>
        {/* Landing / Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Kitchen routes */}
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/kitchen/add" element={<AddGroceryToKitchen />} />

        {/* Grocery List routes */}
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/grocery-list/add" element={<AddGroceryToList />} />

        {/* Recipes routes */}
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />

        {/* 404 Not Found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
