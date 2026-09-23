# Imobloom — e-commerce imobiliário em React

Storefront imobiliário em **React + Vite**, pronto para publicação na Vercel. A identidade provisória combina azul-noite, coral quente e areia clara com tipografia editorial.

## Funcionalidades

- Hero com animações e chamada de ação.
- Catálogo de imóveis com filtros por tipo e cidade.
- Carrossel responsivo na seção de destaques.
- Favoritos persistidos com `localStorage`.
- Modal com detalhes completos do imóvel.
- Formulário de interesse com feedback visual.
- Layout responsivo para desktop e celular.

## Rodar localmente

Requer Node.js 18+.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Deploy na Vercel

1. Suba esta pasta para um repositório GitHub ou importe o ZIP diretamente na Vercel.
2. A Vercel detectará o Vite automaticamente.
3. Use `npm install` como instalação e `npm run build` como build.
4. O diretório de saída é `dist`.

Não há necessidade de configurar variáveis de ambiente nesta primeira versão. As imagens demonstrativas usam URLs do Unsplash; em produção, substitua-as por assets próprios ou CDN.

## Estrutura

- `src/App.jsx`: interface, estado e interações.
- `src/styles.css`: identidade visual, responsividade e animações.
- `src/main.jsx`: montagem do React.
- `index.html`: entrada da aplicação e metadados.
- `vite.config.js`: configuração do Vite.
