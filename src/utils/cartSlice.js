import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
      items: [],
      total:[]
  },
  reducers: {
    addItem: (state, action) => {
      //mutating the state here
      action.payload.qty = 1;
      action.payload.total =
        action.payload.price / 100 || action.payload.defaultPrice / 100;
          state.items.push(action.payload);
          
          //total cost
          const totalArr = state.items.map((item) => {
            return item.total;
          });
          const finalTotal = totalArr.reduce(sum, 0);
          function sum(total, num) {
            return total + num;
          }
          state.total[0] = finalTotal;
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
        state.items.splice(index, 1);

        //total cost
        const totalArr = state.items.map((item) => {
          return item.total;
        });
        const finalTotal = totalArr.reduce(sum, 0);
        function sum(total, num) {
          return total + num;
        }
        state.total[0] = finalTotal;
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
    incrementQty: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      let Qty = state.items[index].qty;
      let QtyInc = Qty + 1;
      state.items[index].qty = Qty + 1;
      console.log(state.items);

      state.items[index].total =
        state.items[index].qty *
        (state.items[index].price / 100 ||
                state.items[index].defaultPrice / 100);
        
        //total cost
        const totalArr = state.items.map((item) => {
          return item.total;
        });
        const finalTotal = totalArr.reduce(sum, 0);
        function sum(total, num) {
          return total + num;
        }
        state.total[0] = finalTotal;
    },
    decrementQty: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      let Qty = state.items[index].qty;
      console.log(Qty);
      if (Qty > 1) {
        state.items[index].qty = Qty - 1;
      } else {
        state.items[index].qty = Qty;
      }

      state.items[index].total =
        state.items[index].qty *
        (state.items[index].price / 100 ||
          state.items[index].defaultPrice / 100);

      //total cost
      const totalArr = state.items.map((item) => {
        return item.total;
      });
      const finalTotal = totalArr.reduce(sum, 0);
      function sum(total, num) {
        return total + num;
      }
      state.total[0] = finalTotal;
    },
  },
});

export const { addItem, removeItem, clearCart, incrementQty, decrementQty } =
  cartSlice.actions;

export default cartSlice.reducer;
