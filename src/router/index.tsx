import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, ProductsPage, AboutPage } from "../pages";
import { ProductPage } from "../pages/ProductPage";


/*
Aquí ponemos las rutas y los elementos que se
renderizan en las mismas. Todo anidado, no hace falta '/'.
*/
export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true, // Toma el mismo path que el padre
                element: <HomePage />
            },
            {
                path: 'productos',
                element: <ProductsPage />
            },
            {
				path: 'productos/:slug',
				element: <ProductPage />,
			},
            {
                path: 'nosotros',
                element: <AboutPage />
            },
        ]
    },
]);