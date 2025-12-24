'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "@/components/seller/Footer";

const AddProduct = () => {

  const { getToken } = useAppContext() as any;

  const [files, setFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);

    files.forEach((file) => {
      if (file) formData.append('image', file);
    });

    try {
      const token = await getToken();
      const { data } = await axios.post('/api/product/add', formData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([null, null, null, null]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
        setOfferPrice('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error((error as any).message);
    }
  };

  const inputClasses = "w-full outline-none md:py-3 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-200";
  const labelClasses = "text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2 block px-1";

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="md:p-10 p-4 w-full">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Add New <span className="text-orange-600">Product</span></h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Upload details and images of your new item.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          {/* Image Upload Section */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
            <p className={labelClasses}>Product Images</p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {files.map((file, index) => (
                <label key={index} htmlFor={`image${index}`} className="group relative">
                  <input 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }
                    }} 
                    type="file" id={`image${index}`} hidden 
                  />
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden cursor-pointer group-hover:border-orange-500 transition-colors bg-white dark:bg-gray-800">
                    {file ? (
                      <Image
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width={112}
                        height={112}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-orange-500">
                         <Image src={assets.upload_area} alt="" width={30} height={30} className="dark:invert opacity-50 group-hover:opacity-100" />
                         <span className="text-[10px] font-bold uppercase">Upload</span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-tighter">* Maximum 4 images (JPG, PNG)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className={labelClasses} htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                type="text"
                placeholder="Ex: Wireless Noise Cancelling Headphones"
                className={inputClasses}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* Product Description */}
            <div className="md:col-span-2">
              <label className={labelClasses} htmlFor="product-description">Product Description</label>
              <textarea
                id="product-description"
                rows={4}
                className={`${inputClasses} resize-none`}
                placeholder="Provide detailed information about the product..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className={labelClasses} htmlFor="category">Category</label>
              <select
                id="category"
                className={inputClasses}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Earphone">Earphone</option>
                <option value="Headphone">Headphone</option>
                <option value="Watch">Watch</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Camera">Camera</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses} htmlFor="product-price">Price</label>
                <input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  className={inputClasses}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              <div>
                <label className={labelClasses} htmlFor="offer-price">Offer Price</label>
                <input
                  id="offer-price"
                  type="number"
                  placeholder="0.00"
                  className={inputClasses}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  value={offerPrice}
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full md:w-fit px-12 py-4 bg-orange-600 text-white font-bold rounded-2xl cursor-pointer hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 uppercase tracking-widest text-sm"
          >
            Add Product
          </button>
        </form>
      </div>
      <Footer /> 
    </div>
  );
};

export default AddProduct;