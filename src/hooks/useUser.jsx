import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSelectedUser, UpdateUser } from "../Services/Api";
import { useNavigate } from "react-router-dom";

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