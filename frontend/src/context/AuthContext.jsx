import {
    useEffect,
    useState,
    useCallback
} from "react";

import API from "../api/axios";
import { AuthContext } from "./authContext.create";

const AuthProvider = ({ children }) => {

    // USER STATE
    const [user, setUser] =
    useState(null);

    // ACCESS TOKEN
    const [accessToken,
        setAccessToken] =
    useState(null);

    // LOADING
    const [loading,
        setLoading] =
    useState(true);

    // GET CURRENT USER
    const getMe =
    useCallback(async (token) => {

        try {

            if (!token) {

                setUser(null);

                return null;
            }

            const response =
            await API.get(
                "/auth/getme",
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setUser(response.data.user);

            return response.data.user;

        }
        catch{

            setUser(null);

            return null;
        }

    }, []);

    // REFRESH ACCESS TOKEN
    const refreshAccessToken =
    useCallback(async () => {

        try {

            const response =
            await API.get(
                "/auth/refreshtoken",
                {
                    withCredentials:true
                }
            );

            const newAccessToken =
            response.data.token;

            // SAVE IN MEMORY
            setAccessToken(
                newAccessToken
            );

            // SAVE IN LOCALSTORAGE
            localStorage.setItem(
                "accessToken",
                newAccessToken
            );

            // REFRESH USER STATE
            await getMe(newAccessToken);

            return newAccessToken;

        }
        catch{

            setAccessToken(null);

            setUser(null);

            localStorage.removeItem("accessToken");

            return null;
        }

    }, [getMe]);

    // INITIAL AUTH CHECK
    useEffect(() => {

        const initializeAuth =
        async () => {

            // CHECK IF TOKEN EXISTS IN LOCALSTORAGE
            const savedToken = 
            localStorage.getItem("accessToken");

            if(savedToken) {

                setAccessToken(savedToken);

                // VERIFY AND RESTORE USER DATA
                await getMe(savedToken);
            }
            else {

                await refreshAccessToken();
            }

            setLoading(false);
        };

        initializeAuth();

    }, [refreshAccessToken, getMe]);

    // AUTO TOKEN REFRESH
    useEffect(() => {

        if(!accessToken) return;

        const interval =
        setInterval(async()=>{

            await refreshAccessToken();

        },14 * 60 * 1000);

        return () =>
        clearInterval(interval);

    }, [
        accessToken,
        refreshAccessToken
    ]);

    // LOGIN HANDLER
    const login = async (
        email,
        password
    ) => {

        try {

            const response =
            await API.post(
                "/auth/login",
                {
                    email,
                    password
                },
                {
                    withCredentials:true
                }
            );

            const token =
            response.data.token;

            setAccessToken(token);

            // SAVE IN LOCALSTORAGE
            localStorage.setItem(
                "accessToken",
                token
            );

            await getMe(token);

            return {
                success:true
            };

        }
        catch(error){

            return {

                success:false,

                message:
                error?.response?.data?.message
            };
        }
    };

    // LOGOUT
    const logout = async () => {

        try {

            await API.post(
                "/auth/logout",
                {},
                {
                    withCredentials:true
                }
            );

        }
        catch(error){

            console.log(error);
        }

        setUser(null);

        setAccessToken(null);

        localStorage.removeItem("accessToken");
    };

    return (

        <AuthContext.Provider
            value={{

                user,

                accessToken,

                loading,

                login,

                logout,

                getMe,

                setUser,

                setAccessToken,

                refreshAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;