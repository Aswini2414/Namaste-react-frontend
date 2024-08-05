import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SERVER_URL } from "./constants";
import { context } from "./ContextProvider";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useMindFoodRestaurants = (itemId, item) => {
  const [details, setDetails] = useState({
    name: "",
    desc: "",
  });

  const { data, setData } = useContext(context);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const data = await axios.get(
        `${SERVER_URL}/api/mindFoodRestaurants?itemId=${itemId}&item=${item}&lat=${user.latitude}&lng=${user.longitude}`
      );
      setData(data?.data?.data?.cards);
      setDetails({
        name: data?.data?.data?.cards[0]?.card?.card?.title,
        desc: data?.data?.data?.cards[0]?.card?.card?.description,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { data, setData, details, setDetails };
};

export default useMindFoodRestaurants;
