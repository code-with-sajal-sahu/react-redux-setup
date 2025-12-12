
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../container/user/home/Home";
import AddEditTask from "../container/user/addEditTask/AddEditTask";
import RecipesList from "../container/user/recipesList/RecipesList";
const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-task" element={<AddEditTask />} />
        <Route path="/recipes" element={<RecipesList />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;