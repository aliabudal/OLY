import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";

import ProductCard from "components/ProductCard";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import { ProductType } from "utils/types/product";
import "styles/index.css";

interface TypeProduct {
  id: number;
  product_name: string;
  stock: number;
  price: number;
  image: string;
  user: User;
}

interface User {
  user_id: number;
  name: string;
  address: string;
  profilepicture: string;
}

function App() {
  const [cookie] = useCookies(["token"]);
  const checkToken = cookie.token;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Sending searchTerm:", searchTerm);
    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    filterProducts();
  }, [products, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`products?searchTerm=${searchTerm}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      });
      console.log("Received response data:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = () => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("Filtered Products:", filtered); // Log the filtered results
      console.log(searchTerm);
      setFilteredProducts(filtered); // Update the filteredProducts state
    }
  };

  console.log("Products state:", products);

  return (
    <Layout>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="w-full hp-screen px-20 pb-20">
        <div className="flex-1">
          <h2
            className="mb-10"
            style={{
              fontFamily: "Poppins",
              fontSize: "1.75em",
              fontWeight: "700",
              textAlign: "center",
              color: "#000000",
            }}
          >
            Product Listings:
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              address={product.address}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
