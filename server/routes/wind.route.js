const router = require('express').Router();
const { create, update, deleteWind, getDetails } = require('../controllers/wind.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteWind);
router.get('/getdetails', getDetails);

module.exports = router;