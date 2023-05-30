import { FaClipboardList, FaUserCircle } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";

import logo from "src/assets/logo.svg";
import Swal from "utils/Swal";
import ProductCard from "./ProductCard";

interface TypeProduct {
  id: number;
  product_name: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}
interface NavbarProps {
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchTerm }) => {
  const [cookie, , removeCookie] = useCookies(["token", "id"]);
  const navigate = useNavigate();
  const checkToken = cookie.token;
  const MySwal = withReactContent(Swal);
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [searchTerm, setSearchTermInternal] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleSearchTermChange = (term: string) => {
    setSearchTermInternal(term);
    setSearchTerm(term);
  };

  const fetchData = async () => {
    // console.log(`Sending searchTerm: ${searchTerm}`);
    await axios
      .get(`products?searchTerm=${searchTerm}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = async () => {
    removeCookie("token");
    removeCookie("id");
    MySwal.fire({
      title: "See you later!",
      text: "You have been logged out",
      showCancelButton: false,
    });
    navigate("/");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-gray-100 lg:px-10 shadow-lg mb-20 py-4">
      <section className="navbar-start">
        <Link to="/">
          <span className="text-2xl font-bold text-indigo-600"> OLY </span>
        </Link>
      </section>
      <section className="navbar-center">
        <div className="form-control flex-row hidden lg:flex">
          <input
            type="text"
            placeholder="What do you want to find?"
            className="w-60 py-2 px-3 rounded-l-lg border-y-2 border-l-2 border-customcyan bg-gray-100"
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
          <button className="px-2 rounded-r-lg border-y-2 border-r-2 border-customcyan bg-gray-100">
            <div className="duration-300 hover:cursor-pointer  active:scale-75 text-gray-400">
              <BiSearchAlt size={30} />
            </div>
          </button>
        </div>
      </section>
      <section className="navbar-end gap-3">
        <div className="form-control flex flex-row lg:hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-40 py-2 px-3 rounded-l-lg border-y-2 border-l-2 border-customcyan bg-gray-100"
          />
          <button className="px-2 rounded-r-lg border-y-2 border-r-2 border-customcyan bg-gray-100">
            <BiSearchAlt size={30} />
          </button>
        </div>
        {!checkToken && (
          <>
            <Link to="/register">
              <button className="rounded-full border-2 text-indigo-800 border-indigo-800 p-1 w-24 duration-300 hover:cursor-pointer  active:scale-90">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="rounded-full border-2 text-white bg-customcyan p-1 w-24 duration-300 hover:cursor-pointer  active:scale-90">
                Login
              </button>
            </Link>
          </>
        )}
        {checkToken && (
          <section className="flex items-center gap-3">
            <div className="dropdown dropdown-end flex items-center">
              <label
                tabIndex={0}
                className="duration-300 hover:cursor-pointer  active:scale-90 avatar"
              >
                <div className="text-customcyan">
                  <FaUserCircle size={40} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="z-50 dropdown-content mt-60 p-3 bg-gray-50 rounded-box w-40 border-2 border-customcyan shadow-lg lg:mt-44"
              >
                <Link to="/profile">
                  <li className="px-3 py-1 rounded-lg duration-300 hover:bg-gray-200 hover:cursor-pointer active:bg-customcyan active:scale-90">
                    <p>Profile</p>
                  </li>
                </Link>
                <li
                  className="px-3 py-1 rounded-lg duration-300 hover:bg-gray-200 hover:cursor-pointer active:bg-customcyan active:scale-90"
                  onClick={() => handleLogout()}
                >
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Navbar;
