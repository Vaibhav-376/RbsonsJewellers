"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";

const CategorySubCategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    subCategoryName: "",
  });

  const Router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Category and Subcategory added successfully!");
      setFormData({ categoryName: "", subCategoryName: "" });
      Router.push("/admin/addProducts");
    } else {
      alert(data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-4 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Add Category & Subcategory</h2>

      <input
        type="text"
        name="categoryName"
        placeholder="Category Name"
        value={formData.categoryName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="text"
        name="subCategoryName"
        placeholder="Subcategory Name"
        value={formData.subCategoryName}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CategorySubCategoryForm;
