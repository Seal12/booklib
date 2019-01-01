var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var GenreSchema = new Schema({
  description: String,
  name: {type: String, required: [true, "is required"], index: true, unique: true,},
},{timestamps: true});

GenreSchema.plugin(uniqueValidator, {message: 'already exists.'});

mongoose.model('Genre', GenreSchema);
