import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Mattresses", icon: "🛏️", description: "Comfortable and durable, doctor-recommended mattresses." },
  { name: "Cushions", icon: "🛋️", description: "Stylish cushions for your sofas to make your living room luxurious." },
  { name: "Pillows", icon: "🛌", description: "Soft and ergonomic pillows for restful sleep." },
  { name: "Accessories", icon: "🧵", description: "Small essentials like bedsheets, pillow covers, doormats, chairs, slim beds, and more." },
];

const CategoryHighlights = () => (
  <section className="max-w-6xl mx-auto py-20 px-4">

    {/* Section Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-[#C00000] mb-12 text-center tracking-wide">
      Shop by Category
    </h2>

    {/* Category Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((cat, idx) => (
        <Link
          key={idx}
          to={`/products#${cat.name}`}
          className="
            group bg-white p-8 rounded-2xl shadow-md 
            hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300
            border border-transparent hover:border-[#C00000]/20
          "
        >
          {/* Icon Placeholder Circle */}
          <div className="w-14 h-14 rounded-full bg-[#C00000]/10 flex items-center justify-center mb-6 group-hover:bg-[#C00000]/20 transition">
            <span className="text-3xl text-[#C00000]">{cat.icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#C00000] mb-3 group-hover:tracking-wide transition-all">
            {cat.name}
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed">
            {cat.description}
          </p>
        </Link>
      ))}
    </div>

  </section>
);

export default CategoryHighlights;
