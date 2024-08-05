import React, { createContext, useState } from "react";

export const context = createContext(null);

const ContextProvider = ({ children }) => {
  const [resList, setResList] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [data, setData] = useState([]);
  const [citySidebar, setCitySideBar] = useState("");
  const [payload, setPayload] = useState({});
  return (
    <context.Provider
      value={{
        resList,
        setResList,
        filteredRes,
        setFilteredRes,
        foodItems,
        setFoodItems,
        data,
        setData,
        citySidebar,
        setCitySideBar,
        payload,
        setPayload,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextProvider;
