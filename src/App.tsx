import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/useUser";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";

function App() {
  const { user } = useUser();

  if (!user) return <LoginForm />;

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<CategoryPage />} />
          <Route path="/item/:mealId" element={<ItemPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
