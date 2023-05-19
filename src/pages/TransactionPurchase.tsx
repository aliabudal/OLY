import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import TransactionCard from "components/TransactionCard";
import Layout from "components/Layout";
import Navbar from "components/Navbar";

interface TypeProduct {
  transaction_id: number;
  total_product: number;
  subtotal: number;
  status: string;
  create_at: number;
  transaction_code: string;
  transaction_item: Item;
}

interface Item {
  id: number;
  product_name: string;
  qty: number;
  amount: number;
  image: string;
}

const TransactionPurchase = () => {
  const [products, setProducts] = useState<TypeProduct[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`transactions/`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err());
      });
  }

  return (
    <Layout>
      <Navbar setSearchTerm={() => {}} />{" "}
      <section className="flex justify-between items-center mx-40">
        <div className="flex">
          <p className="px-3 border-b-4 border-customcyan text-customcyan text-2xl font-bold hover:cursor-default">
            My Purchase
          </p>
          <Link to="/transaction-sale">
            <p className="px-3 border-b-4 text-2xl font-bold border-gray-300 text-gray-300">
              My Sale
            </p>
          </Link>
        </div>
        <Link to="/">
          <div className="flex justify-center items-center gap-3 border-2 bg-customcyan rounded-2xl px-3 py-2 text-white font-semibold duration-300 hover:cursor-pointer  active:scale-95">
            <FaArrowLeft />
            <p>Back to home</p>
          </div>
        </Link>
      </section>
      <section className="flex justify-center items-center gap-10 mx-28 mb-20 p-10">
        <div className="flex flex-col gap-10 w-full">
          {[...Array(3)].map((e) => (
            <TransactionCard />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TransactionPurchase;
