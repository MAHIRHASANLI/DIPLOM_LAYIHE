import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllTeam = async(name)=>{
    let URL;
    let GlobalData;
    if(!name){
        URL = BASE_URL + '/team'
    }else{
        URL = BASE_URL + `/team/?name=${name}`
    }
    await axios.get(URL).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}
export const GetByIdTeam = async(id)=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/team/${id}`).then((res)=>{
     GlobalData = res.data;
    });
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