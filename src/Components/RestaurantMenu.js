import { useState, useEffect } from "react";
import axios from "axios";
import { MENU_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState();
  const { resId } = useParams();

  const { resInfo } = useRestaurantMenu(resId);

  if (resInfo.length === 0) {
    return <Shimmer />;
  }

  // 491475
  const {
    name,
    totalRatingsString,
    costForTwoMessage,
    cuisines,
    avgRating,
    sla,
  } = resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) => {
        const cardType = c?.card?.card?.["@type"];
        return (
          cardType ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
          cardType ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );


  return (
    <div className="text-center w-[70%] ml-auto mr-auto mt-[4%] mb-[8%]">
      <h1 className="font-roboto font-extrabold text-2xl dark:text-white">
        {name}
      </h1>
      <div className="max-w-[800px] rounded-xl shadow-sm shadow-[#e9ecef] dark:shadow-none">
        <h5 className="flex items-center text-base leading-baase font-extrabold px-1 py-2 ">
          <span className="text-green-600 text-base mt-[5px]">
            <MdStars />
          </span>{" "}
          &nbsp;
          <span className="dark:text-white">{avgRating}</span> &nbsp;
          <span className="dark:text-white">({totalRatingsString})</span>
          &nbsp; &nbsp; &nbsp;
          <span className="dark:text-white">{costForTwoMessage}</span>
        </h5>
      </div>
      <div className="mt-[4%] text-center">
        <div className="font-normal font-roboto text-[#868e96] tracking-wide flex justify-center items-center mb-6">
          <span>
            <IoFlowerOutline className="mr-[7px] dark:text-white" />
          </span>
          <span className="dark:text-white">MENU</span>
          <span>
            <IoFlowerOutline className="dark:text-white"/>
          </span>
        </div>
        <div className="mx-auto">
          {categories.map((c, index) => {
            return (
              <RestaurantCategory
                data={c?.card?.card}
                key={c?.card?.card?.title}
                showItems={index === showIndex ? true : false}
                setShowIndex={() => setShowIndex(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;