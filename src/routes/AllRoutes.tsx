import { Route, Routes } from "react-router-dom";
import Login from "../container/auth/Login";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
