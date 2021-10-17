require('dotenv').config();

const express = require('express');

const user = require('./router/user');
const login = require('./router/login');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/user', user);
app.use('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
