import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchPaginatedProucts, fetchProductById, latestProducts, latestSale, topProducts } from "../Services/Api";


export const useProducts = (page, limit) => {
    const results = useQueries({
        queries: [
            { queryKey: ["products","latest-sale"], 
                queryFn: latestSale, 
                staleTime: 1000 * 60 * 5, 
                enabled: !page && !limit 
            }, 
            { queryKey: ["products","latest-products"], 
                queryFn: latestProducts, 
                staleTime: 1000 * 60 * 5,
                enabled: !page && !limit  
            }, 
            { queryKey: ["products","top-rated"], 
                queryFn: topProducts, 
                staleTime: 1000 * 60 * 5,
                enabled: !page && !limit 
            },
        ],
    });
    const paginatedProducts = useQuery({
        queryKey: ["paginated-products", page, limit],
        queryFn: () => fetchPaginatedProucts(page, limit),
        staleTime: 1000 * 30,
        enabled: page > 0 && limit > 0,
        keepPreviousData: true,
        refetchOnWindowFocus:true,
    });


    return {
        latestSale: results[0],
        latestProducts: results[1],
        topProducts: results[2],
        paginatedProducts: paginatedProducts.data,
        isPaginatedLoading: paginatedProducts.isLoading,
    }
}