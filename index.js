const express = require('express');
const requestLogin = require('./controllers/Login');
const { requestCreateUser } = require('./controllers/User');
const {
  passwordRequired,
  emailRequired,
} = require('./middlewares/loginMiddlewares');

const {
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
} = require('./middlewares/userMiddlewares');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login',
  emailRequired,
  passwordRequired,
  requestLogin);

app.post('/user',
  isValidName,
  isValidEmail,
  isValidPassword,
  uniqueEmail,
  requestCreateUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));