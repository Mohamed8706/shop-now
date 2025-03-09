import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddCategory, fetchSelectedCategory, UpdateCategory } from "../Services/Api"
import { useNavigate } from "react-router-dom";

export const useCategory = (id) => {
    const nav = useNavigate();

    const queryClient = useQueryClient();
    

    const selectedCategory = useQuery({
        queryKey: ["category", id],
        queryFn: () => fetchSelectedCategory(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })
    const updateSelectedCategory = useMutation({
        mutationFn:  ({ id, form }) => UpdateCategory(id, form),
        onSuccess: () => { 
            nav("/dashboard/categories");
        },
    });
        const addCategory = useMutation({
        mutationFn: (data) => AddCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            nav("/dashboard/categories");
        }
    });
    return {
        selectedCategory: selectedCategory.data,
        isFetchingSelectedCategory: selectedCategory.isLoading,
        update: updateSelectedCategory.mutate,
        isUpdating: updateSelectedCategory.isPending,
        add: addCategory.mutate,
        isAdding: addCategory.isPending,
        err: addCategory.error,
    }
}