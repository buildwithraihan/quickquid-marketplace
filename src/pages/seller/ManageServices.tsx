import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ServiceImage } from "@/components/ServiceImage";
import { formatCurrency } from "@/lib/currency";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with real Supabase data
const mockSellerServices = [
  {
    id: "1",
    title: "Professional Website Development",
    category: "Web Development",
    price: 12500,
    rating: 4.9,
    reviewCount: 24,
    deliveryDays: 7,
    status: "active",
    orders: 15,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
    createdAt: "2024-12-15",
  },
  {
    id: "2",
    title: "Modern Logo & Brand Identity Design",
    category: "Graphic Design",
    price: 6250,
    rating: 5.0,
    reviewCount: 18,
    deliveryDays: 3,
    status: "active",
    orders: 12,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&crop=center",
    createdAt: "2024-11-20",
  },
  {
    id: "3",
    title: "SEO-Optimized Blog Content Writing",
    category: "Content Writing",
    price: 4200,
    rating: 4.8,
    reviewCount: 31,
    deliveryDays: 2,
    status: "paused",
    orders: 8,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&crop=center",
    createdAt: "2024-10-10",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  paused: "bg-yellow-500/20 text-yellow-400",
  draft: "bg-gray-500/20 text-gray-400",
};

const ManageServices = () => {
  const [services, setServices] = useState(mockSellerServices);

  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter(service => service.id !== serviceId));
    toast.success("Service deleted successfully");
  };

  const handleToggleStatus = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === "active" ? "paused" : "active" }
        : service
    ));
    toast.success("Service status updated");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Link
                  to="/seller/dashboard"
                  className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
                <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Manage Services
                </h1>
                <p className="text-muted-foreground">
                  Create, edit, and manage your freelance services
                </p>
              </div>
              <Link to="/seller/services/new">
                <Button variant="hero" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Service
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-8">
          <div className="quid-container">
            {services.length === 0 ? (
              <Card className="glass-card p-12 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                  No services yet
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Create your first service to start receiving orders from buyers
                </p>
                <Link to="/seller/services/new">
                  <Button variant="hero" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Service
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id} className="glass-card overflow-hidden">
                    {/* Service Image */}
                    <ServiceImage
                      src={service.image}
                      alt={service.title}
                      className="h-48"
                    />

                    <CardContent className="p-5">
                      {/* Header with Status and Menu */}
                      <div className="mb-3 flex items-start justify-between">
                        <Badge className={statusColors[service.status]}>
                          {service.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/services/${service.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Service
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/seller/services/${service.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Service
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                              <Clock className="mr-2 h-4 w-4" />
                              {service.status === "active" ? "Pause" : "Activate"}
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Service
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Service</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{service.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteService(service.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Category */}
                      <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {service.category}
                      </span>

                      {/* Title */}
                      <h3 className="mb-3 line-clamp-2 font-display text-lg font-semibold text-foreground">
                        {service.title}
                      </h3>

                      {/* Stats */}
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{service.rating}</span>
                          <span>({service.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.deliveryDays}d</span>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="mb-4 rounded-lg bg-secondary/30 p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Orders</span>
                          <span className="font-semibold text-foreground">{service.orders}</span>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-foreground">
                          {formatCurrency(service.price)}
                        </span>
                        <div className="flex gap-2">
                          <Link to={`/seller/services/${service.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/services/${service.id}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ManageServices;