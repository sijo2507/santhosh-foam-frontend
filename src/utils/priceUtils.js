// src/utils/priceUtils.js

// Safely get minimum price from subsizes or size.price
const getBasePriceFromSize = (size) => {
  if (size?.subsizes && size.subsizes.length > 0) {
    const prices = size.subsizes
      .map((sub) => Number(sub.price) || 0)
      .filter((p) => p > 0);

    if (prices.length > 0) {
      return Math.min(...prices);
    }
  }

  // fallback to size.price
  return Number(size?.price) || 0;
};

/**
 * Get pricing details for a single size of a product
 * @param {Object} product - full product object (needs category)
 * @param {Object} size - one element from product.sizes[]
 * @returns {Object} { sellingPrice, mrp, discountPercent, isDiscounted, label }
 */
export const getSizePricing = (product, size) => {
  const category = (product.category || "").toLowerCase();
  const basePrice = getBasePriceFromSize(size);

  // Default structure
  let sellingPrice = basePrice;
  let mrp = null;
  let discountPercent = null;
  let isDiscounted = false;
  let label = "";

  if (category === "mattress") {
    // DB stores MRP for mattresses
    mrp = basePrice;
    sellingPrice = Math.round(mrp * 0.8); // 20% OFF
    discountPercent = 20;
    isDiscounted = true;
    label = "20% OFF";
  } else if (category === "cushion" || category === "accessories") {
    // DB stores discounted price directly
    sellingPrice = basePrice;
    mrp = null;
    discountPercent = null;
    isDiscounted = true;
    label = "Discounted Price";
  } else {
    // fallback for any future category
    sellingPrice = basePrice;
  }

  return {
    sellingPrice,
    mrp,
    discountPercent,
    isDiscounted,
    label,
  };
};

/**
 * Get minimum selling price across all sizes of a product
 * Useful for sorting, badges (“Starts from ₹…”), etc.
 */
export const getProductMinSellingPrice = (product) => {
  if (!product?.sizes || product.sizes.length === 0) return 0;

  const prices = product.sizes
    .map((size) => getSizePricing(product, size).sellingPrice)
    .filter((p) => p > 0);

  if (prices.length === 0) return 0;

  return Math.min(...prices);
};

/**
 * Comparator helpers for sorting products by price
 */
export const compareProductsByPriceAsc = (a, b) => {
  return getProductMinSellingPrice(a) - getProductMinSellingPrice(b);
};

export const compareProductsByPriceDesc = (a, b) => {
  return getProductMinSellingPrice(b) - getProductMinSellingPrice(a);
};
