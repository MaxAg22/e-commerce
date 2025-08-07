import { useMutation } from '@tanstack/react-query';
import { purchaseTicket } from '../../actions';
import toast from 'react-hot-toast';

export const usePurchaseTicket = () => {

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ items, orderId }: { items: any[]; orderId: string }) => 
			purchaseTicket(items, orderId),
		onSuccess: () => {
            console.log("Compra iniciada:");
		},
		onError: error => {
			console.log(error);
			toast.error('Error al iniciar compra', {
				position: 'bottom-right',
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};