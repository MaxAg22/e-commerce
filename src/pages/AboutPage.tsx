export const AboutPage = () => {
    return (
        <div className='space-y-5'>
            <h1 className='text-center text-4xl font-semibold tracking-tight mb-5'>
                Nuestra empresa
            </h1>

            <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto rounded-xl overflow-hidden gap-8">
                <div className="flex-1 flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800 justify-center"> 
					<p>
                        Somos una empresa dedicada a la regalería y accesorios,
                        comprometida en ofrecer productos originales y de calidad
                        para cada ocasión especial. Desde nuestros inicios, buscamos
                        acercar a nuestros clientes las últimas tendencias y
                        novedades en el mundo de los regalos y la moda.
                    </p>

                    <p>
                        En nuestra tienda encontrarás una amplia variedad de
                        categorías: indumentaria, accesorios, bijouterie, artículos
                        para el hogar y mucho más. Seleccionamos cuidadosamente
                        cada producto para que siempre encuentres el detalle
                        perfecto, ya sea para regalar o para vos.
                    </p>

                    <h2 className='text-3xl font-semibold tracking-tight mt-8 mb-4'>
                        ¡Descubrí todo lo que tenemos para vos!
                    </h2>

                    <p>
                        Para más información, no dudes en ponerte en contacto con
                        nosotros a través de nuestro correo electrónico:{' '}
                        <a href='mailto:correo@regaleriayaccesorios.com'>
                            correo@regaleriayaccesorios.com
                        </a>{' '}
                        o llamando al <a href='tel:333333333'>3333333333</a>
                    </p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <img
                        src='img/logoAboutPage.jpeg'
                        alt='Imagen de fondo'
                        className='h-full w-full object-cover rounded-xl'
                    />
                </div>
            </div>
        </div>
    );
};