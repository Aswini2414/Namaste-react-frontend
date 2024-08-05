import React from "react";
import Empty from "../assets/empty.png";
import { Link } from "react-router-dom";

const Emptycart = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-[2%] mb-[8%]">
      <div className="w-[25%] h-[15%] bg-green-200 rounded-full p-8">
        <img src={Empty} className="w-[80%] h-[50%] mx-auto" />
      </div>
      <h1 className=" text-2xl p-2 text-center text-slate-700 font-semi-bold mt-3 dark:text-white">
        Your Cart is Empty ☹️
      </h1>
      <h2 className="text-slate-500 mt-2 text-xl p-2 dark:text-slate-300">
        You can go to home page to view more restaurants
      </h2>
      <Link
        to="/"
        className="bg-orange-400 p-2 text-white text-lg font-bold mt-4"
      >
        SEE RESTAURANTS NEAR YOU
      </Link>
    </div>
  );
};

export default Emptycart;
