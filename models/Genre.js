var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var GenreSchema = new Schema({
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  description: String,
  name: {type: String, required: [true, "is required"], index: true},
},{timestamps: true});

GenreSchema.plugin(uniqueValidator, {message: ' already exists.'});

mongoose.model('Genre', GenreSchema);
