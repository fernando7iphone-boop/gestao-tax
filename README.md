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

## Como publicar (Hostinger)

Site no ar em https://gestaotax.com.br (Hostinger, plano Business; domínio no registro.br com DNS aurora/nebula.dns-parking.com).
Para atualizar: hPanel > Sites > gestaotax.com.br > Gerenciador de arquivos > public_html. O index.html precisa ficar direto dentro de public_html/.
