var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var BookSchema = new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Author'},
  description: String,
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  rating: Number,
  title: {type: String, required: [true, "is required"], index: true, unique: true},
},{timestamps: true});

BookSchema.plugin(uniqueValidator, {message: 'already exists.'});

mongoose.model('Book', BookSchema);
