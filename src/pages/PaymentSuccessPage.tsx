// PaymentSuccessPage.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verificando pago...");

  useEffect(() => {
    const paymentId = searchParams.get("payment_id");

    if (paymentId) {
      fetch(`/api/verify-payment?payment_id=${paymentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "approved") {
            setMessage("✅ ¡Pago aprobado! Gracias por tu compra.");
          } else {
            setMessage("⚠️ El pago no fue aprobado. Intenta nuevamente.");
          }
        })
        .catch(err => {
          console.error("Error verificando pago:", err);
          setMessage("❌ Hubo un error verificando el pago.");
        });
    } else {
      setMessage("❌ No se recibió ID de pago.");
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
};
