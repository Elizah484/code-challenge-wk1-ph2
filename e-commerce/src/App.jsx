import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

const App = () => {
  const [products] = useState([
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Jeans", price: 40 },
    { id: 3, name: "Sneakers", price: 60 },
    { id: 4, name: "Hat", price: 15 },
    { id: 5, name: "Socks", price: 5 },
  ]);

  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) setCart(savedCart);
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // Remove a product from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <h1>Simple E-Commerce Cart</h1>
      <div className="container">
        {/* Pass products and event handlers as props */}
        <ProductList products={products} addToCart={addToCart} />
        {/* Pass cart, event handlers, and total price as props */}
        <Cart
          cartItems={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default App;
