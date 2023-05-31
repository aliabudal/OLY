import { useNavigate, useParams } from "react-router-dom";
import { FaPenSquare, FaTrashAlt, FaCreditCard } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Swal from "utils/Swal";

interface TypeProduct {
  id: number;
  product_name: string;
  stock: number;
  price: number;
  image: string;
  user: User;
  description: string;
}

interface User {
  user_id: number;
  name: string;
  address: string;
  profilepicture: string;
  role: string;
  phone: string;
  email: string;
}

const DetailProduct = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const [cookie] = useCookies(["token", "id", "role"]);
  const checkToken = cookie.token;
  const checkId = cookie.id;
  const [product, setProduct] = useState<TypeProduct>();
  const [userId, setUserId] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [file, setEditFile] = useState<any>();
  const [product_name, setProductName] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const owner = checkId == userId;
  const [userRole, setUserRole] = useState<string>("");
  // for paid promotion - will be sent to backend
  const [card, setCard] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [CVV, setCVV] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  // for contact info
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    fetchData();
    fetchUserRole();
    fetchUserDetails();
  }, []);

  const handleClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  const fetchUserRole = async () => {
    await axios
      .get(`userRole/${checkId}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setUserRole(res.data.role);
      })
      .catch((err) => {
        alert(err());
      });
  };

  const fetchUserDetails = async () => {
    await axios
      .get(`users`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setEmail(res.data.email);
        setPhone(res.data.phone);
        console.log(email);
        console.log(phone);
      })
      .catch((err) => {
        alert(err());
      });
  };

  const fetchData = async () => {
    await axios
      .get(`products/${id}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setUserImage(res.data.user.image);
        setProductId(res.data.id);
        setUserId(res.data.user.user_id);
        setUserRole(res.data.user.role);
        setProduct(res.data);
        // check if the user is owner here, after userId state has been updated
        const owner = checkId == res.data.user.user_id;
      })
      .catch((err) => {
        alert(err());
      });
  };

  const handleCreditCardSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const body = {
      card,
      ownerName,
      CVV,
      expirationDate,
    };

    await axios
      .post(`creditCardInfo/${id}`, body, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "Credit card information sent",
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

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData();
    body.append("file", file);
    body.append("product_name", product_name);
    body.append("stock", stock);
    body.append("price", price);
    body.append("description", description);

    await axios
      .put(`products/${id}`, body, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "Product information updated",
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

  const handleDeleteProduct = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios
      .delete(`products/${id}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        MySwal.fire({
          title: "Success",
          text: "Product deleted",
          showCancelButton: false,
        });
        navigate("/");
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
      <Navbar setSearchTerm={() => {}} />{" "}
      <section className="flex justify-center items-center gap-10 mx-40 border-2 border-customcyan p-10 rounded-t-3xl">
        <div className="border-2 border-customcyan rounded-2xl p-4">
          <img
            src={product?.image}
            alt="image"
            className="w-72 h-72 rounded-2xl"
          />
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-5 w-3/5">
              <div className="font-bold text-xl">{product?.product_name}</div>
              <div className="text-gray-500">Stock: {product?.stock}</div>
              <div className="w-fit py-2 px-5 mt-1 border-2 border-customcyan rounded-xl text-center">
                RON {product?.price}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5 border-2 border-customcyan rounded-2xl p-5">
                <div className="h-full flex items-center border-2 border-customcyan rounded-2xl p-2">
                  <img
                    className="w-80 rounded-xl"
                    src={userImage}
                    alt="image"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">{product?.user.name}</span>
                  <span>{product?.user.address}</span>
                  <button onClick={handleClick} style={{ color: "green" }}>
                    Contact
                  </button>
                  {showContactInfo && (
                    <div
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "40px",
                          borderRadius: "10px",
                          width: "50%",
                          textAlign: "center",
                        }}
                      >
                        <h2>Contact Information</h2>
                        <form>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <span style={{ marginRight: "10px" }}>
                                Email:
                              </span>
                              <input type="email" value={email} readOnly />
                            </label>
                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <span style={{ marginRight: "10px" }}>
                                Phone:
                              </span>
                              <input type="tel" value={phone} readOnly />
                            </label>
                          </div>
                          <button
                            onClick={handleClick}
                            style={{ color: "red", marginTop: "10px" }}
                          >
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5 mx-40 mt-5 mb-10 border-2 border-customcyan p-10 rounded-b-3xl">
        <span className="text-customcyan font-semibold">Description</span>
        <span>{product?.description}</span>
      </section>
      {(checkId == product?.user.user_id || cookie.role == "admin") && (
        <div className="flex justify-center gap-20 mb-20">
          <form onSubmit={(e) => handleEditProduct(e)}>
            <label htmlFor="my-modal-1">
              <p className="text-4xl flex justify-center rounded-xl w-40 py-2 duration-300 hover:cursor-pointer active:scale-90 bg-customcyan text-gray-50">
                <FaPenSquare />
              </p>
            </label>
            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box border-2 border-customcyan flex flex-col justify-center text-customcyan">
                <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                  Update Product
                </p>
                <div className="flex justify-center gap-5">
                  <div className="flex flex-col gap-5">
                    <p className="py-1">Name:</p>
                    <p className="py-1">Stock:</p>
                    <p className="py-1">Price:</p>
                    <p className="py-1">Description:</p>
                    <p className="py-3">Select Image:</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <input
                      onChange={(e) => setProductName(e.target.value)}
                      type="text"
                      placeholder="Type new name"
                      className="input input-bordered input-sm w-96 max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setStock(e.target.value)}
                      type="text"
                      placeholder="Type new stock"
                      className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      type="text"
                      placeholder="Type new price"
                      className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                    />
                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      placeholder="Type new description"
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
          <form onSubmit={(e) => handleCreditCardSubmission(e)}>
            <label htmlFor="my-modal-2">
              <p className="text-4xl flex justify-center rounded-xl w-40 py-2 duration-300 hover:cursor-pointer active:scale-90 bg-customcyan text-gray-50">
                <FaCreditCard />
              </p>
            </label>
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box border-2 border-customcyan flex flex-col justify-center text-customcyan">
                <p className="mb-5 pb-2 text-xl border-b-2 font-medium">
                  Submit Credit Card Info
                </p>
                <div className="flex flex-col gap-5">
                  <input
                    onChange={(e) => setCard(e.target.value)}
                    type="text"
                    placeholder="Card Number"
                    className="input input-bordered input-sm w-96 max-w-xs border-customcyan"
                  />
                  <input
                    onChange={(e) => setOwnerName(e.target.value)}
                    type="text"
                    placeholder="Owner Name"
                    className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                  />
                  <input
                    onChange={(e) => setCVV(e.target.value)}
                    type="text"
                    placeholder="CVV"
                    className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                  />
                  <input
                    onChange={(e) => setExpirationDate(e.target.value)}
                    type="text"
                    placeholder="Expiration Date"
                    className="input input-bordered input-sm w-full max-w-xs border-customcyan"
                  />
                  <div className="modal-action">
                    <button
                      type="submit"
                      className="w-20 text-sm text-center border-2 border-customcyan bg-customcyan rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  active:scale-90"
                    >
                      Pay Now
                    </button>
                    <label
                      htmlFor="my-modal-2"
                      className="w-20 text-sm text-center border-2 border-customcyan rounded-xl py-1 text-customcyan font-medium duration-300 hover:cursor-pointer active:scale-90"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form>
            <label htmlFor="my-modal-8">
              <p className="text-4xl flex justify-center rounded-xl w-40 py-2 duration-300 hover:cursor-pointer active:scale-90 bg-red-600 text-gray-50">
                <FaTrashAlt />
              </p>
            </label>
            <input type="checkbox" id="my-modal-8" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box border-2 border-customcyan">
                <p className="mb-5 pb-2 text-xl border-b-2 font-medium text-customcyan">
                  Delete Product
                </p>
                <div className="flex flex-col px-5">
                  <p className="text-base font-medium text-justify">
                    Are you sure want to delete this product?
                  </p>
                </div>
                <div className="modal-action">
                  <button
                    onClick={(e) => handleDeleteProduct(e)}
                    type="submit"
                    className="w-36 text-sm text-center border-2 border-red-600 bg-red-600 rounded-xl py-1 text-gray-50 font-medium duration-300 hover:cursor-pointer  active:scale-90"
                  >
                    Delete Product
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
      )}
    </Layout>
  );
};

export default DetailProduct;
