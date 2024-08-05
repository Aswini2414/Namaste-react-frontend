import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../utils/cartSlice";
import Emptycart from "./Emptycart";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const total = useSelector((store) => store.cart.total);

  const dispatch = useDispatch();
  if (cartItems.length === 0) {
    return (
      <>
        <Emptycart />
      </>
    );
  }
  return (
    <div className="w-[80%] sm:mx-auto mt-[2%] mb-[8%] ">
      <div className="flex flex-col">
        <button
          className="bg-slate-400 px-2 py-1 text-white rounded mb-4 ml-auto"
          onClick={() => dispatch(clearCart())}
        >
          Empty Cart
        </button>
      </div>
      <table>
        <tbody>
          {cartItems.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}

          <tr className=" h-[80px] rounded shadow-md drop-shadow-sm">
            <td className="w-full px-4 py-2 text-semi-bold text-xl dark:text-slate-300">
              Card Totals
            </td>
            <td className="hidden sm:table-cell"></td>
            <td className="hidden sm:table-cell"></td>
            <td className="px-4 py-2 w-full text-2xl font-bold dark:text-white">
              ₹{total[0]}/-
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col">
        <button
          className="bg-green-500 px-2 py-1 text-white rounded mt-4 mr-auto font-bold "
          onClick={() => dispatch(clearCart())}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
