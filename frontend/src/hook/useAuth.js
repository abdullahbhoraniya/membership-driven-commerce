import { useContext } from "react";
import { AuthContext } from "../context/authContext.create";
export const useAuth = ()=>{

    return useContext(AuthContext);
}