const express = require('express');
const bodyparser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryConstroller');
const postController = require('./controllers/postController');
const jwtValidate = require('./middleware/validateJWT');
const validateCatNotEdit = require('./middleware/validateCategoryNotEdit');
const validateTitContent = require('./middleware/validateTitleContent');
const validateUserPost = require('./middleware/validateUserPost');

const app = express();
app.use(bodyparser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// Criando usuário
app.post('/user', userController.userCreate);

// Login do usuário
app.post('/login', loginController.userLogin);

// Criando Categorias
app.post('/categories', jwtValidate, categoryController.createCategory);

// Criando Post
app.post('/post', jwtValidate, postController.createPost);

// Listar Posts
app.get('/post', jwtValidate, postController.findPost);

// Atualizar Posts
app.put('/post/:id',
jwtValidate,
validateCatNotEdit,
validateTitContent,
validateUserPost,
postController.postUpdate);
// Deletar Post
app.delete('/post/:id', 
validateUserPost,
jwtValidate,
postController.deletePost);

// Pesquisar Post pelo Id
app.get('/post/:id', jwtValidate, postController.findPostById);

// Listar Categorias
app.get('/categories', jwtValidate, categoryController.findCategories);

// Listar usuários
app.get('/user', jwtValidate, userController.findUser);

// Pesquisa pelo Id
app.get('/user/:id', jwtValidate, userController.findById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
