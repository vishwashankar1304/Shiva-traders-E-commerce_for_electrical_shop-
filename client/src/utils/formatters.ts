
// Format price to have two decimal places and ₹ symbol for Indian Rupees
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Format date to be more readable
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Format order ID to be more readable
export const formatOrderId = (orderId: string): string => {
  if (orderId.startsWith('order_')) {
    return `#${orderId.replace('order_', '')}`;
  }
  return `#${orderId}`;
};
