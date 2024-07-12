import axios from "axios";
import { LoginParams } from "../utils/Types";

export const login = async ({username, password}: LoginParams) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL+'login'}`, {username, password});
        return response.data;
    } catch (error) {
        throw(error)
    }
}