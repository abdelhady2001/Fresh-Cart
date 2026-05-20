import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Cart() {
  let [cart, setCart] = useState([]);
  let { getCart, removeFromCart, clearCart, updateCart } =
    useContext(CartContext);

  useEffect(() => {
    async function getCartDetails() {
      let { data } = await getCart();
      console.log(data.products);
      setCart(data);
    }
    getCartDetails();
  }, []);

  async function removeItem(id) {
    console.log(id);
    let { data } = await removeFromCart(id);
    setCart(data);
    console.log(data);
  }
  async function updateItems(id, count) {
    if (count < 1) {
      removeItem(id);
      return;
    }
    let { data } = await updateCart(id, count);
    setCart(data);
  }
  async function clear() {
    let { data } = await clearCart();
    setCart(data);
    console.log(data);
  }
  async function handleCheckout() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart._id}?url=http://localhost:5173/success`,
        {},
        {
          headers: { token },
        },
      );

      window.location.href = data.session.url;
    } catch (error) {
      console.log(error);
      toast.error("Checkout failed");
    }
  }
  return (
    <div>
      {/* TOTAL INFO */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>

          <p className="text-gray-600 mt-2">
            Total Items:
            <span className="font-semibold ms-2">
              {cart?.products?.reduce((total, item) => total + item.count, 0)}
            </span>
          </p>

          <p className="text-green-600 font-bold mt-1">
            Total Price: {cart?.totalCartPrice} EGP
          </p>
        </div>

        <button
          className="btn bg-green-500 text-white"
          onClick={handleCheckout}
        >
          Checkout
        </button>

        <button
          onClick={clear}
          className="p-4 rounded-lg bg-red-600 hover:bg-red-800 text-white"
        >
          Clear Cart
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>

              <th scope="col" className="px-6 py-3">
                Product
              </th>

              <th scope="col" className="px-6 py-3">
                Qty
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {cart?.products?.map((product) => {
              return (
                <tr
                  key={product.product._id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={product?.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product?.product.title}
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product?.product.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {/* MINUS */}
                      <button
                        onClick={() => {
                          updateItems(product.product._id, product.count - 1);
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>

                      {/* INPUT */}
                      <div>
                        <input
                          value={product?.count}
                          onChange={(e) => {
                            updateItems(
                              product.product._id,
                              Number(e.target.value),
                            );
                          }}
                          type="number"
                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1"
                        />
                      </div>

                      {/* PLUS */}
                      <button
                        onClick={() => {
                          updateItems(product.product._id, product.count + 1);
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product?.price} EGP
                  </td>

                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        removeItem(product.product._id);
                      }}
                      className="cursor-pointer font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
