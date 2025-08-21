"use client";

export default function HeroSection() {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

               
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Discover Our Premium <span className="text-blue-600">Products</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        High-quality, carefully crafted, and built to last. Explore our
                        collection and find the perfect fit for your needs.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <a
                            href="/products"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>

                
                <div className="flex justify-center">
                    <img
                        src="/hero image.png"
                        alt="Product showcase"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
}
