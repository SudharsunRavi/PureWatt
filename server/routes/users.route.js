const router = require('express').Router();
const { registration, login, updateUser, deleteUser, getUsers } = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/registration', registration);
router.post('/login', login);
router.put('/:userid', updateUser);
router.delete('/:userid', deleteUser);

module.exports = router;