import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { createBrowserRouter, Outlet,RouterProvider } from "react-router-dom";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import MindFoodItemRestaurants from "./Components/MindFoodItemRestaurants";
import ContextProvider from "./utils/ContextProvider";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./Components/Cart";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";

// Header
//     - logo
//     - nav - items
// Body
//     - search
//     - Restaurant_container
//     - Restaurnat - cards
// Footer
//     - copyright
//     - links
   
const Footer = () => {
    
}

const AppLayout = () => {
    return (
      <div className="main">
        <Header />
        <Outlet /> {/*Nested components will be rendered here*/}
        <div className="footer-ele">
          <Footer />
        </div>
      </div>
    );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
        children: [
            {
                path: "/",
                element:<Body/>
    },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
          },
          {
            path: "/restaurant/:resId",
            element:<RestaurantMenu/>
          },
          {
            path: "/foodItem/:item/:itemId",
            element:<MindFoodItemRestaurants/>
          },
          {
            path: "/cart",
            element:<Cart/>
          }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
    <Toaster/>
  </Provider>
);