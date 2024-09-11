import React from 'react';
import { useState, useEffect } from "react";
import './../styles/products.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
function Products(props) {
    const { category } = useParams();
    return (
        <div className="row" id="products">
            <div className="col-md-3">
                <h2 className="text-center">Categories</h2>
                <div className="card rounded-0 mb-5" >
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {props.categories.map(category => {
                                return <li key={category} className="list-group-item"><Link onClick={() => props.getProductsbyCategory(category)} to={`/products/${category}`}>{category}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <h2 className="text-center">Products</h2>
                <div className="row">
                    {props.allProducts.map(product => {
                        return <div className="col-md-3 d-flex justify-content-center" key={product.id}>
                            <div className="card rounded-0 mb-5" >
                                <img src={product.productImage} className="card-img-top rounded-0" alt="..." />
                                <div className="cart-icons">
                                    <a href="#" onClick={() => {
                                        props.alreadyInCart(product) ? document.getElementById(product.id).textContent = "In cart" : props.addToCart(product);
                                    }
                                    } className="p-2 m-1">
                                        <FaCartPlus />
                                    </a>

                                    <a href="#" onClick={() =>{ props.alreadyInFavs(product) ? document.getElementById(product.id).textContent = "In wishlist" : props.addToFavs(product)}} className="p-2 m-1">
                                        <FaRegHeart />
                                    </a>
                                    
                                </div>
                                <div className="card-body">
                                    <div className="wrap_after_thumbnail">
                                        <h2 className="woocommerce-loop-product__title" id="name1">{product.productName}</h2>
                                        <span className="pe-2 fw-bold">Ksh {product.productPrice}</span>
                                        <span>{product.productCategory}</span>
                                        <br />
                                        <span id={product.id} className="pe-2 text-danger"></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    )
}

export default Products