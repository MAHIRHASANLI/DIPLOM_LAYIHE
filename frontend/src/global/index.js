import { useState,createContext,useContext, useEffect } from "react";
import { GetAllSlider } from "../api/slider.requests";
import { GetAllHome } from "../api/home.requests";
import { GetAllChoose } from "../api/choose.requests";

/////SLIDER///
const GlobalData = createContext()
export const GlobalDataProvider = ({ children }) => {
    const [globalSlider, setGlobalSlider] = useState([])
    useEffect(()=>{
        GetAllSlider().then((res)=>{
            setGlobalSlider(res)
        })
    },[globalSlider])
    return (
        <GlobalData.Provider value={[globalSlider, setGlobalSlider]}>
            {children}
        </GlobalData.Provider>
    )
}
export const useGlobalData = () => useContext(GlobalData)

////HOME IMAGE///
const GlobalDatahomeimg = createContext()
export const GlobalDatahomeimgProvider = ({ children }) => {
    const [globalImage, setGlobalImage] = useState([])
    useEffect(()=>{
        GetAllHome().then((res)=>{
            setGlobalImage(res)
        })
    },[])
    return (
        <GlobalDatahomeimg.Provider value={[globalImage, setGlobalImage]}>
            {children}
        </GlobalDatahomeimg.Provider>
    )
}
export const useGlobalDatahomeimg = () => useContext(GlobalDatahomeimg)

///CHOOSE///
const GlobalChoose = createContext()
export const GlobalChooseProvider = ({ children }) => {
    const [globalChoose, setGlobalChoose] = useState([])
    useEffect(()=>{
        GetAllChoose().then((res)=>{
            setGlobalChoose(res)
        })
    },[])
    return (
        <GlobalChoose.Provider value={[globalChoose, setGlobalChoose]}>
            {children}
        </GlobalChoose.Provider>
    )
}
export const useGlobalChoose = () => useContext(GlobalChoose)
