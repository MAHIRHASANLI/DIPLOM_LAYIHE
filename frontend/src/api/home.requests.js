import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllHome = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/homeimg`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PutHome = (id,payload)=>{
    axios.put(`${BASE_URL}/homeimg/${id}`,payload)
}