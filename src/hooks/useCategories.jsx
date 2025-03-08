import {useMutation, useQuery} from "@tanstack/react-query";
import { AddCategory, fetchCategories, fetchPaginatedCateories } from "../Services/Api";

export const useCategories = (page = 0, limit = 0) => {
    const categories = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5,
    });
    const paginatedCategories = useQuery({
        queryKey: ["categories", page, limit],
        queryFn: () => fetchPaginatedCateories(page, limit),
        staleTime: 1000 * 30,
        enabled: page > 0 && limit > 0,
        keepPreviousData: true,
        refetchOnWindowFocus:true,
    });

    return {
        allCategories: categories.data,
        isAllLoading: categories.isLoading, 
        paginatedCategories: paginatedCategories.data,
        isPaginatedLoading: paginatedCategories.isLoading,
        refetch: paginatedCategories.refetch
    };
}