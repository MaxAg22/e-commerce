// No utilizamos useQuery porque no necesitamos datos del servidor
// Tanstack query nos provee el concepto de las mutaciones (useMutation)
// se usa para peticiones post, put, delete, patch...

// Const query client es para revalidad la consulta
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../../actions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: signIn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			navigate('/');
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