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
import { formatCurrency } from "@/lib/currency";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Upload,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with real Supabase data
const mockOrders = [
  {
    id: "ORD-001",
    service: "Professional Website Development",
    buyer: {
      name: "Rohit Gupta",
      avatar: null,
      email: "rohit.g@email.com",
    },
    status: "in_progress",
    price: 12500,
    orderDate: "2025-02-01",
    dueDate: "2025-02-10",
    description: "Modern e-commerce website with payment integration",
    requirements: [
      "Responsive design",
      "Payment gateway",
      "User authentication",
      "Admin panel"
    ],
    deliverables: [],
    messages: 3,
    lastMessage: "2025-02-05",
  },
  {
    id: "ORD-002",
    service: "Logo Design",
    buyer: {
      name: "Priya Sharma",
      avatar: null,
      email: "priya.s@email.com",
    },
    status: "in_progress",
    price: 6250,
    orderDate: "2025-01-28",
    dueDate: "2025-02-08",
    description: "Modern logo for food delivery startup",
    requirements: [
      "Modern design",
      "Color and B&W versions",
      "Vector format",
      "Brand guidelines"
    ],
    deliverables: [
      { name: "Initial concepts", uploaded: true, date: "2025-02-03" },
      { name: "Final logo files", uploaded: false, date: null },
    ],
    messages: 5,
    lastMessage: "2025-02-04",
  },
  {
    id: "ORD-003",
    service: "Content Writing",
    buyer: {
      name: "Amit Kumar",
      avatar: null,
      email: "amit.k@email.com",
    },
    status: "delivered",
    price: 4200,
    orderDate: "2025-01-25",
    dueDate: "2025-02-05",
    deliveredDate: "2025-02-04",
    description: "SEO blog posts for tech startup",
    requirements: [
      "10 articles",
      "1000-1500 words each",
      "SEO optimized",
      "Original content"
    ],
    deliverables: [
      { name: "Blog articles (10)", uploaded: true, date: "2025-02-04" },
      { name: "SEO keywords list", uploaded: true, date: "2025-02-04" },
    ],
    messages: 2,
    lastMessage: "2025-02-04",
  },
];

const completedOrders = [
  {
    id: "ORD-004",
    service: "Mobile App UI Design",
    buyer: {
      name: "Kavya Reddy",
      avatar: null,
      email: "kavya.r@email.com",
    },
    status: "completed",
    price: 8500,
    orderDate: "2025-01-15",
    completedDate: "2025-01-28",
    rating: 5,
    review: "Excellent work! The designs exceeded my expectations.",
    description: "UI/UX design for fitness tracking app",
    deliverables: [
      { name: "UI Design Files", uploaded: true, date: "2025-01-28" },
      { name: "Design System", uploaded: true, date: "2025-01-28" },
    ],
  },
];

const statusColors: Record<string, string> = {
  in_progress: "bg-blue-500/20 text-blue-400",
  delivered: "bg-purple-500/20 text-purple-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const SellerOrders = () => {
  const [activeOrders, setActiveOrders] = useState(mockOrders);
  const [completed, setCompleted] = useState(completedOrders);

  const handleMarkAsDelivered = (orderId: string) => {
    setActiveOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: "delivered", deliveredDate: new Date().toISOString().split('T')[0] }
          : order
      )
    );
    toast.success("Order marked as delivered! Buyer will be notified.");
  };

  const OrderCard = ({ order, showActions = true }: { order: any, showActions?: boolean }) => (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-foreground">{order.service}</CardTitle>
            <p className="text-sm text-muted-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <Badge className={statusColors[order.status]}>
              {order.status.replace("_", " ")}
            </Badge>
            <p className="mt-1 font-semibold text-foreground">
              {formatCurrency(order.price)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Buyer Info */}
        <div className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            {order.buyer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{order.buyer.name}</p>
            <p className="text-sm text-muted-foreground">{order.buyer.email}</p>
          </div>
          <Link to={`/seller/orders/${order.id}/chat`}>
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat ({order.messages})
            </Button>
          </Link>
        </div>

        {/* Description */}
        <div>
          <h4 className="mb-2 font-medium text-foreground">Project Description</h4>
          <p className="text-sm text-muted-foreground">{order.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="mb-2 font-medium text-foreground">Requirements</h4>
          <ul className="space-y-1">
            {order.requirements.map((req: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-primary" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        {order.deliverables && order.deliverables.length > 0 && (
          <div>
            <h4 className="mb-2 font-medium text-foreground">Deliverables</h4>
            <div className="space-y-2">
              {order.deliverables.map((deliverable: any, index: number) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 p-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{deliverable.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {deliverable.uploaded ? (
                      <Badge className="bg-green-500/20 text-green-400">
                        Uploaded {deliverable.date}
                      </Badge>
                    ) : (
                      <Button size="sm" variant="outline" className="gap-1">
                        <Upload className="h-3 w-3" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Ordered: {order.orderDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {order.status === "completed" 
                ? `Completed: ${order.completedDate}`
                : order.status === "delivered"
                ? `Delivered: ${order.deliveredDate}`
                : `Due: ${order.dueDate}`
              }
            </span>
          </div>
        </div>

        {/* Rating & Review (for completed orders) */}
        {order.status === "completed" && order.rating && (
          <div className="rounded-lg bg-secondary/30 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium text-foreground">Buyer Review:</span>
              <div className="flex items-center gap-1">
                {[...Array(order.rating)].map((_, i) => (
                  <CheckCircle key={i} className="h-4 w-4 text-primary" />
                ))}
                <span className="text-sm text-muted-foreground">({order.rating}/5)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{order.review}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && order.status === "in_progress" && (
          <div className="flex gap-3 pt-2">
            <Link to={`/seller/orders/${order.id}/chat`} className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat with Buyer
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" className="flex-1 gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Mark as Delivered
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mark Order as Delivered</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to mark this order as delivered? The buyer will be notified and can review your work.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleMarkAsDelivered(order.id)}
                    variant="hero"
                    className="flex-1"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Delivered
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {showActions && order.status === "delivered" && (
          <div className="rounded-lg bg-purple-500/10 p-3 text-center">
            <p className="text-sm text-purple-400">
              Order delivered! Waiting for buyer review and final payment.
            </p>
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
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Manage your active and completed orders
            </p>
          </div>
        </section>

        {/* Orders */}
        <section className="py-8">
          <div className="quid-container">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-6 grid w-full max-w-md grid-cols-2 bg-secondary">
                <TabsTrigger value="active" className="gap-2">
                  <Package className="h-4 w-4" />
                  Active ({activeOrders.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Completed ({completed.length})
                </TabsTrigger>
              </TabsList>

              {/* Active Orders */}
              <TabsContent value="active">
                {activeOrders.length === 0 ? (
                  <Card className="glass-card p-12 text-center">
                    <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                      No active orders
                    </h3>
                    <p className="text-muted-foreground">
                      New orders will appear here when buyers hire you for your services
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Completed Orders */}
              <TabsContent value="completed">
                {completed.length === 0 ? (
                  <Card className="glass-card p-12 text-center">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                    <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                      No completed orders
                    </h3>
                    <p className="text-muted-foreground">
                      Completed orders with buyer reviews will appear here
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {completed.map((order) => (
                      <OrderCard key={order.id} order={order} showActions={false} />
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

export default SellerOrders;