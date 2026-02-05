import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceImage } from "@/components/ServiceImage";
import { formatCurrency } from "@/lib/currency";
import {
  ArrowLeft,
  Edit,
  Save,
  Star,
  MapPin,
  Calendar,
  Award,
  ExternalLink,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

// Mock data - will be replaced with real Supabase data
const mockSellerProfile = {
  name: "Aarav Sharma",
  email: "aarav.sharma@email.com",
  university: "IIT Bombay",
  location: "Mumbai, Maharashtra",
  bio: "Passionate full-stack developer with 3+ years of experience in modern web technologies. I specialize in React, Node.js, and cloud deployment. I love creating clean, efficient, and user-friendly applications.",
  skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "UI/UX Design"],
  portfolioLinks: [
    { name: "GitHub", url: "https://github.com/aaravsharma" },
    { name: "Portfolio", url: "https://aaravsharma.dev" },
    { name: "LinkedIn", url: "https://linkedin.com/in/aaravsharma" },
  ],
  joinedDate: "2024-08-15",
  trustScore: 98,
  completedOrders: 45,
  averageRating: 4.9,
  totalEarnings: 125000,
  responseTime: "2 hours",
  languages: ["English", "Hindi"],
  availability: "full-time",
};

const mockSellerServices = [
  {
    id: "1",
    title: "Professional Website Development",
    category: "Web Development",
    price: 12500,
    rating: 4.9,
    reviewCount: 24,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop&crop=center",
    status: "active",
  },
  {
    id: "2",
    title: "React Application Development",
    category: "Web Development",
    price: 15000,
    rating: 5.0,
    reviewCount: 12,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop&crop=center",
    status: "active",
  },
];

const availabilityOptions = [
  { value: "full-time", label: "Full-time (40+ hours/week)" },
  { value: "part-time", label: "Part-time (20-40 hours/week)" },
  { value: "weekends", label: "Weekends only" },
  { value: "limited", label: "Limited availability" },
];

const SellerProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(mockSellerProfile);
  const [services, setServices] = useState(mockSellerServices);
  const [newSkill, setNewSkill] = useState("");
  const [newLink, setNewLink] = useState({ name: "", url: "" });

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddLink = () => {
    if (newLink.name.trim() && newLink.url.trim()) {
      setProfile(prev => ({
        ...prev,
        portfolioLinks: [...prev.portfolioLinks, { ...newLink }]
      }));
      setNewLink({ name: "", url: "" });
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setProfile(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    
    try {
      // Simulate API call - will be replaced with real Supabase call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <Link
              to="/seller/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Seller Profile
                </h1>
                <p className="text-muted-foreground">
                  Manage your profile information and showcase your skills
                </p>
              </div>
              <Button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                variant={isEditing ? "hero" : "outline"}
                className="gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isEditing ? (
                  <Save className="h-4 w-4" />
                ) : (
                  <Edit className="h-4 w-4" />
                )}
                {loading ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-8">
          <div className="quid-container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Profile */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleProfileUpdate('name', e.target.value)}
                          disabled={!isEditing}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="bg-secondary/30"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="university">University/College</Label>
                        <Input
                          id="university"
                          value={profile.university}
                          onChange={(e) => handleProfileUpdate('university', e.target.value)}
                          disabled={!isEditing}
                          className="bg-secondary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => handleProfileUpdate('location', e.target.value)}
                          disabled={!isEditing}
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select 
                        value={profile.availability} 
                        onValueChange={(value) => handleProfileUpdate('availability', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="bg-secondary/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availabilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                        disabled={!isEditing}
                        className="min-h-[100px] bg-secondary/50"
                        placeholder="Tell buyers about yourself, your experience, and what makes you unique..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="gap-2">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                          className="bg-secondary/50"
                        />
                        <Button onClick={handleAddSkill} size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Portfolio Links */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Portfolio & Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {profile.portfolioLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                          <div className="flex items-center gap-3">
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-foreground">{link.name}</p>
                              <p className="text-sm text-muted-foreground">{link.url}</p>
                            </div>
                          </div>
                          {isEditing && (
                            <Button
                              onClick={() => handleRemoveLink(index)}
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {isEditing && (
                      <div className="grid gap-2 sm:grid-cols-3">
                        <Input
                          placeholder="Link name"
                          value={newLink.name}
                          onChange={(e) => setNewLink(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-secondary/50"
                        />
                        <Input
                          placeholder="URL"
                          value={newLink.url}
                          onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                          className="bg-secondary/50"
                        />
                        <Button onClick={handleAddLink} size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Performance Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{profile.trustScore}%</p>
                        <p className="text-xs text-muted-foreground">Trust Score</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{profile.averageRating}</p>
                        <p className="text-xs text-muted-foreground">Avg Rating</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{profile.completedOrders}</p>
                        <p className="text-xs text-muted-foreground">Orders</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{profile.responseTime}</p>
                        <p className="text-xs text-muted-foreground">Response</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 border-t border-border/50 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Earnings</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(profile.totalEarnings)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Member Since</span>
                        <span className="text-foreground">{profile.joinedDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Services */}
                <Card className="glass-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Services</CardTitle>
                    <Link to="/seller/services">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="rounded-lg border border-border/50 overflow-hidden">
                        <ServiceImage
                          src={service.image}
                          alt={service.title}
                          className="h-20"
                        />
                        <div className="p-3">
                          <h4 className="font-medium text-foreground line-clamp-1">{service.title}</h4>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span>{service.rating} ({service.reviewCount})</span>
                            </div>
                            <span className="font-semibold text-foreground">
                              {formatCurrency(service.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerProfile;