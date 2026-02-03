import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="quid-container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">Q</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Quick<span className="text-primary">QUID</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The trusted marketplace for student freelancers. Quality work, fair prices.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">Help Center</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Trust & Safety</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Community Guidelines</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Cookie Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QuickQUID. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
