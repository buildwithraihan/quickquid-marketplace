import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getMockUser, clearMockUser, type MockUser } from "@/lib/mockAuth";

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for mock user in localStorage
    const mockUser = getMockUser();
    setUser(mockUser);
    setLoading(false);
  }, []);

  const signOut = async () => {
    clearMockUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
