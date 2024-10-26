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
import { collection, getDocs } from "firebase/firestore";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import CheckOut from "./pages/CheckOut";

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

  /**removeFromFavs **/
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

  const getBestSellers = async (bestSellCategory) => {
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

  /** Track logged in user **/

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        setLoggedInUserID(userId);
        setIsLoggedIn(user);
        setCurrentUser(user);
      }
      else {
        setIsLoggedIn(false);
      }
    })
  }, [])



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
    /*check if product is already in cart */
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

  const resetLoggedIn = () => {
    setIsLoggedIn(false);
  }
 
  return (
    <div className="container-fluid">
      <BrowserRouter>
        {isLoggedin && < UserNav
          currentUser={currentUser}
          loggedInUserID={loggedInUserID}
          userDatainDB={userDatainDB}
          resetLoggedIn={resetLoggedIn} />}
        <Nav
          favs={favs}
          isLoggedIn={isLoggedin}
          addToFavs={addToFavs}
          alreadyInFavs={alreadyInFavs}
          removeFromFavs={removeFromFavs}
          deleteFromCart={deleteFromCart}
          getProducts={getProducts}
          cartItems={cartItems}
          updateQty={updateQty}
          resetLoggedIn={resetLoggedIn} />
        <Routes>
          <Route path="/"
            element={<Home getBestSellersAll={getBestSellersAll}
              favs={favs}
              cartItems={cartItems}
              addToFavs={addToFavs}
              alreadyInFavs={alreadyInFavs}
              removeFromFavs={removeFromFavs}
              alreadyInCart={alreadyInCart}
              addToCart={addToCart}
              bestSellers={bestSellers}
              getBestSellers={getBestSellers}
              getProductsbyCategory={getProductsbyCategory}
              productCategories={productCategories}
              isLoggedIn={isLoggedin} />} />
          <Route path="/wishlist" element={<Wishlist
            favs={favs}
            removeFromFavs={removeFromFavs}
            alreadyInFavs={alreadyInFavs}
          />} />
          <Route path="/:category"
            element={<Home getBestSellersAll={getBestSellersAll}
              favs={favs}
              isLoggedIn={isLoggedin}
              addToFavs={addToFavs}
              alreadyInFavs={alreadyInFavs}
              removeFromFavs={removeFromFavs}
              alreadyInCart={alreadyInCart}
              addToCart={addToCart}
              bestSellers={bestSellers}
              getBestSellers={getBestSellers}
              getProductsbyCategory={getProductsbyCategory}
              productCategories={productCategories} />} />
          {/* <Route path="*" element={<NoPage />} /> */}
          <Route path="/sign-up"
            element={<SignUp />} />
          <Route path="/log-in"
            element={<Login />} />
          <Route path="/add-product"
            element={<AddProduct />} />
          <Route path="/products"
            element={<Products
              favs={favs}
              addToFavs={addToFavs}
              alreadyInFavs={alreadyInFavs}
              removeFromFavs={removeFromFavs}
              alreadyInCart={alreadyInCart}
              getProductsbyCategory={getProductsbyCategory}
              addToCart={addToCart}
              categories={productCategories}
              allProducts={allProducts} />} />
          <Route path="/products/:category"
            element={<Products
              favs={favs}
              addToFavs={addToFavs}
              alreadyInFavs={alreadyInFavs}
              removeFromFavs={removeFromFavs}
              alreadyInCart={alreadyInCart}
              getProductsbyCategory={getProductsbyCategory}
              addToCart={addToCart}
              categories={productCategories}
              allProducts={allProducts} />} />
          <Route path="/checkout"
            element={<CheckOut
              loggedInUserID={loggedInUserID}
              cartItems={cartItems}
              favs={favs}
              />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App
