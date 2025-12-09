import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-[#F9F5EC] py-24 px-6 md:px-12 max-w-6xl mx-auto">

      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#C00000] mb-10 text-center leading-tight tracking-wide">
        About Santhosh Foam And Furnishings  
        <span className="block text-2xl md:text-3xl font-semibold text-gray-700 mt-2 tracking-normal">
          Quality Bedding in Chennai Since 2001
        </span>
      </h2>

      {/* Intro Paragraph */}
      <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-12 text-center md:text-left">
        Welcome to <span className="font-semibold">Santhosh Foam And Furnishings</span>, your trusted destination 
        for premium bedding products in Royapettah, Chennai, and Ambattur, Chennai, Tamil Nadu. 
        Since 2001, we’ve specialized in delivering comfort and quality with our wide range of offerings.
      </p>

      {/* Products Section */}
      <div className="mb-14">
        <h3 className="text-3xl font-bold text-[#C00000] mb-6 text-center md:text-left tracking-wide">
          Our Products
        </h3>

        <ul className="text-gray-700 text-lg leading-relaxed space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-2xl">✔️</span>
            <span>High-quality <span className="font-medium">bed mattresses</span></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✔️</span>
            <span>Durable <span className="font-medium">foam mattresses</span></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✔️</span>
            <span>Luxurious <span className="font-medium">bed quilts</span></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-2xl">✔️</span>
            <span>Soft and supportive <span className="font-medium">pillows</span></span>
          </li>
        </ul>
      </div>

      {/* Why Choose Us */}
      <div className="mb-14">
        <h3 className="text-3xl font-bold text-[#C00000] mb-6 text-center md:text-left tracking-wide">
          Why Choose Us?
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg leading-relaxed">
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <span className="text-2xl">🌟</span>
            <span>Trusted provider of bedding products since 2001</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <span className="text-2xl">💰</span>
            <span>Affordable prices without compromising quality</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <span className="text-2xl">👨‍🔧</span>
            <span>Skilled professionals with years of industry expertise</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <span className="text-2xl">🚚</span>
            <span>Timely delivery to your doorstep</span>
          </li>
          <li className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <span className="text-2xl">🤝</span>
            <span>Honest and reliable service you can count on</span>
          </li>
        </ul>
      </div>

      {/* Closing Paragraph */}
      <p className="text-gray-800 text-lg md:text-xl leading-relaxed text-center md:text-left">
        Whether you’re searching for the perfect mattress or other bedding essentials, 
        we are here to make your nights more restful. Visit us to explore our range of products 
        and find the best solutions for your home.
      </p>
    </section>
  );
};

export default AboutUs;
