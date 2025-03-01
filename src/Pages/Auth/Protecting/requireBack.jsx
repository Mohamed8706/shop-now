import { Navigate, Outlet } from 'react-router-dom';
import Cookie from "cookie-universal";

export default function RequireBack() {
    const cookies = Cookie();
    const token = cookies.get("e-commerce");


    return token ? <Navigate to="/" /> : <Outlet />;
}