import { Product, Order, User, Review, Address } from "@/types";

// Seed initial product data
export const initializeProducts = () => {
  const existingProducts = localStorage.getItem('products');
  if (!existingProducts) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'LED Bulbs',
        description: 'Energy-efficient LED bulbs for home and commercial use',
        price: 299,
        imageUrl: '/lovable-uploads/images/products/led-bulbs.jpg',
        category: 'Lighting',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '2',
        name: 'LED Panel',
        description: 'Modern LED panel lights for ceiling installation',
        price: 1299,
        imageUrl: '/lovable-uploads/images/products/led-panel.jpg',
        category: 'Lighting',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '3',
        name: 'Ceiling Fan',
        description: 'High-performance ceiling fan with energy-efficient motor',
        price: 2499,
        imageUrl: '/lovable-uploads/images/products/ceiling-fan.jpg',
        category: 'Fans',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '4',
        name: 'Table Fan',
        description: 'Portable table fan with adjustable height and speed',
        price: 1499,
        imageUrl: '/lovable-uploads/images/products/table_fan.jpeg',
        category: 'Fans',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '5',
        name: 'Air Cooler',
        description: 'Powerful air cooler for large spaces',
        price: 8999,
        imageUrl: '/lovable-uploads/images/products/air-cooler.jpg',
        category: 'Cooling',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '6',
        name: 'Emergency Light',
        description: 'Battery backup emergency light with LED technology',
        price: 799,
        imageUrl: '/lovable-uploads/images/products/emergency-light.jpg',
        category: 'Lighting',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '7',
        name: 'Wall Lamp',
        description: 'Decorative wall lamp for indoor and outdoor use',
        price: 599,
        imageUrl: '/lovable-uploads/images/products/wall-lamp.jpeg',
        category: 'Lighting',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '8',
        name: 'Chandelier',
        description: 'Elegant chandelier for living room and dining area',
        price: 3499,
        imageUrl: '/lovable-uploads/images/products/chandelier.jpeg',
        category: 'Lighting',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '9',
        name: 'PVC Pipes',
        description: 'High-quality PVC pipes for plumbing and electrical work',
        price: 199,
        imageUrl: '/lovable-uploads/images/products/pvc-pipes.jpg',
        category: 'Plumbing',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '10',
        name: 'Wall Paint',
        description: 'Premium wall paint for interior and exterior surfaces',
        price: 899,
        imageUrl: '/lovable-uploads/images/products/wall-paint.jpg',
        category: 'Paint',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '11',
        name: 'Cement',
        description: 'High-strength cement for construction',
        price: 399,
        imageUrl: '/lovable-uploads/images/products/cement.jpg',
        category: 'Construction',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '12',
        name: 'Water Tank',
        description: 'Durable water storage tank for residential use',
        price: 2499,
        imageUrl: '/lovable-uploads/images/products/water-tank.jpg',
        category: 'Plumbing',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '13',
        name: 'Circuit Breaker',
        description: 'Safety circuit breaker for electrical protection',
        price: 499,
        imageUrl: '/lovable-uploads/images/products/circuit-breaker.jpeg',
        category: 'Electrical',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '14',
        name: 'Room Heater',
        description: 'Electric room heater with adjustable temperature',
        price: 1999,
        imageUrl: '/lovable-uploads/images/products/room-heater.jpeg',
        category: 'Heating',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '15',
        name: 'WiFi Smart Plug',
        description: 'Smart plug with WiFi connectivity for home automation',
        price: 699,
        imageUrl: '/lovable-uploads/images/products/wifi-plug.jpeg',
        category: 'Smart Home',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '16',
        name: 'Wall Clock',
        description: 'Decorative wall clock with silent movement',
        price: 399,
        imageUrl: '/lovable-uploads/images/products/wall-clock.jpeg',
        category: 'Home Decor',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '17',
        name: 'Wall Primer',
        description: 'High-quality wall primer for better paint adhesion',
        price: 599,
        imageUrl: '/lovable-uploads/images/products/wall-primer.jpeg',
        category: 'Paint',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '18',
        name: 'Steel Bars',
        description: 'Construction grade steel bars for reinforcement',
        price: 899,
        imageUrl: '/lovable-uploads/images/products/steel-bars.jpeg',
        category: 'Construction',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '19',
        name: 'Plumbing Tools',
        description: 'Professional plumbing tool set for repairs',
        price: 1499,
        imageUrl: '/lovable-uploads/images/products/plumbing-tool.jpeg',
        category: 'Tools',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '20',
        name: 'Shower Set',
        description: 'Complete shower set with mixer and accessories',
        price: 2499,
        imageUrl: '/lovable-uploads/images/products/shower-set.jpeg',
        category: 'Plumbing',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '21',
        name: 'Floor Tiles',
        description: 'Premium floor tiles for home and office',
        price: 49,
        imageUrl: '/lovable-uploads/images/products/floor-tiles.jpeg',
        category: 'Construction',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '22',
        name: 'Extension Board',
        description: 'Multi-socket extension board with surge protection',
        price: 399,
        imageUrl: '/lovable-uploads/images/products/extension-board.jpeg',
        category: 'Electrical',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '23',
        name: 'Modular Switch',
        description: 'Modern modular switches for home and office',
        price: 299,
        imageUrl: '/lovable-uploads/images/products/modular-switch.jpg',
        category: 'Electrical',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      },
      {
        id: '24',
        name: 'Exhaust Fan',
        description: 'Powerful exhaust fan for kitchen and bathroom',
        price: 899,
        imageUrl: '/lovable-uploads/images/products/exhaust-fan.jpeg',
        category: 'Ventilation',
        inStock: true,
        createdAt: new Date().toISOString(),
        reviews: [],
        avgRating: 0
      }
    ];
    localStorage.setItem('products', JSON.stringify(initialProducts));
  }
};

