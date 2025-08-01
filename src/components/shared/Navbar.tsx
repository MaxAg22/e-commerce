/* 
Aquí se encuentra la barra de navegación principal
*/

import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';
import {
	HiOutlineSearch,
	HiOutlineShoppingBag,
	HiOutlineUser,
} from 'react-icons/hi';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from './Logo';
import { useGlobalStore } from '../../store/global.store';
import { useCartStore } from '../../store/cart.store';
import { LuLoader } from 'react-icons/lu';
import { useUser } from '../../hooks';

export const Navbar = () => {

	const totalItemsInCart = useCartStore(state => state.totalItemsInCart);

	const openSheet = useGlobalStore(state => state.openSheet);
	const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);

	const { session, isLoading } = useUser();

	const userId = session?.user.id;


	return (
		<header className='bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12'>
			{/* Left Nav */}
            <Logo />

            {/* Center Nav */}
			<nav className='space-x-5 hidden md:flex'>
                {/* space-x es el espacio que le damos entre los componentes */}
				{navbarLinks.map(link => (
					<NavLink
						key={link.id}
						to={link.href}
                        // Desestructuramos isActive de las props
                        // para aplicar estilos condicionales
						className={({ isActive }) =>
							`${
								isActive ? 'text-pink-400 underline' : ''
							} transition-all duration-300 font-medium hover:text-pink-400 hover:underline `
						}
					>
						{link.title}
					</NavLink>
				))}
			</nav>

            {/* Right Nav */}
			<div className='flex gap-5 items-center'>
				{/* Search Nav */}
                <button onClick={() => openSheet('search')}>
					<HiOutlineSearch size={25} />
				</button>

                {/* User Nav */}
				{
					isLoading ? (
						<LuLoader className='animate-spin' size={60} />
					) : session ? (
						<div className='relative'>
							<Link
								to='/account/pedidos'
								className='border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold'
							>
								R
							</Link>
						</div>
					) : (
						<Link to='/login'>
							<HiOutlineUser size={25} />
						</Link>
					)
				}


                {/* Cart Nav */}
				<button className='relative' onClick={() => openSheet('cart')}>
					<span className='absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full'>
						{totalItemsInCart}
					</span>
					<HiOutlineShoppingBag size={25} />
				</button>
			</div>

            {/* Mobile Nav */}
            {/* Icono de hamburguesa para el menú móvil */}
			<button className='md:hidden'
			onClick={() => setActiveNavMobile(true)}
			>
				<FaBarsStaggered size={25} />
			</button>
		</header>
	);
};