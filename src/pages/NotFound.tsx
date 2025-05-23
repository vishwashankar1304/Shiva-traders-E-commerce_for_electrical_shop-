
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-brand-blue mb-4">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/" className="flex items-center">
              <Home size={16} className="mr-2" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products" className="flex items-center">
              <ShoppingCart size={16} className="mr-2" /> Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
