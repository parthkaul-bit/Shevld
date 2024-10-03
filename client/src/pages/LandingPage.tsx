import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Hero from "../public/hero.svg";
import Login from "../components/ui/Login";
import Signup from "../components/ui/Signup";
import FeatureGrid from "@/components/ui/FeatureGrid";
import { useUserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { state } = useUserContext();
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const closeLoginModal = () => setIsLoginOpen(false);
  const closeSignupModal = () => setIsSignupOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {!state.user && (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 bg-white">
          <div className="flex items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              🍋 Shelvd
            </span>
          </div>
          <div>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-600 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base"
              onClick={openLoginModal}
            >
              Log in
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Section: Heading & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              Organize your kitchen and groceries easily.
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              Simplify grocery shopping for you and your flatmates.
            </p>
            <Button
              className="bg-green-700 text-white hover:bg-green-900 rounded-3xl w-40 h-12 text-base"
              onClick={() =>
                state.user ? navigate("/kitchen") : openSignupModal()
              }
              aria-label={
                state.user ? "Navigate to kitchen" : "Open signup modal"
              }
            >
              {state.user ? "Go to kitchen" : "Start for free"}
            </Button>
          </div>

          {/* Right Section: Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src={Hero}
              alt="Hero"
              className="rounded-lg w-full max-w-[500px] h-auto"
            />
          </div>
        </div>
      </main>
      <FeatureGrid />

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={closeLoginModal}>
        <DialogContent>
          <Login />
          <div className="mt-4 text-center">
            <span>
              Don't have an account?
              <span
                className="hover:underline text-yellow-600 ml-1 cursor-pointer"
                onClick={() => {
                  closeLoginModal();
                  openSignupModal();
                }}
              >
                Sign up
              </span>
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup Modal */}
      <Dialog open={isSignupOpen} onOpenChange={closeSignupModal}>
        <DialogContent>
          <Signup />
          <div className="mt-4 text-center">
            <span>
              Already have an account?
              <span
                className="hover:underline text-yellow-600 ml-1 cursor-pointer"
                onClick={() => {
                  closeSignupModal();
                  openLoginModal();
                }}
              >
                Log in
              </span>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
