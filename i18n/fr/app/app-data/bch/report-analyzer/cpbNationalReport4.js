define(function () {
  'use strict';

  var cpbNationalReport4 = [
    {
       "key": "General",
       "title": "Partie au Protocole de Cartagena sur la prévention des risques biotechnologiques",
       "questions": [
          {
             "key": "Q012_party",
             "section": "General",
             "number": "11",
             "type": "option",
             "title": "Votre pays fait-il parti des membres du Protocole de Cartagena sur la biosécurité ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si votre pays n'est pas Partie au Protocole de Cartagena sur la prévention des risques biotechnologiques, dispose-t-il d’un processus national en vue de le devenir ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q013",
             "section": "General",
             "number": "13",
             "type": "lstring",
             "title": "Vous pouvez fournir de plus amples renseignements dans la case suivante :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article2",
       "title": "Article 2 – Dispositions générales",
       "description": "<i>L'article 2 exige que chaque Partie prenne les mesures juridiques, administratives et autres mesures nécessaires et appropriées pour s'acquitter de ses obligations au titre du Protocole</i>",
       "questions": [
          {
             "key": "Q014",
             "section": "Article2",
             "number": "14",
             "type": "option",
             "title": "Votre pays a-t-il adopté les mesures nationales nécessaires à l’application du Protocole ?",
             "multiple": false,
             "options": [
                {
                   "value": "implementation.fullInPlace",
                   "title": "Des mesures nationales ont été entièrement mises en place"
                },
                {
                   "value": "implementation.partiallyInPlace",
                   "title": "Des mesures nationales ont été partiellement mises en place"
                },
                {
                   "value": "implementation.temporaryMeasures",
                   "title": "Seules des mesures temporaires ont été mises en place"
                },
                {
                   "value": "implementation.draftMeasures",
                   "title": "Il n’y a qu’un projet de mesures"
                },
                {
                   "value": "implementation.none",
                   "title": "Aucune mesure n’a encore été prise"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q015",
             "section": "Article2",
             "number": "15",
             "type": "option",
             "title": "Quels instruments spécifiques sont en place pour l’application des mesures nationales sur la prévention des risques biotechnologiques ? (Cochez toutes les réponses qui s'appliquent)",
             "multiple": true,
             "options": [
                {
                   "value": "instrument.nationalBiosafetyLaws",
                   "title": "Une ou plusieurs lois nationales pour la prévention des risques biotechnologiques"
                },
                {
                   "value": "instrument.nationalBiosafetyRegulations",
                   "title": "Une ou plusieurs réglementations nationales"
                },
                {
                   "value": "instrument.biosafetyGuidelines",
                   "title": "Une ou plusieurs lignes directrices pour la prévention des risques biotechnologiques"
                },
                {
                   "value": "instrument.indirectLaws",
                   "title": "D'autres lois, réglementations ou lignes directrices qui s'appliquent indirectement à la prévention des risques biotechnologiques"
                },
                {
                   "value": "instrument.none",
                   "title": "Aucun instrument n’est en place"
                }
             ]
          },
          {
             "key": "Q016",
             "section": "Article2",
             "number": "16",
             "type": "option",
             "title": "Votre pays a-t-il pris des initiatives pour intégrer la prévention des risques biotechnologiques dans les stratégies et plans d'action nationaux, ou dans d’autres politiques et législations ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                },
                {
                   "value": "false.other",
                   "title": "Autre",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q017",
             "section": "Article2",
             "number": "17",
             "type": "option",
             "title": "Votre pays-a-t-il créé un mécanisme pour l’affectation des fonds budgétaires au fonctionnement de ses mesures adoptées pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q018",
             "section": "Article2",
             "number": "18",
             "type": "option",
             "title": "Votre pays a-t-il des employés affectés de façon permanente à la gestion de fonctions directement liées à la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui </i> à la question 18, combien d’employés permanents sont affectés à des fonctions directement liées à la prévention des risques biotechnologiques ? ",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q020",
             "section": "Article2",
             "number": "20",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 2 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article5",
       "title": "Article 5 - Produits pharmaceutiques",
       "questions": [
          {
             "key": "Q021",
             "section": "Article5",
             "number": "21",
             "type": "option",
             "title": "Votre pays réglemente-t-il les mouvements transfrontières, la manipulation et l'utilisation d'organismes vivants modifiés (OVM) qui sont des produits pharmaceutiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q022",
             "section": "Article5",
             "number": "22",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 5 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article6",
       "title": "Article 6 – Transit et utilisations en milieu confiné",
       "questions": [
          {
             "key": "Q023",
             "section": "Article6",
             "number": "23",
             "type": "option",
             "title": "Votre pays réglemente-t-il le transit des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q024",
             "section": "Article6",
             "number": "24",
             "type": "option",
             "title": "Votre pays réglemente-il les utilisations d’OVM en milieu confiné ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q025",
             "section": "Article6",
             "number": "25",
             "type": "option",
             "title": "Votre pays a-t-il pris une décision à propos de l’importation d’OVM pour une utilisation en milieu confiné ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q026",
             "section": "Article6",
             "number": "26",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 6 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Articles7-10",
       "title": "Articles 7 à 10 : Accord préalable donné en connaissance de cause et  introduction intentionnelle d’OVM dans l’environnement",
       "questions": [
          {
             "key": "Q027",
             "section": "Articles7-10",
             "number": "27",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des obligations juridiques incombant aux exportateurs relevant de sa compétence, d’informer par écrit les autorités nationales compétentes de la Partie importatrice avant le mouvement transfrontière intentionnel d’un OVM visé par la procédure d’accord préalable en connaissance de cause ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q028",
             "section": "Articles7-10",
             "number": "28",
             "type": "option",
             "title": "En tant que Partie exportatrice, votre pays a-t-il mis en place des obligations juridiques concernant l'exactitude des informations contenues dans la notification fournie par l'exportateur ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                },
                {
                   "value": "false.notApplicable",
                   "title": "Sans objet (la Partie n’exporte pas d’OVM à l’heure actuelle)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q029",
             "section": "Articles7-10",
             "number": "29",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, votre pays a-t-il reçu une notification concernant des mouvements transfrontières intentionnels d'OVM destinés à être introduits intentionnellement dans l'environnement ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 29, la (les) notification (s) contenai (en) t-elle (s) des informations complètes (au minimum les informations précisées à l'annexe I du Protocole de Cartagena sur la prévention des risques biotechnologiques) ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q031",
             "section": "Articles7-10",
             "number": "31",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 29, votre pays a-t-il accusé réception de la notification à son auteur dans les quatre-vingt-dix jours suivant sa réception ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q032",
             "section": "Articles7-10",
             "number": "32",
             "type": "sub-section",
             "title": "Si vous avez répondu <i>Oui</i> à la question 29, votre pays a-t-il informé les parties suivantes de sa décision ?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q032_a",
                   "section": "Articles7-10",
                   "number": "a",
                   "type": "option",
                   "title": "L’auteur de la notification",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui, toujours"
                      },
                      {
                         "value": "true.some",
                         "title": "Dans certains cas seulement"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q032_b",
                   "section": "Articles7-10",
                   "number": "b",
                   "type": "option",
                   "title": "Le Centre d'échange pour la prévention des risques biotechnologiques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui, toujours"
                      },
                      {
                         "value": "true.some",
                         "title": "Dans certains cas seulement"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "Au cours de la période couverte par le présent rapport, votre pays a-t-il pris une décision en réponse à la (aux) notification (s) concernant des mouvements transfrontières intentionnels d'OVM destinés à être introduits intentionnellement dans l'environnement ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 33, combien d’OVM votre pays a-t-il approuvés à ce jour aux fins d’importation en vue d’une introduction intentionnelle dans l’environnement ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Si vous avez répondu <i>à la question 34</i> que des <i>OVM ont été approuvés</i>, est-ce que tous ces OVM ont été importés dans votre pays ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q036",
             "section": "Articles7-10",
             "number": "36",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 33, quel pourcentage de décisions de votre pays entre dans les catégories suivantes ? (Cochez toutes les réponses qui s'appliquent)",
             "multiple": true,
             "options": [
                {
                   "value": "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                   "title": "Approbation de l'importation / utilisation d’OVM sans condition",
                   "type": "int"
                },
                {
                   "value": "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                   "title": "Approbation de l'importation / utilisation d’OVM sous conditions",
                   "type": "int"
                },
                {
                   "value": "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                   "title": "Interdiction de l’importation / utilisation d’OVM",
                   "type": "int"
                },
                {
                   "value": "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                   "title": "Demande d'informations supplémentaires pertinentes",
                   "type": "int"
                },
                {
                   "value": "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                   "title": "Informe l’auteur de la notification que le délai de communication de la décision a été prolongé",
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
             "title": "Si vous avez répondu <i>à la question 36</i> que votre pays a pris la décision <i>d’approuver l’importation sous conditions</i> ou <i>d’interdire l’importation</i>, les raisons ont-elles été fournies ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q038",
             "section": "Articles7-10",
             "number": "38",
             "type": "lstring",
             "title": "Vous pouvez fournir ici de plus amples détails sur l’application des articles 7 à 10 dans votre pays, y compris des mesures, en cas d’absence de certitude scientifique, sur les effets défavorables potentiels des OVM aux fins d’introduction intentionnelle dans l’environnement :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article11",
       "title": "Article 11 – Procédure à suivre pour les organismes vivants modifiés destinés à être utilisés directement pour l'alimentation humaine ou animale, ou à être transformés",
       "questions": [
          {
             "key": "Q039",
             "section": "Article11",
             "number": "39",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des lois, règlements ou mesures administratives pour la prise de décision concernant l'utilisation domestique, y compris la mise sur le marché, d'OVM pouvant faire l'objet de mouvements transfrontières et directement destinés à l'alimentation humaine ou animale ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q040",
             "section": "Article11",
             "number": "40",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des obligations juridiques concernant l'exactitude des informations à fournir par le demandeur concernant l'utilisation domestique, y compris la mise sur le marché, d'OVM pouvant faire l'objet de mouvements transfrontières et directement destinés à l'alimentation humaine ou animale ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q041",
             "section": "Article11",
             "number": "41",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, combien de décisions votre pays a-t-il prises <u>concernant l'utilisation domestique</u>, y compris la mise sur le marché, d'OVM pouvant faire l'objet de mouvements transfrontières et directement destinés à l'alimentation humaine ou animale ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q042",
             "section": "Article11",
             "number": "42",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des lois, règlements ou mesures administratives pour la prise de décision concernant l'importation d'OVM destinés à être utilisés directement pour l'alimentation humaine ou animale ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q043",
             "section": "Article11",
             "number": "43",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, combien de décisions votre pays a-t-il prises <u>concernant l'importation</u> d'OVM destinés à être utilisés directement pour l'alimentation humaine ou animale ou pour être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q044",
             "section": "Article11",
             "number": "44",
             "type": "lstring",
             "title": "Vous pouvez fournir ici des précisions sur la mise en œuvre de l'article 11 dans votre pays, y compris des mesures en cas d’absence de certitude scientifique sur les effets négatifs potentiels des OVM pouvant faire l'objet de mouvements transfrontières et directement destinés à l'alimentation humaine ou animale ou à être transformés :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article12",
       "title": "Article 12 – Examen des décisions",
       "questions": [
          {
             "key": "Q045",
             "section": "Article12",
             "number": "45",
             "type": "option",
             "title": "Votre pays a-t-il établi un mécanisme de reconsidération et de modification d’une décision concernant un mouvement transfrontière intentionnel d’OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q046",
             "section": "Article12",
             "number": "46",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, votre pays a-t-il déjà reconsidéré ou modifié une décision concernant un mouvement transfrontière intentionnel d’OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 46, combien de décisions ont été examinées ou modifiées ?",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q048",
             "section": "Article12",
             "number": "48",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 46, l'un des examens a-t-il été déclenché par une demande de la Partie exportatrice ou de l’auteur de la notification ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 48, votre pays a-t-il fourni une réponse dans les quatre-vingt-dix jours exposant les raisons de la décision ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q050",
             "section": "Article12",
             "number": "50",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 46, l'un des réexamens entrepris par votre pays l’a-t-il été en tant que Partie importatrice ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 50, votre pays a-t-il, dans un délai de trente jours, exposé les motifs de la décision et informé :",
             "multiple": false,
             "questions": [
                {
                   "key": "Q051_a",
                   "section": "Article12",
                   "number": "a",
                   "type": "option",
                   "title": "L’auteur de la notification",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui, toujours"
                      },
                      {
                         "value": "true.some",
                         "title": "Dans certains cas seulement"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q051_b",
                   "section": "Article12",
                   "number": "b",
                   "type": "option",
                   "title": "Le Centre d'échange pour la prévention des risques biotechnologiques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui, toujours"
                      },
                      {
                         "value": "true.some",
                         "title": "Dans certains cas seulement"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 12 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article13",
       "title": "Article 13 – Procédure simplifiée",
       "questions": [
          {
             "key": "Q053",
             "section": "Article13",
             "number": "53",
             "type": "option",
             "title": "Votre pays a-t-il créé un mécanisme d’application de la procédure simplifiée concernant les mouvements transfrontières intentionnels d’OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q054",
             "section": "Article13",
             "number": "54",
             "type": "option",
             "title": "Au cours de la période couverte par le rapport, votre pays a-t-il appliqué la procédure simplifiée ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 54, pour combien d'OVM votre pays a-t-il appliqué la procédure simplifiée ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 5"
                },
                {
                   "value": "5+",
                   "title": "5 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q056",
             "section": "Article13",
             "number": "56",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui </i> à la question 54, votre pays a-t-il informé les Parties, par le biais du Centre d'échange pour la prévention des risques biotechnologiques, des cas où la procédure simplifiée a été appliquée ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q057",
             "section": "Article13",
             "number": "57",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 13 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article14",
       "title": "Article 14 – Accords et arrangements bilatéraux, régionaux et multilatéraux",
       "questions": [
          {
             "key": "Q058",
             "section": "Article14",
             "number": "58",
             "type": "option",
             "title": "Combien d'accords bilatéraux, régionaux ou multilatéraux relatifs à la prévention des risques biotechnologiques votre pays a-t-il conclus avec d'autres Parties ou non-Parties ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Si vous avez répondu <i>à la question 58</i>que <i>des accords ou arrangements ont été mis en place</i>, veuillez fournir une brève description de leur portée et de leur objectif :",
             "multiple": false,
             "mandatory": true
          },
          {
             "key": "Q060",
             "section": "Article14",
             "number": "60",
             "type": "lstring",
             "title": "Vous pouvez fournir ici de plus amples détails sur l’application de l’article 14 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article15_16",
       "title": "Articles 15 et 16 – Évaluation des risques et gestion des risques",
       "questions": [
          {
             "key": "Q061",
             "section": "Article15_16",
             "number": "61",
             "type": "option",
             "title": "Le cadre réglementaire national de votre pays exige-t-il que des évaluations des risques des OVM soient effectuées ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 61, à quels OVM l’exigence s'applique-t-elle (cochez toutes les cases pertinentes) ?",
             "multiple": true,
             "options": [
                {
                   "value": "014054D1-2B72-7ABD-E615-D0A374590A95",
                   "title": "Pour les importations d'OVM destinés à être introduits intentionnellement dans l'environnement"
                },
                {
                   "value": "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                   "title": "Pour les importations d'OVM destinés à être utilisés directement pour l'alimentation humaine ou animale, ou à être transformés"
                },
                {
                   "value": "29B97F6B-066E-BE64-0FA3-66060DEE737D",
                   "title": "Pour les décisions concernant l'utilisation domestique, y compris la mise sur le marché, d'OVM susceptibles d'être soumis à des mouvements transfrontières et destinés à être utilisés directement pour l'alimentation humaine ou animale, ou à être transformés"
                },
                {
                   "value": "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                   "title": "Pour les importations d’OVM destinés à une utilisation en milieu confiné"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre",
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
             "title": "Votre pays a-t-il établi un mécanisme pour évaluer les risques avant de prendre des décisions relatives aux OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 63, ce mécanisme comprend-il une procédure permettant d’identifier ou de former les experts qui entreprendront l’évaluation des risques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "legend15_16",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>Renforcement des capacités en matière d'évaluation des risques ou de gestion des risques</i>"
          },
          {
             "key": "Q065",
             "section": "Articles12",
             "number": "65",
             "type": "sub-section",
             "title": "Combien de personnes dans votre pays ont été formées en matière d’évaluation des risques, de gestion des risques et de suivi des OVM ?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q065_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Évaluation des risques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Aucun"
                      },
                      {
                         "value": "1+",
                         "title": "1 à 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 à 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 à 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 ou plus"
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
                   "title": "Ce chiffre est-il suffisant :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ]
                },
                {
                   "key": "Q065_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Gestion des risques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Aucun"
                      },
                      {
                         "value": "1+",
                         "title": "1 à 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 à 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 à 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 ou plus"
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
                   "title": "Ce chiffre est-il suffisant :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ]
                },
                {
                   "key": "Q065_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Évaluer",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "Aucun"
                      },
                      {
                         "value": "1+",
                         "title": "1 à 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 à 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 à 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 ou plus"
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
                   "title": "Ce chiffre est-il suffisant :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "Votre pays a-t-il recours à du matériel de formation et / ou à une assistance technique pour la formation en matière d'évaluation des risques et de gestion des risques présentés par les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 66, votre pays utilise-t-il le \"Manuel sur l'évaluation des risques liés aux OVM\" (élaboré par le Secrétariat de la CDB) pour la formation à l'évaluation des risques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q068",
             "section": "Article15_16",
             "number": "68",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 66, votre pays utilise-t-il les « Directives sur l'évaluation des risques présentés par les OVM » (élaborées par le Forum en ligne et le GSET sur l'évaluation des risques et la gestion des risques) pour la formation à l'évaluation des risques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q069",
             "section": "Article15_16",
             "number": "69",
             "type": "option",
             "title": "Votre pays a-t-il des besoins spécifiques en matière d'orientations sur des aspects spécifiques de l'évaluation des risques présentés par les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q070",
             "section": "Article15_16",
             "number": "70",
             "type": "sub-section",
             "title": "Votre pays a-t-il les capacités nécessaires pour détecter, identifier, évaluer ou effectuer le suivi des OVM ou des caractères particuliers qui peuvent avoir des effets défavorables sur la conservation et l’utilisation durable de la diversité biologique, en tenant compte des risques pour la santé humaine ?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q070_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Détecter :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ]
                },
                {
                   "key": "Q070_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "Identifier :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ]
                },
                {
                   "key": "Q070_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "Évaluer le risque :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
                      }
                   ]
                },
                {
                   "key": "Q070_d",
                   "section": "Article15_16",
                   "number": "d",
                   "type": "option",
                   "title": "Assurer un suivi :",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "<i>Évaluation des risques et gestion des risques</i>"
          },
          {
             "key": "Q071",
             "section": "Article15_16",
             "number": "71",
             "type": "sub-section",
             "title": "Votre pays a-t-il adopté ou utilisé des documents d'orientation pour l'évaluation des risques ou la gestion des risques, ou pour l'analyse des rapports d'évaluation des risques transmis par les auteurs de notifications ?",
             "multiple": false,
             "questions": [
                {
                   "key": "Q071_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "Évaluation des risques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
                   "title": "Gestion des risques",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 71, votre pays utilise-t-il les « Directives sur l'évaluation des risques présentés par les OVM » (développées par le Forum en ligne et le GSET sur l'évaluation des risques et la gestion des risques) pour l'évaluation des risques ou la gestion des risques, ou pour l'analyse des rapports d'évaluation des risques transmis par les auteurs de notifications ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q073",
             "section": "Article15_16",
             "number": "73",
             "type": "option",
             "title": "Votre pays a-t-il adopté des approches communes sur l'évaluation des risques en coordination avec d'autres pays ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q074",
             "section": "Article15_16",
             "number": "74",
             "type": "option",
             "title": "Votre pays a-t-il coopéré avec d'autres Parties à l'identification des OVM ou de caractéristiques spécifiques pouvant avoir des effets défavorables sur la conservation et l'utilisation durable de la diversité biologique ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q075",
             "section": "Article15_16",
             "number": "75",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, votre pays a-t-il jamais réalisé une évaluation des risques présentés par des OVM utilisés, par exemple, en milieu confiné, pour des essais sur le terrain, à des fins commerciales, ou destinés à l'alimentation humaine, animale, ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 75, combien d'évaluations des risques ont-elles été réalisées ?",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 à 99"
                },
                {
                   "value": "100+",
                   "title": "100 ou plus"
                }
             ]
          },
          {
             "key": "Q077",
             "section": "Article15_16",
             "number": "77",
             "type": "term",
             "title": "Si vous avez répondu <i>Oui</i> à la question 75, veuillez indiquer le champ d’application de l'évaluation des risques (cochez toutes les cases pertinentes) :",
             "multiple": true,
             "options": [
                {
                   "value": "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                   "title": "OVM pour utilisation en milieu confiné (conformément à l'article 3)"
                },
                {
                   "value": "D6B59E8A-D82C-4516-917A-A745ACDA5931",
                   "title": "OVM pour introduction intentionnelle dans l'environnement, pour des essais expérimentaux ou sur le terrain"
                },
                {
                   "value": "015737FC-ABC2-460C-A099-06A1B01E649A",
                   "title": "OVM pour introduction intentionnelle dans l'environnement à des fins commerciales"
                },
                {
                   "value": "91BEAF12-ABE1-4294-AD3B-507935894C78",
                   "title": "OVM destinés à être utilisés directement pour l’alimentation humaine"
                },
                {
                   "value": "1D96153B-1625-44E4-AD5E-D26429044B29",
                   "title": "OVM destinés à être utilisés directement pour l’alimentation animale"
                },
                {
                   "value": "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                   "title": "OVM destinés à être transformés"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q078",
             "section": "Article15_16",
             "number": "78",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 75, des évaluations des risques ont-elles été effectuées pour toutes les décisions concernant les OVM destinés à une introduction intentionnelle dans l'environnement ou concernant l'utilisation au niveau national d'OVM destinés à l'alimentation humaine, animale ou à être transformés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q079",
             "section": "Article15_16",
             "number": "79",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des mécanismes, des mesures et des stratégies appropriés pour réglementer et gérer les risques identifiés dans l'évaluation des risques posés par les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q080",
             "section": "Article15_16",
             "number": "80",
             "type": "option",
             "title": "Votre pays a-t-il pris des mesures appropriées pour prévenir les mouvements transfrontières non intentionnels d'OVM, y compris des mesures exigeant qu'une évaluation des risques soit effectuée avant la première mise en circulation d'un OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q081",
             "section": "Article15_16",
             "number": "81",
             "type": "option",
             "title": "Votre pays a-t-il pris des mesures pour veiller à ce que tout organisme vivant modifié, importé ou développé localement, soit soumis à une période d'observation appropriée en rapport avec son cycle de vie ou temps de reproduction avant son utilisation prévue ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q082",
             "section": "Article15_16",
             "number": "82",
             "type": "option",
             "title": "Votre pays a-t-il créé un mécanisme de suivi des effets potentiels des OVM libérés dans l'environnement ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q083",
             "section": "Article15_16",
             "number": "83",
             "type": "option",
             "title": "Votre pays est-il doté de l'infrastructure (par exemple, de laboratoires) pour le suivi ou la gestion des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q084",
             "section": "Article15_16",
             "number": "84",
             "type": "lstring",
             "title": "Vous pouvez fournir ici de plus amples détails sur l’application des articles 15 et 16 dans votre pays:",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article17",
       "title": "Article 17 – Mouvements transfrontières non intentionnels<sup>2</sup> et mesures d’urgence",
       "footnote": "<sup>2</sup> Conformément à la définition opérationnelle adoptée dans la décision CP VIII / 16, un « mouvement transfrontière non intentionnel est un mouvement transfrontière d'un organisme vivant modifié qui a traversé par inadvertance les frontières nationales d'une Partie où l'organisme vivant modifié a été libéré, et les exigences de l'article 17 du Protocole ne s'appliquent à ces mouvements transfrontières que si l'organisme vivant modifié en question est susceptible d'avoir des effets négatifs importants sur la conservation et l'utilisation durable de la diversité biologique, en tenant compte également des risques pour la santé humaine, dans les États touchés ou potentiellement affectés. »",
       "questions": [
          {
             "key": "Q085",
             "section": "Article17",
             "number": "85",
             "type": "option",
             "title": "Votre pays a-t-il pris des mesures pour notifier les États affectés ou susceptibles d'être touchés, le Centre d'échange pour la prévention des risques biotechnologiques et, le cas échéant, les organisations internationales compétentes, dans le cas d’une dissémination relevant de leur juridiction qui entraîne, ou peut entraîner, un mouvement transfrontière non intentionnel",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q086",
             "section": "Article17",
             "number": "86",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, combien de disséminations d'OVM ont-elles eu lieu dans la juridiction de votre pays, ayant conduit, ou pouvant avoir conduit, à un mouvement transfrontière non intentionnel ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Si vous avez répondu <i>à la question 86</i> qu'une <i>dissémination s'est produite</i>, votre pays a-t-il informé les États touchés ou susceptibles d'être touchés, le Centre d'échange pour la prévention des risques biotechnologiques et, le cas échéant, les organisations internationales compétentes ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q088",
             "section": "Article17",
             "number": "88",
             "type": "option",
             "title": "Votre pays a-t-il la capacité de prendre des mesures d'intervention appropriées pour répondre à des mouvements transfrontières non intentionnels ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q089",
             "section": "Article17",
             "number": "89",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, combien de fois votre pays a-t-il pris connaissance d'un mouvement transfrontière non intentionnel sur son territoire ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q090",
             "section": "Article17",
             "number": "90",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 17 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article18",
       "title": "Article 18 – Manipulation, transport, emballage et identification",
       "questions": [
          {
             "key": "Q091",
             "section": "Article18",
             "number": "91",
             "type": "option",
             "title": "Votre pays a-t-il pris les mesures nécessaires pour exiger que les OVM pouvant <i>faire l’objet de mouvements transfrontières</i> soient manipulés, emballés et transportés dans des conditions de sécurité tenant compte des règles et normes internationales pertinentes ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Votre pays a-t-il pris des mesures pour exiger que la documentation accompagnant les organismes vivants modifiés destinés à être utilisés directement pour l'alimentation humaine ou animale, ou à être transformés, indiquent clairement que, <i>les OVM dont <u>l’identité ne peut pas être établie</u></i>, <i>peuvent contenir</i> des organismes vivants modifiés et qu’ils ne sont pas destinés à l’introduction intentionnelle dans l’environnement, et fournissent les coordonnées de la personne à contacter pour tout complément d’information ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Votre pays a-t-il pris les mesures nécessaires pour exiger que les documents accompagnant les organismes vivants modifiés destinés à être utilisés directement pour l'alimentation humaine ou animale, ou à être transformés, indiquent clairement que les <i>OVM dont  <u>l’identité a été établie</u></i>,<i>contiennent</i> des organismes vivants modifiés et qu’ils ne sont pas destinés à l’introduction intentionnelle dans l’environnement, et fournissent les coordonnées de la personne à contacter pour tout complément d’information ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu<i>Oui</i> aux questions 91, 92 et/ou 93, quel type de documentation votre pays exige-t-il?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentation propre aux organismes vivants modifiés"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Information intégrée dans d’autres documents (non propre aux organismes vivants modifiés)"
                },
                {
                   "value": "other",
                   "title": "Autre",
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
             "title": "Votre pays a-t-il pris les mesures nécessaires pour exiger que les documents accompagnant les <i>OVM destinés à un usage confiné</i> indiquent clairement qu’il s’agit <i>d’organismes vivants modifiés</i>, précisent les normes à respecter pour une manipulation, un entreposage, un transport et une utilisation sans danger, et fournissent les coordonnées de la personne à contacter pour tout complément d’information, dont le nom et l’adresse de la personne et de l’institution auxquelles les organismes vivants modifiés sont expédiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 95, quel type de documentation votre pays exige-t-il pour l'identification des OVM destinés à être utilisés en milieu confiné ?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentation propre aux organismes vivants modifiés"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Information intégrée dans d’autres documents (non propre aux organismes vivants modifiés)"
                },
                {
                   "value": "other",
                   "title": "Autre",
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
             "title": "Votre pays a-t-il pris les mesures nécessaires pour exiger que les documents accompagnant des <i>OVM destinés à une introduction intentionnelle dans l’environnement de la Partie importatrice</i> indiquent clairement qu’il s’agit d’ <i>organismes vivants modifiés</i>, précisent leur identité et leurs traits ou caractères pertinents, ainsi que toute règle de sécurité à observer pour la manipulation, l’entreposage, le transport et l’utilisation de ces organismes, fournissent les coordonnées de la personne à contacter pour un complément d’information, et si nécessaire, le nom et l’adresse de l’importateur et l’exportateur, et contiennent une déclaration certifiant que le mouvement est conforme aux dispositions du Protocole applicables à l’exportateur ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 97, quel type de documentation votre pays exige-t-il pour l'identification des OVM destinés à être introduits intentionnellement dans l'environnement ?",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "Documentation propre aux organismes vivants modifiés"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "Information intégrée dans d’autres documents (non propre aux organismes vivants modifiés)"
                },
                {
                   "value": "other",
                   "title": "Autre",
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
             "title": "Votre pays dispose-t-il de directives visant à assurer la manipulation, le transport et l'emballage sans danger des organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q100",
             "section": "Article18",
             "number": "100",
             "type": "option",
             "title": "Votre pays possède-t-il les capacités nécessaires pour respecter les exigences en matière d’identification et de documentation des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q101",
             "section": "Article18",
             "number": "101",
             "type": "option",
             "title": "Dans votre pays, combien de fonctionnaires des douanes ont reçu une formation sur l'identification des organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 à 99"
                },
                {
                   "value": "100+",
                   "title": "100 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q102",
             "section": "Article18",
             "number": "102",
             "type": "option",
             "title": "Votre pays a-t-il mis en place des procédures d'échantillonnage et de détection des organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q103",
             "section": "Article18",
             "number": "103",
             "type": "option",
             "title": "Combien de personnels de laboratoire ont reçu dans votre pays une formation sur la détection des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 à 99"
                },
                {
                   "value": "100+",
                   "title": "100 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q104",
             "section": "Article18",
             "number": "104",
             "type": "option",
             "title": "Votre pays a-t-il un accès fiable à des laboratoires pour la détection des organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q105",
             "section": "Article18",
             "number": "105",
             "type": "option",
             "title": "Dans votre pays, combien de laboratoires sont certifiés pour la détection des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 ou plus"
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
             "title": "Si vous avez répondu <i>à la question 105</i> que <i>des laboratoires certifiés existent dans votre pays</i>, combien d'entre eux s’occupent actuellement de la détection des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q107",
             "section": "Article18",
             "number": "107",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 18 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article19",
       "title": "Article 19 – Autorités nationales compétentes et correspondants nationaux",
       "questions": [
          {
             "key": "Q108",
             "section": "Article19",
             "number": "108",
             "type": "option",
             "title": "Si votre pays a désigné plus d'une autorité nationale compétente, a-t-il établi un mécanisme en vue de coordonner leurs actions avant toute prise de décision sur les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                },
                {
                   "value": "false.noCna",
                   "title": "Sans objet (aucune autorité nationale compétente n'a été désignée)"
                },
                {
                   "value": "false.oneCna",
                   "title": "Sans objet (une seule autorité nationale compétente a été désignée)"
                }
             ]
          },
          {
             "key": "Q109",
             "section": "Article19",
             "number": "109",
             "type": "option",
             "title": "Votre pays a-t-il des capacités institutionnelles adéquates pour permettre aux autorités nationales compétentes de s’acquitter des fonctions administratives exigées en vertu du Protocole de Cartagena sur la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q110",
             "section": "Article19",
             "number": "110",
             "type": "option",
             "title": "Votre pays a-t-il pris des initiatives pour renforcer la collaboration entre les correspondants nationaux, les autorités nationales compétentes et d'autres institutions en matière de prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q111",
             "section": "Article19",
             "number": "111",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 19 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article20",
       "title": "Article 20 – Échange d’informations et Centre d’échange pour la prévention des risques biotechnologiques",
       "questions": [
          {
             "key": "Q112",
             "section": "Article20",
             "number": "112",
             "type": "sub-section",
             "title": "Veuillez fournir un aperçu de l’état des informations fournies par votre pays au Centre d’échange pour la prévention des risques biotechnologiques, en précisant si elles sont disponibles et si elles ont été transmises au Centre d’échange pour la prévention des risques biotechnologiques et ce, pour chacune des catégories suivantes.",
             "questions": [
                {
                   "key": "Q112_a",
                   "section": "Article20",
                   "number": "a",
                   "type": "option",
                   "title": "Toutes les lois, réglementations et directives nationales en vigueur visant l’application du Protocole, ainsi que les informations fournies par les Parties dans le cadre de la procédure d’accord préalable en connaissance de cause (article 20, paragraphe 3 a))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_b",
                   "section": "Article20",
                   "number": "b",
                   "type": "option",
                   "title": "Lois, réglementations et lignes directrices nationales s’appliquant à l’importation d’OVM destinés à être utilisés directement pour l’alimentation humaine ou animale, ou à être transformés (article 11, paragraphe 5)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_c",
                   "section": "Article20",
                   "number": "c",
                   "type": "option",
                   "title": "Tout accord ou arrangement bilatéral, régional ou multilatéral (article 14, paragraphe 2 et article 20, paragraphe 3 b))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_d",
                   "section": "Article20",
                   "number": "d",
                   "type": "option",
                   "title": "Coordonnées des autorités nationales compétentes (article 19, paragraphes 2 et 3) et des correspondants nationaux (article 19 paragraphes 1 et 3), et numéros à composer en cas d’urgence (article 17 paragraphe 3 e))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_e",
                   "section": "Article20",
                   "number": "e",
                   "type": "option",
                   "title": "Décisions d'une Partie concernant le transit des OVM (Article 6, paragraphe 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_f",
                   "section": "Article20",
                   "number": "f",
                   "type": "option",
                   "title": "Décisions d'une Partie concernant l’importation des OVM pour utilisation en milieu confiné (Article 6, paragraphe 2)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_g",
                   "section": "Article20",
                   "number": "g",
                   "type": "option",
                   "title": "Notifications concernant la dissémination dans la juridiction de votre pays qui conduit ou peut conduire à un mouvement transfrontière non intentionnel d'un OVM susceptible d'avoir des effets défavorables importants sur la diversité biologique (article17, paragraphe 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_h",
                   "section": "Article20",
                   "number": "h",
                   "type": "option",
                   "title": "Informations concernant les mouvements transfrontières illicites d'OVM (article 25, paragraphe 3)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_i",
                   "section": "Article20",
                   "number": "i",
                   "type": "option",
                   "title": "Décisions concernant l'importation d'OVM destinés à être introduits intentionnellement dans l'environnement (article 10, paragraphe 3)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_j",
                   "section": "Article20",
                   "number": "j",
                   "type": "option",
                   "title": "Informations sur l’application de la réglementation sur l’utilisation sur le territoire national à des importations particulières d’OVM (article 14, paragraphe 4)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_k",
                   "section": "Article20",
                   "number": "k",
                   "type": "option",
                   "title": "Décisions sur l’utilisation sur le territoire national d’OVM pouvant faire l’objet de mouvements transfrontières et destinés à être utilisés directement pour l’alimentation humaine ou animale, ou à être transformés (article 11, paragraphe 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_l",
                   "section": "Article20",
                   "number": "l",
                   "type": "option",
                   "title": "Décisions sur l’importation d’OVM destinés à être utilisés directement pour l’alimentation humaine ou animale, ou à être transformés, prises en vertu de cadres de réglementation nationaux (article 11, paragraphe 4) ou conformément à l’annexe III du Protocole (article 11, paragraphe 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_m",
                   "section": "Article20",
                   "number": "m",
                   "type": "option",
                   "title": "Déclarations relatives au cadre de travail à utiliser pour les OVM destinés à être utilisés directement pour l’alimentation humaine ou animale, ou à être transformés (article 11, paragraphe 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_n",
                   "section": "Article20",
                   "number": "n",
                   "type": "option",
                   "title": "Reconsidération et modification des décisions relatives aux mouvements transfrontières intentionnels d’OVM (article 12, paragraphe 1)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_o",
                   "section": "Article20",
                   "number": "o",
                   "type": "option",
                   "title": "Les cas où un mouvement transfrontière intentionnel peut avoir lieu au moment même où le mouvement est notifié à la Partie importatrice (article 13, paragraphe 1 a))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_p",
                   "section": "Article20",
                   "number": "p",
                   "type": "option",
                   "title": "OVM faisant l’objet d’une dérogation accordée par toutes les Parties (article 13, paragraphe 1 b))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_q",
                   "section": "Article20",
                   "number": "q",
                   "type": "option",
                   "title": "Résumés de l’évaluation des risques ou études environnementales des OVM issus des processus réglementaires et informations pertinentes sur les produits de ceux-ci (article 20, paragraphe 3 c))",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "Informations disponibles et transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "Informations disponibles, mais non transmises au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "Informations disponibles, mais transmises en partie seulement au Centre d’échange pour la prévention des risques biotechnologiques"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "Information non disponible."
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
             "title": "Veuillez fournir une brève explication si vous avez répondu que l'information est disponible  <i>mais pas dans le Centre d’échange pour la prévention des risques biotechnologiques ou seulement partiellement disponible dans le Centre d’échange pour la prévention des risques biotechnologiques </i> pour tout élément de la question 112 :",
             "multiple": false
          },
          {
             "key": "Q114",
             "section": "Article20",
             "number": "114",
             "type": "option",
             "title": "Votre pays a-t-il établi un mécanisme pour le renforcement des capacités des correspondants nationaux du Centre d’échange pour la prévention des risques biotechnologiques à s’acquitter de leurs fonctions administratives ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q115",
             "section": "Article20",
             "number": "115",
             "type": "option",
             "title": "Votre pays a-t-il établi un mécanisme pour la coordination des efforts du correspondant national du Centre d’échange pour la prévention des risques biotechnologiques, du correspondant national du Protocole de Cartagena et des autorités nationales compétentes afin de mettre les informations à la disposition du Centre d’échange pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q116",
             "section": "Article20",
             "number": "116",
             "type": "option",
             "title": "Votre pays utilise-t-il les informations disponibles auprès du Centre d’échange pour la prévention des risques biotechnologiques pour prendre des décisions relatives aux OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans certains cas"
                },
                {
                   "value": "false",
                   "title": "Non"
                },
                {
                   "value": "false.na",
                   "title": "Sans objet (aucune décision n'a été prise)"
                }
             ]
          },
          {
             "key": "Q117",
             "section": "Article20",
             "number": "117",
             "type": "option",
             "title": "Votre pays a-t-il éprouvé des problèmes d’accès ou d’utilisation du Centre d’échange pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q118",
             "section": "Article20",
             "number": "118",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, combien d'événements liés à la prévention des risques biotechnologiques (séminaires, ateliers, conférences de presse, événements éducatifs, etc.) votre pays a-t-il organisés ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 24"
                },
                {
                   "value": "25+",
                   "title": "25 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q119",
             "section": "Article20",
             "number": "119",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, combien de publications relatives à la prévention des risques biotechnologiques votre pays a-t-il publiées ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 à 99"
                },
                {
                   "value": "100+",
                   "title": "100 ou plus"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q120",
             "section": "Article20",
             "number": "120",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 20 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article21",
       "title": "Article 21 – Informations confidentielles",
       "questions": [
          {
             "key": "Q121",
             "section": "Article21",
             "number": "121",
             "type": "option",
             "title": "Votre pays a-t-il établi des procédures pour protéger les renseignements confidentiels reçus en vertu du Protocole ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q122",
             "section": "Article21",
             "number": "122",
             "type": "option",
             "title": "Votre pays permet-il à l’auteur de la notification de mettre en évidence l’information qu’il faut considérer comme confidentielle ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q123",
             "section": "Article21",
             "number": "123",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 21 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article22",
       "title": "Article 22 – Renforcement des capacités",
       "questions": [
          {
             "key": "Q124",
             "section": "Article22",
             "number": "124",
             "type": "option",
             "title": "Votre pays compte-t-il sur un financement prévisible et fiable pour la création de capacités en vue de mettre en œuvre le Protocole de manière efficace ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q125",
             "section": "Article22",
             "number": "125",
             "type": "option",
             "title": "Votre pays a-t-il reçu un soutien de l’extérieur ou participé à des activités de collaboration avec d’autres Parties pour le développement et/ou le renforcement des ressources humaines et des capacités institutionnelles pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 125, comment ces ressources ont-elles été fournies ? (Cochez toutes les réponses qui s'appliquent)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "Voies bilatérales"
                },
                {
                   "value": "channels.regional",
                   "title": "Voies régionales"
                },
                {
                   "value": "channels.multilateral",
                   "title": "Voies multilatérales"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q127",
             "section": "Article22",
             "number": "127",
             "type": "option",
             "title": "Votre pays a-t-il offert un soutien à d’autres Parties pour le développement et/ou le renforcement des ressources humaines et des capacités institutionnelles pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 127, comment ces ressources ont-elles été fournies ? (Cochez toutes les réponses qui s'appliquent)",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "Voies bilatérales"
                },
                {
                   "value": "channels.regional",
                   "title": "Voies régionales"
                },
                {
                   "value": "channels.multilateral",
                   "title": "Voies multilatérales"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q129",
             "section": "Article22",
             "number": "129",
             "type": "option",
             "title": "Au cours de la période couverte par le rapport, votre pays a-t-il lancé un processus d'accès aux fonds du Fonds pour l’environnement mondial (FEM) pour renforcer les capacités en matière de prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 129, comment décririez-vous le processus ?",
             "multiple": false,
             "options": [
                {
                   "value": "veryEasy",
                   "title": "Très facile"
                },
                {
                   "value": "easy",
                   "title": "Facile"
                },
                {
                   "value": "average",
                   "title": "Ni facile ni difficile"
                },
                {
                   "value": "difficult",
                   "title": "Difficile"
                },
                {
                   "value": "veryDifficult",
                   "title": "Très difficile"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q131",
             "section": "Article22",
             "number": "131",
             "type": "term",
             "title": "Votre pays a-t-il entrepris des activités de création et/ou renforcement des ressources humaines et des capacités institutionnelles pour la prévention des risques biotechnologiques pendant la période visée par ce rapport ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 131, dans quels secteurs parmi les suivants ces activités ont-elles été entreprises (cocher toutes les cases pertinentes) ?",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Capacités institutionnelles et ressources humaines"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Intégration de la prévention des risques biotechnologiques dans la législation, les politiques et les institutions intersectorielles et sectorielles (intégration de la prévention des risques biotechnologiques)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Évaluation des risques et autre expertise scientifique et technique"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Gestion des risques"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Sensibilisation du public, participation et éducation sur la prévention des risques biotechnologiques"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Échange d'informations et gestion des données, y compris participation au Centre d'échange pour la prévention des risques biotechnologiques."
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Collaboration scientifique, technique et institutionnelle aux niveaux infrarégional, régional et international"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Transfert de technologie"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Identification des OVM, y compris leur détection"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Questions socioéconomiques"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Application des exigences en matière de documentation en vertu de l’article 18.2 du Protocole"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Manipulation de renseignements confidentiels "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Mesures pour traiter des mouvements transfrontières non intentionnels et/ou illicites d’OVM"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Recherche scientifique en prévention des risques biotechnologiques liés aux OVM"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Prise en compte des risques pour la santé humaine"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Responsabilité et réparation"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autres :",
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
             "title": "Votre pays a-t-il mené une évaluation des besoins de création de capacités pendant la période visée par ce rapport ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q134",
             "section": "Article22",
             "number": "134",
             "type": "option",
             "title": "Votre pays a-t-il encore des besoins en matière de création de capacités ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 134, quelles activités parmi les suivantes exigent-elles encore une création de capacités (cocher toutes les cases pertinentes) ?",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "Capacités institutionnelles et ressources humaines"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "Intégration de la prévention des risques biotechnologiques dans la législation, les politiques et les institutions intersectorielles et sectorielles (intégration de la prévention des risques biotechnologiques)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "Évaluation des risques et autre expertise scientifique et technique"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "Gestion des risques"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "Sensibilisation du public, participation et éducation sur la prévention des risques biotechnologiques"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "Échange d'informations et gestion des données, y compris participation au Centre d'échange pour la prévention des risques biotechnologiques."
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "Collaboration scientifique, technique et institutionnelle aux niveaux infrarégional, régional et international"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "Transfert de technologie"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "Échantillonnage, détection et identification des OVM"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "Questions socioéconomiques"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "Mise en œuvre des exigences de documentation pour la manipulation, le transport, l'emballage et l'identification"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "Manipulation de renseignements confidentiels "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "Mesures pour traiter des mouvements transfrontières non intentionnels et/ou illicites d’OVM"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "Recherche scientifique en prévention des risques biotechnologiques liés aux OVM"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "Prise en compte des risques pour la santé humaine"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "Responsabilité et réparation"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autres :",
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
             "title": "Votre pays a-t-il développé une stratégie ou un plan d’action pour la création de capacités ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q137",
             "section": "Article22",
             "number": "137",
             "type": "option",
             "title": "Votre pays a-t-il mis en place un mécanisme national opérationnel de coordination des initiatives de création de capacités en matière de prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q138",
             "section": "Article22",
             "number": "138",
             "type": "lstring",
             "title": "Vous pouvez fournir de plus amples détails sur l’application de l’article 22 dans votre pays, y compris votre utilisation du processus d’obtention de fonds du FEM, dans la case suivante :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article23",
       "title": "Article 23 – Sensibilisation et participation du public",
       "questions": [
          {
             "key": "Q139",
             "section": "Article23",
             "number": "139",
             "type": "option",
             "title": "La sensibilisation, l'éducation ou la participation du public à la prévention des risques biotechnologiques sont-elles prises en compte dans la législation ou la politique de votre pays ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q140",
             "section": "Article23",
             "number": "140",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, votre pays a-t-il coopéré avec d'autres États et organismes internationaux en matière de sensibilisation, d'éducation et de participation du public ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q141",
             "section": "Article23",
             "number": "141",
             "type": "option",
             "title": "Votre pays a-t-il établi un mécanisme pour assurer l'accès du public aux informations sur les organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q142",
             "section": "Article23",
             "number": "142",
             "type": "option",
             "title": "Votre pays a-t-il mis en place une stratégie de communication nationale sur la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q143",
             "section": "Article23",
             "number": "143",
             "type": "option",
             "title": "Votre pays a-t-il des programmes de sensibilisation et d'information sur la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q144",
             "section": "Article23",
             "number": "144",
             "type": "option",
             "title": "Votre pays dispose-t-il actuellement d'un site web national sur la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145",
             "section": "Article23",
             "number": "145",
             "type": "option",
             "title": "Combien d'institutions universitaires dans votre pays proposent des cours et programmes de formation en matière de prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q146",
             "section": "Article23",
             "number": "146",
             "type": "option",
             "title": "Combien de matériels pédagogiques ou de modules en ligne sur la prévention des risques biotechnologiques sont-ils disponibles et accessibles au public dans votre pays ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 24"
                },
                {
                   "value": "25+",
                   "title": "25 à 99"
                },
                {
                   "value": "100+",
                   "title": "100 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q147",
             "section": "Article23",
             "number": "147",
             "type": "option",
             "title": "Votre pays a-t-il établi un mécanisme de consultation du public dans le cadre du processus décisionnel relatif aux OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q148",
             "section": "Article23",
             "number": "148",
             "type": "option",
             "title": "Votre pays a-t-il informé le public sur les modalités existantes pour la participation du public dans le processus de prise de décisions relatives aux organismes vivants modifiés ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 148, veuillez indiquer les modalités utilisées pour informer le public : (Cochez toutes les réponses qui s'appliquent)",
             "multiple": true,
             "options": [
                {
                   "value": "4E205CD9-9958-497F-A760-F8321771AB3A",
                   "title": "Sites Web nationaux :"
                },
                {
                   "value": "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                   "title": "Journaux"
                },
                {
                   "value": "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                   "title": "Forums :"
                },
                {
                   "value": "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                   "title": "Listes de diffusion :"
                },
                {
                   "value": "51792A07-B3C0-4F7B-830E-0741635F57BB",
                   "title": "Audiences publiques :"
                },
                {
                   "value": "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                   "title": "Médias sociaux :"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre :",
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
             "title": "Combien de fois votre pays a-t-il consulté le public lors de la prise de décisions concernant les OVM pendant la période visée par ce rapport ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucune (décisions prises sans consultation)"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 ou plus"
                },
                {
                   "value": "na",
                   "title": "Sans objet (aucune décision n'a été prise)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q151",
             "section": "Article23",
             "number": "151",
             "type": "option",
             "title": "Votre pays a-t-il informé le public des moyens d'accéder au Centre d'échange pour la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q152",
             "section": "Article23",
             "number": "152",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 23 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article24",
       "title": "Article 24 – Non-Parties",
       "questions": [
          {
             "key": "Q153",
             "section": "Article24",
             "number": "153",
             "type": "option",
             "title": "Votre pays a-t-il conclu un accord bilatéral, régional ou multilatéral avec des non-Parties concernant des mouvements transfrontières d’OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q154",
             "section": "Article24",
             "number": "154",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, votre pays a-t-il importé des OVM provenant d'un pays non-Partie ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Au cours de la période couverte par ce rapport, votre pays a-t-il exporté des OVM à un pays non-Partie ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 154 et/ou à la question 155, les mouvements transfrontières d’OVM ont-ils respecté l’objectif du Protocole de Cartagena sur la prévention des risques biotechnologiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q157",
             "section": "Article24",
             "number": "157",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 24 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article25",
       "title": "Article 25 – Mouvements transfrontières illicites<sup>3</sup>",
       "footnote": "<sup>3</sup>Conformément à la définition opérationnelle adoptée dans la décision CP VIII / 16, « les mouvements transfrontières illégaux sont des mouvements transfrontières d'organismes vivants modifiés qui contreviennent aux mesures nationales d'application du Protocole adoptées par la Partie concernée ».",
       "questions": [
          {
             "key": "Q158",
             "section": "Article25",
             "number": "158",
             "type": "option",
             "title": "Votre pays a-t-il adopté des mesures nationales visant à prévenir et/ou à réprimer les mouvements transfrontières d’OVM contrevenant aux mesures nationales qu’il a prises pour appliquer le Protocole de Cartagena ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans une certaine mesure",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q159",
             "section": "Article25",
             "number": "159",
             "type": "option",
             "title": "Au cours de la période couverte par le présent rapport, de combien de cas de mouvements transfrontières illicites d'OVM votre pays a-t-il pris connaissance ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 ou plus"
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
             "title": "Si vous avez indiqué <i>à la question 159</i> que <i>votre pays a eu connaissance de cas de mouvements transfrontières illégaux</i>, l'origine du ou des OVM a-t-elle été établie ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "true.some",
                   "title": "Oui, dans certains cas"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q161",
             "section": "Article25",
             "number": "161",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 25 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article26",
       "title": "Article 26 – Considérations socioéconomiques",
       "questions": [
          {
             "key": "Q162",
             "section": "Article26",
             "number": "162",
             "type": "option",
             "title": "Votre pays dispose-t-il d’approches ou d’exigences spécifiques qui facilitent la manière dont les considérations socioéconomiques doivent être prises en compte au moment de prendre des décisions sur les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q163",
             "section": "Article26",
             "number": "163",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, des questions socioéconomiques découlant de l'impact des OVM ont-elles été prises en compte dans la prise de décision ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui, toujours"
                },
                {
                   "value": "true.some",
                   "title": "Dans certains cas seulement"
                },
                {
                   "value": "false",
                   "title": "Non"
                },
                {
                   "value": "false.na",
                   "title": "Sans objet (aucune décision n'a été prise)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164",
             "section": "Article26",
             "number": "164",
             "type": "option",
             "title": "Combien de publications évaluées par des pairs votre pays a-t-il utilisé aux fins de l'élaboration ou de la détermination des actions nationales en lien avec des considérations socioéconomiques ?",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "Aucun"
                },
                {
                   "value": "1+",
                   "title": "1 à 4"
                },
                {
                   "value": "5+",
                   "title": "5 à 9"
                },
                {
                   "value": "10+",
                   "title": "10 à 49"
                },
                {
                   "value": "50+",
                   "title": "50 ou plus"
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
             "title": "Ce chiffre est-il suffisant :",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q165",
             "section": "Article26",
             "number": "165",
             "type": "option",
             "title": "Votre pays a-t-il collaboré avec d’autres Parties à la recherche et à l’échange d’informations sur une ou plusieurs incidences socioéconomiques des OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q166",
             "section": "Article26",
             "number": "166",
             "type": "lstring",
             "title": "Vous pouvez fournir ici plus de détails sur l'application de l'article 26 dans votre pays :",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article28",
       "title": "Article 28 – Mécanismes de financement et ressources financières",
       "questions": [
          {
             "key": "Q167",
             "section": "Article28",
             "number": "167",
             "type": "option",
             "title": "Au cours de la période couverte par ce rapport, quel montant de financement (en dollars américains) votre pays a-t-il mobilisé pour appuyer la mise en œuvre du Protocole de Cartagena sur la prévention des risques biotechnologiques, au-delà de l'enveloppe budgétaire nationale habituelle ?",
             "multiple": false,
             "options": [
                {
                   "value": "USD0",
                   "title": "Rien"
                },
                {
                   "value": "USD1-4999",
                   "title": "1 à 4 999 dollars US"
                },
                {
                   "value": "USD5000-49999",
                   "title": "5 000 à 49 999 dollars US"
                },
                {
                   "value": "USD50000-99999",
                   "title": "50 000 à 99 999 dollars US"
                },
                {
                   "value": "USD100000-499000",
                   "title": "100 000 à 499 000 dollars US"
                },
                {
                   "value": "USD500000+",
                   "title": "500 000 dollars US"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "Article33",
       "title": "Article 33 – Suivi et établissement de rapports",
       "description": "<i>L'Article 33 demande aux Parties de surveiller <u>la mise en œuvre de leurs obligations</u> au titre du Protocole de Cartagena et de faire un rapport à la Conférence des Parties siégeant en tant que réunion des Parties au Protocole de Cartagena sur les mesures prises pour mettre en œuvre le Protocole</i>",
       "questions": [
          {
             "key": "Q168",
             "section": "Article33",
             "number": "168",
             "type": "option",
             "title": "Votre pays a-t-il mis en place un système de suivi et d'application de la mise en œuvre du Protocole de Cartagena ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "LiabilityRedress",
       "title": "Protocole additionnel de Nagoya – Kuala Lumpur sur la responsabilité et la réparation",
       "description": "<i>Les Parties au Protocole de Cartagena qui ne sont pas encore Parties au Protocole additionnel sont invitées comme les autres à répondre aux questions ci-dessous</i>",
       "questions": [
          {
             "key": "Q169",
             "section": "LiabilityRedress",
             "number": "169",
             "type": "option",
             "title": "Votre pays a-t-il signé le Protocole additionnel de Nagoya-Kuala Lumpur sur la responsabilité et la réparation ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Non</i> à la question 169, existe-il un processus national en vue de devenir une Partie au Protocole additionnel ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q171",
             "section": "LiabilityRedress",
             "number": "171",
             "type": "term",
             "title": "Votre pays a-t-il mis en place les mesures nécessaires à l'application du Protocole additionnel ?",
             "multiple": false,
             "options": [
                {
                   "value": "74B17D51-786F-3D68-3B76-A50121842925",
                   "title": "Des mesures nationales ont été entièrement mises en place"
                },
                {
                   "value": "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                   "title": "Des mesures nationales ont été partiellement mises en place"
                },
                {
                   "value": "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                   "title": "Seules des mesures temporaires ont été mises en place"
                },
                {
                   "value": "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                   "title": "Il n’y a qu’un projet de mesures"
                },
                {
                   "value": "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                   "title": "Aucune mesure n’a encore été prise"
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
             "title": "Quelles mesures sont en place pour l’application du Protocole additionnel ?",
             "multiple": false,
             "options": [
                {
                   "value": "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                   "title": "Une ou plusieurs lois nationales",
                   "type": "lstring"
                },
                {
                   "value": "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                   "title": "Une ou plusieurs réglementations nationales",
                   "type": "lstring"
                },
                {
                   "value": "BA743C79-B202-4611-16C4-2C7D4678ACEB",
                   "title": "Une ou plusieurs directives",
                   "type": "lstring"
                },
                {
                   "value": "9067DB5B-E33B-655D-83A3-32D4D562618F",
                   "title": "Aucun instrument n’est en place"
                }
             ]
          },
          {
             "key": "Q173",
             "section": "LiabilityRedress",
             "number": "173",
             "type": "sub-section",
             "title": "Votre pays dispose-t-il d'instruments administratifs ou juridiques demandant que soient prises des mesures d’intervention :",
             "multiple": false,
             "questions": [
                {
                   "key": "Q173_a",
                   "section": "LiabilityRedress",
                   "number": "a",
                   "type": "option",
                   "title": "En cas de dommages résultant d'OVM ?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
                   "title": "Au cas où il y aurait une probabilité suffisante que des dommages surviennent si des mesures d'intervention ne sont pas prises ?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "Oui"
                      },
                      {
                         "value": "false",
                         "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 173a, est-ce que ces instruments imposent des exigences à un opérateur (cochez toutes les réponses qui s'appliquent) ?",
             "multiple": true,
             "options": [
                {
                   "value": "true.inform",
                   "title": "Oui, l'opérateur doit informer l'autorité compétente des dommages"
                },
                {
                   "value": "true.evaluate",
                   "title": "Oui, l’opérateur doit évaluer les dommages"
                },
                {
                   "value": "true.response",
                   "title": "Oui, l’opérateur doit prendre des mesures d'intervention"
                },
                {
                   "value": "true.other",
                   "title": "Oui, d’autres exigences :",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q175",
             "section": "LiabilityRedress",
             "number": "175",
             "type": "option",
             "title": "Si vous avez répondu <i>Oui</i> à la question 173a, ces instruments exigent-ils que l'opérateur prenne des mesures d’intervention pour éviter les dommages ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q176",
             "section": "LiabilityRedress",
             "number": "176",
             "type": "option",
             "title": "Si vous avez répondu  <i>Oui</i> à la question 173a ou 173b, ces instruments fournissent-ils une définition de « l’opérateur » ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu  <i>Oui</i> à la question 176, quels sont ceux parmi la liste suivante pouvant être un « opérateur » (cochez toutes les réponses qui s'appliquent) ?",
             "multiple": true,
             "options": [
                {
                   "value": "8F627A99-7CD4-D892-80EA-12C58607508F",
                   "title": "Le titulaire du permis"
                },
                {
                   "value": "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                   "title": "La personne qui a mis l’OVM sur le marché"
                },
                {
                   "value": "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                   "title": "Le développeur"
                },
                {
                   "value": "ADEF00D6-0901-8750-1069-5CBA877011CC",
                   "title": "Le producteur"
                },
                {
                   "value": "3F54E971-E791-FE00-5312-F7FF07C818B1",
                   "title": "L’auteur de la notification"
                },
                {
                   "value": "2D8B29DD-0703-6130-BE79-389F5278C21D",
                   "title": "L’exportateur"
                },
                {
                   "value": "D475D239-517E-9D8B-E1F9-4C453039C792",
                   "title": "L’importateur"
                },
                {
                   "value": "8BD75295-88DF-2A32-A150-1132670E19A9",
                   "title": "Le transporteur"
                },
                {
                   "value": "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                   "title": "Le fournisseur"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q178",
             "section": "LiabilityRedress",
             "number": "178",
             "type": "option",
             "title": "Une autorité compétente a-t-elle été identifiée pour exercer les fonctions définies dans le Protocole additionnel ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 178, quelles mesures l'autorité compétente peut-elle prendre (sélectionnez toutes celles qui s'appliquent) ?",
             "multiple": true,
             "options": [
                {
                   "value": "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                   "title": "Identifier l’opérateur ayant provoqué le dommage"
                },
                {
                   "value": "6065EDB8-C5A4-BA81-5271-B2F93159A471",
                   "title": "Évaluer les dommages"
                },
                {
                   "value": "A038303D-7049-E34F-8381-5B59702BBCF6",
                   "title": "Déterminer les mesures d’intervention devant être prises par l’opérateur"
                },
                {
                   "value": "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                   "title": "Mettre en place des mesures d’intervention"
                },
                {
                   "value": "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                   "title": "Faire rembourser à l'opérateur les coûts et les dépenses de l'évaluation des dommages et de la mise en œuvre des mesures d'intervention"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q180",
             "section": "LiabilityRedress",
             "number": "180",
             "type": "option",
             "title": "Votre pays a-t-il pris des mesures pour assurer une sécurité financière pour des dommages causés par les OVM ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 180, quels types de mesures de sécurité financière sont-elles en place (cochez toutes les réponses qui s'appliquent) ?",
             "multiple": true,
             "options": [
                {
                   "value": "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                   "title": "Obligation de fournir des preuves d’une source de financement sûre"
                },
                {
                   "value": "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                   "title": "Une assurance obligatoire"
                },
                {
                   "value": "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                   "title": "Des régimes publics, incluant des fonds"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "Autre",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q182",
             "section": "LiabilityRedress",
             "number": "182",
             "type": "term",
             "title": "Votre pays possède-t-il des règles et des procédures en matière de responsabilité civile couvrant les dommages résultant d'OVM, ou est-ce que de tels dommages ont été reconnus dans des décisions de justice (cochez toutes les réponses qui s'appliquent) ?",
             "multiple": true,
             "options": [
                {
                   "value": "878DF5F5-0B5E-48E1-6A42-80867A101675",
                   "title": "Oui, dans un instrument de responsabilité civile"
                },
                {
                   "value": "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                   "title": "Oui, dans des décisions de justice"
                },
                {
                   "value": "true",
                   "title": "Oui, dans d’autres instruments :",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q183",
             "section": "LiabilityRedress",
             "number": "183",
             "type": "term",
             "title": "Y a-t-il eu des cas de dommages résultant d'OVM dans votre pays ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
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
             "title": "Si vous avez répondu <i>Oui</i> à la question 183, des mesures d’intervention ont-elles été prises ?",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "Oui",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "Non"
                }
             ]
          },
          {
             "key": "Q185",
             "section": "LiabilityRedress",
             "number": "185",
             "type": "lstring",
             "title": "Vous pouvez fournir ici de plus amples détails sur toutes les activités menées dans votre pays pour la mise en œuvre du Protocole additionnel de Nagoya-Kuala Lumpur sur la responsabilité et la réparation :",
             "multiple": false
          }
       ]
    },
    {
       "key": "AdditionalInformation",
       "title": "Autres informations",
       "questions": [
          {
             "key": "Q186",
             "section": "AdditionalInformation",
             "number": "186",
             "type": "lstring",
             "title": "Vous pouvez fournir ici de plus amples informations sur les questions relatives à la mise en œuvre du Protocole de Cartagena et du Protocole additionnel à l’échelle nationale, y compris les obstacles et les difficultés rencontrés.",
             "multiple": false
          }
       ]
    },
    {
       "key": "Comments",
       "title": "Commentaires sur le modèle de rapport",
       "questions": [
          {
             "key": "Q187",
             "section": "Comments",
             "number": "187",
             "type": "lstring",
             "title": "Vous pouvez fournir ici tout autre renseignement sur les difficultés que vous avez éprouvées à remplir ce rapport.",
             "multiple": false
          }
       ]
    }
 ];
  return cpbNationalReport4;
});