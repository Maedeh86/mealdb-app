import { useState } from "react";
import { useUser } from "../context/useUser";

const LoginForm = () => {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username.trim());
    if (!success) {
      setError("❌ User not found");
    } else {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-lux-gold">
          🔐 Login
        </h2>

        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-lux-gold"
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-lux-purple to-lux-blue text-white py-3 rounded-full hover:opacity-90 transition shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
