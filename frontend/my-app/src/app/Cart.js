import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectLogged } from './loginSlice'
import { Link,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { delProduct } from './productsAPI';
import {addOrderAsync, selectMyCart, addItemToCart, deleteCart, removeItemFromCart } from './CartSlice'


const Cart = () => {
  const notify = () => toast.success("order complete");
  let loggedIn = useSelector(selectLogged);
  const myCart = useSelector(selectMyCart);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [totall, settotall] = useState(0)
  

  const Checkout = (myCart, token) =>{
    dispatch(addOrderAsync({ myCart, token }));
    dispatch(deleteCart())
  }

  return (

    <div align="center">
      {loggedIn &&<div>
      {/* {myOrders && myOrders.length} */}     
      <table style={{border:"1px solid black",fontFamily:"arial",borderCollapse: "collapse",width:"70%",height:"60%",margin:"20px"}}>
  <tr>
    <th>Product </th>
    <th>Price</th>
    <th>Amount</th>
  </tr>
  {myCart.map(prod =><tr>
    <td>{prod.desc}</td>
    <td>{prod.price}₪</td>
    <td><button onClick={() => dispatch(addItemToCart({ _id: prod._id, desc: prod.desc, price: prod.price, image: prod.image, amount: 1 ,total: 1}))}>+</button>
    &nbsp; {prod.amount} &nbsp;
    <button onClick={() => dispatch(addItemToCart({ _id: prod._id, desc: prod.desc, price: prod.price, image: prod.image, amount: -1, total: 1 }))}>-</button>
    </td>
    <td><Button onClick={() => dispatch(removeItemFromCart(prod._id))}>Delete</Button></td>
    {/* <td><button onClick={() => {DelFromCart(prod._id)}}>delete</button></td> */}
    </tr>)}
</table>

<h3 align="center">Total amount:{totall}₪</h3>

      {token &&<div>
        <div align="center">
{/* <form>
     <h2>Credit card checkout</h2>
     <h6>Cardholder's Full Name:</h6>
     <input label="Cardholder's Name" type="text" placeholder="Cardholder's name" /><br></br><br></br>
     <input label="Card Number" type="number" name="card_number" placeholder='Card Number' imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" /><br></br><br></br>
          <input label="Expiration Date" type="month" name="exp_date" placeholder='Expiration Date' />{" "}
          <input label="CVV" type="number" name="cvv" placeholder='CVV' />

      <Button text="Place order" />
      </form> */}

 </div>
        <Button variant='outlined' onClick={() =>{notify();Checkout();setTimeout(function() {window.location.replace('/home');}, 2000)}}>Make order</Button>
        </div>}
        <ToastContainer  position="bottom-center" autoClose={1000} />
        {/* <button onClick={() => console.table(myOrders)}>show MyOrders</button></div>} */}
       
       {!token &&
        <div>You need to <Link to="/login">login</Link> first</div>
      }
      </div>}
    </div>
  )
}

export default Cart