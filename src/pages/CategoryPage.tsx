import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        if (!res.ok) throw new Error("Failed to fetch meals");
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(`❌ ${err.message}`);
        } else {
          setError("❌ Failed to load meals");
        }
      } finally {
        setLoading(false);
      }
    };
    if (categoryName) fetchMeals();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          ⏳ Loading meals...
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-lux-gold">
        🍽 Meals in {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {meals.map((meal) => (
          <Link
            key={meal.idMeal}
            to={`/item/${meal.idMeal}`}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
            <p className="p-4 font-semibold text-lg text-lux-gold">{meal.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
