import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 bg-white">
      <h2 className="text-2xl font-bold text-black">Welcome back, Mummy!</h2>
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
        Log in
      </Button>
    </form>
  );
};

export default Login;
