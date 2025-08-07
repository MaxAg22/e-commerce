import type { OrderInput } from '../interfaces';
import { supabase } from '../supabase/client';

//! RPC FUNCTION READY
export const createOrder = async (order: OrderInput) => {
	// 1. Obtener el usuario autenticado
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error(errorUser.message);
	}

	const userId = data.user.id;

	const { data: orderData, error } = await supabase.rpc('create_order', {
		p_user_id: userId,  
		p_order: order as any       
	});

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return orderData;
};

export const getOrdersByCustomerId = async () => {
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', data.user.id)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error(customerError.message);
	}

	const customerId = customer.id;

	const { data: orders, error: ordersError } = await supabase
		.from('orders')
		.select('id, total_amount, status, created_at')
		.eq('customer_id', customerId)
		.order('created_at', {
			ascending: false,
		});

	if (ordersError) {
		console.log(ordersError);
		throw new Error(ordersError.message);
	}

	return orders;
};

export const getOrderById = async (orderId?: string) => {
	const { data, error: errorUser } = await supabase.auth.getUser();

	if (errorUser) {
		console.log(errorUser);
		throw new Error(errorUser.message);
	}

	const { data: customer, error: customerError } = await supabase
		.from('customers')
		.select('id')
		.eq('user_id', data.user.id)
		.single();

	if (customerError) {
		console.log(customerError);
		throw new Error(customerError.message);
	}

	const customerId = customer.id;

	const { data: order, error } = await supabase
		.from('orders')
		.select(
			'*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))'
		)
		.eq('customer_id', customerId)
		.eq('id', orderId?.toString() || "id")
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return {
		customer: {
			email: order?.customers?.email,
			full_name: order.customers?.full_name,
		},
		totalAmount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		address: {
			addressLine1: order.addresses?.address_line1,
			addressLine2: order.addresses?.address_line2,
			city: order.addresses?.city,
			state: order.addresses?.state,
			postalCode: order.addresses?.postal_code,
			country: order.addresses?.country,
		},
		orderItems: order.order_items.map(item => ({
			quantity: item.quantity,
			price: item.price,
			color_name: item.variants?.color_name,
			storage: item.variants?.storage,
			productName: item.variants?.products?.name,
			productImage: item.variants?.products?.images[0],
		})),
	};
};

//* ADMINISTRADOR
export const getAllOrders = async () => {
	const { data, error } = await supabase
		.from('orders')
		.select(
			'id, total_amount, status, created_at, customers(full_name, email)'
		)
		.order('created_at', { ascending: false });

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data;
};

export const updateOrderStatus = async ({
	id,
	status,
}: {
	id: number;
	status: string;
}) => {
	const { error } = await supabase
		.from('orders')
		.update({ status })
		.eq('id', id.toString());

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}
};

export const getOrderByIdAdmin = async (id: number) => {
	const { data: order, error } = await supabase
		.from('orders')
		.select(
			'*, addresses(*), customers(full_name, email), order_items(quantity, price, variants(color_name, storage, products(name, images)))'
		)
		.eq('id', id.toString())
		.single();

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return {
		customer: {
			email: order?.customers?.email,
			full_name: order.customers?.full_name,
		},
		totalAmount: order.total_amount,
		status: order.status,
		created_at: order.created_at,
		address: {
			addressLine1: order.addresses?.address_line1,
			addressLine2: order.addresses?.address_line2,
			city: order.addresses?.city,
			state: order.addresses?.state,
			postalCode: order.addresses?.postal_code,
			country: order.addresses?.country,
		},
		orderItems: order.order_items.map(item => ({
			quantity: item.quantity,
			price: item.price,
			color_name: item.variants?.color_name,
			storage: item.variants?.storage,
			productName: item.variants?.products?.name,
			productImage: item.variants?.products?.images[0],
		})),
	};
};