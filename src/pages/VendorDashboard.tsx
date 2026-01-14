import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, Plus, Store, Package } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { VendorLayout } from "@/components/VendorLayout";
// import { toast } from 'react-hot-toast';

interface ProductFormData {
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  images: FileList | null;
}

const VendorDashboard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const navigate = useNavigate();
  
  const form = useForm<ProductFormData>();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Automotive"
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

   // or your preferred toast library

const onSubmit = async (formData: ProductFormData) => {
  setIsSubmitting(true);

  // We wrap the whole logic in a toast.promise to give the user immediate feedback
  const saveProductAction = async () => {
    const imageUrls: string[] = [];

    // 1. Handle Image Uploads
    if (selectedImages.length > 0) {
      for (const file of selectedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product_images')
          .upload(filePath, file);

        // Throw the error so the toast.promise catches it
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('product_images')
          .getPublicUrl(filePath);
          
        imageUrls.push(urlData.publicUrl);
      }
    }

    // 2. Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("You must be logged in to add products");

    // 3. Save Product Data
    const { error } = await supabase
      .from('products')
      .insert({
        name: formData.name,
        price: Number(formData.price), // Ensure it's a number for the DB
        stock_quantity: Number(formData.quantity),
        category: formData.category,
        description: formData.description,
        image_url: imageUrls[0] || null,
        vendor_id: user.id,
      });

    if (error) throw new Error(`Database error: ${error.message}`);
    
    return "Product listed successfully!";
  };

  try {
    // This triggers the loading toast and waits for success/error
    await toast.promise(saveProductAction(), {
      loading: 'Uploading product details...',
      success: (msg) => msg,
      error: (err) => `${err.message}`,
    });
    
    // Optional: Reset form or redirect here on success
  } catch (err) {
    // The error is already handled by toast.promise
    console.error("Submission crash:", err);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <VendorLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Add and manage your products</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="default"
              className="bg-gradient-to-r from-primary to-primary-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/vendor/products')}
              className="border-primary/20 hover:bg-primary/5"
            >
              <Package className="h-4 w-4 mr-2" />
              Manage Products
            </Button>
          </div>
        </div>

        <Card className="border-primary/10 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Product
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new product to your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Product name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter product name" 
                            {...field}
                            className="focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="focus:ring-primary/20">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    rules={{ 
                      required: "Price is required",
                      min: { value: 0.01, message: "Price must be greater than 0" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="quantity"
                    rules={{ 
                      required: "Quantity is required",
                      min: { value: 1, message: "Quantity must be at least 1" }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            className="focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your product..."
                          className="min-h-[100px] focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      PNG, JPG, GIF up to 10MB (Max 5 images)
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="pointer-events-none">
                        Choose Files
                      </Button>
                    </Label>
                  </div>

                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-primary-hover"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
    </VendorLayout>
  );
};

export default VendorDashboard;