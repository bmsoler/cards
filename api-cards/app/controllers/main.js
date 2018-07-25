var express = require('express'),
  router = express.Router(),
  glob = require('glob'),
  mongoose = require('mongoose'),
  Event = mongoose.model('Event'), 
  EventPendingACK = mongoose.model('EventPendingACK'),
  UnconfirmedEvent = mongoose.model('UnconfirmedEvent'),
  LogError = mongoose.model('LogError'),
  config = require('../../config/config'),
  path = require('path');

var moment = require('moment-timezone');
moment().tz("Europe/Madrid").format();

module.exports = function (app) {
  app.use('/', router);
  this.emitEvent = function (event, resend = null) { emitEvent(event, resend); };
  this.saveErrorLog = function (info, error) { saveErrorLog(info, error); };
};


// ### #########################################################################
// ### SAVE EVENT IN DB AND EMIT ###############################################
// ### #########################################################################

/**
* Persintencia y emisión de eventos ############################################
*/
function emitEvent(event, resend = null) {

  /*
  * CONTROLAMOS SI ES UN REENVÍO DE EVENTO POR ACK NO RECIBIDO (resend = true)
  */

  //=> NUEVO EVENTO - NO REENVÍO ************************************************
  if (!resend) {

    //Creación del evento en la tabla de pendientes para reenviar sino es confirmado      
    new EventPendingACK({ "event": event }).save(function (err, newEvent) {
      if (err) {
        saveErrorLog('Error en emitEvent (new EventPendingACK)', err.message);
        return next(err);
      } else {
        event._id = newEvent._id;
        socketio.emit('evento', event);
      }
    });

    //Creación del evento en la tabla de eventos      
    new Event({ "event": event }).save(function (err, newEvent) {
      if (err) {
        saveErrorLog('Error en emitEvent (new Event)', err.message);
        return next(err);
      }
    });

    //=> REENVÍO DE EVENTOS *******************************************************
  } else {

    //Control del máximo de reintentos ------------------------------------------
    if ((event.resends) && (event.resends.length < config.max_num_resends)) {

      event.resends.push({ fecha: new Date() });

      //Actualizamos la información de los reenvíos y emitimos de nuevo
      EventPendingACK.findByIdAndUpdate(event._id, { $set: { resends: event.resends } },
        function (err, eventpendig) {
          if (err) {
            saveErrorLog('Error en actualización del evento pendiente de ACK al reenviar', err.message);
          } else {
            socketio.emit('evento', event.event[0]);
          }
        });

      //Evento que ha sobrepasado el máximo de reintentos
    } else {

      //Guardo el evento en una tabla de eventos no confirmados     
      new UnconfirmedEvent({ "event": event }).save(function (err, object) {
        if (err) {
          saveErrorLog('Error en guardar un evento no confirmado (new UnconfirmedEvent)', err.message);
          return next(err);
        } else {
          //Lo elimino de la lista de pendientes
          EventPendingACK.remove({ _id: event._id }, function (err) {
            if (err) {
              saveErrorLog('Error en borrado de evento pendiente de confirmar (EventPendingACK.remove)', err.message);
              return next(err);
            }
          });
        }
      });

    }

  }

}

// ### #########################################################################
// ### SAVE ERROR LOG ##########################################################
// ### #########################################################################
var saveErrorLog = function saveErrorLog(info, error) {
  new LogError({ "info": info, "error": error }).save(function (err, object) {
    if (err) console.log(err);
  });
}



// ### #########################################################################
// ### test ####################################################################
// ### #########################################################################

/**
   * @api {put} /test/:param1/:param2 Test method
   * @apiVersion 2.0.0
   * @apiName Test
   * @apiGroup Title menu API
   *
   * @apiParam {String} origen Número de origen de la llamada.
   * @apiParam {String} destino Número de destino de la llamada.
   * @apiParam {String} empresa Empresa que realiza la llamada <span style='color:#c35a2f; '> [ calipso ] </span>
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "code": 200,
   *       "response": true
   *     }
   *
   * @apiError 404_Not_Found El servicio no ha sido encontrado.
   * @apiError 400_Bad_Request El request no es correcto.
   * @apiError 422_Unprocessable_Entity Error en la validación.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "Método no encontrado"
   *     }
   *
   *     HTTP/1.1 400 Bad Request
   *     {
   *       "error": "El request no es correcto"
   *     }
   *
   *     HTTP/1.1 422 Unprocessable Entity
   *     {
   *       "error": "Error en la validación"
   *     }
   */
router.put('/test/:param1/:param2', function (req, res, next) {
  let param1 = req.params.param1;    
  res.status(200).send("Procesado correctamente");
});


/* Obtención de estadísticas */
router.get('/getEstadisticas/:empresa/:fecha', function (req, res, next) {
  try {

    let empresa = req.params.empresa;
    let fecha = req.params.fecha;

    /*
      DE MOMENTO SOLO MUESTRO EL HORARIO DEL SERVICIO
    */
    let startTime = new Date(fecha);
    startTime.setHours(9, 0, 0, 0);
    let endTime = new Date(fecha);
    endTime.setHours(17, 30, 0);

    // console.log('startTime: ',startTime);
    // console.log('endTime: ',endTime)

    Statistic.find({
      created_at: {
        $gte: startTime,
        $lt: endTime
      }
    }).exec(function (err, data) {
      if (err) res.status(500).send(err);
      else res.status(200).send(data);
    });

  } catch (err) {
    res.status(500).send(err);
  }
});


/* Información del estado de las variables globales */
router.get('/infoGlobalVars', function (req, res, next) {
  let INFO = [];
  INFO.push({ 'ASTERISKS': ASTERISKS });
  res.status(200).send(INFO);
});

