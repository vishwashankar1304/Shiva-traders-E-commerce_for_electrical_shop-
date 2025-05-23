import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-brand-blue">Siva</span>
              <span className="text-brand-orange">Traders</span>
            </span>
          </Link>

          {/* Search form on desktop */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-r-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none">
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
              }
            >
              Contact
            </NavLink>

            <NavLink 
              to="/cart" 
              className={({ isActive }) => 
                isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
              }
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.items.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </NavLink>

            {user ? (
              <>
                {isAdmin && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                      isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
                    }
                  >
                    Admin
                  </NavLink>
                )}
                <NavLink 
                  to="/orders" 
                  className={({ isActive }) => 
                    isActive ? "text-brand-blue font-medium" : "text-gray-600 hover:text-brand-blue"
                  }
                >
                  Orders
                </NavLink>
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-600" />
                  <span className="text-sm font-medium">{user.name}</span>
                  <Button variant="link" size="sm" onClick={logout} className="text-sm">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Signup</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <NavLink to="/cart" className="relative">
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </NavLink>
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-r-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">
              <Search size={18} />
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto py-3 px-4 space-y-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
              }
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
              }
              onClick={toggleMobileMenu}
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
              }
              onClick={toggleMobileMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
              }
              onClick={toggleMobileMenu}
            >
              Contact
            </NavLink>
            
            {user ? (
              <>
                {isAdmin && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                      isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
                    }
                    onClick={toggleMobileMenu}
                  >
                    Admin Dashboard
                  </NavLink>
                )}
                <NavLink 
                  to="/orders" 
                  className={({ isActive }) => 
                    isActive ? "block text-brand-blue font-medium" : "block text-gray-600"
                  }
                  onClick={toggleMobileMenu}
                >
                  My Orders
                </NavLink>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-600 mr-2" />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Button variant="link" size="sm" onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}>
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="pt-2 flex flex-col space-y-2 border-t border-gray-100">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup" onClick={toggleMobileMenu}>Signup</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
