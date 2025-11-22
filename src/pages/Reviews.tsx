import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, ThumbsUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

const Reviews = () => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      author: 'John Doe',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent product!',
      content: 'This product exceeded my expectations. Quality is top-notch and delivery was fast. Highly recommended!',
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      author: 'Jane Smith',
      rating: 4,
      date: '2024-01-10',
      title: 'Good value for money',
      content: 'Overall satisfied with the purchase. The product works as described. Shipping could have been faster.',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      author: 'Mike Johnson',
      rating: 5,
      date: '2024-01-05',
      title: 'Amazing quality',
      content: 'Best purchase I\'ve made this year. The quality is outstanding and customer service was very helpful.',
      verified: false,
      helpful: 15
    }
  ]);

  const averageRating = 4.5;
  const totalReviews = 247;
  const ratingDistribution = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Customer Reviews</h1>
            <p className="text-muted-foreground">
              Read what our customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Rating Summary */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">{averageRating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {totalReviews} reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {ratingDistribution.map((dist) => (
                    <div key={dist.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{dist.stars}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress value={dist.percentage} className="flex-1" />
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {dist.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6">Write a Review</Button>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {review.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.author}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
