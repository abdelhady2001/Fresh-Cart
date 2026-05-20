import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import "flowbite";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserContextProvider from "./contexts/UserContext";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import Product from "./components/Product/Product";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart/Cart";
import Success from "./components/Success/Success";

function App() {
  let query = new QueryClient();

  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectRoute>
              <Product />
            </ProtectRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectRoute>
              <ProductDetails />
            </ProtectRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          ),
        },
        {
          path: "success",
          element: <Success />,
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
