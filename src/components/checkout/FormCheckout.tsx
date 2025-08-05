import { useForm } from 'react-hook-form';
import { InputAddress } from './InputAddress';
import {
	type AddressFormValues,
	addressSchema,
} from '../../lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemsCheckout } from './ItemsCheckout';
import { useCreateOrder } from '../../hooks';
import { useCartStore } from '../../store/cart.store';
import { ImSpinner2 } from 'react-icons/im';
import { purchaseTicket } from '../../actions/purchaseTicket';
import { Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';

export const FormCheckout = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
	});

	const { mutate: createOrder, isPending } = useCreateOrder();

	const cleanCart = useCartStore(state => state.cleanCart);
	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);
	
	const [preferenceId, setPreferenceId] = useState(null); 

	const handlePurchase = async (orderId: number) => {
		try {
			const items = cartItems.map(item => ({
				title: item.name,
				quantity: Number(item.quantity),
				unit_price: Number(item.price)
			}));

			const response = await purchaseTicket(items, orderId);

			if (response.id) {
				console.log(response.id);
				setPreferenceId(response.id);
			} else {
				console.error("No se recibió un ID de preferencia válido:", response);
			}
		} catch (error) {
			console.error("Error purchasing ticket:", error);
		}
	}

	const onSubmit = handleSubmit(data => {
		
		// Creamos la orden
		const orderInput = {
			address: data,
			cartItems: cartItems.map(item => ({
				variantId: item.variantId,
				quantity: item.quantity,
				price: item.price,
			})),
			totalAmount,
		};

		createOrder(orderInput, {
		onSuccess: (data) => {
			const orderId = data.id;
			handlePurchase(orderId); // Flujo del pago
			//cleanCart();
		},
		});

	});

	if (isPending) {
		return (
			<div className='flex flex-col gap-3 h-screen items-center justify-center'>
				<ImSpinner2 className='animate-spin h-10 w-10' />

				<p className='text-sm font-medium'>
					Estamos procesando tu pedido
				</p>
			</div>
		);
	}

	return (
		<div>
			<form className='flex flex-col gap-6' onSubmit={onSubmit}>
				<div className='flex flex-col gap-3'>
					<h3 className='text-lg font-semibold tracking-normal'>
						Entrega
					</h3>

					<InputAddress
						register={register}
						errors={errors}
						name='addressLine1'
						placeholder='Dirección principal'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='addressLine2'
						placeholder='Dirección adicional (Opcional)'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='state'
						placeholder='Estado / Provincia'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='city'
						placeholder='Ciudad'
					/>

					<InputAddress
						register={register}
						errors={errors}
						name='postalCode'
						placeholder='Código Postal (Opcional)'
					/>

					<select
						className='border border-slate-200 rounded-md p-3'
						{...register('country')}
					>
						<option value='Ecuador'>Argentina</option>
					</select>
				</div>

				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium'>Métodos de envío</p>

					<div className='flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6'>
						<span className='font-normal'>Standard</span>
						<span className='font-semibold'>Gratis</span>
					</div>
				</div>

				{/* DIV DE MERCADOPAGO */}


				<div className='flex flex-col gap-6'>
					<h3 className='font-semibold text-3xl'>
						Resumen del pedido
					</h3>

					<ItemsCheckout />
				</div>

				<button
					type='submit'
					className='bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2'
				>
					Finalizar Pedido
				</button>
				{preferenceId && <Wallet initialization={{ preferenceId: preferenceId }}/>}
			</form>
		</div>
	);
};