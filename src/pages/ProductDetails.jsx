import React from 'react';
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
function ProductDetails() {
    const searchParams = new URLSearchParams(location.search);
    const prodContext = useContext(ShopContext);
    const id = searchParams.get("id");
    const [productInfo, setProductInfo] = useState(null);
    useEffect(() => {
        // load product details

        const getProductDetails = async (id) => {
            try {
                const productRef = doc(db, "products", id);
                const productSnap = await getDoc(productRef);
                setProductInfo(productSnap.data());
            } catch (error) {
                console.log(error.message);
            }
        };
        getProductDetails(id);
    }, [id]);

    return (
        <div className="row">
            <div className="col">
                {productInfo && (
                    <>
                        <h2 className="text-left mx-3">{productInfo.productName}</h2>
                        <img src={productInfo.productImage} className="img-fluid float-start mx-3" alt="product" />
                        <p>{productInfo.productDesc}</p>
                        <p><span className="fw-bold">Price : Ksh.</span>{productInfo.productPrice}</p>
                        <p> <span className="fw-bold">In stock : </span>{productInfo.stock}</p>
                        <p><span className="fw-bold"> Category : </span>{productInfo.productCategory}</p>
                        <button className="btn btn-dark" onClick={() => prodContext.addToCart(productInfo)}>Add to cart</button>
                    </>
                )}
            </div>

        </div>
    )
}

export default ProductDetails