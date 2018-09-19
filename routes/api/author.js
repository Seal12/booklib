var router = require('express').Router();
var mongoose = require('mongoose');

var Author = mongoose.model("Author");

// Create
router.post('/', (req, res, next) => {
  var { body: { author } } = req;

  var newAuthor = new Author(author);
  newAuthor.save().then( () => {
    return res.status(201).json({author: newAuthor})
  }).catch(next)
})

// GetAll
router.get('/', (req, res, next) => {
  Author.find().then( (authors) => {
    return res.json(authors);
  }).catch(next);
})

// GetById
router.get('/:id', (req, res, next) => {
  var authorId = req.params.id;
  Author.find({_id: authorId}).then((author) => {
    if(!author) return res.sendStatus(404);
    return res.json({author});
  }).catch(next);
})

// Update/Edit
router.put('/:id', (req, res, next) => {
  var authorId = req.params.id;
  var { body: { author }} = req;

  Author.findOneAndUpdate({_id: authorId}, author, { upsert: false, new: true})
    .then( (updatedAuthor) => {
      return res.json({author: updatedAuthor});
    }).catch(next);
})

// Delete/Remove
router.delete('/:id', (req, res, next) => {
  var authorId = req.params.id;
  Author.findByIdAndRemove(authorId).then( (err, author) => {
    if(err) return res.status(500).send(err);

    var response = {
      message: "Author successfully deleted.",
      id: author
    };
    return res.status(200).json(response);
  }).catch(next);
})

module.exports = router;
