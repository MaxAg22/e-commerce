import { FeatureGrid } from '../components/home/FeatureGrid';
import { ProductGrid } from '../components/home/ProductGrid';


export const HomePage = () => {

	return (
		<div>
			<FeatureGrid />

			<ProductGrid
				title='Nuevos Productos'
				products={[{ id:1, title: 'Producto 1' }, { id:2, title: 'Producto 2' }]} // Example products
			/>

			<ProductGrid
				title='Productos Destacados'
				products={[{ id:1, title: 'Producto Destacado 1' }, { id:2, title: 'Producto Destacado 2' }]} // Example featured products
			/>
		</div>
	);
};