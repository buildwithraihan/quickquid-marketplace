import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-hero-pattern pt-24">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="quid-container relative">
        <div className="flex min-h-[calc(90vh-6rem)] flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm animate-fade-in">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Verified Student Sellers Only</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in [animation-delay:100ms] opacity-0">
            Hire Talented{" "}
            <span className="text-gradient">Student Freelancers</span>{" "}
            You Can Trust
          </h1>

          {/* Subheadline */}
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fade-in [animation-delay:200ms] opacity-0">
            QuickQUID connects you with verified university students offering quality freelance
            services. From design to development, get professional work at student-friendly prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row animate-fade-in [animation-delay:300ms] opacity-0">
            <Link to="/services">
              <Button variant="hero" size="xl" className="gap-2">
                Browse Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero-outline" size="xl">
                Become a Seller
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 animate-fade-in [animation-delay:400ms] opacity-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">500+</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Active Services</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">100%</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Verified Sellers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-primary" />
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">4.9</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Avg. Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
