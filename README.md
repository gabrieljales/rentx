# Rentalx
## Sobre o projeto
### Cadastro de carro
- **RF:**
  - Deve ser possível cadastrar um novo carro.
  - Deve ser possível listar todas as categorias.

- **RN:** 
  - Não deve ser possível cadastrar um carro com uma placa já existente.
  - Não deve ser possível alterar a placa de um carro.
  - Por padrão, o carro deve ser cadastrado com disponibilidade.
  - O usuário responsável pelo cadastro, deve ser um usuário administrador.

### Listagem de carros
- **RF:**
  - Deve ser possível listar todos os carros disponíveis.
  - Deve ser possível listrar todos os carros disponíveis pelo nome da categoria.
  - Deve ser possível listrar todos os carros disponíveis pelo nome da marca.
  - Deve ser possível listrar todos os carros disponíveis pelo nome do carro.

- **RN:**
  - O usuário não precisa estar logado no sistema.

### Cadastro de especificações no carro
- **RF:**
  - Deve ser possível cadastrar possível cadastrar uma especificação para um carro.
  - Deve ser possível listar todas as especificações.
  - Deve ser possível listar todos os carros.

- **RN:**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
  - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  - O usuário responsável pelo cadastro, deve ser um usuário administrador.

### Cadastro de imagens do carro
- **RF:**
  - Deve ser possível cadastrar a imagem do carro.

- **RF:**
  - Utilizar o multer para upload dos arquivos.

- **RN:**
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
  - O usuário responsável pelo cadastro, deve ser um usuário administrador.

### Aluguel de carro
- **RF:**
  - Deve ser possível cadastrar um aluguel.
- **RN:**
  - O aluguel deve ter duração mínima de 24 horas.
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

## Legenda de requisitos
- **Requisitos Funcionais (RF):** São as funcionalidades que a aplicação terá.
  - Exemplo: Usuário pode cadastrar uma categoria.
- **Requisitos Não Funcionais (RNF):** São requisitos que não estão ligados diretamente com a aplicação ou a regra de negócio.
  - Exemplo: Dados devem ser salvos no banco de dados PostgreSQL. Qual biblioteca ou banco usar, esse tipo de coisa.
- **Regras de Negócio (RN):** São as regras, de fato, que estão por trás dos requisitos.
  - Exemplo: Não deve ser possível cadastrar uma categoria com um nome já existente.
  
## Diagrama
![diagram](diagram.png)

## Sobre o TypeORM
A versão que usei nesse projeto foi a ^0.3.7, que teve muitas mudanças em relação a 0.2.* que a maioria dos tutoriais utiliza. Por esse motivo, resolvi anotar as configurações e comandos no Notion para facilitar o uso em futuros projetos. Link do notion [AQUI](https://ruby-crow-8bf.notion.site/0-3-977b2ae35c464e4e91faf43c8d9b5bdb)

### Rodar migrations:
    $ yarn typeorm migration:run -d ./src/shared/infra/typeorm/index.ts

### Criar uma migration:
    $ yarn typeorm migration:create ./src/shared/infra/typeorm/migrations/teste

### Reverter a última migration:
    $ yarn typeorm migration:revert -d ./src/shared/infra/typeorm/index.ts