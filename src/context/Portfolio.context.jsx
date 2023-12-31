import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebase.config";
import { v4 as uidGen } from "uuid"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "./Auth.context";



export const PortfolioContext = createContext()

export const PortfolioContextProvider = ({children})=>{
    const {currentUser} = useContext(authContext)
    const [detectClick, setDetectClick] = useState(false)
    
    const [allPortfolio, setAllPortfolio] = useState(null)
    

    const uploadPort =  (info, img)=>{
        let imageUrl = ''
        const bucketRef = ref(storage, `portfolioImage/${uidGen() + img.name}`)

        
        
            uploadBytes(bucketRef, img)
            .then((snapshop)=>{
                getDownloadURL(snapshop.ref)
                .then((url)=>{
                    

                        addDoc(collection(db, "PortfolioInfo"),{
                            details: info, 
                            image: url
                         }).then(()=>{
                            toast.success('Portfolio Added Successfully')
                         }).catch(err=>{    
                            console.log(err.code);
                            console.log(err.message);
                         })
                    
                })
            }).catch(err=>{
                console.log(err.code);
                console.log(err.message);
            })
             
    }

   useEffect(()=>{
    const unSubscribe =  onSnapshot(collection(db, 'PortfolioInfo'), snapshots =>{
        const portfolios = snapshots.docs.map(elm => {
            // console.log(elm.id);
            return{
                ...elm.data(),
                id: elm.id
            }
        })
        setAllPortfolio(portfolios)
        // console.log(portfolios);
    })
    return ()=>{
        unSubscribe()
    }
   },[currentUser, detectClick])

    const value = {
        uploadPort,
        allPortfolio,
        setDetectClick
    }

    return(
        <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
    )
}