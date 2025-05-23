import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/formatters";
import { ArrowLeft, CreditCard, IndianRupee } from "lucide-react";

interface AddressFormData {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

type PaymentMethod = "razorpay" | "cash_on_delivery";

const CheckoutPage = () => {
  const { cart, checkout } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  
  const [addressData, setAddressData] = useState<AddressFormData>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, street, city, state, pincode, phone } = addressData;
    if (!fullName || !street || !city || !state || !pincode || !phone) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all address fields",
      });
      return false;
    }
    
    // Basic pincode validation (6 digits for India)
    if (!/^\d{6}$/.test(pincode)) {
      toast({
        variant: "destructive",
        title: "Invalid pincode",
        description: "Please enter a valid 6-digit pincode",
      });
      return false;
    }
    
    // Basic phone validation (10 digits for India)
    if (!/^\d{10}$/.test(phone)) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
      });
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // For Razorpay payment method, we would typically integrate with their API here
    // For this example, we'll just simulate a successful payment
    
    setTimeout(() => {
      const address = {
        ...addressData
      };
      
      const orderId = checkout(address, paymentMethod);
      setIsProcessing(false);
      
      if (orderId) {
        navigate(`/orders/${orderId}`);
      }
    }, 1000);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cart.items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/cart")}
        className="mb-6"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Cart
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address and Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter full name"
                    value={addressData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="10-digit phone number"
                    value={addressData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  placeholder="Enter street address"
                  value={addressData.street}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    value={addressData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    value={addressData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    placeholder="Enter 6-digit pincode"
                    value={addressData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex items-center cursor-pointer">
                    <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Pay Online (Razorpay)</div>
                      <div className="text-sm text-gray-500">Credit/Debit Card, UPI, Netbanking</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="cash_on_delivery" id="cod" />
                  <Label htmlFor="cod" className="flex items-center cursor-pointer">
                    <IndianRupee className="mr-2 h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when your order arrives</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-brand-blue">{formatPrice(cart.totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-gray-600 text-sm">
              <div className="mr-2">🔒</div>
              Secure Checkout
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <div className="mr-2">🚚</div>
              Free Shipping Over ₹1000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;