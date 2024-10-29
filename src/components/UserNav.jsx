import React, { useState, useEffect } from 'react';
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "../styles/usernav.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
function UserNav() {
    const userContext = useContext(ShopContext);
    const logOut = async () => {
        try {
            await signOut(auth);
            userContext.resetLoggedIn();
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="row mt-2 mb-2">
            <div className="col d-flex justify-content-end">
                <div className="d-flex justify-content-center align-items-center">
                    {userContext.userDatainDB.map(userDat => {
                        if (userDat.userId == userContext.loggedInUserID) {
                            return <ul key={userDat.userId} id="userNav">
                                {userDat.firstName && <li>  Hi {userDat.firstName} </li>}
                                {userDat.isAdmin && <li> <Link to="/add-product" className="text-decoration-none">Add Product</Link></li>}
                                {userDat.isAdmin && <li> <Link to="/manage-products" className="text-decoration-none">Manage Products</Link></li>}
                            </ul>
                        }
                    })}
                    {/* for Google Authenticated users displayName */}
                 
                    {userContext.currentUser.displayName && <ul key={userContext.currentUser.uid}> <li>Hi {userContext.currentUser.displayName.split(" ")[0]}</li></ul>}

                    <ul key={userContext.loggedInUserID} id="myOrders" className="m-0 p-0 list-unstyled">
                        <li className="px-1"><Link to="/my-orders" className="text-decoration-none">My Orders</Link></li>
                    </ul>
                    <button onClick={logOut} className="btn btn-secondary btn-sm">logout</button>
                </div>

            </div>
        </div>
    )
}

export default UserNav