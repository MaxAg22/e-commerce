import { LuMailCheck } from "react-icons/lu";


export const ConfirmEmailPage = () => {
    return (
        <main className="h-full flex flex-col items-center justify-center mt-16 gap-6 px-4 text-center">
            <LuMailCheck className="w-16 h-16 text-green-600" />
            <h1 className="text-3xl md:text-4xl font-bold">
                ¡Verificá tu correo electrónico!
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
                Te enviamos un email con un enlace para verificar tu cuenta. Revisa tu bandeja de entrada o carpeta de spam.
            </p>
        </main>
    );
};
