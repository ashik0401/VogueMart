"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
       
        setProducts(data.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="lg:max-w-7xl mx-auto px-5 text-center md:w-11/12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Highlights</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Discover our most popular and latest products.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col border border-gray-200 dark:border-none"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col text-start">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-1">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => openModal(product)}
                  className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/productsPage")}
          className="mt-10 dark:bg-gray-800 dark:text-white px-6 py-3 rounded dark:hover:bg-gray-900 bg-none border border-blue-500 hover:bg-blue-600 transition hover:text-white cursor-pointer dark:border-none"
        >
          View All Products
        </button>
      </div>

      
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 px-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-0.5 right-2 text-gray-500 hover:text-red-500 font-bold text-xl cursor-pointer"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-96 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Brand: {selectedProduct.brand || "N/A"}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedProduct.description}
            </p>
            <ul className="mb-4 list-disc list-inside">
              {selectedProduct.features?.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold">
              ${selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
