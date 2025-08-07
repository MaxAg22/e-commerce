import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../../actions';
import toast from 'react-hot-toast';

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['orders'],
			});
		},
		onError: error => {
			toast.error(error.message, {
				position: 'bottom-right',
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};