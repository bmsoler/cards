// Eventos pendientes de confirmar (ACK)

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var EventSchema = new Schema({
  event: [],
  ack: { type: Boolean, default: false },
  resends: []
}, { timestamps: { createdAt: 'created_at' } });

EventSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('EventPendingACK', EventSchema);
