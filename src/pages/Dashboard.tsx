import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  MessageSquare,
  Star,
  Clock,
  Plus,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/currency";

// Mock data
const mockOrders = [
  {
    id: "ORD-001",
    service: "Professional Website Development",
    seller: "Aarav Sharma",
    buyer: "Rohit Gupta",
    status: "in_progress",
    price: 12500, // ₹12,500 (converted from $150)
    date: "2025-02-01",
  },
  {
    id: "ORD-002",
    service: "Logo Design",
    seller: "Riya Patel",
    buyer: "Rohit Gupta",
    status: "completed",
    price: 6250, // ₹6,250 (converted from $75)
    date: "2025-01-28",
  },
];

const statusColors: Record<string, string> = {
  requested: "bg-yellow-500/20 text-yellow-400",
  accepted: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-purple-500/20 text-purple-400",
  completed: "bg-green-500/20 text-green-400",
  reviewed: "bg-primary/20 text-primary",
};

const statusLabels: Record<string, string> = {
  requested: "Requested",
  accepted: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
  reviewed: "Reviewed",
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get user role from metadata (default to buyer)
  const userRole = user.user_metadata?.role || "buyer";
  const isSeller = userRole === "seller";
  const isVerified = user.user_metadata?.verified === true;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    Welcome back, {user.user_metadata?.full_name || "User"}
                  </h1>
                  {isSeller && (
                    <Badge
                      variant="outline"
                      className={
                        isVerified
                          ? "border-green-500/50 bg-green-500/10 text-green-400"
                          : "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
                      }
                    >
                      {isVerified ? (
                        <>
                          <Shield className="mr-1 h-3 w-3" /> Verified Seller
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-3 w-3" /> Pending Verification
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {isSeller ? "Manage your services and orders" : "View your orders and messages"}
                </p>
              </div>
              {isSeller && isVerified && (
                <Link to="/dashboard/services/new">
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Service
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Seller Verification Notice */}
        {isSeller && !isVerified && (
          <section className="border-b border-border/50 bg-yellow-500/5 py-4">
            <div className="quid-container">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                <div>
                  <p className="font-medium text-foreground">Complete Your Verification</p>
                  <p className="text-sm text-muted-foreground">
                    To start offering services, please complete your seller verification by uploading
                    your college ID and proof of work.
                  </p>
                  <Link to="/dashboard/verification">
                    <Button variant="outline" size="sm" className="mt-3">
                      Complete Verification
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="quid-container">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-6 grid w-full max-w-md grid-cols-3 bg-secondary">
                <TabsTrigger value="orders" className="gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Messages
                </TabsTrigger>
                {isSeller && (
                  <TabsTrigger value="services" className="gap-2">
                    <Star className="h-4 w-4" />
                    Services
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders">
                {mockOrders.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium text-foreground">No orders yet</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {isSeller
                        ? "Orders will appear here when buyers hire you"
                        : "Browse services to find the perfect freelancer"}
                    </p>
                    {!isSeller && (
                      <Link to="/services">
                        <Button variant="hero" className="mt-4">
                          Browse Services
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-xl p-5"
                      >
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{order.id}</span>
                            <Badge className={statusColors[order.status]}>
                              {statusLabels[order.status]}
                            </Badge>
                          </div>
                          <h3 className="font-display font-semibold text-foreground">
                            {order.service}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isSeller ? `Buyer: ${order.buyer}` : `Seller: ${order.seller}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg font-bold text-foreground">
                            {formatCurrency(order.price)}
                          </p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Link to={`/dashboard/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages">
                <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                  <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground">No messages yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Messages with buyers/sellers will appear here
                  </p>
                </div>
              </TabsContent>

              {/* Services Tab (Seller Only) */}
              {isSeller && (
                <TabsContent value="services">
                  {!isVerified ? (
                    <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                      <Shield className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-lg font-medium text-foreground">
                        Complete verification to create services
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        You need to verify your student status before offering services
                      </p>
                      <Link to="/dashboard/verification">
                        <Button variant="hero" className="mt-4">
                          Complete Verification
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                      <Star className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-lg font-medium text-foreground">No services yet</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Create your first service to start receiving orders
                      </p>
                      <Link to="/dashboard/services/new">
                        <Button variant="hero" className="mt-4 gap-2">
                          <Plus className="h-4 w-4" />
                          Create Service
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
