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
import { Wallet } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { usePurchaseTicket } from '../../hooks/payments/usePurchaseTicket';

export const FormCheckout = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
	});

	const { mutate: createOrder, isPending } = useCreateOrder();
	const { mutate: purchaseTicket, isPending: isPendingTicket } = usePurchaseTicket();


	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);
	
	const [preferenceId, setPreferenceId] = useState(null); 
	const [submitButton, setSubmitButton] = useState(false);

	// Se crea la orden (pendiente de pago)
	const onSubmit = handleSubmit(data => {
		
		setSubmitButton(true);

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
			onSuccess: (orderId) => {
				// Redirecciona la logica al pago
				handlePurchase(orderId);	
			},
		});
	});

	// Se crea la preferencia
	const handlePurchase = async (orderId: string) => {
		
		const items = cartItems.map(item => ({
			title: item.name,
			quantity: Number(item.quantity),
			unit_price: Number(item.price)
		}));

		purchaseTicket({ items, orderId }, {
			onSuccess: (response) => {
				setPreferenceId(response.id);
			},
			onError: () => 
				console.error("No se recibió un ID de preferencia válido"),
		});
	}

	if (isPending || isPendingTicket) {
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
						<option value='Argentina'>Argentina</option>
					</select>
				</div>

				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium'>Métodos de envío</p>

					<div className='flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6'>
						<span className='font-normal'>Standard</span>
						<span className='font-semibold'>Gratis</span>
					</div>
				</div>

				{/* En este div se especifica un unico metodo de pago (mercado pago) y ademas 
				si no se acredita el pago en 24hs la orden de compra sera cancelada */}
				<div className='flex flex-col gap-3'>
					<p className='text-sm font-medium'>Métodos de pago</p>

					<div className='flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6'>
						<span className='font-normal'>Mercado Pago</span>
						<span className='font-semibold'>Pago con tarjeta de crédito o débito</span>
					</div>

					<div className='text-xs text-red-500'>
						<p>
							Si no se acredita el pago en 24 horas, la orden de compra será cancelada.
						</p>
					</div>
				</div>

				<div className='flex flex-col gap-6'>
					<h3 className='font-semibold text-3xl'>
						Resumen del pedido
					</h3>

					<ItemsCheckout />
				</div>

						
				{!submitButton && (
					<button
						type='submit'
						className='bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2 submit_button'
					>
						Finalizar Pedido
					</button>
				)}
					
				{preferenceId && <Wallet initialization={{ preferenceId: preferenceId }}/>}
			</form>
		</div>
	);
};