// QuickQuid Gig Marketplace Types

export type GigStatus = 
  | 'pending_approval'
  | 'open'
  | 'applicant_selected'
  | 'funded'
  | 'in_progress'
  | 'completed'
  | 'disputed'
  | 'rejected';

export type GigType = 'formal' | 'informal' | 'volunteer';

export type LocationType = 'remote' | 'onsite';

export type ApplicationStatus = 'submitted' | 'accepted' | 'rejected';

export type UserRole = 'student' | 'gig_poster' | 'admin';

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  location_type: LocationType;
  location_details?: string;
  people_required: number;
  skills_required: string[];
  gig_type: GigType;
  is_urgent: boolean;
  status: GigStatus;
  poster_id: string;
  poster?: UserProfile;
  created_at: string;
  updated_at: string;
  approved_at?: string;
  approved_by?: string;
  funded_at?: string;
  completed_at?: string;
  applications_count?: number;
  selected_applicant_id?: string;
}

export interface GigApplication {
  id: string;
  gig_id: string;
  applicant_id: string;
  applicant?: UserProfile;
  pitch: string;
  portfolio_link?: string;
  status: ApplicationStatus;
  applied_at: string;
  responded_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  university: string;
  is_verified: boolean;
  is_student: boolean;
  university_email?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  avatar_url?: string;
  created_at: string;
  suspended: boolean;
  suspended_reason?: string;
}

export interface ChatMessage {
  id: string;
  gig_id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface EscrowTransaction {
  id: string;
  gig_id: string;
  amount: number;
  status: 'pending' | 'funded' | 'released' | 'refunded';
  funded_at?: string;
  released_at?: string;
  admin_notes?: string;
  created_at: string;
}

export interface Dispute {
  id: string;
  gig_id: string;
  raised_by: string;
  reason: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
  resolution?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  action_type: 'approve_gig' | 'reject_gig' | 'approve_poster' | 'suspend_user' | 'mark_funded' | 'release_payment' | 'resolve_dispute';
  target_id: string;
  notes?: string;
  created_at: string;
}

export interface PlatformMetrics {
  total_gigs: number;
  completed_gigs: number;
  active_gigs: number;
  completion_rate: number;
  total_users: number;
  verified_students: number;
  total_applications: number;
  pending_approvals: number;
}