# Delivery

## Descrição

Projeto criado com o objetivo de fazer o desafio de entrega para a empresa.

## Tecnologias Principais Usadas

- React
- Redux
- Typescript
- Eslint
- Nest
- Prisma
- Jest
- Banco de dados PostgreSQL

# Siga as Instruções
## Variável de Ambiente

- Copie e cole o .env
- Preencha o banco de dados, usuário, senha, host e porta que irá usar.
- Variáveis abaixo de URL, são variáveis padrões do projeto e não devem ser modificadas

## Instalação

```bash
$ yarn
```
ou
```bash
$ npm install
```

## Docker

```bash
$ docker-compose up -d
```

## Migração do Banco de Dados
- Crie um banco de dados com o mesmo nome de DATABASE_DATABASE no .env
- Rode o seguinte comando
```bash
$ yarn migrate
```
ou
```bash
$ npm run migrate
```

## Rode o Projeto

Back-end:
```bash
$ yarn start:dev
```
ou
```bash
$ npm run start:dev
```

Front-end:
```bash
$ yarn start
```
ou
```bash
$ npm run start
```

## Teste
Abra um dos arquivos das pasta spec que gostaria de testar e digite na linha de comando:
```bash
$ yarn test
```
ou
```bash
$ npm run test
```

## Licença

Nest is [MIT licensed](LICENSE).
