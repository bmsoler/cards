var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),   
    env = process.env.NODE_ENV || 'development';

/*
###  ACK's - Intervalo de tiempo para el reenvío de eventos sin ACK
*/
const INTERVAL_RESEND_EVENTS = 30000; //cada 30 s
const MAX_NUM_RESENDS = 3;

var config = {

  /*
  ### DESARROLLO - CONFIGURACIÓN PARA EL ENTORNO DE DESARROLLO
  */ 
  development: {    
    debug: true,
    root: rootPath,
    app: { name: 'api-cards' }, 
    port: process.env.PORT || 3500,
    db: 'mongodb://localhost/api-cards-dev',    
    interval_time_resend_events: INTERVAL_RESEND_EVENTS,
    max_num_resends: MAX_NUM_RESENDS
  },

  /*
  ### PRODUCCIÓN - CONFIGURACIÓN PARA EL ENTORNO DE PRODUCCIÓN
  */ 
  production: {
    debug: false,
    root: rootPath,
    app: { name: 'api-cards' },
    port: process.env.PORT || 3500,
    db: 'mongodb://localhost/api-cards',     
    interval_time_resend_events: INTERVAL_RESEND_EVENTS,
    max_num_resends: MAX_NUM_RESENDS    
  }  
};

module.exports = config[env];