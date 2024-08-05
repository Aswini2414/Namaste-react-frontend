import React from "react";
import { incrementQty, decrementQty, removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsDisplay } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { ITEM_URL } from "../utils/constants.js";

const CartItem = ({ item }) => {
  const { name, price, defaultPrice, qty, total, imageId } = item;
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const handleIncrement = () => {
    dispatch(incrementQty(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQty(item.id));
  };
  return (
    <tr className=" h-[80px] rounded shadow-md drop-shadow-sm dark:shadow-none">
      <td className="sm:w-[80%] px-4 py-2">
        <div className="flex items-center gap-1">
          <span>
            {imageId ? (
              <img
                src={ITEM_URL + imageId}
                className=""
                width="30px"
                height="15px"
              />
            ) : (
              " "
            )}
          </span>
          <span className="dark:text-slate-300">{name}</span>
        </div>
      </td>
      <td className="px-4 py-2 hidden sm:table-cell dark:text-slate-300">
        ₹{(price || defaultPrice) / 100}/-
      </td>
      <td className="flex items-center justify-center px-4 py-2 mt-4 gap-1">
        <FiMinus
          onClick={handleDecrement}
          className="text-2xl text-red-400 cursor-pointer"
        />
        <span className="border-2 border-slate-400 px-2 py-1 dark:text-slate-300">
          {qty}
        </span>
        <IoIosAdd
          onClick={handleIncrement}
          className="text-2xl text-green-500 cursor-pointer"
        />
      </td>
      <td className="px-4 py-2 dark:text-white">
        ₹{total ? total : price / 100 || defaultPrice / 100}/-
      </td>
      <td>
        <RiDeleteBin7Line
          className="text-4xl px-2 cursor-pointer text-red-400"
          onClick={() => dispatch(removeItem(item.id))}
        />
      </td>
    </tr>
  );
};

export default CartItem;
