// Eventos pendientes de confirmar (ACK)

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UnconfirmedEventSchema = new Schema({
  event: [],
  ack: { type: Boolean, default: false },
  resends: []
}, { timestamps: { createdAt: 'created_at' } });

UnconfirmedEventSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('UnconfirmedEvent', UnconfirmedEventSchema);