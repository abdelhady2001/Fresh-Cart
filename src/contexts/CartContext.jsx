import axios from "axios";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let { token } = useContext(UserContext);
  let headers = {
    token: token,
  };

  function getCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        },
      )
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }

  function removeFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
  function updateCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        },
      )
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then(({ data }) => data)
      .catch(({ error }) => error);
  }
  function checkoutSession(cartId) {
    const token = localStorage.getItem("token");

    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      {},
      {
        headers: { token },
      },
    );
  }

  return (
    <CartContext.Provider
      value={{ addToCart, getCart, removeFromCart, clearCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
