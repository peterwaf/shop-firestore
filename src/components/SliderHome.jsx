import React from 'react';
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function SliderHome() {
    const [allSlides, setAllSlides] = useState([]);
    const [leftSlides, setLeftSlides] = useState([]);
    const [rightSlides, setRightSlides] = useState([]);
    const loadSlider = async () => {
        try {
            const sliderCollection = collection(db, "homeSlider");
            const sliderSnapshot = await getDocs(sliderCollection);
            const slides = sliderSnapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } });
            setAllSlides(slides);

        } catch (error) {
            error.message
        }
    }

    useEffect(() => {
        loadSlider();
    }, [])

    useEffect(() => {
        if (allSlides.length > 0) {
           const left = allSlides.filter((slide) => slide.position.toLowerCase() == "left");
           const right = allSlides.filter((slide) => slide.position.toLowerCase() == "right");
           setLeftSlides(left);
           setRightSlides(right);
        }
    }, [allSlides]);

    return (
        <div className="row">
            <div className="col-md-6">
                <div id="carouselSliderHomeLeft" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {leftSlides.map((slide,index) => {
                            return (
                                <div key={index} className={`carousel-item ${index == 0 ? "active" : ""}`}>
                                    <img src={slide.image} className="d-block w-100 home_img" alt="..." style={{ height: "200px" }} />
                                    <div className="carousel-caption d-none d-md-block bg-dark p-2 rounded opacity-75">
                                        <h5>{slide.title}</h5>
                                        <p>{slide.description.slice(0, 100)+"..."}</p>
                                        <h4 className="text-decoration-line-through">Ksh. {slide.amount}</h4>
                                        <h4> Ksh.{slide.offerAmount}</h4>
                                        
                                        <p><a href={slide.productLink} className="btn btn-danger">Buy</a></p>
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselSliderHomeLeft"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselSliderHomeLeft"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    {/** we can add another **/}
                </div>

            </div>

            <div className="col-md-6">
                <div id="carouselSliderHomeRight" className="carousel slide">
                    <div className="carousel-inner">

                        {rightSlides.map((slide,index) => {
                            return (
                                <div key={index} className={`carousel-item ${index == 0 ? "active" : ""}`}>
                                    <img src={slide.image} className="d-block w-100 home_img" alt="..." style={{ height: "200px" }} />
                                    <div className="carousel-caption d-none d-md-block bg-dark p-2 rounded opacity-75">
                                        <h5>{slide.title}</h5>
                                        <p>{slide.description.slice(0, 100)+"..."}</p>
                                        <h4 className="text-decoration-line-through">Ksh. {slide.amount}</h4>
                                        <h4> Ksh.{slide.offerAmount}</h4>
                                        
                                        <p><a href={slide.productLink} className="btn btn-danger">Buy</a></p>
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselSliderHomeRight"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselSliderHomeRight"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SliderHome