import axios from "axios";
import { ESTIMATE } from "../utils/Types";

export const postEstimate = async (estimate:ESTIMATE) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL+'estimate'}`, {estimate});
        return response.data;
    } catch (error) {
        throw(error)
    }
}

export const getEstimateByToken = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL+'estimate'}`, {
            headers: {
                Authorization : localStorage.getItem('token')
            }
        });
        // console.log(response)
        return response.data;
    } catch (error) {
        throw(error);
    }
}