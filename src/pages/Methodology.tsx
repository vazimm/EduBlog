import InstitutionalPage from "../components/ui/InstitutionalPage";

export default function Methodology() {
  return (
    <InstitutionalPage
      title="Metodologia"
      subtitle="A metodologia do EduBlog é baseada na organização didática dos conteúdos, com foco em navegação por disciplina e acesso simplificado à informação."
      sections={[
        {
          title: "Organização por disciplinas",
          paragraphs: [
            "Os conteúdos são categorizados por disciplina para criar uma estrutura de estudo coerente e fácil de navegar.",
            "Essa categorização reduz ruído na busca por materiais e favorece uma jornada de aprendizagem mais objetiva.",
          ],
        },
        {
          title: "Publicação de materiais pelos professores",
          paragraphs: [
            "Professores registram seus conteúdos em posts educacionais, permitindo que temas específicos sejam disponibilizados para consulta dos alunos.",
            "A publicação contínua contribui para uma base de conhecimento viva, com materiais alinhados às necessidades de ensino.",
          ],
        },
        {
          title: "Facilidade de consulta pelos alunos",
          paragraphs: [
            "Alunos acessam conteúdos de forma direta, navegando por disciplina e encontrando os posts relacionados com mais rapidez.",
            "Esse fluxo ajuda na revisão de temas, no acompanhamento de estudos e no reforço de aprendizagem em diferentes momentos.",
          ],
        },
        {
          title: "Categorização e clareza",
          paragraphs: [
            "A proposta metodológica prioriza organização, consistência e clareza na apresentação dos materiais, apoiando o processo de ensino-aprendizagem em um ambiente digital único.",
          ],
        },
      ]}
    />
  );
}
