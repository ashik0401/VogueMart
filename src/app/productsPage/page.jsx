"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const id = searchParams.get("productId");
    if (id && products.length) {
      const product = products.find((p) => p._id === id);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [searchParams, products]);

  const openModal = (product) => {
    setSelectedProduct(product);
    router.replace(`${pathname}?productId=${product._id}`, { scroll: false });
  };

  const closeModal = () => {
    setSelectedProduct(null);
    router.replace(pathname, { scroll: false });
  };

  return (
    <section className="md:w-11/12 mx-auto px-5 py-16">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid sm:grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between h-full"
          >
            <img
              className="w-full lg:h-72 sm:h-52 rounded-t-lg"
              src={product.image}
              alt={product.name}
            />
            <div className="p-5 flex-1">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2 dark:text-white/80">{product.description}</p>
              <p className="text-lg font-bold mt-auto">${product.price.toFixed(2)}</p>
            </div>
            <div className="p-5 text-end">
              <button
                onClick={() => openModal(product)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 px-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-0.5 right-2 text-gray-500 hover:text-red-500 font-bold text-xl"
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
            <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProduct.description}</p>
            <ul className="mb-4 list-disc list-inside">
              {selectedProduct.features.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{feature}</li>
              ))}
            </ul>
            <p className="text-lg font-bold">${selectedProduct.price.toFixed(2)}</p>
          </div>
        </div>
      )}
    </section>
  );
}
