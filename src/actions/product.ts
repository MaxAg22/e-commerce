// Aqui van todas las funciones que 
// interactuan con la base de datos de Supabase
import { supabase } from '../supabase/client';


export const getProducts = async () => {
    const {data: products, error} = await supabase
        .from('products')
        .select('*, variants(*)')
        .order('created_at', { ascending: false });

    if(error) {
        console.error('Error fetching products:', error.message);
        throw new Error(error.message);
    }

    return products;
};

export const getFilteredProducts = async ({
    page = 1, 
    brands = []
}: {
    page: number;
    brands: string[];
}) => {
    // Paginación
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
        .from('products')
        .select('*, variants(*)', {count: 'exact'}) // Devolver el conteo total de productos
        .order('created_at', { ascending: false })
        .range(from, to); // Paginación

    // Filtrar por marcas si se proporcionan (por eso usamos let en lugar de const)
    if (brands.length > 0) {
        query = query.in('brand', brands);
    }

    const { data, error, count } = await query;

    if (error) {
        console.error('Error fetching filtered products:', error.message);
        throw new Error(error.message);
    }

    return { data, count };

};


export const getRecentProducts = async () => {
	const { data: products, error } = await supabase
		.from('products')
		.select('*, variants(*)')
		.order('created_at', { ascending: false })
		.limit(4);

	if (error) {
		console.log(error.message);
		throw new Error(error.message);
	}

	return products;
};

export const getRandomProducts = async () => {
	const { data: products, error } = await supabase
		.from('products')
		.select('*, variants(*)')
		.limit(20);

	if (error) {
		console.log(error.message);
		throw new Error(error.message);
	}

	// Seleccionar 4 productos al azar
	const randomProducts = products
		.sort(() => 0.5 - Math.random())
		.slice(0, 4);

	return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
	const { data, error } = await supabase
		.from('products')
		.select('*, variants(*)')
		.eq('slug', slug)
		.single();

	if (error) {
		console.log(error.message);
		throw new Error(error.message);
	}

	return data;
};

export const searchProducts = async (searchTerm: string) => {
	const { data, error } = await supabase
		.from('products')
		.select('*, variants(*)')
		.ilike('name', `%${searchTerm}%`); //Buscar productos cuyo nombre contenga el término de búsqueda

	if (error) {
		console.log(error.message);
		throw new Error(error.message);
	}

	return data;
};