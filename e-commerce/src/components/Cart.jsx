import React from "react";// displays cart items and the prices
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = ({ cartItems, updateQuantity, removeFromCart, totalPrice }) => {
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
