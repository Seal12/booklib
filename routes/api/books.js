var router = require('express').Router();
var mongoose = require('mongoose');

var Book = mongoose.model("Book");

// Create
router.post('/', (req, res, next) => {
  var { body: { book } } = req;

  var newBook = new Book(book);
  newBook.save().then( () => {
    return res.json({book: newBook})
  }).catch(next)
})

// GetAll
router.get('/', (req, res, next) => {
  Book.find().then( (books) => {
    return res.json(books);
  }).catch(next);
})

// GetById
router.get('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.find({_id: bookId}).then((book) => {
    if(!book) return res.sendStatus(404);
    return res.json({book});
  }).catch(next);
})

// Update/Edit
router.put('/:id', (req, res, next) => {
  var bookId = req.params.id;
  var { body: { book }} = req;

  Book.findOneAndUpdate({_id: bookId}, book, { upsert: false, new: true})
    .then( (updatedBook) => {
      return res.json({book: updatedBook});
    }).catch(next);
})

// Delete/Remove
router.delete('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.findByIdAndRemove(bookId).then( (err, book) => {
    if(err) return res.status(500).send(err);

    var response = {
      message: "Book successfully deleted.",
      id: book
    };
    return res.status(200).json(response);
  }).catch(next);
})

module.exports = router;
