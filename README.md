# 💩 PoopSquare

O **PoopSquare** é uma rede social colaborativa para localizar, cadastrar e avaliar banheiros públicos e de estabelecimentos. Inspirado na proposta original do Foursquare, o projeto combina geolocalização, check-ins, avaliações da comunidade, gamificação e descoberta de locais.

🌐 **Aplicação em produção:** [[poopsquare.lfpiantino.chatgpt.site](https://poopsquare.vercel.app/)]( )

## Funcionalidades

- Busca por cidades, ruas e estabelecimentos;
- mapa interativo baseado no OpenStreetMap;
- localização atual pelo GPS do dispositivo;
- cadastro colaborativo de banheiros e estabelecimentos;
- informações sobre acessibilidade, fraldário, banheiro familiar, chuveiro, Wi-Fi e tipo de acesso;
- check-ins com pontuação de experiência;
- avaliações de limpeza, privacidade, insumos, acessibilidade e conforto;
- comentários e dicas da comunidade;
- feed de atividades;
- badges, ranking e sistema de “Prefeito”;
- autenticação de usuários;
- interface responsiva para computadores e celulares;
- banco de dados persistente.

A base pública começa sem locais fictícios. Os registros exibidos são cadastrados pelos próprios usuários.

## Tecnologias

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vinext](https://github.com/cloudflare/vinext)
- [Vite](https://vite.dev/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim](https://nominatim.org/)

## Requisitos

- Node.js 22.13 ou superior;
- npm;
- ambiente Linux, WSL ou contêiner com `bash`, `flock`, `curl` e GNU `timeout`.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/lfpiantino/poopsquare.git
cd poopsquare
```

Instale as dependências:

```bash
npm ci
```

Os scripts da pasta `scripts/` precisam manter permissão de execução no Linux:

```bash
chmod +x scripts/*.sh
```

## Execução local

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Gere a versão de produção:

```bash
npm run build
```

Execute a versão compilada:

```bash
npm run start
```

## Comandos disponíveis

| Comando | Finalidade |
|---|---|
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a versão otimizada de produção |
| `npm run start` | Executa a aplicação compilada |
| `npm test` | Compila e executa os testes |
| `npm run lint` | Verifica a qualidade do código |
| `npm run db:generate` | Gera as migrações do banco com Drizzle |

## Estrutura principal

```text
app/
├── api/                 # Rotas de locais, avaliações, feed e check-ins
├── PoopSquareApp.tsx    # Interface principal da rede social
├── chatgpt-auth.ts      # Integração de autenticação
├── globals.css          # Estilos globais
├── layout.tsx           # Metadados e estrutura geral
└── page.tsx             # Página inicial

db/
├── index.ts             # Conexão com o banco
└── schema.ts            # Tabelas e modelos de dados

drizzle/                 # Migrações do banco
public/                  # Imagens e arquivos públicos
scripts/                 # Scripts de instalação e compilação
```

## Banco de dados

O projeto usa **Cloudflare D1** para armazenar:

- perfis de usuários;
- locais cadastrados;
- avaliações;
- check-ins;
- amizades e atividades sociais.

As estruturas estão definidas em `db/schema.ts`. Após alterações no esquema, gere uma nova migração:

```bash
npm run db:generate
```

## Geolocalização

A busca de endereços utiliza o Nominatim e os dados geográficos do OpenStreetMap. O GPS depende da autorização do usuário e de uma conexão HTTPS em produção.

Ao utilizar ou modificar o projeto, preserve a atribuição obrigatória ao OpenStreetMap.

## Publicação

A versão pública é hospedada no ChatGPT Sites com execução em Cloudflare Workers e banco D1.

O repositório também pode ser conectado a plataformas como a Vercel. Nesse caso, as integrações específicas do Cloudflare — especialmente D1 e a autenticação do ambiente Sites — precisam ser substituídas ou configuradas para o provedor escolhido.

## Privacidade e uso responsável

Não cadastre informações privadas ou sensíveis. Fotos, comentários e avaliações devem respeitar outras pessoas, os responsáveis pelo estabelecimento e a legislação aplicável.

## Autor

**Luiz Fernando Moura Piantino**

- GitHub: [@lfpiantino](https://github.com/lfpiantino)
- Site: [lfpiantino.com.br](https://lfpiantino.com.br/)

## Licença

A licença do projeto ainda não foi definida. Antes de reutilizar ou redistribuir o código, consulte o responsável pelo repositório.
