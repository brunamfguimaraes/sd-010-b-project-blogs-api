const express = require('express');

const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/Users');

router.route('/')
.get(getAllUsers)
.post(createUser);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

module.exports = router;