import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <header className="container mx-auto flex justify-between items-center p-6 bg-white">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-gray-800">Shelvd</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-600 hover:bg-gray-100"
          >
            Log in
          </Button>
        </div>
      </header>
      <main className="container mx-auto flex flex-col md:flex-row px-4 py-24">
        <div className="md:w-1/3 mb-8 flex flex-col justify-center md:pr-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            Organize your kitchen and groceries easily.
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-6">
            Simplify grocery shopping for you and your flatmates.
          </p>
          <Button className="bg-gray-800 text-white hover:bg-gray-700 rounded-md w-40">
            Start for free
          </Button>
        </div>
        <div className="md:w-2/3 flex justify-center items-center">
          <img
            src="https://via.placeholder.com/1000x600"
            alt="Placeholder"
            className="rounded-xl w-full max-w-[800px] h-auto"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
