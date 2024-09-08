const router = require('express').Router();
const { create, update, deleteSolar, getDetails } = require('../controllers/solar.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteSolar);
router.get('/getdetails', getDetails);

module.exports = router;