import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ClientLayout } from "../layouts/ClientLayout";
import { HomePage, ProductsPage, AboutPage, LoginPage, RegisterPage, OrdersUserPage, ConfirmEmailPage } from "../pages";
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
                element: <ProductsPage />,
            },
            {
				path: 'productos/:slug',
				element: <ProductPage />,
			},
            {
                path: 'nosotros',
                element: <AboutPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'registro',
                element: <RegisterPage />,
            },
            {
                path: 'registro-confirmar',
                element: <ConfirmEmailPage />
            },
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="pedidos" />,
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />,
                    }
                ]
            }
        ]
    },
]);