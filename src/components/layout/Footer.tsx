import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto grid gap-4 bg-slate-950 px-8 py-6 text-slate-300 sm:grid-cols-3">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 sm:col-span-3 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-white font-semibold">Instituição</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/sobre" className="hover:text-white">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/professores" className="hover:text-white">
                Professores
              </Link>
            </li>
            <li>
              <Link to="/metodologia" className="hover:text-white">
                Metodologia
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-white font-semibold">Contato</h3>
          <ul className="space-y-2">
            <li>Email</li>
            <li>Telefone</li>
            <li>Endereço</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-white font-semibold">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/politica-de-privacidade" className="hover:text-white">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos-de-uso" className="hover:text-white">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
