// Event model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var EventSchema = new Schema({
  event: []
}, { timestamps: { createdAt: 'created_at' } });

EventSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Event', EventSchema);
