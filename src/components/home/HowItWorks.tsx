import { Search, MessageSquare, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Service",
    description: "Browse verified student freelancers and find the perfect match for your project.",
  },
  {
    icon: MessageSquare,
    title: "Submit Requirements",
    description: "Click 'Hire Now' and describe your project requirements and budget.",
  },
  {
    icon: CreditCard,
    title: "Pay Securely",
    description: "Our team contacts you to arrange secure payment outside the platform.",
  },
  {
    icon: CheckCircle,
    title: "Get Quality Work",
    description: "Collaborate with your freelancer and receive professional deliverables.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="quid-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            How QuickQUID Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Simple, secure, and student-friendly. Get started in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-[2px] w-full bg-gradient-to-r from-border via-primary/30 to-border md:block" />
              )}

              {/* Step Number */}
              <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-primary/10" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
              </div>

              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Note about payments */}
        <div className="mt-12 glass-card mx-auto max-w-2xl rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> QuickQUID facilitates connections between
            buyers and verified student sellers. All payments are handled securely outside the platform
            through our team to ensure safety for both parties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
