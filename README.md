# EduBlog — Front-end

Interface web do EduBlog, uma plataforma de blogging educacional que permite a professores publicar conteúdo por disciplina e a alunos consultá-lo. Este repositório contém apenas o **front-end**; o back-end (API REST) está em um repositório separado.

Projeto desenvolvido para o **Tech Challenge** — [nome da pós-graduação/curso].

## Links do projeto

- Repositório do back-end: [PREENCHER]
- API em produção: `https://blog-api-dnfx.onrender.com`
- Documentação Swagger da API: `https://blog-api-dnfx.onrender.com/docs`
- Apresentação em vídeo: [PREENCHER]

---

## Sumário

- [Stack e principais decisões técnicas](#stack-e-principais-decisões-técnicas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Rodando o projeto](#rodando-o-projeto)
- [Rodando com Docker](#rodando-com-docker)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Arquitetura de autenticação e autorização](#arquitetura-de-autenticação-e-autorização)
- [Integração com a API](#integração-com-a-api)
- [Decisões de segurança](#decisões-de-segurança)
- [Scripts disponíveis](#scripts-disponíveis)
- [Problemas conhecidos / próximos passos](#problemas-conhecidos--próximos-passos)

---

## Stack e principais decisões técnicas

| Tecnologia                | Uso                           | Por quê                                                                                                                                                              |
| ------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19 + TypeScript** | Base da aplicação             | Tipagem estática reduz bugs de integração com a API, essencial em projeto de equipe                                                                                  |
| **Vite**                  | Build tool / dev server       | Build rápido, HMR, configuração mínima                                                                                                                               |
| **Tailwind CSS v4**       | Estilização                   | Substitui Styled Components (citado como exemplo no enunciado, que permite "ou outro método de estilização"); produtividade e responsividade via classes utilitárias |
| **React Router DOM**      | Roteamento                    | Rotas aninhadas (`Outlet`) para compor Layout, guardas de autenticação e autorização por papel                                                                       |
| **Context API**           | Estado global de autenticação | Suficiente para o escopo do projeto; Redux seria over-engineering para um CRUD de blog                                                                               |
| **Axios**                 | Cliente HTTP                  | Ver [Decisões de segurança](#decisões-de-segurança)                                                                                                                  |

### Sobre o controle de acesso

Diferente do enunciado original (que previa listagem pública de posts), o time optou por **exigir login para acesso a qualquer página**, incluindo a listagem. Após autenticado, o papel do usuário (`professor` ou `aluno`) é inferido a partir do domínio do e-mail (`@professor.com`), espelhando a regra real de autorização implementada no back-end. Apenas professores têm acesso a criação, edição e administração de posts.

> ⚠️ Importante: a checagem de papel no front-end é apenas uma camada de **experiência de usuário** (esconder botões, bloquear rotas). A autorização real e vinculante ocorre no back-end, que valida o token JWT e o domínio do e-mail a cada requisição de escrita — o front-end nunca deve ser a única barreira de segurança.

---

## Pré-requisitos

- **Node.js** `20.19+` ou `22.12+` (recomendado: Node 24 LTS)
- **npm** (vem com o Node)
- **Docker** e **Docker Compose** (opcional, para rodar containerizado)

> Se você usa múltiplas versões de Node, recomendamos o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) ou [nvm](https://github.com/nvm-sh/nvm) (Mac/Linux).

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://blog-api-dnfx.onrender.com
```

Para rodar contra o back-end localmente em vez da API em produção:

```env
VITE_API_URL=http://localhost:3000
```

> Todas as variáveis consumidas pelo Vite precisam começar com o prefixo `VITE_`. Elas são embutidas no bundle final durante o build — nunca coloque segredos aqui (chaves privadas, `JWT_SECRET`, etc.), pois ficam visíveis no código-fonte enviado ao navegador.

## Rodando o projeto

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`.

### Credenciais de teste

> ⚠️ Remover esta seção (e o bloco correspondente na tela de login) antes da entrega final, ou substituir por instruções internas de QA.

| Papel     | E-mail                      | Senha         |
| --------- | --------------------------- | ------------- |
| Aluno     | `[PREENCHER]`               | `[PREENCHER]` |
| Professor | `[PREENCHER]@professor.com` | `[PREENCHER]` |

## Rodando com Docker

```bash
# Ambiente de desenvolvimento (hot-reload)
docker compose up frontend-dev

# Build de produção, servido via Nginx
docker compose up frontend-prod --build
```

| Serviço         | URL                     | Uso                                |
| --------------- | ----------------------- | ---------------------------------- |
| `frontend-dev`  | `http://localhost:5173` | Desenvolvimento com hot-reload     |
| `frontend-prod` | `http://localhost:8080` | Build otimizado, servido por Nginx |

O `Dockerfile` usa multi-stage build: um estágio de build (Node) gera os arquivos estáticos, e o estágio final usa apenas Nginx para servi-los — sem Node.js rodando em produção. O `nginx.conf` inclui fallback de rotas (`try_files`) para suportar o roteamento client-side do React Router.

---

## Estrutura de pastas

```
src/
├── components/
│   └── layout/          # Header, Footer, Layout (estrutura fixa da aplicação)
├── pages/                # Uma página = uma rota (Home, Login, PostView, Admin...)
├── context/               # Contextos React (AuthContext e sua definição)
├── hooks/                 # Hooks customizados (useAuth)
├── routes/                # Configuração de rotas e guardas (RequireAuth, RequireRole)
├── services/              # Camada de comunicação com a API (authService, postService...)
├── interfaces/            # Tipos e interfaces TypeScript
├── App.tsx
└── main.tsx
```

### Convenções adotadas

- **`pages/` vs `components/`**: se o item tem rota própria, é `pages/`; se é reutilizável dentro de páginas, é `components/`.
- **Interfaces prefixadas com `I`** (`IUser`, `IPost`, `IAuthContextType`): convenção comum em bases vindas de C#/Java; time optou por manter para consistência interna.
- **Arquivos de hook/contexto separados** (`AuthContextDefinition.ts`, `AuthContext.tsx`, `useAuth.ts`): necessário para compatibilidade com o Fast Refresh do Vite, que exige que cada arquivo exporte apenas um tipo de coisa (componente, ou hook, ou definição) para preservar o hot-reload sem reload completo da página.

---

## Arquitetura de autenticação e autorização

O controle de acesso é implementado em duas camadas independentes, usando rotas aninhadas do React Router:

1. **`RequireAuth`** — verifica se existe uma sessão ativa (`isAuthenticated`). Se não, redireciona para `/login`, preservando a rota de origem para retomar a navegação após o login.
2. **`RequireRole`** — aplicado apenas às rotas de escrita (`/posts/new`, `/posts/:id/edit`, `/admin`), verifica se o papel do usuário logado é `professor`.

O estado de autenticação é gerenciado via **Context API** (`AuthContext`), persistido em `localStorage` para sobreviver a recarregamentos de página, e inicializado de forma síncrona (lazy initial state do `useState`) para evitar renderizações em cascata desnecessárias.

---

## Integração com a API

Base URL configurada via `VITE_API_URL`. Principais endpoints consumidos:

| Método | Endpoint               | Autenticação | Uso no front-end                         |
| ------ | ---------------------- | ------------ | ---------------------------------------- |
| POST   | `/auth/login`          | —            | Tela de login                            |
| GET    | `/posts`               | Pública      | Listagem (apenas posts com status ativo) |
| GET    | `/posts/all`           | Professor    | Página administrativa (inclui rascunhos) |
| GET    | `/posts/:id`           | Pública      | Leitura de post individual               |
| POST   | `/posts`               | Professor    | Criação de post                          |
| PUT    | `/posts/:id`           | Professor    | Edição de post                           |
| DELETE | `/posts/:id`           | Professor    | Exclusão de post                         |
| GET    | `/catalog/disciplines` | Pública      | Popula filtros e formulários             |
| GET    | `/catalog/status`      | Pública      | Popula formulários de criação/edição     |

Todas as respostas seguem o formato `{ data: ... }`; a camada `services/` é responsável por desembrulhar esse envelope antes de entregar os dados aos componentes.

O token JWT retornado no login é armazenado em `localStorage` e anexado automaticamente ao cabeçalho `Authorization: Bearer <token>` em requisições subsequentes.

---

## Decisões de segurança

### Axios

Em 31 de março de 2026, o pacote `axios` sofreu um ataque à cadeia de suprimentos (conta de mantenedor comprometida), com versões maliciosas (`1.14.1` e `0.30.4`) publicadas por cerca de 3 horas antes de removidas do registro npm. Não é uma vulnerabilidade no código do axios em si, e as versões afetadas já foram removidas.

Como medida de precaução, o projeto fixa a versão exata do axios no `package.json` (sem `^`), evitando atualizações automáticas não revisadas:

```json
"axios": "1.19.0"
```

### React Router DOM — GHSA-qwww-vcr4-c8h2

O `npm audit` reporta uma vulnerabilidade de CSRF (severidade alta) relacionada às **APIs instáveis de React Server Components (RSC)** do React Router, corrigida apenas na versão major `8.3.0+`. Como este projeto é uma **SPA client-side pura**, sem uso de RSC ou APIs `unstable_`, a vulnerabilidade **não é aplicável** ao contexto de uso atual. Optou-se por não forçar uma migração de major version (`npm audit fix --force` rebaixaria a versão em vez de corrigir de fato) sem uma avaliação deliberada das breaking changes da v8.

---

## Scripts disponíveis

| Comando           | Descrição                                       |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento            |
| `npm run build`   | Gera o build de produção em `dist/`             |
| `npm run preview` | Serve o build de produção localmente para teste |
| `npm run lint`    | Executa o ESLint                                |

---

## Problemas conhecidos / próximos passos

- [ ] O papel do usuário (`professor`/`aluno`) é inferido no front-end a partir do e-mail; avaliar se o back-end deve expor um campo `role` explícito na resposta de login.
- [ ] Remover bloco de credenciais de teste da tela de login antes da entrega final.
- [ ] [PREENCHER conforme o time avançar: comentários, paginação, upload de imagem, etc.]

---

## Relato de desenvolvimento

[PREENCHER: breve relato da equipe sobre desafios enfrentados durante o desenvolvimento, conforme exigido na entrega do Tech Challenge.]
