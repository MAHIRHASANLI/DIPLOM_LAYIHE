import { useState, createContext, useContext, useEffect } from "react";
import { GetAllSlider } from "../api/slider.requests";
import { GetAllChoose } from "../api/choose.requests";
import { GetAllTeam } from "../api/ourteam.requests";
import { GetAllBlog } from "../api/blog.requests";
import { GetAllPassion } from "../api/position.requests";
import { getUsers } from "../api/login.requests";

/////SLIDER///
const GlobalData = createContext()
export const GlobalDataProvider = ({ children }) => {
    const [globalSlider, setGlobalSlider] = useState([])
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetAllSlider().then((res) => {
            setGlobalSlider(res);
            setLoading(false);
        })
    }, [])
    return (
        <GlobalData.Provider value={[globalSlider, setGlobalSlider, load, setLoad,loading]}>
            {children}
        </GlobalData.Provider>
    )
}
export const useGlobalData = () => useContext(GlobalData)

///Passion///
const GlobalPassion = createContext()
export const GlobalPassionProvider = ({ children }) => {
    const [globalPassion, setGlobalPassion] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        GetAllPassion().then((res) => {
            setGlobalPassion(res)
        })
    }, [load])
    return (
        <GlobalPassion.Provider value={[globalPassion, setGlobalPassion, load, setLoad]}>
            {children}
        </GlobalPassion.Provider>
    )
}
export const useGlobalPassion = () => useContext(GlobalPassion)


///CHOOSE///
const GlobalChoose = createContext()
export const GlobalChooseProvider = ({ children }) => {
    const [globalChoose, setGlobalChoose] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        GetAllChoose().then((res) => {
            setGlobalChoose(res)
        })
    }, [load])
    return (
        <GlobalChoose.Provider value={[globalChoose, setGlobalChoose, load, setLoad]}>
            {children}
        </GlobalChoose.Provider>
    )
}
export const useGlobalChoose = () => useContext(GlobalChoose)

////OURTEAM///
const GlobalTeam = createContext()
export const GlobalTeamProvider = ({ children }) => {
    const [globalTeam, setGlobalTeam] = useState([])
    const [load, setLoad] = useState(false);
    useEffect(() => {
        GetAllTeam().then((res) => {
            setGlobalTeam(res)

        })
    }, [load])
    return (
        <GlobalTeam.Provider value={[globalTeam, setGlobalTeam, load, setLoad]}>
            {children}
        </GlobalTeam.Provider>
    )
}
export const useGlobalTeam = () => useContext(GlobalTeam);

////BLOGGLOBAL//
const GlobalBlog = createContext()
export const GlobalBlogProvider = ({ children }) => {
    const [globalBlog, setGlobalBlog] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        GetAllBlog().then((res) => {
            setGlobalBlog(res)
        })
    }, [load])
    return (
        <GlobalBlog.Provider value={[globalBlog, setGlobalBlog, load, setLoad]}>
            {children}
        </GlobalBlog.Provider>
    )
}
export const useGlobalBlog = () => useContext(GlobalBlog);


///users
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [usersAll, setUsersAll] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    useEffect(() => {
        getUsers(localStorage.getItem('token')).then((res) => {
            setUsersAll(res.data);
        });
    }, []);
    return (
        <UserContext.Provider value={[user, setUser, usersAll, setUsersAll]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);