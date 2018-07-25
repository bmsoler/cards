var express = require('express'),
  router = express.Router(),  
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'),
  EventPendingACK = mongoose.model('EventPendingACK'),
  config = require('../../config/config');

const resend = true;

var moment = require('moment-timezone');
moment().tz("Europe/Madrid").format(); 
 
module.exports = function (app) {
  0
  app.use('/', router);
  this.controlACKS = function(event, callback) { controlACKS(event, callback); };
};


/* ################################################################################################### */
/* Intervalo de tiempo para realizar los reintentos de envío de los eventos que no han recibido el ACK */
/* ################################################################################################### */
var interval = setInterval(function() {       
  var time = new Date(); 
  time = new Date(time.getTime() - config.interval_time_resend_events);  
  EventPendingACK.find({created_at:{ $lt: time }}, function(err, events){    
    if(!err){
      if(err) {        
        saveErrorLog('Error en reenvío de eventos sin ACK', err.message);     
      }else {        
        events.forEach(function (event) {   
          if (config.debug) console.log('['+new Date()+'] Reenvío de evento sin ACK');       
          emitEvent(event, resend);
        });
      }  
    }else {
      saveErrorLog('Error en reenvío de eventos sin ACK', err.message); 
    }
  });
}, config.interval_time_resend_events);
/* ################################################################################################### */
/* ################################################################################################### */
/* ################################################################################################### */



/* ################################################################################################### */
/* CONTROL DE ACK's RECIBIDOS ######################################################################## */
/* ################################################################################################### */
function controlACKS (event, callback) {   

  EventPendingACK.remove({ _id: event._id }, function(err) {
    if (!err) callback({ack:true});
    else callback({ack:false});
  }); 

}
/* ################################################################################################### */
/* ################################################################################################### */
/* ################################################################################################### */

