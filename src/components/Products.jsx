import React, { useEffect, useState } from "react";
import fetchProducts from "./../api";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

// IMPORT PRICE UTILS
import {
  getSizePricing,
  getProductMinSellingPrice,
} from "../utils/priceUtils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");

  // UI STATES
  const [mainImage, setMainImage] = useState("");

  const shopNumber = "919444765603";
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "Explore Products | Santhosh Foam & Furnishings";
  }, []);


  // FETCH PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image || "");
    }
  }, [selectedProduct]);

  useEffect(() => {
  if (selectedProduct) {
    document.title = `${selectedProduct.name} | Santhosh Foam`;
  } else {
    document.title = "Explore Products | Santhosh Foam & Furnishings";
  }
  }, [selectedProduct]);


  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.brand).filter(Boolean))];

  // CATEGORY CHIPS
  const categoryChips = [
    { value: "All", label: "All", icon: "✨" },
    { value: "mattress", label: "Mattress", icon: "🛏️" },
    { value: "cushion", label: "Cushion", icon: "🛋️" },
    { value: "accessories", label: "Accessories", icon: "🎒" },
  ];

  // FILTER + SEARCH
  let filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      (product.category || "").toLowerCase() === selectedCategory.toLowerCase();

    const brandMatch =
      selectedBrand === "All" || product.brand === selectedBrand;

    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && brandMatch && searchMatch;
  });

  // SORTING
  if (sortOption === "low-to-high") {
    filteredProducts.sort(
      (a, b) => getProductMinSellingPrice(a) - getProductMinSellingPrice(b)
    );
  }
  if (sortOption === "high-to-low") {
    filteredProducts.sort(
      (a, b) => getProductMinSellingPrice(b) - getProductMinSellingPrice(a)
    );
  }

  // UTIL FUNCTIONS
  const extractImageUrls = (text) => {
    if (!text) return [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const removeUrlsFromText = (text) =>
    text ? text.replace(/https?:\/\/\S+/g, "").trim() : "";

  // PRODUCT CARD
  const ProductCard = ({ product }) => (
    <div className="border border-white/40 bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition transform hover:-translate-y-1">
      <div className="w-full aspect-[4/3] bg-[#F8F9FA] flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#C00000] truncate">
          {product.name}
        </h3>
        <p className="text-sm text-[#1F2937] mt-2 line-clamp-3">
          {removeUrlsFromText(product.description)}
        </p>

        {/* PRICING */}
        <div className="mt-3">
          {product.sizes.map((s, idx) => {
            const {
              sellingPrice,
              mrp,
              discountPercent,
              label,
            } = getSizePricing(product, s);

            return (
              <p key={idx} className="text-sm">
                <span className="font-semibold text-[#C00000]">
                  ₹{sellingPrice}
                </span>

                {mrp && (
                  <span className="line-through text-gray-500 ml-2 text-xs">
                    ₹{mrp}
                  </span>
                )}

                {discountPercent && (
                  <span className="text-green-600 ml-2 text-xs font-semibold">
                    {discountPercent}% OFF
                  </span>
                )}

                {!discountPercent && label && (
                  <span className="ml-2 text-[#C00000] text-xs font-semibold">
                    ({label})
                  </span>
                )}
              </p>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-semibold bg-gradient-to-r from-[#C00000] to-[#E60000] text-[#FDD700] px-3 py-2 rounded-lg shadow"
          >
            See More
          </button>
          <a
            href={`https://wa.me/${shopNumber}?text=Hi! I'm interested in the ${product.name}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#C00000] underline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  // SECTION GROUPING
  const mattresses = filteredProducts.filter(
    (p) => p.category?.toLowerCase() === "mattress"
  );
  const cushions = filteredProducts.filter(
    (p) => p.category?.toLowerCase() === "cushion"
  );
  const accessories = filteredProducts.filter(
    (p) => p.category?.toLowerCase() === "accessories"
  );

  // Mattress brand sections
  const mattressBrandSections = [
    { key: "duroflex", label: "Duroflex", icon: "🛏️" },
    { key: "coir-on", label: "Coir-on", icon: "🌿" },
    { key: "sleepy head", label: "Sleepy Head", icon: "😴" },
    {
      key: "customized mattress",
      label: "Customized Mattress (In-house Exclusive)",
      icon: "⭐",
      exclusive: true,
    },
  ];

  const usedMattressIds = new Set();

  // Accessories simplified sub-sections
  const accessoryTypeSections = [
    { key: "pillow", label: "Pillows", icon: "🛏️" },
    { key: "bedsheet", label: "Bedsheets & Comforters", icon: "🛌" },
    { key: "bed sheet", label: "Bedsheets & Comforters", icon: "🛌" },
    { key: "comforter", label: "Bedsheets & Comforters", icon: "🛌" },
  ];

  const usedAccessoryIds = new Set();
  
    return (
    <div className="bg-gradient-to-b from-[#F9F5EC] to-[#F3E7D3] min-h-screen flex flex-col">
      <div className="flex-grow p-6 md:p-10">

        {/* Top sticky header */}
        <div className="fixed top-0 left-0 w-full bg-[#C00000] text-[#FDD700] py-3 px-4 md:px-8 shadow-lg z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-lg font-semibold hover:text-white transition-colors"
              >
                ← Home
              </button>
              <h1 className="text-xl font-bold">Explore Products</h1>
            </div>
          </div>
        </div>

        <div className="h-16" />

        <div className="max-w-6xl mx-auto">
          {/* Page heading */}
          <h2 className="text-4xl font-extrabold text-center text-[#C00000] mb-6">
            Our Collections
          </h2>

          {/* Filter Bar */}
          <div className="sticky top-20 z-40 mb-6">
            <div className="backdrop-blur-xl bg-white/15 border border-white/40 shadow-lg rounded-3xl px-4 py-4 md:px-6 md:py-5 flex flex-col gap-4">

              {/* Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categoryChips.map((chip) => {
                  const isActive =
                    selectedCategory === "All"
                      ? chip.value === "All"
                      : chip.value.toLowerCase() === selectedCategory.toLowerCase();

                  return (
                    <button
                      key={chip.value}
                      onClick={() => setSelectedCategory(chip.value)}
                      className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm whitespace-nowrap border transition
                      ${
                        isActive
                          ? "bg-[#FDD700] text-[#C00000] border-[#C00000] shadow-md"
                          : "bg-white/20 text-gray-800 border-white/40 hover:bg-white/40"
                      }`}
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search + Brand + Sort */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">

                {/* SEARCH BAR */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 bg-white/40 border border-white/40 rounded-full px-3 py-2 shadow-inner">
                    <span className="text-sm">🔍</span>
                    <input
                      type="text"
                      placeholder="Search our collections…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent outline-none text-sm md:text-base w-full placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* BRAND DROPDOWN */}
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-800 flex items-center gap-1">
                    🏷️ <span className="hidden md:inline">Brand</span>
                  </span>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="bg-white/25 border border-white/40 rounded-full px-3 py-2 text-xs md:text-sm shadow-sm outline-none"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SORT DROPDOWN */}
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-gray-800 flex items-center gap-1">
                    ↕ <span className="hidden md:inline">Sort</span>
                  </span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white/25 border border-white/40 rounded-full px-3 py-2 text-xs md:text-sm shadow-sm outline-none"
                  >
                    <option value="none">None</option>
                    <option value="low-to-high">Price: Low → High</option>
                    <option value="high-to-low">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ======================= MATTRESS SECTION ======================= */}
          {mattresses.length > 0 && (
            <>
              <h3 className="text-3xl font-bold text-[#C00000] mt-10 mb-4 flex items-center gap-2">
                🛏️ Mattresses
              </h3>

              {mattressBrandSections.map((section) => {
                const items = mattresses.filter((p) => {
                  const brand = (p.brand || "").toLowerCase();
                  const key = section.key.toLowerCase();
                  return brand === key;
                });

                if (!items.length) return null;

                items.forEach((p) => usedMattressIds.add(p._id));

                return (
                  <div key={section.key} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{section.icon}</span>
                      <h4 className="text-xl font-semibold text-gray-900">
                        {section.label}
                      </h4>
                      {section.exclusive && (
                        <span className="text-xs font-semibold bg-[#FDD700] text-[#C00000] px-2 py-1 rounded-full">
                          Exclusive
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((p) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Unrecognized mattress brands */}
              {mattresses.filter((p) => !usedMattressIds.has(p._id)).length > 0 && (
                <div className="mb-8 mt-4">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    ✨ Other Brands
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mattresses
                      .filter((p) => !usedMattressIds.has(p._id))
                      .map((p) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ======================= CUSHIONS SECTION ======================= */}
          {cushions.length > 0 && (
            <>
              <h3 className="text-3xl font-bold text-[#C00000] mt-12 mb-4 flex items-center gap-2">
                🛋️ Cushions & Pillows
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cushions.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </>
          )}

          {/* ======================= ACCESSORIES SECTION ======================= */}
          {accessories.length > 0 && (
            <>
              <h3 className="text-3xl font-bold text-[#C00000] mt-12 mb-4 flex items-center gap-2">
                🎒 Accessories
              </h3>

              {/* Pillows */}
              {["pillow"].map((keyword) => {
                const subset = accessories.filter((p) =>
                  (p.name || "").toLowerCase().includes(keyword)
                );

                if (subset.length === 0) return null;

                subset.forEach((p) => usedAccessoryIds.add(p._id));

                return (
                  <div className="mb-6" key={keyword}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🛏️</span>
                      <h4 className="text-xl font-semibold text-gray-900">Pillows</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subset.map((p) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Bedsheets & Comforters */}
              {["bedsheet", "bed sheet", "comforter"].map((keyword) => {
                const subset = accessories.filter((p) =>
                  (p.name || "").toLowerCase().includes(keyword)
                );

                if (subset.length === 0) return null;

                subset.forEach((p) => usedAccessoryIds.add(p._id));

                return (
                  <div className="mb-6" key={keyword}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🛌</span>
                      <h4 className="text-xl font-semibold text-gray-900">
                        Bedsheets & Comforters
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {subset.map((p) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* More Accessories */}
              {accessories.filter((p) => !usedAccessoryIds.has(p._id)).length > 0 && (
                <div className="mb-10 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">✨</span>
                    <h4 className="text-xl font-semibold text-gray-900">
                      More Accessories
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accessories
                      .filter((p) => !usedAccessoryIds.has(p._id))
                      .map((p) => (
                        <ProductCard key={p._id} product={p} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-[#C00000] text-[#FDD700] p-4 rounded-full shadow-xl hover:bg-[#E60000] transition-colors z-50"
        >
          ↑
        </button>

        {/* PRODUCT MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-6 overflow-y-auto relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-6 text-2xl font-bold text-[#C00000]"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT: IMAGES */}
                <div>
                  <div className="w-full bg-[#F8F9FA] rounded-lg flex items-center justify-center p-4">
                    <img
                      src={mainImage || selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-h-[420px] object-contain"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {extractImageUrls(selectedProduct.description).map(
                      (url, idx) => (
                        <button
                          key={`d-${idx}`}
                          onClick={() => setMainImage(url)}
                          className="w-20 h-20 rounded overflow-hidden border"
                        >
                          <img
                            src={url}
                            alt={`thumb-${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      )
                    )}

                    {selectedProduct.image && (
                      <button
                        onClick={() => setMainImage(selectedProduct.image)}
                        className="w-20 h-20 rounded overflow-hidden border"
                      >
                        <img
                          src={selectedProduct.image}
                          alt="main-thumb"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* RIGHT: DETAILS */}
                <div>
                  <h3 className="text-3xl font-bold text-[#C00000]">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-3 text-gray-700 whitespace-pre-line">
                    {removeUrlsFromText(selectedProduct.description)}
                  </p>

                  <div className="mt-6">
                    {selectedProduct.sizes?.map((s, idx) => {
                      const {
                        sellingPrice,
                        mrp,
                        discountPercent,
                        label,
                      } = getSizePricing(selectedProduct, s);

                      return (
                        <div key={idx} className="mb-4">
                          <h4 className="font-semibold text-lg text-[#C00000]">
                            {s.size} — ₹{sellingPrice}
                            {mrp && (
                              <span className="text-gray-500 line-through ml-2 text-sm">
                                ₹{mrp}
                              </span>
                            )}
                            {discountPercent && (
                              <span className="text-green-600 ml-2 text-xs font-semibold">
                                {discountPercent}% OFF
                              </span>
                            )}
                            {!discountPercent && label && (
                              <span className="ml-2 text-[#C00000] text-xs font-semibold">
                                ({label})
                              </span>
                            )}
                          </h4>

                          {s.subsizes?.map((sub, i) => (
                            <p key={i} className="text-sm text-gray-800">
                              {sub.dimension}:{" "}
                              <span className="font-bold text-[#C00000]">
                                ₹{sub.price}
                              </span>
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  <a
                    href={`https://wa.me/${shopNumber}?text=Hi! I'm interested in the ${selectedProduct.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-gradient-to-r from-[#C00000] to-[#E60000] text-[#FDD700] px-6 py-3 rounded-xl font-semibold shadow-lg"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER (full width, inside gradient container) */}
      <Footer />
    </div>
  );
};

export default Products;
