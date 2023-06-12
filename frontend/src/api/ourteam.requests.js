import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllTeam = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/team`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostTeam = (payload)=>{
    axios.post(`${BASE_URL}/team`,payload)
}

export const PutTeam = (id,payload)=>{
    axios.put(`${BASE_URL}/team/${id}`,payload)
}

export const DeleteTeam = (id)=>{
    axios.delete(`${BASE_URL}/team/${id}`)
}