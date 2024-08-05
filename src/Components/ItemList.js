import React from 'react'
import MenuItem from './MenuItem';

const ItemList = ({ data }) => {
    let listOfItems = [];

    if (data?.categories?.length > 0) {
        listOfItems = data?.categories?.flatMap((item) =>
          item?.itemCards.map((card) => {
            return card?.card?.info;
          })
        );
    } else {
        listOfItems = data?.itemCards.map((card) => {
            return card?.card?.info
        });
    }
  return (
      <div>
          {listOfItems.map((item,index) => {
              return (
                <div key={item.id} className="mb-2" data-testid="food-items">
                  <MenuItem item={item} index={index} list={listOfItems} />
                </div>
              );
          })}
    </div>
  )
}

export default ItemList