import { Navigate, Outlet } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import Err403 from "../Errors/403";
import { useQueryClient } from "@tanstack/react-query";
import Cookie from "cookie-universal";
import { useAuth } from "../../../hooks/useAuth";


export default function RequireAuth( {allowedRole} ) {
    useAuth();
    const cookies = Cookie();
    const token = cookies.get("e-commerce");
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);

    return token ? (user === null ? (<LoadingSubmit />) : allowedRole.includes(user.role) ? (<Outlet />) : (<Err403 role={user.role}/>) ) : (<Navigate to={"/login"}  replace={true}/>);
}