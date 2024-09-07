import React from 'react'
import { Link } from "react-router-dom"
import CartIcons from "./CartIcons"
import Cart from "./Cart"
function Nav(props) {
  return (
    <div className="row">
        <div className="col-md-4 d-flex justify-content-center">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a className='navbar-brand' href='#'></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={props.getProducts} className='nav-link' to='/products'>Products</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <img src="/images/logo.svg" />
        </div>
          <CartIcons cartItems={props.cartItems} />
          <Cart deleteFromCart={props.deleteFromCart} cartItems={props.cartItems} updateQty={props.updateQty} />
      </div>
  )
}

export default Nav