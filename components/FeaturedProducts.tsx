'use client'
import Image from 'next/image';
import { assets } from '../assets/assets'

const FeaturedProducts = () => {

  const products = [
    {
      id: 1,
      image: assets.girl_with_headphone_image,
      title: "Unparalleled Sound",
      description: "Experience crystal-clear audio with premium headphones.",
    },
    {
      id: 2,
      image: assets.girl_with_earphone_image,
      title: "Stay Connected",
      description: "Compact and stylish earphones for every occasion.",
    },
    {
      id: 3,
      image: assets.boy_with_laptop_image,
      title: "Power in Every Pixel",
      description: "Shop the latest laptops for work, gaming, and more.",
    },
  ];

  return (
    <section className="mt-20 px-4 md:px-10 lg:px-16 max-w-[1440px] mx-auto transition-colors duration-300">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors">
            Featured Products
        </h2>
        <div className="w-16 h-1.5 bg-orange-600 mt-3 rounded-full"></div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {products.map(({ id, image, title, description }) => (
          <div 
            key={id} 
            className="relative group overflow-hidden rounded-3xl cursor-pointer bg-gray-100 dark:bg-gray-800 shadow-sm transition-colors duration-300"
          >
            {/* Image with Zoom Effect */}
            <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="group-hover:scale-110 group-hover:brightness-90 transition-all duration-700 w-full h-full object-cover dark:opacity-80 dark:group-hover:opacity-100"
              />
            </div>

            {/* Dark Gradient Overlay - Always dark, works for both modes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
              <div className="space-y-3">
                <h3 className="font-bold text-2xl lg:text-3xl text-white leading-tight">
                  {title}
                </h3>
                <p className="text-gray-200 text-sm lg:text-base leading-relaxed max-w-[260px] opacity-90">
                  {description}
                </p>
                
                <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 shadow-lg shadow-orange-900/40">
                  Shop Now
                  <Image className="h-3 w-3 brightness-0 invert" src={assets.redirect_icon} alt="icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts