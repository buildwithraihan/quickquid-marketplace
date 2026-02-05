import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  CheckCircle,
  Clock,
  Star,
  Plus,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  IndianRupee,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency } from "@/lib/currency";

// Mock data - will be replaced with real Supabase data
const mockSellerStats = {
  activeOrders: 3,
  completedOrders: 45,
  pendingRequests: 7,
  averageRating: 4.8,
  totalEarnings: 125000, // ₹1,25,000
  thisMonthEarnings: 28500, // ₹28,500
  responseTime: "2 hours",
  completionRate: 98,
};

const mockRecentOrders = [
  {
    id: "ORD-001",
    service: "Website Development",
    buyer: "Rohit Gupta",
    status: "in_progress",
    price: 12500,
    dueDate: "2025-02-10",
  },
  {
    id: "ORD-002",
    service: "Logo Design",
    buyer: "Priya Sharma",
    status: "completed",
    price: 6250,
    completedDate: "2025-02-01",
  },
  {
    id: "ORD-003",
    service: "Content Writing",
    buyer: "Amit Kumar",
    status: "in_progress",
    price: 4200,
    dueDate: "2025-02-08",
  },
];

const mockPendingRequests = [
  {
    id: "REQ-001",
    service: "Website Development",
    buyer: "Vikash Singh",
    budget: 15000,
    message: "Need a modern e-commerce website with payment integration",
    requestDate: "2025-02-05",
  },
  {
    id: "REQ-002",
    service: "Mobile App Design",
    buyer: "Kavya Reddy",
    budget: 8500,
    message: "Looking for UI/UX design for fitness tracking app",
    requestDate: "2025-02-04",
  },
];

const statusColors: Record<string, string> = {
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const SellerDashboard = () => {
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

  const sellerName = user.user_metadata?.full_name || "Seller";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Welcome back, {sellerName}
                </h1>
                <p className="text-muted-foreground">
                  Manage your services, orders, and grow your freelancing business
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/seller/services/new">
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Service
                  </Button>
                </Link>
                <Link to="/seller/requests">
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    View Requests ({mockSellerStats.pendingRequests})
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <section className="py-8">
          <div className="quid-container">
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Active Orders */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockSellerStats.activeOrders}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Orders in progress
                  </p>
                </CardContent>
              </Card>

              {/* Completed Orders */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Completed Orders
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockSellerStats.completedOrders}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {mockSellerStats.completionRate}% completion rate
                  </p>
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Requests
                  </CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockSellerStats.pendingRequests}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>

              {/* Average Rating */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {mockSellerStats.averageRating}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on all reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Earnings Overview */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <IndianRupee className="h-5 w-5" />
                    Earnings Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="font-display text-xl font-bold text-foreground">
                      {formatCurrency(mockSellerStats.totalEarnings)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-display text-lg font-semibold text-green-400">
                      {formatCurrency(mockSellerStats.thisMonthEarnings)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="text-foreground">{mockSellerStats.responseTime}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <TrendingUp className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/seller/services" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Package className="h-4 w-4" />
                      Manage Services
                    </Button>
                  </Link>
                  <Link to="/seller/orders" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Eye className="h-4 w-4" />
                      View All Orders
                    </Button>
                  </Link>
                  <Link to="/seller/profile" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Users className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Orders */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-foreground">Recent Orders</CardTitle>
                  <Link to="/seller/orders">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{order.id}</span>
                          <Badge className={statusColors[order.status]}>
                            {order.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="font-medium text-foreground">{order.service}</p>
                        <p className="text-sm text-muted-foreground">
                          Buyer: {order.buyer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {formatCurrency(order.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.status === "completed" 
                            ? `Completed ${order.completedDate}`
                            : `Due ${order.dueDate}`
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Requests */}
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-foreground">Pending Requests</CardTitle>
                  <Link to="/seller/requests">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-lg border border-border/50 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{request.id}</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(request.budget)}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">{request.service}</p>
                      <p className="text-sm text-muted-foreground">
                        From: {request.buyer}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {request.message}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="hero" className="flex-1">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;