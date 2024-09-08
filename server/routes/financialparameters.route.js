const { create, update, deleteParam, getDetails } = require('../controllers/financialparameters.controller');

const router = require('express').Router();

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteParam);
router.get('/getdetails', getDetails);

module.exports = router;