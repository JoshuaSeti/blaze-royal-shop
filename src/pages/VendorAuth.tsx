import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Store, ArrowLeft, Upload, CheckCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    // Stage 1: General Information
    fullName: '',
    storeName: '',
    vendorType: 'individual', // 'individual' or 'company'
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    
    // Stage 2: Documentation
    incorporationDocs: null as File | null,
    bankReference: null as File | null,
    nrcNumber: '',
    nrcImages: [] as File[],
    
    // Stage 3: Store Customization
    logo: null as File | null,
    banner: null as File | null,
    mainCategory: '',
    subCategories: [] as string[],
    pricingTier: ''
  });

  const { signUpVendor, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const zambianProvinces = [
    'Central Province',
    'Copperbelt Province', 
    'Eastern Province',
    'Luapula Province',
    'Lusaka Province',
    'Muchinga Province',
    'Northern Province',
    'North-Western Province',
    'Southern Province',
    'Western Province'
  ];

  const productCategories = [
    { main: 'Electronics', subs: ['Phones', 'Laptops', 'Accessories', 'Gaming'] },
    { main: 'Fashion', subs: ['Clothing', 'Shoes', 'Bags', 'Jewelry'] },
    { main: 'Home & Garden', subs: ['Furniture', 'Kitchen', 'Decor', 'Tools'] },
    { main: 'Sports', subs: ['Equipment', 'Apparel', 'Outdoor', 'Fitness'] },
    { main: 'Books', subs: ['Fiction', 'Education', 'Children', 'Professional'] },
    { main: 'Beauty', subs: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance'] }
  ];

  const pricingTiers = [
    { id: 'basic', name: 'Basic', description: '2% commission on sales' },
    { id: 'standard', name: 'Standard', description: '3% commission + premium features' },
    { id: 'premium', name: 'Premium', description: '5% commission + all features' }
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(form.fullName && form.storeName && form.vendorType && form.phone && 
                 form.email && form.password && form.confirmPassword && form.location &&
                 form.password === form.confirmPassword);
      case 2:
        const basicDocsValid = !!(form.nrcNumber && form.nrcImages.length >= 1);
        if (form.vendorType === 'company') {
          return basicDocsValid && !!(form.incorporationDocs && form.bankReference);
        }
        return basicDocsValid;
      case 3:
        return !!(form.logo && form.mainCategory);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast({
        variant: 'destructive',
        title: 'Please complete all required fields',
        description: 'Make sure all required information is filled out correctly.',
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (field: string, files: FileList | null, multiple = false) => {
    if (!files) return;
    
    if (multiple) {
      const fileArray = Array.from(files);
      if (field === 'nrcImages' && fileArray.length > 2) {
        toast({
          variant: 'destructive',
          title: 'Too many files',
          description: 'Please upload maximum 2 NRC images.',
        });
        return;
      }
      setForm(prev => ({ ...prev, [field]: fileArray }));
    } else {
      setForm(prev => ({ ...prev, [field]: files[0] }));
    }
  };

  const handleCategoryChange = (category: string, isSubCategory = false) => {
    if (isSubCategory) {
      setForm(prev => ({
        ...prev,
        subCategories: prev.subCategories.includes(category)
          ? prev.subCategories.filter(c => c !== category)
          : [...prev.subCategories, category]
      }));
    } else {
      setForm(prev => ({ ...prev, mainCategory: category, subCategories: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      toast({
        variant: 'destructive',
        title: 'Please complete all required fields',
        description: 'Make sure all required information is filled out correctly.',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUpVendor(
      form.email,
      form.password,
      form.fullName,
      form.storeName
    );

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Vendor registration failed',
        description: error.message,
      });
    } else {
      toast({
        title: 'Vendor account created!',
        description: 'Please check your email to verify your account.',
      });
    }

    setIsLoading(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name *</Label>
              <Input
                id="storeName"
                type="text"
                placeholder="Enter your store name"
                value={form.storeName}
                onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Vendor Type *</Label>
              <RadioGroup
                value={form.vendorType}
                onValueChange={(value) => setForm({ ...form, vendorType: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">Individual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company">Company</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your business email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Choose a secure password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Repeat Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
              {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Location *</Label>
              <Select value={form.location} onValueChange={(value) => setForm({ ...form, location: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your province" />
                </SelectTrigger>
                <SelectContent>
                  {zambianProvinces.map((province) => (
                    <SelectItem key={province} value={province}>{province}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {form.vendorType === 'company' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="incorporationDocs">Incorporation Documents *</Label>
                  <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                    <input
                      id="incorporationDocs"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('incorporationDocs', e.target.files)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => document.getElementById('incorporationDocs')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {form.incorporationDocs ? form.incorporationDocs.name : 'Upload Incorporation Documents'}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankReference">Bank Reference Letter *</Label>
                  <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                    <input
                      id="bankReference"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('bankReference', e.target.files)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => document.getElementById('bankReference')?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {form.bankReference ? form.bankReference.name : 'Upload Bank Reference Letter'}
                    </Button>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="nrcNumber">NRC Number *</Label>
              <Input
                id="nrcNumber"
                type="text"
                placeholder="Enter NRC number"
                value={form.nrcNumber}
                onChange={(e) => setForm({ ...form, nrcNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nrcImages">NRC Image Uploads *</Label>
              <p className="text-sm text-muted-foreground">
                Photos must be clear and must have both sides of the NRC (maximum 2 photos)
              </p>
              <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                <input
                  id="nrcImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload('nrcImages', e.target.files, true)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => document.getElementById('nrcImages')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {form.nrcImages.length > 0 ? 
                    `${form.nrcImages.length} image(s) selected` : 
                    'Upload NRC Images'
                  }
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Upload *</Label>
              <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('logo', e.target.files)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => document.getElementById('logo')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {form.logo ? form.logo.name : 'Upload Store Logo'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner">Store Banner Upload</Label>
              <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                <input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('banner', e.target.files)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => document.getElementById('banner')?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {form.banner ? form.banner.name : 'Upload Store Banner (Optional)'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Main Category *</Label>
              <Select value={form.mainCategory} onValueChange={(value) => handleCategoryChange(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category.main} value={category.main}>{category.main}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {form.mainCategory && (
              <div className="space-y-2">
                <Label>Sub-categories (Optional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {productCategories
                    .find(cat => cat.main === form.mainCategory)?.subs
                    .map((sub) => (
                      <div key={sub} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={sub}
                          checked={form.subCategories.includes(sub)}
                          onChange={() => handleCategoryChange(sub, true)}
                          className="rounded border-border"
                        />
                        <Label htmlFor={sub} className="text-sm">{sub}</Label>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Pricing Tier (Optional)</Label>
              <RadioGroup
                value={form.pricingTier}
                onValueChange={(value) => setForm({ ...form, pricingTier: value })}
              >
                {pricingTiers.map((tier) => (
                  <div key={tier.id} className="flex items-center space-x-2 p-3 border rounded-md">
                    <RadioGroupItem value={tier.id} id={tier.id} />
                    <div>
                      <Label htmlFor={tier.id} className="font-medium">{tier.name}</Label>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2 justify-center mb-4">
            <Store className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Become a Vendor</CardTitle>
          </div>
          <CardDescription className="text-center">
            Join our marketplace and start selling your products
          </CardDescription>
          
          {/* Progress Indicator */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className={currentStep >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                General Information
              </span>
              <span className={currentStep >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                Documentation
              </span>
              <span className={currentStep >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                Store Customization
              </span>
            </div>
            <Progress value={(currentStep / 3) * 100} className="w-full" />
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Vendor Account
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/auth" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to regular sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorAuth;