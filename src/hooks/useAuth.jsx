import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { fetchUser, logIn, logOut, register } from "../services/api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();

    const cookies = Cookie();
    const token = cookies.get("e-commerce"); 

    // Fetch user on load & cache it
    useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!token, 
        staleTime: 1000 * 60 * 5,
        onSuccess: (userData) => {
            queryClient.setQueryData(["user"], userData);
        },
        onError: () => {
            queryClient.removeQueries(["user"]);
        },
    });

    const loginMutation = useMutation({
        mutationFn: logIn,
        onSuccess: (userData) => {
            queryClient.setQueryData(["user"], userData);
            const go = userData.role === "1995" ? "/dashboard" : "/";
            nav(go, {replace: true}); 
        },
    });
    const rgeisterMutation = useMutation({
        mutationFn: register,
        onSuccess: (userData) => {
            queryClient.setQueryData(["user"], userData);
            const go = userData.role === "1995" ? "/dashboard" : "/";
            nav(go, {replace: true}); 
        },
    });
    const logoutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
        queryClient.removeQueries(["user"]);  
        queryClient.invalidateQueries(["user"]); 
        nav("/", {replace: true}); 

        },
    });


    return {
        login: loginMutation.mutate, 
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error?.message || null,
        register: rgeisterMutation.mutate,
        isRegistering: rgeisterMutation.isPending,
        registerError: rgeisterMutation.error?.message || null,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
}