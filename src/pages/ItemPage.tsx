import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../context/useUser";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
};

const ItemPage = () => {
  const { mealId } = useParams<{ mealId: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, saveFavorite } = useUser();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        if (!res.ok) throw new Error("Failed to fetch meal");
        const data = await res.json();
        setMeal(data.meals ? data.meals[0] : null);
      } catch (err) {
        if (err instanceof Error) {
          setError(`❌ ${err.message}`);
        } else {
          setError("❌ Failed to load meal");
        }
      } finally {
        setLoading(false);
      }
    };
    if (mealId) fetchMeal();
  }, [mealId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          ⏳ Loading meal...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-red-500/20 border border-red-400/40 rounded-2xl p-8 shadow-2xl">
          {error}
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        ❌ Meal not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white flex items-center justify-center p-6">
      <div className="max-w-4xl backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-lux-gold">{meal.strMeal}</h1>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-xl shadow mb-6" />
        <p className="mb-2 text-gray-300"><strong>Category:</strong> {meal.strCategory}</p>
        <p className="mb-2 text-gray-300"><strong>Area:</strong> {meal.strArea}</p>
        <p className="mb-6 text-gray-200 whitespace-pre-line">{meal.strInstructions}</p>
        <button
          onClick={() => saveFavorite(meal.idMeal)}
          className="bg-gradient-to-r from-green-400 to-emerald-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition shadow-lg font-semibold"
        >
          {user?.favorites.includes(meal.idMeal) ? "✅ Saved" : "Save to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
