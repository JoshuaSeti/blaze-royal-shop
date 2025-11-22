import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Top 10 Tech Gadgets for 2024',
      excerpt: 'Discover the must-have tech gadgets that are revolutionizing the way we live and work in 2024.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Technology',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Sustainable Shopping: A Complete Guide',
      excerpt: 'Learn how to make eco-friendly choices while shopping online and reduce your carbon footprint.',
      author: 'Michael Chen',
      date: '2024-01-12',
      category: 'Lifestyle',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Fashion Trends for Spring 2024',
      excerpt: 'Get ahead of the curve with our comprehensive guide to spring fashion trends and styling tips.',
      author: 'Emma Davis',
      date: '2024-01-10',
      category: 'Fashion',
      readTime: '6 min read'
    },
    {
      id: '4',
      title: 'How to Build the Perfect Home Office',
      excerpt: 'Create a productive workspace at home with our expert tips on ergonomics, lighting, and organization.',
      author: 'David Lee',
      date: '2024-01-08',
      category: 'Home & Office',
      readTime: '7 min read'
    },
    {
      id: '5',
      title: 'Smart Home Automation for Beginners',
      excerpt: 'A beginner-friendly guide to transforming your home into a smart home with the latest devices.',
      author: 'Lisa Anderson',
      date: '2024-01-05',
      category: 'Technology',
      readTime: '10 min read'
    },
    {
      id: '6',
      title: 'The Ultimate Gift Guide 2024',
      excerpt: 'Find the perfect gift for everyone on your list with our curated selection of unique products.',
      author: 'James Wilson',
      date: '2024-01-03',
      category: 'Gift Ideas',
      readTime: '12 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['All', 'Technology', 'Fashion', 'Lifestyle', 'Home & Office', 'Gift Ideas'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryFilteredPosts = selectedCategory === 'All' 
    ? filteredPosts 
    : filteredPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
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
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <BookOpen className="h-10 w-10" />
              Gula Blog
            </h1>
            <p className="text-muted-foreground text-lg">
              Tips, trends, and insights for smart shopping
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          {categoryFilteredPosts.length > 0 && (
            <Card className="mb-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video bg-muted rounded-lg" />
                <CardContent className="p-6 flex flex-col justify-center">
                  <Badge className="w-fit mb-3">{categoryFilteredPosts[0].category}</Badge>
                  <h2 className="text-3xl font-bold mb-3">{categoryFilteredPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-4">{categoryFilteredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {categoryFilteredPosts[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(categoryFilteredPosts[0].date).toLocaleDateString()}
                    </span>
                  </div>
                  <Button className="w-fit gap-2">
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Blog Posts Grid */}
          {categoryFilteredPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No articles found</h2>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFilteredPosts.slice(1).map((post) => (
                <Card key={post.id} className="flex flex-col">
                  <div className="aspect-video bg-muted" />
                  <CardHeader>
                    <Badge className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" className="w-full gap-2">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Newsletter */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Subscribe to Our Newsletter</CardTitle>
              <CardDescription>
                Get the latest articles and insights delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 max-w-md">
                <Input type="email" placeholder="Enter your email" />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
