import axios from 'axios';
import {toast} from "react-toastify";

export const fetchIssLocation = async () => {
    try {
        const issResponse = await axios.get('http://api.open-notify.org/iss-now.json');
        const { latitude, longitude } = issResponse.data.iss_position;
        return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error fetching ISS location:", error);
        throw error;
    }
};

export const fetchLocationDetails = async (latitude, longitude) => {
    try {
        const apiKey = '92109e66a0d04bb5b32edb2d200d2abe';
        const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
        if (locationResponse.data.results.length > 0) {
            return locationResponse.data.results[0].formatted;
        } else {
            return 'Location details not available';
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error fetching location details:", error);
        throw error;
    }
};
