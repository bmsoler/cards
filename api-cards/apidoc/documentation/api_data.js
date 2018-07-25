define({ "api": [
  {
    "type": "put",
    "url": "/recuperarLlamada/:idLlamada/:operador/:empresa",
    "title": "Recupera una llamada en espera",
    "version": "2.0.0",
    "name": "pausarLlamada",
    "group": "Llamadas_en_espera",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idLlamada",
            "description": "<p>ID de la llamada en espera.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "operador",
            "description": "<p>Número de extensión que puso la llamada en espera.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "empresa",
            "description": "<p>Empresa de la operación <span style='color:#c35a2f; '> [ calipso ] </span></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 200,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404_Not_Found",
            "description": "<p>El servicio no ha sido encontrado.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400_Bad_Request",
            "description": "<p>El request no es correcto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422_Unprocessable_Entity",
            "description": "<p>Error en la validación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Método no encontrado\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n  \"error\": \"El request no es correcto\"\n}\n\nHTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": \"Error en la validación\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/main.js",
    "groupTitle": "Llamadas_en_espera"
  },
  {
    "type": "put",
    "url": "/transferirLlamadaOperador/:idLlamada/:extension/:empresa",
    "title": "Trasferir llamada (espera) a un operador",
    "version": "2.0.0",
    "name": "transferirLlamadaOperador",
    "group": "Llamadas_en_espera",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idLlamada",
            "description": "<p>ID de la llamada en espera.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "extension",
            "description": "<p>Extensión del operador al que se transferirá la llamada.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "empresa",
            "description": "<p>Empresa de la operación <span style='color:#c35a2f; '> [ calipso ] </span></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 200,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404_Not_Found",
            "description": "<p>El servicio no ha sido encontrado.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400_Bad_Request",
            "description": "<p>El request no es correcto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422_Unprocessable_Entity",
            "description": "<p>Error en la validación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Método no encontrado\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n  \"error\": \"El request no es correcto\"\n}\n\nHTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": \"Error en la validación\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/main.js",
    "groupTitle": "Llamadas_en_espera"
  },
  {
    "type": "put",
    "url": "/crearLlamada/:origen/:destino/:empresa",
    "title": "Crear una llamada saliente",
    "version": "2.0.0",
    "name": "CreaLlamada",
    "group": "Llamadas_salientes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "origen",
            "description": "<p>Número de origen de la llamada.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "destino",
            "description": "<p>Número de destino de la llamada.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "empresa",
            "description": "<p>Empresa que realiza la llamada <span style='color:#c35a2f; '> [ calipso ] </span></p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 200,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404_Not_Found",
            "description": "<p>El servicio no ha sido encontrado.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400_Bad_Request",
            "description": "<p>El request no es correcto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422_Unprocessable_Entity",
            "description": "<p>Error en la validación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Método no encontrado\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n  \"error\": \"El request no es correcto\"\n}\n\nHTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": \"Error en la validación\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/main.js",
    "groupTitle": "Llamadas_salientes"
  },
  {
    "type": "put",
    "url": "/crearConferencia/:idLlamada/:linkedid/:empresa/:participante?",
    "title": "Crear una conferencia",
    "version": "2.0.0",
    "name": "CrearConferencia",
    "group": "Operadores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idLlamada",
            "description": "<p>ID de la llamada donde se creará la conferencia.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "linkedid",
            "description": "<p>ID de la llamada enlazada donde se creará la conferencia.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "empresa",
            "description": "<p>Empresa o servicio de la conferencia <span style='color:#c35a2f; '> [ calipso] </span></p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "participante",
            "description": "<p>Optional Número de teléfono que se añadirá a la conferencia.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": 200,\n  \"response\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404_Not_Found",
            "description": "<p>El servicio no ha sido encontrado.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400_Bad_Request",
            "description": "<p>El request no es correcto.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422_Unprocessable_Entity",
            "description": "<p>Error en la validación.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Método no encontrado\"\n}\n\nHTTP/1.1 400 Bad Request\n{\n  \"error\": \"El request no es correcto\"\n}\n\nHTTP/1.1 422 Unprocessable Entity\n{\n  \"error\": \"Error en la validación\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/main.js",
    "groupTitle": "Operadores"
  },
  {
    "type": "socket.io",
    "url": "/",
    "title": "desenlazaLlamada",
    "version": "2.0.0",
    "name": "desenlazaLlamada",
    "group": "Socket_io",
    "success": {
      "examples": [
        {
          "title": "JSON emitido:",
          "content": "{\n  \"empresa\": \"calipso\",     \n  \"evento\": \"desenlazaLlamada\",\n  \"idLlamada\": \"1498805769.3\",\n  \"numero\": \"955329603\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/calipso.js",
    "groupTitle": "Socket_io"
  },
  {
    "type": "socket.io",
    "url": "/",
    "title": "enlazaLlamadaAparcada",
    "version": "2.0.0",
    "name": "enlazaLlamada",
    "group": "Socket_io",
    "success": {
      "examples": [
        {
          "title": "JSON emitido:",
          "content": "{\n  \"empresa\": \"calipso\",     \n  \"evento\": \"enlazaLlamadaAparcada\",\n  \"idLlamada\": \"1498805769.3\",\n  \"idLlamadaNuevo\": \"1498805769.4\",\n  \"destino\": \"991\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/calipso.js",
    "groupTitle": "Socket_io"
  },
  {
    "type": "socket.io",
    "url": "/",
    "title": "enlazaLlamadaSaliente",
    "version": "2.0.0",
    "name": "enlazaLlamadaSaliente",
    "group": "Socket_io",
    "success": {
      "examples": [
        {
          "title": "JSON emitido:",
          "content": "{\n  \"empresa\": \"calipso\",     \n  \"idLlamada\": \"1447056816.3\",\n  \"linkedid\": \"1447056816.4\",\n  \"evento\": \"enlazaLlamadaSaliente\",\n  \"cliAgente\": \"101\",\n  \"numeroUsuario\": \"955329603\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/calipso.js",
    "groupTitle": "Socket_io"
  },
  {
    "type": "socket.io",
    "url": "/",
    "title": "finLlamadaSaliente",
    "version": "2.0.0",
    "name": "finLlamadaSaliente",
    "group": "Socket_io",
    "success": {
      "examples": [
        {
          "title": "JSON emitido:",
          "content": "{\n  \"empresa\": \"calipso\",     \n  \"idLlamada\": \"1447056816.3\",\n  \"evento\": \"finLlamadaSaliente\",\n  \"tiempoTotal\": \"10\"\n  \"tiempoEspera\": \"5\"\n  \"contestado\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/api/calipso.js",
    "groupTitle": "Socket_io"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "apidoc/documentation/main.js",
    "group": "_home_blas_workspace_api_gurami_apidoc_documentation_main_js",
    "groupTitle": "_home_blas_workspace_api_gurami_apidoc_documentation_main_js",
    "name": ""
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "apidoc/template/main.js",
    "group": "_home_blas_workspace_api_gurami_apidoc_template_main_js",
    "groupTitle": "_home_blas_workspace_api_gurami_apidoc_template_main_js",
    "name": ""
  }
] });
