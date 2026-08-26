import InstitutionalPage from "../components/ui/InstitutionalPage";

export default function About() {
  return (
    <InstitutionalPage
      title="Sobre o EduBlog"
      subtitle="O EduBlog é uma plataforma de blogging educacional que conecta professores e alunos por meio de conteúdos organizados por disciplina."
      sections={[
        {
          title: "O que é o EduBlog",
          paragraphs: [
            "O EduBlog foi desenvolvido para centralizar conteúdos educacionais em um ambiente digital simples e acessível. A proposta é facilitar a publicação e a consulta de materiais acadêmicos em um único lugar.",
            "A plataforma reúne conteúdos em formato de post, com estrutura voltada para estudo e revisão, mantendo o foco na experiência de ensino e aprendizagem.",
          ],
        },
        {
          title: "Problema que a plataforma busca solucionar",
          paragraphs: [
            "Em muitos contextos, materiais didáticos ficam dispersos em canais diferentes, o que dificulta o acompanhamento dos estudos. O EduBlog organiza esses conteúdos de forma clara para reduzir essa fragmentação.",
            "Com uma navegação por disciplina, alunos conseguem encontrar rapidamente o que precisam e professores mantêm seus conteúdos de forma mais estruturada.",
          ],
        },
        {
          title: "Como professores e alunos utilizam o EduBlog",
          paragraphs: [
            "Professores publicam conteúdos educacionais e organizam seus posts por disciplina, mantendo uma base de conhecimento atualizada para suas turmas.",
            "Alunos consultam esses conteúdos de forma prática, navegando por temas e disciplinas para estudar, revisar e acompanhar os materiais disponibilizados.",
          ],
        },
        {
          title: "Objetivo principal",
          paragraphs: [
            "O objetivo do EduBlog é facilitar o acesso e a disseminação de conteúdo educacional, promovendo uma experiência mais organizada para quem ensina e para quem aprende.",
          ],
        },
      ]}
    />
  );
}
