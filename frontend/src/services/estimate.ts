import axios from "axios";
import { ESTIMATE } from "../utils/Types";

export const postEstimate = async (estimate:ESTIMATE) => {
    try {
        const createEstimateResponse = await axios.post(
            `${process.env.REACT_APP_API_URL+'estimate'}`,
            estimate,
            { 
                headers: { Authorization : localStorage.getItem('auth_token') }
            }
        );
        return createEstimateResponse.data;
    } catch (error) {
        throw(error)
    }
}

export const updateEstimate = async (estimateId:string, estimate:ESTIMATE) => {
    try {
        const updateEstimateResponse = await axios.put(`
            ${process.env.REACT_APP_API_URL}estimate/${estimateId}`,
            estimate,
            { 
                headers: { Authorization : localStorage.getItem('auth_token') }
            }
        );
        return updateEstimateResponse.data;
    } catch (error) {
        throw(error)
    }
}

export const getEstimateByToken = async (token:string) => {
    try {
        
        const params = {
            token
        };

        const estimateResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}estimate-token`,
            {
                params
            }
        );
        return estimateResponse.data;
    } catch (error) {
        throw(error);
    }
}

export const getEstimateById = async (estimateId:string) => {
    try {
        const estimateResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}estimate/${estimateId}`,
            {
                headers: {
                    Authorization : localStorage.getItem('auth_token')
                }
            }
        );
        return estimateResponse.data;
    } catch (error) {
        throw(error);
    }
}

export const getEstimates = async () => {
    try {
        const listEstimatesResponse = await axios.get(`${process.env.REACT_APP_API_URL+'estimates'}`, {
            headers: {
                Authorization : localStorage.getItem('auth_token')
            }
        });
        return listEstimatesResponse.data;
    } catch (error) {
        throw(error);
    }
}

export const refreshToken = async (estimateId:string) => {
    try {
        const tokenResponse = await axios.put(`
            ${process.env.REACT_APP_API_URL}refresh-token/${estimateId}`, 
            null,
            { 
                headers: {
                    Authorization : localStorage.getItem('auth_token')
                }
            }
        );
        return tokenResponse.data;
    } catch (error) {
        throw(error)
    }
}