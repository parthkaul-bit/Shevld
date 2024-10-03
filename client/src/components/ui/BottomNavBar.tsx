import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Book } from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";

export default function BottomNavBar() {
  const location = useLocation();
  const { state } = useUserContext();

  const isActive = (path: string) => {
    return location.pathname === path; // Exact match
  };

  return (
    state.user && (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex justify-around">
            <Link
              to="/kitchen"
              className={`flex flex-col items-center p-4 ${
                isActive("/kitchen") ? "text-green-500" : "text-green-800"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Kitchen</span>
            </Link>
            <Link
              to="/grocery-list"
              className={`flex flex-col items-center px-6 py-4 ${
                isActive("/grocery-list") ? "text-green-500" : "text-green-800"
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs mt-1">List</span>
            </Link>
            <Link
              to="/recipes"
              className={`flex flex-col items-center p-4 ${
                isActive("/recipes") ? "text-green-500" : "text-green-800"
              }`}
            >
              <Book className="w-6 h-6" />
              <span className="text-xs mt-1">Recipes</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  );
}
