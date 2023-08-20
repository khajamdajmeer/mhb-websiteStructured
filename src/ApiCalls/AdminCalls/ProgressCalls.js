import axios from 'axios';
import Cookies from 'js-cookie';
import { host } from '../Host';

const header = {
    'Content-Type': 'application/json',
    'auth-token': Cookies.get('auth-token')
};

export const GetCount = async (id) => {
    try {
        const response = await axios.get(`${host}/api/progress/reqcount/${id}`, {
            headers: header
        });
        return response.data;
    } catch (error) {
        // Handle error here
        console.error('An error occurred:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};
