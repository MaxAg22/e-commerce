import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useRegister = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
            // La consulta de este tipo debera volver consultar al servidor
			queryClient.invalidateQueries({ queryKey: ['user'] });
			navigate('/registro-confirmar');
		},
		onError: err => {
			toast.error(err.message, {
				position: 'bottom-right',
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};