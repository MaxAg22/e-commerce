// Convención de react para los cutoms hooks: useName 
// TanStack query hooks config
// Similar a los endpoints de la API, pero con la ventaja de que
// se pueden usar en cualquier parte de la aplicación
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../actions';


export const useProducts = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => getProducts(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
    return { products: data, isLoading };
};