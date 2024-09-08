const router = require('express').Router();
const { create, update, deletePowerplant, getDetails } = require('../controllers/powerplant.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deletePowerplant);
router.get('/getdetails', getDetails);

module.exports = router;