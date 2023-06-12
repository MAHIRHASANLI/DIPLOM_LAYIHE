import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllSlider = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/sliders`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostSlider = (payload)=>{
    axios.post(`${BASE_URL}/sliders`,payload)
}

export const PutSlider = (id,payload)=>{
    axios.put(`${BASE_URL}/sliders/${id}`,payload)
}

export const DeleteSlider = (id)=>{
    axios.delete(`${BASE_URL}/sliders/${id}`)
}