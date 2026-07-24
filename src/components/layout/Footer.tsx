import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">Instituição</h3>
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
          <h3 className="text-white font-semibold mb-3">Contato</h3>
          <ul className="space-y-2">
            <li>Email</li>
            <li>Telefone</li>
            <li>Endereço</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacidade" className="hover:text-white">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-white">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
