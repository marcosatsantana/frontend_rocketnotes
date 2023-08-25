import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend-rocketnotes-i2wl.onrender.com'
})