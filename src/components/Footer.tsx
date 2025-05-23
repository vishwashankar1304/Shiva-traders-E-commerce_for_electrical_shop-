
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-brand-blue">Siva</span>
              <span className="text-brand-orange">Traders</span>
            </h3>
            <p className="text-gray-600">
              Quality Electronics at Affordable Prices
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-blue">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-blue">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-brand-blue">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-brand-blue">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-brand-blue">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-brand-blue">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Contact Us</h4>
            <address className="text-gray-600 not-italic">
              <p>1234 Electronic Avenue</p>
              <p>Tech City, TC 56789</p>
              <p>Email: info@sivatraders.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SivaTraders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
