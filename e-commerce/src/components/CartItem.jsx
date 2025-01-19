import React from "react";
import "./CartItem.css";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>Price: ${item.price}</p>
      <div className="quantity">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
