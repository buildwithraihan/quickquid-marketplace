import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowRight } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const featuredServices = [
  {
    id: "1",
    title: "Professional Website Development",
    category: "Web Development",
    price: 150,
    rating: 4.9,
    reviewCount: 24,
    deliveryDays: 7,
    seller: {
      name: "Alex Chen",
      avatar: null,
      university: "MIT",
      verified: true,
    },
    image: null,
  },
  {
    id: "2",
    title: "Modern Logo & Brand Identity Design",
    category: "Graphic Design",
    price: 75,
    rating: 5.0,
    reviewCount: 18,
    deliveryDays: 3,
    seller: {
      name: "Sarah Miller",
      avatar: null,
      university: "RISD",
      verified: true,
    },
    image: null,
  },
  {
    id: "3",
    title: "SEO-Optimized Blog Content Writing",
    category: "Content Writing",
    price: 50,
    rating: 4.8,
    reviewCount: 31,
    deliveryDays: 2,
    seller: {
      name: "James Wilson",
      avatar: null,
      university: "Columbia",
      verified: true,
    },
    image: null,
  },
];

const FeaturedServices = () => {
  return (
    <section className="border-t border-border/50 bg-card/30 py-20">
      <div className="quid-container">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Featured Services
            </h2>
            <p className="text-muted-foreground">
              Top-rated services from verified student freelancers
            </p>
          </div>
          <Link to="/services" className="hidden sm:block">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="group glass-card overflow-hidden rounded-xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Service Image Placeholder */}
              <div className="aspect-video bg-secondary/50">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span className="text-sm">Service Preview</span>
                </div>
              </div>

              <div className="p-5">
                {/* Category */}
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {service.category}
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
                    <p className="text-sm font-medium text-foreground">{service.seller.name}</p>
                    <p className="text-xs text-muted-foreground">{service.seller.university}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-border/50 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium text-foreground">{service.rating}</span>
                      <span className="text-sm text-muted-foreground">({service.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{service.deliveryDays}d</span>
                    </div>
                  </div>
                  <p className="font-display text-lg font-bold text-foreground">
                    ${service.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/services">
            <Button variant="outline" className="gap-2">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
