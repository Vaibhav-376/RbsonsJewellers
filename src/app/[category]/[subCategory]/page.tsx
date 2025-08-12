import prisma from "../../../../prisma/client";
import Image from "next/image";

export default async function ProductsPage(props: {
    params: Promise<{ category: string; subCategory: string; name: string }>;
}) {
    const { category, subCategory } = await props.params;

    const categoryIdMapping = await prisma.category.findMany();
    const subCategoryIdMapping = await prisma.subCategory.findMany();

    const categoryId = categoryIdMapping.find((c) => c.slug === category)?.id;
    const subCategoryId = subCategoryIdMapping.find(
        (c) => c.slug === subCategory
    )?.id;


    if (categoryId === undefined || subCategoryId === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h1 className="text-3xl font-bold text-gray-800">No Products Found</h1>
                <p className="text-gray-500 mt-2">
                    Try exploring another category or subcategory.
                </p>
            </div>
        );
    }


    const products = await prisma.product.findMany({
        where: {
            categoryId: categoryId,
            subCategoryId: subCategoryId,
        },
        include: {
            category: true,
            subCategory: true,
            images: true,
        },
    });

    //   console.log(products);

    return (
        <div className="p-6 max-w-7xl mx-auto">

            <div className="mb-6 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    {subCategory}
                </h1>
                <p className="text-gray-500 mt-2">
                    Browse through our collection of {subCategory}
                </p>
            </div>


            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex flex-col"
                    >

                        <div className="relative w-full h-60 bg-gray-100 rounded-t-2xl overflow-hidden">
                            <Image
                                src={product.images[0]?.url || "/placeholder.png"}
                                alt={product.name}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                        </div>


                        <div className="p-4 flex flex-col flex-grow justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 truncate">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                    {product.description}
                                </p>
                            </div>


                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xl font-bold text-blue-600">
                                    ₹{product.price}
                                </span>
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
