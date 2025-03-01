import {useMutation, useQueryClient} from "@tanstack/react-query";
import { logIn, logOut, register } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();

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
        queryClient.removeQueries(["user"]);  // ✅ Clears cached user data
        queryClient.invalidateQueries(["user"]); // ✅ Ensures re-fetching on next mount
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