var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var EpisodeSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  blurb: {
    type: String,
    required: true
  },
  embed: {
    type: String,
    required: true
  },
  postDate: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Episode = mongoose.model("Episode", EpisodeSchema);

// Export the Article model
module.exports = Episode;

///testing git push again