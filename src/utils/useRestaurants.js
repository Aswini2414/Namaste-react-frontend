import React, { useEffect, useState,useContext } from 'react';
import { context } from './ContextProvider';
import { useSelector } from 'react-redux';


const useRestaurants = () => {
    const {
      setResList,
      setFilteredRes,
      setFoodItems,
      resList,
      filteredRes,
      foodItems,
      setPayload,
      payload
    } = useContext(context);

  const user = useSelector((store) => store.user);

  useEffect(() => {
      fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  },[user])



  const fetchData = async () => {
    const data = await fetch(
      `https://namaste-react-backend.onrender.com/api/restaurants?lat=${user?.latitude}&lng=${user?.longitude}`
    );
    const json = await data.json();
    setPayload({
      csrfToken: json?.csrfToken,
      nextOffset: json?.data?.pageOffset?.nextOffset,
      widgetOffset: json?.data?.pageOffset?.widgetOffset,
    });
    setResList([
      // ...json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      ...json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    ]);
    setFilteredRes([
      // ...json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      //   ?.restaurants,
      ...json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    ]);
    setFoodItems([...json?.data?.cards[0]?.card?.card?.imageGridCards?.info]);
  };

  // "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update",
  return { resList, filteredRes, foodItems };
    
}
// "https://namaste-react-backend.onrender.com/api/restaurants?lat=17.406498&lng=78.47724389999999"

export default useRestaurants;

