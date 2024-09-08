const router = require('express').Router();
const { create, update, deleteGeothermal, getDetails } = require('../controllers/geothermal.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteGeothermal);
router.get('/getdetails', getDetails);

module.exports = router;