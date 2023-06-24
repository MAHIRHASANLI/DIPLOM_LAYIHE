import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllHomeAbout = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/homeimg`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}
export const GetByIDHomeAbout = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/homeimg/${id}`).then((res)=>{
        GlobalData = res.data
    })
    return GlobalData;
}
export const PutHomeAbout = (id,payload)=>{
    axios.put(`${BASE_URL}/homeimg/${id}`,payload)
}