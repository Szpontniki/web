import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider
            value={{isAuthenticated, login, logout}}
        >
            {children}
        </AuthContext.Provider>
        );
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('musi tak byc bo inaczej myśli że kontekst nie istnieje')
    }
    return context;
}