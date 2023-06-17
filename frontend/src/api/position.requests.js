import { BASE_URL } from "./base_URL";
import axios from "axios";


export const GetAllPassion = async(name)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/possion`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
} 

export const GetByIdPosion = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/possion/${id}`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostPassion = (payload)=>{
    axios.post(`${BASE_URL}/possion`,payload)
}

export const PutPassion = (id,payload)=>{
    axios.put(`${BASE_URL}/possion/${id}`,payload)
}

export const DeletePassion = (id)=>{
    axios.delete(`${BASE_URL}/possion/${id}`)
}