import React,{useState,useEffect,useContext} from 'react';
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { context } from './ContextProvider';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState([]);
  
  const user = useSelector((store) => store.user);
  useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const fetchedData = await axios.get(
          `${SERVER_URL}/api/mindFoodRestaurant?lat=${user.latitude}&lng=${user.longitude}&resId=${resId}`
        );
        // `${SERVER_URL}/api/mindFoodRestaurant?lat=17.406498&lng=78.47724389999999&restaurantId=${resId}`
        setResInfo(fetchedData?.data?.data)
        
      } catch (error) {
        toast.error(error.message);
      }
    };

  return {
    resInfo
  };
}

export default useRestaurantMenu

