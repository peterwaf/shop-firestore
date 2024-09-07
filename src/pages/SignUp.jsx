import React from 'react';
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import GoogleLogger from "../components/GoogleLogger";
function SignUp() {
    const [signUpData, setSignUPData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
    const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("");

    const handleSignUpData = (event) => {
        const { name, value } = event.target;
        setSignUPData(prevSignUpData => {
            return { ...prevSignUpData, [name]: value }
        })
    }

    const addUserData = async (user_id) => {
        try {
            const addedUserData = await addDoc(collection(db, "Users"), {
                userId: user_id,
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                email: signUpData.email,
                isAdmin:false
            })
            console.log(addedUserData);
        } catch (error) {
            console.log("UNABLE TO ADD USER TO THE DB " + error);
        }

    }
    const submitSignUpData = async (event) => {
        event.preventDefault();
        try {
            const email = signUpData.email;
            const password = signUpData.password;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setSignUpSuccessMessage("Sign up success. Log in");
            console.log(userCredential);
            setSignUpErrorMessage("");
            //add remaining user data to DB
            addUserData(userCredential.user.uid);
        } catch (error) {
            if (error.message.includes("invalid-email")) {
                setSignUpErrorMessage("Invalid Email, please enter the correct email");
            }
            else if (error.message.includes("email-already-in-use")) {
                setSignUpErrorMessage("Email Already in use")
            }
            else if (error.message.includes("auth/network-request-failed")) {
                setSignUpErrorMessage("Network Error, please check your network")
            }
            else { setSignUpErrorMessage(error.message); }
        }
    }
    return (
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col">
                <div className="text-black" style={{ borderRadius: "25px" }}>
                    <div className="p-md-5">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                <div className="text-center">
                                    <GoogleLogger />
                                    <p>OR fill in the form below.</p>
                                </div>

                                <form onSubmit={submitSignUpData} className="mx-1 mx-md-4">
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="text"
                                                value={signUpData.firstName}
                                                onChange={handleSignUpData}
                                                id="firstName"
                                                name="firstName"
                                                className="form-control"
                                                placeholder="First Name"
                                                required />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="text"
                                                value={signUpData.lastName}
                                                onChange={handleSignUpData}
                                                id="lastName"
                                                name="lastName"
                                                className="form-control"
                                                placeholder="Last Name"
                                                required />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="email"
                                                value={signUpData.email}
                                                onChange={handleSignUpData}
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                className="form-control"
                                                required />
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                            <input type="password"
                                                value={signUpData.password}
                                                name="password"
                                                onChange={handleSignUpData}
                                                id="password"
                                                placeholder="Password"
                                                className="form-control"
                                                required />
                                        </div>
                                    </div>
                                    <div className="form-check text-start"><p>
                                        By clicking Register, I agree all statements in <a href="#!">Terms of service</a>
                                    </p>

                                    </div>
                                    <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                                        <p className="text-success">{signUpSuccessMessage}</p>
                                    </div>
                                    <div className="d-flex justify-content-center mx-4 mb-lg-4">
                                        <p className="text-danger">{signUpErrorMessage}</p>
                                        <p>Already registered ? <Link to="/log-in">Log In</Link></p>
                                    </div>
                                    <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                                        <button className="btn btn-dark btn-lg">Register</button>
                                    </div>
                                </form>

                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="images/walker.jpg" className="img-fluid" alt="Sample image" />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default SignUp