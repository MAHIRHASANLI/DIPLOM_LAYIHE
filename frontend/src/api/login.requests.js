import axios from "axios"
import { BASE_URL } from "./base_URL"

//sing up
export const signUP = (payload) => {
    axios.post(`${BASE_URL}/register`, payload);
};

//sign in
export const signIn = async (payload) => {
    const res = await axios.post(`${BASE_URL}/login`, payload);
    return res.data;
}

//get users
export const getUsers = async (token) => {
    const res = await axios.get(`${BASE_URL}/users`,{
        headers:{
            'x-access-token': token
        }
    });
    return res.data
}