
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { getOrderById } from "@/utils/dataUtils";
import { formatPrice, formatDate, formatOrderId } from "@/utils/formatters";
import { Order, OrderStatus } from "@/types";
import { ArrowLeft, Clock, Truck, Check, X, Package, MapPin } from "lucide-react";

// Helper function to get badge variant based on order status
const getStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'processing':
      return 'default';
    case 'shipped':
      return 'default';
    case 'delivered':
      return 'secondary'; // Changed from 'success' to 'secondary'
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return <Clock size={18} />;
    case 'processing':
      return <Package size={18} />;
    case 'shipped':
      return <Truck size={18} />;
    case 'delivered':
      return <Check size={18} />;
    case 'cancelled':
      return <X size={18} />;
    default:
      return <Clock size={18} />;
  }
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (id) {
      const fetchedOrder = getOrderById(id);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">The order you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  // Ensure the user can only see their own orders
  if (user && order.userId !== user.id && !user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
        <p className="mb-6">You do not have permission to view this order.</p>
        <Button asChild>
          <Link to="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        asChild
        className="mb-6"
      >
        <Link to="/orders" className="flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Orders
        </Link>
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">Order {formatOrderId(order.id)}</h1>
      
      {/* Order status */}
      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              {getStatusIcon(order.status)}
              <Badge variant={getStatusBadgeVariant(order.status)} className="text-sm py-1">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <span className="text-sm text-gray-500">
                Last Updated: {formatDate(order.updatedAt)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Order details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <Link 
                              to={`/products/${item.product.id}`}
                              className="font-medium hover:text-brand-blue"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatPrice(item.product.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Order summary */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Order ID: {formatOrderId(order.id)}</p>
                <p className="text-sm text-gray-500">Placed On: {formatDate(order.createdAt)}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">{formatPrice(order.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">Free</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-brand-blue">{formatPrice(order.totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Shipping address */}
          {order.address && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.address.street}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>PIN: {order.address.pincode}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
