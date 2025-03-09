import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProductImages, fetchProductById, UpdateProduct } from "../Services/Api";
import { useNavigate } from "react-router-dom";


export const useSelectedProduct = (id) => {
    const nav = useNavigate();

    const selectedProduct = useQuery({
        queryKey: ["selected-product", id],
        queryFn: () => fetchProductById(id),
        enabled: !!id
    })

    const updateSelectedProduct = useMutation({
        mutationFn:  ({ id, form }) => UpdateProduct(id, form),
        onSuccess: () => { 
            nav("/dashboard/products");
        },
    })
    const deleteSelectedProductImages = useMutation({
        mutationFn: deleteProductImages,
    })
    return {
        selectedProduct: selectedProduct.data,
        isFetchingSelectedProduct: selectedProduct.isLoading,
        update: updateSelectedProduct.mutate,
        isUpdating: updateSelectedProduct.isPending,
        deleteProductImages: deleteSelectedProductImages.mutate
    }
}