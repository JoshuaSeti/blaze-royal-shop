import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Shirt, 
  Home as HomeIcon, 
  Book, 
  Gamepad, 
  Car,
  ArrowLeft,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: Smartphone, color: 'bg-blue-100 text-blue-600', count: 1250 },
    { id: 'computers', name: 'Computers', icon: Laptop, color: 'bg-purple-100 text-purple-600', count: 840 },
    { id: 'audio', name: 'Audio & Headphones', icon: Headphones, color: 'bg-green-100 text-green-600', count: 420 },
    { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'bg-pink-100 text-pink-600', count: 2100 },
    { id: 'home', name: 'Home & Garden', icon: HomeIcon, color: 'bg-orange-100 text-orange-600', count: 890 },
    { id: 'books', name: 'Books', icon: Book, color: 'bg-amber-100 text-amber-600', count: 650 },
    { id: 'gaming', name: 'Gaming', icon: Gamepad, color: 'bg-red-100 text-red-600', count: 320 },
    { id: 'automotive', name: 'Automotive', icon: Car, color: 'bg-gray-100 text-gray-600', count: 180 },
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold mb-2">Browse Categories</h1>
            <p className="text-muted-foreground mb-6">
              Discover products across all our categories
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={32} />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>
                      {category.count.toLocaleString()} products
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full" variant="outline">
                      Browse {category.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCategories.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No categories found matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Featured Categories */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    Latest Smartphones
                  </CardTitle>
                  <CardDescription>
                    Discover the newest mobile technology
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Explore Now</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-purple-600" />
                    Gaming Laptops
                  </CardTitle>
                  <CardDescription>
                    High-performance machines for gamers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Shop Gaming</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5 text-pink-600" />
                    Summer Fashion
                  </CardTitle>
                  <CardDescription>
                    Trending styles for the season
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Shop Fashion</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;