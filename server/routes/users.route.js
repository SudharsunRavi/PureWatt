const router = require('express').Router();
const { registration, login, updateUser, deleteUser, getUsers, logout } = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/register', registration);
router.post('/login', login);
router.put('/:userid', updateUser);
router.delete('/:userid', deleteUser);
router.post('/logout', logout);

module.exports = router;