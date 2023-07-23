import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../config/firebase.config";
import { useEffect } from "react";

export const authContext = createContext()

export const AuthProvider = ({children})=>{

    const [currentUser, setCurrentUser] = useState(null)
    const [loader, setLoader] = useState(false)
    const [userProfile, setUserProfile] = useState({
        displayName: '',
        email: '',
        photoURL: ''
    })

    useEffect(()=>{
        return onAuthStateChanged(auth, (user)=>{
            if(!user){
                setCurrentUser(null)
                setLoader(true)
            }else{
                setCurrentUser(user)
                setLoader(true)
            }
        })
    },[])

    useEffect(()=>{
        if(currentUser){
            setUserProfile({
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL
            })
        }
    },[currentUser])

    const value = {
        currentUser,
        loader,
        userProfile
    }

    return(
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}