import { useQueryClient } from '@tanstack/react-query';
import Cookie  from 'cookie-universal';
import { Outlet } from 'react-router-dom';

export default function RequireBack() {

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["user"]);


    return user ? window.history.back() : <Outlet />;
}