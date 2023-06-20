import { useState,createContext,useContext, useEffect } from "react";
import { GetAllSlider } from "../api/slider.requests";
import { GetAllChoose } from "../api/choose.requests";
import { GetAllTeam } from "../api/ourteam.requests";
import { GetAllBlog } from "../api/blog.requests";
import { GetAllPassion } from "../api/position.requests";

/////SLIDER///
const GlobalData = createContext()
export const GlobalDataProvider = ({ children }) => {
    const [globalSlider, setGlobalSlider] = useState([])
    useEffect(()=>{
        GetAllSlider().then((res)=>{
            setGlobalSlider(res)
        })
    },[])
    return (
        <GlobalData.Provider value={[globalSlider, setGlobalSlider]}>
            {children}
        </GlobalData.Provider>
    )
}
export const useGlobalData = () => useContext(GlobalData)

///Passion///
const GlobalPassion = createContext()
export const GlobalPassionProvider = ({ children }) => {
    const [globalPassion, setGlobalPassion] = useState([])
    useEffect(()=>{
        GetAllPassion().then((res)=>{
            setGlobalPassion(res)
        })
    },[])
    return (
        <GlobalPassion.Provider value={[globalPassion, setGlobalPassion]}>
            {children}
        </GlobalPassion.Provider>
    )
}
export const useGlobalPassion = () => useContext(GlobalPassion)


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

////OURTEAM///
const GlobalTeam = createContext()
export const GlobalTeamProvider = ({ children }) => {
    const [globalTeam, setGlobalTeam] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        GetAllTeam().then((res)=>{
            setGlobalTeam(res)
            setLoading(false)
        })
    },[])
    return (
        <GlobalTeam.Provider value={[globalTeam, setGlobalTeam,loading, setLoading]}>
            {children}
        </GlobalTeam.Provider>
    )
}
export const useGlobalTeam = () => useContext(GlobalTeam);

////BLOGGLOBAL//
const GlobalBlog = createContext()
export const GlobalBlogProvider = ({ children }) => {
    const [globalBlog, setGlobalBlog] = useState([])
    useEffect(()=>{
        GetAllBlog().then((res)=>{
            setGlobalBlog(res)
        })
    },[])
    return (
        <GlobalBlog.Provider value={[globalBlog, setGlobalBlog]}>
            {children}
        </GlobalBlog.Provider>
    )
}
export const useGlobalBlog = () => useContext(GlobalBlog);
