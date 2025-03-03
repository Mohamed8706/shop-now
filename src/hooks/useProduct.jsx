import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/api";

export const useProduct = (productId) => {
    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId,  
        staleTime: 1000 * 60 * 5, 
    });
};
