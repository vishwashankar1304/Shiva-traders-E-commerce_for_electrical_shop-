
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAdminStats, getOrders, getProducts, getUsers } from "@/utils/dataUtils";
import { formatPrice } from "@/utils/formatters";
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Clock, 
  AlertTriangle 
} from "lucide-react";
import { Order } from "@/types";

interface StatsData {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalSales: number;
  pendingOrders: number;
  lowStockProducts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load dashboard stats
    const dashboardStats = getAdminStats();
    setStats(dashboardStats);
    
    // Load recent orders (last 5)
    const orders = getOrders();
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setRecentOrders(orders.slice(0, 5));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats cards */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-brand-blue">{formatPrice(stats.totalSales)}</div>
            <p className="text-xs text-gray-500">From {stats.totalOrders} orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-500">Registered users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">
              {stats.lowStockProducts > 0 && (
                <span className="text-amber-500">
                  {stats.lowStockProducts} out of stock
                </span>
              )}
              {stats.lowStockProducts === 0 && "All products in stock"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            <p className="text-xs text-gray-500">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              The latest {recentOrders.length} orders across the store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Order #{order.id.substring(6)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(order.totalPrice)}</p>
                      <p className={`text-sm ${
                        order.status === 'pending' ? 'text-amber-500' :
                        order.status === 'delivered' ? 'text-green-500' :
                        order.status === 'cancelled' ? 'text-red-500' :
                        'text-gray-500'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick stats */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Store performance at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">Total Orders</span>
                </div>
                <span className="font-medium">{stats.totalOrders}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">Registered Users</span>
                </div>
                <span className="font-medium">{stats.totalUsers}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">Products</span>
                </div>
                <span className="font-medium">{stats.totalProducts}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">Avg. Order Value</span>
                </div>
                <span className="font-medium">
                  {stats.totalOrders > 0
                    ? formatPrice(stats.totalSales / stats.totalOrders)
                    : "$0.00"}
                </span>
              </div>
              
              {stats.lowStockProducts > 0 && (
                <div className="flex items-center justify-between text-amber-500">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={16} />
                    <span className="text-sm font-medium">Low Stock Items</span>
                  </div>
                  <span className="font-medium">{stats.lowStockProducts}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
