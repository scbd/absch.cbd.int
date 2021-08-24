define(function () {
  'use strict';

  var cpbNationalReport4 = [
    {
       "key": "General",
       "title": "Сторонa Картахенского протокола по биобезопасности",
       "questions": [
          {
             "key": "Q012_party",
             "section": "General",
             "number": "11",
             "type": "option",
             "title": "Является ли ваша страна Стороной Картахенского протокола по биобезопасности (КПБ)?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если ваша страна не является Стороной Картахенского протокола по биобезопасности (КПБ), существует ли какой-либо национальный процесс, ведущий к тому, чтобы она стала Стороной Протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q013",
             "section": "General",
             "number": "13",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article2",
       "title": "Статья 2  – Общие положения",
       "description": "<i>Согласно статье 2 каждая Сторона принимает необходимые и соответствующие правовые, административные и другие меры для выполнения своих обязательств, предусмотренных в рамках настоящего Протокола.</i>",
       "questions": [
          {
             "key": "Q014",
             "section": "Article2",
             "number": "14",
             "type": "option",
             "title": "Приняла ли ваша страна необходимые национальные меры по осуществлению Протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "implementation.fullInPlace",
                   "title": "Национальные меры приняты полностью"
                },
                {
                   "value": "implementation.partiallyInPlace",
                   "title": "Национальные меры приняты частично"
                },
                {
                   "value": "implementation.temporaryMeasures",
                   "title": "Приняты лишь временные меры"
                },
                {
                   "value": "implementation.draftMeasures",
                   "title": "Подготовлены только проекты мер"
                },
                {
                   "value": "implementation.none",
                   "title": "Пока не принято никаких мер"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q015",
             "section": "Article2",
             "number": "15",
             "type": "option",
             "title": "Какие именно нормативно-правовые документы приняты для осуществления мер по обеспечению национальной биобезопасности? (выберите все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "instrument.nationalBiosafetyLaws",
                   "title": "Один или несколько национальных законов по биобезопасности"
                },
                {
                   "value": "instrument.nationalBiosafetyRegulations",
                   "title": "Одно или несколько национальных нормативных положений по биобезопасности"
                },
                {
                   "value": "instrument.biosafetyGuidelines",
                   "title": "Один или несколько наборов руководящих указаний по биобезопасности"
                },
                {
                   "value": "instrument.indirectLaws",
                   "title": "Прочие законы, нормативные положения или руководящие указания, косвенным образом относящиеся к биобезопасности"
                },
                {
                   "value": "instrument.none",
                   "title": "Документы отсутствуют"
                }
             ]
          },
          {
             "key": "Q016",
             "section": "Article2",
             "number": "16",
             "type": "option",
             "title": "Предпринимались ли в вашей стране инициативы по включению задач обеспечения биобезопасности в национальные стратегии и планы действий по биоразнообразию, другие меры политики или законодательство?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                },
                {
                   "value": "false.other",
                   "title": "Прочее",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q017",
             "section": "Article2",
             "number": "17",
             "type": "option",
             "title": "Создан ли в вашей стране механизм бюджетных ассигнований для выполнения мер по национальной биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q018",
             "section": "Article2",
             "number": "18",
             "type": "option",
             "title": "Имеется ли в вашей стране постоянный штат специалистов для выполнения функций, непосредственно связанных с обеспечением биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 18, укажите количество постоянных сотрудников, функции которых непосредственно связаны с системой обеспечения национальной биобезопасности. ",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q020",
             "section": "Article2",
             "number": "20",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 2 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article5",
       "title": "Статья 5 - Фармацевтические препараты",
       "questions": [
          {
             "key": "Q021",
             "section": "Article5",
             "number": "21",
             "type": "option",
             "title": "Регулирует ли ваша страна трансграничное перемещение, обработку или использование живых измененных организмов (ЖИО), представляющих собой фармацевтические препараты для человека?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q022",
             "section": "Article5",
             "number": "22",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 5 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article6",
       "title": "Статья 6 - Транзит и использование в замкнутых системах",
       "questions": [
          {
             "key": "Q023",
             "section": "Article6",
             "number": "23",
             "type": "option",
             "title": "Регулирует ли ваша страна транзит ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q024",
             "section": "Article6",
             "number": "24",
             "type": "option",
             "title": "Регулирует ли ваша страна использование ЖИО в замкнутых системах?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q025",
             "section": "Article6",
             "number": "25",
             "type": "option",
             "title": "Принимала ли ваша страна решение об импорте ЖИО для использования в замкнутых системах?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q026",
             "section": "Article6",
             "number": "26",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 6 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Articles7-10",
       "title": "Статьи 7 - 10 – Заблаговременное обоснованное согласие (ЗОС) и преднамеренная интродукция ЖИО в окружающую среду",
       "questions": [
          {
             "key": "Q027",
             "section": "Articles7-10",
             "number": "27",
             "type": "option",
             "title": "Установила ли ваша страна юридические требования к экспортерам, находящимся в ее юрисдикции, о письменном уведомлении компетентного национального органа Стороны импорта перед преднамеренным трансграничным перемещением ЖИО, на который распространяется действие процедуры ЗОС?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q028",
             "section": "Articles7-10",
             "number": "28",
             "type": "option",
             "title": "Выступая в качестве Стороны экспорта, установила ли ваша страна юридические требования к точности информации, предоставляемой экспортером в уведомлении?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                },
                {
                   "value": "false.notApplicable",
                   "title": "Не применимо (в настоящее время Сторона не экспортирует ЖИО)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q029",
             "section": "Articles7-10",
             "number": "29",
             "type": "option",
             "title": "Получала ли ваша страна в текущий отчетный период уведомление о преднамеренных трансграничных перемещениях ЖИО для преднамеренной интродукции в окружающую среду?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 29, содержало ли уведомление (уведомления) полную информацию (как минимум – информацию, указанную в приложении I к Картахенскому протоколу по биобезопасности)?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q031",
             "section": "Articles7-10",
             "number": "31",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 29, подтверждала ли ваша страна уведомителю получение уведомления (уведомлений) в течение девяноста дней со дня получения?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q032",
             "section": "Articles7-10",
             "number": "32",
             "type": "sub-section",
             "title": "Если вы ответили <i>Да</i> на вопрос 29, информировала ли ваша страна о своем решении (решениях):",
             "multiple": false,
             "questions": [
                {
                   "key": "Q032_a",
                   "section": "Articles7-10",
                   "number": "a",
                   "type": "option",
                   "title": "уведомителя?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да, всегда"
                      },
                      {
                         "value": "true.some",
                         "title": "Только в некоторых случаях"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q032_b",
                   "section": "Articles7-10",
                   "number": "b",
                   "type": "option",
                   "title": "Механизм посредничества по биобезопасности (МПБ)?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да, всегда"
                      },
                      {
                         "value": "true.some",
                         "title": "Только в некоторых случаях"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "Принимала ли ваша страна в текущий отчетный период решение в ответ на уведомление(ия) о преднамеренных трансграничных перемещениях ЖИО для преднамеренной интродукции в окружающую среду?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 33, то импорт скольких ЖИО ваша страна утвердила для преднамеренной интродукции в окружающую среду?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Если <i>на вопрос 34</i> вы ответили, что <i>импорт ЖИО был утвержден</i>, то все ли из этих ЖИО действительно были импортированы в вашу страну?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q036",
             "section": "Articles7-10",
             "number": "36",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 33, укажите, в каких процентных долях решения вашей страны распределяются среди перечисленных категорий: (выберите все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                   "title": "Разрешение на импорт/использование ЖИО без условий",
                   "type": "int"
                },
                {
                   "value": "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                   "title": "Разрешение на импорт/использование ЖИО с условиями",
                   "type": "int"
                },
                {
                   "value": "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                   "title": "Запрет на импорт/использование ЖИО",
                   "type": "int"
                },
                {
                   "value": "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                   "title": "Запрос дополнительной необходимой информации",
                   "type": "int"
                },
                {
                   "value": "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                   "title": "Уведомитель поставлен в известность, что срок для сообщения решения продлен",
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
             "title": "Если <i>на вопрос 36</i> вы ответили, что ваша страна приняла решение <i>разрешить импорт с условиями</i> или <i>запретить импорт</i>, сообщала ли она причины своего решения?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q038",
             "section": "Articles7-10",
             "number": "38",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения об осуществлении статей 7-10 в вашей стране, в том числе о мерах в случае отсутствия достоверных научных данных о потенциальном неблагоприятном воздействии ЖИО, предназначенных для преднамеренной интродукции в окружающую среду",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article11",
       "title": "Статья 11 – Процедура в отношении живых измененных организмов, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки (ЖИО-ПКО)",
       "questions": [
          {
             "key": "Q039",
             "section": "Article11",
             "number": "39",
             "type": "option",
             "title": "Приняты ли в вашей стране закон(ы), нормативное(ые) положение(я) или административные меры в отношении процесса принятия решений о внутреннем использовании ЖИО, включая их реализацию на рынке, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q040",
             "section": "Article11",
             "number": "40",
             "type": "option",
             "title": "Установлены ли в вашей стране юридические требования к точности информации, предоставляемой заявителем, о внутреннем использовании ЖИО, включая их реализацию на рынке, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q041",
             "section": "Article11",
             "number": "41",
             "type": "option",
             "title": "Сколько решений приняла ваша страна в текущий отчетный период <u>о внутреннем использовании</u> ЖИО, включая их реализацию на рынке, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q042",
             "section": "Article11",
             "number": "42",
             "type": "option",
             "title": "Приняты ли в вашей стране закон(ы), нормативное(ые) положение(я) или административные меры в отношении процесса принятия решений об импорте ЖИО, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q043",
             "section": "Article11",
             "number": "43",
             "type": "option",
             "title": "Сколько решений приняла ваша страна в текущий отчетный период <u>об импорте</u> ЖИО, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q044",
             "section": "Article11",
             "number": "44",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения об осуществлении статьи 11 в вашей стране, в том числе о мерах в случае отсутствия достоверных научных данных о потенциальном неблагоприятном воздействии ЖИО, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article12",
       "title": "Статья 12 - Пересмотр решений",
       "questions": [
          {
             "key": "Q045",
             "section": "Article12",
             "number": "45",
             "type": "option",
             "title": "Создан ли в вашей стране механизм пересмотра и изменения решений о преднамеренном трансграничном перемещении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q046",
             "section": "Article12",
             "number": "46",
             "type": "option",
             "title": "В текущем отчетном периоде ваша страна пересматривала и/или изменяла решение о преднамеренном трансграничном перемещении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 46, то сколько решений было пересмотрено и/или изменено?",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q048",
             "section": "Article12",
             "number": "48",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 46, укажите, вызван ли пересмотр решения запросом Стороны экспорта или уведомителя?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 48, давала ли ваша страна ответ с указанием причин принятия решения в течение девяноста дней?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q050",
             "section": "Article12",
             "number": "50",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 46, были ли какие-либо решения пересмотрены по инициативе вашей страны как Стороны импорта?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 50, информировала ли ваша страна в течение тридцати дней с указанием причин принятия решения:",
             "multiple": false,
             "questions": [
                {
                   "key": "Q051_a",
                   "section": "Article12",
                   "number": "a",
                   "type": "option",
                   "title": "уведомителя",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да, всегда"
                      },
                      {
                         "value": "true.some",
                         "title": "Только в некоторых случаях"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q051_b",
                   "section": "Article12",
                   "number": "b",
                   "type": "option",
                   "title": "МПБ?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да, всегда"
                      },
                      {
                         "value": "true.some",
                         "title": "Только в некоторых случаях"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 12 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article13",
       "title": "Статья 13 – Упрощенная процедура",
       "questions": [
          {
             "key": "Q053",
             "section": "Article13",
             "number": "53",
             "type": "option",
             "title": "Создан ли в вашей стране механизм применения упрощенной процедуры в отношении преднамеренного трансграничного перемещения ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q054",
             "section": "Article13",
             "number": "54",
             "type": "option",
             "title": "В текущий отчетный период ваша страна применяла упрощенную процедуру?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 54, то в отношении скольких ЖИО ваша страна применяла упрощенную процедуру?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 5"
                },
                {
                   "value": "5+",
                   "title": "5 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q056",
             "section": "Article13",
             "number": "56",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 54, то информировала ли через МПБ ваша страна Стороны о случаях применения упрощенной процедуры?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q057",
             "section": "Article13",
             "number": "57",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 13 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article14",
       "title": "Статья 14 – Двусторонние, региональные и многосторонние соглашения и договоренности",
       "questions": [
          {
             "key": "Q058",
             "section": "Article14",
             "number": "58",
             "type": "option",
             "title": "Сколько двусторонних, региональных или многосторонних соглашений или договоренностей, имеющих отношение к биобезопасности, заключила ваша страна с другими Сторонами или государствами, не являющимися Сторонами?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Если вы ответили <i>на вопрос 58</i>, что <i>соглашения или договоренности были заключены</i>, кратко опишите их сферу применения и цель",
             "multiple": false,
             "mandatory": true
          },
          {
             "key": "Q060",
             "section": "Article14",
             "number": "60",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 14 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article15_16",
       "title": "Статьи 15 и 16 – Оценка рисков и регулирование рисков",
       "questions": [
          {
             "key": "Q061",
             "section": "Article15_16",
             "number": "61",
             "type": "option",
             "title": "В соответствии с национальной нормативно-правовой базой вашей страны требуется ли проведение оценки рисков в отношении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 61, то к каким ЖИО применяется это требование (oтметьте все подходящие варианты)?",
             "multiple": true,
             "options": [
                {
                   "value": "014054D1-2B72-7ABD-E615-D0A374590A95",
                   "title": "Импортируемые ЖИО для преднамеренной интродукции в окружающую среду"
                },
                {
                   "value": "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                   "title": "Импортируемые ЖИО, предназначенные для непосредственного использования в качестве продовольствия или корма, или для переработки"
                },
                {
                   "value": "29B97F6B-066E-BE64-0FA3-66060DEE737D",
                   "title": "Для принятия решений о внутреннем использовании ЖИО, включая их реализацию на рынке, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки"
                },
                {
                   "value": "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                   "title": "Импортируемые ЖИО для использования в замкнутых системах"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
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
             "title": "Создан ли в вашей стране механизм проведения оценок рисков перед принятием решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 63, то предусмотрен ли в данном механизме порядок выявления национальных экспертов и/или их профессиональной подготовки для проведения оценок рисков?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "legend15_16",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>Создание потенциала в области оценки рисков или регулирования рисков</i>"
          },
          {
             "key": "Q065",
             "section": "Articles12",
             "number": "65",
             "type": "sub-section",
             "title": "Сколько человек в вашей стране прошло профессиональную подготовку в области оценки рисков в отношении ЖИО, их мониторинга и регулирования?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q065_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Оценка рисков",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ни одного"
                      },
                      {
                         "value": "1+",
                         "title": "1 - 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 - 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 - 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 или более"
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
                   "title": "Это достаточное количество",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ]
                },
                {
                   "key": "Q065_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Регулирование рисков",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ни одного"
                      },
                      {
                         "value": "1+",
                         "title": "1 - 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 - 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 - 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 или более"
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
                   "title": "Это достаточное количество",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ]
                },
                {
                   "key": "Q065_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Мониторинг",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Ни одного"
                      },
                      {
                         "value": "1+",
                         "title": "1 - 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 - 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 - 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 или более"
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
                   "title": "Это достаточное количество",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "Используются ли в вашей стране учебные материалы и/или технические руководства для профессиональной подготовки в сфере оценки рисков и регулирования рисков в отношении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 66, то используется ли в вашей стране Руководство по оценке рисков в отношении ЖИО (разработанное секретариатом КБР) для профессиональной подготовки по оценке рисков?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q068",
             "section": "Article15_16",
             "number": "68",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 66, то используются ли в вашей стране Руководящие указания по оценке рисков в отношении ЖИО (разработанные на сетевом форуме и Специальной группой технических экспертов по оценке и регулированию рисков) для профессиональной подготовки по оценке рисков?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q069",
             "section": "Article15_16",
             "number": "69",
             "type": "option",
             "title": "Есть ли у вашей страны конкретные потребности в дополнительных рекомендациях по определенным темам оценки рисков в отношении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q070",
             "section": "Article15_16",
             "number": "70",
             "type": "sub-section",
             "title": "Обладает ли ваша страна потенциалом для обнаружения, идентификации, оценки рисков и/или мониторинга ЖИО или специфических признаков, которые могут оказывать неблагоприятное воздействие на сохранение и устойчивое использование биологического разнообразия, учитывая также риски для здоровья человека?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q070_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Обнаружение",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ]
                },
                {
                   "key": "Q070_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Идентификация",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ]
                },
                {
                   "key": "Q070_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Оценка риска",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
                      }
                   ]
                },
                {
                   "key": "Q070_d",
                   "section": "Article15_16",
                   "number": "d",
                   "type": "option",
                   "title": "Мониторинг",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "<i>Проведение оценки рисков или регулирование рисков</i>"
          },
          {
             "key": "Q071",
             "section": "Article15_16",
             "number": "71",
             "type": "sub-section",
             "title": "Были ли в вашей стране приняты или используются какие-либо руководящие документы для целей проведения оценки рисков, регулирования рисков или анализа докладов об оценке рисков, предоставляемых уведомителями?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q071_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Оценка рисков",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
                   "title": "Регулирование рисков",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 71, то используются ли в вашей стране Руководящие указания по оценке рисков в отношении ЖИО (разработанные в рамках сетевого форума и Специальной группы технических экспертов по оценке и регулированию рисков) для проведения оценки рисков, регулирования рисков или анализа докладов об оценке рисков, предоставляемых уведомителями?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q073",
             "section": "Article15_16",
             "number": "73",
             "type": "option",
             "title": "Приняла ли ваша страна какие-либо общие подходы или методологии в области оценки рисков в координации с другими странами?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q074",
             "section": "Article15_16",
             "number": "74",
             "type": "option",
             "title": "Сотрудничала ли ваша страна с другими Сторонами в выявлении ЖИО или специфических признаков, которые могут оказывать неблагоприятное воздействие на сохранение и устойчивое использование биологического разнообразия?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q075",
             "section": "Article15_16",
             "number": "75",
             "type": "option",
             "title": "В текущий отчетный период проводились ли в вашей стране какие-либо оценки рисков в отношении ЖИО, в том числе для целей использования в замкнутых системах, полевых испытаний, коммерческого использования, непосредственного использования в качестве продовольствия или корма, или для переработки?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 75, укажите, сколько оценок рисков было проведено.",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 - 99"
                },
                {
                   "value": "100+",
                   "title": "100 или более"
                }
             ]
          },
          {
             "key": "Q077",
             "section": "Article15_16",
             "number": "77",
             "type": "term",
             "title": "Если вы ответили <i>Да</i> на вопрос 75, укажите область применения, в которой проводилась оценка рисков (отметьте все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                   "title": "ЖИО в замкнутых системах (в соответствии со статьей 3)"
                },
                {
                   "value": "D6B59E8A-D82C-4516-917A-A745ACDA5931",
                   "title": "ЖИО, предназначенные для преднамеренной интродукция в окружающую среду для экспериментального тестирования или полевых испытаний"
                },
                {
                   "value": "015737FC-ABC2-460C-A099-06A1B01E649A",
                   "title": "ЖИО, предназначенные для преднамеренной интродукции в окружающую среду в коммерческих целях"
                },
                {
                   "value": "91BEAF12-ABE1-4294-AD3B-507935894C78",
                   "title": "ЖИО, предназначенные для непосредственного использования в качестве продовольствия"
                },
                {
                   "value": "1D96153B-1625-44E4-AD5E-D26429044B29",
                   "title": "ЖИО, предназначенные для непосредственного использования в качестве корма"
                },
                {
                   "value": "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                   "title": "ЖИО, предназначенные для переработки"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q078",
             "section": "Article15_16",
             "number": "78",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 75, укажите, проводились ли оценки рисков по всем принятым решениям о преднамеренной интродукции ЖИО в окружающую среду или о внутреннем использовании ЖИО, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки.",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q079",
             "section": "Article15_16",
             "number": "79",
             "type": "option",
             "title": "Установлены ли в вашей стране необходимые механизмы, меры и стратегии по регулированию и управлению рисками, выявленными в оценке рисков в отношении ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q080",
             "section": "Article15_16",
             "number": "80",
             "type": "option",
             "title": "Приняты ли в вашей стране необходимые меры по предотвращению непреднамеренных трансграничных перемещений ЖИО, включая меры, требующие проведения оценки рисков перед первым высвобождением ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q081",
             "section": "Article15_16",
             "number": "81",
             "type": "option",
             "title": "Приняты ли в вашей стране меры, обеспечивающие, чтобы перед предполагаемым использованием любого ЖИО, как импортированного, так и созданного в стране, он был подвергнут достаточно длительному наблюдению, по времени соответствующему его жизненному циклу или периоду воспроизводства?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q082",
             "section": "Article15_16",
             "number": "82",
             "type": "option",
             "title": "Создан ли в вашей стране механизм отслеживания возможного воздействия ЖИО, высвобождаемых в окружающую среду?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q083",
             "section": "Article15_16",
             "number": "83",
             "type": "option",
             "title": "Располагает ли ваша страна необходимой инфраструктурой (например, лабораторным оборудованием) для мониторинга или регулирования ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q084",
             "section": "Article15_16",
             "number": "84",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения об осуществлении статей 15 и 16 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article17",
       "title": "Статья 17 – Непреднамеренные трансграничные перемещения<sup>2</sup> и чрезвычайные меры",
       "footnote": "<sup>2</sup> Согласно рабочему определению, принятому в решении CP VIII/16, «непреднамеренное трансграничное перемещение означает трансграничное перемещение живого измененного организма, который непреднамеренно пересек национальные границы Стороны, где живой измененный организм был высвобожден, и требования статьи 17 Протокола применяются к таким трансграничным перемещениям, только если данный живой измененный организм будет, возможно, оказывать значительное неблагоприятное воздействие на сохранение и устойчивое использование биологического разнообразия, учитывая также риски для здоровья человека, в затронутых или потенциально затрагиваемых государствах».",
       "questions": [
          {
             "key": "Q085",
             "section": "Article17",
             "number": "85",
             "type": "option",
             "title": "Установлены ли в вашей стране меры для уведомления затронутых или потенциально затрагиваемых государств, механизма посредничества по биобезопасности и при необходимости соответствующих международных организаций в случае высвобождения ЖИО в районе, находящемся под ее юрисдикцией, которое ведет или может привести к непреднамеренному трансграничному перемещению ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q086",
             "section": "Article17",
             "number": "86",
             "type": "option",
             "title": "В текущем отчетном периоде сколько высвобождений ЖИО произошло на территории под юрисдикцией вашей страны, которые привели или могли привести к непреднамеренному трансграничному перемещению?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Если вы ответили <i>на вопрос 86</i>, что <i>высвобождение произошло</i>, то уведомляла ли ваша страна об этом затронутые или потенциально затрагиваемые государства, Механизм посредничества по биобезопасности и в необходимых случаях соответствующие международные организации?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q088",
             "section": "Article17",
             "number": "88",
             "type": "option",
             "title": "Обладает ли ваша страна возможностями для принятия необходимых мер реагирования в случае непреднамеренных трансграничных перемещений?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q089",
             "section": "Article17",
             "number": "89",
             "type": "option",
             "title": "В текущем отчетном периоде сколько непреднамеренных трансграничных перемещений ЖИО было зафиксировано на территории вашей страны?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q090",
             "section": "Article17",
             "number": "90",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 17 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article18",
       "title": "Статья 18 – Обработка, транспортировка, упаковка и идентификация",
       "questions": [
          {
             "key": "Q091",
             "section": "Article18",
             "number": "91",
             "type": "option",
             "title": "Приняты ли в вашей стране меры, в соответствии с которыми требуется, чтобы <i>ЖИО, являющиеся объектом трансграничного перемещения</i>, обрабатывались, упаковывались и транспортировались с соблюдением условий безопасности, принимая во внимание соответствующие международные правила и нормы?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Приняты ли в вашей стране меры, требующие, чтобы в сопроводительной документации для ЖИО-ПКО <i>в случаях, когда идентификационные данные ЖИО <u>не известны</u></i>, четко указывалось, что груз <i>может содержать ЖИО</i> и не предназначен для преднамеренной интродукции в окружающую среду, а также указывались контактные данные для получения дополнительной информации?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Приняты ли в вашей стране меры, требующие, чтобы в сопроводительной документации для ЖИО-ПКО <i>в случаях, когда идентификационные данные ЖИО <u>известны</u></i>, четко указывалось, что груз <i>содержит ЖИО</i> и не предназначен для преднамеренной интродукции в окружающую среду, а также указывались контактные данные для получения дополнительной информации?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос(ы) 91, 92 и/или 93, укажите, какой тип сопроводительной документации требует ваша страна для ЖИО.",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Отдельный документ по ЖИО"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Существующие типы документации (не отдельные документы по ЖИО)"
                },
                {
                   "value": "other",
                   "title": "Прочее",
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
             "title": "Приняты ли в вашей стране меры, требующие, чтобы в сопроводительной документации для <i>ЖИО, предназначенных для использования в замкнутых системах</i>, они четко определялись как <i>ЖИО</i> с указанием всех требований к безопасной обработке, хранению, транспортировке и использованию, контактного пункта для получения дополнительной информации, включая ФИО, адрес лица и название учреждения, которым направляются  ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 95, укажите, какой тип документации требуется в вашей стране для идентификации ЖИО, предназначенных для использования в замкнутых системах.",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Отдельный документ по ЖИО"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Существующие типы документации (не отдельные документы по ЖИО)"
                },
                {
                   "value": "other",
                   "title": "Прочее",
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
             "title": "Приняты ли в вашей стране меры, требующие, чтобы в сопроводительной документации для <i>ЖИО, предназначенных для преднамеренной интродукции в окружающую среду Стороны импорта</i>, они четко определялись как <i>живые измененные организмы</i> с указанием идентификационных данных и соответствующих признаков и/или характеристик, любых требований к безопасной обработке, хранению, транспортировке и использованию, контактных данных для получения дополнительной информации и в соответствующих случаях ФИО/названия и адреса импортера и экспортера и содержалась декларация о том, что перемещение осуществляется в соответствии с требованиями Протокола, применяемыми к экспортеру?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 97, укажите, какой тип документации требуется в вашей стране для идентификации ЖИО, предназначенных для преднамеренной интродукции в окружающую среду.",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Отдельный документ по ЖИО"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Существующие типы документации (не отдельные документы по ЖИО)"
                },
                {
                   "value": "other",
                   "title": "Прочее",
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
             "title": "Располагает ли ваша страна какими-либо руководствами для обеспечения безопасной обработки, транспортировки и упаковки живых измененных организмов?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q100",
             "section": "Article18",
             "number": "100",
             "type": "option",
             "title": "Располагает ли ваша страна возможностями обеспечивать выполнение требований об идентификации и документировании ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q101",
             "section": "Article18",
             "number": "101",
             "type": "option",
             "title": "Сколько таможенных служащих в вашей стране прошли профессиональную подготовку по идентификации ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 - 99"
                },
                {
                   "value": "100+",
                   "title": "100 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q102",
             "section": "Article18",
             "number": "102",
             "type": "option",
             "title": "Установлены ли в вашей стране процедуры отбора проб и обнаружения ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q103",
             "section": "Article18",
             "number": "103",
             "type": "option",
             "title": "Сколько сотрудников лабораторий в вашей стране прошли профессиональную подготовку по обнаружению ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 - 99"
                },
                {
                   "value": "100+",
                   "title": "100 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q104",
             "section": "Article18",
             "number": "104",
             "type": "option",
             "title": "Есть ли у вашей страны надежный доступ к лабораторному оборудованию для обнаружения ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q105",
             "section": "Article18",
             "number": "105",
             "type": "option",
             "title": "Сколько лабораторий в вашей стране сертифицированы для обнаружения ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 или более"
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
             "title": "Если вы ответили <i>на вопрос 105</i>, что <i>в вашей стране есть сертифицированные лаборатории</i>, то какое их количество в настоящее время занимаются обнаружением ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q107",
             "section": "Article18",
             "number": "107",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 18 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article19",
       "title": "Статья 19 – Компетентные национальные органы и национальные координационные центры",
       "questions": [
          {
             "key": "Q108",
             "section": "Article19",
             "number": "108",
             "type": "option",
             "title": "Если ваша страна назначила несколько компетентных национальных органов, разработала ли она механизм координации их действий перед принятием решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                },
                {
                   "value": "false.noCna",
                   "title": "Не применимо (компетентный национальный орган не назначен)"
                },
                {
                   "value": "false.oneCna",
                   "title": "Не применимо (назначен только один компетентный национальный орган)"
                }
             ]
          },
          {
             "key": "Q109",
             "section": "Article19",
             "number": "109",
             "type": "option",
             "title": "Создан ли в вашей стране необходимый организационный потенциал, позволяющий компетентному национальному органу(органам) выполнять административные функции, предусмотренные Картахенским протоколом по биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q110",
             "section": "Article19",
             "number": "110",
             "type": "option",
             "title": "Предпринимались ли в вашей стране инициативы по укреплению сотрудничества между национальными координационными центрами, компетентным национальным органом (органами) и другими учреждениями по вопросам, связанным с биобезопасностью?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q111",
             "section": "Article19",
             "number": "111",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 19 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article20",
       "title": "Статья 20 – Обмен информацией и Механизм посредничества по биобезопасности (МПБ)",
       "questions": [
          {
             "key": "Q112",
             "section": "Article20",
             "number": "112",
             "type": "sub-section",
             "title": "Просьба предоставить общий обзор положения дел в связи с обязательной информацией, представляемой вашей страной в МПБ, указав по каждой категории информации, имеется ли она в наличии и была ли она представлена в МПБ.",
             "questions": [
                {
                   "key": "Q112_a",
                   "section": "Article20",
                   "number": "a",
                   "type": "option",
                   "title": "Имеющиеся законы, нормативные положения и руководящие указания по осуществлению Протокола, а также информация, необходимая Сторонам для процедуры заблаговременного обоснованного согласия (пункт 3 a) статьи 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_b",
                   "section": "Article20",
                   "number": "b",
                   "type": "option",
                   "title": "Законы, нормативные положения и руководящие указания, применимые к импорту ЖИО, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки (пункт 5 статьи 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_c",
                   "section": "Article20",
                   "number": "c",
                   "type": "option",
                   "title": "Двусторонние, региональные и многосторонние соглашения и договоренности (пункт 2 статьи 14 и пункт 3 b) статьи 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_d",
                   "section": "Article20",
                   "number": "d",
                   "type": "option",
                   "title": "Контактные данные компетентных национальных органов (пункты 2 и 3 статьи 19), национальных координационных центров (пункты 1 и 3 статьи 19), а также лиц для связи в случае чрезвычайной ситуации (пункт 3 e) статьи 17)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_e",
                   "section": "Article20",
                   "number": "e",
                   "type": "option",
                   "title": "Решения Стороны о транзите ЖИО (пункт 1 статьи 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_f",
                   "section": "Article20",
                   "number": "f",
                   "type": "option",
                   "title": "Решения Стороны об импорте ЖИО для использования в замкнутых системах (пункт 2 статьи 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_g",
                   "section": "Article20",
                   "number": "g",
                   "type": "option",
                   "title": "Уведомления о высвобождении на территории под юрисдикцией вашей страны, которое ведет или может привести к непреднамеренному трансграничному перемещению ЖИО, который может оказать значительное неблагоприятное воздействие на биологическое разнообразие (пункт 1 статьи 17)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_h",
                   "section": "Article20",
                   "number": "h",
                   "type": "option",
                   "title": "Информация о случаях незаконного трансграничного перемещения ЖИО (пункт 3 статьи 25)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_i",
                   "section": "Article20",
                   "number": "i",
                   "type": "option",
                   "title": "Решения об импорте ЖИО для преднамеренной интродукции в окружающую среду (пункт 3 статьи 10)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_j",
                   "section": "Article20",
                   "number": "j",
                   "type": "option",
                   "title": "Информация о применении национальных нормативных положений в отношении конкретных импортных поставок ЖИО (пункт 4 статьи 14)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_k",
                   "section": "Article20",
                   "number": "k",
                   "type": "option",
                   "title": "Решения о внутреннем использовании ЖИО, которые могут стать объектом трансграничного перемещения для непосредственного использования в качестве продовольствия или корма, или для переработки (пункт 1 статьи 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_l",
                   "section": "Article20",
                   "number": "l",
                   "type": "option",
                   "title": "Решения об импорте ЖИО, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки, принимаемые в рамках национальной регламентационной базы (пункт 4 статьи 11) или в соответствии с приложением III Протокола (пункт 6 статьи 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_m",
                   "section": "Article20",
                   "number": "m",
                   "type": "option",
                   "title": "Заявления о регламентационной базе, которая будет применяться в отношении ЖИО, предназначенных для непосредственного использования в качестве продовольствия или корма, или для переработки (пункт 6 статьи 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_n",
                   "section": "Article20",
                   "number": "n",
                   "type": "option",
                   "title": "Пересмотр и изменение решений о преднамеренных трансграничных перемещениях ЖИО (пункт 1 статьи 12)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_o",
                   "section": "Article20",
                   "number": "o",
                   "type": "option",
                   "title": "Случаи, когда преднамеренное трансграничное перемещение может производиться одновременно с уведомлением Стороны импорта об этом перемещении (пункт 1 статьи 13)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_p",
                   "section": "Article20",
                   "number": "p",
                   "type": "option",
                   "title": "ЖИО, получившие статус исключения в каждой из Сторон (пункт 1 b) статьи 13)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_q",
                   "section": "Article20",
                   "number": "q",
                   "type": "option",
                   "title": "Резюме итогов оценки рисков или экологических обзоров в отношении ЖИО, проводимых в рамках регламентационного процесса, и соответствующая информация о содержащих их продуктах (пункт 3 c) статьи 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Информация имеется и представлена в МПБ"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Информация имеется, но не представлена в МПБ"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Информация имеется, но представлена в МПБ лишь частично"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Информация отсутствует"
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
             "title": "Если по любому из пунктов вопроса 112 вы ответили, что информация имеется, <i>но не представлена в МПБ или представлена в МПБ лишь частично</i>, просьба предоставить краткое объяснение",
             "multiple": false
          },
          {
             "key": "Q114",
             "section": "Article20",
             "number": "114",
             "type": "option",
             "title": "Создан ли в вашей стране механизм укрепления потенциала национального координационного центра по МПБ для выполнения его административных функций?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q115",
             "section": "Article20",
             "number": "115",
             "type": "option",
             "title": "Создан ли в вашей стране механизм координации действий национального координационного центра по МПБ, координационного центра по Картахенскому протоколу и компетентного национального органа (органов) по представлению информации в МПБ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q116",
             "section": "Article20",
             "number": "116",
             "type": "option",
             "title": "Использует ли ваша страна в процессах принятия решений о ЖИО информацию, доступную в МПБ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Да, в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                },
                {
                   "value": "false.na",
                   "title": "Не применимо (решения не принимались)"
                }
             ]
          },
          {
             "key": "Q117",
             "section": "Article20",
             "number": "117",
             "type": "option",
             "title": "Испытывает ли ваша страна трудности с доступом к МПБ или его использованием?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q118",
             "section": "Article20",
             "number": "118",
             "type": "option",
             "title": "Сколько мероприятий в области биобезопасности (например, семинаров, практикумов, пресс-конференций, просветительских мероприятий) было организовано в вашей стране за текущий отчетный период?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 24"
                },
                {
                   "value": "25+",
                   "title": "25 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q119",
             "section": "Article20",
             "number": "119",
             "type": "option",
             "title": "Сколько публикаций по тематике биобезопасности было издано в вашей стране в текущий отчетный период?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 - 99"
                },
                {
                   "value": "100+",
                   "title": "100 или более"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q120",
             "section": "Article20",
             "number": "120",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 20 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article21",
       "title": "Статья 21 – Конфиденциальная информация",
       "questions": [
          {
             "key": "Q121",
             "section": "Article21",
             "number": "121",
             "type": "option",
             "title": "Установлены ли в вашей стране процедуры по защите конфиденциальной информации, получаемой в рамках Протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q122",
             "section": "Article21",
             "number": "122",
             "type": "option",
             "title": "Допускается ли в вашей стране, чтобы уведомитель определял информацию, которую следует считать конфиденциальной?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q123",
             "section": "Article21",
             "number": "123",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 21 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article22",
       "title": "Статья 22 – Создание потенциала",
       "questions": [
          {
             "key": "Q124",
             "section": "Article22",
             "number": "124",
             "type": "option",
             "title": "Обеспечивается ли в вашей стране предсказуемое и надежное финансирование для создания потенциала в целях эффективного осуществления Протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q125",
             "section": "Article22",
             "number": "125",
             "type": "option",
             "title": "Получала ли ваша страна внешнюю поддержку или выгоды от совместной работы с другими Сторонами в развитии и/или укреплении людских ресурсов и организационного потенциала в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 125, то каким образом выделялись эти ресурсы? (выберите все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "По двусторонним каналам"
                },
                {
                   "value": "channels.regional",
                   "title": "По региональным каналам"
                },
                {
                   "value": "channels.multilateral",
                   "title": "По многосторонним каналам"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q127",
             "section": "Article22",
             "number": "127",
             "type": "option",
             "title": "Оказывала ли ваша страна поддержку другим Сторонам в развитии и/или укреплении людских ресурсов и организационного потенциала в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 127, то каким образом выделялись эти ресурсы? (выберите все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "По двусторонним каналам"
                },
                {
                   "value": "channels.regional",
                   "title": "По региональным каналам"
                },
                {
                   "value": "channels.multilateral",
                   "title": "По многосторонним каналам"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q129",
             "section": "Article22",
             "number": "129",
             "type": "option",
             "title": "В отчетный период был ли начат в вашей стране процесс получения доступа к средствам Глобального экологического фонда (ГЭФ) в целях создания потенциала в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 129, то как бы вы охарактеризовали этот процесс?",
             "multiple": false,
             "options": [
                {
                   "value": "veryEasy",
                   "title": "Очень простой"
                },
                {
                   "value": "easy",
                   "title": "Простой"
                },
                {
                   "value": "average",
                   "title": "Нормальный"
                },
                {
                   "value": "difficult",
                   "title": "Трудный"
                },
                {
                   "value": "veryDifficult",
                   "title": "Очень трудный"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q131",
             "section": "Article22",
             "number": "131",
             "type": "term",
             "title": "Осуществляла ли ваша страна в текущий отчетный период мероприятия по развитию и/или укреплению людских ресурсов и организационного потенциала в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 131, укажите, в каких из перечисленных областей были осуществлены эти мероприятия (выберите все подходящие варианты):",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Организационный потенциал и людские ресурсы"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Внедрение задач обеспечения биобезопасности в межсекторальное и секторальное законодательство, политику и в деятельность учреждений (актуализация тематики биобезопасности)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Оценка рисков и другие научно-технические экспертные знания"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Регулирование рисков"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Информирование, участие и просвещение общественности в области биобезопасности"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Обмен информацией и управление данными, включая участие в Механизме посредничества по биобезопасности"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Научное, техническое и организационное сотрудничество на субрегиональном, региональном и международном уровнях"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Передача технологий"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Идентификация ЖИО, включая их обнаружение"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Социально-экономические соображения"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Выполнение требований к документации в рамках статьи 18.2 Протокола"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Обращение с конфиденциальной информацией "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Меры по предотвращению непреднамеренных и/или незаконных трансграничных перемещений ЖИО"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Научные исследования в области биобезопасности, связанные с ЖИО"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Учет рисков для здоровья человека"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Oтветственность и возмещение"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
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
             "title": "В текущий отчетный период проводилась ли в вашей стране оценка потребностей в создании потенциала?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q134",
             "section": "Article22",
             "number": "134",
             "type": "option",
             "title": "Продолжает ли ваша страна испытывать потребности в создании потенциала?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 134, укажите, в каких из перечисленных областей все еще сохраняется потребность в создании потенциала (выберите все подходящие варианты):",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Организационный потенциал и людские ресурсы"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Внедрение задач обеспечения биобезопасности в межсекторальное и секторальное законодательство, политику и в деятельность учреждений (актуализация тематики биобезопасности)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Оценка рисков и другие научно-технические экспертные знания"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Регулирование рисков"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Информирование, участие и просвещение общественности в области биобезопасности"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Обмен информацией и управление данными, включая участие в Механизме посредничества по биобезопасности"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Научное, техническое и организационное сотрудничество на субрегиональном, региональном и международном уровнях"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Передача технологий"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Отбор проб, обнаружение и идентификация ЖИО"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Социально-экономические соображения"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Выполнение требований к документации по обработке, транспортировке, упаковке и идентификации"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Обращение с конфиденциальной информацией "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Меры по предотвращению непреднамеренных и/или незаконных трансграничных перемещений ЖИО"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Научные исследования в области биобезопасности, связанные с ЖИО"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Учет рисков для здоровья человека"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Oтветственность и возмещение"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
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
             "title": "Разработала ли ваша страна стратегию или план действий по созданию потенциала?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q137",
             "section": "Article22",
             "number": "137",
             "type": "option",
             "title": "Внедрен ли в вашей стране функциональный национальный механизм для координации инициатив по созданию потенциала в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q138",
             "section": "Article22",
             "number": "138",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения об осуществлении статьи 22 в вашей стране, включая дополнительные сведения о вашем опыте в получении доступа к средствам ГЭФ",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article23",
       "title": "Статья 23 – Информирование и участие общественности",
       "questions": [
          {
             "key": "Q139",
             "section": "Article23",
             "number": "139",
             "type": "option",
             "title": "Учитываются ли вопросы информирования, просвещения и/или участия общественности в области биобезопасности в законодательстве или политике вашей страны?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q140",
             "section": "Article23",
             "number": "140",
             "type": "option",
             "title": "В текущем отчетном периоде сотрудничала ли ваша страна с другими государствами и международными органами в области информирования, просвещения и участия общественности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q141",
             "section": "Article23",
             "number": "141",
             "type": "option",
             "title": "Создан ли в вашей стране механизм, обеспечивающий доступ общественности к информации о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q142",
             "section": "Article23",
             "number": "142",
             "type": "option",
             "title": "Есть ли у вашей страны национальная коммуникационная стратегия в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q143",
             "section": "Article23",
             "number": "143",
             "type": "option",
             "title": "Есть ли в вашей стране информационно-пропагандистские программы по вопросам биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q144",
             "section": "Article23",
             "number": "144",
             "type": "option",
             "title": "Есть ли в настоящее время в вашей стране национальный веб-сайт по биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145",
             "section": "Article23",
             "number": "145",
             "type": "option",
             "title": "Сколько академических учреждений в вашей стране предлагают курсы и программы образования и профессиональной подготовки в области биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q146",
             "section": "Article23",
             "number": "146",
             "type": "option",
             "title": "Сколько учебных материалов и/или онлайновых учебных модулей по биобезопасности имеется и доступно гражданам в вашей стране?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 24"
                },
                {
                   "value": "25+",
                   "title": "25 - 99"
                },
                {
                   "value": "100+",
                   "title": "100 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q147",
             "section": "Article23",
             "number": "147",
             "type": "option",
             "title": "Разработан ли в вашей стране механизм проведения консультаций с общественностью в процессе принятия решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q148",
             "section": "Article23",
             "number": "148",
             "type": "option",
             "title": "Информирует ли ваша страна граждан об имеющихся формах участия общества в процессе принятия решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 148, укажите, какие способы используются для информирования граждан: (выберите все применимые варианты)",
             "multiple": true,
             "options": [
                {
                   "value": "4E205CD9-9958-497F-A760-F8321771AB3A",
                   "title": "Национальные веб-сайты"
                },
                {
                   "value": "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                   "title": "Газеты"
                },
                {
                   "value": "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                   "title": "Форумы"
                },
                {
                   "value": "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                   "title": "Списки рассылки"
                },
                {
                   "value": "51792A07-B3C0-4F7B-830E-0741635F57BB",
                   "title": "Общественные слушания"
                },
                {
                   "value": "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                   "title": "Социальные сети"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
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
             "title": "Сколько раз за текущий отчетный период в вашей стране проходили общественные консультации в ходе процесса принятия решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни разу (решения принимались без консультаций)"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 или более"
                },
                {
                   "value": "na",
                   "title": "Не применимо (решения не принимались)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q151",
             "section": "Article23",
             "number": "151",
             "type": "option",
             "title": "Информированы ли граждане вашей страны о способах доступа к Механизму посредничества по биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q152",
             "section": "Article23",
             "number": "152",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 23 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article24",
       "title": "Статья 24 – Государства, не являющиеся Сторонами",
       "questions": [
          {
             "key": "Q153",
             "section": "Article24",
             "number": "153",
             "type": "option",
             "title": "Заключала ли ваша страна какие-либо двусторонние, региональные или многосторонние соглашения с государствами, не являющимися Сторонами, о трансграничных перемещениях ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q154",
             "section": "Article24",
             "number": "154",
             "type": "option",
             "title": "В текущий отчетный период импортировала ли ваша страна ЖИО из государства, не являющегося Стороной?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "В текущий отчетный период экспортировала ли ваша страна ЖИО в государство, не являющееся Стороной?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопросы 154 и/или 155, то соответствовали ли трансграничные перемещения ЖИО цели Картахенского протокола по биобезопасности?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q157",
             "section": "Article24",
             "number": "157",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 24 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article25",
       "title": "Статья 25 – Незаконные трансграничные перемещения<sup>3</sup>",
       "footnote": "<sup>3</sup>Согласно рабочему определению, принятому в решении CP VIII/16, «термин \"незаконное трансграничное перемещение\" означает трансграничное перемещение живых измененных организмов, осуществляемое в нарушение национальных мер по осуществлению Протокола, которые были приняты соответствующей Стороной».",
       "questions": [
          {
             "key": "Q158",
             "section": "Article25",
             "number": "158",
             "type": "option",
             "title": "Приняты ли в вашей стране национальные меры, направленные на предотвращение трансграничных перемещений ЖИО и/или предусматривающие наказание за их совершение в случаях, когда такие перемещения нарушают ее национальные меры по осуществлению Картахенского Протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в определенной степени",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q159",
             "section": "Article25",
             "number": "159",
             "type": "option",
             "title": "За текущий отчетный период сколько случаев незаконного трансграничного перемещения ЖИО было зафиксировано в вашей стране?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 или более"
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
             "title": "Если вы ответили <i>на вопрос 159</i>, что <i>в вашей стране были зафиксированы случаи незаконного трансграничного перемещения</i>, было ли установлено происхождение ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "true.some",
                   "title": "Да, в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q161",
             "section": "Article25",
             "number": "161",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 25 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article26",
       "title": "Статья 26 – Социально-экономические соображения",
       "questions": [
          {
             "key": "Q162",
             "section": "Article26",
             "number": "162",
             "type": "option",
             "title": "Существуют ли в вашей стране какие-либо конкретные подходы или требования, содействующие учету социально-экономических соображений в процессе принятия решений о ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q163",
             "section": "Article26",
             "number": "163",
             "type": "option",
             "title": "В текущий отчетный период принимались ли в расчет в процессе принятия решений социально-экономические соображения, вызванные воздействием ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да, всегда"
                },
                {
                   "value": "true.some",
                   "title": "Только в некоторых случаях"
                },
                {
                   "value": "false",
                   "title": "Нет"
                },
                {
                   "value": "false.na",
                   "title": "Не применимо (решения не принимались)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164",
             "section": "Article26",
             "number": "164",
             "type": "option",
             "title": "Сколько опубликованных материалов, прошедших коллегиальную проверку, было использовано в вашей стране для разработки или определения национальных действий касательно социально-экономических соображений?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Ни одного"
                },
                {
                   "value": "1+",
                   "title": "1 - 4"
                },
                {
                   "value": "5+",
                   "title": "5 - 9"
                },
                {
                   "value": "10+",
                   "title": "10 - 49"
                },
                {
                   "value": "50+",
                   "title": "50 или более"
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
             "title": "Это достаточное количество",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q165",
             "section": "Article26",
             "number": "165",
             "type": "option",
             "title": "Сотрудничала ли ваша страна с другими Сторонами в проведении исследований и обмене информацией по любым социально-экономическим последствиям, связанным с ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q166",
             "section": "Article26",
             "number": "166",
             "type": "lstring",
             "title": "Здесь можно привести дополнительные сведения об осуществлении статьи 26 в вашей стране",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article28",
       "title": "Статья 28 – Механизм финансирования и финансовые ресурсы",
       "questions": [
          {
             "key": "Q167",
             "section": "Article28",
             "number": "167",
             "type": "option",
             "title": "В текущий отчетный период какой объем дополнительного финансирования (в пересчете на доллары США) был мобилизован вашей страной в поддержку осуществления Картахенского протокола, помимо обычных ассигнований из национального бюджета?",
             "multiple": false,
             "options": [
                {
                   "value": "USD0",
                   "title": "Никакой"
                },
                {
                   "value": "USD1-4999",
                   "title": "1 - 4 999 долл. США"
                },
                {
                   "value": "USD5000-49999",
                   "title": "5 000 - 49 999 долл. США"
                },
                {
                   "value": "USD50000-99999",
                   "title": "50 000 - 99 999 долл. США"
                },
                {
                   "value": "USD100000-499000",
                   "title": "100 000 - 499 000 долл. США"
                },
                {
                   "value": "USD500000+",
                   "title": "500 000 долл. США или более"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "Article33",
       "title": "Статья 33 – Мониторинг и отчетность",
       "description": "<i>Согласно требованиям статьи 33 Стороны осуществляют контроль за <u>выполнением своих обязательств</u> по Картахенскому протоколу и докладывают Конференции Сторон, выступающей в качестве Cовещания Сторон Картахенского протокола, о мерах, принятых для осуществления Протокола</i>",
       "questions": [
          {
             "key": "Q168",
             "section": "Article33",
             "number": "168",
             "type": "option",
             "title": "Внедрена ли в вашей стране система мониторинга и/или обеспечения осуществления Картахенского протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "LiabilityRedress",
       "title": "Нагойско - Куала-лумпурский дополнительный протокол об ответственности и возмещении за ущерб",
       "description": "<i>Сторонам Картахенского протокола, которые пока не являются Сторонами Дополнительного протокола, также предлагается ответить на следующие вопросы</i>",
       "questions": [
          {
             "key": "Q169",
             "section": "LiabilityRedress",
             "number": "169",
             "type": "option",
             "title": "Является ли ваша страна Стороной Нагойско - Куала-лумпурского дополнительного протокола об ответственности и возмещении?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Нет</i> на вопрос 169, то существует ли какой-либо национальный процесс, ведущий к тому, чтобы ваша страна стала Стороной данного Дополнительного протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q171",
             "section": "LiabilityRedress",
             "number": "171",
             "type": "term",
             "title": "Приняты ли в вашей стране необходимые национальные меры по осуществлению Дополнительного протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "74B17D51-786F-3D68-3B76-A50121842925",
                   "title": "Национальные меры приняты полностью"
                },
                {
                   "value": "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                   "title": "Национальные меры приняты частично"
                },
                {
                   "value": "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                   "title": "Приняты лишь временные меры"
                },
                {
                   "value": "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                   "title": "Подготовлены только проекты мер"
                },
                {
                   "value": "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                   "title": "Пока не принято никаких мер"
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
             "title": "Какие именно нормативно-правовые документы приняты для осуществления Дополнительного протокола?",
             "multiple": false,
             "options": [
                {
                   "value": "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                   "title": "Один или несколько национальных законов",
                   "type": "lstring"
                },
                {
                   "value": "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                   "title": "Одно или несколько национальных нормативных положений",
                   "type": "lstring"
                },
                {
                   "value": "BA743C79-B202-4611-16C4-2C7D4678ACEB",
                   "title": "Один или несколько наборов руководящих указаний",
                   "type": "lstring"
                },
                {
                   "value": "9067DB5B-E33B-655D-83A3-32D4D562618F",
                   "title": "Документы отсутствуют"
                }
             ]
          },
          {
             "key": "Q173",
             "section": "LiabilityRedress",
             "number": "173",
             "type": "sub-section",
             "title": "Существуют ли в вашей стране административные или правовые документы, требующие принятия мер реагирования в следующих случаях",
             "multiple": false,
             "questions": [
                {
                   "key": "Q173_a",
                   "section": "LiabilityRedress",
                   "number": "a",
                   "type": "option",
                   "title": "Ущерб причинен живыми измененными организмами?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
                   "title": "Есть достаточная вероятность возникновения ущерба, если не будут приняты меры реагирования?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Да"
                      },
                      {
                         "value": "false",
                         "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 173а, то подразумевают ли эти документы наличие требований к оператору (oтметьте все подходящие варианты)?",
             "multiple": true,
             "options": [
                {
                   "value": "true.inform",
                   "title": "Да, оператор должен уведомить компетентный орган об ущербе"
                },
                {
                   "value": "true.evaluate",
                   "title": "Да, оператор должен оценить ущерб"
                },
                {
                   "value": "true.response",
                   "title": "Да, оператор должен принять меры реагирования"
                },
                {
                   "value": "true.other",
                   "title": "Да, другие требования",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q175",
             "section": "LiabilityRedress",
             "number": "175",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 173а, должен ли оператор в соответствии с требованиями этих документов принять меры реагирования, чтобы избежать ущерба?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q176",
             "section": "LiabilityRedress",
             "number": "176",
             "type": "option",
             "title": "Если вы ответили <i>Да</i> на вопрос 173а или 173b, то дается ли в этих документах определение понятию «оператор»?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 176, укажите, кто из приведенного списка может быть «оператором» (выберите все приемлемые варианты):",
             "multiple": true,
             "options": [
                {
                   "value": "8F627A99-7CD4-D892-80EA-12C58607508F",
                   "title": "Владелец разрешения"
                },
                {
                   "value": "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                   "title": "Лицо, разместившее ЖИО на рынке"
                },
                {
                   "value": "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                   "title": "Разработчик"
                },
                {
                   "value": "ADEF00D6-0901-8750-1069-5CBA877011CC",
                   "title": "Производитель"
                },
                {
                   "value": "3F54E971-E791-FE00-5312-F7FF07C818B1",
                   "title": "Уведомитель"
                },
                {
                   "value": "2D8B29DD-0703-6130-BE79-389F5278C21D",
                   "title": "Экспортер"
                },
                {
                   "value": "D475D239-517E-9D8B-E1F9-4C453039C792",
                   "title": "Импортер"
                },
                {
                   "value": "8BD75295-88DF-2A32-A150-1132670E19A9",
                   "title": "Перевозчик"
                },
                {
                   "value": "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                   "title": "Поставщик"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q178",
             "section": "LiabilityRedress",
             "number": "178",
             "type": "option",
             "title": "Определен ли компетентный орган для выполнения функций, указанных в Дополнительном протоколе?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 178, то какие меры может принимать компетентный орган (выберите все применимые варианты)?",
             "multiple": true,
             "options": [
                {
                   "value": "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                   "title": "Выявлять оператора, причинившего ущерб"
                },
                {
                   "value": "6065EDB8-C5A4-BA81-5271-B2F93159A471",
                   "title": "Проводить оценку ущерба"
                },
                {
                   "value": "A038303D-7049-E34F-8381-5B59702BBCF6",
                   "title": "Определять, какие меры реагирования должен принять оператор"
                },
                {
                   "value": "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                   "title": "Осуществлять меры реагирования"
                },
                {
                   "value": "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                   "title": "Взыскивать с оператора издержки и расходы в связи с проведением оценки ущерба и принятием любых мер реагирования"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q180",
             "section": "LiabilityRedress",
             "number": "180",
             "type": "option",
             "title": "Приняты ли в вашей стране меры, предусматривающие финансовые гарантии возмещения ущерба, причиненного ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 180, то какие виды финансовых гарантий предусмотрены (выберите все применимые варианты)?",
             "multiple": true,
             "options": [
                {
                   "value": "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                   "title": "Требование предоставлять подтверждение надежности источников финансирования"
                },
                {
                   "value": "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                   "title": "Обязательное страхование"
                },
                {
                   "value": "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                   "title": "Государственные программы, включая фонды"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Прочее",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q182",
             "section": "LiabilityRedress",
             "number": "182",
             "type": "term",
             "title": "Предусмотрены ли в вашей стране правила и процедуры привлечения к гражданской ответственности за ущерб, причиненный ЖИО, или такой ущерб определяется постановлениями суда (выберите все применимые варианты)?",
             "multiple": true,
             "options": [
                {
                   "value": "878DF5F5-0B5E-48E1-6A42-80867A101675",
                   "title": "Да, нормами гражданской ответственности"
                },
                {
                   "value": "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                   "title": "Да, постановлениями суда"
                },
                {
                   "value": "true",
                   "title": "Да, другими способами",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q183",
             "section": "LiabilityRedress",
             "number": "183",
             "type": "term",
             "title": "Были ли в вашей стране случаи причинения ущерба, вызванного ЖИО?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
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
             "title": "Если вы ответили <i>Да</i> на вопрос 183, укажите, принимались ли меры реагирования.",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Да",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Нет"
                }
             ]
          },
          {
             "key": "Q185",
             "section": "LiabilityRedress",
             "number": "185",
             "type": "lstring",
             "title": "Здесь можно представить дополнительные сведения о любых предпринятых в вашей стране действиях по выполнению положений Нагойско - Куала-лумпурского дополнительного протокола об ответственности и возмещении",
             "multiple": false
          }
       ]
    },
    {
       "key": "AdditionalInformation",
       "title": "Другая информация",
       "questions": [
          {
             "key": "Q186",
             "section": "AdditionalInformation",
             "number": "186",
             "type": "lstring",
             "title": "Используйте это поле для предоставления любой другой информации по вопросам, связанным с национальным осуществлением Картахенского и Дополнительного протоколов, в том числе о возникших препятствиях или затруднениях.",
             "multiple": false
          }
       ]
    },
    {
       "key": "Comments",
       "title": "Замечания по форме отчетности",
       "questions": [
          {
             "key": "Q187",
             "section": "Comments",
             "number": "187",
             "type": "lstring",
             "title": "Используйте это поле для предоставления любой другой информации о трудностях, с которыми вы столкнулись при заполнении настоящей формы отчетности",
             "multiple": false
          }
       ]
    }
 ]
 ;
  return cpbNationalReport4;
});
