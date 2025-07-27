const categories = [
	{
		image: '/img/categories/hogar.png',
		alt: 'Hogar',
	},
	{
		image: '/img/categories/bijuteri.jpg',
		alt: 'Bijutería',
	},
	{
		image: '/img/categories/indumentaria.jpg',
		alt: 'Indumentaria',
	},
	{
		image: '/img/categories/accesorios.jpeg',
		alt: 'Accesorios',
	}
];

export const Categories = () => {
    return (
        <div className='flex flex-col items-center gap-3 pt-16 pb-12'>
            <h2 className='font-bold text-2xl'>Categorias que disponemos</h2>

            <p className='w-2/3 text-center text-sm md:text-base'>
                Tenemos lo más variado en categorías de moda, accesorios y más.
            </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 w-full max-w-4xl'>
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <p className="mb-2 text-center">{category.alt}</p>
                        <img
                            src={category.image}
                            alt={category.alt}
                            className="rounded-xl w-full max-w-[96px] h-24 object-cover transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};