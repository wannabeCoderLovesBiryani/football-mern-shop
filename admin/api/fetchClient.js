import { getCookie, setCookie } from 'cookies-next';
import axios from "axios";
import { maxAgeAccessoken } from '@/utils/const';


const fetchClient = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
    withCredentials: true
});

fetchClient.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': getCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN),
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export const refreshToken = async () => {
    return await fetchClient.post("/refreshToken");
}

fetchClient.interceptors.response.use(
    (response) => {
        console.log({response})
        return response.data
    },
    async (err) => {
        const originalConfig = err.config;
        if (err.response && err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            const rs = await refreshToken();
            if (rs !== undefined && rs.status && rs.status === 200){
                console.log({rs})
                const { accessToken } = rs.data;
                setCookie(process.env.CLIENT_COOKIE_ACCESS_TOKEN, accessToken,  { req, res,  maxAge: maxAgeAccessoken  });
                config.headers = {
                    'Authorization': accessToken,
                }
                return instance(originalConfig);
            }
        }
        return Promise.reject(err);
    }
);

export default fetchClient;