import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRegister, useUser } from '../hooks';
import { LuLoader } from 'react-icons/lu';
import { Loader } from '../components/shared/Loader';
import { userRegisterSchema, type UserRegisterFormValues } from '../lib/validators';


export const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegisterFormValues>({
		mode: "onChange",
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			phone: '',
		},
		resolver: zodResolver(userRegisterSchema), // Conectamos zod con react-hookform
	});

	const { mutate, isPending } = useRegister();
	const { session, isLoading } = useUser();

	const onRegister = handleSubmit(data => {
		const { email, password, fullName, phone } = data;

		mutate({ email, password, fullName, phone });   // Dispara sign up
	});

	if (isLoading) return <Loader />;

    // Middleware
	if (session) return <Navigate to='/' />;

	return (
		<div className='h-full flex flex-col items-center mt-12 gap-5'>
			<h1 className='text-4xl font-bold capitalize'>Regístrate</h1>

			<p className='text-sm font-medium'>
				Por favor, rellene los siguientes campos:
			</p>

			{isPending ? (
				<div className='w-full h-full flex justify-center mt-20'>
					<LuLoader className='animate-spin' size={60} />
				</div>
			) : (
				<>
					<form
						className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
						onSubmit={onRegister}
					>
						<input
							type='text'
							placeholder='Nombre Completo'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('fullName')}
						/>
						{errors.fullName && (
							<p className='text-red-500'>
								{errors.fullName.message}
							</p>
						)}

						<input
							type='text'
							placeholder='Celular'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('phone')}
						/>
						{errors.phone && (
							<p className='text-red-500'>{errors.phone.message}</p>
						)}

						<input
							type='email'
							placeholder='Ingresa tu correo electrónico'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('email')}
						/>
						{errors.email && (
							<p className='text-red-500'>{errors.email.message}</p>
						)}

						<input
							type='password'
							placeholder='Ingresa tu contraseña'
							className='border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full'
							{...register('password')}
						/>
						{errors.password && (
							<p className='text-red-500'>
								{errors.password.message}
							</p>
						)}

						<button className='bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full'>
							Registrarme
						</button>
					</form>

					<p className='text-sm text-stone-800'>
						¿Ya tienes una cuenta?
						<Link to='/login' className='underline ml-2'>
							Inicia sesión
						</Link>
					</p>
				</>
			)}
		</div>
	);
};