import axios from 'axios';
import {toast} from "react-toastify";

export const fetchEducationalImages = async () => {
    try {
        const response = await axios.get('https://images-api.nasa.gov/search', {
            params: {
                q: 'education',
                media_type: 'image',
            },
        });
        return response.data.collection.items.sort((a, b) => {
            return new Date(b.data[0].date_created) - new Date(a.data[0].date_created);
        });
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error fetching educational resources:", error);
        throw error;
    }
};
