import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/useUser";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, setFavoriteCategory } = useUser();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(`❌ ${err.message}`);
        } else {
          setError("❌ Failed to load categories");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          ⚠ Please login first
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-lux-dark via-lux-purple to-lux-blue text-white">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-lux-gold mx-auto mb-4"></div>
          <p className="text-gray-200">⏳ Loading categories...</p>
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
      <h1 className="text-4xl font-bold mb-8 text-center text-lux-gold">📂 Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.idCategory}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-48 object-cover" />
            <div className="p-6">
              <Link
                to={`/categories/${cat.strCategory}`}
                className="text-2xl font-bold text-lux-gold hover:text-white transition"
              >
                {cat.strCategory}
              </Link>
              <p className="text-gray-300 mt-3 text-sm line-clamp-3">
                {cat.strCategoryDescription}
              </p>
              <button
                onClick={() => setFavoriteCategory(cat.strCategory)}
                className="mt-4 w-full bg-gradient-to-r from-lux-purple to-lux-blue text-white py-2 rounded-full hover:opacity-90 transition"
              >
                {user.favoriteCategory === cat.strCategory ? "✅ Selected" : "Set as Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
