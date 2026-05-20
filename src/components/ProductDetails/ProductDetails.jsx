import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import toast from "react-hot-toast";

function addToCart(id) {
  const token = localStorage.getItem("token");

  axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      {
        headers: { token },
      },
    )
    .then((res) => {
      toast.success("Added to cart 🛒");
      console.log(res.data);
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Error adding to cart");
    });
}
export default function ProductDetails() {
  let [src, setSrc] = useState();
  let { id, category } = useParams();
  // console.log(id);
  let [loading, setLoading] = useState(false);
  let [details, setDetails] = useState([]);
  let [relatedProduct, setRelatedProducts] = useState([]);

  function getDetails(id) {
    setLoading(true);
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setLoading(false);
        return data;
      })
      .catch(({ error }) => {
        setLoading(false);
        return error;
      });
  }
  function getRelatedProducts(category) {
    setLoading(true);
    return axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${category}`,
      )
      .then(({ data }) => {
        setLoading(false);
        return data;
      })
      .catch(({ error }) => {
        setLoading(false);
        return error;
      });
  }

  useEffect(() => {
    async function proDetails(id) {
      let { data } = await getDetails(id);
      // console.log(data);
      setDetails(data);
      let related = await getRelatedProducts(category);
      setRelatedProducts(related.data);
      console.log(relatedProduct);
    }
    proDetails(id);
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="row items-center">
        <div className="w-1/3 pe-3">
          <div>
            <img src={src ? src : details.imageCover} alt="" />
          </div>
          <div className="row">
            {details?.images?.map((img) => (
              <div key={img} className="p-1 w-1/4">
                <img
                  onClick={(e) => {
                    setSrc(e.target.src);
                  }}
                  src={img}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 ps-3">
          <div>
            <h3 className="font-bold text-xl">{details?.title}</h3>
            <span className="text-blue-500">{details?.category?.name}</span>
            <p>{details?.description}</p>
            <div className="flex justify-between my-3">
              <p>{details?.price} EGP</p>
              <span>
                {details?.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-300"></i>
              </span>
            </div>
            <button className="btn" onClick={() => addToCart(details._id)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {relatedProduct.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
