import InstitutionalPage from "../components/ui/InstitutionalPage";

export default function TermsOfUse() {
  return (
    <InstitutionalPage
      title="Termos de Uso"
      subtitle="Estes Termos de Uso estabelecem diretrizes gerais para utilização da plataforma EduBlog por professores e alunos."
      sections={[
        {
          title: "Aceitação dos termos",
          paragraphs: [
            "Ao utilizar a plataforma, o usuário declara estar ciente destes termos e concorda com as condições aqui descritas.",
          ],
        },
        {
          title: "Descrição da plataforma",
          paragraphs: [
            "O EduBlog é uma plataforma educacional que permite publicação de conteúdos por professores e consulta desses conteúdos por alunos.",
            "Os materiais são organizados por disciplina para facilitar navegação e acesso ao conteúdo.",
          ],
        },
        {
          title: "Cadastro e contas de usuário",
          paragraphs: [
            "O acesso a funcionalidades específicas pode exigir autenticação. O usuário é responsável por preservar a segurança de suas credenciais.",
          ],
        },
        {
          title: "Responsabilidades dos professores",
          paragraphs: [
            "Professores são responsáveis pelo conteúdo que publicam, pela organização por disciplina e pela conformidade com boas práticas de uso da plataforma.",
          ],
        },
        {
          title: "Responsabilidades dos alunos",
          paragraphs: [
            "Alunos devem utilizar os conteúdos para fins educacionais, respeitando o uso adequado da plataforma e os direitos sobre materiais publicados.",
          ],
        },
        {
          title: "Publicação de conteúdo e propriedade intelectual",
          paragraphs: [
            "Conteúdos publicados permanecem sob responsabilidade de seus autores, que devem assegurar legitimidade e respeito a direitos de terceiros.",
            "É vedado publicar material que infrinja direitos autorais ou normas aplicáveis.",
          ],
        },
        {
          title: "Uso adequado da plataforma",
          paragraphs: [
            "Não é permitido utilizar a plataforma para práticas abusivas, ilícitas ou que comprometam segurança, estabilidade e experiência dos demais usuários.",
          ],
        },
        {
          title: "Suspensão ou encerramento de contas",
          paragraphs: [
            "Contas podem ser suspensas ou encerradas em caso de uso inadequado, violação destes termos ou necessidade operacional da plataforma.",
          ],
        },
        {
          title: "Limitações de responsabilidade",
          paragraphs: [
            "A plataforma busca disponibilidade e qualidade de serviço, mas não garante ausência total de falhas técnicas ou indisponibilidades temporárias.",
          ],
        },
        {
          title: "Alterações dos termos",
          paragraphs: [
            "Os termos podem ser atualizados periodicamente para refletir mudanças funcionais, legais ou operacionais.",
          ],
        },
        {
          title: "Contato",
          paragraphs: [
            "Em caso de dúvidas sobre estes termos, utilize os canais oficiais de contato disponibilizados na plataforma.",
          ],
        },
      ]}
    />
  );
}
