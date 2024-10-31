import { useState, useEffect } from 'react'
import './App.css'
import Footer from "./components/Footer"
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import UserNav from "./components/UserNav";
import AddProduct from "./pages/AddProduct";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/config";
import { collection, getDocs, getDoc, doc, deleteDoc } from "firebase/firestore";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import CheckOut from "./pages/CheckOut";
import { ShopContext } from "./contexts/shopContex";
import ManageProducts from "./pages/ManageProducts";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import ManageHomeSlider from "./pages/ManageHomeSlider";

function App() {
  const [userDatainDB, setUserDataInDB] = useState([]);
  const [loggedInUserID, setLoggedInUserID] = useState("");
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [productCategories, setProductCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
  const [favs, setFavs] = useState(localStorage.getItem("favs") ? JSON.parse(localStorage.getItem("favs")) : []);
  const [allSlides, setAllSlides] = useState([]);
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);


  /** Get Products **/
  const getProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);
      const allProducts = productsSnap.docs.map(doc => { return { ...doc.data(), id: doc.id } });
      setAllProducts(allProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  /** Get category **/

  const getProductsbyCategory = async (dbCategory) => {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);
      const filteredProducts = productsSnap.docs
        .filter(doc => doc.data().productCategory === dbCategory)
        .map(doc => { return { ...doc.data(), id: doc.id } });
      setAllProducts(filteredProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  /** Add product to cart **/

  const addToCart = (product) => {
    const currentProduct = product;
    currentProduct.qty = 1; //set default qty to 1
    setCartItems(prevItems => [...prevItems, currentProduct]);
  }

  /**add to favs **/

  const addToFavs = (product) => {
    const currentProduct = product;
    setFavs(prevItems => [...prevItems, currentProduct]);
  }

  /**remove From Favs **/
  const removeFromFavs = (product) => {
    setFavs(prevItems => prevItems.filter(item => item.id !== product.id));
  }

  /** update qty **/

  const updateQty = (product, qty) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id) {
        item.qty = qty
      }
      return item
    })
    setCartItems(updatedCartItems)
  }
  /** Get Categories **/
  const getCategories = async () => {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);
      const dupprodCategories = productsSnap.docs.map(doc => doc.data().productCategory);
      const prodCategories = [...new Set(dupprodCategories)];
      setProductCategories(prodCategories);
    } catch (error) {
      console.log(error.message);
    }
  }


  /** Load all Bestseller products set to true **/

  const getBestSellersAll = async () => {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);
      const bestSellers = productsSnap.docs
        .filter(doc => doc.data().bestSeller === true)
        .map(doc => { return { ...doc.data(), id: doc.id } });
      setBestSellers(bestSellers);
    } catch (error) {
      console.log(error.message);
    }
  }

  /** Get Best sellers**/

  const getBestSellersByCategory = async (bestSellCategory) => {
    try {
      const productsRef = collection(db, "products");
      const productsSnap = await getDocs(productsRef);
      const bestSellers = productsSnap.docs
        .filter(doc => doc.data().bestSeller === true && doc.data().productCategory === bestSellCategory)
        .map(doc => { return { ...doc.data(), id: doc.id } });
      setBestSellers(bestSellers);
    } catch (error) {
      console.log(error.message);
    }
  }

  /** Get all products categories **/

  useEffect(() => {
    getCategories();
  }, [])

  //  get user data from DB

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const usrQrySnaps = await getDocs(collection(db, "/Users"));
        const usrQrySnapsArrays = usrQrySnaps.docs;
        const usersData = usrQrySnapsArrays.map(usrQrySnapsArray => ({
          firstName: usrQrySnapsArray.data().firstName,
          lastName: usrQrySnapsArray.data().lastName,
          userId: usrQrySnapsArray.data().userId,
          email: usrQrySnapsArray.data().email,
          isAdmin: usrQrySnapsArray.data().isAdmin
        }))
        setUserDataInDB(usersData);
      } catch (error) {
        console.log("ERROR IN GETTING USER DATA" + error);
        setIsLoggedIn(false);

      }
    };
    getUserInfo();
  }, [])

  /*check if product is already in cart */

  const alreadyInCart = (product) => {
    const productInCart = cartItems.find(item => item.id === product.id);
    if (productInCart) {
      return true
    }
    else {
      return false
    }
  }

  /*check if product is already in favs */

  const alreadyInFavs = (product) => {
    /*check if product is already in favs */
    const productInFavs = favs.find(item => item.id === product.id);
    if (productInFavs) {
      return true
    }
    else {
      return false
    }
  }

  /* listen to changes in cart and save cartItems to local storage */

  useEffect(() => {
    //check if user is not logged in,save cartItems to local storage
    if (!isLoggedin) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }

  }, [cartItems])


  /* listen to changes in favs and save favs to local storage */

  useEffect(() => {
    //check if user is not logged in,save favs to local storage
    if (!isLoggedin) {
      localStorage.setItem("favs", JSON.stringify(favs))
    }
  }, [favs])


  /*delete from cart */

  const deleteFromCart = (product) => {
    const updatedCartItems = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedCartItems);
  }


  /*delete product from DB */

  const deleteProduct = (product) => {
    const productRef = doc(db, "products", product.id);
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (confirm) {
      deleteDoc(productRef);
      const updatedProducts = allProducts.filter(item => item.id !== product.id);
      setAllProducts(updatedProducts);
    }
    else {
      return
    }

  }

  /** Track logged in user **/

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        setLoggedInUserID(userId);
        setIsLoggedIn(Boolean(user));
        setCurrentUser(user);
      }
      else {
        setIsLoggedIn(false);
      }
    })
  }, [])

  const resetLoggedIn = () => {
    setIsLoggedIn(false);
  }
  const resetCart = () => {
    localStorage.clear();
    setCartItems([]);

  }
  const resetWishlist = () => {
    localStorage.clear();
    setFavs([]);
  }

  /**load all slides */

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

  const deleteSlide = async (slide) => {
    const slideRef = doc(db, "homeSlider", slide.id);
    const confirm = window.confirm("Are you sure you want to delete this slide?");
    if (confirm) {
      try {
        await deleteDoc(slideRef);
        const updatedSlides = allSlides.filter(item => item.id !== slide.id);
        setAllSlides(updatedSlides);
      } catch (error) {
        console.log(error.message);

      }
    }
    else {
      return
    }
  }

  return (
    <div className="container-fluid">
      <BrowserRouter>
        <ShopContext.Provider value={{
          isLoggedin,
          loggedInUserID,
          currentUser,
          userDatainDB,
          productCategories,
          bestSellers,
          allProducts,
          cartItems,
          favs,
          getProducts,
          getProductsbyCategory,
          getBestSellersByCategory,
          getBestSellersAll,
          alreadyInCart,
          addToCart,
          alreadyInFavs,
          removeFromFavs,
          deleteFromCart,
          updateQty,
          addToFavs,
          resetLoggedIn,
          getCategories,
          resetCart,
          resetWishlist,
          deleteProduct,
          allSlides,
          leftSlides,
          rightSlides,
          deleteSlide,
          loadSlider
        }}>
          <Nav />
          {isLoggedin && <UserNav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/:category" element={<Home />} />
            {/* <Route path="*" element={<NoPage />} /> */}
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage-home-slider" element={<ManageHomeSlider />} />
          </Routes>
          <Footer />
        </ShopContext.Provider>
      </BrowserRouter>

    </div>
  )
}

export default App
