import React, { useState, useContext } from "react";
import { ITEM_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa";
import { context } from "../utils/ContextProvider";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const MenuItem = ({ item, index, list }) => {
  const cartItems = useSelector((store) => store.cart.items);
  const {
    name,
    category,
    description,
    imageId,
    price,
    ratings,
    defaultPrice,
    ratingCountV2,
  } = item;
  let ratingsCount = ratings?.aggregatedRating?.ratingCount;

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    const filteredItem = cartItems.filter(
      (cartitem) => item.id === cartitem.id
    );
    if (filteredItem.length < 1) {
      //Dispatch an action
      dispatch(addItem(item));
      toast.success("Item added to the cart");
    } else {
      toast.error("Item already added in the cart");
    }
  };

  return (
    <>
      <div
        className={`flex items-center justify-between h-[290px] ${
          index === list.length - 1 ? "" : "border-b-2"
        } mx-auto`}
      >
        <div className="flex flex-col items-start justify-start text-justify gap-[10px] ml-5 h-[175px] max-w-[65%] dark:text-white">
          <h3 className="m-0 text-zinc-600 font-bold text-lg dark:text-white">
            {name}
          </h3>
          <h5 className="mt-[-5px] text-[16px] font-semibold m-0 text-zinc-700 dark:text-white">
            ₹ {price / 100 || defaultPrice / 100}
          </h5>
          <div
            className="text-[14px] mt-[5px] m-0 flex items-center gap-1"
            style={{
              color:
                +ratings?.aggregatedRating?.rating?.split(" ")[0] > 3
                  ? "green"
                  : "orange",
            }}
          >
            <span className="">
              <FaStar />
            </span>
            <span className="dark:text-slate-300">
              {(ratings?.aggregatedRating &&
                ratings?.aggregatedRating?.rating) ||
                "3.0"}
            </span>
            <span className="text-[#868e96] font-normal dark:text-slate-300">
              ({ratings?.aggregatedRating?.ratingCountV2 || 2})
            </span>
          </div>

          <p className="text-[#868e96] mt-[7px] text-justify text-sm sm:max-md:text-md xl:text-lg m-0 description dark:text-slate-200">
            {" "}
            {description}
            {/* {description?.substring(0, len)}
            {description && description?.length > 130 && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setLen(description?.length);
                }}
              >
                ...more
              </span>
            )}{" "} */}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          {imageId ? (
            <img
              src={ITEM_URL + imageId}
              className="w-[150px] h-[100px] sm:w-[200px] sm:h-[150px] rounded-xl"
              width="350px"
              height="450px"
            />
          ) : (
            " "
          )}
          <button
            className={`px-2 py-1 text-xl bg-white text-green-500 font-bold rounded border-2 border-green shadow-md ${
              imageId ? "w-[50%] sm:w-[40%]" : "w-20 mr-14"
            } `}
            onClick={() => handleAddItem(item)}
          >
            +ADD
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuItem;

/* {(index==(list.length-1)) ? " ": <hr className="text-[#e9ecef]" />} */
