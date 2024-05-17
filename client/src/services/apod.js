import axios from 'axios';
import {toast} from "react-toastify";

export const fetchApodData = async () => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=dzwn3dmvsoVYHJFBoTyPFVgy2AaStJps1MxEG8R6');
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.log(`Error fetching APOD data: ${error.response?.data?.message || error.message}`);
        throw error;
    }
};
