import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { ClientLayout } from "../layouts/ClientLayout";
import { 
    HomePage, 
    ProductsPage, 
    AboutPage, 
    LoginPage, 
    RegisterPage, 
    OrdersUserPage, 
    ConfirmEmailPage, 
    CheckoutPage, 
    OrderUserPage, 
    ThankyouPage, 
    DashboardProductsPage,
    DashboardNewProductPage,
    DashboardProductSlugPage,
    DashboardOrdersPage,
    DashboardOrderPage
} from "../pages";
import { ProductPage } from "../pages/ProductPage";
import { DashboardLayout } from "../layouts/DashboardLayout";


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
                        element: <Navigate to="account/pedidos" />,
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />,
                    },
                    {
                        path: 'pedidos/:id',
                        element: <OrderUserPage />,
                    }
                ]
            },
        ]
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankyouPage />,
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/productos' />,
            },
            {
                path: 'productos',
                element: <DashboardProductsPage />,
            },
            {
                path: 'productos/new',
                element: <DashboardNewProductPage />,
            },
            {
                path: 'productos/editar/:slug',
                element: <DashboardProductSlugPage />,
            },
            {
                path: 'ordenes',
                element: <DashboardOrdersPage />,
            },
            {
                path: 'ordenes/:id',
                element: <DashboardOrderPage />,
            }
            
        ]
    }
]);