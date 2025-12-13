import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const role = currentUser.user_metadata?.role || currentUser.app_metadata?.role;
          setIsAdmin(role === 'admin');
        } else {
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        const role = currentUser.user_metadata?.role || currentUser.app_metadata?.role;
        setIsAdmin(role === 'admin');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return { error: error.message };
      }

      if (data.user) {
        console.log('User data:', data.user);
        console.log('User metadata:', data.user.user_metadata);
        console.log('App metadata:', data.user.app_metadata);

        const role = data.user.user_metadata?.role || data.user.app_metadata?.role;
        console.log('Detected role:', role);

        if (role !== 'admin') {
          await supabase.auth.signOut();
          return { error: 'Access denied. Admin privileges required.' };
        }

        setUser(data.user);
        setIsAdmin(true);
      }

      return { error: null };
    } catch (error) {
      console.error('Login exception:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
