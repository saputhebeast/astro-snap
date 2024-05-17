import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://143.198.138.235:8085/api/v1';

export const fetchPosts = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/post?sort[created_at]=-1`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const likePost = async (postId, token) => {
    try {
        const response = await axios.post(`${baseURL}/post/${postId}/like`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error liking post:", error);
        throw error;
    }
};

export const addNewPost = async (postData, token) => {
    try {
        await axios.post(`${baseURL}/post`, postData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success(`Diary added successfully`);
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error("Error adding new post:", error);
        throw error;
    }
};
