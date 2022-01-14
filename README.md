Sistema de login e gerenciamento de usuários

Principais funções do sistema:
 - Login
 - Cadastrar um novo usuario
 - Editar um usuario ja cadastrado
 - Excluir um usuario
 - Exibir os usuarios cadastrados

 ## Instalação

1. Clone o repositório
```
git clone https://github.com/LuisFSouza/projetolgn.git
```

2. Instale as dependências - navegue até a pasta e execute o comando:
```
npm install
```

3. Crie um banco de dados em MySQL:
```
CREATE DATABASE nomedatabela;
```

4. Crie um arquivo `.env` na raiz do projeto. Modelo:
```
DB_HOST=Digite aqui o caminho do banco de dados
DB_PORT=Digite aqui a porta do banco de dados
DB_USER=Digite aqui o usuário do banco de dados
DB_PASS=Digite aqui a senha do banco de dados
DB_DATABASE=Digite aqui o nome do banco de dados
PASS_ADMIN= Digite aqui a senha do usuário que sera pre-cadastrado no banco de dados
SECRET_SESSION= Digite aqui o segredo usado para assinar o cookie da sessão do passport
```

5. Rode a migration para criar a tabela de usuarios:
```
npx knex migrate:latest
```

6. Rode a seed para criar o primeiro usuario pre-definido:
```
npx knex seed:run
```

O email do usuário pre-definido será `user1@gmail.com` e a senha será a digitada no campo PASS_ADMIN do arquivo `.env`

