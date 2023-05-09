import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SummaryCard from "components/SummaryCard";
import Layout from "components/Layout";
import Navbar from "components/Navbar";

interface TypeProduct {
  id: number;
  product_name: string;
  stock: number;
  price: number;
  image: string;
  description: string;
  user: User;
}

interface User {
  user_id: number;
  name: string;
  address: string;
  user_image: string;
}

const Summary = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`carts/result`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err());
      });
  }

  return (
    <Layout>
      <Navbar />
      <section className="flex justify-between items-center mx-40 mb-5">
        <p className="text-2xl font-bold text-black">Transaction Summary</p>
        <Link to="/my-cart">
          <div className="flex justify-center items-center gap-3 border-2 bg-customcyan rounded-2xl px-3 py-2 text-white font-semibold duration-300 hover:cursor-pointer  active:scale-95">
            <FaArrowLeft />
            <p>Back to cart</p>
          </div>
        </Link>
      </section>
      <section className="flex justify-center items-center gap-10 mx-40 border-2 border-customcyan p-10 rounded-t-3xl">
        <div className="flex flex-col gap-10 w-full">
          {products.map((product) => (
            <SummaryCard summaryproduct={product} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-3 mx-40 my-5 border-2 border-customcyan py-10 px-28">
        <h2 className="text-black font-bold text-2xl pb-4 border-b-4">
          Shipment Detail
        </h2>
        <h2 className="text-black font-bold text-xl">Ali Abudal</h2>
        <p className="text-black text-lg">aliabudal@gmail.com</p>
        <p className="text-black text-lg">+40123456789</p>
        <p className="text-black text-lg">
          Splaiul Independenței 313,
          <br /> București 060042
        </p>
      </section>
      <section className="flex flex-col gap-7 mx-40 mb-20 border-2 border-customcyan py-10 px-28 rounded-b-3xl">
        <span className="text-lg font-semibold flex justify-between">
          <p>Total Item:</p>
          <p>3 pcs</p>
        </span>
        <span className="text-lg font-semibold flex justify-between">
          <p>Total Payment:</p>
          <p>RON 330.000,-</p>
        </span>
        <Link to="/transaction-purchase">
          <div className="flex justify-center border-2 bg-customcyan rounded-2xl p-3 text-white font-bold duration-300 hover:cursor-pointer  active:scale-95">
            Go To Payment
          </div>
        </Link>
      </section>
    </Layout>
  );
};

export default Summary;
