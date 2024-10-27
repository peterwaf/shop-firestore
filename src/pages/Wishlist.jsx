import React from 'react'
import '../styles/wishlist.css'
import { useEffect, useState } from "react"
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
function Wishlist() {
    const [wishText, setWishText] = useState("");
    const wishlistContext = useContext(ShopContext);
    useEffect(() => {
        wishlistContext.favs.length > 0 ? setWishText("Wishlist") : setWishText("Wishlist is empty")
    }, [wishlistContext.favs])
    return (
        <div className="row" id="wishlist">
            <div className="col">
                
                {wishlistContext.favs ? <h2 className="text-center">{wishText}</h2> : <h2 className="text-center">{wishText}</h2>}
                <table className="table" id="wishlist">
                    <tbody>
                        {wishlistContext.favs.map(product => {
                            return <tr key={product.id} className="align-middle">
                                <td className="text-center"><img src={product.productImage} alt="product" /></td>
                                <td className="text-center">{product.productName}</td>
                                <td className="text-center">{product.productPrice}</td>
                                <td className="text-center"><button onClick={() => wishlistContext.removeFromFavs(product)} className="btn btn-danger">Remove</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Wishlist