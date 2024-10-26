import React from 'react';
import SliderHome from "../components/SliderHome";
import BrandLogos from "../components/BrandLogos";
import BestSellerText from "../components/BestSellerText";
import BestSellerProducts from "../components/BestSellerProducts";
import { useState, useEffect } from "react";
function Home(props) {
    return (
        <>
            <SliderHome />
            <BrandLogos />
            <BestSellerText />
            <BestSellerProducts
                favs={props.favs}
                addToFavs={props.addToFavs}
                alreadyInFavs={props.alreadyInFavs}
                removeFromFavs={props.removeFromFavs}
                alreadyInCart={props.alreadyInCart}
                addToCart={props.addToCart}
                getBestSellersAll={props.getBestSellersAll}
                bestSellers={props.bestSellers}
                getBestSellers={props.getBestSellers}
                categories={props.productCategories} />

        </>
    )
}

export default Home