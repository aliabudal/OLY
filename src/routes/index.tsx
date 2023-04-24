import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import TransactionPurchase from "pages/TransactionPurchase";
import TransactionSale from "pages/TransactionSale";
import AddNewProduct from "pages/AddNewProduct";
import DetailProduct from "pages/DetailProduct";
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import Profile from "pages/Profile";
import Summary from "pages/Summary";
import MyCart from "pages/MyCart";
import Home from "pages";

// TODO: Adauagati backend!
axios.defaults.baseURL = "https://localhost:5001";

const App = () => {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const checkToken = cookie.token;

  axios.interceptors.request.use(function (config) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${checkToken}`;
    config.headers.contenttype = "multipart/form-data";
    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { data } = error.response;
      if (
        data === "Missing or malformed JWT" ||
        [401, 403].includes(data.code)
      ) {
        removeCookie("token");
      }
      return Promise.reject(error);
    }
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/detail-product/:id",
      element: <DetailProduct />,
    },
    {
      path: "/add-new-product",
      element: <AddNewProduct />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/my-cart",
      element: <MyCart />,
    },
    {
      path: "/summary",
      element: <Summary />,
    },
    {
      path: "/transaction-purchase",
      element: <TransactionPurchase />,
    },
    {
      path: "/transaction-sale",
      element: <TransactionSale />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
