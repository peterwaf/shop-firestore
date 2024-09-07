import React from 'react'
import {Link } from "react-router-dom"
function Footer() {
    return (
        <div className="row d-flex justify-content-center">
            <footer className="row row-cols-5 py-2 my-2">
                <div className="col">
                    <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                        <img src="/images/logo.svg" className="img-fluid" alt="" />
                    </a>
                    <p className="text-muted">© 2024</p>
                </div>

                <div className="col">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>
                <div className="col">
                    <h5>ABOUT US</h5>
                    <p>
                    Welcome to our world of beauty, where we believe that every woman deserves to feel confident and radiant in her own skin. Our passion lies in creating high-quality, effective beauty products that enhance your natural beauty and fit seamlessly into your everyday routine.</p>
                </div>
                <div className="col">
                    <h5>Sign Up / Log In</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link to = "/sign-up" className="nav-link p-0 text-muted">Sign Up</Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to = "/log-in" className="nav-link p-0 text-muted">Log In</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default Footer