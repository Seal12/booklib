var router = require('express').Router();
var mongoose = require('mongoose');

var Genre = mongoose.model("Genre");

// Create
router.post('/', (req, res, next) => {
  var { body: { genre } } = req;

  var newGenre = new Genre(genre);
  newGenre.save().then( () => {
    return res.json({genre: newGenre})
  }).catch(next)
})

// GetAll
router.get('/', (req, res, next) => {
  Genre.find().then( (genres) => {
    return res.json(genres);
  }).catch(next);
})

// GetById
router.get('/:id', (req, res, next) => {
  var genreId = req.params.id;
  Genre.find({_id: genreId}).then((genre) => {
    if(!genre) return res.sendStatus(404);
    return res.json({genre});
  }).catch(next);
})

// Update/Edit
router.put('/:id', (req, res, next) => {
  var genreId = req.params.id;
  var { body: { genre }} = req;

  Genre.findOneAndUpdate({_id: genreId}, genre, { upsert: false, new: true})
    .then( (updatedGenre) => {
      return res.json({genre: updatedGenre});
    }).catch(next);
})

// Delete/Remove
router.delete('/:id', (req, res, next) => {
  var genreId = req.params.id;
  Genre.findByIdAndRemove(genreId).then( (err, genre) => {
    if(err) return res.status(500).send(err);

    var response = {
      message: "Genre successfully deleted.",
      id: genre
    };
    return res.status(200).json(response);
  }).catch(next);
})

module.exports = router;
