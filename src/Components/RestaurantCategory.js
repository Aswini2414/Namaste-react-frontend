import React,{useState} from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ItemList from './ItemList';
import { IoIosArrowUp } from "react-icons/io";

const RestaurantCategory = ({ data,showItems,setShowIndex }) => {

  let itemLengthArray = [];

  if (data?.categories?.length > 0) {
    itemLengthArray = data?.categories.map((item) => item.itemCards.length);
  } else {
    itemLengthArray = [data?.itemCards.length];
  }
  

  const itemLength = itemLengthArray.reduce(calculateLength,0);

  function calculateLength(total,num) {
    return total + num;
  }
  
  const handleClick = () => {
    setShowIndex();
  }
    return (
      <>
        <div
          className="my-4 px-2 py-1 shadow-md dark:shadow-none"
          data-testid="category-heading"
        >
          {/* Header */}
          <div
            className="flex justify-between ml-5 cursor-pointer"
            onClick={handleClick}
          >
            <h1 className="font-bold text-lg text-left dark:text-white">
              {data?.title}({itemLength})
            </h1>
            {showItems ? (
              <IoIosArrowUp className="text-2xl dark:text-white" />
            ) : (
              <IoIosArrowDown className="text-2xl dark:text-white" />
            )}
          </div>
          {/* Accordion Body */}
          {showItems && <ItemList data={data} />}
        </div>
      </>
    );
}

export default RestaurantCategory;