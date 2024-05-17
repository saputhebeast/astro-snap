import axios from 'axios';
import {toast} from "react-toastify";

export const fetchRoverPhotos = async (page) => {
    try {
        const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
            params: {
                sol: 1000,
                page: page,
                api_key: 'dzwn3dmvsoVYHJFBoTyPFVgy2AaStJps1MxEG8R6',
            },
        });
        return response.data.photos;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error fetching Mars rover photos:", error);
        throw error;
    }
};
