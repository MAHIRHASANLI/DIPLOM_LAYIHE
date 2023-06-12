import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllChoose = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/choose`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostChoose = (payload)=>{
    axios.post(`${BASE_URL}/choose`,payload)
}

export const PutChoose = (id,payload)=>{
    axios.put(`${BASE_URL}/choose/${id}`,payload)
}

export const DeleteChoose = (id)=>{
    axios.delete(`${BASE_URL}/choose/${id}`)
}