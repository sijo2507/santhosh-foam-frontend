import React, { useEffect, useState } from 'react';
import fetchProducts from './../api';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import CategoryHighlights from '../components/CategoryHighlights';
import FeaturedProducts from '../components/FeaturedProducts';
import ContactUs from '../components/ContactUs';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';


const LandingPage = () => {
  useEffect(() => {
  document.title = "Santhosh Foam & Furnishings | Premium Comfort Since 2001";
  }, []);

  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
  const getProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);

    // ---- MIXED FEATURED PRODUCTS LOGIC ----
    const mattresses = data.filter(p => p.category === "mattress");
    const cushions = data.filter(p => p.category === "cushion");
    const accessories = data.filter(p => p.category === "accessories");

    const pickRandom = (arr, n) =>
      [...arr].sort(() => Math.random() - 0.5).slice(0, n);

    let mixed = [
      ...pickRandom(mattresses, 2),
      ...pickRandom(cushions, 2),
      ...pickRandom(accessories, 2)
    ];

    // If less than 6 → fill from remaining products
    if (mixed.length < 6) {
      const usedIds = new Set(mixed.map(p => p._id));
      const remaining = data.filter(p => !usedIds.has(p._id));
      mixed = [...mixed, ...pickRandom(remaining, 6 - mixed.length)];
    }

    setFeatured(mixed.slice(0, 6));
    // ---- END OF MIXED LOGIC ----
  };

  getProducts();
}, []);


  const shopNumber = "919444765603";

  return (
    <div className='bg-[#F9F5EC] min-h-screen'>
      <HeroSection />
      <AboutUs />
      <CategoryHighlights />
      <FeaturedProducts featured={featured} shopNumber={shopNumber} />
      <ContactUs />
      <ChatBot/>
      <WhatsAppFloatingButton shopNumber={shopNumber} />
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
