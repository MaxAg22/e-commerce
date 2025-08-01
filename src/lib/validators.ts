import { z } from 'zod';

// z.object proviene de la libreria zod, nos permite dar las propiedades a los campos del formulario
// Esquema de registro
export const userRegisterSchema = z.object({
    email: z.email('El correo electrónico no es válido'),
    password: z
        .string()
        .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
        .max(15, { message: "La contraseña no debe superar los 15 caracteres" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
            message:
            "La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un símbolo",
    }),
    fullName: z.string().min(1, 'El nombre completo es requerido'),
    phone: z.string().optional(),
});



// Esquema de dirección
export const addressSchema = z.object({
	addressLine1: z
		.string()
		.min(1, 'La dirección es requerida')
		.max(100, 'La dirección no debe exceder los 100 carácteres'),
	addressLine2: z
		.string()
		.max(100, 'La dirección no debe exceder los 100 carácteres')
		.optional(),
	city: z
		.string()
		.min(1, 'La ciudad es requerida')
		.max(50, 'La ciudad no debe exceder los 50 carácteres'),
	state: z
		.string()
		.min(1, 'El estado es requerido')
		.max(50, 'El estado no debe exceder los 50 carácteres'),
	postalCode: z
		.string()
		.max(10, 'El código postal no debe exceder los 10 carácteres')
		.optional(),
	country: z.string().min(1, 'El país es requerido'),
});


export type AddressFormValues = z.infer<typeof addressSchema>;

export type UserRegisterFormValues = z.infer<
    typeof userRegisterSchema
>;