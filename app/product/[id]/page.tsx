"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "../../../components/ProductCard";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/AppContext";

const Product = () => {
    const { id } = useParams() as any;
    const { products, router, addToCart } = useAppContext() as any;

    const [mainImage, setMainImage] = useState<any>(null);
    const [productData, setProductData] = useState<any>(null);
    const [isAdded, setIsAdded] = useState(false);

    const fetchProductData = async () => {
        const product = products.find((product: any) => product._id === id);
        setProductData(product);
        if (product) setMainImage(product.image[0]);
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products?.length]);

    const handleAddToCart = () => {
        addToCart(productData._id);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return productData ? (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            
            <main className="px-4 md:px-10 lg:px-20 xl:px-32 pt-6 md:pt-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-400 dark:text-gray-500 mb-6 md:mb-10">
                    <span className="cursor-pointer hover:text-orange-600 transition-colors" onClick={() => router.push('/')}>Home</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-orange-600 transition-colors capitalize" onClick={() => router.push(`/search?category=${productData.category}`)}>{productData.category}</span>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[150px] md:max-w-none">{productData.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20">
                    
                    {/* Left: Image Gallery */}
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group shadow-inner">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt={productData.name}
                                className="w-full h-full object-contain p-6 md:p-12 transition-transform duration-700 group-hover:scale-105"
                                width={800}
                                height={800}
                                priority
                            />
                            {/* Zoom Indicator */}
                            <div className="absolute bottom-6 right-6 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Image src={assets.search_icon} className="w-5 h-5 dark:invert" alt="zoom" />
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto py-2 no-scrollbar justify-center lg:justify-start">
                            {productData.image.map((image: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 transform ${
                                        mainImage === image 
                                        ? "border-orange-600 scale-105 shadow-md shadow-orange-100 dark:shadow-none" 
                                        : "border-transparent bg-gray-50 dark:bg-gray-900 grayscale-[0.5] hover:grayscale-0"
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`view-${index}`}
                                        className="w-full h-full object-contain p-2"
                                        width={150}
                                        height={150}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info (Sticky on Large Screens) */}
                    <div className="flex flex-col lg:sticky lg:top-24 h-fit">
                        <div className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-black rounded-full w-fit mb-6 uppercase tracking-[0.2em]">
                            {productData.category}
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                            {productData.name}
                        </h1>

                        <div className="flex items-center gap-4 mt-6">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800">
                                <div className="flex gap-0.5 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Image 
                                            key={i} 
                                            className="h-3 w-3" 
                                            src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
                                            alt="star" 
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-gray-900 dark:text-gray-100">4.8</span>
                            </div>
                            <span className="text-sm text-gray-400 dark:text-gray-500 font-bold tracking-tighter uppercase">(2.4k Verified Sales)</span>
                        </div>

                        {/* Pricing Section */}
                        <div className="mt-10 flex flex-col gap-1">
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-black text-gray-900 dark:text-white">${productData.offerPrice}</span>
                                <span className="text-2xl text-gray-300 dark:text-gray-600 line-through font-medium">${productData.price}</span>
                            </div>
                            <p className="text-green-600 dark:text-green-500 text-sm font-bold flex items-center gap-1.5 mt-2">
                                <span className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded text-[10px]">SAVE {Math.round(((productData.price - productData.offerPrice) / productData.price) * 100)}%</span>
                                You save ${(productData.price - productData.offerPrice).toFixed(2)}
                            </p>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mt-8 max-w-xl">
                            {productData.description}
                        </p>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                            {[
                                { icon: "🛡️", title: "1 Year Warranty", desc: "Genuine Brand Guarantee" },
                                { icon: "🚚", title: "Free Shipping", desc: "On orders over $100" }
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-gray-100 dark:border-gray-800">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{feature.title}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center mt-12 gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`group w-full sm:flex-1 py-5 px-8 rounded-full border-2 font-black text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 ${
                                    isAdded 
                                    ? "bg-green-600 border-green-600 text-white shadow-2xl shadow-green-600/20" 
                                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-600"
                                }`}
                            >
                                {isAdded ? (
                                    <><span>✓</span> Item In Cart</>
                                ) : (
                                    <>
                                        <Image src={assets.heart_icon} className="w-4 h-4 opacity-40 dark:invert group-hover:opacity-100" alt="wishlist" />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    addToCart(productData._id);
                                    router.push("/cart");
                                }}
                                className="w-full sm:flex-1 py-5 px-8 rounded-full bg-orange-600 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/30 active:scale-95"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-32 mb-20">
                    <div className="flex flex-col items-center mb-16">
                        <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Curated for you</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Recommended Products</h2>
                        <div className="w-12 h-1.5 bg-orange-600 mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {products
                            .filter((p: any) => p._id !== id) // Filter out current product
                            .slice(0, 5)
                            .map((product: any, index: number) => (
                                <ProductCard key={index} product={product} />
                            ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    ) : (
        <Loading />
    );
};

export default Product;