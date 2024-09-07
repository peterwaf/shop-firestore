import React from 'react'
import { useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import GoogleLogger from "../components/GoogleLogger";

function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loginErrorMessage, setLoginUserErrorMessage] = useState();
    const navigate = useNavigate();
    const handleLoginDataChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevLoginData => { return { ...prevLoginData, [name]: value } })
    }
    const handleLoginSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const loginEmail = loginData.email;
            const loginPassword = loginData.password;
            const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            const user = userCredentials.user;
            if(user){
                console.log(user)
                navigate("/");
            }
        } catch (error) {
            if (error.message.includes("invalid-credential")) {
                setLoginUserErrorMessage("Invalid email format, fix and try again");
            }
            else if (error.message.includes("auth/network-request-failed")) {
                setLoginUserErrorMessage("Network Error, please check your network")
            }
            else { setLoginUserErrorMessage(error.message); }
        }


    }

    return (
        <div className="row">

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="images/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <p className="h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In </p>
                        <p>Do you have a gmail account ?</p>
                        <GoogleLogger />
                        <p>OR enter your details below</p>
                        <form onSubmit={handleLoginSubmit}>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    id="loginMail"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={loginData.email}
                                    onChange={handleLoginDataChange} />


                            </div>
                            <div data-mdb-input-init className="form-outline mb-3">
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    id="loginPassword"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={loginData.password}
                                    onChange={handleLoginDataChange} />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-danger">{loginErrorMessage}</p>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button className="btn btn-dark btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                    className="link-danger">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login