import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/currency";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Loader2,
  Plus,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { GigType, LocationType } from "@/types/gig.types";

interface GigFormData {
  title: string;
  description: string;
  budget: string;
  timeline: string;
  location_type: LocationType;
  location_details: string;
  people_required: string;
  skills_required: string[];
  gig_type: GigType;
  is_urgent: boolean;
}

const gigTypes: { value: GigType; label: string; description: string }[] = [
  { value: 'formal', label: 'Formal', description: 'Professional work with contract' },
  { value: 'informal', label: 'Informal', description: 'Casual work arrangement' },
  { value: 'volunteer', label: 'Volunteer', description: 'Unpaid community service' },
];

const locationTypes: { value: LocationType; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'Onsite' },
];

const CreateGig = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  
  const [formData, setFormData] = useState<GigFormData>({
    title: "",
    description: "",
    budget: "",
    timeline: "",
    location_type: "remote",
    location_details: "",
    people_required: "1",
    skills_required: [],
    gig_type: "formal",
    is_urgent: false,
  });

  const handleInputChange = (field: keyof GigFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills_required.includes(newSkill.trim())) {
      handleInputChange('skills_required', [...formData.skills_required, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    handleInputChange(
      'skills_required',
      formData.skills_required.filter(skill => skill !== skillToRemove)
    );
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error("Please enter a gig title");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return false;
    }
    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      toast.error("Please enter a valid budget");
      return false;
    }
    if (!formData.timeline.trim()) {
      toast.error("Please enter a timeline");
      return false;
    }
    if (formData.location_type === 'onsite' && !formData.location_details.trim()) {
      toast.error("Please specify the onsite location");
      return false;
    }
    if (!formData.people_required || parseInt(formData.people_required) <= 0) {
      toast.error("Please enter number of people required");
      return false;
    }
    if (formData.skills_required.length === 0) {
      toast.error("Please add at least one required skill");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // TODO: Replace with actual Supabase API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const gigData = {
        ...formData,
        budget: parseFloat(formData.budget),
        people_required: parseInt(formData.people_required),
        poster_id: user?.id,
        status: 'pending_approval',
      };

      console.log('Creating gig:', gigData);
      
      toast.success("Gig posted successfully! Awaiting admin approval.");
      navigate("/gigs/my-gigs");
    } catch (error) {
      console.error('Error creating gig:', error);
      toast.error("Failed to create gig. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const budgetPreview = formData.budget ? formatCurrency(parseFloat(formData.budget)) : "₹0";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Header */}
        <section className="border-b border-border/50 bg-card/30 py-8">
          <div className="quid-container">
            <Link
              to="/gigs"
              className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Gigs
            </Link>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Post a New Gig
            </h1>
            <p className="text-muted-foreground">
              Create a gig opportunity for Jain University students
            </p>
          </div>
        </section>

        {/* Campus Restriction Notice */}
        <section className="border-b border-border/50 bg-blue-500/5 py-4">
          <div className="quid-container">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
              <div>
                <p className="font-medium text-foreground">Campus Restricted - Jain University PoC</p>
                <p className="text-sm text-muted-foreground">
                  Your gig will be reviewed by our admin team before being published. This ensures quality and safety for our campus community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-8">
          <div className="quid-container">
            <div className="mx-auto max-w-4xl">
              <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Information */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Title */}
                      <div className="space-y-2">
                        <Label htmlFor="title">Gig Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Need help with event photography"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="bg-secondary/50"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the gig in detail. What needs to be done? What are the deliverables?"
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          className="min-h-[120px] bg-secondary/50"
                        />
                      </div>

                      {/* Budget and Timeline */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget (₹) *</Label>
                          <Input
                            id="budget"
                            type="number"
                            placeholder="5000"
                            min="0"
                            step="100"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', e.target.value)}
                            className="bg-secondary/50"
                          />
                          <p className="text-xs text-muted-foreground">
                            Preview: {budgetPreview}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeline">Timeline *</Label>
                          <Input
                            id="timeline"
                            placeholder="e.g., 2 weeks, 5 days"
                            value={formData.timeline}
                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                            className="bg-secondary/50"
                          />
                        </div>
                      </div>

                      {/* Gig Type */}
                      <div className="space-y-2">
                        <Label htmlFor="gig_type">Gig Type *</Label>
                        <Select 
                          value={formData.gig_type} 
                          onValueChange={(value: GigType) => handleInputChange('gig_type', value)}
                        >
                          <SelectTrigger className="bg-secondary/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gigTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div>
                                  <p className="font-medium">{type.label}</p>
                                  <p className="text-xs text-muted-foreground">{type.description}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location & Requirements */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Location & Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Location Type */}
                      <div className="space-y-2">
                        <Label htmlFor="location_type">Location Type *</Label>
                        <Select 
                          value={formData.location_type} 
                          onValueChange={(value: LocationType) => handleInputChange('location_type', value)}
                        >
                          <SelectTrigger className="bg-secondary/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {locationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Location Details (if onsite) */}
                      {formData.location_type === 'onsite' && (
                        <div className="space-y-2">
                          <Label htmlFor="location_details">Location Details *</Label>
                          <Input
                            id="location_details"
                            placeholder="e.g., Jain University Main Campus, Block A"
                            value={formData.location_details}
                            onChange={(e) => handleInputChange('location_details', e.target.value)}
                            className="bg-secondary/50"
                          />
                        </div>
                      )}

                      {/* People Required */}
                      <div className="space-y-2">
                        <Label htmlFor="people_required">Number of People Required *</Label>
                        <Input
                          id="people_required"
                          type="number"
                          placeholder="1"
                          min="1"
                          max="50"
                          value={formData.people_required}
                          onChange={(e) => handleInputChange('people_required', e.target.value)}
                          className="bg-secondary/50"
                        />
                      </div>

                      {/* Skills Required */}
                      <div className="space-y-2">
                        <Label>Skills Required *</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.skills_required.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="gap-2">
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g., Photography, Video Editing)"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                            className="bg-secondary/50"
                          />
                          <Button type="button" onClick={handleAddSkill} size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Urgent Toggle */}
                  <Card className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-yellow-400" />
                          <div>
                            <Label htmlFor="is_urgent" className="text-base font-medium">
                              Mark as Urgent
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Urgent gigs get priority visibility
                            </p>
                          </div>
                        </div>
                        <Switch
                          id="is_urgent"
                          checked={formData.is_urgent}
                          onCheckedChange={(checked) => handleInputChange('is_urgent', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Preview Sidebar */}
                <div className="space-y-6">
                  <Card className="glass-card sticky top-24">
                    <CardHeader>
                      <CardTitle>Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Gig Preview */}
                      <div className="rounded-lg border border-border/50 p-4 space-y-3">
                        {formData.is_urgent && (
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            <Zap className="mr-1 h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                        <h3 className="font-display font-semibold text-foreground line-clamp-2">
                          {formData.title || "Gig Title"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{formData.gig_type}</Badge>
                          <Badge variant="outline">{formData.location_type}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formData.timeline || "Timeline"}
                          </span>
                          <span className="font-bold text-foreground">
                            {budgetPreview}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formData.people_required} {parseInt(formData.people_required) === 1 ? 'person' : 'people'} needed
                        </div>
                      </div>

                      {/* Submission Info */}
                      <div className="rounded-lg bg-blue-500/10 p-3 text-sm">
                        <p className="font-medium text-blue-400 mb-1">After Submission:</p>
                        <ul className="space-y-1 text-muted-foreground text-xs">
                          <li>• Status: Pending Admin Approval</li>
                          <li>• Admin will review within 24 hours</li>
                          <li>• You'll be notified once approved</li>
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button
                          type="submit"
                          variant="hero"
                          className="w-full gap-2"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                          {loading ? "Posting Gig..." : "Post Gig"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate("/gigs")}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CreateGig;