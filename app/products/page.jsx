"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PuffLoader } from "react-spinners";

export default function products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <Link href={`/`}>
          <div className="border rounded-lg p-3 shadow-lg text-center bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 w-52">
            <h2 className="text-lg font-bold">Go to home</h2>
          </div>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <PuffLoader color="#4fa94d" size={80} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="border rounded-lg p-4 shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain"
                />
                <h3 className=" text-emerald-800 font-bold">
                  {product.category}
                </h3>
                <h2 className="text-lg font-bold mt-2">
                  {" "}
                  {product.title.split(" ").slice(0, 3).join(" ")}
                </h2>
                <p className="text-gray-800 mt-2 text-xl">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
