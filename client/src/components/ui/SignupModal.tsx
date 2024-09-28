import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <h2 className="text-2xl font-bold text-black">
        Get Started! Your kitchen, your way
      </h2>
      <div>
        <Label htmlFor="name" className="mb-2 block text-gray-800">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 text-black border-gray-600 focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2 block text-gray-800">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 text-black border-gray-600 focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-2 block text-gray-800">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 text-black border-gray-600 focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>
      <Button
        type="submit"
        className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600"
      >
        Sign up
      </Button>
    </form>
  );
};

export default Signup;
