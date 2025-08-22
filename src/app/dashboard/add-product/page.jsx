"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [features, setFeatures] = useState([""]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/logIn");
  }, [status, router]);

  if (status === "loading") return <p className="flex justify-center mt-20"><span className="loading loading-ring loading-lg"></span></p>;
  if (status === "unauthenticated") return null;

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => setFeatures([...features, ""]);
  const removeFeatureField = (index) => setFeatures(features.filter((_, i) => i !== index));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      e.target.form.imageUrl.value = data.data.url;
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Image upload failed!");
    }

    setImgLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const brand = form.brand.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const image = form.imageUrl.value;

    const productData = {
      name,
      brand,
      description,
      price,
      image,
      features: features.filter(f => f.trim() !== ""),
      createdBy: session.user.email
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (res.ok) {
      toast.success("Product added successfully!");
      form.reset();
      setFeatures([""]);
    } else {
      toast.error("Failed to add product.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5">
      <Toaster position="top-right" />
      <div className="max-w-lg w-full p-6 rounded-lg shadow-md border dark:border-gray-500 border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Product Name" required className="input input-bordered w-full" />
          <input type="text" name="brand" placeholder="Brand" required className="input input-bordered w-full" />
          <textarea name="description" placeholder="Product Description" required className="textarea textarea-bordered w-full" />
          <input type="number" step="0.01" name="price" placeholder="Price" required className="input input-bordered w-full" />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
          <input type="hidden" name="imageUrl" />

          <div>
            <label className="font-semibold">Features</label>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                {features.length > 1 && (
                  <button type="button" onClick={() => removeFeatureField(index)} className="btn btn-error ml-2">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFeatureField} className="btn btn-outline mt-2 rounded">Add Feature</button>
          </div>

          <button type="submit" disabled={loading || imgLoading} className="btn bg-blue-700 text-white hover:bg-800 rounded w-full hover:bg-blue-800">
            {loading ? "Adding..." : imgLoading ? "Uploading Image..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
