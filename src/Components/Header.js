import { LOGO_URL } from "../utils/constants";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiMiniXMark } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { context } from "../utils/ContextProvider";
import { useContext } from "react";
import City from "./City";
import { BsCart } from "react-icons/bs";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const [sideBar, setSideBar] = useState(false);
  const [btnName, setBtnName] = useState("Login");
  const [darkMode, setDarkMode] = useState(false);
  const { onlineStatus } = useOnlineStatus();

  const { citySidebar, setCitySideBar } = useContext(context);

  //selector
  const cartItems = useSelector((store) => store.cart.items);
  const userCity = useSelector((store) => store.user.cityName);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme == "true") {
      setDarkMode(!darkMode);
      let element = document.body;
      element.classList.add("dark");
    }
  }, []);


  const handleDarkMode = (e) => {
    e.preventDefault();
    setDarkMode(!darkMode);
    let element = document.body;
    element.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode);
  };

  return (
    <div className="flex justify-between h-35 w-full px-2 bg-emerald-100">
      <div className="flex items-center gap-1">
        <Link to="/" className="w-40 h-25 cursor-pointer">
          <img className="w-[100%] h-[90%]" src={Logo} />
        </Link>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setCitySideBar(!citySidebar)}
        >
          <h1 className="text-lg text-slate-500">{userCity}</h1>
          <IoIosArrowDown className="text-2xl text-orange-400" />
        </div>
        {citySidebar && <City />}
      </div>
      <div className="m-3">
        <ul className="sm:flex hidden">
          <li className="p-[10px] list-none m-[10px] text-xl">
            Online status:{onlineStatus ? "✅" : "🔴"}
          </li>
          <li className="p-[10px] list-none m-[10px] rounded hover:bg-yellow-400 cursor-pointer hover:text-green-600 text-xl hover:font-bold">
            <Link to="/" className="res-links">
              Home
            </Link>
          </li>
          <li className="p-[10px] list-none m-[10px] text-xl rounded hover:bg-yellow-400 cursor-pointer hover:font-bold hover:text-green-600">
            <Link to="/cart" className="res-links">
              <BsCart className="text-4xl" />
              <span className="absolute rounded-full px-1 text-white top-5 ml-5 bg-red-500 ">
                {cartItems.length}
              </span>
            </Link>
          </li>
          <button
            className="h-5 mt-5 text-xl "
            onClick={() => {
              if (btnName === "Login") {
                setBtnName("Logout");
              } else {
                setBtnName("Login");
              }
            }}
          >
            {btnName}
            {btnName === "Logout" ? <h1>User:Radha</h1> : " "}
          </button>
          <div
            className="cursor-pointer mt-5 ml-5"
            onClick={(e) => handleDarkMode(e)}
          >
            {darkMode ? (
              <MdDarkMode className="text-4xl dark:text-slate-500" />
            ) : (
              <MdOutlineLightMode className="text-yellow-500 text-4xl font-bold" />
            )}
          </div>
        </ul>
        <RxHamburgerMenu
          className="sm:hidden text-3xl mt-4 font-bold cursor-pointer"
          onClick={() => setSideBar(!sideBar)}
        />
        {sideBar && (
          <>
            <div className="absolute z-10 h-full bg-white right-0  top-0  w-full dark:bg-slate-600">
              <HiMiniXMark
                className="text-left text-3xl font-bold mt-4 mb-4 ml-4 cursor-pointer dark:text-white"
                onClick={() => setSideBar(false)}
              />
              <ul className="flex flex-col ml-8 mr-8">
                <li className="p-[10px] list-none  text-xl dark:text-white">
                  Online status:{onlineStatus ? "✅" : "🔴"}
                </li>
                <li
                  className="p-[10px] list-none hover:bg-yellow-400 cursor-pointer hover:text-green-600 text-xl hover:font-bold"
                  onClick={() => setSideBar(false)}
                >
                  <Link to="/" className="res-links dark:text-white">
                    Home
                  </Link>
                </li>
                <li
                  className="p-[10px] list-none  text-xl cursor-pointer hover:bg-yellow-400 hover:text-green-600 hover:font-bold"
                  onClick={() => setSideBar(false)}
                >
                  <Link to="/cart" className="res-links">
                    <BsCart className="text-4xl dark:text-white" />
                    <span className="absolute rounded-full px-1 text-white top-40 ml-5 bg-red-500 ">
                      {cartItems.length}
                    </span>
                  </Link>
                </li>
                <div
                  className="cursor-pointer mt-5 ml-5"
                  onClick={(e) => handleDarkMode(e)}
                >
                  {darkMode ? (
                    <MdDarkMode className="text-4xl dark:text-slate-500" />
                  ) : (
                    <MdOutlineLightMode className="text-yellow-500 text-4xl font-bold" />
                  )}
                </div>
                <button
                  className="h-9 text-center p-[10px] text-xl bg-yellow-400 px-2 py-1 rounded dark:text-white hover:bg-green-500 mt-4"
                  onClick={() => {
                    if (btnName === "Login") {
                      setBtnName("Logout");
                    } else {
                      setBtnName("Login");
                    }
                  }}
                >
                  {btnName}
                  {btnName === "Logout" ? (
                    <h1 className="mt-2 ">User:Radha</h1>
                  ) : (
                    " "
                  )}
                </button>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
