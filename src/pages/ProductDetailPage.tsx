import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/formatters";
import { ShoppingCart, Plus, Minus, ArrowLeft, Star } from "lucide-react";
import ReviewSection from "@/components/ReviewSection";
import { productApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    if (id) {
      try {
        const fetchedProduct = await productApi.getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    }
  };

  const handleAddReview = async (rating: number, comment: string) => {
    if (!id || !user) return;

    try {
      await productApi.addReview(id, { rating, comment });
      toast({
        title: "Success",
        description: "Review added successfully",
      });
      loadProduct(); // Reload product to get updated reviews
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add review",
        variant: "destructive",
      });
    }
  };

  const handleLikeReview = async (reviewId: string) => {
    if (!id || !user) return;

    try {
      await productApi.likeReview(id, reviewId);
      loadProduct(); // Reload product to get updated review likes
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like review",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        asChild
        className="mb-6"
      >
        <Link to="/products" className="flex items-center">
          <ArrowLeft size={16} className="mr-2" /> Back to Products
        </Link>
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product details */}
        <div>
          <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-2xl font-bold text-brand-blue mb-6">
            {formatPrice(product.price)}
          </div>
          
          {/* Rating display */}
          {product.avgRating ? (
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.avgRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.avgRating.toFixed(1)} ({product.reviews?.length || 0} reviews)
              </span>
            </div>
          ) : (
            <div className="mb-6 text-sm text-gray-500">No ratings yet</div>
          )}
          
          <div className="mb-6 text-gray-700">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <span className="mx-4 font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} className="mr-2" /> 
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="mr-2">🚚</div>
                Free shipping over ₹1,000
              </div>
              <div className="flex items-center">
                <div className="mr-2">🔄</div>
                30-day returns
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <ReviewSection 
        productId={product.id}
        reviews={product.reviews || []}
        onAddReview={handleAddReview}
        onLikeReview={handleLikeReview}
      />
    </div>
  );
};

export default ProductDetailPage;
