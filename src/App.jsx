import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "./Header";
import { ProductsPage } from "./ProductsPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { CartPage } from "./CartPage";
import { Footer } from "./Footer";

axios.defaults.withCredentials = true;

// Layout component manages authentication state and cart state for the entire app
// This ensures the Header updates automatically when login/logout happens and cart count updates
function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Check authentication status when the app first loads
  // This reads from localStorage to maintain login state across page refreshes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("email"));
  }, []);

  // Load cart items when logged in
  // The [isLoggedIn] dependency means this effect runs whenever isLoggedIn changes
  // So when user logs in (false -> true), it fetches their cart
  // When user logs out (true -> false), it runs again but doesn't fetch (because of the if condition)
  useEffect(() => {
    if (isLoggedIn) {
      handleCartIndex();
    }
  }, [isLoggedIn]);

  const handleCartIndex = () => {
    console.log("handleCartIndex");
    axios.get("http://localhost:3000/carted_products.json").then((response) => {
      console.log("Cart items:", response.data);
      setCartItems(response.data);
    }).catch((error) => {
      console.error("Error fetching cart:", error);
    });
  }

  const handleAddToCart = (product) => {
    console.log("handleAddToCart", product);
    axios.post("http://localhost:3000/carted_products.json", {
      product_id: product.id,
      quantity: 1
    }).then((response) => {
      console.log("Added to cart:", response.data);
      handleCartIndex(); // Refresh cart after adding
    }).catch((error) => {
      console.error("Error adding to cart:", error);
    });
  }

  const handleRemoveFromCart = (cartedProduct) => {
    console.log("handleRemoveFromCart", cartedProduct);
    axios.delete(`http://localhost:3000/carted_products/${cartedProduct.id}.json`).then((response) => {
      console.log("Removed from cart:", response.data);
      handleCartIndex(); // Refresh cart after removing
    }).catch((error) => {
      console.error("Error removing from cart:", error);
    });
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ 
        setIsLoggedIn, 
        cartItems, 
        onAddToCart: handleAddToCart, 
        onRemoveFromCart: handleRemoveFromCart,
        onRefreshCart: handleCartIndex
      }} />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
