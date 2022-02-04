# Navedex API 

## O Sistema:
O sistema consiste em um criador de navedex's, nele tu poderá se cadastrar utilizando email e senha, e então ao logar terá acesso ao banco de dados dos seus navers, possuindo informações como: nomes, data de nascimento, cargos, tempo de empresa e projetos que participou. É possível saber em quais projetos um naver está e vice-versa, tudo baseado no usuário que fez a requisição.

## Postman
[**Documentation in Postman**](https://documenter.getpostman.com/view/16658273/UVeFMRdE)
**Coleção disponível na raiz do projeto**

### Tecnologias utilizadas:
RESTful usando Node.js, Express, Mysql, Sequelize.

### Arquitetura:
Para a criação do projeto foi utilizado o padrão arquitetural de software MVC.

## Siga os passos abaixo para executar o projeto:
1. Crie um banco de dados
2. Defina seus dados de acesso ao banco de dados em: /src/database/config.json
3. Renomeie o arquivo da raiz do projeto chamado .env.example para .env e neste defina uma senha secreta para a chave CHAVE_JWT
4. Inicie as dependências do projeto com o seguinte comando: npm init
5. Crie as tabelas do banco de dados executando as migrações com o seguinte comando: npx sequelize-cli db:migrate
6. Execute o seguinte comando para iniciar o servidor: npm run dev 

## Seedes
Foi disponibilizado junto do projeto seeders para popular o banco de dados da API, caso tenha interesse de utilizar estes dados, vide observações abaixo e após seguir as orientações execute o seguinte comando: npx sequelize-cli db:seed:all
### Observações seeders:
Foi adicionado no documento passport.js, na instância da estratégia local de autenticação a validação chamada validPasswordBd, tal validação foi adicionada para ser possível a utilização das seeders fornecidas junto da API, caso utilize as seeders descomente a validação e verificação de que faz parte, no documento acima mencionado.
Esta validação foi adicionada por dois motivos, o primeiro é que ao gerar as seeders a senha dos usuários não é criptografada pelo bcrypt(pois é diretamente persistida no banco de dados), e por este motivo logo falhará na validação(compare) com sua utilização e o segundo motivo é devido a relação entre as entidades Users, Navers e Projetos, sem os usuários não seria possível gerar as seeders das entidades relacionadas a este.

## Estrutura de diretórios:
```
├── /src
|   ├── /controllers
|   ├── /database
|   |   ├── /config
|   |   ├── /migrations
|   |   ├── /seeds
|   ├── /helpers
|   ├── /middlewares
|   ├── /models
|   ├── /routes
```
## Modelo relacional do banco de dados:
![modeloRelacionalNavedexAPI](https://user-images.githubusercontent.com/63760217/152434760-eef2ce01-dabf-4819-bc51-20fb66ca910b.png)