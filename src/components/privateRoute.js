
import { loadData } from "./localStorage";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const PrivateRoute = ({children})=>{
    let token = loadData("token")
  

    const navigate = useNavigate();
    useEffect(()=>{
        if (token == null){
            navigate("/")
        }
    },[])
   
    return children
}