import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface AuthContextType {
    isAuthenticated: boolean;
    userType: 'vendor' | 'driver' | 'customer' | null;
    loading: boolean;
    login: (userType: 'vendor' | 'driver' | 'customer') => void;
    logout: () => void;
    user: any | null;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userType: null,
    loading: true,
    login: () => {},
    logout: () => {},
    user: null,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState<'vendor' | 'driver' | 'customer' | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any | null>(null);

    // Check for existing auth on mount
    useEffect(() => {
        const checkAuth = () => {
            const savedUserType = localStorage.getItem('userType');
            const savedUser = localStorage.getItem('user');

            if (savedUserType && savedUser) {
                setIsAuthenticated(true);
                setUserType(savedUserType as 'vendor' | 'driver' | 'customer');
                setUser(JSON.parse(savedUser));
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    // Login function
    const login = (type: 'vendor' | 'driver' | 'customer') => {
        // In a real app, this would verify credentials with an API
        setIsAuthenticated(true);
        setUserType(type);

        // Mock user data
        const mockUser = {
            id: 'user-123',
            name: type === 'vendor' ? 'Vendor Account' : 'Demo User',
            email: `demo@${type}.com`,
        };

        setUser(mockUser);

        // Save to localStorage
        localStorage.setItem('userType', type);
        localStorage.setItem('user', JSON.stringify(mockUser));
    };

    // Logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUserType(null);
        setUser(null);

        // Remove from localStorage
        localStorage.removeItem('userType');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userType,
                loading,
                login,
                logout,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};