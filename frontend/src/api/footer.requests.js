import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllFooter = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/footer`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostFooter = (payload)=>{
    axios.post(`${BASE_URL}/footer`,payload)
}

export const DeleteFooter = (id)=>{
    axios.delete(`${BASE_URL}/footer/${id}`)
}