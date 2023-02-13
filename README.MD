# Desafio Visie

Este teste de React é baseado na criação de um sistema para administrar produtos (basicamente um CRUD). Os dados devem ser obtidos através da API do DummyJSON. A documentação está disponível em "https://dummyjson.com/docs/products", e nela temos todos os endpoints necessários.
O sistema deve ser composto por 4 telas. A seguir, você tem a descrição destas telas e alguns dos requisitos do sistema.

**(1) Tela "índice":** listagem de produtos
Descrição: página que lista os produtos do e-commerce. Trata-se de uma lista simples, com os botões para ações.
Cada linha da lista deverá ter: nome do produto | ver dados | alterar | excluir
A quantidade de produtos exibidos fica a seu critério.
Comportamento dos botões:
ver dados: leva o usuário à página/rota "produto selecionado";
alterar: leva o usuário à página/rota "atualizar dados de produto";
excluir: questiona o usuário se o mesmo tem certeza da exclusão e, em caso afirmativo, confirma a exclusão após receber um retorno via API.

**(2) Tela "produto selecionado":** dados completo sobre o produto selecionado
Descrição: página que exibe todos os dados existentes do produto, inclusive imagens. A página deve exibir os botões "alterar" e "excluir".

**(3) Tela "atualizar dados de produto":** formulário para a atualização de dados do produto selecionado
Descrição: página que exibe formulário já preenchido com os dados atuais do produto. A página deve exibir um botão "cancelar", que retorna o usuário à listagem sem efetuar qualquer tipo de mudança no produto.

**(4) Tela "adicionar produto":** formulário para adição de produto
Descrição: página exibe um formulário onde cada campo representa um dos dados existentes do produto. É esperado o uso de validação simples (recursos nativos HTML5).

#### INSTRUÇÕES JAVASCRIPT

pode-se utilizar "micro-frameworks" react, como o "Toastify", por exemplo.
é desejável que se evite o uso de frameworks (desconsidere esta observação se ela impossibilitar seu desenvolvimento ou atrasar demais a entrega do teste);
é altamente desejável o uso de Typescript.

#### INSTRUÇÕES CSS

Não há layout definido. Deve-se utilizar padrões da indústria de desenvolvimento web de forma livre. É permitido o uso de frameworks CSS, como o "Material UI", por exemplo.

Informe os frameworks utilizados, qual a função dele e as vantagens de seu uso.
Exemplo: Toastify. Framework utilizado para exibição de notificações para o usuário. O utilizei pela fácil implementação e versatilidade.

## Comandos
- **npm install** para baixar as dependências;
- **npm run dev** para startar o servidor local.

## Frameworks Utilizados

- React-bootstrap, [Link](https://react-bootstrap.netlify.app/).

## Bibliotecas utilizadas

- vite, [Link](https://vitejs.dev/guide/);
- react-input-mask, [Link](https://www.npmjs.com/package/react-input-mask);
- react-number-format, [Link](https://www.npmjs.com/package/react-number-format);
- react-icons, [Link](https://react-icons.github.io/react-icons);
- react-router-dom, [Link](https://www.npmjs.com/package/react-router-dom);
- react-toastify, [Link](https://www.npmjs.com/package/react-toastify);
- sweetalert2, [Link](https://www.npmjs.com/package/sweetalert2);
- formik, [Link](https://www.npmjs.com/package/formik);
- yup, [Link](https://www.npmjs.com/package/yup).
