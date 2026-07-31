export type Role = "aluno" | "professor";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
