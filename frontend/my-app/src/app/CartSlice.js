import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendOrders } from './OrderAPI';
const initialState = {
    myCart: (JSON.parse(localStorage.getItem("myCart"))) ? (JSON.parse(localStorage.getItem("myCart"))) : ([]),
    id: 0,
    status: 'idle',
  };
  
export const addOrderAsync = createAsyncThunk('order/sendOrders',async (payload) => {
    const response = await sendOrders(payload.myCart, payload.token);
    // console.log(response.data);
    return response.data;
  }
);
  // cart method
  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItemToCart: (state, action) => {
        console.log(action.payload)
  
        let temp = state.myCart.find((x) => x._id === action.payload._id);
        console.log(state.myCart.find((x) => x._id === action.payload._id))
        if (temp) {
          if (temp.amount === 1 && action.payload.amount === -1) {return state.myCart = state.myCart.filter(x => x._id !== temp._id),localStorage.setItem("myCart", JSON.stringify(state.myCart))}
          else {
            return temp.amount += action.payload.amount,
            temp.total = action.payload.price* temp.amount,
            // temp.total = temp.total+ action.payload.price* action.payload.amount,
  
            // temp.total =  2* 2,
  
            localStorage.setItem("myCart", JSON.stringify(state.myCart))}
        } else {
          
          console.log("no")
          state.myCart = [...state.myCart, action.payload]
        }
        localStorage.setItem("myCart", JSON.stringify(state.myCart))
        console.table(state.myCart)
      },
  
      deleteCart: (state, action) => {
        // console.log(action.payload)
        state.myCart = ([])
        console.log(state.myCart)
        localStorage.clear()
  
      },
      removeItemFromCart: (state, action) => {
        console.log(action.payload)
        state.myCart = state.myCart.filter(x => x._id !== action.payload)
        console.log(state.myCart)
  
        localStorage.setItem("myCart", JSON.stringify(state.myCart))
  
      }
      // changeAmount: (state, action) => {
      //   console.log("i need to change amount")
      //   console.log(action.payload)
      // }
    },
  
    extraReducers: (builder) => {
  
    },
  });
  
  // methods to export
  export const { addItemToCart, deleteCart, removeItemFromCart, DelFromCart, changeAmount } = cartSlice.actions;
  
  
  // selctors to export
  export const selectMyCart = (state) => state.cart.myCart;
  // export const selectOrderList = (state) => state.order.orderList;
  
  export default cartSlice.reducer;