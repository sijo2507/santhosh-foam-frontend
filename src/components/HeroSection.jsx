import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroImage =
    "https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section
      className="
        relative h-[80vh] w-full flex items-center justify-center text-center 
        bg-[#C00000] overflow-hidden
      "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-125 contrast-105"
        style={{ backgroundImage: `url('${heroImage}')` }}
      ></div>

      {/* Light red overlay (Option A selected) */}
      <div className="absolute inset-0 bg-[#C00000]/40"></div>

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C00000]/10 to-[#C00000]/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8 animate-fadeIn">
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide leading-tight text-[#FDD700] drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
          Santhosh Foam And Furnishings
        </h1>

        {/* Gold underline */}
        <div className="w-28 h-1 bg-[#FDD700] mx-auto rounded-full shadow-[0_0_12px_rgba(253,215,0,0.6)]"></div>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-yellow-100 max-w-2xl mx-auto leading-relaxed">
          Premium comfort for your home – mattresses, sofas & more
        </p>

        {/* CTA Button */}
        <Link
          to="/products"
          className="
            inline-block bg-[#FDD700] text-[#C00000] px-10 py-4 md:px-12 md:py-5 
            rounded-2xl font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(253,215,0,0.7)]
            hover:bg-yellow-400 transition-all duration-300 hover:scale-105
          "
        >
          Shop Now
        </Link>

        {/* ⭐ Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-yellow-100 text-sm md:text-base font-medium">
          
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>Since 2001</span>
          </div>

          <div className="flex items-center gap-2">
            <span>🛏️</span>
            <span>Custom Size Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span>🚚</span>
            <span>Chennai Delivery Available</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
