import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllBlog = async(type)=>{
    let URL;
    let GlobalData;
    if(!type){
    URL = BASE_URL + '/blog'
    }
    else{
        URL = BASE_URL + `/blog/?type=${type}`
    }
    await axios.get(URL).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const GetByIdBlog = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/blog/${id}`).then((res)=>{
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