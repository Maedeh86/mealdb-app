import { useUser } from "../context/useUser";

const Home = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <h1 className="text-4xl font-bold text-lux-gold">🏠 Welcome to MealDB</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 text-lux-gold">
          👋 Welcome, {user.username}!
        </h1>
        <p className="text-lg mb-3">
          Favorite Category:{" "}
          <span className="font-semibold text-lux-gold">
            {user.favoriteCategory || "None"}
          </span>
        </p>
        <p className="text-lg">
          ⭐ You have{" "}
          <span className="font-bold text-lux-purple">
            {user.favorites.length}
          </span>{" "}
          favorite meals
        </p>
      </div>
    </div>
  );
};

export default Home;
