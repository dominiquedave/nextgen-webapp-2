import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase, signIn, signUp, signOut } from "@/lib/supabase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // This is a mock implementation - in a real app, you would call your API
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Simple mock authentication for demo
        if (email === "demo@example.com" && password === "password") {
          const userData = {
            id: "1",
            email,
            name: "Demo User",
            role: "student",
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
          resolve(userData);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  // Register function
  const register = (userData) => {
    // This is a mock implementation - in a real app, you would call your API
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, you would validate and create the user on the server
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          role: "student",
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        toast({
          title: "Account created!",
          description: "Welcome to our learning platform!",
        });
        resolve(newUser);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  const getAllUsers = async () => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return data;
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
      });
      return [];
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    getAllUsers,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
