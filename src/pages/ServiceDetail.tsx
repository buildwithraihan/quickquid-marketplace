import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Star,
  Clock,
  Shield,
  CheckCircle,
  MessageSquare,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { ServiceImage } from "@/components/ServiceImage";
import { formatCurrency } from "@/lib/currency";

// Mock data - will be replaced with real data from Supabase
const mockService = {
  id: "1",
  title: "Professional Website Development",
  description: `I will create a modern, responsive website tailored to your needs. With 3+ years of experience in web development, I specialize in:

• Clean, professional designs
• Mobile-responsive layouts
• Fast loading speeds
• SEO-friendly structure
• User-friendly navigation

Technologies I use: React, Next.js, Tailwind CSS, TypeScript, Node.js

I provide complete source code, hosting setup assistance, and post-delivery support.`,
  category: "Web Development",
  price: 12500, // ₹12,500 (converted from $150)
  rating: 4.9,
  reviewCount: 24,
  deliveryDays: 7,
  revisions: 3,
  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center",
  seller: {
    id: "seller-1",
    name: "Alex Chen",
    avatar: null,
    university: "MIT",
    verified: true,
    trustScore: 98,
    completedOrders: 45,
    responseTime: "1 hour",
    memberSince: "2024",
  },
  proofOfWork: [
    "Portfolio website for local business",
    "E-commerce store with 50+ products",
    "SaaS landing page with animations",
  ],
  reviews: [
    {
      id: "r1",
      author: "John D.",
      rating: 5,
      comment: "Excellent work! Alex delivered exactly what I needed, on time and with great communication.",
      date: "2 weeks ago",
    },
    {
      id: "r2",
      author: "Maria S.",
      rating: 5,
      comment: "Very professional and skilled. The website exceeded my expectations.",
      date: "1 month ago",
    },
  ],
};

const ServiceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to hire this seller");
      return;
    }

    setLoading(true);

    // Simulate API call - will be replaced with real Supabase call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Hire request submitted! Our team will contact you shortly to arrange payment."
    );
    setIsHireDialogOpen(false);
    setRequirements("");
    setBudget("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="border-b border-border/50 bg-card/30 py-4">
          <div className="quid-container">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </div>
        </section>

        <section className="py-8">
          <div className="quid-container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Service Image */}
                <ServiceImage
                  src={mockService.image}
                  alt={mockService.title}
                  className="mb-6 rounded-xl"
                />

                {/* Title & Category */}
                <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                  {mockService.category}
                </Badge>
                <h1 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {mockService.title}
                </h1>

                {/* Stats */}
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-medium text-foreground">{mockService.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockService.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{mockService.deliveryDays} days delivery</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageSquare className="h-5 w-5" />
                    <span>{mockService.revisions} revisions</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
                    About This Service
                  </h2>
                  <div className="whitespace-pre-line text-muted-foreground">
                    {mockService.description}
                  </div>
                </div>

                {/* Proof of Work */}
                <div className="mb-8">
                  <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
                    Proof of Work
                  </h2>
                  <ul className="space-y-2">
                    {mockService.proofOfWork.map((work, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
                    Reviews
                  </h2>
                  <div className="space-y-4">
                    {mockService.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="glass-card rounded-xl p-4"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                              {review.author.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{review.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mb-2 text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Pricing Card */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="mb-4 flex items-baseline justify-between">
                      <span className="font-display text-3xl font-bold text-foreground">
                        {formatCurrency(mockService.price)}
                      </span>
                      <span className="text-muted-foreground">starting price</span>
                    </div>

                    <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {mockService.deliveryDays} days delivery
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {mockService.revisions} revisions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        Source code included
                      </li>
                    </ul>

                    <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="hero" size="lg" className="w-full">
                          Hire Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-display">Submit Hire Request</DialogTitle>
                          <DialogDescription>
                            Describe your project requirements and budget. Our team will contact you
                            to arrange secure payment.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleHireSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="requirements">Project Requirements</Label>
                            <Textarea
                              id="requirements"
                              placeholder="Describe what you need in detail..."
                              value={requirements}
                              onChange={(e) => setRequirements(e.target.value)}
                              required
                              className="min-h-[120px] bg-secondary/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Your Budget (₹)</Label>
                            <Input
                              id="budget"
                              type="number"
                              placeholder="12500"
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              required
                              min={1}
                              className="bg-secondary/50"
                            />
                          </div>
                          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                            <p className="text-xs text-muted-foreground">
                              <strong className="text-foreground">How payment works:</strong> After you
                              submit, our team will contact you via email to arrange secure payment
                              outside the platform.
                            </p>
                          </div>
                          <Button
                            type="submit"
                            variant="hero"
                            className="w-full"
                            disabled={loading || !user}
                          >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {user ? "Submit Request" : "Sign in to Hire"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Payment handled securely by our team
                    </p>
                  </div>

                  {/* Seller Card */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-xl font-bold text-primary">
                        {mockService.seller.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-foreground">
                            {mockService.seller.name}
                          </h3>
                          {mockService.seller.verified && (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mockService.seller.university}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Trust Score</p>
                        <p className="font-semibold text-foreground">
                          {mockService.seller.trustScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="font-semibold text-foreground">
                          {mockService.seller.completedOrders} orders
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Response</p>
                        <p className="font-semibold text-foreground">
                          {mockService.seller.responseTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Member since</p>
                        <p className="font-semibold text-foreground">
                          {mockService.seller.memberSince}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
