import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllMessage = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/message`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostMessage = (payload)=>{
    axios.post(`${BASE_URL}/message`,payload)
}

export const DeleteMessage = (id)=>{
    axios.delete(`${BASE_URL}/message/${id}`)
}