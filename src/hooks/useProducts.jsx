import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { editInitialProduct, fetchPaginatedProucts, latestProducts, latestSale, topProducts } from "../Services/Api";
import { addInitialProduct } from './../Services/Api';
import { useNavigate } from "react-router-dom";


export const useProducts = (page, limit) => {
    const nav = useNavigate();

    const queryClient = useQueryClient();

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
        refetchOnReconnect: true,

    });

    const addProduct = useMutation({
        mutationFn: addInitialProduct
    })
    const editProduct = useMutation({
        mutationFn: (form) => editInitialProduct(form), 
        onSuccess: () => {
            queryClient.invalidateQueries("paginated-products")
            nav("/dashboard/products");
        }
    })

    return {
        latestSale: results[0],
        latestProducts: results[1],
        topProducts: results[2],
        paginatedProducts: paginatedProducts.data,
        isPaginatedLoading: paginatedProducts.isLoading,
        refetch: paginatedProducts.refetch,
        addProduct: addProduct.mutate,
        isAdding: addProduct.isPending,
        addedProductData: addProduct.data,
        editProduct: editProduct.mutate,
        isEditing: editProduct.isPending
    }
}