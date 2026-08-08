# Biblioteca de Filmes

Aplicação React para consultar filmes pelo The Movie Database (TMDB), com autenticação, favoritos, comentários, perfil público por slug e configurações de conta usando Supabase.

O projeto foi criado com Create React App e usa React Router v6, Supabase Auth/Postgres, CSS global com tokens e alguns componentes em `styled-components` ainda mantidos na base.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Rotas](#rotas)
- [Regras de negócio](#regras-de-negócio)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Banco de dados](#banco-de-dados)
- [Como rodar](#como-rodar)
- [Manutenção](#manutenção)

## Funcionalidades

- Listagem de filmes populares na Home.
- Busca de filmes por texto.
- Listagem por categorias do TMDB.
- Página de detalhes com pôster, sinopse, diretor, elenco, keywords e comentários.
- Login e cadastro em modal global, controlado por query string.
- Modal de conta com dados do usuário, atalhos, avatar e alteração de senha.
- Favoritos privados por usuário autenticado.
- Comentários por filme.
- Um usuário pode comentar apenas uma vez por filme.
- Notas decimais de 0 a 10, com passos de 0.5.
- Página compartilhável de comentários por slug de perfil.
- Controle de visibilidade da lista de comentários: pública ou privada.
- Estados de carregamento com componente `Spinner`.

## Stack

- React 18
- React Router DOM 6
- React Scripts 5
- Supabase JS 2
- TMDB API
- React Icons
- Styled-components
- CSS puro com variáveis CSS

## Arquitetura

O ponto de entrada fica em `src/index.js`, onde são configurados:

- `BrowserRouter`
- `AuthProvider`
- `ModalAuthProvider`
- `ModalContaProvider`
- `FavoritosProvider`
- rotas da aplicação

O componente `App` renderiza a estrutura comum da aplicação:

- `NavBar`
- `Outlet` das rotas
- `ModalAuth`
- `ModalConta`

### Pastas principais

```text
src/
  components/
    AvatarUsuario/
    Card-individual/
    Comentario/
    Container-filmes/
    ModalAuth/
    ModalConta/
    NavBar/
    Spinner/
  contexts/
    AuthContext.js
    FavoritosContext.js
    ModalAuthContext.js
    ModalContaContext.js
  pages/
    categorias/
    comentarios/
    favoritos/
    home/
    login/
    cadastro/
    movie/
    pesquisa/
    style.js
  routes/
    privateRoutes.js
  services/
    authServices.js
    comentarioService.js
    favoritosService.js
    movieService.js
    perfilService.js
    supaBase.js
  styles/
    tokens.css
```

### Componentes centrais

| Componente | Responsabilidade |
|---|---|
| `NavBar` | Navegação principal, busca e acesso a autenticação/conta. |
| `ContainerFilmes` | Card de filme em listagens, estrela de favorito e link para detalhes. |
| `CardIndividual` | Exibição detalhada do filme. |
| `KeywordSlider` | Lista visual de keywords do filme. |
| `Comentario` | Renderização de um comentário em detalhes do filme. |
| `AdicionarComentario` | Formulário para criar comentário e nota. |
| `ModalAuth` | Wrapper global para telas de login e cadastro. |
| `ModalConta` | Dados da conta, atalhos e alteração de senha. |
| `AvatarUsuario` | Avatar baseado no nome/email do usuário. |
| `Spinner` | Estado visual de carregamento. |

## Rotas

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Pública | Home com filmes populares do TMDB. |
| `/categoria?nome=top_rated` | Pública | Filmes mais bem avaliados. |
| `/categoria?nome=now_playing` | Pública | Filmes em cartaz/nos cinemas. |
| `/categoria?nome=upcoming` | Pública | Próximos lançamentos. |
| `/search?nome=<busca>` | Pública | Resultados de busca por texto. |
| `/movie/:id` | Pública | Detalhes de um filme, lista de comentários e formulário para usuário logado que ainda não comentou. |
| `/favoritos` | Privada | Lista de filmes favoritos do usuário logado. |
| `/comentarios` | Auxiliar | Resolve o slug do usuário logado e redireciona para `/comentarios/:slug`; sem sessão, redireciona para `/?auth=login`. |
| `/comentarios/:slug` | Pública/condicional | Lista comentários de um perfil quando pública; se privada, apenas o dono visualiza. |

### Query strings de modais

O projeto usa query strings para abrir modais globais sem criar rotas dedicadas para autenticação ou conta.

| Query string | Comportamento |
|---|---|
| `?auth=login` | Abre o modal de login. |
| `?auth=cadastro` | Abre o modal de cadastro. |
| `?conta=ver` | Abre o modal de conta do usuário logado. |

## Regras de negócio

### Autenticação

- A sessão é carregada no boot pelo `AuthContext`.
- O Supabase mantém a sessão atualizada via `onAuthStateChange`.
- Login e cadastro acontecem dentro do `ModalAuth`.
- Após cadastro, o app cria um registro na tabela `perfis`.
- Cada perfil recebe `nome`, `slug` e `lista_publica`.
- Rotas privadas usam `PrivateRoute`.
- Quando um visitante tenta acessar rota privada, ele é redirecionado para a mesma URL com `?auth=login`.

### Conta

- O modal de conta abre com `?conta=ver`.
- O modal só renderiza quando existe usuário autenticado.
- A conta mostra avatar, nome do perfil, email e atalhos para favoritos e comentários.
- A alteração de senha exige senha atual e nova senha.
- A nova senha deve ter pelo menos 6 caracteres e ser diferente da senha atual.
- A troca de senha reautentica o usuário antes de chamar `supabase.auth.updateUser`.
- A senha salva nunca é exibida; os ícones de olho apenas alternam a visibilidade do texto digitado.

### Filmes e TMDB

- A Home consome `movie/popular`.
- A página de categoria usa o valor de `nome` diretamente no endpoint de filmes do TMDB.
- A busca usa `REACT_APP_SEARCH_URL` com `query=<busca>`.
- Detalhes do filme carregam dados principais, keywords, créditos, diretor e elenco.
- O elenco exibido é limitado aos 8 primeiros nomes retornados pela API.
- As imagens usam `REACT_APP_IMAGE_URL` concatenado com `poster_path` ou `profile_path`.

### Favoritos

- Favoritos pertencem ao usuário logado.
- A tabela `favoritos` guarda `user_id` e `movie_id`.
- O `FavoritosContext` carrega os IDs favoritos do usuário atual.
- Os cards de filme exibem estrela vazia ou preenchida conforme o estado de favorito.
- Clicar na estrela adiciona ou remove o favorito.
- Se não houver usuário logado, a ação de favoritar não é executada.
- A página `/favoritos` busca os detalhes de cada filme favorito na TMDB.
- A tela diferencia carregamento, lista vazia e lista com dados.

### Comentários

- Comentários pertencem a um usuário e a um filme.
- Cada usuário pode ter no máximo um comentário por filme.
- Em `/movie/:id`, o formulário aparece apenas se o usuário estiver logado e ainda não comentou o filme.
- O comentário não pode estar vazio.
- A nota deve estar entre 0 e 10.
- O input de nota usa `type="number"`, `min="0"`, `max="10"` e `step="0.5"`.
- A página `/comentarios/:slug` funciona como URL compartilhável do perfil.
- `/comentarios` não é a página final: ela resolve o slug do usuário logado e redireciona.
- O dono do perfil pode alternar sua lista entre pública e privada.
- Visitantes não visualizam comentários quando a lista está privada.
- O serviço de comentários possui fallback para esquemas antigos sem `title`, `poster_path` ou relacionamento direto com `perfis`.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_KEY=sua_chave_do_tmdb
REACT_APP_URL=https://api.themoviedb.org/3/movie/
REACT_APP_SEARCH_URL=https://api.themoviedb.org/3/search/movie
REACT_APP_IMAGE_URL=https://image.tmdb.org/t/p/w500
REACT_APP_SUPABASE_URL=sua_url_do_supabase
REACT_APP_SUPABASE_KEY=sua_anon_key_do_supabase
```

Observação: `REACT_APP_IMAGE_URL` é concatenada diretamente com os caminhos retornados pelo TMDB, como `/abc.jpg`. Use uma URL base já com tamanho, por exemplo `https://image.tmdb.org/t/p/w500`.

## Banco de dados

O projeto espera as tabelas abaixo no Supabase.

### `perfis`

```sql
create table perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  slug text not null unique,
  lista_publica boolean not null default false
);
```

### `favoritos`

```sql
create table favoritos (
  id bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id bigint not null,
  created_at timestamp with time zone default now(),
  unique (user_id, movie_id)
);
```

### `comentarios`

```sql
create table comentarios (
  id bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  movie_id bigint not null,
  texto text not null,
  nota numeric(3,1) not null,
  title text,
  poster_path text,
  created_at timestamp with time zone default now(),
  unique (user_id, movie_id)
);
```

### Políticas de acesso

Se Row Level Security estiver ativa no Supabase, configure políticas compatíveis com as regras da aplicação:

- usuários autenticados podem criar, listar e remover seus próprios favoritos;
- usuários autenticados podem criar e remover seus próprios comentários;
- comentários podem ser lidos para exibição pública nas páginas de filme;
- perfis podem ser lidos por slug;
- apenas o dono do perfil pode atualizar `lista_publica`.

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente local:

```bash
npm start
```

Gere o build de produção:

```bash
npm run build
```

Execute os testes:

```bash
npm test
```

No Windows, se o PowerShell bloquear `npm.ps1`, use:

```bash
npm.cmd run build
```

## Manutenção

- Não crie uma rota `/login` separada sem mudar a arquitetura atual de modais por query string.
- Mantenha `/comentarios/:slug` como rota compartilhável do perfil.
- Preserve a regra de um comentário por usuário por filme no banco e na interface.
- Use `try/catch/finally` em telas assíncronas para evitar loading infinito.
- Ao adicionar telas que buscam dados, mantenha estados de carregando, vazio e com dados.
- Faça mudanças visuais globais primeiro em `src/styles/tokens.css`.
- Evite adicionar novas cores fixas diretamente em componentes.
- Prefira CSS com variáveis do projeto em novas telas; `styled-components` ainda existe por compatibilidade.
