import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import NotFound from "./pages/NotFound.jsx";
// import Home from "./pages/Home.jsx";
// import Register from "./pages/Register.jsx"
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import router from './config/router.jsx';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<App />}>
//         <Route path="/home" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Home />} />
//       </Route>
//       <Route path="*" element={<NotFound />} />
//     </>
//   )
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
