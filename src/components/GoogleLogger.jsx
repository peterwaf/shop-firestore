import React from 'react'
import { useNavigate } from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { FcGoogle } from "react-icons/fc"
import { provider } from "../firebase/config"
import { auth } from "../firebase/config"
function GoogleLogger() {
    const goToIndexPage = useNavigate();
    const logWithGoogle = async () => {
        try {
            const userC = await signInWithPopup(auth, provider);
            console.log(userC);
            goToIndexPage('/');
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <p>
                <button onClick={logWithGoogle} className="btn btn-light border ">Sign In with Google <FcGoogle />
                </button>
            </p>
        </div>
    )
}

export default GoogleLogger