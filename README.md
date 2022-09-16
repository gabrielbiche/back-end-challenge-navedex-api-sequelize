# Navedex API 

## O Sistema
O sistema consiste em um criador de navedex's, nele tu poderá se cadastrar utilizando email e senha, e então ao logar terá acesso ao banco de dados dos seus navers, possuindo informações como: nomes, data de nascimento, cargos, tempo de empresa e projetos que participou. É possível saber em quais projetos um naver está e vice-versa, tudo baseado no usuário que fez a requisição.


## Postman
[**Documentation in Postman**](https://documenter.getpostman.com/view/16658273/UVeFMRdE)

**_Coleção disponível na raiz do projeto_**


## Tecnologias utilizadas
RESTful usando Node.js, Express, Mysql, Sequelize.


## Arquitetura
Para a criação do projeto foi utilizado o padrão arquitetural de software MVC.


## Siga os passos abaixo para executar o projeto

1. Crie um banco de dados

2. Renomeie o arquivo da raiz do projeto chamado .env.example para .env e neste defina seus dados de acesso ao banco de dados, a porta para o servidor rodar e o payload em access_secret

3. Inicie as dependências do projeto
```
 npm install
```

4. Execute as migrações para criação das tabelas no banco de dados
```
npm run migrate
```

5. OPICIONAL) Caso queira você pode popular o banco de dados com as seeds fornecidas
```
npm run seed
```

6. Inicie o servidor
```
npm run dev
``` 


**_Vide seção scripts em package.json na raiz do projeto para conhecimento de comandos auxiliares._**

## Estrutura de diretórios

```
├── /src
|   ├── /controllers
|   ├── /database
|   |   ├── /config
|   |   ├── /migrations
|   |   ├── /seeders
|   ├── /helpers
|   ├── /middlewares
|   ├── /models
|   ├── /routes
```

## Modelo relacional do banco de dados

![modeloRelacionalNavedexAPI](https://user-images.githubusercontent.com/63760217/152434760-eef2ce01-dabf-4819-bc51-20fb66ca910b.png)
