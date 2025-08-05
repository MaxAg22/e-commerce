import { Link } from 'react-router-dom';

interface Props {
	isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
	return (
		<Link
			to='/'
			className={`text-2xl font-bold tracking-tighter transition-all ${
				isDashboard && 'hover:scale-105'
			}`}
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