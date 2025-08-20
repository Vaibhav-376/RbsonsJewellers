import React from "react";
import prisma from "../../../../../prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {

  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      subCategory: true,
      category: true,
      images: true,
    },
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-500">
        Product Not Found
      </div>
    );
  }

  return ( 
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/">Home</Link> /{" "}
        <Link href={
          `/${product?.category?.slug}/${product.subCategory?.slug}`
        }>
          {product.subCategory?.name}
        </Link>{" "}
        / <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-2xl shadow-lg border border-gray-200"
          />

          <div className="flex gap-3 mt-4">
            {product.images.map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`${product.name} ${idx + 1}`}
                width={80}
                height={80}
                className="rounded-lg border hover:scale-105 transition cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            {product.description || "Elegant and timeless jewelry piece."}
          </p>

          <p className="text-2xl font-semibold text-blue-700 mt-4">
            ₹{product.price}
          </p>

          <div className="mt-3 text-sm text-gray-500">
            Category:{" "}
            <span className="font-medium text-gray-700">
              {product.category?.name}
            </span>
            {" • "}
            Subcategory:{" "}
            <span className="font-medium text-gray-700">
              {product.subCategory?.name}
            </span>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl shadow hover:bg-gray-300 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">Product Details</h2>
        <p className="text-gray-700 leading-relaxed">
          {product.description ||
            "This exquisite piece is crafted with precision and designed to complement your elegance. Perfect for weddings, parties, and special occasions."}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;