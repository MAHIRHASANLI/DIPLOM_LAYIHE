import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllBlog = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/blog`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostBlog = (payload)=>{
    axios.post(`${BASE_URL}/blog`,payload)
}

export const PutBlog = (id,payload)=>{
    axios.put(`${BASE_URL}/blog/${id}`,payload)
}

export const DeleteBlog = (id)=>{
    axios.delete(`${BASE_URL}/blog/${id}`)
}