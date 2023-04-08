# Ranch - Gerenciamento de Banco
<img src="https://img.shields.io/badge/Vue.JS-000?style=for-the-badge&logo=vue.js&logoColor=white%22" /><img src="https://img.shields.io/badge/MY%20SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff" /> <img src="https://img.shields.io/badge/SEQUELIZE-52B0E7?style=for-the-badge&logo=sequelize&logoColor=ffffff&%22)" /><img src="https://img.shields.io/badge/BOOTSTRAP-7952B3?style=for-the-badge&logo=bootstrap&logoColor=ffffff" />
<img src="https://img.shields.io/badge/-TOPICS--SEQUELIZE%20----%20BOOTSTRAP%20----%20DATABASE--MANAGEMENT%20----%20API%20REST-blue?style=for-the-badge&logo=acclaim" />

## Descrição
O projeto trata-se de um dashboard completo e funcional que permite o gerenciamento de um sistema de banco de dados.

Nesse projeto, foi possível exercitar os seguintes conceitos: 
- Desenvolvimento de uma API Restful com o Sequelize ORM e MySQL Database;
- Utilização de Migrations e Seeders;
- Desenvolvimento de uma plataforma com o framework Vue.js, com o uso dos componentes Bootstrap.
- Gestão de estado da aplicação e uso de rotas no Vue.js 

## Desenvolvedor

<a href="https://github.com/ryan-fauder">Ryan Fernandes Auder Lopes (ryan-fauder)</a>

## Dashboard

<img src="https://i.imgur.com/KWcPZJP.png" />

Para visualizar mais imagens da interface, basta entrar no readme.md da pasta `frontend`.

## Como começar a utilizar

Faça um clone do repositório em sua máquina e entre na pasta do projeto:

```bash
git clone https://github.com/ryan-fauder/ranch-app.git && cd ./ranch-app
```
Agora, instale as dependências do projeto com o uso do `npm` ou do `yarn`, ambas as pastas `frontend` e `backend` possuem dependências.

### Iniciando API (backend)

Primeiro, deve-se realizar as configurações do banco de dados `Mysql` local para iniciar o backend. Para abrir a pasta do arquivo de configuração:

```bash
  cd ./backend/config
```
Agora, basta alterar as informações do arquivo `config.js`. Uma vez que foi configurado, retorne para a pasta `backend` e, na pasta, execute as migrations:

```bash
  npx sequelize db:migrate
```

Caso seja necessário, execute as seeds para popular as tabelas criadas pelo comando:

```bash
  npx sequelize db:seed:all
```

Agora, para iniciar a API, utilize:

```bash
  yarn server
```

Pronto, o backend agora deve estar em execução.


### Iniciando o dashboard (frontend)

Com as dependências instaladas, entre na pasta `frontend` e apenas inicie o serviço Vue:

```bash
  yarn serve
```

Pronto, o dashboard agora deve estar em execução.

## Logo - Fonte

A logo gratuita utilizada: 

<a href="https://www.flaticon.com/free-icons/cowboy-hat" title="cowboy-hat icons">Cowboy-hat icons created by Freepik - Flaticon</a>