// Get all products
export const getProducts = (): Product[] => {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  return products;
};

// Get product by id
export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

// Add new product
export const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'reviews' | 'avgRating'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    reviews: [],
    avgRating: 0
  };
  
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  
  // Broadcast the product update to all tabs/windows
  window.dispatchEvent(new CustomEvent('productsUpdated', { detail: products }));
  
  return newProduct;
};

// Update product
export const updateProduct = (product: Product): Product => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index !== -1) {
    products[index] = product;
    localStorage.setItem('products', JSON.stringify(products));
    
    // Broadcast the product update to all tabs/windows
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: products }));
  }
  
  return product;
};

// Delete product
export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length < products.length) {
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    
    // Broadcast the product update to all tabs/windows
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: filteredProducts }));
    
    return true;
  }
  
  return false;
};

// Add a review to a product
export const addReview = (
  productId: string, 
  reviewData: { userId: string; userName: string; rating: number; comment: string }
): Review | null => {
  const products = getProducts();
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) return null;
  
  // Create review
  const review: Review = {
    id: Date.now().toString(),
    userId: reviewData.userId,
    userName: reviewData.userName,
    rating: reviewData.rating,
    comment: reviewData.comment,
    createdAt: new Date().toISOString(),
    likes: 0
  };
  
  // Add review to product
  if (!products[productIndex].reviews) {
    products[productIndex].reviews = [];
  }
  
  products[productIndex].reviews?.push(review);
  
  // Update average rating
  const reviews = products[productIndex].reviews || [];
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  products[productIndex].avgRating = totalRating / reviews.length;
  
  localStorage.setItem('products', JSON.stringify(products));
  return review;
};

// Like a review
export const likeReview = (productId: string, reviewId: string): boolean => {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product || !product.reviews) return false;
  
  const reviewIndex = product.reviews.findIndex(r => r.id === reviewId);
  
  if (reviewIndex === -1) return false;
  
  product.reviews[reviewIndex].likes += 1;
  localStorage.setItem('products', JSON.stringify(products));
  
  return true;
};

// Get all orders
export const getOrders = (): Order[] => {
  return JSON.parse(localStorage.getItem('orders') || '[]');
};

// Get order by id
export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === id);
};

// Get orders by user id
export const getOrdersByUserId = (userId: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.userId === userId);
};

// Add new order with address
export const addOrder = (
  userId: string, 
  items: Order['items'], 
  totalPrice: number,
  address: Address
): Order => {
  const orders = getOrders();
  
  const newOrder: Order = {
    id: `order_${Date.now()}`,
    userId,
    items,
    totalPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    address
  };
  
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  return newOrder;
};

// Update order status
export const updateOrderStatus = (id: string, status: Order['status']): Order | null => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) return null;
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('orders', JSON.stringify(orders));
  return orders[orderIndex];
};

// Get all users (for admin)
export const getUsers = (): User[] => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
};

// Get stats for admin dashboard
export const getAdminStats = () => {
  const users = getUsers();
  const orders = getOrders();
  const products = getProducts();

  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const lowStockProducts = products.filter(product => product.inStock === false || product.stock === 0).length;

  return {
    totalUsers: users.length,
    totalOrders: orders.length,
    totalProducts: products.length,
    totalSales,
    pendingOrders,
    lowStockProducts
  };
};
