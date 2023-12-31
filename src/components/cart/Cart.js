import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import CartItem from "../../components/cartitem/CartItem";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

function Cart({ onClose }) {
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const isEmpty = cart.length === 0;

  async function handleCheckout() {
    const response = await axiosClient.post("/orders", {
      products: cart,
    });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: response.data.stripeId,
    });
  }

  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose />
            Close
          </div>
        </div>

        <div className="cart-item">
          {cart.map((item) => (
            <CartItem cart={item} />
          ))}
        </div>
        {isEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart Is Empty 😟</h4>
          </div>
        )}

        {!isEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-msg">Total : </h3>
              <h3 className="total-val">₹ {totalAmount}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>
              Checkout Now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
