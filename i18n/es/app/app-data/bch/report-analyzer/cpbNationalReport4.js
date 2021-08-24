define(function () {
  'use strict';

  var cpbNationalReport4 = [
    {
       "key": "General",
       "title": "Parte en el Protocolo de Cartagena sobre Seguridad de la Biotecnología",
       "questions": [
          {
             "key": "Q012_party",
             "section": "General",
             "number": "11",
             "type": "option",
             "title": "¿Es su país parte en el Protocolo de Cartagena sobre la Seguridad de la Biotecnología (CPB)?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q012_partyInProgress",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q013",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q012_partyInProgress",
             "section": "General",
             "number": "12",
             "type": "option",
             "title": "Si su país no es parte en el Protocolo de Cartagena sobre Seguridad de la Biotecnología (CPB), ¿se ha establecido algún proceso nacional para convertirse en Parte?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q013",
             "section": "General",
             "number": "13",
             "type": "lstring",
             "title": "Puede proporcionar más detalles a continuación",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article2",
       "title": "Artículo 2 – Disposiciones generales",
       "description": "<i>El artículo 2 establece que cada Parte tomará las medidas legislativas, administrativas y de otro tipo necesarias y convenientes para cumplir sus obligaciones dimanantes del Protocolo</i>",
       "questions": [
          {
             "key": "Q014",
             "section": "Article2",
             "number": "14",
             "type": "option",
             "title": "¿Ha adoptado su País las medidas nacionales necesarias para la aplicación del Protocolo?",
             "multiple": false,
             "options": [
                {
                   "value": "implementation.fullInPlace",
                   "title": "Medidas nacionales plenamente establecidas"
                },
                {
                   "value": "implementation.partiallyInPlace",
                   "title": "Medidas nacionales parcialmente establecidas"
                },
                {
                   "value": "implementation.temporaryMeasures",
                   "title": "Solo se han introducido medidas temporales"
                },
                {
                   "value": "implementation.draftMeasures",
                   "title": "Solo existen proyectos de medidas"
                },
                {
                   "value": "implementation.none",
                   "title": "Todavía no se han adoptado medidas"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q015",
             "section": "Article2",
             "number": "15",
             "type": "option",
             "title": "¿Cuáles son los instrumentos jurídicos establecidos para la aplicación de medidas nacionales de seguridad de la biotecnología? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "instrument.nationalBiosafetyLaws",
                   "title": "Una o más leyes nacionales sobre seguridad de la biotecnología"
                },
                {
                   "value": "instrument.nationalBiosafetyRegulations",
                   "title": "Una o más reglamentaciones nacionales sobre seguridad de la biotecnología"
                },
                {
                   "value": "instrument.biosafetyGuidelines",
                   "title": "Uno o más conjuntos de directrices sobre seguridad de la biotecnología"
                },
                {
                   "value": "instrument.indirectLaws",
                   "title": "Otras leyes, reglamentos o directrices que se aplican indirectamente a la seguridad de la biotecnología"
                },
                {
                   "value": "instrument.none",
                   "title": "No hay instrumentos en vigor"
                }
             ]
          },
          {
             "key": "Q016",
             "section": "Article2",
             "number": "16",
             "type": "option",
             "title": "¿Se han adoptado en su país iniciativas para la integración de la diversidad biológica en las estrategias y planes de acción nacionales en materia de diversidad biológica y en otras políticas o leyes?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                },
                {
                   "value": "false.other",
                   "title": "Otras",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q017",
             "section": "Article2",
             "number": "17",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo de asignaciones presupuestarias para la aplicación de sus medidas nacionales de seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q018",
             "section": "Article2",
             "number": "18",
             "type": "option",
             "title": "¿Dispone su país de personal permanente para administrar las funciones directamente relacionadas con la seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q019",
                   "type": "@hasValues",
                   "values": [
                      "true"
                   ],
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q019",
             "section": "Article2",
             "number": "19",
             "type": "option",
             "title": "Si su respuesta a la pregunta 18 es <i>Sí</i>, ¿cuántos miembros de personal permanente cumplen funciones directamente relacionadas con la seguridad de la biotecnología? ",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q019_adq",
                   "type": "@hasValues",
                   "trigger": "visible"
                }
             ]
          },
          {
             "key": "Q019_adq",
             "section": "Article2",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q020",
             "section": "Article2",
             "number": "20",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 2 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article5",
       "title": "Artículo 5 - Productos farmacéuticos",
       "questions": [
          {
             "key": "Q021",
             "section": "Article5",
             "number": "21",
             "type": "option",
             "title": "¿Regula su país el movimiento transfronterizo, la manipulación o el uso de organismos vivos modificados (OVM) que son productos farmacéuticos para seres humanos?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q022",
             "section": "Article5",
             "number": "22",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 5 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article6",
       "title": "Artículo 6 – Tránsito y uso confinado",
       "questions": [
          {
             "key": "Q023",
             "section": "Article6",
             "number": "23",
             "type": "option",
             "title": "¿Regula su país el tránsito de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q024",
             "section": "Article6",
             "number": "24",
             "type": "option",
             "title": "¿Regula su país el uso confinado de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q025",
             "section": "Article6",
             "number": "25",
             "type": "option",
             "title": "¿Ha tomado su país alguna decisión con respecto a la importación de OVM para uso confinado?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q026",
             "section": "Article6",
             "number": "26",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 6 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Articles7-10",
       "title": "Artículos 7 a 10 - Acuerdo fundamentado previo (AFP) e introducción deliberada de OVM en el medio ambiente",
       "questions": [
          {
             "key": "Q027",
             "section": "Articles7-10",
             "number": "27",
             "type": "option",
             "title": "¿Ha establecido su país requisitos legales para que los exportadores bajo su jurisdicción notifiquen por escrito a la autoridad nacional competente de la Parte  importadora antes del movimiento transfronterizo intencional de un OVM comprendido en el ámbito del procedimiento de acuerdo fundamentado previo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q028",
             "section": "Articles7-10",
             "number": "28",
             "type": "option",
             "title": "Como Parte de exportación, ¿ha establecido su país requisitos legales respecto a la exactitud de la información que figura en la notificación proporcionada por el exportador?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                },
                {
                   "value": "false.notApplicable",
                   "title": "No se aplica (la Parte no exporta OVM actualmente)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q029",
             "section": "Articles7-10",
             "number": "29",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha recibido su país alguna notificación relativa a movimientos transfronterizos intencionales de OVM para su introducción deliberada en el medio ambiente?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q030",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q031",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   
                   "baseQuestion":"Q032",
                   "question": "Q032_a",
                   "values"  : ["true"],
                   "type"    : "@hasValues",
                   "trigger" : "enable"
                },
                {
                   "baseQuestion":"Q032",
                   "question": "Q032_b",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q030",
             "section": "Articles7-10",
             "number": "30",
             "type": "option",
             "title": "Si su respuesta a la pregunta 29 es <i>Sí</i>, ¿tenían información completa esas notificaciones (como mínimo la información indicada en el anexo I del Protocolo de Cartagena sobre Seguridad de la Biotecnología)?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q031",
             "section": "Articles7-10",
             "number": "31",
             "type": "option",
             "title": "Si su respuesta a la pregunta 29 es <i>Sí</i>, ¿ha enviado su país acuse de recibo de las notificaciones al notificador dentro de los 90 días posteriores a su recibo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q032",
             "section": "Articles7-10",
             "number": "32",
             "type": "sub-section",
             "title": "Si su respuesta a la pregunta 29 es <i>Sí</i>, ¿su país ha comunicado la decisión o decisiones a los siguientes?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q032_a",
                   "section": "Articles7-10",
                   "number": "a",
                   "type": "option",
                   "title": "¿Al notificador?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí, siempre"
                      },
                      {
                         "value": "true.some",
                         "title": "Solo en algunos casos"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q032_b",
                   "section": "Articles7-10",
                   "number": "b",
                   "type": "option",
                   "title": "¿Al Centro de Intercambio de Información sobre Seguridad de la Biotecnología (CIISB)?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí, siempre"
                      },
                      {
                         "value": "true.some",
                         "title": "Solo en algunos casos"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q033",
             "section": "Articles7-10",
             "number": "33",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha tomado su país alguna decisión en respuesta a la o las notificaciones relativas a movimientos transfronterizos intencionales de OVM para su introducción deliberada en el medio ambiente?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q034",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q036",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q034",
             "section": "Articles7-10",
             "number": "34",
             "type": "option",
             "title": "Si su respuesta a la pregunta 33 es <i>Sí</i>, ¿para cuántos OVM ha autorizado su país la importación para introducción deliberada en el medio ambiente?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q035",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q035",
             "section": "Articles7-10",
             "number": "35",
             "type": "option",
             "title": "Si en <i>la pregunta 34</i> respondió que <i>se autorizaron OVM</i>, ¿se han importado efectivamente todos esos OVM a su país?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q036",
             "section": "Articles7-10",
             "number": "36",
             "type": "option",
             "title": "Si su respuesta a la pregunta 33 es <i>Sí</i>, ¿qué porcentaje de las decisiones de su país se encuentran en las siguientes categorías? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                   "title": "Autorización de la importación/uso de OVM sin condiciones",
                   "type": "int"
                },
                {
                   "value": "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                   "title": "Autorización de la importación/uso de OVM con condiciones con condiciones",
                   "type": "int"
                },
                {
                   "value": "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                   "title": "Prohibición de la importación/uso de OVM(s)",
                   "type": "int"
                },
                {
                   "value": "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                   "title": "Pedido de información adicional pertinente",
                   "type": "int"
                },
                {
                   "value": "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                   "title": "Informar al notificador que se ha extendido el período para comunicar la decisión",
                   "type": "int"
                }
             ],
             "validations": [
                {
                   "question": "Q037",
                   "values": [
                      "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                      "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"
                   ],
                   "type": "@hasAdditionalValues",
                   "trigger": "enable"
                }
             ],
             "customValuePlaceholder": "%"
          },
          {
             "key": "Q037",
             "section": "Articles7-10",
             "number": "37",
             "type": "option",
             "title": "Si <i>en la pregunta 36</i> respondió que su país ha tomado una decisión de <i>autorizar la importación con condiciones</i> o de <i>prohibir la importación</i>, ¿se comunicaron las razones?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q038",
             "section": "Articles7-10",
             "number": "38",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación de los artículos 7 a 10 en su país, incluidas medidas en el caso de que no hubiese certidumbre científica acerca de los posibles efectos adversos de los OVMs para introducción deliberada en el medio ambiente:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article11",
       "title": "Artículo 11 - Procedimiento para organismos vivos modificados destinados a uso directo como alimento humano o animal o para procesamiento (OVM-AHAP)",
       "questions": [
          {
             "key": "Q039",
             "section": "Article11",
             "number": "39",
             "type": "option",
             "title": "¿Tiene su país una o más leyes, reglamentaciones o medidas administrativas para la toma de decisiones en relación con el uso nacional, incluida la colocación en el mercado, de OVM que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q040",
             "section": "Article11",
             "number": "40",
             "type": "option",
             "title": "¿Ha establecido su país requisitos legales respecto a la exactitud de la información que debe proporcionar el solicitante sobre el uso nacional, incluida la colocación en el mercado, de OVM que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q041",
             "section": "Article11",
             "number": "41",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas decisiones ha tomado su país <u>con respecto al uso nacional</u>, incluida la colocación en el mercado, de OVMs que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q042",
             "section": "Article11",
             "number": "42",
             "type": "option",
             "title": "¿Tiene su país una o más leyes, reglamentaciones o medidas administrativas para la toma de decisiones en relación con el uso nacional, incluida la colocación en el mercado, de OVM que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q043",
             "section": "Article11",
             "number": "43",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas decisiones ha tomado su país <u>con respecto a la importación</u> de OVM para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q044",
             "section": "Article11",
             "number": "44",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 11 en su país, incluidas medidas en el caso de falta de certidumbre científica sobre los posibles efectos adversos de OVM que pueden ser objeto de un movimiento transfronterizo para uso directo como alimento humano o animal o para procesamiento:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article12",
       "title": "Artículo 12 – Revisión de las decisiones",
       "questions": [
          {
             "key": "Q045",
             "section": "Article12",
             "number": "45",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para revisar y modificar una decisión referida a un movimiento transfronterizo intencional de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q046",
             "section": "Article12",
             "number": "46",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿su país ha revisado o modificado alguna decisión referida al movimiento transfronterizo intencional de un OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q047",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q048",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q050",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q047",
             "section": "Article12",
             "number": "47",
             "type": "option",
             "title": "Si su respuesta a la pregunta 46 es <i>Sí</i>, ¿cuántas decisiones fueron revisadas o modificadas?",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q048",
             "section": "Article12",
             "number": "48",
             "type": "option",
             "title": "Si su respuesta a la pregunta 46 es <i>Sí</i>, ¿alguna de esas revisiones fue motivada por una solicitud de la Parte de exportación o el notificador?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q049",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q049",
             "section": "Article12",
             "number": "49",
             "type": "option",
             "title": "Si su respuesta a la pregunta 48 es <i>Sí</i>, ¿envió su país una respuesta dentro de un plazo de 90 días exponiendo las razones de su decisión?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q050",
             "section": "Article12",
             "number": "50",
             "type": "option",
             "title": "Si su respuesta a la pregunta 46 es <i>Sí</i>, ¿alguna de esas revisiones fue iniciada por su país como Parte de importación?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "baseQuestion": "Q051",
                   "question": "Q051_a",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "baseQuestion": "Q051",
                   "question": "Q051_b",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q051",
             "section": "Articles12",
             "number": "51",
             "type": "sub-section",
             "title": "Si su respuesta a la pregunta 50 es <i>Sí</i>, ¿expuso su país las razones de la decisión e informó a los siguientes dentro de un plazo de 30 días?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q051_a",
                   "section": "Article12",
                   "number": "a",
                   "type": "option",
                   "title": "¿Al notificador?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí, siempre"
                      },
                      {
                         "value": "true.some",
                         "title": "Solo en algunos casos"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q051_b",
                   "section": "Article12",
                   "number": "b",
                   "type": "option",
                   "title": "¿Al CIISB?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí, siempre"
                      },
                      {
                         "value": "true.some",
                         "title": "Solo en algunos casos"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q052",
             "section": "Article12",
             "number": "52",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 12 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article13",
       "title": "Artículo 13 – Procedimiento simplificado",
       "questions": [
          {
             "key": "Q053",
             "section": "Article13",
             "number": "53",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para la aplicación del procedimiento simplificado para movimientos transfronterizos intencionales de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q054",
             "section": "Article13",
             "number": "54",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha aplicado su país el procedimiento simplificado?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q055",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q056",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q055",
             "section": "Article13",
             "number": "55",
             "type": "option",
             "title": "Si su respuesta a la pregunta 54 es <i>Sí</i>, ¿a cuántos OVM ha aplicado su país el procedimiento simplificado?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 5"
                },
                {
                   "value": "5+",
                   "title": "5 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q056",
             "section": "Article13",
             "number": "56",
             "type": "option",
             "title": "Si su respuesta a la pregunta 54 es <i>Sí</i> ¿ha informado su país a las Partes a través del CIISB sobre los casos en los que se aplicó el procedimiento simplificado?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q057",
             "section": "Article13",
             "number": "57",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 13 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article14",
       "title": "Artículo 14 – Acuerdos y arreglos bilaterales, regionales y multilaterales",
       "questions": [
          {
             "key": "Q058",
             "section": "Article14",
             "number": "58",
             "type": "option",
             "title": "¿Cuántos acuerdos o arreglos bilaterales, regionales o multilaterales relacionados con la seguridad de la biotecnología ha establecido su país con otras Partes o países que no son Partes?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q059",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q059",
             "section": "Article14",
             "number": "59",
             "type": "lstring",
             "title": "Si en la <i>pregunta 58</i> respondió que <i>se establecieron acuerdos o arreglos</i>, describa brevemente su alcance y objetivo:",
             "multiple": false,
             "mandatory": true
          },
          {
             "key": "Q060",
             "section": "Article14",
             "number": "60",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 14 en su país:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article15_16",
       "title": "Artículos 15 y 16 – Evaluación del riesgo y gestión del riesgo",
       "questions": [
          {
             "key": "Q061",
             "section": "Article15_16",
             "number": "61",
             "type": "option",
             "title": "¿El marco reglamentario de su país requiere la realización de análisis del riesgo de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q062",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q062",
             "section": "Article15_16",
             "number": "62",
             "type": "option",
             "title": "Si su respuesta a la pregunta 61 es <i>Sí</i>, ¿con respecto a qué OVM se aplica el requisito? (Seleccione todas las respuestas que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "014054D1-2B72-7ABD-E615-D0A374590A95",
                   "title": "Para la importación de OVM destinados a la introducción deliberada en el medio ambiente."
                },
                {
                   "value": "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                   "title": "Para la importación de OVM destinados para uso directo como alimento humano o animal o para procesamiento."
                },
                {
                   "value": "29B97F6B-066E-BE64-0FA3-66060DEE737D",
                   "title": "Para decisiones referidas al uso nacional, incluida la colocación en el mercado, de OVM que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento."
                },
                {
                   "value": "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                   "title": "Para la importación de OVM para uso confinado."
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otras",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q063",
             "section": "Article15_16",
             "number": "63",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para realizar evaluaciones del riesgo antes de adoptar decisiones relativas a los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q064",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q064",
             "section": "Article15_16",
             "number": "64",
             "type": "option",
             "title": "Si su respuesta a la pregunta 63 es <i>Sí</i>, ¿se incluyen en este mecanismo procedimientos para encontrar o capacitar a expertos nacionales para que realicen evaluaciones del riesgo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "legend15_16",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>Creación de capacidad para la evaluación del riesgo o la gestión del riesgo</i>"
          },
          {
             "key": "Q065",
             "section": "Articles12",
             "number": "65",
             "type": "sub-section",
             "title": "¿Cuántas personas en su país han recibido capacitación en evaluación del riesgo, gestión de riesgo y vigilancia de OVM?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q065_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Evaluación del riesgo",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ninguna"
                      },
                      {
                         "value": "1+",
                         "title": "1 a 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 a 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 a 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 o más"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_a_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_a_adq",
                   "section": "Article15_16",
                   "number": "",
                   "type": "option",
                   "title": "¿Es suficiente este número?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                },
                {
                   "key": "Q065_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Gestión del riesgo",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ninguna"
                      },
                      {
                         "value": "1+",
                         "title": "1 a 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 a 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 a 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 o más"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_b_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_b_adq",
                   "section": "Article2",
                   "number": "",
                   "type": "option",
                   "title": "¿Es suficiente este número?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                },
                {
                   "key": "Q065_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Vigilancia",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ninguna"
                      },
                      {
                         "value": "1+",
                         "title": "1 a 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 a 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 a 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 o más"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_c_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_c_adq",
                   "section": "Article2",
                   "number": "",
                   "type": "option",
                   "title": "¿Es suficiente este número?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                }
             ]
          },
          {
             "key": "Q066",
             "section": "Article15_16",
             "number": "66",
             "type": "option",
             "title": "¿Utiliza su país material de capacitación u orientación técnica para la capacitación en evaluación del riesgo y gestión del riesgo de los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q067",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q068",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q067",
             "section": "Article15_16",
             "number": "67",
             "type": "option",
             "title": "Si su respuesta a la pregunta 66 es <i>Sí</i>, ¿está utilizando su país el “Manual de capacitación sobre evaluación del riesgo de los organismos vivos modificados” (elaborado por la Secretaría del CDB) para la capacitación en evaluación del riesgo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q068",
             "section": "Article15_16",
             "number": "68",
             "type": "option",
             "title": "Si su respuesta a la pregunta 66 es <i>Sí</i>, ¿está utilizando su país la “Orientación para la evaluación del riesgo de los organismos vivos modificados” (elaborada por el Foro en línea y el Grupo Especial de Expertos Técnicos en Evaluación del Riesgo y Gestión del Riesgo) para la capacitación en evaluación del riesgo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q069",
             "section": "Article15_16",
             "number": "69",
             "type": "option",
             "title": "¿Tiene su país necesidades específicas de mayor orientación sobre temas específicos de evaluación del riesgo de los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q070",
             "section": "Article15_16",
             "number": "70",
             "type": "sub-section",
             "title": "¿Tiene su país la capacidad de detectar, identificar, evaluar o vigilar OVM o rasgos específicos que puedan tener efectos adversos para la conservación y utilización sostenible de la diversidad biológica, teniendo también en cuenta los riesgos para la salud humana?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q070_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Detectar",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                },
                {
                   "key": "Q070_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Identificar",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                },
                {
                   "key": "Q070_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Evaluar el riesgo",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                },
                {
                   "key": "Q070_d",
                   "section": "Article15_16",
                   "number": "d",
                   "type": "option",
                   "title": "Vigilar",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ]
                }
             ]
          },
          {
             "key": "legend71_84",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>Realización de evaluaciones del riesgo o gestión del riesgo</i>"
          },
          {
             "key": "Q071",
             "section": "Article15_16",
             "number": "71",
             "type": "sub-section",
             "title": "¿Ha adoptado o usado su país algún documento de orientación con el fin de llevar a cabo evaluaciones del riesgo o gestionar el riesgo, o para evaluar informes sobre evaluaciones del riesgo presentados por notificadores?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q071_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Evaluación del riesgo",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true,
                   "validations": [
                      {
                         "question": "Q072",
                         "type": "&is71aOr71b",
                         "trigger": "enable"
                      }
                   ]
                },
                {
                   "key": "Q071_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Gestión del riesgo",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "mandatory": true,
                   "validations": [
                      {
                         "question": "Q072",
                         "type": "&is71aOr71b",
                         "trigger": "enable"
                      }
                   ]
                }
             ]
          },
          {
             "key": "Q072",
             "section": "Article15_16",
             "number": "72",
             "type": "option",
             "title": "Si su respuesta a la pregunta 71 es <i>Sí</i>, ¿está utilizando su país la “Orientación para la evaluación del riesgo de los organismos vivos modificados” (elaborada por el Foro en línea y el Grupo Especial de Expertos Técnicos en Evaluación del Riesgo y Gestión del Riesgo) para llevar a cabo evaluaciones del riesgo o gestionar el riesgo, o para evaluar informes sobre evaluaciones del riesgo presentados por notificadores?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q073",
             "section": "Article15_16",
             "number": "73",
             "type": "option",
             "title": "¿Ha adoptado su país enfoques o metodologías comunes para la evaluación del riesgo en coordinación con otros países?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q074",
             "section": "Article15_16",
             "number": "74",
             "type": "option",
             "title": "¿Ha cooperado su país con otras Partes con miras a identificar OVM o rasgos específicos que pudieran tener efectos adversos para la conservación y la utilización sostenible de la diversidad biológica?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q075",
             "section": "Article15_16",
             "number": "75",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha realizado su país algún tipo de evaluación del riesgo de OVM, destinados por ejemplo para uso confinado, ensayos prácticos, fines comerciales o uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q076",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q077",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q078",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q076",
             "section": "Article15_16",
             "number": "76",
             "type": "option",
             "title": "Si su respuesta a la pregunta 75 es <i>Sí</i>, ¿cuántas evaluaciones del riesgo se realizaron?",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 a 99"
                },
                {
                   "value": "100+",
                   "title": "100 o más"
                }
             ]
          },
          {
             "key": "Q077",
             "section": "Article15_16",
             "number": "77",
             "type": "term",
             "title": "Si su respuesta a la pregunta 75 es <i>Sí</i>, indique el alcance de las evaluaciones del riesgo (seleccione todas las respuestas que correspondan)",
             "multiple": true,
             "options": [
                {
                   "value": "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                   "title": "OVM para uso confinado (de conformidad con el artículo 3)."
                },
                {
                   "value": "D6B59E8A-D82C-4516-917A-A745ACDA5931",
                   "title": "OVM para introducción deliberada en el medio ambiente para pruebas experimentales o ensayos prácticos"
                },
                {
                   "value": "015737FC-ABC2-460C-A099-06A1B01E649A",
                   "title": "OVM para introducción deliberada en el medio ambiente con fines comerciales"
                },
                {
                   "value": "91BEAF12-ABE1-4294-AD3B-507935894C78",
                   "title": "OVM para uso directo como alimento humano"
                },
                {
                   "value": "1D96153B-1625-44E4-AD5E-D26429044B29",
                   "title": "OVM para uso directo como alimento animal"
                },
                {
                   "value": "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                   "title": "OVM para procesamiento"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otras:",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q078",
             "section": "Article15_16",
             "number": "78",
             "type": "option",
             "title": "Si su respuesta a la pregunta 75 es <i>Sí</i>, ¿se realizaron evaluaciones del riesgo para todas las decisiones sobre OVM destinados a su introducción deliberada en el medio ambiente, o sobre el uso nacional de OVM que pueden ser objeto de movimientos transfronterizos para uso directo como alimento humano o animal o para procesamiento?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q079",
             "section": "Article15_16",
             "number": "79",
             "type": "option",
             "title": "¿Ha establecido su país medidas, estrategias y mecanismos adecuados para regular y gestionar los riesgos identificados en las evaluaciones del riesgo de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q080",
             "section": "Article15_16",
             "number": "80",
             "type": "option",
             "title": "¿Ha adoptado su país medidas adecuadas para prevenir los movimientos transfronterizos involuntarios de OVM, incluido medidas tales como la exigencia de que se realice una evaluación del riesgo antes de la primera liberación de un OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q081",
             "section": "Article15_16",
             "number": "81",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para asegurar que cualquier OVM, ya sea importado o desarrollado en el país, haya pasado por un período apropiado de observación que sea proporcional a su ciclo vital o a su tiempo de generación antes de que se le dé su uso previsto?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q082",
             "section": "Article15_16",
             "number": "82",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para vigilar los efectos potenciales de los OVM liberados en el medio ambiente?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q083",
             "section": "Article15_16",
             "number": "83",
             "type": "option",
             "title": "¿Cuenta su país con la infraestructura necesaria (por ejemplo, laboratorios) para vigilar o gestionar OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q084",
             "section": "Article15_16",
             "number": "84",
             "type": "lstring",
             "title": "En este espacio puede proporcionar otros detalles sobre la aplicación de los artículos 15 y 16 en su país:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article17",
       "title": "Artículo 17 – Movimientos transfronterizos involuntarios<sup>2</sup>  y medidas de emergencia",
       "footnote": "<sup>2</sup> De conformidad con la definición operacional adoptada en la decisión CP-VIII/16, “El ‘movimiento transfronterizo involuntario’ es un movimiento transfronterizo de un organismo vivo modificado que ha cruzado involuntariamente las fronteras nacionales de una Parte, a través del cual el organismo vivo modificado fue liberado, siendo de aplicación las prescripciones del artículo 17 del Protocolo en tales casos de movimientos transfronterizos tan solo si cabe la posibilidad de que el organismo vivo modificado en cuestión ejerza o pudiera ejercer una repercusión adversa significativa en la conservación y la utilización sostenible de la diversidad biológica, habida cuenta además de los riesgos para la salud humana, en el marco de los Estados afectados o que pudieran estar afectados”.",
       "questions": [
          {
             "key": "Q085",
             "section": "Article17",
             "number": "85",
             "type": "option",
             "title": "¿Ha establecido su país medidas para notificar a los Estados afectados o que puedan resultar afectados, al Centro de Intercambio de Información sobre Seguridad de la Biotecnología y, cuando proceda, a organizaciones internacionales pertinentes, de una liberación producida dentro de su jurisdicción que dé lugar, o pudiera dar lugar, a un movimiento transfronterizo involuntario?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q086",
             "section": "Article17",
             "number": "86",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas liberaciones de OVM ocurrieron dentro de la jurisdicción de su país que hayan dado lugar o pudieran haber dado lugar a un movimiento transfronterizo involuntario?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q087",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q087",
             "section": "Article17",
             "number": "87",
             "type": "option",
             "title": "Si <i>en la pregunta 86</i> respondió que <i>se produjo una liberación</i>, ¿ha notificado su país a los Estados afectados o que pudieran resultar afectados, al Centro de Intercambio de Información sobre Seguridad de la Biotecnología y, si procediera, a organizaciones internacionales pertinentes?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q088",
             "section": "Article17",
             "number": "88",
             "type": "option",
             "title": "¿Tiene su país la capacidad de tomar medidas de respuesta apropiadas en caso de movimientos transfronterizos involuntarios?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q089",
             "section": "Article17",
             "number": "89",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas veces ha tomado conocimiento su país de un movimiento transfronterizo involuntario hacia su territorio?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q090",
             "section": "Article17",
             "number": "90",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 17 en su país:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article18",
       "title": "Artículo 18 – Manipulación, trasporte, envasado e identificación",
       "questions": [
          {
             "key": "Q091",
             "section": "Article18",
             "number": "91",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para requerir que <i>los OVM objeto de movimientos transfronterizos</i> sean manipulados, envasados y transportados en condiciones de seguridad, teniendo en cuenta las normas y los estándares internacionales pertinentes?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q092",
             "section": "Article18",
             "number": "92",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para requerir que la documentación que acompaña a los OVM-AHAP, <i>en casos en los que la identidad de los OVM <u>no es conocida</u></i>, identifique claramente que <i>pueden llegar a contener OVM</i> y que no están destinados a su introducción deliberada en el medio ambiente, e indique también un punto de contacto para solicitar información adicional?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q093",
             "section": "Article18",
             "number": "93",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para requerir que la documentación que acompaña a los OVM-AHAP, <i>en casos en los que la identidad de los OVM <u>es conocida</u></i>, identifique claramente que <i>contienen OVM </i> y que no están destinados a su introducción deliberada en el medio ambiente, e indique además un punto de contacto para solicitar información adicional?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q094",
             "section": "Article18",
             "number": "94",
             "type": "option",
             "title": "Si su respuesta a las preguntas 91, 92 o 93 es <i>Sí</i>, ¿qué tipo de documentación requiere su país que acompañe a los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentación específica para OVM"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Como parte de otra documentación (no específica para OVM)"
                },
                {
                   "value": "other",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q095",
             "section": "Article18",
             "number": "95",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para requerir que la documentación que acompaña a <i>OVM destinados para uso confinado</i> los identifique claramente como <i>OVM</i> y especifique los requisitos para su manipulación, almacenamiento, transporte y uso seguros, el punto de contacto para obtener información adicional, incluido el nombre y las señas de la persona y la institución a quienes se envían los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q096",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q096",
             "section": "Article18",
             "number": "96",
             "type": "option",
             "title": "Si su respuesta a la pregunta 95 es <i>Sí</i>, ¿qué tipo de documentación exige su país para la identificación de OVM destinados para uso confinado?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentación específica para OVM"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Como parte de otra documentación (no específica para OVM)"
                },
                {
                   "value": "other",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q097",
             "section": "Article18",
             "number": "97",
             "type": "option",
             "title": "¿Ha adoptado su país medidas para requerir que la documentación que acompaña a <i>OVM destinados a su introducción deliberada en el medio ambiente de la Parte de importación</i> los identifique claramente como <i>organismos vivos modificados</i>; especifique la identidad y los rasgos o características pertinentes, los requisitos para su manipulación, almacenamiento, transporte y uso seguros, el punto de contacto para obtener información adicional y, según proceda, el nombre y la dirección del importador y del exportador y contenga una declaración de que el movimiento se efectúa de conformidad con las disposiciones del Protocolo aplicables al exportador?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q098",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q098",
             "section": "Article18",
             "number": "98",
             "type": "option",
             "title": "Si su respuesta a la pregunta 97 es <i>Sí</i>, ¿qué tipo de documentación exige su país para la identificación de OVM destinados a su introducción deliberada en el medio ambiente?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentación específica para OVM"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Como parte de otra documentación (no específica para OVM)"
                },
                {
                   "value": "other",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q099",
             "section": "Article18",
             "number": "99",
             "type": "option",
             "title": "¿Cuenta su país con algún tipo de orientación para asegurar de que la manipulación, el transporte y el envasado de organismos vivos modificados sean seguros?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q100",
             "section": "Article18",
             "number": "100",
             "type": "option",
             "title": "¿Tiene su país capacidad para hacer cumplir los requisitos de identificación y documentación de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q101",
             "section": "Article18",
             "number": "101",
             "type": "option",
             "title": "¿Cuántos funcionarios de aduanas de su país han recibido capacitación en la identificación de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 a 99"
                },
                {
                   "value": "100+",
                   "title": "100 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q101_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q101_adq",
             "section": "Article18",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q102",
             "section": "Article18",
             "number": "102",
             "type": "option",
             "title": "¿Ha establecido su país procedimientos para muestreo y detección de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q103",
             "section": "Article18",
             "number": "103",
             "type": "option",
             "title": "¿Cuántos empleados de laboratorio de su país han recibido capacitación en la detección de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 a 99"
                },
                {
                   "value": "100+",
                   "title": "100 o más"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q103_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ]
          },
          {
             "key": "Q103_adq",
             "section": "Article18",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q104",
             "section": "Article18",
             "number": "104",
             "type": "option",
             "title": "¿Cuenta su país con acceso fiable a laboratorios para la detección de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q105",
             "section": "Article18",
             "number": "105",
             "type": "option",
             "title": "¿Cuántos laboratorios de su país están certificados para la detección de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 o más"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q106",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q106",
             "section": "Article18",
             "number": "106",
             "type": "option",
             "title": "Si <i>en la pregunta 105</i> respondió que <i>en su país existen laboratorios certificados</i>, ¿cuántos de esos laboratorios trabajan actualmente en la detección de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q107",
             "section": "Article18",
             "number": "107",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 18 en su país:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article19",
       "title": "Artículo 19 – Autoridades nacionales competentes y puntos focales nacionales",
       "questions": [
          {
             "key": "Q108",
             "section": "Article19",
             "number": "108",
             "type": "option",
             "title": "En el caso de que su país haya designado a más de una autoridad nacional competente, ¿ha establecido su país un mecanismo para que coordinen entre sí antes de adoptar decisiones relativas a los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                },
                {
                   "value": "false.noCna",
                   "title": "No se aplica (no se ha designado ninguna autoridad nacional competente)"
                },
                {
                   "value": "false.oneCna",
                   "title": "No se aplica (solo se designó una autoridad nacional competente)"
                }
             ]
          },
          {
             "key": "Q109",
             "section": "Article19",
             "number": "109",
             "type": "option",
             "title": "¿Ha establecido su país capacidad institucional suficiente para que la autoridad o autoridades nacionales competentes puedan desempeñar las funciones administrativas requeridas por el Protocolo de Cartagena sobre Seguridad de la Biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q110",
             "section": "Article19",
             "number": "110",
             "type": "option",
             "title": "¿Ha emprendido su país iniciativas para fortalecer la colaboración entre los puntos focales nacionales, las autoridades nacionales competentes y otras instituciones en cuestiones relativas a la diversidad biológica?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q111",
             "section": "Article19",
             "number": "111",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 19 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article20",
       "title": "Artículo 20 – Intercambio de información y el Centro de Intercambio de Información sobre Seguridad de la Biotecnología (CIISB)",
       "questions": [
          {
             "key": "Q112",
             "section": "Article20",
             "number": "112",
             "type": "sub-section",
             "title": "Brinde una visión general de la situación de la información obligatoria proporcionada por su país al CIISB, especificando para cada categoría de información si está disponible y si se ha presentado al CIISB.",
             "questions": [
                {
                   "key": "Q112_a",
                   "section": "Article20",
                   "number": "a",
                   "type": "option",
                   "title": "Leyes, reglamentos y directrices existentes para la aplicación del Protocolo, así como la información requerida por las Partes para el procedimiento de acuerdo fundamentado previo (artículo 20, párrafo 3 a))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_b",
                   "section": "Article20",
                   "number": "b",
                   "type": "option",
                   "title": "Leyes, reglamentaciones y directrices aplicables a la importación de OVM destinados a uso directo como alimento humano o animal o para procesamiento (artículo 11, párrafo 5)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_c",
                   "section": "Article20",
                   "number": "c",
                   "type": "option",
                   "title": "Acuerdos y arreglos bilaterales, regionales y multilaterales (artículo 14, párrafo 2, y artículo 20, párrafo 3 b))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_d",
                   "section": "Article20",
                   "number": "d",
                   "type": "option",
                   "title": "Datos de contacto de las autoridades nacionales competentes (artículo 19, párrafos 2 y 3), puntos focales nacionales (artículo 19, párrafos 1 y 3) y puntos de contacto para casos de emergencia (artículo 17, párrafo 3 e))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_e",
                   "section": "Article20",
                   "number": "e",
                   "type": "option",
                   "title": "Decisiones de una Parte relativas al tránsito de OVM (artículo 6, párrafo 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_f",
                   "section": "Article20",
                   "number": "f",
                   "type": "option",
                   "title": "Decisiones de una Parte relativas a la importación de OVM para uso confinado (artículo 6, párrafo 2)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_g",
                   "section": "Article20",
                   "number": "g",
                   "type": "option",
                   "title": "Notificaciones relativas a liberaciones dentro de la jurisdicción de su país que conduzcan, o pudieran conducir, a un movimiento transfronterizo involuntario de OVM que sea probable que tenga efectos adversos para la diversidad biológica (artículo 17, párrafo 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_h",
                   "section": "Article20",
                   "number": "h",
                   "type": "option",
                   "title": "Información sobre casos de movimientos transfronterizos ilícitos de OVM (artículo 25, párrafo 3)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_i",
                   "section": "Article20",
                   "number": "i",
                   "type": "option",
                   "title": "Decisiones relativas a la importación de OVM para su introducción deliberada en el medio ambiente (artículo 10, párrafo 3)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_j",
                   "section": "Article20",
                   "number": "j",
                   "type": "option",
                   "title": "Información sobre la aplicación de sus reglamentos nacionales a importaciones concretas de OVM (artículo 14, párrafo 4)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_k",
                   "section": "Article20",
                   "number": "k",
                   "type": "option",
                   "title": "Decisiones referidas al uso nacional de OVM que pueden ser objeto de un movimiento transfronterizo para uso directo como alimento humano o animal o para procesamiento (artículo 11, párrafo 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_l",
                   "section": "Article20",
                   "number": "l",
                   "type": "option",
                   "title": "Decisiones relativas a la importación de OVM destinados a uso directo como alimento humano o animal o para procesamiento, adoptadas con arreglo al marco reglamentario nacional (artículo 11, párrafo 4) o de conformidad con el anexo III del Protocolo (artículo 11, párrafo 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_m",
                   "section": "Article20",
                   "number": "m",
                   "type": "option",
                   "title": "Declaraciones relativas al marco que ha de aplicarse a los OVM destinados a uso directo como alimento humano o animal o para procesamiento (artículo 11, párrafo 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_n",
                   "section": "Article20",
                   "number": "n",
                   "type": "option",
                   "title": "Revisión y modificación de las decisiones relativas a movimientos transfronterizos intencionales de OVM (artículo 12, párrafo 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_o",
                   "section": "Article20",
                   "number": "o",
                   "type": "option",
                   "title": "Casos en los que el movimiento transfronterizo intencional puede efectuarse al mismo tiempo que se notifica el movimiento a la Parte de importación (artículo 13, párrafo 1 a))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_p",
                   "section": "Article20",
                   "number": "p",
                   "type": "option",
                   "title": "Situación de exenciones concedidas a OVM por cada Parte (artículo 13, párrafo 1 b))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_q",
                   "section": "Article20",
                   "number": "q",
                   "type": "option",
                   "title": "Resúmenes de evaluaciones del riesgo o exámenes ambientales de OVM que se hayan realizado como consecuencia de procesos reglamentarios e información pertinente sobre productos derivados de esos OVM (artículo 20, párrafo 3 c))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Información disponible y en el CIISB"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Información disponible pero no en el CIISB"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Información disponible pero solo parcialmente en el CIISB"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Información no disponible"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q113",
             "section": "Article20",
             "number": "113",
             "type": "lstring",
             "title": "Si en algún ítem de la pregunta 112 respondió que la información se encuentra disponible <i>pero no en el CIISB o solo parcialmente disponible en el CIISB</i>, proporcione una breve explicación",
             "multiple": false
          },
          {
             "key": "Q114",
             "section": "Article20",
             "number": "114",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para fortalecer la capacidad del punto focal nacional para el CIISB de desempeñar sus funciones administrativas?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q115",
             "section": "Article20",
             "number": "115",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo de coordinación entre el punto focal nacional para el CIISB, el punto focal del Protocolo de Cartagena y la o las autoridades nacionales competentes para poner la información a disposición del CIISB?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q116",
             "section": "Article20",
             "number": "116",
             "type": "option",
             "title": "¿Utiliza su país la información disponible en el CIISB en sus procesos de adopción de decisiones sobre OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                },
                {
                   "value": "false.na",
                   "title": "No se aplica (no se ha adoptado ninguna decisión)"
                }
             ]
          },
          {
             "key": "Q117",
             "section": "Article20",
             "number": "117",
             "type": "option",
             "title": "¿Ha experimentado su país dificultades para acceder al CIISB o utilizarlo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q118",
             "section": "Article20",
             "number": "118",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántos actividades relacionadas con la seguridad de la biotecnología (p. ej. seminarios, talleres, conferencias de prensa, eventos educativos, etc.) organizó su país?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 24"
                },
                {
                   "value": "25+",
                   "title": "25 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q119",
             "section": "Article20",
             "number": "119",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas publicaciones relacionadas con la seguridad de la biotecnología se realizaron en su país?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 a 99"
                },
                {
                   "value": "100+",
                   "title": "100 o más"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q120",
             "section": "Article20",
             "number": "120",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 20 en su país:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article21",
       "title": "Artículo 21 – Información confidencial",
       "questions": [
          {
             "key": "Q121",
             "section": "Article21",
             "number": "121",
             "type": "option",
             "title": "¿Ha establecido su país procedimientos para proteger la información confidencial recibida en el marco del Protocolo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q122",
             "section": "Article21",
             "number": "122",
             "type": "option",
             "title": "¿Su país permite al notificador determinar qué información debe considerarse confidencial?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q123",
             "section": "Article21",
             "number": "123",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 21 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article22",
       "title": "Artículo 22 – Creación de capacidad",
       "questions": [
          {
             "key": "Q124",
             "section": "Article22",
             "number": "124",
             "type": "option",
             "title": "¿Cuenta su país con financiación previsible y fiable para crear capacidad destinada a la aplicación efectiva del Protocolo?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q125",
             "section": "Article22",
             "number": "125",
             "type": "option",
             "title": "¿Ha recibido su país apoyo externo o se ha beneficiado de actividades de colaboración con otras Partes para el desarrollo o fortalecimiento de los recursos humanos y la capacidad institucional en materia de seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q126",
                   "values": [
                      "true",
                      "true.some"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q126",
             "section": "Article22",
             "number": "126",
             "type": "option",
             "title": "Si su respuesta a la pregunta 125 es <i>Sí</i>, ¿cómo se proporcionaron esos recursos? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "Por canales bilaterales"
                },
                {
                   "value": "channels.regional",
                   "title": "Por canales regionales"
                },
                {
                   "value": "channels.multilateral",
                   "title": "Por canales multilaterales"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q127",
             "section": "Article22",
             "number": "127",
             "type": "option",
             "title": "¿Ha proporcionado su país apoyo a otras Partes para el desarrollo o fortalecimiento de los recursos humanos y la capacidad institucional en materia de seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q128",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q128",
             "section": "Article22",
             "number": "128",
             "type": "option",
             "title": "Si su respuesta a la pregunta 127 es <i>Sí</i>, ¿cómo se proporcionaron esos recursos? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "Por canales bilaterales"
                },
                {
                   "value": "channels.regional",
                   "title": "Por canales regionales"
                },
                {
                   "value": "channels.multilateral",
                   "title": "Por canales multilaterales"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q129",
             "section": "Article22",
             "number": "129",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha iniciado su país un proceso para obtener fondos del Fondo para el Medio Ambiente Mundial (FMAM) destinados a la creación de capacidad en materia de seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q130",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q130",
             "section": "Article22",
             "number": "130",
             "type": "option",
             "title": "Si su respuesta a la pregunta 129 es <i>Sí</i>, ¿cómo calificaría ese proceso?",
             "multiple": false,
             "options": [
                {
                   "value": "veryEasy",
                   "title": "Muy fácil"
                },
                {
                   "value": "easy",
                   "title": "Fácil"
                },
                {
                   "value": "average",
                   "title": "Promedio"
                },
                {
                   "value": "difficult",
                   "title": "Difícil"
                },
                {
                   "value": "veryDifficult",
                   "title": "Muy difícil"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q131",
             "section": "Article22",
             "number": "131",
             "type": "term",
             "title": "En el período que abarca el presente informe, ¿ha emprendido su país actividades de desarrollo o fortalecimiento de los recursos humanos y la capacidad institucional en materia de seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q132",
                   "values": [
                      "true.some",
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q132",
             "section": "Article22",
             "number": "132",
             "type": "term",
             "title": "Si su respuesta a la pregunta 131 es <i>Sí</i>, ¿en cuáles de las siguientes áreas se emprendieron estas actividades? (Seleccione todas las respuestas que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Capacidad institucional y recursos humanos"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Incorporación de la seguridad de la biotecnología en legislación, políticas e instituciones intersectoriales y sectoriales (integración de la seguridad de la biotecnología)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Evaluación del riesgo y otros conocimientos científicos y técnicos especializados"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Gestión del riesgo"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Concienciación, participación y educación del público en materia de seguridad de la biotecnología"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Intercambio de información y gestión de datos, incluida la participación en el CIISB"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Colaboración científica, técnica e institucional a nivel sub-regional, regional e internacional"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Transferencia de tecnología"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Identificación de los OVMs, incluida su detección"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Consideraciones socioeconómicas"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Cumplimiento de los requisitos de documentación con arreglo al artículo 18.2 del Protocolo"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Tratamiento de la información confidencial "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Medidas para hacer frente a los movimientos transfronterizos involuntarios o ilícitos de OVM"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Investigación científica en seguridad de la biotecnología relativa a OVM"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Consideración de los riesgos para la salud humana"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Responsabilidad y compensación"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q133",
             "section": "Article22",
             "number": "133",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha realizado su país una evaluación de sus necesidades de creación de capacidad?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q134",
             "section": "Article22",
             "number": "134",
             "type": "option",
             "title": "¿Tiene todavía su país necesidades de creación de capacidad?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q135",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q135",
             "section": "Article22",
             "number": "135",
             "type": "term",
             "title": "Si su respuesta a la pregunta 134 es <i>Sí</i>, ¿en cuáles de las siguientes áreas todavía necesita creación de capacidad? (Seleccione todas las respuestas que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Capacidad institucional y recursos humanos"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Incorporación de la seguridad de la biotecnología en legislación, políticas e instituciones intersectoriales y sectoriales (integración de la seguridad de la biotecnología)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Evaluación del riesgo y otros conocimientos científicos y técnicos especializados"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Gestión del riesgo"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Concienciación, participación y educación del público en materia de seguridad de la biotecnología"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Intercambio de información y gestión de datos, incluida la participación en el CIISB"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Colaboración científica, técnica e institucional a nivel sub-regional, regional e internacional"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Transferencia de tecnología"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Muestreo, detección e identificación de OVM"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Consideraciones socioeconómicas"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Aplicación de los requisitos de documentación para la manipulación, transporte, envasado e identificación"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Tratamiento de la información confidencial "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Medidas para hacer frente a los movimientos transfronterizos involuntarios o ilícitos de OVM"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Investigación científica en seguridad de la biotecnología relativa a OVM"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Consideración de los riesgos para la salud humana"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Responsabilidad y compensación"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q136",
             "section": "Article22",
             "number": "136",
             "type": "option",
             "title": "¿Ha elaborado su país una estrategia o plan de acción para la creación de capacidad?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q137",
             "section": "Article22",
             "number": "137",
             "type": "option",
             "title": "¿Cuenta su país con un mecanismo nacional funcional para coordinar iniciativas de creación de capacidad en seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q138",
             "section": "Article22",
             "number": "138",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 22 en su país, incluidos más detalles sobre su experiencia relativa a la obtención de fondos del FMAM",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article23",
       "title": "Artículo 23 – Concienciación y participación del público",
       "questions": [
          {
             "key": "Q139",
             "section": "Article23",
             "number": "139",
             "type": "option",
             "title": "¿Está contemplada la concienciación, educación o participación del público en la legislación o la política de su país?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q140",
             "section": "Article23",
             "number": "140",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha cooperado su país con otros Estados y organismos internacionales en relación con la concienciación, educación y participación del público?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q141",
             "section": "Article23",
             "number": "141",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para asegurar el acceso del público a la información sobre OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q142",
             "section": "Article23",
             "number": "142",
             "type": "option",
             "title": "¿Tiene su país una estrategia nacional de comunicación sobre seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q143",
             "section": "Article23",
             "number": "143",
             "type": "option",
             "title": "¿Tiene su país programas de concienciación y divulgación sobre seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q144",
             "section": "Article23",
             "number": "144",
             "type": "option",
             "title": "¿Tiene actualmente su país un sitio web nacional sobre seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145",
             "section": "Article23",
             "number": "145",
             "type": "option",
             "title": "¿Cuántas instituciones académicas de su país ofrecen cursos y programas de educación y capacitación en seguridad de la biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q145_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145_adq",
             "section": "Article23",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q146",
             "section": "Article23",
             "number": "146",
             "type": "option",
             "title": "¿Cuántos materiales educativos o módulos en línea sobre seguridad de la biotecnología están disponibles y accesibles para el público en su país?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 24"
                },
                {
                   "value": "25+",
                   "title": "25 a 99"
                },
                {
                   "value": "100+",
                   "title": "100 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q146_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q146_adq",
             "section": "Article23",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q147",
             "section": "Article23",
             "number": "147",
             "type": "option",
             "title": "¿Ha establecido su país un mecanismo para consultar al público en el proceso de toma de decisiones relativas a OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q148",
             "section": "Article23",
             "number": "148",
             "type": "option",
             "title": "¿Ha informado su país al público sobre las modalidades existentes de participación pública en el proceso de toma de decisiones sobre OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q149",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q149",
             "section": "Article23",
             "number": "149",
             "type": "term",
             "title": "Si su respuesta a la pregunta 148 es <i>Sí</i>, indique las modalidades utilizadas para informar al público: (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "4E205CD9-9958-497F-A760-F8321771AB3A",
                   "title": "Sitios web nacionales"
                },
                {
                   "value": "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                   "title": "Periódicos"
                },
                {
                   "value": "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                   "title": "Foros"
                },
                {
                   "value": "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                   "title": "Listas de correo electrónico"
                },
                {
                   "value": "51792A07-B3C0-4F7B-830E-0741635F57BB",
                   "title": "Audiencias públicas"
                },
                {
                   "value": "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                   "title": "Redes sociales"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q150",
             "section": "Article23",
             "number": "150",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuántas veces ha consultado su país al público en el proceso de toma de decisiones relativas a OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna (las decisiones se toman sin consultas)"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 o más"
                },
                {
                   "value": "na",
                   "title": "No se aplica (no se ha adoptado ninguna decisión)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q151",
             "section": "Article23",
             "number": "151",
             "type": "option",
             "title": "¿Ha informado su país al público sobre la forma de acceder al Centro de Intercambio de Información sobre Seguridad de la Biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q152",
             "section": "Article23",
             "number": "152",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 23 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article24",
       "title": "Artículo 24 – Estados que no son Partes",
       "questions": [
          {
             "key": "Q153",
             "section": "Article24",
             "number": "153",
             "type": "option",
             "title": "¿Ha suscrito su país algún acuerdo bilateral, regional o multilateral con Estados que no son Partes en materia de movimientos transfronterizos de OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q154",
             "section": "Article24",
             "number": "154",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha importado su país OVM de Estados que no son Partes?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q156",
                   "type": "&is154Or155",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q155",
             "section": "Article24",
             "number": "155",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿ha exportado su país OVM a Estados que no son Partes?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q156",
                   "type": "&is154Or155",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q156",
             "section": "Article24",
             "number": "156",
             "type": "option",
             "title": "Si su respuesta a la pregunta 154 o 155 es <i>Sí</i>, ¿los movimientos transfronterizos de OVM se realizaron en consonancia con el objetivo del Protocolo de Cartagena sobre Seguridad de la Biotecnología?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q157",
             "section": "Article24",
             "number": "157",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 24 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article25",
       "title": "Artículo 25 – Movimientos transfronterizos ilícitos<sup>3</sup>",
       "footnote": "<sup>3</sup>De conformidad con la definición operacional adoptada en la decisión CP-VIII/16, “‘Movimiento transfronterizo ilícito’ es un movimiento transfronterizo de organismos vivos modificados realizado en contravención de las medidas nacionales para aplicar el Protocolo que hayan sido adoptadas por la Parte afectada”.",
       "questions": [
          {
             "key": "Q158",
             "section": "Article25",
             "number": "158",
             "type": "option",
             "title": "¿Ha adoptado su país medidas nacionales encaminadas a prevenir o penalizar los movimientos transfronterizos de OVM realizados en contravención de las medidas nacionales que rigen la aplicación del Protocolo de Cartagena?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en cierta medida",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q159",
             "section": "Article25",
             "number": "159",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿de cuántos casos de movimientos transfronterizos ilícitos de OVM ha tomado conocimiento su país?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguno"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 o más"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q160",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q160",
             "section": "Article25",
             "number": "160",
             "type": "option",
             "title": "Si <i>en la pregunta 159 </i> respondió que <i>su país tomó conocimiento de casos de movimientos transfronterizos ilícitos</i>, ¿se ha determinado el origen de los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "true.some",
                   "title": "Sí, en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q161",
             "section": "Article25",
             "number": "161",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 25 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article26",
       "title": "Artículo 26 –Consideraciones socioeconómicas",
       "questions": [
          {
             "key": "Q162",
             "section": "Article26",
             "number": "162",
             "type": "option",
             "title": "¿Tiene su país algún enfoque o requisito específico que facilite la forma en que deben tenerse en cuenta consideraciones socioeconómicas en la toma de decisiones sobre los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q163",
             "section": "Article26",
             "number": "163",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿en la toma de decisiones se han tenido en cuenta consideraciones socioeconómicas resultantes de los efectos de los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí, siempre"
                },
                {
                   "value": "true.some",
                   "title": "Solo en algunos casos"
                },
                {
                   "value": "false",
                   "title": "No"
                },
                {
                   "value": "false.na",
                   "title": "No se aplica (no se ha adoptado ninguna decisión)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164",
             "section": "Article26",
             "number": "164",
             "type": "option",
             "title": "¿Cuántas publicaciones sometidas a revisión por pares ha utilizado su país para planificar o determinar acciones nacionales relacionadas con consideraciones socioeconómicas?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ninguna"
                },
                {
                   "value": "1+",
                   "title": "1 a 4"
                },
                {
                   "value": "5+",
                   "title": "5 a 9"
                },
                {
                   "value": "10+",
                   "title": "10 a 49"
                },
                {
                   "value": "50+",
                   "title": "50 o más"
                }
             ],
             "validations": [
                {
                   "question": "Q164_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164_adq",
             "section": "Article26",
             "number": "",
             "type": "option",
             "title": "¿Es suficiente este número?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q165",
             "section": "Article26",
             "number": "165",
             "type": "option",
             "title": "¿Ha cooperado su país con otras Partes en investigación e intercambio de información sobre cualesquiera efectos socioeconómicos de los OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q166",
             "section": "Article26",
             "number": "166",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre la aplicación del artículo 26 en su país",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article28",
       "title": "Artículo 28 – Mecanismo financiero y recursos financieros",
       "questions": [
          {
             "key": "Q167",
             "section": "Article28",
             "number": "167",
             "type": "option",
             "title": "En el período que abarca el presente informe, ¿cuánta financiación (en el equivalente en dólares estadounidenses) ha movilizado su país en apoyo a la aplicación del Protocolo de Cartagena además de la asignación presupuestaria nacional ordinaria?",
             "multiple": false,
             "options": [
                {
                   "value": "USD0",
                   "title": "Ninguna"
                },
                {
                   "value": "USD1-4999",
                   "title": "1 a 4.999 dólares estadounidenses"
                },
                {
                   "value": "USD5000-49999",
                   "title": "5.000 a 49.999 dólares estadounidenses"
                },
                {
                   "value": "USD50000-99999",
                   "title": "50.000 a 99.999 dólares estadounidenses"
                },
                {
                   "value": "USD100000-499000",
                   "title": "100.000 a 499.000 dólares estadounidenses"
                },
                {
                   "value": "USD500000+",
                   "title": "500.000 dólares estadounidenses o más"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "Article33",
       "title": "Artículo 33 – Vigilancia y presentación de informes",
       "description": "<i>El artículo 33 establece que las Partes vigilarán <u>el cumplimiento de sus obligaciones</u> con arreglo al Protocolo de Cartagena e informarán a la Conferencia de las Partes que actúa como reunión de las Partes en el Protocolo de Cartagena acerca de las medidas que hubieran adoptado para la aplicación del Protocolo</i>",
       "questions": [
          {
             "key": "Q168",
             "section": "Article33",
             "number": "168",
             "type": "option",
             "title": "¿Cuenta su país con un sistema establecido para vigilar y hacer cumplir la aplicación del Protocolo de Cartagena?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "LiabilityRedress",
       "title": "el Protocolo suplementario de Nagoya - Kuala Lumpur sobre Responsabilidad y Compensación",
       "description": "<i>Se invita también a las Partes en el Protocolo de Cartagena que todavía no son Partes en el Protocolo Suplementario a responder las siguientes preguntas</i>",
       "questions": [
          {
             "key": "Q169",
             "section": "LiabilityRedress",
             "number": "169",
             "type": "option",
             "title": "¿Es su país Parte en el Protocolo Suplementario de Nagoya-Kuala Lumpur sobre Responsabilidad y Compensación?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q170",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q170",
             "section": "LiabilityRedress",
             "number": "170",
             "type": "option",
             "title": "Si su respuesta a la pregunta 169 es <i>No</i>, ¿se ha establecido algún proceso nacional para convertirse en Parte en el Protocolo Suplementario?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q171",
             "section": "LiabilityRedress",
             "number": "171",
             "type": "term",
             "title": "¿Ha introducido su país las medidas necesarias para la aplicación del Protocolo Suplementario?",
             "multiple": false,
             "options": [
                {
                   "value": "74B17D51-786F-3D68-3B76-A50121842925",
                   "title": "Medidas nacionales plenamente establecidas"
                },
                {
                   "value": "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                   "title": "Medidas nacionales parcialmente establecidas"
                },
                {
                   "value": "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                   "title": "Solo se han introducido medidas temporales"
                },
                {
                   "value": "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                   "title": "Solo existen proyectos de medidas"
                },
                {
                   "value": "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                   "title": "Todavía no se han adoptado medidas"
                }
             ],
             "validations": [
                {
                   "question": "Q172",
                   "values": [
                      "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q172",
             "section": "LiabilityRedress",
             "number": "172",
             "type": "term",
             "title": "¿Qué instrumentos están establecidos para la aplicación del Protocolo Suplementario?",
             "multiple": false,
             "options": [
                {
                   "value": "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                   "title": "Una o más leyes nacionales",
                   "type": "lstring"
                },
                {
                   "value": "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                   "title": "Una o más normativas nacionales",
                   "type": "lstring"
                },
                {
                   "value": "BA743C79-B202-4611-16C4-2C7D4678ACEB",
                   "title": "Uno o más conjuntos de directrices",
                   "type": "lstring"
                },
                {
                   "value": "9067DB5B-E33B-655D-83A3-32D4D562618F",
                   "title": "No hay instrumentos en vigor"
                }
             ]
          },
          {
             "key": "Q173",
             "section": "LiabilityRedress",
             "number": "173",
             "type": "sub-section",
             "title": "¿Cuenta su país con algún instrumento administrativo o jurídico por el cual se requiera adoptar medidas de respuesta en los siguientes casos?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q173_a",
                   "section": "LiabilityRedress",
                   "number": "a",
                   "type": "option",
                   "title": "¿En caso de daños provocados por OVM?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "validations": [
                      {
                         "question": "Q174",
                         "values": [
                            "true"
                         ],
                         "type": "@hasValues",
                         "trigger": "enable"
                      },
                      {
                         "question": "Q175",
                         "values": [
                            "true"
                         ],
                         "type": "@hasValues",
                         "trigger": "enable"
                      },
                      {
                         "question": "Q176",
                         "values": [
                            "true"
                         ],
                         "type": "&is173aOr173b",
                         "trigger": "enable"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q173_b",
                   "section": "LiabilityRedress",
                   "number": "b",
                   "type": "option",
                   "title": "¿En caso de que haya probabilidad suficiente de que se produzcan daños si no se adoptan medidas de respuesta?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Sí"
                      },
                      {
                         "value": "false",
                         "title": "No"
                      }
                   ],
                   "validations": [
                      {
                         "question": "Q176",
                         "values": [
                            "true"
                         ],
                         "type": "&is173aOr173b",
                         "trigger": "enable"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q174",
             "section": "LiabilityRedress",
             "number": "174",
             "type": "term",
             "title": "Si su respuesta a la pregunta 173a es <i>Sí</i>, ¿esos instrumentos le imponen algún requisito al operador? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "true.inform",
                   "title": "Sí, el operador debe informar a la autoridad competente sobre los daños"
                },
                {
                   "value": "true.evaluate",
                   "title": "Sí, el operador debe evaluar los daños"
                },
                {
                   "value": "true.response",
                   "title": "Sí, el operador debe tomar medidas de respuesta"
                },
                {
                   "value": "true.other",
                   "title": "Sí, otros requisitos",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q175",
             "section": "LiabilityRedress",
             "number": "175",
             "type": "option",
             "title": "Si su respuesta a la pregunta 173a es <i>Sí</i>, ¿exigen estos instrumentos que el operador tome medidas de respuesta para evitar daños?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q176",
             "section": "LiabilityRedress",
             "number": "176",
             "type": "option",
             "title": "Si su respuesta a la pregunta 173a o 173b es <i>Sí</i>, ¿dan estos instrumentos una definición de “operador”?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q177",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q177",
             "section": "LiabilityRedress",
             "number": "177",
             "type": "term",
             "title": "Si su respuesta a la pregunta 176 es <i>Sí</i>, ¿cuáles de los siguientes podría ser un “operador”? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "8F627A99-7CD4-D892-80EA-12C58607508F",
                   "title": "Titular de un permiso"
                },
                {
                   "value": "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                   "title": "Persona que colocó el OVM en el mercado"
                },
                {
                   "value": "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                   "title": "Desarrollador"
                },
                {
                   "value": "ADEF00D6-0901-8750-1069-5CBA877011CC",
                   "title": "Productor"
                },
                {
                   "value": "3F54E971-E791-FE00-5312-F7FF07C818B1",
                   "title": "Notificador"
                },
                {
                   "value": "2D8B29DD-0703-6130-BE79-389F5278C21D",
                   "title": "Exportador"
                },
                {
                   "value": "D475D239-517E-9D8B-E1F9-4C453039C792",
                   "title": "Importador"
                },
                {
                   "value": "8BD75295-88DF-2A32-A150-1132670E19A9",
                   "title": "Transportista"
                },
                {
                   "value": "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                   "title": "Proveedor"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q178",
             "section": "LiabilityRedress",
             "number": "178",
             "type": "option",
             "title": "¿Se ha designado una autoridad competente para desempeñar las funciones establecidas en el Protocolo Suplementario?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q179",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q179",
             "section": "LiabilityRedress",
             "number": "179",
             "type": "term",
             "title": "Si su respuesta a la pregunta 178 es <i>Sí</i>, ¿qué medidas podría adoptar la autoridad nacional competente? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                   "title": "Identificar al operador que causó los daños"
                },
                {
                   "value": "6065EDB8-C5A4-BA81-5271-B2F93159A471",
                   "title": "Evaluar los daños"
                },
                {
                   "value": "A038303D-7049-E34F-8381-5B59702BBCF6",
                   "title": "Determinar las medidas de respuesta que debe tomar el operador"
                },
                {
                   "value": "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                   "title": "Implementar las medidas de respuesta"
                },
                {
                   "value": "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                   "title": "Cobrar al operador los costos y gastos de la evaluación de los daños y de la implementación de las medidas de respuesta"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q180",
             "section": "LiabilityRedress",
             "number": "180",
             "type": "option",
             "title": "¿Cuenta su país con medidas establecidas para brindar garantías financieras en casos de daños provocados por OVM?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q181",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q181",
             "section": "LiabilityRedress",
             "number": "181",
             "type": "term",
             "title": "Si su respuesta a la pregunta 180 es <i>Sí</i>, ¿qué tipo de medidas de garantías financieras se han establecido? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                   "title": "Requisito de presentar pruebas de la solvencia de la fuente de financiación"
                },
                {
                   "value": "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                   "title": "Seguro obligatorio"
                },
                {
                   "value": "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                   "title": "Planes gubernamentales, incluidos fondos"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Otra",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q182",
             "section": "LiabilityRedress",
             "number": "182",
             "type": "term",
             "title": "¿Tiene su país normas y procedimientos sobre responsabilidad civil que aborden los daños resultantes de OVM o han sido esos daños reconocidos en fallos judiciales? (Seleccione todas las opciones que correspondan.)",
             "multiple": true,
             "options": [
                {
                   "value": "878DF5F5-0B5E-48E1-6A42-80867A101675",
                   "title": "Sí, en un instrumento de responsabilidad civil"
                },
                {
                   "value": "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                   "title": "Sí, en fallos judiciales"
                },
                {
                   "value": "true",
                   "title": "Sí, en otros instrumentos",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q183",
             "section": "LiabilityRedress",
             "number": "183",
             "type": "term",
             "title": "¿Se han producido daños como consecuencia de OVM en su país?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ],
             "validations": [
                {
                   "question": "Q184",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q184",
             "section": "LiabilityRedress",
             "number": "184",
             "type": "term",
             "title": "Si su respuesta a la pregunta 183 es <i>Sí</i>, ¿se tomaron medidas de respuesta?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Sí",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "No"
                }
             ]
          },
          {
             "key": "Q185",
             "section": "LiabilityRedress",
             "number": "185",
             "type": "lstring",
             "title": "En este espacio puede proporcionar más detalles sobre cualesquiera actividades emprendidas en su país con respecto a la aplicación del Protocolo Suplementario de Nagoya-Kuala Lumpur sobre Responsabilidad y Compensación:",
             "multiple": false
          }
       ]
    },
    {
       "key": "AdditionalInformation",
       "title": "Información adicional",
       "questions": [
          {
             "key": "Q186",
             "section": "AdditionalInformation",
             "number": "186",
             "type": "lstring",
             "title": "Utilice este campo para proporcionar cualquier otra información sobre cuestiones relacionadas con la aplicación nacional del Protocolo de Cartagena y del Protocolo Suplementario, incluidos obstáculos o impedimentos que se hayan enfrentado.",
             "multiple": false
          }
       ]
    },
    {
       "key": "Comments",
       "title": "Comentarios sobre el formato de presentación de informes",
       "questions": [
          {
             "key": "Q187",
             "section": "Comments",
             "number": "187",
             "type": "lstring",
             "title": "Utilice este campo para proporcionar cualquier otra información sobre dificultades que haya enfrentado para completar este informe.",
             "multiple": false
          }
       ]
    }
 ]
 ;
  return cpbNationalReport4;
});