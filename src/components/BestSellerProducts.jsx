import React from 'react'
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
import ProductDetails from "../pages/ProductDetails";
function BestSellerProducts() {
    const { category } = useParams();
    const bestSellerContext = useContext(ShopContext);
    useEffect(() => {
        bestSellerContext.getBestSellersAll();
    }, [])

    return (
        <>
            <div className="row d-flex justify-content-center">
                    <div className="row">
                        <div className="text-center bestsellerproducts">
                            <Link className="px-2" onClick={() => bestSellerContext.getBestSellersAll()} to={`/`}>All</Link>
                            {bestSellerContext.productCategories.map(category => {
                                return <Link onClick={() => bestSellerContext.getBestSellersByCategory(category)} key={category} to={`/${category}`} className="px-2">{category}</Link>
                            })}
                        </div>
                    </div>
               
            </div>

            <div className="row d-flex justify-content-center bestseller-products-list row_custom_gap">
                {bestSellerContext.bestSellers.map(product => {
                    return <div className="col d-flex justify-content-center" key={product.id}>
                        <div className="card rounded-0 mb-5" >
                            <img src={product.productImage} className="card-img-top rounded-0" alt="..." />
                            <div className="cart-icons">
                                <a onClick={() => {
                                    bestSellerContext.alreadyInCart(product) ? document.getElementById(product.id).textContent = "In cart" : bestSellerContext.addToCart(product);
                                }
                                } className="p-2 m-1">
                                    <FaCartPlus />
                                </a>
                                <a href="#" onClick={() =>{ bestSellerContext.alreadyInFavs(product) ? document.getElementById(product.id).textContent = "In wishlist" : bestSellerContext.addToFavs(product)}} className="p-2 m-1">
                                    <FaRegHeart />
                                </a>
                            </div>
                            <div className="card-body">
                                <div className="wrap_after_thumbnail">
                                    <h2 className="product__title" id="name1"><Link to={`/product-details?title=${product.productName}&id=${product.id}`}>{product.productName}</Link></h2>
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