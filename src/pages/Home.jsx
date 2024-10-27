import React from 'react';
import SliderHome from "../components/SliderHome";
import BrandLogos from "../components/BrandLogos";
import BestSellerText from "../components/BestSellerText";
import BestSellerProducts from "../components/BestSellerProducts";
import { useContext } from "react";
import { ShopContext } from "../contexts/shopContex";
function Home() {
    const homeContext = useContext(ShopContext);
    return (
        <>
            <SliderHome />
            <BrandLogos />
            <BestSellerText />
            <BestSellerProducts
                favs={homeContext.favs}
                addToFavs={homeContext.addToFavs}
                alreadyInFavs={homeContext.alreadyInFavs}
                removeFromFavs={homeContext.removeFromFavs}
                alreadyInCart={homeContext.alreadyInCart}
                addToCart={homeContext.addToCart}
                getBestSellersAll={homeContext.getBestSellersAll}
                bestSellers={homeContext.bestSellers}
                getBestSellers={homeContext.getBestSellers}
                categories={homeContext.productCategories} />

        </>
    )
}

export default Home