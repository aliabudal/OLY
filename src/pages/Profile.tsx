import withReactContent from "sweetalert2-react-content";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenSquare } from "react-icons/fa";
import { useCookies } from "react-cookie";
import axios from "axios";

import ProductCard from "components/ProductCard";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import { ProductType } from "utils/types/product";
import Swal from "utils/Swal";

const Profile = () => {
  // const [datas, setDatas] = useState<>({})
  const [cookie, , removeCookie] = useCookies(["token"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [image, setImage] = useState<any>();
  const [getName, setName] = useState<string>("");
  const [getEmail, setEmail] = useState<string>("");
  const [getPhone, setPhone] = useState<string>("");
  const [getAddress, setAddress] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [file, setEditFile] = useState<any>();
  const [name, setEditName] = useState<string>("");
  const [email, setEditEmail] = useState<string>("");
  const [phone, setEditPhone] = useState<string>("");
  const [address, setEditAddress] = useState<string>("");
  const [password, setEditPassword] = useState<string>("");

  useEffect(() => {
    if (!cookie.token) {
      navigate("/");
    }
    fetchDataProfile();
  }, []);

  const fetchDataProfile = async () => {
    await axios
      .get(`users`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        const results = res.data;
        // setUserImage(results.user_image);
        setName(results.name);
        setEmail(results.email);
        setPhone(results.phone);
        setAddress(results.address);
        // setProducts(results.product);
      })
      .catch((err) => {});
  };

  const handleEditAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const body = {
        name,
        email,
        phone,
        address,
        password,
        image: reader.result,
      };
      await axios
        .put("users", body, {
          headers: { Authorization: `Bearer ${cookie.token}` },
        })
        .then((res) => {
          MySwal.fire({
            title: "Success",
            text: "Profile updated",
            showCancelButton: false,
          });
          navigate(0);
        })
        .catch((err) => {
          const { data } = err.response;
          MySwal.fire({
            title: "Failed",
            text: data.message,
            showCancelButton: false,
          });
        });
    };
  };

  const handleDeleteAccount = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .delete(`users`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        removeCookie("token");
        MySwal.fire({
          title: "Success",
          text: "User account deleted",
          showCancelButton: false,
        });
        navigate("/login");
      })
      .catch((err) => {
        const { data } = err.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <Navbar />
      <p className="text-center text-3xl font-bold mb-7">My Profile</p>
      <section className="flex items-center gap-20 mx-40 mb-20 px-20 border-2 border-customcyan p-10 rounded-3xl">
        <div className="flex flex-col gap-2">
          <img
            src={image}
            alt="user-image"
            className="w-96 text-center border-4 border-customcyan rounded-full mb-4"
          />
          <form>
            <label htmlFor="my-modal-8">
              <p className="text-center border-2 border-customcyan bg-customcyan rounded-xl p-4 text-gray-50 font-bold duration-300 hover:cursor-pointer  active:scale-95">
                Delete Account
              </p>
            </label>
            <input type="checkbox" id="my-modal-8" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box border-2 border-customcyan">
                <p className="mb-5 pb-2 text-xl border-b-2 font-medium text-customcyan">
                  Account Deletion
                </p>
                <div className="flex flex-col px-5">
                  <p className="text-base font-medium text-justify mb-2">
                    Deleting your account will permanently remove all your
                    information from our platform. Also, your account cannot be
                    reactivated or use the same data for registering in the
                    future.
                  </p>
                  <p className="text-base font-medium text-justify">
                    If you're sure you want to delete this account, click{" "}
                    <span className="text-red-600">Delete Account</span> button.
                    If you have any issues, please let us know before deleting.
                  </p>
                  <p className="text-base font-medium text-justify mt-2">
                    Just so you know, it's nice to have you here.
                  </p>
                </div>
                <div className="modal-action">
                  <button
                    onClick={(e) => handleDeleteAccount(e)}
                    type="submit"
                    className="w-36 text-sm text-center border-2 border-red-600 bg-red-600 rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  active:scale-90"
                  >
                    Delete Account
                  </button>
                  <label
                    htmlFor="my-modal-8"
                    className="w-20 text-sm text-center border-2 border-customcyan rounded-xl py-1 text-customcyan font-medium duration-300 hover:cursor-pointer active:scale-90"
                  >
                    Cancel
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <table className="table-fixed">
          <tbody>
            <tr>
              <td className="w-20 pr-20 py-3 text-lg font-medium">Name</td>
              <td className="w-[40rem] text-lg ">{getName}</td>
            </tr>
            <tr>
              <td className="py-3 text-lg font-medium">Email</td>
              <td className="text-lg">{getEmail}</td>
            </tr>
            <tr>
              <td className="py-3 text-lg font-medium">Phone</td>
              <td className="text-lg">{getPhone}</td>
            </tr>
            <tr>
              <td className="py-4 text-lg font-medium flex">Address</td>
              <td className="py-4 text-lg">{getAddress}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <form onSubmit={(e) => handleEditAccount(e)}>
            <label htmlFor="my-modal-1">
              <p className="duration-300 hover:cursor-pointer active:scale-75 text-customcyan text-4xl">
                <FaPenSquare />
              </p>
            </label>
            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box border-2 border-customcyan flex flex-col justify-center text-customcyan">
                <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                  Edit Profile
                </p>
                <div className="flex justify-center gap-5">
                  <div className="flex flex-col gap-5">
                    <p className="py-1">Name:</p>
                    <p className="py-1">Email:</p>
                    <p className="py-1">Phone:</p>
                    <p className="py-1">Address:</p>
                    <p className="py-3">Select Photo:</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <input
                      onChange={(e) => setEditName(e.target.value)}
                      type="text"
                      placeholder="Type new name"
                      className="input input-bordered input-sm w-96 max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setEditEmail(e.target.value)}
                      type="email"
                      placeholder="Type new email"
                      className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setEditPhone(e.target.value)}
                      type="text"
                      placeholder="Type new phone number"
                      className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setEditAddress(e.target.value)}
                      type="text"
                      placeholder="Type new address"
                      className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setEditFile(e.target.files?.[0])}
                      type="file"
                      className="file-input file-input-bordered w-full border-2 border-customcyan max-w-xs"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    className="w-20 text-sm text-center border-2 border-customcyan bg-customcyan rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  active:scale-90"
                  >
                    Update
                  </button>
                  <label
                    htmlFor="my-modal-1"
                    className="w-20 text-sm text-center border-2 border-customcyan rounded-xl py-1 text-customcyan font-medium duration-300 hover:cursor-pointer  active:scale-90"
                  >
                    Cancel
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center mx-40 mb-20">
        <p className="text-center text-3xl font-bold mb-10">My Products</p>
        <div className="grid grid-cols-4 gap-10">
          {products.map((product) => (
            <div className="flex flex-col items-center">
              <ProductCard
                key={product.product_id}
                id={product.product_id}
                image={product.product_image}
                name={product.product_name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
