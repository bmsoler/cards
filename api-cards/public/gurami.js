var express = require('express'),
	app = express(),
	fs = require('fs')
	util = require('util'),
  	config = require('./config/config'),
  	glob = require('glob'),
  	//MongoDB
  	mongoose = require('mongoose'),
  	cluster = require('cluster'),   	
	numCPUs = require('os').cpus().length,	
	io = null;

  
// ### ####################################################################
// ### MONGODB ############################################################
// ### ####################################################################
mongoose.connect(config.db, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to mongodb database at ' + config.db);
});//######################################################################


// ### #####################################################################################
// ### Arranque del servidor ###############################################################
// ### #####################################################################################
var server = app.listen(config.port, function () {  
  console.log('Express server listening on port ['+ config.port +'] in '+process.env.NODE_ENV+' mode [numCPUs:'+numCPUs+']');
  console.log('[Mongoose] connect', config.db);
}); 

// ### #########################################################################
// ### SOCKET.IO ###############################################################
// ### #########################################################################
io = require('socket.io').listen(server);
//Número ilimitado de Listeners para socket.io
io.sockets.setMaxListeners(0);

var clientes = 0;
var info_socket;

//Notificación de cliente conectado
io.on('connection', function (socket) {

	info_socket = socket.id;
	if ((socket.request) && (socket.request.connection) && (socket.request.connection._peername) && (socket.request.connection._peername.address)) {
		info_socket = socket.request.connection._peername.address;
	}
	
	clientes++;
	console.log('Cliente conectado:', info_socket, ', Conexiones actuales: '+clientes);
	socket.on('disconnect', function(){
		clientes--;
		console.log('Cliente desconectado:', info_socket, ', Conexiones actuales: '+clientes);
	});

	// **************************************************************************************
	// Recepción de ACK's *******************************************************************
	// **************************************************************************************
	socket.on('ack', function(event, callback){	    	
		//if (config.debug) console.log('[ACK] Evento "'+event.evento+'" [_id:'+event._id+']');
	    controlACKS(event, callback);	    
	});//************************************************************************************	

	// **************************************************************************************
	// Recepción de ACK's de Aunna **********************************************************
	// **************************************************************************************
	// socket.on('ack-aunna', function(event, callback){	    	
	// 	if (config.debug) console.log('[ACK-AUNNA] Evento "'+event.evento+'" [_id:'+event._id+']');
	//     controlACKS(event, callback);	    
	// });//************************************************************************************

	// **************************************************************************************
	// Recepción de eventos *****************************************************************
	// **************************************************************************************
	socket.on('accion_cliente', function(params, callback){	  	
		//if (config.debug) console.log('[accion_cliente] Params ',params);
		accionCliente(params, callback);	
	});//************************************************************************************	

});
  

// ### #########################################################################
// ### VARIABLES GLOBALES ######################################################
// ### #########################################################################

//Definimos como global el socket para que esté accesible desde los controllers
global.socketio = io;




// Definimos la lista de asterisk con la que vamos a trabajar
global.ASTERISKS = []; 

// Fichero global de logs
global.log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'}); 




// ### #########################################################################
// ### Exportación de datos al fichero express.js ##############################
// ### #########################################################################
module.exports = require('./config/express')(app, config);   





