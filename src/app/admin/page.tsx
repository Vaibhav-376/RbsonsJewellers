'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
    getProducts,
    setError,
    setLoading,
    deleteProduct,
} from '@/store/ProductSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 5;

export interface ProductImage {
    url: string;
}

export interface Category {
    name: string;
}

export interface SubCategory {
    name: string;
}

export interface Product {
    id: string | number;
    name: string;
    weight:number,
    price: number;
    category?: Category | null;
    subCategory?: SubCategory | null;
    images?: ProductImage[];
}


const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setLoading(true));
                const res = await fetch('/api/admin/products');
                const data = await res.json();
                dispatch(getProducts(data.products));
            } catch (err: unknown) {
                let message = 'Something went wrong';
                if (err instanceof Error) {
                    message = err.message;
                }
                dispatch(setError(message));
                toast.error(message);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchProducts();
    }, [dispatch]);

 const filteredProducts = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleDelete = (id: string) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        try {
            const res = await fetch(`/api/admin/products/${productToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok) {
                throw new Error('Failed to delete product');
            }
            dispatch(deleteProduct(productToDelete));
            toast.success('Product deleted');
        } catch (error) {
            toast.error('Failed to delete product');
            console.log('Error deleting product:', error);
        } finally {
            setShowModal(false);
            setProductToDelete(null);
        }
    };

    const handleEdit = (id: string | number) => {
        router.push(`/admin/editProduct/${id}`);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <ToastContainer />
            <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">🛍️ Product Dashboard</h2>
                <Link href="/admin/addProducts">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
                        ➕ Add Product
                    </button>
                </Link>
            </div>

            <input
                type="text"
                placeholder="🔍 Search products or category"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                }}
                className="mb-4 w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {loading && <p className="text-blue-500 font-semibold">Loading products...</p>}
            {error && <p className="text-red-500 font-semibold">{error}</p>}

            {!loading && !error && (
                <>
                    {paginatedProducts.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">
                            No products found for this query or page.
                        </p>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse rounded-lg shadow overflow-hidden">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-3 text-left border">#</th>
                                            <th className="p-3 text-left border">Name</th>
                                            <th className="p-3 text-left border">Price</th>
                                            <th className="p-3 text-left border">Weight</th>
                                            <th className="p-3 text-left border">Category</th>
                                            <th className="p-3 text-left border">Subcategory</th>
                                            <th className="p-3 text-left border">Images</th>
                                            <th className="p-3 text-center border">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedProducts.map((product, index) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="p-3 border">
                                                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                                </td>
                                                <td className="p-3 border font-medium">{product.name}</td>
                                                <td className="p-3 border">₹{product.price}</td>
                                                <td className="p-3 border">{product.weight}gm</td>
                                                <td className="p-3 border">{product.category?.name || '-'}</td>
                                                <td className="p-3 border">{product.subCategory?.name || '-'}</td>
                                                <td className="p-3 border">
                                                    <div className="flex gap-2 flex-wrap">
                                                        {product.images?.map((img, i) => (
                                                            <Image
                                                                key={i}
                                                                src={img.url}
                                                                alt={`Product image ${i + 1}`}
                                                                width={100}
                                                                height={100}
                                                                className="rounded object-cover border"
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-3 border text-center">
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleEdit(product.id)}
                                                            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(String(product.id))}
                                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 py-1 rounded border ${currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">⚠️ Confirm Deletion</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;