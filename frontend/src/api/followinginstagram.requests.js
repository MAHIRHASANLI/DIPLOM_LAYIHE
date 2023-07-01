import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllFollowInstagram = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/follower`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}
export const GetByIdFollowInstagram = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/follower/${id}`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostFollowInstagram = (payload)=>{
    axios.post(`${BASE_URL}/follower`,payload)
}

export const PutFollowInstagram = (id,payload)=>{
    axios.put(`${BASE_URL}/follower/${id}`,payload)
}

export const DeleteFollowInstagram = (id)=>{
    axios.delete(`${BASE_URL}/follower/${id}`)
}