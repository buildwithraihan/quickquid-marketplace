import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, User, GraduationCap, Info } from "lucide-react";

type Role = "buyer" | "seller";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get("role") as Role) || "buyer";

  const [role, setRole] = useState<Role>(defaultRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.info("PoC Mode: Please use pre-configured test accounts from the login page");
      navigate("/login");
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-xl font-bold text-primary-foreground">Q</span>
          </div>
          <span className="font-display text-2xl font-bold text-foreground">
            Quick<span className="text-primary">QUID</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join QuickQUID and get started</p>
          </div>

          {/* PoC Notice */}
          <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <p className="mb-1 text-sm font-medium text-foreground">PoC Demo Mode</p>
                <p className="text-xs text-muted-foreground">
                  New account creation is disabled in PoC mode. Please use one of the 10 pre-configured test accounts from the{" "}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    login page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("buyer")}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                role === "buyer"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Buyer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole("seller")}
              className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${
                role === "seller"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <GraduationCap className="h-5 w-5" />
              <span className="font-medium">Seller</span>
            </button>
          </div>

          {role === "seller" && (
            <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Seller accounts require verification.</strong>{" "}
                You'll need to verify your student status with your college email and ID after
                signing up.
              </p>
            </div>
          )}

          {/* Email Form - Disabled in PoC */}
          <form onSubmit={handleSignup} className="space-y-4 opacity-60 pointer-events-none">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {role === "seller" ? "College Email" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={role === "seller" ? "you@university.edu" : "you@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled
                  minLength={6}
                  className="bg-secondary/50 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full" disabled>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account (Disabled in PoC)
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
