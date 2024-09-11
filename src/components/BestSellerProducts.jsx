import React from 'react'
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
function BestSellerProducts(props) {
    const { category } = useParams();
    useEffect(() => {
        props.getBestSellersAll();
    }, [])

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="col-md-9">
                    <div className="row">
                        <div className="text-center bestsellerproducts">
                            <Link className="px-2" onClick={() => props.getBestSellersAll()} to={`/`}>All</Link>
                            {props.categories.map(category => {
                                return <Link onClick={() => props.getBestSellers(category)} key={category} to={`/${category}`} className="px-2">{category}</Link>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center bestseller-products-list row_custom_gap">
                {props.bestSellers.map(product => {
                    return <div className="col d-flex justify-content-center" key={product.id}>
                        <div className="card rounded-0 mb-5" >
                            <img src={product.productImage} className="card-img-top rounded-0" alt="..." />
                            <div className="cart-icons">
                                <a onClick={() => {
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

        </>
    )
}

export default BestSellerProducts