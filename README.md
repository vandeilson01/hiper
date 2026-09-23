# Hiper Stok — marketplace React + Vercel

Marketplace em React/Vite com área administrativa, área simples do cliente, catálogo físico, checkout, cálculo de frete por CEP e endpoints serverless preparados para Mercado Pago.

## Funcionalidades adicionadas

- Botão **Admin** para abrir o painel de gestão.
- Dashboard com vendas, pedidos, interessados e produtos.
- Cadastro de produtos com nome, modelo, cor/acabamento, preço, dimensões, estoque e até 8 fotos.
- Área de interessados com imóveis/produtos acompanhados.
- Área simples do cliente para favoritos, compras e checkout.
- Checkout com PIX, cartão e boleto via Mercado Pago Checkout Preference.
- Webhook para receber atualizações de pagamento.
- Cálculo de frete por CEP com origem configurada em **São Paulo — Centro**.
- Logo oficial Hiper Stok em `public/assets/hiper-stok-logo.png`.

## Variáveis de ambiente na Vercel

Configure no projeto da Vercel:

```env
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_de_producao_ou_sandbox
PUBLIC_APP_URL=https://seu-dominio.vercel.app
ADMIN_EMAIL=admin@hiperstok.com.br
ADMIN_PASSWORD=defina-uma-senha-forte
ADMIN_SESSION_SECRET=uma-chave-aleatoria-longa
```

O `MERCADOPAGO_ACCESS_TOKEN` é usado somente pelos endpoints serverless. Nunca coloque o Access Token em `VITE_` nem no código React.

O acesso do administrador é feito pelo botão **Admin** no canto inferior da loja. A sessão usa cookie `HttpOnly`, `SameSite=Lax`, `Secure` e expira em 8 horas. Não existe uma senha fixa no repositório: defina `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` nas variáveis da Vercel.

Para o webhook, cadastre no Mercado Pago a URL:

```text
https://seu-dominio.vercel.app/api/mercadopago/webhook
```

## Rotas serverless

- `POST /api/shipping/quote`: calcula uma cotação aproximada por CEP, região e quantidade de itens.
- `POST /api/mercadopago/create-preference`: cria uma preferência de checkout do Mercado Pago.
- `POST /api/mercadopago/webhook`: recebe notificações de pagamento.
- `POST /api/admin/login`: autentica o administrador.
- `GET /api/admin/me`: verifica a sessão atual.
- `POST /api/admin/logout`: encerra a sessão.

A cotação atual é uma regra inicial de demonstração. Para operação real, substitua por uma tabela de transportadora, Melhor Envio, Frenet ou outra API de frete com contrato comercial.

## Desenvolvimento e deploy

```bash
npm install
npm run dev
npm run build
```

Na Vercel:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Antes de usar em produção, configure credenciais Mercado Pago, domínio público, banco de dados persistente, autenticação real e armazenamento de imagens. A versão atual mantém cadastro e painel em memória para demonstração da interface; o próximo passo é conectar esses dados a uma base como Postgres/Supabase/Neon.
