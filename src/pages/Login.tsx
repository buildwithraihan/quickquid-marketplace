import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Info } from "lucide-react";
import { mockSignIn, storeMockUser, MOCK_USERS } from "@/lib/mockAuth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const user = mockSignIn(email, password);

      if (!user) {
        toast.error("Invalid email or password");
      } else {
        storeMockUser(user);
        toast.success(`Welcome back, ${user.full_name}!`);
        
        // Navigate based on role
        if (user.role === 'seller') {
          navigate("/seller/dashboard");
        } else if (user.role === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
        
        // Reload to update auth context
        window.location.reload();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
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
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to continue to QuickQUID</p>
          </div>

          {/* PoC Notice */}
          <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">PoC Demo Mode</p>
                <p className="mb-3 text-xs text-muted-foreground">
                  Use any of the 10 pre-configured test accounts below. All passwords are "test123" (admin: "admin123")
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                  className="text-xs"
                >
                  {showTestAccounts ? 'Hide' : 'Show'} Test Accounts
                </Button>
              </div>
            </div>
          </div>

          {/* Test Accounts List */}
          {showTestAccounts && (
            <div className="mb-6 space-y-2 rounded-lg border border-border/50 bg-secondary/30 p-4">
              <p className="mb-3 text-xs font-medium text-muted-foreground">Click to auto-fill:</p>
              <div className="space-y-1.5">
                {MOCK_USERS.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    className="flex w-full items-center justify-between rounded-md border border-border/50 bg-card/50 px-3 py-2 text-left text-xs transition-colors hover:bg-card hover:border-primary/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{user.full_name}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      user.role === 'admin' 
                        ? 'bg-red-500/20 text-red-400'
                        : user.role === 'seller'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {user.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary/50 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button variant="hero" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
