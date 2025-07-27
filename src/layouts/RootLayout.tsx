// Layout es lo que se renderiza en todas las rutas
// Outlet es donde se renderiza el contenido de cada ruta específica

import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";
import { Banner } from "../components/home/Banner";
import { Newsletter } from "../components/home/Newsletter";

export const RootLayout = () => {

    const { pathname } = useLocation();

    return (
        <div className="h-screen flex flex-col font-montserrat">
            <Navbar />

            {/* Solo muestra el banner en la ruta raíz */}
            {pathname === '/' && <Banner />}

            <main className="container my-8 flex-1 mx-auto px-4">
                <Outlet />
            </main>

            {/* Solo muestra el newsletter en la ruta raíz */}
            {pathname === '/' && <Newsletter />}

            <Footer />
        </div>
    )
}