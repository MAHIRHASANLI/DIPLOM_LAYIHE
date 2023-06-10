import { useState,createContext,useContext } from "react";


const GlobalData = createContext()
export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState([])
    return (
        <GlobalData.Provider value={[globalData, setGlobalData]}>
            {children}
        </GlobalData.Provider>
    )
}
export const useGlobalData = () => useContext(GlobalData)