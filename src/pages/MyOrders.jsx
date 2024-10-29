import React from 'react';
import { useState, useEffect } from "react"
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
function MyOrders() {
    const myOrdersContext = useContext(ShopContext);
    const [userOrders, setUserOrders] = useState([]);
    const [errorHolder, setErrorHolder] = useState("");
    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleDateString(); // or use toLocaleString() for full date and time
      };
  
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "orders"));
                const allOrders = querySnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } });
                const filteredOrders = allOrders.filter(order => order.userId === myOrdersContext.loggedInUserID);
                console.log(filteredOrders);
                setUserOrders(filteredOrders);
            } catch (error) {
                setErrorHolder("Failed to load orders");
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [myOrdersContext.userID]); // add dependency on userID
    console.log(userOrders);
    
    return (
        <div className="row" id="myOrders">
                <h2 className="text-center">My Orders</h2>
                {errorHolder && <p className="text-danger text-center">{errorHolder}</p>}
                {userOrders.length > 0 ? (
                    <table className="table" id="myOrders">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th>Ordered Items</th>
                                <th>Order Status</th>
                                <th>Order Total</th>
                            </tr>
                        </thead>
                        <tbody className="px-2">
                            {userOrders.map((order, index)=> (
                                <tr key={index}>
                                    <td>{order.id}</td>
                                    <td>{convertTimestampToDate(order.orderDate)}</td>
                                    <td>{order.cartItems.map(item => <a href={`/product-details?title=${item.productName}&id=${item.id}`}><span className="badge rounded-pill bg-secondary mx-1">{item.productName}</span></a>)}</td>  
                                    <td>{order.status}</td>
                                    <td>Ksh.{order.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No orders found</p>
                )}
        </div>
    )
}

export default MyOrders