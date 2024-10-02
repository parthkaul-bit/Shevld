import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    state.user && (
      <nav className="bg-green-700 p-4 flex justify-between items-center">
        <Link to={"/kitchen"}>
          <div className="text-white font-bold text-xl">🍋 Shelvd</div>
        </Link>

        <div className="flex items-center">
          {
            <>
              <span className="hidden sm:inline text-white mr-4">
                Welcome, {state.user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <LogOut className="w-6 h-6 mr-2" />
              </button>
            </>
          }
        </div>
      </nav>
    )
  );
};

export default Navbar;
