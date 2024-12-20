import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import App from "../App.jsx";
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx"
import Login from "../pages/Login.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );


export default router;