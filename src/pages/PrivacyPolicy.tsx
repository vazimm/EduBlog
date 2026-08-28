import InstitutionalPage from "../components/ui/InstitutionalPage";

export default function PrivacyPolicy() {
  return (
    <InstitutionalPage
      title="Política de Privacidade"
      subtitle="Esta Política de Privacidade descreve, de forma geral, como os dados podem ser tratados no uso da plataforma EduBlog."
      sections={[
        {
          title: "Informações coletadas",
          paragraphs: [
            "A plataforma pode coletar dados necessários para autenticação, uso dos recursos e funcionamento técnico da aplicação.",
            "Também podem ser registrados dados de navegação e interação, quando aplicável ao funcionamento do serviço.",
          ],
        },
        {
          title: "Finalidade e utilização dos dados",
          paragraphs: [
            "Os dados são utilizados para viabilizar o acesso à plataforma, disponibilizar funcionalidades e melhorar a experiência de uso.",
            "As informações também podem ser usadas para suporte operacional, segurança e manutenção do ambiente.",
          ],
        },
        {
          title: "Armazenamento e segurança",
          paragraphs: [
            "As informações podem ser armazenadas em ambientes técnicos compatíveis com a operação do EduBlog.",
            "Medidas de segurança podem ser adotadas para reduzir riscos de acesso não autorizado, alteração indevida ou perda de dados.",
          ],
        },
        {
          title: "Compartilhamento de informações",
          paragraphs: [
            "O compartilhamento de dados pode ocorrer apenas quando necessário para operação da plataforma, cumprimento de obrigação legal ou proteção de direitos.",
          ],
        },
        {
          title: "Direitos dos usuários",
          paragraphs: [
            "Usuários podem solicitar esclarecimentos sobre o tratamento de dados pessoais e, quando aplicável, requerer atualização, correção ou remoção de informações.",
          ],
        },
        {
          title: "Cookies e tecnologias semelhantes",
          paragraphs: [
            "A plataforma pode utilizar cookies ou tecnologias equivalentes para manter sessões, lembrar preferências e apoiar funcionalidades essenciais.",
          ],
        },
        {
          title: "Alterações desta política",
          paragraphs: [
            "Esta política pode ser atualizada periodicamente para refletir melhorias no serviço, ajustes legais ou mudanças operacionais.",
          ],
        },
        {
          title: "Contato",
          paragraphs: [
            "Em caso de dúvidas sobre esta política, utilize os canais oficiais de contato disponibilizados pela própria plataforma.",
          ],
        },
      ]}
    />
  );
}
