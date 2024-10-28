import React from 'react'
import { useState } from "react"
import { storage } from "../firebase/config";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";

function ManageProducts() {
    const manageProductsContext = useContext(ShopContext);
    console.log(manageProductsContext.allProducts);

    return (
        <div className="row">
            <div className="col">
                {/* if the user is Admin show this table  */}
                {manageProductsContext.userDatainDB.map(userDat => {
                    userDat.isAdmin && <table className="table-responsive">
                        <tbody>
                            <tr>
                                <th>Product ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://picsum.photos/200/300" alt="product" /></td>
                                <td>Product 1</td>
                                <td>$20</td>
                                <td><button className="btn btn-danger">Delete</button></td>
                                <td><button className="btn btn-primary">Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                })}
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Product ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        {manageProductsContext.allProducts.map(product => {
                            return <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img style={{ width: "100px", height: "auto" }} src={product.productImage} alt="product" /></td>
                                <td>{product.productName}</td>
                                <td>{product.productPrice}</td>
                                <td><button onClick={() => manageProductsContext.deleteProduct(product)} className="btn btn-danger">Delete</button></td>
                                <td><button className="btn btn-dark">Edit</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageProducts