import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../Services/Api";
import { useProducts } from "./useProducts";

export const useProduct = (productId) => {
    const {latestProducts, latestSale, topProducts} = useProducts();
    const cachedProduct = latestProducts?.data?.find((product) => product.id == productId) ||
    latestSale?.data?.find((product) => product.id == productId) || 
    topProducts?.data?.find((product) => product.id == productId) || undefined;

    return useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProductById(productId),
        enabled: !!productId,  
        staleTime: 1000 * 60 * 5,
        initialData: cachedProduct,
    });
};
