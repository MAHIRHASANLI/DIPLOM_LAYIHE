import { BASE_URL } from "./base_URL";
import axios from "axios";


export const GetAllChoose = async(name)=>{
    let URL;
    let GlobalData;
    if(!name){
    URL = BASE_URL + '/choose'
    }
    else{
        URL = BASE_URL + `/choose/?name=${name}`
    }
    await axios.get(URL).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
} 

export const GetByIdChoose = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/choose/${id}`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PostChoose = (payload)=>{
    axios.post(`${BASE_URL}/choose`,payload)
}

export const PutChoose = (id,payload)=>{
    axios.put(`${BASE_URL}/choose/${id}`,payload)
}

export const DeleteChoose = (id)=>{
    axios.delete(`${BASE_URL}/choose/${id}`)
}