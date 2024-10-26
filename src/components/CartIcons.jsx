import React from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import '../styles/carticons.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function CartIcons(props) {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const[favsCount, setFavsCount] = useState(0);
  /* count cart items */
  const countCartItems = () => {
      setCartItemsCount(props.cartItems.length);
  }

    /* count fav items */

  const countFavs = () => {
      setFavsCount(props.favs.length);
  }

  useEffect(() => {
      countCartItems();
  }, [props.cartItems])

  useEffect(() => {
      countFavs();
  }, [props.favs])

  return (
    <div className="col-md-4 d-flex justify-content-center">
          <div className="row navbar top_icons" id="cartIcons">
            {/* <div className="col"><IoSearch /></div> */}
            <div className="col">
              <Link id="favCounterLink" to="/wishlist"> <FaRegHeart />
              <span id="fav_count">{favsCount}</span></Link>
              
            </div>
            <div className="col">
            <a id="counterLink" className="" data-bs-toggle="offcanvas" href="#cartContents" role="button" aria-controls="offcanvasExample">
                <FaCartPlus /> <span id="product_count">{cartItemsCount}</span></a></div> 
                
                
          </div>
        </div>
  )
}

export default CartIcons