import { useState } from "react";
import type { ReactNode } from "react";
import type { IUser, Role } from "../interfaces/IUser";
import { AuthContext } from "./AuthContextDefinition";
import { loginRequest } from "../services/authService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(email: string, password: string) {
    const { token, user } = await loginRequest(email, password);
    // Por enquanto, define-se papel (role) com base no e-mail, só pra fins de demonstração
    const role: Role = email.toLowerCase().endsWith("@professor.com")
      ? "professor"
      : "aluno";

    const loggedUser: IUser = { ...user, role };

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);
    setUser(loggedUser);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
