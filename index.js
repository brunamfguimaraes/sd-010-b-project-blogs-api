const express = require('express');

const app = express();
app.use(express.json());
const secret = 'secreto';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
const jwt = require('jsonwebtoken');
const { User, Categorie, BlogPost } = require('./models');

// middlewares
const { verifyName, verifyEmail, 
  verifyPassword, verifyEmpty, verifyDbUser, findById } = require('./middlewares/userMid');
const { verifyNameCateg } = require('./middlewares/categMid');
const { validateJWT } = require('./middlewares/tokenVerify');
const { VerifyTitle, VerifyContent } = require('./middlewares/blogMid');
// middlewares

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', verifyName, verifyEmail, verifyPassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { id } = await User.bulkCreate([{ displayName, email, password, image }]);
  const token = jwt.sign({ id, displayName, email, password, image }, secret, jwtConfig);
  return res.status(201).json({ token });
});

app.post('/login', verifyEmpty, verifyDbUser, async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return res.status(200).json({ token });
});

app.get('/user/:id', validateJWT, findById, async (req, res) => {
  const { id } = req.params;
  const db = await User.findOne({ where: { id } });
  return res.status(200).json(db);
});

app.get('/user', validateJWT, async (_req, res) => {
  User.findAll().then((users) => {
    res.status(200).json(users);
  });
});

app.post('/categories', validateJWT, verifyNameCateg, async (req, res) => {
  const { name } = req.body;
  const { id } = await Categorie.bulkCreate([{ name }]);
  return res.status(201).json({ id, name });
});

app.get('/categories', validateJWT, async (_req, res) => {
  Categorie.findAll().then((categ) => {
    res.status(200).json(categ);
  });
});

app.post('/post', validateJWT, VerifyTitle, VerifyContent, async (req, res) => {
  const { title, categoryIds, content } = req.body;
  const userId = req.user;
  const date = new Date().toISOString();
  const { id } = await BlogPost.bulkCreate([{ 
    userId, 
    title, 
    categoryIds, 
    content, 
    published: date, 
    updated: date }]);
  return res.status(201).json({ id, userId, title, content });
});
