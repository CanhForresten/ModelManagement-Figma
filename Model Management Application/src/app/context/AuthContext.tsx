import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'manager' | 'model';
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('jwt_token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login for testing - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      let mockUser;

      if (email === 'manager@example.com' && password === 'password') {
        mockUser = {
          id: '1',
          email: 'manager@example.com',
          role: 'manager' as const,
          firstName: 'Manager',
          lastName: 'Hansen',
        };
      } else if (email === 'model@example.com' && password === 'password') {
        mockUser = {
          id: '2',
          email: 'model@example.com',
          role: 'model' as const,
          firstName: 'Model',
          lastName: 'Jensen',
        };
      } else {
        throw new Error('Ugyldige loginoplysninger');
      }

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Store token and user data
      localStorage.setItem('jwt_token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      setToken(mockToken);
      setUser(mockUser);

      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!response.ok) throw new Error('Login failed');
      // const data = await response.json();
      // localStorage.setItem('jwt_token', data.token);
      // localStorage.setItem('user', JSON.stringify(data.user));
      // setToken(data.token);
      // setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
