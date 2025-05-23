
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/formatters";
import { Review } from "@/types";
import { Star, StarHalf, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  onAddReview: (rating: number, comment: string) => void;
  onLikeReview: (reviewId: string) => void;
}

const ReviewSection = ({ productId, reviews, onAddReview, onLikeReview }: ReviewSectionProps) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to leave a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    onAddReview(rating, comment);
    setRating(0);
    setComment("");
  };

  const handleLike = (reviewId: string) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to like a review",
        variant: "destructive",
      });
      return;
    }
    onLikeReview(reviewId);
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
      
      {/* Add Review Form */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="text-lg font-medium mb-2">Rate this product</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setTempRating(star)}
                    onMouseLeave={() => setTempRating(0)}
                    className="text-2xl text-yellow-400 focus:outline-none"
                  >
                    {star <= (tempRating || rating) ? (
                      <Star className="fill-yellow-400" />
                    ) : (
                      <Star className="text-gray-300" />
                    )}
                  </button>
                ))}
                <span className="ml-2 text-gray-500">
                  {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="comment" className="block text-lg font-medium mb-2">
                Your Review
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="h-24"
              />
            </div>
            
            <Button type="submit" disabled={!user}>
              Submit Review
            </Button>
            {!user && (
              <p className="text-sm text-gray-500 mt-2">
                Please log in to submit a review
              </p>
            )}
          </form>
        </CardContent>
      </Card>
      
      {/* Review List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => {
                        if (i < Math.floor(review.rating)) {
                          return <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
                        } else if (i === Math.floor(review.rating) && review.rating % 1 !== 0) {
                          return <StarHalf key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
                        } else {
                          return <Star key={i} className="h-4 w-4 text-gray-300" />;
                        }
                      })}
                    </div>
                    <span className="font-medium">{review.userName}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                </div>
                
                <p className="my-3">{review.comment}</p>
                
                <div className="flex items-center mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleLike(review.id)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp size={14} />
                    <span>Helpful ({review.likes})</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-lg text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
