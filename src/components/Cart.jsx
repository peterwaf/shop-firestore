import React from 'react'
import '../styles/cart.css'
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/shopContex";
import { useContext } from "react";

function Cart() {
    const cartContext = useContext(ShopContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const loadTotal = () => {
        let tot = 0;
        cartContext.cartItems.map(cartItem => {
            tot += cartItem.productPrice * cartItem.qty;
        })
        setTotal(tot);
    }

    useEffect(() => {
        loadTotal();
    }, [cartContext.cartItems])

    const checkout = () => {
        navigate(`/checkout`);
    }

    
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartContents" aria-labelledby="cartContentsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="cartContentsLabel">Cart Items</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {cartContext.cartItems.length === 0 ? <p>Your cart is empty</p> : ""}
                <ul>
                    {cartContext.cartItems.map(cartItem => {
                        return <li className="cart-item" key={cartItem.id}>
                            <div><img src={cartItem.productImage} /></div>
                            <div>
                                <p>{cartItem.productName}</p>
                                <p>Ksh {cartItem.productPrice}</p>
                            </div>
                            <div>How many? : <input className="qty" type="number" value={cartItem.qty} onChange={(event) => {
                                let prodCount = parseInt(event.target.value);
                                if (prodCount<1 || isNaN(prodCount)) {
                                    event.target.value = 1;
                                }
                                cartContext.updateQty(cartItem,parseInt(event.target.value))
                                
                            }} /></div>
                            <div> Amount : Ksh {cartItem.qty * cartItem.productPrice}</div>
                            <div><MdDelete onClick={() => cartContext.deleteFromCart(cartItem)} className="delete-icon" /></div>
                        </li>
                    })}
                    <p className="font-weight-bold">Total : Ksh {total}</p>
                </ul>
                {/* if cart is not empty and user is not logged in*/ }
                {cartContext.cartItems.length > 0 && !cartContext.isLoggedin &&<p>Please <a href="/log-in"> login</a> to place order or checkout</p>}
                {cartContext.cartItems.length > 0 && cartContext.isLoggedin && <button className="btn btn-dark" onClick={checkout}>Checkout</button>}
            </div>
        </div>
    )
}

export default Cart