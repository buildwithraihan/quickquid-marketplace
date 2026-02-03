import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="quid-container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />

          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <GraduationCap className="h-4 w-4" />
                For Students
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Start Earning as a Student Freelancer
              </h2>
              <p className="mb-6 text-muted-foreground">
                Are you a skilled university student? Join QuickQUID to showcase your talents,
                build your portfolio, and earn money while studying. Verification is quick and easy.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    ✓
                  </div>
                  Set your own prices and schedule
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    ✓
                  </div>
                  Build a verified reputation
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                    ✓
                  </div>
                  Secure payments handled by our team
                </li>
              </ul>
              <Link to="/signup?role=seller">
                <Button variant="hero" size="lg" className="gap-2">
                  Apply as Seller
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Visual */}
            <div className="hidden lg:block">
              <div className="relative mx-auto aspect-square max-w-sm">
                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full rounded-full border border-border/50" />
                </div>
                <div className="absolute inset-8 flex items-center justify-center">
                  <div className="h-full w-full rounded-full border border-primary/30" />
                </div>
                <div className="absolute inset-16 flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-primary/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary shadow-lg animate-pulse-glow">
                    <GraduationCap className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
