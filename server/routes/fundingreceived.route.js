const router = require('express').Router();
const { create, update, deleteFundingReceived, getDetails } = require('../controllers/fundingreceived.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteFundingReceived);
router.get('/getdetails', getDetails);

module.exports = router;