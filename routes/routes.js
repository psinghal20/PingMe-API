var express = require('express');
var router = express.Router();
var controllers = require('./../controllers/controllers');

router.post('/search/movies',controllers.SearchMovie);
router.post('/search',controllers.SearchTorrent);

module.exports = router;