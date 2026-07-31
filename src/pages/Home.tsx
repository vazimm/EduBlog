import { useAuth } from "../hooks/useAuth";

export default function Home() {
  //TO-DO deletar - Só para teste e mostrar como pegar o usuário:
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1>Olá {user?.name}</h1>
      <h1 className="text-2xl font-bold">Lista de Posts</h1>
      {/* seu conteúdo da home aqui */}
    </div>
  );
}
