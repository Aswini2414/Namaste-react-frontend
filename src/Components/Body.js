
import { useRef } from "react";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect,useContext } from "react";
import Shimmer from "./Shimmer"
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomizedFood from "./CustomizedFood";
import { LuArrowLeft } from "react-icons/lu";
import { LuArrowRight } from "react-icons/lu";
import useRestaurants from "../utils/useRestaurants";
import { context } from "../utils/ContextProvider";
import useUpdateRestaurants from "../utils/useUpdateRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";
import Footer from "./Footer";
import { IoSearchSharp } from "react-icons/io5";


const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [scrollable, setScrollable] = useState({
    left: false,
    right: false,
  });

  const { onlineStatus } = useOnlineStatus();
  const {
    setResList,
    setFilteredRes,
    setFoodItems,
    resList,
    filteredRes,
    foodItems,
  } = useContext(context);
  const { } = useRestaurants();
  const { updateData} = useUpdateRestaurants();
  const mindSectionRef = useRef(null);

  
  const handleScroll = () => {
    setScrollable((prev) => ({
      ...prev,
      left: mindSectionRef?.current?.scrollLeft === 0 ? false : true,
    }));
    setScrollable((prev) => ({
      ...prev,
      right:
        Math.ceil(
          mindSectionRef?.current?.scrollLeft +
            mindSectionRef?.current?.clientWidth
        ) >= mindSectionRef?.current?.scrollWidth
          ? false
          : true,
    }));
  };

  if (resList.length === 0) {
    return <Shimmer />;
  }

  if (onlineStatus === false) {
    return <h1 className="flex mt-[5%] justify-center text-2xl items-center ">Looks like you're offline!!!</h1>
  }

  return (
    <div>
      <div className="flex items-center m-auto max-w-[80%] filters">
        <div className="border-2 border-slate-200 rounded flex items-center dark:border-none">
          <input
            type="text"
            value={searchText}
            placeholder="Search for restaurants"
            className="px-2 py-1 rounded outline-none tracking-wide dark:bg-slate-500 dark:text-white "
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IoSearchSharp
            className="cursor-pointer text-2xl font-bold hover:bg-slate-500 hover:rounded-full hover:text-white hover:p-1 dark:hover:bg-yellow-500 dark:hover:rounded dark:text-white dark:text-3xl"
            onClick={() => {
              const filtered = resList.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRes(filtered);
            }}
          />
        </div>
        <button
          className="m-3 cursor-pointer bg-green-100 hover:bg-green-400 px-2 py-1 rounded tracking-wide "
          onClick={() => {
            const filtered = resList.filter((res) => res.info.avgRating > 4.5);
            setFilteredRes(filtered);
            console.log(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="max-w-[80%] m-auto mt-2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold dark:text-white">What's on your mind ?</h2>
          <div className="flex text-xl justify-between gap-3">
            <LuArrowLeft
              className={` ${
                scrollable.left ? "bg-[#babdbf]" : "bg-[#e9ecef]"
              } rounded-full p-1 bg-[#e9ecef] text-3xl cursor-pointer`}
              disabled={!scrollable.left}
              onClick={(e) => {
                e.preventDefault();
                mindSectionRef.current.scrollLeft -= 480;
              }}
            />
            <LuArrowRight
              className={` ${
                scrollable.right ? "bg-[#babdbf]" : "bg-[#e9ecef]"
              } rounded-full p-1 bg-[#e9ecef] text-3xl cursor-pointer`}
              disabled={!scrollable.right}
              onClick={(e) => {
                e.preventDefault();
                mindSectionRef.current.scrollLeft += 480;
              }}
            />
          </div>
        </div>
        <div
          className="flex items-center justify-between overflow-hidden scroll-smooth w-auto h-auto m-auto "
          ref={mindSectionRef}
          onScroll={handleScroll}
        >
          {foodItems?.map((item) => {
            let text = item?.action?.text;
            let id = item?.action?.link?.split("/")[4]?.split("?")[0];
            return (
              <Link to={`/foodItem/${text}/${id}`} key={item.id}>
                <CustomizedFood item={item} />
              </Link>
            );
          })}
        </div>
        <hr className="mt-2 mb-[5%] text-[#e9ecef]" />
      </div>
      <InfiniteScroll
        dataLength={filteredRes.length}
        loader={<h4>Loading...</h4>}
        next={updateData}
        hasMore={true}
      >
        <div className="flex flex-wrap items-center justify-around m-auto max-w-[80%]">
          {filteredRes?.map((rest_data) => {
            return (
              <Link
                to={"/restaurant/" + rest_data.info.id}
                key={rest_data.info.id}
                className="no-underline text-black"
              >
                <div>
                  <RestaurantCard rest_data={rest_data} />
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Body;
