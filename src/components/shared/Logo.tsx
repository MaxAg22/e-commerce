import { Link } from 'react-router-dom';

export const Logo = () => {
	return (
		<Link
			to='/'
			className={`text-2xl font-bold tracking-tighter transition-all`}
		>
			<p className='hidden lg:block'>
				Solange
				<span className='text-pink-400'>Accesorios</span>
			</p>

			<p className='flex text-4xl lg:hidden'>
				<span className='-skew-x-6'>S</span>
				<span className='text-pink-400 skew-x-6'>A</span>
			</p>
		</Link>
	);
};