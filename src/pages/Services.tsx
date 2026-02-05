import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, Clock, Filter, X } from "lucide-react";
import { ServiceImage } from "@/components/ServiceImage";
import { formatCurrency } from "@/lib/currency";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "web-development", name: "Web Development" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "content-writing", name: "Content Writing" },
  { id: "video-editing", name: "Video Editing" },
  { id: "data-analysis", name: "Data Analysis" },
  { id: "social-media", name: "Social Media" },
];

// Mock data - will be replaced with real data from Supabase
const mockServices = [
  {
    id: "1",
    title: "Professional Website Development",
    category: "web-development",
    categoryName: "Web Development",
    price: 12500, // ₹12,500 (converted from $150)
    rating: 4.9,
    reviewCount: 24,
    deliveryDays: 7,
    seller: {
      name: "Alex Chen",
      university: "MIT",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
  },
  {
    id: "2",
    title: "Modern Logo & Brand Identity Design",
    category: "graphic-design",
    categoryName: "Graphic Design",
    price: 6250, // ₹6,250 (converted from $75)
    rating: 5.0,
    reviewCount: 18,
    deliveryDays: 3,
    seller: {
      name: "Sarah Miller",
      university: "RISD",
    },
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop&crop=center",
  },
  {
    id: "3",
    title: "SEO-Optimized Blog Content Writing",
    category: "content-writing",
    categoryName: "Content Writing",
    price: 4200, // ₹4,200 (converted from $50)
    rating: 4.8,
    reviewCount: 31,
    deliveryDays: 2,
    seller: {
      name: "James Wilson",
      university: "Columbia",
    },
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=300&fit=crop&crop=center",
  },
  {
    id: "4",
    title: "Professional Video Editing for YouTube",
    category: "video-editing",
    categoryName: "Video Editing",
    price: 8300, // ₹8,300 (converted from $100)
    rating: 4.7,
    reviewCount: 15,
    deliveryDays: 5,
    seller: {
      name: "Emily Davis",
      university: "UCLA",
    },
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&h=300&fit=crop&crop=center",
  },
  {
    id: "5",
    title: "Data Analysis & Visualization with Python",
    category: "data-analysis",
    categoryName: "Data Analysis",
    price: 10000, // ₹10,000 (converted from $120)
    rating: 4.9,
    reviewCount: 12,
    deliveryDays: 4,
    seller: {
      name: "Michael Brown",
      university: "Stanford",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center",
  },
  {
    id: "6",
    title: "Social Media Strategy & Content Creation",
    category: "social-media",
    categoryName: "Social Media",
    price: 6650, // ₹6,650 (converted from $80)
    rating: 4.6,
    reviewCount: 22,
    deliveryDays: 3,
    seller: {
      name: "Lisa Johnson",
      university: "NYU",
    },
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center",
  },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
              Browse Services
            </h1>
            <p className="text-muted-foreground">
              Find the perfect student freelancer for your project
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border/50 bg-background py-4">
          <div className="quid-container">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-secondary/50 pl-10"
                />
              </div>

              {/* Category */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[200px] bg-secondary/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-secondary/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="gap-2 lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Active Filters */}
            {selectedCategory !== "all" && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1"
                  onClick={() => handleCategoryChange("all")}
                >
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="quid-container">
            <p className="mb-6 text-sm text-muted-foreground">
              {sortedServices.length} service{sortedServices.length !== 1 ? "s" : ""} found
            </p>

            {sortedServices.length === 0 ? (
              <div className="rounded-xl border border-border bg-card/50 p-12 text-center">
                <p className="text-lg text-muted-foreground">No services found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedServices.map((service, index) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="group glass-card overflow-hidden rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in opacity-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Service Image */}
                    <ServiceImage
                      src={service.image}
                      alt={service.title}
                      className="rounded-t-xl"
                    />

                    <div className="p-5">
                      {/* Category */}
                      <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {service.categoryName}
                      </span>

                      {/* Title */}
                      <h3 className="mb-3 line-clamp-2 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {service.title}
                      </h3>

                      {/* Seller Info */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                          {service.seller.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {service.seller.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{service.seller.university}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between border-t border-border/50 pt-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium text-foreground">
                              {service.rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({service.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{service.deliveryDays}d</span>
                          </div>
                        </div>
                        <p className="font-display text-lg font-bold text-foreground">
                          {formatCurrency(service.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
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

export default Services;
