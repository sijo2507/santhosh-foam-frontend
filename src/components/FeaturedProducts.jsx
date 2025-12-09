import React from 'react';
import { getSizePricing } from "../utils/priceUtils";

const FeaturedProducts = ({ featured, shopNumber }) => {

  // CATEGORY BADGE COLORS
  const categoryColors = {
    mattress: "bg-red-100 text-red-700",
    cushion: "bg-blue-100 text-blue-700",
    accessories: "bg-yellow-100 text-yellow-700"
  };

  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      
      <h2 className="text-3xl md:text-4xl font-bold text-[#C00000] mb-12 text-center md:text-left">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featured.map(product => (
          <div
            key={product._id}
            className="group border border-[#E5E7EB] p-6 rounded-3xl shadow-lg bg-white 
                       transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* IMAGE */}
            <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* CATEGORY BADGE */}
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 
                ${categoryColors[product.category.toLowerCase()] || "bg-gray-200 text-gray-800"}`}
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>

            {/* TITLE */}
            <h2 className="mt-1 font-bold text-xl md:text-2xl text-[#C00000] leading-tight">
              {product.name}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-2 text-sm md:text-base text-gray-700 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* PRICING – HOVER REVEAL */}
            {product.sizes.length > 0 && (
              <div
                className="
                  mt-4 space-y-1 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                "
              >
                {product.sizes.map((s, index) => {
                  const {
                    sellingPrice,
                    mrp,
                    discountPercent,
                    label
                  } = getSizePricing(product, s);

                  return (
                    <p key={index} className="text-gray-800 text-sm md:text-base">
                      <span className="font-medium">{s.size}:</span>{" "}
                      
                      {/* Selling Price */}
                      <span className="font-semibold text-[#C00000]">₹{sellingPrice}</span>

                      {/* MRP (strike-through) */}
                      {mrp && (
                        <span className="text-gray-500 line-through ml-2 text-sm">₹{mrp}</span>
                      )}

                      {/* Discount Label */}
                      {label && (
                        <span className="ml-2 text-green-600 text-xs font-semibold">
                          {discountPercent ? `${discountPercent}% OFF` : `(${label})`}
                        </span>
                      )}
                    </p>
                  );
                })}

                {/* BUY BUTTON */}
                <a
                  href={`https://wa.me/${shopNumber}?text=Hi! I'm interested in the ${product.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center bg-gradient-to-r from-[#C00000] to-[#E60000] 
                             text-[#FDD700] px-6 py-3 rounded-xl font-semibold shadow-lg 
                             hover:from-[#E60000] hover:to-[#C00000] transition-all"
                >
                  Buy Now
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};

export default FeaturedProducts;
