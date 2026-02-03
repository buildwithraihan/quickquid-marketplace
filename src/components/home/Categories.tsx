import { Link } from "react-router-dom";
import { 
  Code, 
  Palette, 
  PenTool, 
  Video, 
  BarChart, 
  MessageSquare,
  ArrowRight
} from "lucide-react";

const categories = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Websites, web apps, and more",
    icon: Code,
    count: 120,
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description: "Logos, branding, illustrations",
    icon: Palette,
    count: 95,
  },
  {
    id: "content-writing",
    name: "Content Writing",
    description: "Articles, copywriting, editing",
    icon: PenTool,
    count: 78,
  },
  {
    id: "video-editing",
    name: "Video Editing",
    description: "YouTube, social media, promos",
    icon: Video,
    count: 56,
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Excel, Python, visualization",
    icon: BarChart,
    count: 42,
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Management, strategy, content",
    icon: MessageSquare,
    count: 67,
  },
];

const Categories = () => {
  return (
    <section className="border-t border-border/50 bg-card/30 py-20">
      <div className="quid-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Explore Categories
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find the perfect student freelancer for your project across various skill categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/services?category=${category.id}`}
              className="group glass-card rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <category.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-display font-semibold text-foreground group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">{category.description}</p>
                  <span className="text-xs text-muted-foreground">{category.count} services</span>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
