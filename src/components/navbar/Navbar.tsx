import { Link } from "react-router-dom";
import { useUser } from "../../context/useUser";

const Navbar = () => {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <nav className="bg-gradient-to-r from-lux-purple to-lux-blue text-white px-8 py-4 flex items-center justify-between shadow-2xl">
      <div className="flex space-x-8 text-lg font-medium">
        <Link to="/" className="hover:text-lux-gold transition">Home</Link>
        <Link to="/profile" className="hover:text-lux-gold transition">Profile</Link>
        <Link to="/categories" className="hover:text-lux-gold transition">Categories</Link>
      </div>
      <button
        onClick={logout}
        className="bg-lux-gold text-lux-dark px-5 py-2 rounded-full hover:opacity-90 transition shadow-md font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
