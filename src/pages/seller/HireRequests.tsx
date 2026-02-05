import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/currency";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  X,
  MessageSquare,
  User,
  Calendar,
  IndianRupee,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with real Supabase data
const mockRequests = [
  {
    id: "REQ-001",
    service: "Professional Website Development",
    buyer: {
      name: "Vikash Singh",
      avatar: null,
      joinedDate: "2024-10-15",
      completedOrders: 3,
      rating: 4.7,
    },
    budget: 15000,
    message: "I need a modern e-commerce website with payment integration, user authentication, and admin panel. The site should be mobile-responsive and SEO-optimized. I have the design mockups ready.",
    requirements: [
      "E-commerce functionality",
      "Payment gateway integration",
      "User authentication",
      "Admin dashboard",
      "Mobile responsive design",
      "SEO optimization"
    ],
    requestDate: "2025-02-05",
    deadline: "2025-02-20",
    status: "pending",
  },
  {
    id: "REQ-002",
    service: "Mobile App UI/UX Design",
    buyer: {
      name: "Kavya Reddy",
      avatar: null,
      joinedDate: "2024-12-01",
      completedOrders: 1,
      rating: 5.0,
    },
    budget: 8500,
    message: "Looking for UI/UX design for a fitness tracking mobile app. Need modern, clean design with good user experience. App should have workout tracking, progress charts, and social features.",
    requirements: [
      "Mobile app UI design",
      "User experience optimization",
      "Workout tracking interface",
      "Progress visualization",
      "Social features design"
    ],
    requestDate: "2025-02-04",
    deadline: "2025-02-15",
    status: "pending",
  },
  {
    id: "REQ-003",
    service: "Content Writing",
    buyer: {
      name: "Rahul Gupta",
      avatar: null,
      joinedDate: "2024-08-20",
      completedOrders: 8,
      rating: 4.9,
    },
    budget: 5500,
    message: "Need SEO-optimized blog posts for my tech startup. Looking for 10 articles, each 1000-1500 words. Topics will be provided. Must be original and well-researched.",
    requirements: [
      "10 blog articles",
      "1000-1500 words each",
      "SEO optimized",
      "Original content",
      "Tech industry focus"
    ],
    requestDate: "2025-02-03",
    deadline: "2025-02-18",
    status: "pending",
  },
];

const acceptedRequests = [
  {
    id: "REQ-004",
    service: "Logo Design",
    buyer: {
      name: "Priya Sharma",
      avatar: null,
      joinedDate: "2024-11-10",
      completedOrders: 2,
      rating: 4.5,
    },
    budget: 6250,
    message: "Need a modern logo for my food delivery startup. Looking for something clean, memorable, and works well in both color and black & white.",
    acceptedDate: "2025-02-02",
    deadline: "2025-02-08",
    status: "accepted",
  },
];

const HireRequests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [accepted, setAccepted] = useState(acceptedRequests);
  const [loading, setLoading] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAcceptRequest = async (requestId: string, message?: string) => {
    setLoading(requestId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const request = requests.find(r => r.id === requestId);
      if (request) {
        // Move to accepted list
        setAccepted(prev => [...prev, { ...request, status: "accepted", acceptedDate: new Date().toISOString().split('T')[0] }]);
        // Remove from pending list
        setRequests(prev => prev.filter(r => r.id !== requestId));
        
        toast.success("Request accepted successfully! The buyer will be notified.");
      }
    } catch (error) {
      toast.error("Failed to accept request");
    } finally {
      setLoading(null);
      setResponseMessage("");
    }
  };

  const handleRejectRequest = async (requestId: string, message?: string) => {
    setLoading(requestId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Remove from pending list
      setRequests(prev => prev.filter(r => r.id !== requestId));
      
      toast.success("Request declined. The buyer will be notified.");
    } catch (error) {
      toast.error("Failed to decline request");
    } finally {
      setLoading(null);
      setResponseMessage("");
    }
  };

  const RequestCard = ({ request, showActions = true }: { request: any, showActions?: boolean }) => (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-foreground">{request.service}</CardTitle>
            <p className="text-sm text-muted-foreground">{request.id}</p>
          </div>
          <Badge className="bg-primary/20 text-primary">
            {formatCurrency(request.budget)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Buyer Info */}
        <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            {request.buyer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{request.buyer.name}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {request.buyer.completedOrders} orders
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {request.buyer.rating} rating
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined {request.buyer.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <h4 className="mb-2 font-medium text-foreground">Project Description</h4>
          <p className="text-sm text-muted-foreground">{request.message}</p>
        </div>

        {/* Requirements */}
        {request.requirements && (
          <div>
            <h4 className="mb-2 font-medium text-foreground">Requirements</h4>
            <ul className="space-y-1">
              {request.requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Timeline */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Requested: {request.requestDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Deadline: {request.deadline}
          </span>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-3 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="hero" 
                  className="flex-1 gap-2"
                  disabled={loading === request.id}
                >
                  {loading === request.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  Accept
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Accept Hire Request</DialogTitle>
                  <DialogDescription>
                    You're about to accept this hire request for {formatCurrency(request.budget)}. 
                    You can add a message for the buyer.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="response">Message to Buyer (Optional)</Label>
                    <Textarea
                      id="response"
                      placeholder="Thank you for choosing me! I'm excited to work on your project..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleAcceptRequest(request.id, responseMessage)}
                      variant="hero"
                      className="flex-1"
                      disabled={loading === request.id}
                    >
                      {loading === request.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Accept Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  disabled={loading === request.id}
                >
                  <X className="h-4 w-4" />
                  Decline
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Decline Hire Request</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to decline this request? You can provide a reason to help the buyer.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="decline-reason">Reason (Optional)</Label>
                    <Textarea
                      id="decline-reason"
                      placeholder="Thank you for your interest. Unfortunately, I'm not available for this project timeline..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleRejectRequest(request.id, responseMessage)}
                      variant="outline"
                      className="flex-1"
                      disabled={loading === request.id}
                    >
                      {loading === request.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <X className="mr-2 h-4 w-4" />
                      )}
                      Decline Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <Link
              to="/seller/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Hire Requests
            </h1>
            <p className="text-muted-foreground">
              Manage incoming hire requests from potential buyers
            </p>
          </div>
        </section>

        {/* Requests */}
        <section className="py-8">
          <div className="quid-container">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 bg-secondary">
                <TabsTrigger value="pending" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Pending ({requests.length})
                </TabsTrigger>
                <TabsTrigger value="accepted" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Accepted ({accepted.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Requests */}
              <TabsContent value="pending">
                {requests.length === 0 ? (
                  <Card className="glass-card p-12 text-center">
                    <MessageSquare className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                      No pending requests
                    </h3>
                    <p className="text-muted-foreground">
                      New hire requests will appear here when buyers are interested in your services
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {requests.map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Accepted Requests */}
              <TabsContent value="accepted">
                {accepted.length === 0 ? (
                  <Card className="glass-card p-12 text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                      No accepted requests
                    </h3>
                    <p className="text-muted-foreground">
                      Requests you accept will appear here and move to active orders
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {accepted.map((request) => (
                      <RequestCard key={request.id} request={request} showActions={false} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HireRequests;