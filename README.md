# PythonApi_Crud
 Teste Api com Python

## API de Gerenciamento de Contatos

# Documentação

### Introdução

A API de Gerenciamento de Contatos é uma solução robusta e escalável para gerenciar contatos, permitindo adicionar, buscar, atualizar e deletar contatos de forma eficiente e segura. Esta documentação fornece uma visão geral da API, suas especificações, e um tutorial de como usar ela.

### Especificações

- Linguagem: Python 3.9+
- Framework: Flask 2.0+
- Banco de Dados: Não persiste dados em um banco de dados (utiliza lista em memória)

### Endpoints

Adicionar Contato

URL: /add
Método: POST
Corpo da Requisição: JSON com os seguintes campos:

name: nome do contato
phone: telefone do contato
email: e-mail do contato

Resposta:
201: contato adicionado com sucesso
400: erro de validação dos dados

Buscar Contatos
URL: /
Método: GET
Resposta:

200: contatos encontrados
404: nenhum contato encontrado

Buscar Contato por ID
URL: /<int:id>
Método: GET
Resposta:

200: contato encontrado
404: contato não encontrado

Atualizar Contato
URL: /update/<int:id>
Método: PUT
Corpo da Requisição: JSON com os seguintes campos:

name: novo nome do contato
phone: novo telefone do contato
email: novo e-mail do contato

Resposta:
200: contato atualizado com sucesso
400: erro de validação dos dados
404: contato não encontrado

Deletar Contato
URL: /delete/<int:id>
Método: DELETE
Resposta:

200: contato deletado com sucesso
404: contato não encontrado


## Tutorial de Uso

1. Adicionar Contato

Abra um cliente HTTP (como o curl ou um navegador) e envie uma requisição POST para a URL /add.
No corpo da requisição, inclua um JSON com os campos name, phone, e email.
Envie a requisição e verifique a resposta.



2. Buscar Contatos
Abra um cliente HTTP (como o curl ou um navegador) e envie uma requisição GET para a URL /.
Verifique a resposta e obtenha a lista de contatos.

3. Buscar Contato por ID
Abra um cliente HTTP (como o curl ou um navegador) e envie uma requisição GET para a URL /<int:id>.
Substitua <int:id> pelo ID do contato que você deseja buscar.

4. Atualizar Contato
Abra um cliente HTTP (como o curl ou um navegador) e envie uma requisição PUT para a URL /update/<int:id>.
Substitua <int:id> pelo ID do contato que você deseja atualizar.
No corpo da requisição, inclua um JSON com os campos name, phone, e email.
Envie a requisição e verifique a resposta.

5. Deletar Contato
Abra um cliente HTTP (como o curl ou um navegador) e envie uma requ isição DELETE para a URL /delete/<int:id>.
Substitua <int:id> pelo ID do contato que você deseja deletar.
Verifique a resposta e obtenha a confirmação de exclusão.



![mermaid-ai-diagram-2024-10-02-215508](https://github.com/user-attachments/assets/c0ee6472-239c-4197-af93-31a52334115d)

Este fluxo de funcionamento ilustra o processo de requisição e resposta do código. A requisição é enviada pelo cliente e processada pela API, que valida os dados de nome, telefone e e-mail. Em caso de sucesso, a API processa os dados e retorna uma resposta de sucesso ao cliente. Em caso de erro, a API retorna uma resposta de erro ao cliente.

## Detalhamento do Fluxo

A[Cliente]: O cliente envia uma requisição para a API.
B[API]: A API recebe a requisição e inicia o processo de validação de dados.
C[Validação de Nome]: A API valida o nome do cliente.
D[Validação de Telefone]: A API valida o telefone do cliente.
E[Validação de E-mail]: A API valida o e-mail do cliente.
F[Processamento de Dados]: A API processa os dados do cliente.
G[Resposta de Sucesso]: A API retorna uma resposta de sucesso ao cliente.
H[Erro de Validação de Nome]: A API retorna uma resposta de erro se o nome for inválido.
I[Erro de Validação de Telefone]: A API retorna uma resposta de erro se o telefone for inválido.
J[Erro de Validação de E-mail]: A API retorna uma resposta de erro se o e-mail for inválido.
K[Resposta de Erro]: A API retorna uma resposta de erro ao cliente.
L[Erro de Processamento]: A API retorna uma resposta de erro se houver um erro durante o processamento dos dados.

## Legenda

-->: Indica a direção do fluxo.
[ ]: Indica um passo do fluxo.
Erro: Indica um erro no fluxo.
Sucesso: Indica um sucesso no fluxo.




![mermaid-ai-diagram-2024-10-02-215922](https://github.com/user-attachments/assets/d01f33fb-3a37-4cad-a0d6-f94d9d6233dd)








