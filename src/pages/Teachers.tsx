import InstitutionalPage from "../components/ui/InstitutionalPage";

export default function Teachers() {
  return (
    <InstitutionalPage
      title="Professores"
      subtitle="No EduBlog, professores são responsáveis por publicar e organizar conteúdos educacionais para apoiar o aprendizado dos alunos."
      sections={[
        {
          title: "Publicação de conteúdos",
          paragraphs: [
            "A plataforma permite que professores compartilhem materiais em formato de post, com foco em clareza e organização para facilitar a consulta.",
            "Esse formato ajuda a construir uma base contínua de conteúdos, com temas que podem ser consultados conforme a necessidade de cada estudante.",
          ],
        },
        {
          title: "Organização por disciplina",
          paragraphs: [
            "Cada conteúdo pode ser associado a uma disciplina, mantendo a navegação estruturada e alinhada ao contexto educacional.",
            "Essa organização melhora a experiência dos alunos ao localizar materiais de forma mais rápida e objetiva.",
          ],
        },
        {
          title: "Gerenciamento dos próprios posts",
          paragraphs: [
            "A área do professor é voltada ao acompanhamento dos próprios conteúdos publicados, incluindo visão de status e controle sobre os posts existentes.",
            "Com isso, o professor consegue manter seus materiais atualizados e alinhados ao planejamento pedagógico.",
          ],
        },
        {
          title: "Compartilhamento de conhecimento",
          paragraphs: [
            "A proposta do EduBlog valoriza a autoria docente e amplia o alcance do conhecimento em um ambiente organizado para estudo e consulta.",
          ],
        },
      ]}
    />
  );
}
