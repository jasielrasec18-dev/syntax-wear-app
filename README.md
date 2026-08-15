# 👟 SyntaxWear

> Uma aplicação moderna de e-commerce de calçados e vestuário, desenvolvida com React, TypeScript, Vite e Tailwind CSS.

---

## 📖 Sobre o Projeto

O **SyntaxWear** é uma loja virtual moderna, elegante e responsiva focada no comércio de calçados casuais, esportivos e sustentáveis.

O projeto foi construído utilizando as melhores práticas do ecossistema React, com roteamento baseado em arquivos através do **TanStack Router**, validação robusta de formulários com **React Hook Form + Zod**, integração de frete em tempo real via **ViaCEP**, e estilização moderna com **Tailwind CSS v4**.

---

## ✨ Funcionalidades

- 🛍️ **Catálogo de Produtos:** Listagem geral de tênis e sapatos com preço, fotos e informações detalhadas.
- 🏷️ **Filtro por Categorias:** Navegação dinâmica por categorias (Masculino, Moderno, Outlet, etc.).
- 🔍 **Página de Detalhes do Produto:**
  - Informações completas do calçado (cor, descrição, fotos).
  - Cálculo de parcelamento em até 6x e desconto de 10% no pagamento via PIX.
  - **Cálculo de Frete por CEP:** Consulta em tempo real à API do ViaCEP com estimativa de frete por região brasileira (Norte, Nordeste, Centro-Oeste, Sudeste e Sul).
- 🛒 **Carrinho de Compras (Drawer):**
  - Adição e remoção de itens.
  - Ajuste de quantidade (incremento e decremento).
  - Persistência automática dos dados no `localStorage` do navegador.
- 🔐 **Autenticação:**
  - Telas estilizadas de **Login** (`/sign-in`) e **Cadastro** (`/sign-up`).
  - Validação de formulários com Zod (incluindo validação de CPF, email e formato de senhas).
- 🏢 **Páginas Institucionais:**
  - **Sobre nós** (`/about`): História e proposta da marca.
  - **Nossas Lojas** (`/our-stores`): Apresentação dos pontos de venda físicos e experiência da marca.
- 📱 **Design Totalmente Responsivo:** Otimizado para telas mobile, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/):** Biblioteca para construção de interfaces de usuário reativas.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança e produtividade.
- **[Vite](https://vite.dev/):** Ferramenta de build rápida e moderna para o ecossistema frontend.
- **[TanStack Router](https://tanstack.com/router):** Sistema de roteamento moderno baseado em arquivos com tipagem estrita de rotas e parâmetros.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Framework utilitário de CSS de alta performance.
- **[React Hook Form](https://react-hook-form.com/):** Gerenciamento e controle de formulários com foco em performance.
- **[Zod](https://zod.dev/):** Validação de schemas e formulários TypeScript-first.
- **[React Icons](https://react-icons.github.io/react-icons/):** Pacote abrangente de ícones para interfaces.
- **[ViaCEP API](https://viacep.com.br/):** WebService gratuito para busca de endereços brasileiros a partir do CEP.

---

## 📁 Estrutura do Projeto

A organização dos arquivos dentro da pasta `src/` segue uma divisão clara por responsabilidades:

```text
syntax-wear-app/
├── public/                 # Arquivos públicos e estáticos (fontes, ícones)
├── src/
│   ├── assets/             # Imagens, fotos de produtos e banners
│   ├── components/         # Componentes reutilizáveis (Header, Footer, CartDrawer, etc.)
│   ├── contexts/           # Contextos do React (ex: CartContext / CartProvider)
│   ├── interfaces/         # Tipagens e interfaces TypeScript (Produto, Endereço, Categoria)
│   ├── mocks/              # Dados fictícios para simulação de produtos e categorias
│   ├── pages/              # Rotas da aplicação organizadas pelo TanStack Router
│   │   ├── _app/           # Páginas com layout padrão da loja (Home, Produtos, Sobre, Lojas)
│   │   ├── _auth/          # Páginas de autenticação (Login e Cadastro)
│   │   ├── __root.tsx      # Rota raiz da aplicação
│   │   └── layout.tsx      # Layout compartilhado com Header e Footer
│   ├── styles/             # Configurações globais de estilo e variáveis de tema (globals.css)
│   ├── utils/              # Funções utilitárias (formatação de moeda, validação de CPF)
│   ├── App.tsx             # Componente raiz com o provedor do roteador e do carrinho
│   ├── main.tsx            # Ponto de entrada da aplicação React
│   └── router-tree-gen.ts  # Árvore de rotas gerada automaticamente pelo plugin do TanStack Router
├── eslint.config.js        # Configurações do linter ESLint
├── index.html              # HTML base da aplicação
├── package.json            # Dependências e scripts do projeto
├── tsconfig.json           # Configurações do TypeScript
└── vite.config.ts          # Configuração do Vite e plugins
```

---

## 🚀 Como Rodar o Projeto Localmente

Siga o passo a passo abaixo para rodar a aplicação na sua máquina:

### 1. Pré-requisitos
Certifique-se de ter instalado em seu computador:
- [Node.js](https://nodejs.org/) (versão **18.x** ou superior recomendada)
- Gerenciador de pacotes **npm** (já vem com o Node.js) ou **pnpm** / **yarn**

### 2. Instalar as dependências
Abra o terminal na pasta raiz do projeto e execute o comando:

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
Após a instalação ser concluída, inicie a aplicação com:

```bash
npm run dev
```

### 4. Acessar a aplicação
O terminal exibirá o endereço local da aplicação. Basta abrir o navegador e acessar:

```text
http://localhost:5173
```

---

## 📜 Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes comandos:

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento local com Hot Module Replacement (HMR). |
| `npm run build` | Compila o TypeScript e gera os arquivos otimizados para produção na pasta `dist/`. |
| `npm run preview` | Executa um servidor local para visualizar como ficou a versão de produção gerada. |
| `npm run lint` | Executa o ESLint para verificar se há erros de formatação ou boas práticas no código. |

---

## 💡 Dicas para Iniciantes

- **Como navegar no código?**
  - As páginas que aparecem no navegador ficam em `src/pages/`.
  - As rotas são geradas automaticamente pelo TanStack Router. Ao criar uma página em `src/pages/`, o plugin atualiza o arquivo `src/router-tree-gen.ts`.
  - Para adicionar novos produtos ou alterar preços e fotos, confira o arquivo `src/mocks/products.ts`.
  - O estado do carrinho de compras e como os itens são adicionados/removidos podem ser visualizados em `src/contexts/CartProvider.tsx`.

---

Feito com 💜 para aprendizado e desenvolvimento frontend!
