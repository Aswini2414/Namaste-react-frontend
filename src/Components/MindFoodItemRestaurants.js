import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import { SERVER_URL } from "../utils/constants";
import useMindFoodRestaurants from "../utils/useMindFoodRestaurants";
import useUpdateMindFoodRestaurants from "../utils/useUpdateMindFoodRestaurants";

const MindFoodItemRestaurants = () => {
  const { itemId, item } = useParams();

  const { data, setData, details, setDetails } = useMindFoodRestaurants(
    itemId,
    item
  );
  const { updateData } = useUpdateMindFoodRestaurants();

  if (data?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="max-w-[75%] m-auto">
        <h2 className="text-4xl font-semibold mb-0 dark:text-white">
          {details.name}
        </h2>
        <h5 className="text-lg mt-2 text-[#868e96] font-normal mb-5 dark:text-slate-300">
          {details.desc}
        </h5>
      </div>
      <InfiniteScroll
        dataLength={data.length}
        loader={<h4>Loading...</h4>}
        next={updateData}
        hasMore={true}
      >
        <div className="flex flex-wrap items-center justify-around max-w-[80%] m-auto">
          {data?.map((card, index) => {
            if (
              index === 0 ||
              index === 1 ||
              index === 2 ||
              !card?.card?.card?.info
            ) {
              return;
            }

            return (
              <Link
                to={"/restaurant/" + card?.card?.card?.info?.id}
                key={card?.card?.card?.info?.id}
                className="no-underline text-black"
              >
                <RestaurantCard rest_data={card?.card?.card} />
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MindFoodItemRestaurants;
