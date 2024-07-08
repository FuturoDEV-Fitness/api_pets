# Semana 07 - Express Avançado

## Rodar o repositório:

### Na primeira vez é necessário instalar as dependencias:
1. `npm install`
2. `cp .env_example .env`

### Para rodar o repositório em ambiente local
1. `npm run start:dev`

## Trabalhando com migrations:

### Criar uma migration
1. Opção nº 1: `sequelize migration:generate --name nome_da_migracao`
2. Opção nº 2: `npx sequelize-cli migration:generate --name criar_tabela_alunos`
### Rodar uma migration. Opções:
1. Opção nº 1: `sequelize db:migrate`
2. Opção nº 2: `npx sequelize db:migrate`

### Reverter a última migration:
1. Opção nº 1: `sequelize-cli db:migrate:undo`
2. Opção nº 2: `npx sequelize-cli db:migrate:undo`

### Reverter todas as migrations:
1. Opção nº 1: `sequelize-cli db:migrate:undo:all`
2. Opção nº 2: `npx sequelize-cli db:migrate:undo:all`


## Trabalhando com Seeders

### Executar o seeders para gerar valores iniciais no banco de dados:
1. Opção nº 1: `sequelize db:seed:all`
2. Opção nº 2: `npx sequelize db:seed:all`

## Documentação do Sequelize:
https://sequelize.org/docs/v6/core-concepts/model-basics/

## Bibliotecas utilizadas:

### instalar o sequelize
`npm install sequelize` 
### instalar o driver do PostgreSQL
`npm install pg` 
### instalar o CLI do sequelize
`npm install -g sequelize-cli` 
### instalar o dotenv
`npm install dotenv`
### instalar o JsonWebToken ( JWT )
`npm install jsonwebtoken`
### instalar o axios
`npm install axios`