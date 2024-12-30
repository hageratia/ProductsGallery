"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PuffLoader } from "react-spinners";

export default function ProductDetails({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <PuffLoader color="#4fa94d" size={80} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Product not found!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
        {/* صورة المنتج */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-contain"
        />
        {/* تفاصيل المنتج */}
        <div className="productDet flex flex-col justify-center">
          <h1 className="text-lg font-bold mt-2">
            {product.title.split(" ").slice(0, 3).join(" ")}
          </h1>
          <h3 className="text-emerald-800 font-bold">{product.category}</h3>
          <p className="text-gray-800 mt-2 text-xl">${product.price}</p>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-sm mt-2">
            <span className="font-bold text-gray-900">Category:</span>{" "}
            {product.category}
          </p>
        </div>
      </div>

      {/* زر العودة */}
      <Link href={`/products`}>
        <div className="border rounded-lg p-3 mt-6 shadow-lg text-center bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 w-52">
          <h2 className="text-lg font-bold">Go to Products</h2>
        </div>
      </Link>
    </div>
  );
}
