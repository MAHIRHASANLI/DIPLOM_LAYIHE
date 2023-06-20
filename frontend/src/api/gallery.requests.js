import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllGallery = async(category)=>{
    let URL;
    let GlobalData;
    if(!category){
        URL = BASE_URL + '/gallery'
    }else{
        URL = BASE_URL + `/gallery/?category=${category}`
    }
    await axios.get(URL).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostGallery = (payload)=>{
    axios.post(`${BASE_URL}/gallery`,payload)
}

export const DeleteGallery = (id)=>{
    axios.delete(`${BASE_URL}/gallery/${id}`)
}