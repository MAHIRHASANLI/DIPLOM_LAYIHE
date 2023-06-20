import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllContact = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/contact`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PutContact = (id,payload)=>{
    axios.put(`${BASE_URL}/contact/${id}`,payload)
}

export const DeleteContact = (id)=>{
    axios.delete(`${BASE_URL}/contact/${id}`)
}