import React, { useState } from "react";
import { context } from "../utils/ContextProvider";
import { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { FaMap } from "react-icons/fa";
import { setUserLocation } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const City = () => {
  const [searchLocation, setSearchLocation] = useState([]);
  const { citySidebar, setCitySideBar } = useContext(context);

  const dispatch = useDispatch();

  function debounce(func, delay = 500) {
    let timer;
    return function () {
      let args = arguments;
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const getData = (e) => {
    const getCitySuggestions = async (query) => {
      try {
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
          const suggestions = data.map((result) => result.display_name);

          setSearchLocation(data);
          return suggestions;
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    };

    getCitySuggestions(e.target.value);
  };

  const handleSearch = debounce((e) => getData(e));
  return (
    <div className="absolute left-0 top-0 z-10 h-screen bg-slate-300 w-5/6 px-2 dark:bg-slate-600">
      <HiMiniXMark
        className="cursor-pointer mt-4 text-3xl mb-4 dark:text-white"
        onClick={() => setCitySideBar((prev) => !prev)}
      />
      <input
        type="text"
        onChange={(e) => handleSearch(e)}
        placeholder="Search location"
        className="outline-none flex mx-auto px-3 py-2 w-[70%] text-xl rounded-md shadow-md drop-shadow-sm dark:bg-slate-500 dark:text-white"
      />

      <div className="flex flex-col mx-auto px-2 py-2 w-[70%] gap-4 mt-4">
        {searchLocation.map((location) => {
          return (
            <div
              key={location?.place_id}
              className="flex items-center gap-2 cursor-pointer dark:text-white"
              onClick={() => {
                dispatch(setUserLocation(location));
                setCitySideBar(!citySidebar);
              }}
            >
              <FaMap className="text-2xl" />
              <div className="m-0 leading-4">
                <h4>{location?.name}</h4>
                <p>{location?.display_name}</p>
                <p>----------------------------------</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default City;
