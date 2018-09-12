var router = require('express').Router();

router.use('/author', require('author'));
router.use('/books', require('books'));
router.use('/genre', require('genre'));

module.exports = router;
