const CODE = require('http-status-codes');

const fieldValidations = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title) {
 return res.status(CODE.BAD_REQUEST).json({
  message: '"title" is required',
  }); 
}
  if (!content) {
 return res.status(CODE.BAD_REQUEST).json({
  message: '"content" is required',
  }); 
}
  if (!categoryIds) {
 return res.status(CODE.BAD_REQUEST).json({
  message: '"categoryIds" is required',
  }); 
}
  next();
};

/* continuar a validação do usuário */
// const userValidations = (req, res, next) => {
//   const { userId } = req.params;
//   const { user } = req.body;

//   if (userId !== user) {
//     return res.status(CODE.BAD_REQUEST).json({
//       message: 'Unauthorized user',
//     });
//   }
//   next();
// };


module.exports = {
  fieldValidations,
  userValidations,
};