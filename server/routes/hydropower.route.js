const router = require('express').Router();
const { create, update, deleteHydropower, getDetails } = require('../controllers/hydropower.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteHydropower);
router.get('/getdetails', getDetails);

module.exports = router;