import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { productApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await productApi.getAllProducts();
        // Get first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load featured products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div>Loading featured products...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-brand-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Quality Electronics at{" "}
              <span className="text-brand-yellow">Affordable Prices</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover our wide range of electronics and home improvement products with same-day delivery.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                asChild
                className="bg-brand-orange hover:bg-orange-600 text-white"
              >
                <Link to="/products">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
              alt="Electronics Showcase"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/products?category=Laptops" className="group">
              <div className="bg-gray-100 rounded-lg p-8 text-center transition-all duration-300 hover:bg-brand-blue/10 hover:shadow-md">
                <div className="text-4xl mb-4 text-brand-blue">💻</div>
                <h3 className="font-semibold group-hover:text-brand-blue">Laptops</h3>
              </div>
            </Link>
            <Link to="/products?category=Smartphones" className="group">
              <div className="bg-gray-100 rounded-lg p-8 text-center transition-all duration-300 hover:bg-brand-blue/10 hover:shadow-md">
                <div className="text-4xl mb-4 text-brand-blue">📱</div>
                <h3 className="font-semibold group-hover:text-brand-blue">Smartphones</h3>
              </div>
            </Link>
            <Link to="/products?category=Audio" className="group">
              <div className="bg-gray-100 rounded-lg p-8 text-center transition-all duration-300 hover:bg-brand-blue/10 hover:shadow-md">
                <div className="text-4xl mb-4 text-brand-blue">🎧</div>
                <h3 className="font-semibold group-hover:text-brand-blue">Audio</h3>
              </div>
            </Link>
            <Link to="/products?category=TVs" className="group">
              <div className="bg-gray-100 rounded-lg p-8 text-center transition-all duration-300 hover:bg-brand-blue/10 hover:shadow-md">
                <div className="text-4xl mb-4 text-brand-blue">📺</div>
                <h3 className="font-semibold group-hover:text-brand-blue">TVs</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="link" asChild>
              <Link to="/products" className="flex items-center">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* USP Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-brand-blue">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On all orders over $50</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-brand-blue">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 text-brand-blue">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
