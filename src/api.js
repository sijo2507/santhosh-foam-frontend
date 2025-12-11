const BASE_URL = import.meta.env.VITE_API_URL || "https://santhosh-foam-backend.onrender.com"; 

const fetchProducts = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log("Error fetching products: ", err.message);
        return [];
    }
};

export default fetchProducts;