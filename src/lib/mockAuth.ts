/**
 * Mock Authentication System for QuickQUID PoC
 * Provides 10 pre-configured test users for immediate sign-in
 */

export interface MockUser {
  id: string;
  email: string;
  password: string;
  full_name: string;
  role: 'buyer' | 'seller' | 'admin';
  university: string;
  is_verified: boolean;
  avatar_url?: string;
}

// 10 Active Test Users
export const MOCK_USERS: MockUser[] = [
  // Buyers (5)
  {
    id: 'user-1',
    email: 'aarav.sharma@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Aarav Sharma',
    role: 'buyer',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-2',
    email: 'riya.patel@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Riya Patel',
    role: 'buyer',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-3',
    email: 'karan.verma@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Karan Verma',
    role: 'buyer',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-4',
    email: 'neha.joshi@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Neha Joshi',
    role: 'buyer',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-5',
    email: 'aditya.nair@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Aditya Nair',
    role: 'buyer',
    university: 'Jain University',
    is_verified: true,
  },
  // Sellers (4)
  {
    id: 'user-6',
    email: 'arjun.mehta@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Arjun Mehta',
    role: 'seller',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-7',
    email: 'ananya.iyer@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Ananya Iyer',
    role: 'seller',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-8',
    email: 'sneha.reddy@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Sneha Reddy',
    role: 'seller',
    university: 'Jain University',
    is_verified: true,
  },
  {
    id: 'user-9',
    email: 'rahul.kulkarni@jainuniversity.ac.in',
    password: 'test123',
    full_name: 'Rahul Kulkarni',
    role: 'seller',
    university: 'Jain University',
    is_verified: true,
  },
  // Admin (1)
  {
    id: 'user-10',
    email: 'admin@jainuniversity.ac.in',
    password: 'admin123',
    full_name: 'Admin User',
    role: 'admin',
    university: 'Jain University',
    is_verified: true,
  },
];

/**
 * Authenticate user with email and password
 */
export const mockSignIn = (email: string, password: string): MockUser | null => {
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

/**
 * Get user by ID
 */
export const getMockUserById = (id: string): MockUser | null => {
  return MOCK_USERS.find((u) => u.id === id) || null;
};

/**
 * Store current user in localStorage
 */
export const storeMockUser = (user: MockUser): void => {
  localStorage.setItem('mockUser', JSON.stringify(user));
};

/**
 * Get current user from localStorage
 */
export const getMockUser = (): MockUser | null => {
  const stored = localStorage.getItem('mockUser');
  return stored ? JSON.parse(stored) : null;
};

/**
 * Clear current user from localStorage
 */
export const clearMockUser = (): void => {
  localStorage.removeItem('mockUser');
};

/**
 * Check if user is authenticated
 */
export const isMockAuthenticated = (): boolean => {
  return getMockUser() !== null;
};
