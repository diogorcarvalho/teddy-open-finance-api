# Teddy Open Finance - Teste para Vaga de Full Stack

### Descrição e Objetivo desse Repositório

Trata-se de um simples sistema WEB para cadastro de cliente (CRUD). O sistema terá uma tela inicial onde o usuário pode inserir o nome e, em seguida, será redirecionado para uma tela com a lista de todos os clientes cadastrados, onde poderá cadastrar, selecionar, atualizar e excluir clientes, além de uma tela para visualização dos clientes selecionados. São dois projetos separados, back-end (api) e front-end (web).  Esse é o projeto back-end. 

### Tecnologias Utilizadas

- Nest.js
- PostegrSQL + TypeORM
- Docke e Docke Compose
- TypeScript
- Swagger (Documentação de API)

## Pré-requisitos

- Docker instalado: [Instruções de instalação](https://docs.docker.com/get-docker/)
- Docker Compose instalado: [Instruções de instalação](https://docs.docker.com/compose/install/)

## Passo a Passo para Executar a Aplicação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/diogorcarvalho/teddy-open-finance-api.git
    cd teddy-open-finance-api
    ```

2. **Instale as depenências**:
    ```bash
    npm install
    ```

3. **Construa e inicie os containers**:
    No diretório raiz do projeto, execute:
    ```bash
    docker-compose up --build
    ```

4. **Acesse a aplicação**:
    A aplicação estará disponível em `http://localhost:3000`.

