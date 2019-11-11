const { Router } = require('express');
// const ActionController = require('../controllers/Action');
const router = Router();
const auth = require('../middlewares/auth');

router.get('/', auth);

module.exports = router;
