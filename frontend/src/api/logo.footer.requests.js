import { BASE_URL } from "./base_URL";
import axios from "axios";

export const GetAllLogoFooter = async()=>{
    let GlobalData;
    await axios.get(`${BASE_URL}/logo`).then((res)=>{
        GlobalData = res.data;
    })
    return GlobalData;
}

export const PutLogoFooter = (id,payload)=>{
    axios.put(`${BASE_URL}/logo/${id}`,payload)
}

// export const DeleteLogoFooter = (id)=>{
//     axios.delete(`${BASE_URL}/logo/${id}`)
// }