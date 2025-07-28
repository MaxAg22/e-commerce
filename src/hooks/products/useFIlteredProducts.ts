import { getFilteredProducts } from "../../actions";
import { useQuery } from '@tanstack/react-query';

export const usedFIlteredProducts = ({
    page, 
    brands
    }: {
        page: number; 
        brands: string[];
    }) => {
    const {data, isLoading} = useQuery({
        queryKey: ['filteredProducts', page, brands],
        queryFn: () => getFilteredProducts({ page, brands }),
        retry: false,  // No reintentar en caso de error
    });

    return {
        data: data?.data, // Los productos filtrados
        isLoading,
        totalProducts: data?.count ?? 0, // Total de productos filtrados
    };
}