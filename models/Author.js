var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var AuthorSchema = new Schema({
  age: Number,
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  bio: String,
  dob: Date,
  genres: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
  name: {type: String, required: [true, "is required"], index: true},
}, {timestamps: true});

AuthorSchema.plugin(uniqueValidator, {message: ' already exists.'});

mongoose.model('Author', AuthorSchema);
