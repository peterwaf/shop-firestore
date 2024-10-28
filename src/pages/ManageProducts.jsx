import React from 'react'
import { useState, useEffect } from "react"
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
import { db } from "../firebase/config";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import "../styles/manage.css";

function ManageProducts() {
    const manageProductsContext = useContext(ShopContext);
    const [prodToEdit, setProdToEdit] = useState({
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        stock: 1,
        productImage: "",
        bestSeller: false,
        favourite: false,
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const [editMessage, setEditMessage] = useState("");
    const loadEditProduct = async (prodID) => {
        try {
            const docRef = doc(db, "products", prodID);
            const docSnap = await getDoc(docRef);
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    id: docSnap.id,
                    productName: docSnap.data().productName,
                    productDesc: docSnap.data().productDesc,
                    productPrice: docSnap.data().productPrice,
                    productCategory: docSnap.data().productCategory,
                    stock: docSnap.data().stock,
                    productImage: docSnap.data().productImage,
                    bestSeller: docSnap.data().bestSeller,
                    favourite: docSnap.data().favourite,
                    createdAt: docSnap.data().createdAt,
                    updatedAt: docSnap.data().updatedAt
                }
            });
        } catch (error) {
            console.log(error.message);

        }
    }
    const handleEdChange = async (event) => {
        if (event.target.name === "productImage") {
            const uploadRef = ref(storage, `images/${crypto.randomUUID()}${event.target.files[0].name}`);
            uploadBytes(uploadRef, event.target.files[0]).then(
                uploadResult => {
                    getDownloadURL(uploadResult.ref).then(url => {
                        setProdToEdit(prevData => {
                            return {
                                ...prevData,
                                [event.target.name]: url
                            }
                        })
                    })
                }
            ).catch(error => console.log(error.message))
        }
        if (event.target.name === "productImage" && !event.target.files[0]) {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: prevData.productImage
                }
            })
        }
        if (event.target.name === "bestSeller" && event.target.value === "Yes") {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: true
                }
            })
        }
        if (event.target.name === "bestSeller" && event.target.value === "No") {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: false
                }
            })
        }
        if (event.target.name === "favourite" && event.target.value === "No") {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: false
                }
            })
        }
        if (event.target.name === "favourite" && event.target.value === "Yes") {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: true
                }
            })
        }
        // if a value is not changed, keep the previous value

        if (!event.target.value) {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: prevData[event.target.name]
                }
            })
        }

        else {
            setProdToEdit(prevData => {
                return {
                    ...prevData,
                    [event.target.name]: event.target.value
                }
            })
        }
    }

    //submit the edited product to the database
    const editProdSubmit = async (event) => {
        event.preventDefault();
        //check if form is empty
        try {
            const docRef = doc(db, "products", prodToEdit.id);
            await setDoc(docRef, prodToEdit);
            manageProductsContext.getProducts();
            setEditMessage("Product updated successfully");
            setTimeout(() => {
                setEditMessage("");
            },1000)
        } catch (error) {
            console.log(error.message);
        }
    }
    console.log(prodToEdit);

    return (
        <>
            <div className="row">
                <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="editModalLabel">Edit Product</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/*if the user is Admin show this form for editing the product */}
                                <form onSubmit={editProdSubmit} className="p-3">
                                    <div className="mb-3">
                                        <label htmlFor="productName" className="form-label">Product Name</label>
                                        <input type="text" onChange={handleEdChange} value={prodToEdit.productName} name="productName" className="form-control" id="productName" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productDesc" className="form-label">Product Description</label>
                                        <textarea onChange={handleEdChange} value={prodToEdit.productDesc} className="form-control" name="productDesc" id="productDesc" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                                        <input onChange={handleEdChange} value={prodToEdit.productPrice} name="productPrice" type="text" className="form-control" id="productPrice" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productCategory" className="form-label">Product Category</label>
                                        <select onChange={handleEdChange} value={prodToEdit.productCategory} name="productCategory" id="productCategory" className="form-select" >
                                            <option value="Hair">Hair</option>
                                            <option value="Skin">Skin</option>
                                            <option value="Accessories">Accessories</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label">Stock</label>
                                        <input onChange={handleEdChange} name="stock" value={prodToEdit.stock} type="number" className="form-control" id="stock" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productImage" className="form-label">Product Image</label>
                                        <div id="previewImage">{prodToEdit.productImage && <img src={prodToEdit.productImage} className="img-fluid" style={{ width: "200px", height: "200px" }} alt="" width="200" height="200" />}</div>
                                        <input onChange={handleEdChange} name="productImage" type="file" className="form-control" id="productImage" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="bestSeller" className="form-label">Best Seller</label>
                                        <select required onChange={handleEdChange} name="bestSeller" id="bestSeller" className="form-select">
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="favourite" className="form-label">Favourite</label>
                                        <select required onChange={handleEdChange} name="favourite" id="favourite" className="form-select" >
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>


                                    <div className="mb-3 text-center">
                                        <div className="text-alert">{editMessage}</div>
                                        <button type="submit" className="btn btn-dark">Update</button>
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                    <table className="table" id="manageProducts">
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
                                    <td><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => loadEditProduct(product.id)}>Edit</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default ManageProducts