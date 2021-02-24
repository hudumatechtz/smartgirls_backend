const router = require('express').Router();
const auth = require('../controllers/auth.controller');

router.get('/login', auth.getLogin);

module.exports = router;
