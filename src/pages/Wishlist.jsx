import React from 'react'
import '../styles/wishlist.css'
import { useEffect, useState } from "react"
function Wishlist(props) {
    const [wishText, setWishText] = useState("");
    useEffect(() => {
        props.favs.length > 0 ? setWishText("Wishlist") : setWishText("Wishlist is empty")
    }, [props.favs])
    return (
        <div className="row" id="wishlist">
            <div className="col">
                
                {props.favs ? <h2 className="text-center">{wishText}</h2> : <h2 className="text-center">{wishText}</h2>}
                <table className="table" id="wishlist">
                    <tbody>
                        {props.favs.map(product => {
                            return <tr key={product.id} className="align-middle">
                                <td className="text-center"><img src={product.productImage} alt="product" /></td>
                                <td className="text-center">{product.productName}</td>
                                <td className="text-center">{product.productPrice}</td>
                                <td className="text-center"><button onClick={() => props.removeFromFavs(product)} className="btn btn-danger">Remove</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Wishlist