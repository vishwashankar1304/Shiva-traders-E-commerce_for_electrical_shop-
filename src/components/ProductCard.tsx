
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatters";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <span className="font-bold text-brand-blue">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="text-sm text-gray-500">
            {product.category}
          </span>
          <Button
            size="sm"
            className="gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
