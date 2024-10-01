import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext"; // Adjust the import path as needed
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { state, dispatch } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  {
    console.log(state.user);
  }
  return (
    <nav className="bg-green-700 p-4 flex justify-between items-center">
      <Link to={"/"}>
        <div className="text-white font-bold text-xl">Shelvd</div>
      </Link>

      <div className="flex items-center">
        {state.user && (
          <>
            <span className="text-white mr-4">Welcome, {state.user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-4 py-2 rounded-md flex items-center hover:bg-green-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
