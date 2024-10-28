import React from 'react'
import { useState } from "react"
import { storage } from "../firebase/config";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
/* name: "Product 1",
            description: "Description of Product 1",
            price: 29.99,
            category: "Electronics",
            stock: 100,
            imageUrl: "https://example.com/product1.jpg",
            createdAt: "2023-07-15T12:00:00Z",
            updatedAt: "2023-07-15T12:00:00Z"*/
function AddProduct() {
    const [prodData, setProdData] = useState({
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
    });
    const [uploadMessage, setUploadMessage] = useState("");
    const [showHideuploadMessage, setShowHideuploadMessage] = useState(true);
    const addProductsContext = useContext(ShopContext);
    const handleProdChange = (e) => {
        const { name, value, files } = e.target;

        if (name == "productImage" && files[0]) {
            const uploadRef = ref(storage, `images/${crypto.randomUUID()}${e.target.files[0].name}`);
            uploadBytes(uploadRef, e.target.files[0]).then(
                uploadResult => {
                    getDownloadURL(uploadResult.ref).then((resUrl) => {
                        setProdData(prevData => {
                            return { ...prevData, productImage: resUrl }
                        })
                    }).catch(error => console.log(error.message))
                }
            ).catch(error => console.log(error.message))
        }
        else if(name == "bestSeller" && value == "Yes"){
            setProdData(prevData => {
                return { ...prevData, bestSeller: true }
            })
        }
        else if(name == "bestSeller" && value == "No"){
            setProdData(prevData => {
                return { ...prevData, bestSeller: false }
            })
        }
        else if(name == "favourite" && value == "No"){
            setProdData(prevData => {
                return { ...prevData, favourite: false }
            })
        }
        else if(name == "favourite" && value == "Yes"){
            setProdData(prevData => {
                return { ...prevData, favourite: true }
            })
        }
        else {
            setProdData(prevData => {
                return { ...prevData, [name]: value }
            })
        }

    }

    const handleProdSubmit = async (e) => {
        e.preventDefault();
        setUploadMessage("");
        setShowHideuploadMessage(true);
        if (prodData.productImage == "" || prodData.productName == "" || prodData.productDesc == "" || prodData.productPrice == "" || prodData.productCategory == "") {
            setUploadMessage("All fields are required, please fill out all fields and try again");
            setTimeout(() => {
                setShowHideuploadMessage(false);
            }, 2000);
            return
        }
        else {
            try {
                const prodRef = collection(db, "products/");
                await addDoc(prodRef, prodData);
                setProdData({
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
                addProductsContext.getProducts();
                setUploadMessage("Product Added Successfully");

                setTimeout(() => {
                    setShowHideuploadMessage(false);
                }, 2000);

            } catch (error) {
                console.log(error.message);
                setUploadMessage("Something went wrong,please check your network");
            }
        }
    }
    console.log(prodData);

    return (
        <div className="row">
            <form onSubmit={handleProdSubmit} className="m-3 p-3 bg-light">
                <h2 className="text-center">Add Product</h2>
                <div className="col-md-7 mx-auto">
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productName"
                            className="form-control"
                            placeholder="Enter Product Name"
                            id="productName"
                            onChange={handleProdChange}
                            value={prodData.productName}
                            required />

                    </div>
                    <div className="mb-3">
                        <textarea
                            name="productDesc"
                            onChange={handleProdChange}
                            className="form-control"
                            placeholder="Enter product description"
                            id="productDesc" rows="5"
                            value={prodData.productDesc}
                            required>

                        </textarea>
                    </div>
                    <div className="mb-3">
                        <input type="number"
                            onChange={handleProdChange}
                            name="productPrice"
                            id="productPrice"
                            placeholder="Price"
                            className="form-control"
                            value={prodData.productPrice}
                            required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control"
                            onChange={handleProdChange}
                            list="datalistOptions"
                            id="productCategory"
                            name="productCategory"
                            placeholder="Type /select product category.."
                            value={prodData.productCategory}
                            required />
                        <datalist id="datalistOptions">
                            <option value="Hair" />
                            <option value="Eye Care" />
                            <option value="SkinCare" />
                            <option value="NailCare" />
                            <option value="Accessories" />
                        </datalist>
                    </div>
                    <div className="mb-3">
                        <input type="number"
                            onChange={handleProdChange}
                            name="stock"
                            id="stock"
                            placeholder="How many are in stock? e.g 10"
                            className="form-control"
                            value={prodData.stock}
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label"> Add Product Image</label>
                        <input
                            onChange={handleProdChange}
                            name="productImage"
                            className="form-control"
                            id="productImage"
                            type="file"
                            required />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="bestSeller" className="form-label">Best Seller</label>
                        <select name="bestSeller" id="bestSeller" className="form-select" onChange={handleProdChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="favourite" className="form-label">Favourite</label>
                        <select name="favourite" id="favourite" className="form-select" onChange={handleProdChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <p className="text-success">{showHideuploadMessage ? uploadMessage : ""}</p>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-dark">Add Product</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default AddProduct