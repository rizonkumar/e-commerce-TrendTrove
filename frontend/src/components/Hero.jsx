import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Hero Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="max-w-md">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 animate-slideDown">
            Our Best Sellers
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 prata-regular">
            LATEST ARRIVALS
          </h1>
          <p className="text-xl mb-6">Elevate Your Style</p>
          <p className="text-gray-600 mb-8">
            Discover timeless elegance in our latest collection
          </p>
          <button className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition duration-300 shadow-md animate-fadeIn">
            Shop Now
          </button>
        </div>
      </div>
      {/* Hero Right Section */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={assets?.hero_img}
          alt="Latest Fashion"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
    </div>
  );
};

export default Hero;
