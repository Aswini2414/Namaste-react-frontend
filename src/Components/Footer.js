import React from "react";
import Logo from "../assets/Footer.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-3 items-center bg-black text-white p-8 justify-between sticky w-full mb-0 px-[17.5%] pb-[10%] mx-auto footer left-0 right-0">
        <Link to="/" className="w-[54%] h-[80%] cursor-pointer">
          <img className="w-[70%] h-[100%]" src={Logo} />
        </Link>
        <h1 className="font-bold text-xl">Company</h1>
        <h1 className="font-bold text-xl">Contact Us</h1>
        <h1 className="mb-3 text-slate-100">© 2024 KrishFoods</h1>
        <h2 className="mb-3 text-slate-100">About Me</h2>
        <h2 className="mb-3 text-slate-100">Help & Support</h2>
        <h1 className="mb-3 text-slate-100">All rights reserved</h1>
        <Link
          to="https://www.linkedin.com/in/cheekatla-tejaswini-47a885233/"
          className="cursor-pointer mb-3"
        >
          Visit my profile
        </Link>
      </div>
    </>
  );
};

export default Footer;
