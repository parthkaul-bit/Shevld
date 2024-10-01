import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/authService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useUserContext(); // Get the dispatch function from UserContext

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await login(email, password);
      console.log("Logged in successfully:", response);
      const { user, token } = response;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Dispatch the login action to update the context
      dispatch({
        type: "LOGIN",
        payload: { user, token },
      });
      navigate("/kitchen");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 bg-white">
      <h2 className="text-2xl font-bold text-black">Welcome back!</h2>
      {error && <p className="text-red-600">{error}</p>}
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
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};

export default Login;
