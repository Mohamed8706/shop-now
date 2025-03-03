import { useQueries } from "@tanstack/react-query";
import { latestProducts, latestSale, topProducts } from "../services/api";


export const useProducts = (type) => {
    const results = useQueries({
        queries: [
            { queryKey: ["products","latest-sale"], queryFn: latestSale, staleTime: 1000 * 60 * 5 }, 
            { queryKey: ["products","latest-products"], queryFn: latestProducts, staleTime: 1000 * 60 * 5 }, 
            { queryKey: ["products","top-rated"], queryFn: topProducts, staleTime: 1000 * 60 * 5 },
        ],
    });

    return {
        latestSale: results[0],
        latestProducts: results[1],
        topProducts: results[2]
    }
}