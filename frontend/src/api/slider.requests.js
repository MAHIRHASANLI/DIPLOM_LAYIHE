import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllSlider = async(name)=>{
    let URL;
    let GlobalData;
    if(!name){
    URL = BASE_URL + '/sliders'
    }
    else{
        URL = BASE_URL + `/sliders/?name=${name}`
    }
    await axios.get(URL).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
} 

export const GetByIdSlider = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/sliders/${id}`).then((res)=>{
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