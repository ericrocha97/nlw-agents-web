# NLW Agents - Web

Este é o frontend web do projeto NLW Agents, uma aplicação que permite criar salas de perguntas e respostas, com a inovadora funcionalidade de gravação de áudio para interação com inteligência artificial.

## 🚀 Funcionalidades

- **Criação de Salas:** Crie facilmente novas salas para organizar suas sessões de perguntas e respostas.
- **Envio de Perguntas:** Envie perguntas de texto para as salas.
- **Gravação de Áudio para Respostas:** Grave segmentos de áudio que serão transcritos e utilizados pela inteligência artificial para gerar respostas às perguntas feitas na sala.
- **Visualização de Perguntas:** Acompanhe as perguntas enviadas em tempo real.
- **Interface Responsiva:** Design adaptável para diferentes tamanhos de tela.
- **Tema Escuro/Claro:** Alternância entre temas para melhor experiência visual.

## ✨ Tecnologias Utilizadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite:** Ferramenta de build rápida para desenvolvimento frontend.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utilitário para estilização rápida e responsiva.
- **Radix UI:** Componentes UI acessíveis e de alta performance.
- **React Router DOM:** Para gerenciamento de rotas na aplicação.
- **React Query:** Para gerenciamento de estado assíncrono e cache de dados.
- **Sonner:** Biblioteca para notificações toast elegantes.
- **Lucide React:** Biblioteca de ícones.
- **Day.js:** Biblioteca leve para manipulação de datas.
- **Zod:** Para validação de esquemas.
- **`useAudioRecorder` (Custom Hook):** Hook customizado para encapsular a lógica de gravação de áudio.

## 🛠️ Configuração e Desenvolvimento

### Pré-requisitos

- Node.js (versão 22 ou superior)
- pnpm (gerenciador de pacotes)

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/ericrocha97/nlw-agents-web.git
    cd nlw-agents-web
    ```

2. Instale as dependências:

    ```bash
    pnpm install
    ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`:

```ini
VITE_UI_THEME_STORAGE_KEY=vite-ui-theme
```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Build para Produção

Para construir a aplicação para produção:

```bash
pnpm build
```

Os arquivos de build serão gerados na pasta `dist`.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
