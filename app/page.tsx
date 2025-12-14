import Image from "next/image";
import Navbar from "../components/Navbar";
import HeaderSlider from "../components/HeaderSlider";
import HomeProducts from "../components/HomeProducts";
import FeaturedProducts from "../components/FeaturedProducts";
import Banner from "../components/Banner";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
//import { AppProvider } from "../context/AppContext";
export default function Home() {
  
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
          <HeaderSlider/>
          <HomeProducts/>
          <FeaturedProducts/>
          <Banner/>
          <NewsLetter/>    
      </div>
      <Footer/>
    </>
  );
}
