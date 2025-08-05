// Convención de react para los cutoms hooks: useName 
// TanStack query hooks config
// Similar a los endpoints de la API, pero con la ventaja de que
// se pueden usar en cualquier parte de la aplicación
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../actions';


export const useProducts = ({ page = 1 }: { page?: number }) => {
    const {data, isLoading} = useQuery({
        queryKey: ['products', page],
        queryFn: async () => getProducts(page),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
    return { products: data?.products, isLoading, totalProducts: data?.count ?? 0, };
};