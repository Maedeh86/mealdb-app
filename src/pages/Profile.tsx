import { useEffect, useState } from "react";
import { useUser } from "../context/useUser";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const Profile = () => {
  const { user, removeFavorite } = useUser();
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || user.favorites.length === 0) {
        setFavoriteMeals([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          user.favorites.map(async (id) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );
            if (!res.ok) throw new Error("Failed to fetch favorite meals");
            const data = await res.json();
            return data.meals ? data.meals[0] : null;
          })
        );

        setFavoriteMeals(results.filter(Boolean) as Meal[]);
      } catch (err) {
        if (err instanceof Error) {
          setError(`❌ ${err.message}`);
        } else {
          setError("❌ Failed to load favorites");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          ⚠ Please login to view profile
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-lux-gold mx-auto mb-4"></div>
          <p className="text-gray-200">⏳ Loading favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-red-500/20 border border-red-400/40 rounded-2xl shadow-2xl p-8 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white p-8">
     
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-lux-gold drop-shadow-lg">
          👤 {user.username}'s Profile
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Favorite Category:{" "}
          <span className="font-semibold text-lux-gold">
            {user.favoriteCategory || "❌ None selected"}
          </span>
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-lux-gold text-center">
        ⭐ Your Favorite Meals
      </h2>

      {favoriteMeals.length === 0 ? (
        <div className="text-center text-gray-300 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 max-w-lg mx-auto">
          You haven't saved any favorites yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {favoriteMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="rounded-xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg overflow-hidden"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <p className="font-semibold text-lg text-lux-gold mb-2">
                  {meal.strMeal}
                </p>
                <button
                  onClick={() => removeFavorite(meal.idMeal)}
                  className="mt-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition font-medium shadow-md"
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
