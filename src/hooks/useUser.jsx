import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectedUser, UpdateUser } from "../services/api";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { AddUser } from "../services/api";

export const useUser = (id) => {
    const nav = useNavigate();
    // Fetch Selected User
    const SelectedUser = useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchSelectedUser(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,

    }); 
    const updateSelectedUser = useMutation({
        mutationFn:  ({ id, form }) => UpdateUser(id, form),
        onSuccess: () => { 
            SelectedUser.refetch()
            nav("/dashboard/users");
        },
    });



    return {
        selectedUser: SelectedUser.data,
        isFetchingSelectedUser: SelectedUser.isLoading,
        update: updateSelectedUser.mutate,
        isUpdating: updateSelectedUser.isPending,
    }
}