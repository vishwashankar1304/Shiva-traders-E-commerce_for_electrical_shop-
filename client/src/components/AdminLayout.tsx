
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-6">
            <span className="text-brand-blue">Admin </span>
            <span className="text-brand-orange">Panel</span>
          </h2>
          
          <nav className="space-y-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              <BarChart size={18} className="mr-3" />
              Dashboard
            </NavLink>
            
            <NavLink
              to="/admin/products"
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              <Package size={18} className="mr-3" />
              Products
            </NavLink>
            
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              <ShoppingCart size={18} className="mr-3" />
              Orders
            </NavLink>
            
            <NavLink
              to="/admin/users"
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              <Users size={18} className="mr-3" />
              Users
            </NavLink>
            
            <div className="pt-6 mt-6 border-t border-gray-700">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start p-3 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <Settings size={18} className="mr-3" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-grow bg-gray-50">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
