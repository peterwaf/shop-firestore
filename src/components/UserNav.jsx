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
                                    <li>Hi {userDat.firstName}</li>
                                    <li>{userDat.isAdmin && <Link to="/add-product" className="text-decoration-none">Add Product</Link>}</li>
                                    </ul>
                            }
                        })}
                        {/* for Google Authenticated users displayName */}
                        {userContext.currentUser.displayName ? `Hi ${userContext.currentUser.displayName.split(" ")[0]}` : ""}
                       
                        
                    <button onClick={logOut} className="btn btn-secondary btn-sm">logout</button>
                </div>

            </div>
        </div>
    )
}

export default UserNav