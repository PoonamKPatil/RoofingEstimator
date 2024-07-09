import axios from "axios";

export const getMaterials = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL+'materials'}`);
        return response.data;
    } catch (error) {
        throw(error)
    }
}