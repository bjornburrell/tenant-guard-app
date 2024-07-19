const express = require('express');
const router = express.Router()
const homepageController = require('../controllers/homepage')


// Homepage Get Route
// 
// Path: /    (root)
router.get('/', homepageController.getHomepage);

// About Get Route
// 
// Path: /about    (root)
router.get('/about', homepageController.getAbout);

module.exports = router;
