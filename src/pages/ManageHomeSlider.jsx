import React from 'react'
import { useState, useEffect } from "react"
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ManageHomeSlider() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        amount: "",
        position: "Left",
        offerAmount: "",
        productLink: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = async (e) => {
        const { name, value } = e.target;
        if (name === "image" && e.target.files[0]) {
            try {
                // Upload image to firebase storage
                const uploadRef = ref(storage, `sliders/${crypto.randomUUID()}${e.target.files[0].name}`);
                const uploadSnap = await uploadBytes(uploadRef, e.target.files[0]);
                // Get image url
                const url = await getDownloadURL(uploadSnap.ref);
                setFormData(prevData => ({ ...prevData, image: url }))
            } catch (error) {
                console.log(error.message);
                alert(error.message);
            }
        }
        else { setFormData(prevData => ({ ...prevData, [name]: value })) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //validate form fields
            if (formData.title === "" || formData.image === "" || formData.description === "" || formData.amount === "" || formData.position === "" || formData.offerAmount === "") {
                setErrorMessage("All fields are required");
                setTimeout(() => {
                    setErrorMessage("");
                }, 1000);
                return;
            }
            // Add a new document with a generated id.
            await addDoc(collection(db, "homeSlider"), formData);
            setSuccessMessage("Slider added successfully");
            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);

            setFormData({
                title: "",
                image: "",
                description: "",
                amount: "",
                position: "Left",
                offerAmount: ""
            })
            //reload page
            window.location.reload();
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 1000);
        }
    }
    console.log(formData);

    return (
        <div className="row">
            <div className="col-md-10 mx-auto">
                {/* <!-- Nav tabs --> */}
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item p-3" role="presentation">
                        <button className="nav-link active" id="add-image" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Add Slider</button>
                    </li>
                    <li className="nav-item p-3" role="presentation">
                        <button className="nav-link" id="edit-image" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Edit Slider</button>
                    </li>
                </ul>

                {/* <!-- Tab panes --> */}
                <div className="tab-content">
                    <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="add-image" tabIndex="0">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-12">
                                <label htmlFor="image" className="form-label"> Select Product Image</label>
                                <input type="file" name="image" onChange={handleChange} className="form-control" id="image" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" id="title" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="form-control" id="amount" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="offerAmount" className="form-label">Offer Amount</label>
                                <input type="offerAmount" name="offerAmount" value={formData.offerAmount} onChange={handleChange} className="form-control" id="offerAmount" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="productLink" className="form-label">Product Link e.g <span className="text-primary">http://google.com//product-details?title=Gentle%20Foaming%20200&id=4BwTBP2xINJ6QroXyctN</span></label>
                                <input type="text" name="productLink" value={formData.productLink} onChange={handleChange} className="form-control" id="title" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="offerAmount" className="form-label">Slider Position</label>
                                <select name="position" value={formData.position} onChange={handleChange} className="form-select">
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            <div className="col-md-12 d-flex justify-content-center">
                                <span className="text-danger">{errorMessage}</span>
                                <span className="text-success">{successMessage}</span>

                            </div>

                            <div className="col-md-12 d-flex justify-content-center">

                                <button type="submit" className="btn btn-dark">Upload Slider</button>
                            </div>
                        </form>

                    </div>
                    <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="edit-image" tabIndex="0">
                        Edit
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageHomeSlider