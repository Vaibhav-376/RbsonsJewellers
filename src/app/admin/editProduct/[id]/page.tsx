'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { editProduct } from '@/store/ProductSlice';

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    weight:0,
    price: 0,
    stock: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const updated = await res.json();

    if (res.ok) {
      dispatch(editProduct(updated));
      router.push('/admin');
    } else {
      alert('Failed to update product');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 mb-2">Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="weight" className="text-gray-700 mb-2">Weight</label>
            <input
              name="weight"
              type="number"
              value={product.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 mb-2">Price</label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="stock" className="text-gray-700 mb-2">Stock</label>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="description" className="text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
