import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="w-full bg-[#ffc233] py-2">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <p className="text-[14px] font-bold text-center sm:text-left">
          Payout fees sliced — another step towards a better Lemon Squeezy
        </p>
        <button className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-gray-100 transition-colors border-0 whitespace-nowrap">
          Read more
        </button>
      </div>
    </div>
  );
};

export default Banner;
