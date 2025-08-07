export const purchaseTicket = async (items: any[], orderId: string) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mercadopago/preference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({items, orderId}),
        });

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error purchasing ticket:", error);
        throw error;
    }
};