// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var LogSchema = new Schema({
  info: []
}, { timestamps: { createdAt: 'created_at' } });

LogSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Log', LogSchema);
