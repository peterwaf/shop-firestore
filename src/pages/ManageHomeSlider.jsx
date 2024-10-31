import React from 'react'
import { useState, useEffect } from "react"
import { collection, addDoc, doc, setDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";

function ManageHomeSlider() {
    const manageHomeSliderContext = useContext(ShopContext);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        amount: "",
        position: "Left",
        offerAmount: "",
        productLink: ""
    });
    const [sliderToEdit, setSliderToEdit] = useState({
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
    const [editErrorMessage, setEditErrorMessage] = useState("");
    const [editSuccessMessage, setEditSuccessMessage] = useState("");


    const handleSlideChange = async (e) => {
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


    const handleEditChange = async (e) => {
        const { name, value } = e.target;
        if (name === "image" && e.target.files[0]) {
            try {
                // Upload image to firebase storage
                const uploadRef = ref(storage, `sliders/${crypto.randomUUID()}${e.target.files[0].name}`);
                const uploadSnap = await uploadBytes(uploadRef, e.target.files[0]);
                // Get image url
                const url = await getDownloadURL(uploadSnap.ref);
                setSliderToEdit(prevData => ({ ...prevData, image: url }))
            } catch (error) {
                console.log(error.message);
                alert(error.message);
                setTimeout(() => {
                    setEditErrorMessage("");
                }, 1000);
                return;
            }
        }
        //if image is not uploaded
        else if (name === "image" && !e.target.files[0]) {
            //set image to previous image
            setSliderToEdit(prevData => ({ ...prevData, image: sliderToEdit.image }));
        }
        else { setSliderToEdit(prevData => ({ ...prevData, [name]: value })) }
    }

    const editSlideSubmit = async (e) => {
        e.preventDefault();
        //validate form fields except image
        if (sliderToEdit.title === "" || sliderToEdit.description === "" || sliderToEdit.amount === "" || sliderToEdit.position === "" || sliderToEdit.offerAmount === "") {
            setEditErrorMessage("All fields are required");
            setTimeout(() => {
                setEditErrorMessage("");
            }, 2000);
            return;
        }

        //update slider in the database

        try {
            const docRef = doc(db, "homeSlider", sliderToEdit.id);
            await setDoc(docRef, sliderToEdit);
            manageHomeSliderContext.loadSlider();
            setEditSuccessMessage("Slider updated successfully");
            setTimeout(() => {
                setEditSuccessMessage("");
            }, 2000);
        } catch (error) {
            console.log(error.message);
            setEditErrorMessage(error.message);
            setTimeout(() => {
                setEditErrorMessage("");
            }, 1000);
        }
    }

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
                                <input type="file" name="image" onChange={handleSlideChange} className="form-control" id="image" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleSlideChange} className="form-control" id="title" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleSlideChange} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input type="number" name="amount" value={formData.amount} onChange={handleSlideChange} className="form-control" id="amount" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="offerAmount" className="form-label">Offer Amount</label>
                                <input type="offerAmount" name="offerAmount" value={formData.offerAmount} onChange={handleSlideChange} className="form-control" id="offerAmount" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="productLink" className="form-label">Product Link e.g <span className="text-primary">http://google.com//product-details?title=Gentle%20Foaming%20200&id=4BwTBP2xINJ6QroXyctN</span></label>
                                <input type="text" name="productLink" value={formData.productLink} onChange={handleSlideChange} className="form-control" id="title" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="offerAmount" className="form-label">Slider Position</label>
                                <select name="position" value={formData.position} onChange={handleSlideChange} className="form-select">
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            <div className="col-md-12 d-flex justify-content-center">
                                <span className="text-danger">{editErrorMessage}</span>
                                <span className="text-success">{editSuccessMessage}</span>
                            </div>

                            <div className="col-md-12 d-flex justify-content-center">

                                <button type="submit" className="btn btn-dark">Upload Slider</button>
                            </div>
                        </form>

                    </div>
                    <div className="tab-pane" id="profile" role="tabpanel" aria-labelledby="edit-image" tabIndex="0">
                        {/* edit home slider item */}
                        <div className="modal fade" id="editSliderModal" tabIndex="-1" aria-labelledby="editSlider" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="editSlider">Edit Slider</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">

                                        {/* create a form containing inputs using sliderToEdit state properties */}

                                        <form onSubmit={editSlideSubmit} className="row g-3" >
                                            <div className="col-md-12">
                                                <div >
                                                    <img src={sliderToEdit.image} alt="" width={"100px"} height={"100px"} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="image" className="form-label"> Select Product Image</label>
                                                <input type="file" name="image" onChange={handleEditChange} className="form-control" id="image" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="title" className="form-label">Title</label>
                                                <input type="text" name="title" value={sliderToEdit.title} onChange={handleEditChange} className="form-control" id="title" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea name="description" value={sliderToEdit.description} onChange={handleEditChange} className="form-control" id="description" rows="3"></textarea>
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="amount" className="form-label">Amount</label>
                                                <input type="number" name="amount" value={sliderToEdit.amount} onChange={handleEditChange} className="form-control" id="amount" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="offerAmount" className="form-label">Offer Amount</label>
                                                <input type="offerAmount" name="offerAmount" value={sliderToEdit.offerAmount} onChange={handleEditChange} className="form-control" id="offerAmount" />
                                            </div>
                                            <div className="col-md-12">
                                                <label htmlFor="position" className="form-label">Slider Position</label>
                                                <select name="position" value={sliderToEdit.position} onChange={handleEditChange} className="form-select">
                                                    <option value="left">Left</option>
                                                    <option value="right">Right</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center">
                                                <span className="text-danger">{editErrorMessage}</span>
                                                <span className="text-success">{editSuccessMessage}</span>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-dark">Save</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Offer Amount</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manageHomeSliderContext.allSlides.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td><img src={item.image} style={{ width: "100px", height: "100px" }} alt={item.title} /></td>
                                            <td>Ksh.{item.amount}</td>
                                            <td>Ksh.{item.offerAmount}</td>
                                            <td>{item.position}</td>
                                            <td><button type="button" onClick={() => { setSliderToEdit(item) }} class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#editSliderModal">
                                                Edit
                                            </button></td>
                                            <td><button onClick={() => manageHomeSliderContext.deleteSlide(item)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageHomeSlider