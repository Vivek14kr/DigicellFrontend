
import { loadData } from "./localStorage";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminPrivateRoute = ({children})=>{
    let firstname = loadData("firstname")
    let token = loadData("token")
  

    const navigate = useNavigate();
    useEffect(()=>{
        if (token == null || firstname != "admin"){
            navigate("/")
        }
    },[])
   
    return children
}