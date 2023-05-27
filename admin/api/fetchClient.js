import { getCookie, setCookie } from 'cookies-next';
import axios from "axios";
import { maxAgeAccessoken } from '@/utils/const';


const fetchClient = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
    withCredentials: true,
});

fetchClient.defaults.timeout = 6000

fetchClient.interceptors.request.use(
    async config => {
        if (getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN))
        config.headers = {
            'Authorization': getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN),
        }
    return config;
    },
    error => {
        Promise.reject(error)
    });

fetchClient.interceptors.response.use(
    (response) => {
        // console.log({response})
        return response.data
    },
);

export default fetchClient;