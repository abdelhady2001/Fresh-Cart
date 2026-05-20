import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  let { title, category, _id, price, ratingsAverage, imageCover } = product;

  let { addToCart } = useContext(CartContext);

  async function addProductToCart(id) {
    let data = await addToCart(id);
    console.log(data);
    if (data?.status == "success") {
      toast.success("Successfully added to cart!", {
        position: "top-center",
      });
    } else {
      toast.error("fail to add to cart!");
    }
  }
  return (
    <>
      <div className="w-ful sm:w-1/2 md:w-1/3 lg:w-1/5 p-3 m-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ">
          <Link to={`/productdetails/${_id}/${category._id}`}>
            <img
              className="p-3 rounded-t-lg"
              src={imageCover}
              alt="product image"
            />

            <div className="px-5 pb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ">
                {category.name}
              </span>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1 ">
                {title}
              </h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm  ms-3">
                  {ratingsAverage}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center justify-between px-3 pb-3">
            <span className="text-xl font-bold text-gray-900 ">
              {price} EGP
            </span>
            <span
              onClick={() => {
                addProductToCart(_id);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add to cart
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
