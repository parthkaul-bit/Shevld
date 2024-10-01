import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  const toggleModal = () => {
    setIsLoginOpen((prev) => !prev);
  };

  return (
    <div className="bg-white fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        {isLoginOpen ? <Login /> : <Signup />}
        <button onClick={toggleModal} className="mt-4 text-blue-600 ">
          {isLoginOpen
            ? `Don't have an account? <span classname="hover:underline">Sign up</span>`
            : "Already have an account? Log in"}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
