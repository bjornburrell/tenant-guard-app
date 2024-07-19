const express = require('express');
const router = express.Router();
const routerController = require('../controllers/landing');

router.get('/', routerController.landingGet);
module.exports = router;