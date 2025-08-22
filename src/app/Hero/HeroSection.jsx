"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-blue-100  dark:bg-gray-800  md:h-[70vh] pt-6 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center md:h-full" >
        
     
        <div className="flex justify-center order-1 md:order-2 bg-transparent">
          <img
            src="/hero image.png"
            alt="Product showcase"
            className="w-full max-w-md "
          />
        </div>

        
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl lg::text-5xl font-bold text-gray-900 leading-tight dark:text-white">
            Discover Our Premium <span className="text-blue-600">Products</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            High-quality, carefully crafted, and built to last. Explore our
            collection and find the perfect fit for your needs.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <Link
              href="/productsPage"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
