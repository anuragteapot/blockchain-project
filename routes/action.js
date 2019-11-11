const { Router } = require('express');
const ActionController = require('../controllers/Action');
const router = Router();
const auth = require('../middlewares/auth');

router.get('/', auth, ActionController.getSuits);

module.exports = router;
