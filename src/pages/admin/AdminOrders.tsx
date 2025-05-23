
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getOrders, getOrderById, updateOrderStatus } from "@/utils/dataUtils";
import { Order, OrderStatus } from "@/types";
import { formatPrice, formatOrderId, formatDate } from "@/utils/formatters";
import { Search, Eye } from "lucide-react";

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

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("pending");
  
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const fetchedOrders = getOrders();
    // Sort by date (newest first)
    fetchedOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(fetchedOrders);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const viewOrderDetails = (orderId: string) => {
    const order = getOrderById(orderId);
    if (order) {
      setCurrentOrder(order);
      setSelectedStatus(order.status);
      setIsViewDialogOpen(true);
    }
  };

  const handleUpdateStatus = () => {
    if (!currentOrder) return;
    
    try {
      const updatedOrder = updateOrderStatus(currentOrder.id, selectedStatus);
      
      if (updatedOrder) {
        toast({
          title: "Order status updated",
          description: `Order ${formatOrderId(currentOrder.id)} status changed to ${selectedStatus}`,
        });
        
        loadOrders();
        setIsViewDialogOpen(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0"
            />
            <div className="px-3 text-gray-400">
              <Search size={18} />
            </div>
          </div>
        </div>
        
        <div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {formatOrderId(order.id)}
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewOrderDetails(order.id)}
                    >
                      <Eye size={16} className="mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {currentOrder && (
                <div className="flex justify-between">
                  <span>{formatOrderId(currentOrder.id)}</span>
                  <span>{formatDate(currentOrder.createdAt)}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <>
              <div className="space-y-6">
                {/* Shipping Address */}
                {currentOrder.address && (
                  <div className="border p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm">
                      <p>{currentOrder.address.street}</p>
                      <p>{currentOrder.address.city}, {currentOrder.address.state}</p>
                      <p>PIN: {currentOrder.address.pincode}</p>
                    </div>
                  </div>
                )}
                
                {/* Order items */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Items</h4>
                  <div className="space-y-2">
                    {currentOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-2">
                            <img 
                              src={item.product.imageUrl} 
                              alt={item.product.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <div className="font-medium">{item.product.name}</div>
                            <div className="text-xs text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div>{formatPrice(item.product.price * item.quantity)}</div>
                          <div className="text-xs text-gray-500">
                            {formatPrice(item.product.price)} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(currentOrder.totalPrice)}</span>
                  </div>
                </div>
                
                {/* Update status */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Update Status</h4>
                  <div className="flex space-x-4">
                    <div className="flex-grow">
                      <Select
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleUpdateStatus}>Update Status</Button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
