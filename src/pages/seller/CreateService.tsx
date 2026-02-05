import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceImage } from "@/components/ServiceImage";
import { formatCurrency } from "@/lib/currency";
import {
  ArrowLeft,
  Upload,
  Save,
  Eye,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const categories = [
  { id: "web-development", name: "Web Development" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "content-writing", name: "Content Writing" },
  { id: "video-editing", name: "Video Editing" },
  { id: "data-analysis", name: "Data Analysis" },
  { id: "social-media", name: "Social Media" },
  { id: "mobile-development", name: "Mobile Development" },
  { id: "digital-marketing", name: "Digital Marketing" },
];

interface ServiceFormData {
  title: string;
  category: string;
  price: string;
  deliveryDays: string;
  description: string;
  image: string;
}

const CreateService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: "",
    price: "",
    deliveryDays: "",
    description: "",
    image: "",
  });

  const handleInputChange = (field: keyof ServiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageUploading(true);

    try {
      // In a real app, this would upload to Supabase Storage
      // For now, we'll use a placeholder URL
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
      
      const mockImageUrl = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center&t=${Date.now()}`;
      handleInputChange('image', mockImageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Please enter a service title");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (!formData.deliveryDays || parseInt(formData.deliveryDays) <= 0) {
      toast.error("Please enter valid delivery days");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a service description");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - will be replaced with real Supabase call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(isEditing ? "Service updated successfully" : "Service created successfully");
      navigate("/seller/services");
    } catch (error) {
      toast.error("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const pricePreview = formData.price ? formatCurrency(parseFloat(formData.price)) : "₹0";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <Link
              to="/seller/services"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {isEditing ? "Edit Service" : "Create New Service"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update your service details" : "Add a new service to your portfolio"}
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-8">
          <div className="quid-container">
            <div className="mx-auto max-w-4xl">
              <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Service Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Service Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Professional Website Development"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="bg-secondary/50"
                        />
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="bg-secondary/50">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Price and Delivery */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="price">Starting Price (₹) *</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="5000"
                            min="100"
                            step="100"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            className="bg-secondary/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryDays">Delivery Time (Days) *</Label>
                          <Input
                            id="deliveryDays"
                            type="number"
                            placeholder="7"
                            min="1"
                            max="30"
                            value={formData.deliveryDays}
                            onChange={(e) => handleInputChange('deliveryDays', e.target.value)}
                            className="bg-secondary/50"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Service Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your service in detail. What will you deliver? What technologies do you use? What's included?"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="min-h-[150px] bg-secondary/50"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Image Upload */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Service Image</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current Image */}
                      {formData.image && (
                        <div className="rounded-lg overflow-hidden">
                          <ServiceImage
                            src={formData.image}
                            alt="Service preview"
                            className="h-48 w-full"
                          />
                        </div>
                      )}

                      {/* Upload Button */}
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={imageUploading}
                        />
                        <Label
                          htmlFor="image-upload"
                          className="cursor-pointer"
                        >
                          <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            disabled={imageUploading}
                            asChild
                          >
                            <span>
                              {imageUploading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              {imageUploading ? "Uploading..." : "Upload Image"}
                            </span>
                          </Button>
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          JPG, PNG, WebP (Max 5MB)
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                  <Card className="glass-card sticky top-24">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Service Preview */}
                      <div className="rounded-lg border border-border/50 overflow-hidden">
                        <ServiceImage
                          src={formData.image}
                          alt={formData.title || "Service preview"}
                          className="h-32"
                        />
                        <div className="p-3">
                          <span className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {formData.category ? categories.find(c => c.id === formData.category)?.name : "Category"}
                          </span>
                          <h3 className="mb-2 font-display font-semibold text-foreground line-clamp-2">
                            {formData.title || "Service Title"}
                          </h3>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {formData.deliveryDays ? `${formData.deliveryDays} days` : "Delivery time"}
                            </span>
                            <span className="font-bold text-foreground">
                              {pricePreview}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          variant="hero"
                          className="w-full gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          {loading 
                            ? (isEditing ? "Updating..." : "Creating...") 
                            : (isEditing ? "Update Service" : "Create Service")
                          }
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate("/seller/services")}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreateService;