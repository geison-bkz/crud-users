```
> Feature User
-- Model user ( nome, email, password, data de criação, data de alteração ) - OK
 
-- Crud user
 
-- Create
--- Nome ( opcional ), Email e password devem ser obrigatórios - OK
--- Id deve ser criado com uuid - OK
--- Os usuários devem conter emails únicos - OK
--- Password deve ser encriptado - OK
--- Assim que o usuário for criado, deve ser criada uma pasta com id dele - OK
---- Iremos armazenar todos seus arquivos - OK
---- assets/files/:id - OK
 
-- Read
--- Uuid é obrigatório para efetuar a leitura - OK
--- Leitura do usuário deve ser feita pelo uuid - OK
--- Não teremos o read all ou list all - OK
 
--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode ler outro usuário
 
-- Update
--- Uuid é obrigatório para efetuar a edição - OK
--- A edição é somente para o name - OK
 
--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode editar outro usuário
 
-- Delete
--- Todos os dados deste usuário devem ser deletados, como: - OK
---- Arquivos - OK
---- Dados no banco - OK
---- Tudo relacionado a ele - OK
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD - OK
 
> Feature Auth
 
-- Rota Login
--- Validar os dados do usuários como: email e password - OK
--- Criar e retornar o Token JWT e Refresh Token - OK
--- Refresh Token deve possuir apenas ID - OK
 
-- Rota Token
--- Assim que o tempo do JWT expirar, devemos criar o seu refresh - OK
--- O Refresh token deve ser utilizado para gerar um novo token - OK
--- Criar e retornar o Token JWT e Refresh Token - OK
--- Refresh Token deve possuir apenas ID - OK
 
-- Débitos técnicos User --
 
--- Read
---- Autorização: só pode acessar a rota Logado - OK
---- Não pode ler outro usuário - OK
 
--- Update
---- Autorização: só pode acessar a rota Logado - OK
---- Não pode editar outro usuário - OK
 
-- Delete
---- Autorização: só pode acessar a rota Logado - OK
---- Não pode deletar outro usuário - OK
```