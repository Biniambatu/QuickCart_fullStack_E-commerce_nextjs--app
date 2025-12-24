'use client';
import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "../../../components/seller/Footer";
import Loading from "../../../components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, getToken, user } = useAppContext() as any;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/product/seller-list', { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-white dark:bg-gray-950 transition-colors duration-300">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Product <span className="text-orange-600">Inventory</span></h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your listed products</p>
            </div>
            <button 
               onClick={() => router.push('/seller')}
               className="bg-gray-900 dark:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
            >
              + Add New
            </button>
          </div>

          <div className="max-w-5xl w-full overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 max-sm:hidden">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {products.length > 0 ? (
                    products.map((product: any, index: number) => (
                      <tr key={index} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <div className="h-14 w-14 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-1">
                            <Image
                              src={product.image?.[0]}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                              width={60}
                              height={60}
                            />
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[150px] md:max-w-xs">
                            {product.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-sm:hidden">
                           <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[11px] font-bold rounded-full uppercase tracking-tighter">
                            {product.category}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 dark:text-white font-bold text-base">
                            ${product.offerPrice}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => router.push(`/product/${product._id}`)}
                            className="inline-flex items-center justify-center p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 transition-all"
                            title="View Product"
                          >
                            <Image
                              className="w-4 h-4 dark:invert group-hover:invert-0 transition-all"
                              src={assets.redirect_icon}
                              alt="View"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                           <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">📦</div>
                           <p className="font-bold">No products found</p>
                           <p className="text-xs">Start by adding your first product to the inventory.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;