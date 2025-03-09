import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { AddUser, fetchUser, fetchUsers, logIn, logOut, register } from "../Services/Api";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";


export const useAuth = (page = 0, limit = 0) => {
    const nav = useNavigate();

    const cookies = Cookie();
    const token = cookies.get("e-commerce"); 
    const queryClient = useQueryClient();
    // Fetch user on load & cache it
    const UserData = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await fetchUser();
            const userData = response.data;
            if (userData?.access_token) {
                cookies.set("e-commerce", userData.access_token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                });
            }
            return userData;
            },
            enabled: !!token,
            staleTime: 1000 * 60 * 5,
            refetchInterval: 1000 * 60 * 15,
            onError: (err) => {
            if (err.response?.status === 401) {
                cookies.remove("e-commerce");
                queryClient.removeQueries(["user"]);
                nav("/login", { replace: true });
            }
            },
    });

    // Fetch paginated users and keep the old data stored 
    const Users = useQuery({
        queryKey: ["users", page, limit], 
        queryFn: () => fetchUsers(page, limit),
        staleTime: 1000 * 60 * 5,
        enabled: page > 0 && limit > 0,
        keepPreviousData: true,
    })
    const loginMutation = useMutation({
        mutationFn: logIn,
        onSuccess: (userData) => {
            const go = userData.role === "1995" ? "/dashboard" : "/";
            nav(go, {replace: true}); 
        },
    });
    const rgeisterMutation = useMutation({
        mutationFn: register,
        onSuccess: (userData) => {
            const go = userData.role === "1995" ? "/dashboard" : "/";
            nav(go, {replace: true}); 
        },
    });
    const logoutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
        nav("/", {replace: true}); 

        },
    });

    const addUser = useMutation({
        mutationFn: AddUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            nav("/dashboard/users");
        }
    });
    return {
        user: UserData.data,
        isFetchingUser: UserData.isLoading,
        users: Users.data,
        refetch: Users.refetch,
        isFetchingUsers: Users.isLoading,
        login: loginMutation.mutate, 
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error?.message || null,
        register: rgeisterMutation.mutate,
        isRegistering: rgeisterMutation.isPending,
        registerError: rgeisterMutation.error?.message || null,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error?.message || null,
        add: addUser.mutate,
        isAdding: addUser.isPending,
        addError: addUser.error?.message || null
    };
}