import React from 'react'

function SliderHome() {
    return (
        <div className="row">
            <div className="col-md-6">
                <div id="carouselSliderHomeLeft" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/images/pexels-pixabay-415829.jpg" className="d-block w-100 home_img" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="/images/pexels-yuri-manei-2690323.jpg" className="d-block w-100 home_img" alt="..." />
                        </div>
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
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col m-0 p-0">
                                    <img src="/images/Blush_Cover-475x578.jpg" className="d-block w-100 home_img" alt="..." />
                                </div>
                                <div className="col m-0 p-0">
                                    <img src="/images/cover-2-475x578.jpg" className="d-block w-100 home_img" alt="..." />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col m-0 p-0">
                                    <img src="/images/Cover-5-475x578.jpg" className="d-block w-100 home_img" alt="..." />
                                </div>
                                <div className="col m-0 p-0">
                                    <img src="/images/Cover-7-475x578.jpg" className="d-block w-100 home_img" alt="..." />
                                </div>
                            </div>
                        </div>
                      
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