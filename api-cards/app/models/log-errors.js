// Log Error model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var LogErrorSchema = new Schema({
  info: { type: String },
  error: { type: String }
}, { timestamps: { createdAt: 'created_at' } });

mongoose.model('LogError', LogErrorSchema);
