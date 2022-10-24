import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" exact={true} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
