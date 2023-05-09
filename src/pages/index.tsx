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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(`products/`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err());
      });
  };

  return (
    <Layout>
      <Navbar />
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
          {products.map((product) => (
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
        <div className="sticky bottom-20 flex justify-end mr-20 text-customcyan">
          {checkToken && (
            <Link to="add-new-product">
              <div className="bg-gray-50 rounded-full p-1 duration-300 hover:cursor-pointer hover:text-cyan-300 active:scale-90">
                <BsFillPlusCircleFill size={50} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
