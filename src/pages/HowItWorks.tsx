import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  MessageSquare,
  CreditCard,
  CheckCircle,
  Shield,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description:
      "Explore our curated marketplace of verified student freelancers. Filter by category, price, rating, and delivery time to find the perfect match for your project.",
  },
  {
    icon: MessageSquare,
    title: "Submit Requirements",
    description:
      "Found a service you like? Click 'Hire Now' and describe your project in detail. Include your budget and any specific requirements you have.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Our team reviews your request and contacts you via email to arrange secure payment. This ensures both buyers and sellers are protected throughout the transaction.",
  },
  {
    icon: CheckCircle,
    title: "Track & Collaborate",
    description:
      "Once payment is confirmed, work with your freelancer through our in-app messaging. Track progress, share files, and communicate seamlessly.",
  },
];

const buyerBenefits = [
  {
    icon: Shield,
    title: "Verified Sellers Only",
    description: "Every seller is verified as a current university student with proven skills.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Our trust score system ensures you work with top-rated freelancers.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our team handles payments and resolves any disputes professionally.",
  },
];

const sellerBenefits = [
  {
    icon: Users,
    title: "Connect with Clients",
    description: "Access a growing network of buyers looking for quality freelance work.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Get paid securely through our manual payment handling system.",
  },
  {
    icon: Star,
    title: "Build Your Reputation",
    description: "Earn reviews and trust scores to grow your freelancing career.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-pattern py-16 sm:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="quid-container relative text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl">
              How QuickQUID Works
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A simple, secure process that connects you with talented student freelancers
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="quid-container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="glass-card relative rounded-xl p-6 animate-fade-in opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Note */}
        <section className="border-y border-border/50 bg-card/30 py-12">
          <div className="quid-container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Shield className="h-4 w-4" />
                About Our Payment System
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Secure, Manual Payment Handling
              </h2>
              <p className="text-muted-foreground">
                QuickQUID does not process payments directly on the platform. When you submit a hire
                request, our team personally reviews it and contacts both parties to arrange secure
                payment outside the platform. This approach ensures maximum security and allows us to
                provide personalized support throughout every transaction.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="quid-container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* For Buyers */}
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  For Buyers
                </h2>
                <div className="space-y-4">
                  {buyerBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border border-border/50 bg-card/50 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-display font-semibold text-foreground">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/services" className="mt-6 inline-block">
                  <Button variant="hero" className="gap-2">
                    Browse Services
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* For Sellers */}
              <div>
                <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
                  For Student Sellers
                </h2>
                <div className="space-y-4">
                  {sellerBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border border-border/50 bg-card/50 p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-display font-semibold text-foreground">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/signup?role=seller" className="mt-6 inline-block">
                  <Button variant="hero-outline" className="gap-2">
                    Become a Seller
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/50 bg-card/30 py-16">
          <div className="quid-container text-center">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of students and buyers on QuickQUID
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/services">
                <Button variant="hero" size="lg" className="gap-2">
                  Browse Services
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero-outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
