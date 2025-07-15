"use client";

import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: unknown;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

const AdminPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subCategory: "",
    imagePublicIds: [] as string[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, subRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/admin/subCategories"),
      ]);
      const catData = await catRes.json();
      const subData = await subRes.json();

      setCategories(catData.categories || []);
      setSubCategories(subData.subCategories || []);
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseInt(formData.price, 10),
      stock: parseInt(formData.stock, 10),
    };

    if (isNaN(payload.price) || isNaN(payload.stock)) {
      alert("Price and Stock must be valid numbers.");
      return;
    }

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        subCategory: "",
        imagePublicIds: [],
      });
      router.push("/");
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <div className="flex justify-end mr-4">
        <Link href="/admin/AddCategory"><button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4">
          Add Category
        </button></Link>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 max-w-xl mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          min="0"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="border p-2 rounded"
          min="0"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Subcategory</option>
          {subCategories
            .filter((sub) => {
              const selectedCat = categories.find((c) => c.name === formData.category);
              return selectedCat && sub.categoryId === selectedCat.id;
            })
            .map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
        </select>

        <CldUploadWidget
          uploadPreset="preset"
          options={{
            sources: ["local", "camera", "google_drive"],
            multiple: true,
            maxFiles: 10,
          }}
          onSuccess={(result) => {
            if (result.event !== "success") return;
            const info = result.info as CloudinaryUploadResult;

            setFormData((prev) => ({
              ...prev,
              imagePublicIds: [...prev.imagePublicIds, info.secure_url],
            }));
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload Product Images
            </button>
          )}
        </CldUploadWidget>

        {/* Show image previews */}
        <div className="grid grid-cols-3 gap-2">
          {formData.imagePublicIds.map((url, idx) => (
            <Image key={idx} src={url} alt={`Product ${idx}`} className="w-full h-32 object-cover rounded" />
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Product
        </button>
      </form>
    </>

  );
};

export default AdminPage;
