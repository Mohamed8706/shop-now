import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchSelectedCategory, UpdateCategory } from "../Services/Api"
import { useNavigate } from "react-router-dom"
import { useCategories } from "./useCategories";

export const useCategory = (id) => {
    const nav = useNavigate();

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
    return {
        selectedCategory: selectedCategory.data,
        isFetchingSelectedCategory: selectedCategory.isLoading,
        update: updateSelectedCategory.mutate,
        isUpdating: updateSelectedCategory.isPending
    }
}