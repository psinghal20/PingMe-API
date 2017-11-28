var express = require('express');
var router = express.Router();
var controllers = require('./../controllers/controllers');

router.get('/search/movies',controllers.SearchMovie);
router.get('/search',controllers.SearchTorrent);

module.exports = router;