import React from 'react';
import '../styles/checkout.css'
import { db } from "../firebase/config";
import { collection, addDoc,doc,setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
function CheckOut() {
    const checkOutContext = useContext(ShopContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const loadTotal = () => {
        let tot = 0;
        checkOutContext.cartItems.map(cartItem => {
            tot += cartItem.productPrice * cartItem.qty;
        })
        setTotal(tot);
    }

    useEffect(() => {
        loadTotal();
    }, [checkOutContext.cartItems])
  
    const validatePayment = () => {
        //where to validate payments logic
        return true
    }

    const placeOrder = async () => {
        //get cartItems and favItems from localStorage
        const cartItems = checkOutContext.cartItems;
        const favItems = checkOutContext.favs;
        const userId = checkOutContext.loggedInUserID;
        /*validate payments then add favs and cartItems to
        database*/
        if (validatePayment()) {
            try {
                //add favs and cartItems to database
                await addDoc(collection(db, "orders"), {
                    cartItems: cartItems,
                    userId: userId,
                    orderDate: new Date(),
                    total: total,
                    status: "pending"
                });
                //add favs to database if not empty using userId as docId
                if (favItems) {
                    await setDoc(doc(db, "favorites", userId), {
                        favs: favItems
                    })
                }
                
                // clear local storage and favs 
                localStorage.removeItem("cartItems");
                localStorage.removeItem("favs");
              
                //navigate to success page
                alert("Order placed successfully");
                window.location.reload();
            } catch (error) {
                console.log(error.message);
            }
        }
        else {
            //navigate to failure page
            alert("Payment failed, please try again");
        }

    }
    return (
        <div className="row" id="checkout">
            <div className="col">

                <h2 className="text-center">Checkout</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        {checkOutContext.cartItems.map(product => {
                            return <tr key={product.id} className="align-middle">
                                <td className="text-center"><img src={product.productImage} alt="product" /></td>
                                <td className="text-center">{product.qty}</td>
                                <td className="text-center">{product.productName}</td>
                                <td className="text-center">{product.productPrice}</td>
                            </tr>
                        })}
                        <tr>
                            <td></td>
                            <td>Total</td>
                            <td>{total}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><button onClick={placeOrder} className="btn btn-success">Place Order</button></td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default CheckOut