import axios from "axios";

const API = axios.create({

    baseURL:"http://localhost:5000/api/v1",

    withCredentials:true
});

// REQUEST INTERCEPTOR
API.interceptors.request.use((config)=>{

    const token = localStorage.getItem("accessToken");

    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
});

// RESPONSE INTERCEPTOR
API.interceptors.response.use(

    (response)=>response,

    async(error)=>{

        const originalRequest = error.config;

        // ACCESS TOKEN EXPIRED
        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ){

            originalRequest._retry = true;

            try{

                const response = await axios.get(
                    "http://localhost:5000/api/v1/auth/refreshtoken",
                    {
                        withCredentials:true
                    }
                );

                const newAccessToken =
                response.data.accessToken;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

                return API(originalRequest);
            }
            catch(refreshError){

                localStorage.removeItem("accessToken");

                // Let the app auth state handle navigation to login instead of forcing a page reload.
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;