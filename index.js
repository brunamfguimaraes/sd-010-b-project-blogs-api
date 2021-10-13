const express = require('express');
const LoginRouter = require('./controllers/LoginController');
const UserRouter = require('./controllers/UserController');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', UserRouter);
app.use('/login', LoginRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));