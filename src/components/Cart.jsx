import React from 'react'
import '../styles/cart.css'
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart(props) {
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const loadTotal = () => {
        let tot = 0;
        props.cartItems.map(cartItem => {
            tot += cartItem.productPrice * cartItem.qty;
        })
        setTotal(tot);
    }

    useEffect(() => {
        loadTotal();
    }, [props.cartItems])

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
                {props.cartItems.length === 0 ? <p>Your cart is empty</p> : ""}
                <ul>
                    {props.cartItems.map(cartItem => {
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
                                props.updateQty(cartItem,parseInt(event.target.value))
                                
                            }} /></div>
                            <div> Amount : Ksh {cartItem.qty * cartItem.productPrice}</div>
                            <div><MdDelete onClick={() => props.deleteFromCart(cartItem)} className="delete-icon" /></div>
                        </li>
                    })}
                    <p>Total : Ksh {total}</p>
                </ul>
                {(props.cartItems.length > 0 && !props.isLoggedIn) ?<p>Please <a href="/log-in"> login</a> to place order or checkout</p>: <button onClick={checkout} className="btn btn-dark">Checkout</button>}
            </div>
        </div>
    )
}

export default Cart