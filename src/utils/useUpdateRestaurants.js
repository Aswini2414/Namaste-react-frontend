import React, { useContext, useState } from "react";
import axios from "axios";
import { context } from "./ContextProvider";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useUpdateRestaurants = () => {
  const { setResList, setFilteredRes, setFoodItems, filteredRes, resList,payload } =
    useContext(context);
  const [count, setCount] = useState("9");

  const user = useSelector((store) => store.user);

  const updateData = async () => {
    const requestData = {
      lat: user.latitude,
      lng: user.longitude,
      count: count,
      ...payload
    };

    try {
      const response = await fetch(
        "https://namaste-react-backend.onrender.com/api/restaurants/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0", // Example header
            // 'Authorization': 'Bearer <token>', // If needed
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      setFilteredRes([
        ...filteredRes,
        ...data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      ]);
      setResList([
        ...resList,
        ...data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants,
      ]);
      setCount(
        data?.data?.pageOffset?.widgetOffset
          ?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo
      );
    } catch (error) {
      toast.error(error.message);
    }
  };
  return { updateData, filteredRes, resList };
};

export default useUpdateRestaurants;
