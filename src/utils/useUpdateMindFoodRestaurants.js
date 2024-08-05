import React,{useContext,useState} from "react";
import { SERVER_URL } from "./constants";
import axios from "axios";
import { context } from "./ContextProvider";
import { useSelector } from "react-redux";


const useUpdateMindFoodRestaurants = () => {
    const { setData } = useContext(context);
    const [count, setCount] = useState(10);

    const user = useSelector((store) => store.user);
    const updateData = async () => {
        const requestData = {
            lat: user.latitude,
            lng: user.longitude,
            collection: "83650",
            tags: "layout_CCS_IceCreams",
            sortBy: "",
            filters: "",
            type: "rcv2",
            nextOffset: "CM1fEOskKIDAtfmZz4GaUTDBEDgE",
            widgetOffset: {
                "ContentCurationStories_Ice-Creams_inline_Theme": "",
                restaurantCountWidget: "",
                inlineFacetFilter: "",
                collectionV5RestaurantListWidget_SimRestoRelevance_food: count,
                collectionV5MastheadWidget: "",
            },
            page_type: null,
            _csrf: "nPwO8rvllOlS-rWXuljKt9CbTroc65yANeF-7fD0",
        };
        const data = await axios.post(`${SERVER_URL}/api/mindFoodRestaurants/update`, requestData);

        setData((prev) => [...prev, ...data?.data?.data?.cards]);
    };

    return { updateData }
};

export default useUpdateMindFoodRestaurants