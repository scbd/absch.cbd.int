import nr5T from '~/app-text/views/forms/edit/bch/edit-national-report-5.json';

export const cpbNationalReport5 = [
   {
               "key":"Article2",
               "title": nr5T.article2_title,
               "questions":[
                  {
                     "key":"Q007",
                     "section":"Article2",
                     "number":"7",
                     "type":"option",
                     "title": nr5T.article2_question7_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"implementation.fullInPlace",
                           "title": nr5T.article2_question7_options0_title
                        },
                        {
                           "value":"implementation.partiallyInPlace",
                           "title": nr5T.article2_question7_options1_title
                        },
                        {
                           "value":"implementation.temporaryMeasures",
                           "title": nr5T.article2_question7_options2_title
                        },
                        {
                           "value":"implementation.draftMeasures",
                           "title": nr5T.article2_question7_options3_title
                        },
                        {
                           "value":"implementation.none",
                           "title": nr5T.article2_question7_options4_title
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q008",
                     "section":"Article2",
                     "number":"8",
                     "type":"option",
                     "title": nr5T.article2_question8_title,
                     "multiple":true,
                     "options":[
                        {
                           "value":"instrument.nationalBiosafetyLaws",
                           "title": nr5T.article2_question8_options0_title
                        },
                        {
                           "value":"instrument.nationalBiosafetyRegulations",
                           "title": nr5T.article2_question8_options1_title
                        },
                        {
                           "value":"instrument.biosafetyGuidelines",
                           "title": nr5T.article2_question8_options2_title
                        },
                        {
                           "value":"instrument.indirectLaws",
                           "title": nr5T.article2_question8_options3_title
                        },
                        {
                           "value":"instrument.none",
                           "title": nr5T.article2_question8_options4_title
                        },
                        
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q08_a",
                     "section":"Article2",
                     "number":"",
                     "type":"lstring",
                     "title": nr5T.article2_questions8_a_title,
                     "multiple":false
                  },
                  {
                     "key":"Q009",
                     "section":"Article2",
                     "number":"9",
                     "type":"option",
                     "title": nr5T.article2_question9_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yes
                        },
                        {
                           "value":"true.some",
                           "title": nr5T.yesToSomeExtent,
                           "type":"lstring"
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ],
                     "mandatory":true
                  },

                  {
                     "key":"Q010",
                     "section":"Article2",
                     "number":"10",
                     "type":"option",
                     "title": nr5T.article2_question10_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yes
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ],
                     "validations":[
                        {
                           "question":"Q010_adq",
                           "type":"@hasValues",
                           "trigger":"visible"
                        }
                     ],
                     "mandatory": true
                  },
                  {
                     "key": "Q010_adq",
                     "section": "Article2",
                     "number": "",
                     "type": "option",
                     "title": nr5T.article2_question10_question0_title,
                     "multiple": false,
                     "options": [
                        {
                           "value": "true",
                           "title": nr5T.yes
                        },
                        {
                           "value": "false",
                           "title": nr5T.no
                        }
                     ]
                  },
   
                  {
                     "key": "Q011",
                     "section": "Article2",
                     "number": "11",
                     "type": "option",
                     "title": nr5T.article2_question11_title,
                     "multiple": false,
                     "options": [
                        {
                           "value": "true",
                           "title": nr5T.yes
                        },
                        {
                           "value": "false",
                           "title": nr5T.no
                        }
                     ],
                     "mandatory":true,
                     "validations":[
                        {
                           "question":"Q012",
                           "type":"@hasValues",
                           "values":[
                              "true"
                           ],
                           "trigger":"visible"
                        }
                     ]
                  },
                  
                  {
                     "key":"Q012",
                     "section":"Article2",
                     "number":"12",
                     "type":"option",
                     "title": nr5T.article2_question12_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"1+",
                           "title": nr5T.oneToFour
                        },
                        {
                           "value":"5+",
                           "title": nr5T.fiveToNine
                        },
                        {
                           "value":"10+",
                           "title": nr5T.tenOrMore
                        }
                     ],
                     "validations":[
                        {
                           "question":"Q012_adq",
                           "type":"@hasValues",
                           "trigger":"visible"
                        }
                     ]
                  },
                  {
                     "key":"Q012_adq",
                     "section":"Article2",
                     "number":"",
                     "type":"option",
                     "title": nr5T.isThisNumberAdequate,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yes
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ]
                  },
   
                  {
                     "key":"Q013",
                     "section":"Article2",
                     "number":"13",
                     "type":"lstring",
                     "title": nr5T.article2_question13_title,
                     "multiple":false
                  }
                  
               ]
   }
]