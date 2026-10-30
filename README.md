# Gestão Tax — site institucional

Site estático (HTML, CSS e JavaScript com GSAP). Não precisa de banco de dados nem de PHP.

## Estrutura
- `index.html` — a página
- `css/style.css` — visual (identidade Gestão Tax)
- `js/main.js` — animações, abas, pré-diagnóstico e links do WhatsApp
- `assets/` — favicon e fotos (Unsplash, licença comercial gratuita)

## Onde mudar
- **Número do WhatsApp e mensagens:** topo de `js/main.js` (`WA_NUMBER` e `WA_MESSAGES`).
- **Textos:** direto no `index.html`.

## Como publicar (HostGator)
Envie todo o conteúdo desta pasta para `public_html/` (pelo Gerenciador de Arquivos do cPanel ou por FTP). O `index.html` precisa ficar direto dentro de `public_html/`.
