import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatters";
import { Plus, Minus, Trash, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="max-w-md mx-auto">
          <p className="mb-8 text-lg">Your cart is empty.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items table */}
        <div className="lg:col-span-2">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableCaption>
                Your cart items
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
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
                          <div className="text-sm text-gray-500">
                            {item.product.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(item.product.price)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        
        {/* Order summary */}
        <div>
          <div className="bg-gray-50 rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Items ({cart.items.length}):</span>
                <span>{formatPrice(cart.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span>Free</span>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-brand-blue">{formatPrice(cart.totalPrice)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4"
              onClick={handleCheckout}
            >
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-gray-600 text-sm">
              <div className="mr-2">🔒</div>
              Secure Checkout
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <div className="mr-2">🚚</div>
              Free Shipping Over ₹1000
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <div className="mr-2">🔄</div>
              30-Day Return Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;