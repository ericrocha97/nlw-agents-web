# NLW Agents

Projeto desenvolvido durante um evento da Rocketseat para demonstrar o uso de agentes inteligentes na web.

## 🚀 Tecnologias

- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **TailwindCSS** - Framework CSS utility-first
- **React Router Dom** - Biblioteca de roteamento
- **TanStack React Query** - Gerenciamento de estado servidor e cache
- **Radix UI** - Componentes primitivos acessíveis
- **Class Variance Authority** - Construção de variantes de componentes
- **Lucide React** - Biblioteca de ícones

## 📂 Padrões de Projeto

- **Component-based Architecture** - Arquitetura baseada em componentes React
- **File-based Routing** - Roteamento baseado em arquivos com React Router
- **Server State Management** - Gerenciamento de estado servidor com React Query
- **Variant-based Components** - Componentes com variantes usando CVA
- **Composition Pattern** - Padrão de composição com Radix Slot
- **Path Aliasing** - Alias de caminhos (`@/` aponta para `src/`)

## ⚙️ Configuração do Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado), npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   pnpm dev
   ```

4. Acesse a aplicação em `http://localhost:5173`

### Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera build de produção (executa TypeScript build + Vite build)
- `pnpm preview` - Preview do build de produção

### Backend

O projeto consome uma API que deve estar rodando na porta 3333. Certifique-se de que o backend esteja configurado e executando antes de iniciar o frontend.

## 🛠️ Estrutura do Projeto

```
src/
├── components/
│   ├── ui/          # Componentes base do shadcn/ui
│   ├── mode-toggle  # Componente de alternância de tema
│   └── theme-provider # Provedor de tema
├── pages/           # Páginas da aplicação
│   ├── create-room  # Página de criação de sala
│   └── room        # Página de detalhes da sala
├── lib/            # Utilitários e configurações
├── theme/          # Configurações de tema (rose-pine)
└── app.tsx         # Componente raiz
```
