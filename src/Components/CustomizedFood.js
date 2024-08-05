import React from 'react'
import { MIND_ITEM_URL } from "../utils/constants";

const CustomizedFood = ({ item }) => {
    const { imageId, text } = item;
  return (
    <div className="flex flex-col items-center m-auto px-1 py-1 ">
      <img
        src={MIND_ITEM_URL + imageId}
        className="w-[144px] h-[180px] dark:rounded-3xl"
      />
      <h3>{text}</h3>
    </div>
  );
}

export default CustomizedFood;