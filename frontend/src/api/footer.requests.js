import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllFooter = async(name)=>{
    let URL;
    let GlobalData;
    if(!name){
        URL = BASE_URL + '/footer'
    }else{
        URL = BASE_URL + `/footer/?name=${name}`
    }
    await axios.get(URL).then((res)=>{
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