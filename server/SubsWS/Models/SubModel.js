const mongoose = require('mongoose');

// 'Schema' maps to a MongoDB collection and defines the shape of the documents within that collection
// 'Schema' is the blueprint of the documents
const SubscriptionsSchema = new mongoose.Schema(
  {
    MemberId: String,
    Movies: [{
        movieId : String,
        date : String
    }],
  },
  { versionKey: false }
);

// A 'model' is a class with which we construct documents in a collection
const Subscriptions = mongoose.model('Subscriptions', SubscriptionsSchema);
// The first argument is the singular name of the collection that will be created for the model (Mongoose will create the database collection for the above model 'movie').
// The second argument is the schema to use in creating the model.
// The third argument is the name of the collection.


module.exports = Subscriptions;