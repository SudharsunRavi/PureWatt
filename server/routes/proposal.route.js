const router = require('express').Router();
const { create, update, deleteProposal, getDetails } = require('../controllers/proposal.controller');

router.post('/create', create);
router.put('/update', update);
router.delete('/delete', deleteProposal);
router.get('/getdetails', getDetails);

module.exports = router;