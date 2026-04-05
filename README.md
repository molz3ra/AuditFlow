# AuditFlow 🚀

O **AuditFlow** é uma ferramenta de auditoria técnica voltada para proprietários de E-commerces e desenvolvedores. Ele analisa a performance, SEO, acessibilidade e boas práticas de um site, gerando um relatório detalhado e um plano de ação imediato para escalar vendas.

Além disso, a plataforma funciona como uma **Máquina de Leads**, capturando o e-mail do usuário em troca da geração de um Relatório Executivo em PDF.

---

## ✨ Funcionalidades

- **🕵️‍♂️ Auditoria Técnica (Mock/API):** Análise de Performance, SEO, Acessibilidade e Boas Práticas.
- **📊 Core Web Vitals:** Exibição de métricas vitais como LCP, FID e CLS.
- **✅ Checklist de Otimização:** Plano de ação passo a passo para o usuário aplicar.
- **📄 Exportação em PDF:** Geração de relatórios executivos profissionais com a logo e métricas usando `jsPDF`.
- **🌙 Dark/Light Mode:** Suporte nativo a temas utilizando `next-themes` e Tailwind CSS.
- **🌐 Internacionalização (i18n):** Troca instantânea de idiomas (Português / Inglês) baseada em dicionário de estados.
- **🧲 Captação de Leads:** O e-mail e a URL do usuário são capturados e persistidos num banco de dados relacional.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as tecnologias mais modernas do ecossistema React:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Banco de Dados (BaaS):** [Supabase](https://supabase.com/) (PostgreSQL)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Requisições HTTP:** Axios
- **Geração de PDF:** jsPDF
- **Linguagem:** TypeScript

---

## ⚙️ Como rodar o projeto localmente

### 1. Pré-requisitos

Certifique-se de ter o **Node.js** (v18+) instalado em sua máquina.

### 2. Clone o repositório e instale as dependências

```bash
# Clone o projeto (caso esteja no git)
git clone [https://github.com/seu-usuario/audit-flow.git](https://github.com/seu-usuario/audit-flow.git)

# Entre na pasta do projeto
cd audit-flow

# Instale as dependências
npm install
3. Configuração do Banco de Dados (Supabase)
Crie um projeto no Supabase e configure a seguinte tabela (audits):

id (uuid, primary key)

created_at (timestampz)

url (text)

email (text, nullable allowed)

performance_score (numeric)

seo_score (numeric)

report_data (jsonb)

4. Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto e adicione suas chaves do Supabase:

Snippet de código
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_do_supabase_aqui
5. Rode o Servidor de Desenvolvimento
Bash
npm run dev
O aplicativo estará disponível em http://localhost:3000.

📁 Estrutura do Projeto
/app - Rotas do Next.js (App Router).

/api/audit/route.ts - Backend API Route para processar a auditoria e salvar no Supabase.

page.tsx - Interface principal do usuário (Frontend).

globals.css - Configurações globais e injeção do Tailwind v4.

/lib - Configurações externas.

supabase.ts - Cliente de conexão com o banco de dados.

🚀 Próximos Passos (Roadmap)
[ ] Integração com a API real do Google PageSpeed Insights.

[ ] Disparo de e-mail automático com o PDF anexado usando Resend ou SendGrid.

[ ] Dashboard administrativo para visualização dos Leads capturados.

Desenvolvido com 💻 e ☕ por Lucas Mol.
