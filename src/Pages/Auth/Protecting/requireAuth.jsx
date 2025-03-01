import { Navigate, Outlet } from "react-router-dom";
import LoadingSubmit from '../../../Components/Loading/loading';
import Err403 from "../Errors/403";
import { useQueryClient } from "@tanstack/react-query";


export default function RequireAuth( {allowedRole} ) {

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);

    return user ? (user === null ? (<LoadingSubmit />) : allowedRole.includes(user.role) ? (<Outlet />) : (<Err403 role={user.role}/>) ) : (<Navigate to={"/login"}  replace={true}/>);
}