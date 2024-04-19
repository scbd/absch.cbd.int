import nr5Translation from '../../../app-text/views/forms/edit/bch/edit-national-report-5.json' assert { type: "json" };;
import { mergeTranslationKeys } from '../../../services/translation-merge.js';
const nr5T = mergeTranslationKeys(nr5Translation);
export const cpbNationalReport5 = [
   {
            "key":"Article2",
            "title": nr5T.article2_title,
            "description": nr5T.article2_description,
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
                        "title": nr5T.article2_question7_options4_title,
                        "exclusive":true
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
                        "title": nr5T.article2_question8_options4_title,
                        "exclusive":true
                     },
                     
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q008_a",
                  "section":"Article2",
                  "number":"",
                  "type":"lstring",
                  "title": nr5T.informationOnInstruments,
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
                        "values":[
                           "true"
                        ],
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
                        "trigger":"enable"
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
                  "mandatory": true,
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
                  "mandatory": true,
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
   },
   {
            "key":"Article5",
            "title": nr5T.article5_title,
            "questions":[
               {
                  "key":"Q014",
                  "section":"Article5",
                  "number":"14",
                  "type":"option",
                  "title": nr5T.article5_question14_title,
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
                  "key":"Q015",
                  "section":"Article5",
                  "number":"15",
                  "type":"lstring",
                  "title": nr5T.article5_question15_title,
                  "multiple":false
               }

            ]
   },
   {
            "key":"Article6",
            "title": nr5T.article6_title,
            "questions":[
               {
                  "key":"Q016",
                  "section":"Article6",
                  "number":"16",
                  "type":"option",
                  "title": nr5T.article6_question16_title,
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
                  "key":"Q017",
                  "section":"Article6",
                  "number":"17",
                  "type":"option",
                  "title": nr5T.article6_question17_title,
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
                  "key":"Q018",
                  "section":"Article6",
                  "number":"18",
                  "type":"option",
                  "title": nr5T.article6_question18_title,
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
                  "mandatory":true
               },
               {
                  "key":"Q019",
                  "section":"Article6",
                  "number":"19",
                  "type":"lstring",
                  "title": nr5T.article6_question19_title,
                  "multiple":false
               }
            ]
   },
   {
            "key":"Articles7-10",
            "title": nr5T.articles7_10_title,
            "questions":[
               {
                  "key":"Q020",
                  "section":"Articles7-10",
                  "number":"20",
                  "type":"option",
                  "title": nr5T.articles7_10_question20_title,
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
                  "key":"Q021",
                  "section":"Articles7-10",
                  "number":"21",
                  "type":"option",
                  "title": nr5T.articles7_10_question21_title,
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
                  "key":"Q022",
                  "section":"Articles7-10",
                  "number":"22",
                  "type":"option",
                  "title": nr5T.articles7_10_question22_title,
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
                  "mandatory":true,
                  "validations":[
                     {
                        "question":"Q023",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     },
                     {
                        "question":"Q024",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     },
                     {
                        "baseQuestion":"Q025",
                        "question":"Q025_a",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     },
                     {
                        "baseQuestion":"Q025",
                        "question":"Q025_b",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     },
                  ]
               },
               {
                  "key":"Q023",
                  "section":"Articles7-10",
                  "number":"23",
                  "type":"option",
                  "title": nr5T.articles7_10_question23_title,
                  "multiple":false,
                  "mandatory": true,
                  "options":[
                     {
                        "value":"true",
                        "title": nr5T.yesAlways
                     },
                     {
                        "value":"true.some",
                        "title": nr5T.inSomeCasesOnly,
                     },
                     {
                        "value":"false",
                        "title": nr5T.no
                     }
                  ]
               },
               {
                  "key":"Q024",
                  "section":"Articles7-10",
                  "number":"24",
                  "type":"option",
                  "title": nr5T.articles7_10_question24_title,
                  "multiple":false,
                  "mandatory": true,
                  "options":[
                     {
                        "value":"true",
                        "title": nr5T.yesAlways
                     },
                     {
                        "value":"true.some",
                        "title": nr5T.inSomeCasesOnly,
                     },
                     {
                        "value":"false",
                        "title": nr5T.no
                     }
                  ]
               },
               {
                  "key":"Q025",
                  "section":"Articles7-10",
                  "number":"25",
                  "type":"sub-section",
                  "title": nr5T.articles7_10_question25_title,
                  "multiple":false,
                  "questions":[
                     {
                        "key":"Q025_a",
                        "section":"Articles7-10",
                        "number":"a",
                        "type":"option",
                        "title": nr5T.articles7_10_question25_question0_title,
                        "multiple":false,
                        "mandatory": true,
                        "options":[
                           {
                              "value":"true",
                              "title": nr5T.yesAlways
                           },
                           {
                              "value":"true.some",
                              "title": nr5T.inSomeCasesOnly
                           },
                           {
                              "value":"false",
                              "title": nr5T.no
                           }
                        ]
                     },
                     {
                        "key":"Q025_b",
                        "section":"Articles7-10",
                        "number":"b",
                        "type":"option",
                        "title": nr5T.articles7_10_question25_question1_title,
                        "multiple":false,
                        "mandatory": true,
                        "options":[
                           {
                              "value":"true",
                              "title": nr5T.yesAlways
                           },
                           {
                              "value":"true.some",
                              "title": nr5T.inSomeCasesOnly
                           },
                           {
                              "value":"false",
                              "title": nr5T.no
                           }
                        ]
                     }
                  ]
               },
               {
                  "key":"Q026",
                  "section":"Articles7-10",
                  "number":"26",
                  "type":"option",
                  "title": nr5T.articles7_10_question26_title,
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
                  "mandatory":true,
                  "validations":[
                     {
                        "question":"Q026_adq",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"visible"
                     },
                     {
                        "question":"Q027",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     },
                     {
                        "question":"Q028",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"enable"
                     }
                  ]
               },
               {
                  "key":"Q026_adq",
                  "section":"Article2",
                  "number":"",
                  "type":"int",
                  "mandatory":true,
                  "title": nr5T.articles7_10_question26_question0_title,
                  "multiple":false,
                  "mandatory": true
               },
               {
                  "key":"Q027",
                  "section":"Articles7-10",
                  "number":"27",
                  "type":"option",
                  "title": nr5T.articles7_10_question27_title,
                  "multiple":true,
                  "options":[
                     {
                        "value":"3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                        "title": nr5T.articles7_10_question27_question0_title,
                        "type":"int"
                     },
                     {
                        "value":"3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                        "title": nr5T.articles7_10_question27_question1_title,
                        "type":"int"
                     },
                     {
                        "value":"6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                        "title": nr5T.articles7_10_question27_question2_title,
                        "type":"int"
                     },
                     {
                        "value":"8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                        "title": nr5T.articles7_10_question27_question3_title,
                        "type":"int"
                     },
                     {
                        "value":"19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                        "title": nr5T.articles7_10_question27_question4_title,
                        "type":"int"
                     }
                  ],
                  "validations":[
                     {
                        "question":"Q027_a",
                        "values":[
                           "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F"
                        ],
                        "type":"@hasValues",
                        "trigger":"enable"
                     },
                     {
                        "question":"Q027_b",
                        "values":[
                           "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"
                        ],
                        "type":"@hasValues",
                        "trigger":"enable"
                     }
                  ],
                  "customValuePlaceholder":"%"
               },

               {
                  "key":"Q027_a",
                  "section":"Articles7-10",
                  "number":"",
                  "type":"option",
                  "title": nr5T.articles7_10_question27_question1_question0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr5T.yesAlways
                     },
                     {
                        "value":"true.some",
                        "title": nr5T.inSomeCasesOnly,
                     },
                     {
                        "value":"false",
                        "title": nr5T.no
                     }
                  ]
               },
               {
                  "key":"Q027_b",
                  "section":"Articles7-10",
                  "number":"",
                  "type":"option",
                  "title": nr5T.articles7_10_question27_question2_question0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr5T.yes
                     },
                     {
                        "value":"true.some",
                        "title": nr5T.inSomeCasesOnly,
                     },
                     {
                        "value":"false",
                        "title": nr5T.no
                     }
                  ]
               },

               {
                  "key":"Q028",
                  "section":"Articles7-10",
                  "number":"28",
                  "type":"option",
                  "title": nr5T.articles7_10_question28_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr5T.none
                     },
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
                  ]
               },
               {
                  "key":"Q029",
                  "section":"Articles7-10",
                  "number":"29",
                  "type":"option",
                  "title": nr5T.articles7_10_question29_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr5T.yesAlways
                     },
                     {
                        "value":"true.some",
                        "title": nr5T.inSomeCasesOnly
                     },
                     {
                        "value":"false",
                        "title": nr5T.no
                     }
                  ]
               },
               {
                  "key":"Q030",
                  "section":"Article2",
                  "number":"30",
                  "type":"lstring",
                  "title": nr5T.articles7_10_question30_title,
                  "multiple":false
               }
            ]
      },
      {
            "key":"Article11",
            "title": nr5T.article11_title,
            "questions":[
               {
                  "key":"Q031",
                  "section":"Article11",
                  "number":"31",
                  "type":"option",
                  "title": nr5T.article11_question31_title,
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
                  "key":"Q032",
                  "section":"Article11",
                  "number":"32",
                  "type":"option",
                  "title": nr5T.article11_question32_title,
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
                  "key":"Q033",
                  "section":"Article11",
                  "number":"33",
                  "type":"option",
                  "title": nr5T.article11_question33_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr5T.none
                     },
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
                  "mandatory":true
               },
               {
                  "key":"Q034",
                  "section":"Article11",
                  "number":"34",
                  "type":"option",
                  "title": nr5T.article11_question34_title,
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
                  "key":"Q035",
                  "section":"Article11",
                  "number":"35",
                  "type":"option",
                  "title": nr5T.article11_question35_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr5T.none
                     },
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
                  "mandatory":true
               },
               {
                  "key":"Q036",
                  "section":"Article11",
                  "number":"36",
                  "type":"lstring",
                  "title": nr5T.article11_question36_title,
                  "multiple":false
               }
            ]
      },
      {
         "key":"Article12",
         "title": nr5T.article12_title,
         "questions":[
            {
               "key":"Q037",
               "section":"Article12",
               "number":"37",
               "type":"option",
               "title": nr5T.article12_question37_title,
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
               "key":"Q038",
               "section":"Article12",
               "number":"38",
               "type":"option",
               "title": nr5T.article12_question38_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q039",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  },
                  {
                     "question":"Q040",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  },
                  {
                     "question":"Q042",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q039",
               "section":"Article12",
               "number":"39",
               "type":"option",
               "title": nr5T.article12_question39_title,
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
               ]
            },
            {
               "key":"Q040",
               "section":"Article12",
               "number":"40",
               "type":"option",
               "title": nr5T.article12_question40_title,
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
                     "question":"Q041",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q041",
               "section":"Article12",
               "number":"41",
               "type":"option",
               "title": nr5T.article12_question41_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly,
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q042",
               "section":"Article12",
               "number":"42",
               "type":"option",
               "title": nr5T.article12_question42_title,
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
                     "question":"Q043",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q043",
               "section":"Article12",
               "number":"43",
               "type":"sub-section",
               "title": nr5T.article12_question43_title,
               "multiple":false,
               "questions":[
                  {
                     "key":"Q043_a",
                     "section":"Article12",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article12_question43_question0_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yesAlways
                        },
                        {
                           "value":"true.some",
                           "title": nr5T.inSomeCasesOnly
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ]
                  },
                  {
                     "key":"Q043_b",
                     "section":"Article12",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article12_question43_question1_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yesAlways
                        },
                        {
                           "value":"true.some",
                           "title": nr5T.inSomeCasesOnly
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ]
                  }
               ]
            },
            {
               "key":"Q044",
               "section":"Article12",
               "number":"44",
               "type":"lstring",
               "title": nr5T.article12_question44_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article13",
         "title": nr5T.article13_title,
         "questions":[
            {
               "key":"Q045",
               "section":"Article13",
               "number":"45",
               "type":"option",
               "title": nr5T.article13_question45_title,
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
               "key":"Q046",
               "section":"Article13",
               "number":"46",
               "type":"option",
               "title": nr5T.article13_question46_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q047",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  },
                  {
                     "question":"Q048",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q047",
               "section":"Article13",
               "number":"47",
               "type":"option",
               "title": nr5T.article13_question47_title,
               "multiple":false,
               "options":[
                  {
                     "value":"1+",
                     "title": nr5T.oneToFive
                  },
                  {
                     "value":"5+",
                     "title": nr5T.fiveOrMore
                  }
               ]
            },
            {
               "key":"Q048",
               "section":"Article13",
               "number":"48",
               "type":"option",
               "title": nr5T.article13_question48_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly,
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q049",
               "section":"Article13",
               "number":"49",
               "type":"lstring",
               "title": nr5T.article13_question49_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article14",
         "title": nr5T.article14_title,
         "questions":[
            {
               "key":"Q050",
               "section":"Article14",
               "number":"50",
               "type":"option",
               "title": nr5T.article14_question50_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q051",
                     "values":[
                        "0"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"enable"
                  }
               ],
            },
            {
               "key":"Q051",
               "section":"Article14",
               "number":"51",
               "type":"lstring",
               "title": nr5T.article14_question51_title,
               "multiple":false
            },
            {
               "key":"Q052",
               "section":"Article14",
               "number":"52",
               "type":"lstring",
               "title": nr5T.article14_question52_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Articles15-16",
         "title": nr5T.articles15_16_title,
         "questions":[
            {
               "key":"Q053",
               "section":"Articles15-16",
               "number":"53",
               "type":"option",
               "title": nr5T.articles15_16_question53_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q053_a",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q053_a",
               "section":"Articles15-16",
               "number":"",
               "type":"option",
               "title": nr5T.articles15_16_question53_a_title,
               "multiple":true,
               "mandatory":true,
               "options":[
                  {
                     "value":"014054D1-2B72-7ABD-E615-D0A374590A95",
                     "title": nr5T.articles15_16_question53_a_option0_title
                  },
                  {
                     "value":"94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                     "title": nr5T.articles15_16_question53_a_option1_title
                  },
                  {
                     "value":"29B97F6B-066E-BE64-0FA3-66060DEE737D",
                     "title": nr5T.articles15_16_question53_a_option2_title
                  },
                  {
                     "value":"2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                     "title": nr5T.articles15_16_question53_a_option3_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q054",
               "section":"Articles15-16",
               "number":"54",
               "type":"option",
               "title": nr5T.articles15_16_question54_title,
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
               "key":"legend55-68",
               "section":"Articles15-16",
               "number":"",
               "type":"legend",
               "title": nr5T.articles15_16_legend_55_68
            },
            {
               "key":"Q055",
               "section":"Articles15-16",
               "number":"55",
               "type":"option",
               "title": nr5T.articles15_16_question55_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q056",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  },
                  {
                     "question":"Q057",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  },
                  {
                     "question":"Q058",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  },
                  {
                     "question":"Q059",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q056",
               "section":"Articles15-16",
               "number":"56",
               "type":"option",
               "title": nr5T.articles15_16_question56_title,
               "multiple":false,
               "options":[
                  {
                     "value":"1+",
                     "title": nr5T.oneToNine
                  },
                  {
                     "value":"10+",
                     "title": nr5T.tenTenFortyNine
                  },
                  {
                     "value":"50+",
                     "title": nr5T.fiftyToNinetyNine
                  },
                  {
                     "value":"100+",
                     "title": nr5T.hundredOrMore
                  }
               ]
            },
            {
               "key":"Q057",
               "section":"Articles15-16",
               "number":"57",
               "type":"term",
               "title": nr5T.articles15_16_question57_title,
               "multiple":true,
               "options":[
                  {
                     "value":"42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                     "title": nr5T.articles15_16_question57_option0_title
                  },
                  {
                     "value":"D6B59E8A-D82C-4516-917A-A745ACDA5931",
                     "title": nr5T.articles15_16_question57_option1_title
                  },
                  {
                     "value":"015737FC-ABC2-460C-A099-06A1B01E649A",
                     "title": nr5T.articles15_16_question57_option2_title
                  },
                  {
                     "value":"91BEAF12-ABE1-4294-AD3B-507935894C78",
                     "title": nr5T.articles15_16_question57_option3_title
                  },
                  {
                     "value":"1D96153B-1625-44E4-AD5E-D26429044B29",
                     "title": nr5T.articles15_16_question57_option4_title
                  },
                  {
                     "value":"6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                     "title": nr5T.articles15_16_question57_option5_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q058",
               "section":"Articles15-16",
               "number":"58",
               "type":"option",
               "title": nr5T.articles15_16_question58_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q059",
               "section":"Articles15-16",
               "number":"59",
               "type":"sub-section",
               "title": nr5T.articles15_16_question59_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q059_a",
                     "section":"Articles15-16",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.articles15_16_question59_a_title,
                     "multiple":false,
                     "mandatory": true,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yesInAllCases
                        },
                        {
                           "value":"true.some",
                           "title": nr5T.inSomeCases
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ]
                  },
                  {
                     "key":"Q059_b",
                     "section":"Articles15-16",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.articles15_16_question59_b_title,
                     "multiple":false,
                     "mandatory": true,
                     "options":[
                        {
                           "value":"true",
                           "title": nr5T.yesInAllCases
                        },
                        {
                           "value":"true.some",
                           "title": nr5T.inSomeCases
                        },
                        {
                           "value":"false",
                           "title": nr5T.no
                        }
                     ],
                     "validations":[
                        {
                           "question":"Q060",
                           "values":[
                              "false"
                           ],
                           "type":"@hasValuesExcept",
                           "trigger":"enable"
                        }
                     ]
                  }
               ]
            },
            {
               "key":"Q060",
               "section":"Articles15-16",
               "number":"60",
               "type":"option",
               "title": nr5T.articles15_16_question60_title,
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
               "key":"Q061",
               "section":"Articles15-16",
               "number":"61",
               "type":"option",
               "title": nr5T.articles15_16_question61_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.yesToSomeExtent
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q062",
               "section":"Articles15-16",
               "number":"62",
               "type":"option",
               "title": nr5T.articles15_16_question62_title,
               "multiple":false,
               "footnote": nr5T.articles15_16_question62_footnote_1,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.yesToSomeExtent
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q063",
               "section":"Articles15-16",
               "number":"63",
               "type":"option",
               "title": nr5T.articles15_16_question63_title,
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
               "key":"Q064",
               "section":"Articles15-16",
               "number":"64",
               "type":"option",
               "title": nr5T.articles15_16_question64_title,
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
               "key":"Q065",
               "section":"Articles15-16",
               "number":"65",
               "type":"option",
               "title": nr5T.articles15_16_question65_title,
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
               "mandatory":true
            },
            {
               "key":"Q066",
               "section":"Articles15-16",
               "number":"66",
               "type":"sub-section",
               "title": nr5T.articles15_16_question66_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q066_a",
                     "section":"Articles15-16",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.riskAssessment,
                     "multiple":false,
                     "mandatory": true,
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
                           "question":"Q067",
                           "type":"&is66_aOr66_b",
                           "trigger":"enable"
                        }
                     ]
                  },
                  {
                     "key":"Q066_b",
                     "section":"Articles15-16",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.riskManagement,
                     "multiple":false,
                     "mandatory": true,
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
                           "question":"Q067",
                           "type":"&is66_aOr66_b",
                           "trigger":"enable"
                        }
                     ]
                  }
               ]
            },
            {
               "key":"Q067",
               "section":"Articles15-16",
               "number":"67",
               "type":"option",
               "title": nr5T.articles15_16_question67_title,
               "multiple":false,
               "footnote": nr5T.articles15_16_question67_footnote_2,
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
               "key":"Q068",
               "section":"Articles15-16",
               "number":"68",
               "type":"option",
               "title": nr5T.articles15_16_question68_title,
               "multiple":false,
               "mandatory":true,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"legend69-72",
               "section":"Articles15-16",
               "number":"",
               "type":"legend",
               "title": nr5T.articles15_16_legend_69_72
            },
            {
               "key":"Q069",
               "section":"Articles15-16",
               "number":"69",
               "type":"sub-section",
               "title": nr5T.articles15_16_question69_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q069_a",
                     "section":"Articles15-16",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.articles15_16_question69_a_title,
                     "multiple":false,
                     "mandatory":true,
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
                     "key":"Q069_b",
                     "section":"Articles15-16",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.articles15_16_question69_b_title,
                     "multiple":false,
                     "mandatory":true,
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
                     "key":"Q069_c",
                     "section":"Articles15-16",
                     "number":"c",
                     "type":"option",
                     "title": nr5T.articles15_16_question69_c_title,
                     "multiple":false,
                     "mandatory":true,
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
                     "key":"Q069_d",
                     "section":"Articles15-16",
                     "number":"d",
                     "type":"option",
                     "title": nr5T.articles15_16_question69_d_title,
                     "multiple":false,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q070",
               "section":"Articles15-16",
               "number":"70",
               "type":"sub-section",
               "title": nr5T.articles15_16_question70_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q070_a",
                     "section":"Articles15-16",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.riskAssessment,
                     "multiple":false,
                     "mandatory":true,
                     "options":[
                        {
                           "value":"0",
                           "title": nr5T.none
                        },
                        {
                           "value":"1+",
                           "title": nr5T.oneToNine
                        },
                        {
                           "value":"10+",
                           "title": nr5T.tenTenFortyNine
                        },
                        {
                           "value":"50+",
                           "title": nr5T.fiftyToNinetyNine
                        },
                        {
                           "value":"100+",
                           "title": nr5T.hundredOrMore
                        }
                     ],
                     "validations":[
                        {
                           "baseQuestion":"Q070",
                           "question":"Q070_a_adq",
                           "values":[
                              "0"
                           ],
                           "type":"@hasValuesExcept",
                           "trigger":"visible"
                        }
                     ]
                  },
                  {
                     "key":"Q070_a_adq",
                     "section":"Articles15-16",
                     "number":"",
                     "type":"option",
                     "title": nr5T.isThisNumberAdequate,
                     "multiple":false,
                     "mandatory": true,
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
                     "key":"Q070_b",
                     "section":"Articles15-16",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.riskManagement,
                     "multiple":false,
                     "mandatory":true,
                     "options":[
                        {
                           "value":"0",
                           "title": nr5T.none
                        },
                        {
                           "value":"1+",
                           "title": nr5T.oneToNine
                        },
                        {
                           "value":"10+",
                           "title": nr5T.tenTenFortyNine
                        },
                        {
                           "value":"50+",
                           "title": nr5T.fiftyToNinetyNine
                        },
                        {
                           "value":"100+",
                           "title": nr5T.hundredOrMore
                        }
                     ],
                     "validations":[
                        {
                           "baseQuestion":"Q070",
                           "question":"Q070_b_adq",
                           "values":[
                              "0"
                           ],
                           "type":"@hasValuesExcept",
                           "trigger":"visible"
                        }
                     ]
                  },
                  {
                     "key":"Q070_b_adq",
                     "section":"Articles15-16",
                     "number":"",
                     "type":"option",
                     "title": nr5T.isThisNumberAdequate,
                     "multiple":false,
                     "mandatory": true,
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
                     "key":"Q070_c",
                     "section":"Articles15-16",
                     "number":"c",
                     "type":"option",
                     "title": nr5T.monitoring,
                     "multiple":false,
                     "mandatory":true,
                     "options":[
                        {
                           "value":"0",
                           "title": nr5T.none
                        },
                        {
                           "value":"1+",
                           "title": nr5T.oneToNine
                        },
                        {
                           "value":"10+",
                           "title": nr5T.tenTenFortyNine
                        },
                        {
                           "value":"50+",
                           "title": nr5T.fiftyToNinetyNine
                        },
                        {
                           "value":"100+",
                           "title": nr5T.hundredOrMore
                        }
                     ],
                     "validations":[
                        {
                           "baseQuestion":"Q070",
                           "question":"Q070_c_adq",
                           "values":[
                              "0"
                           ],
                           "type":"@hasValuesExcept",
                           "trigger":"visible"
                        }
                     ]
                  },
                  {
                     "key":"Q070_c_adq",
                     "section":"Articles15-16",
                     "number":"",
                     "type":"option",
                     "title": nr5T.isThisNumberAdequate,
                     "multiple":false,
                     "mandatory": true,
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
                  }
               ]
            },

            {
               "key":"Q071",
               "section":"Articles15-16",
               "number":"71",
               "type":"option",
               "title": nr5T.articles15_16_question71_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q071_a",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q071_a",
               "section":"Articles15-16",
               "number":"",
               "type":"option",
               "title": nr5T.articles15_16_question71_question0_title,
               "multiple":true,
               "mandatory":true,
               "footnote": nr5T.articles15_16_question71_footnote_3+'<br>'+nr5T.articles15_16_question71_footnote_4,
               "footnotePosition": 'bottom',
               "options":[
                  {
                     "value":"505AA0C7-CBB7-4961-9956-83588F6C1C20",
                     "title": nr5T.articles15_16_question71_question0_option0_title
                  },
                  {
                     "value":"D331F2BB-0664-4878-ACF6-D716B1CD1EDC",
                     "title": nr5T.articles15_16_question71_question0_option1_title
                  },
                  {
                     "value":"A971DAA9-2DB7-4BBD-8867-F310EC820914",
                     "title": nr5T.articles15_16_question71_question0_option2_title,
                     "type":"lstring"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q072",
               "section":"Articles15-16",
               "number":"72",
               "type":"lstring",
               "title": nr5T.articles15_16_question72_title,
               "multiple":false
            }

         ]
      },
      {
         "key":"Article17",
         "title": nr5T.article17_title,
         "footnote": nr5T.article17__footnote_5,
         "questions":[
            {
               "key":"Q073",
               "section":"Article17",
               "number":"73",
               "type":"option",
               "title": nr5T.article17_question73_title,
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
               "key":"Q074",
               "section":"Article17",
               "number":"74",
               "type":"option",
               "title": nr5T.article17_question74_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
                     "question":"Q075",
                     "values":[
                        "0"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"enable"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q075",
               "section":"Article17",
               "number":"75",
               "type":"option",
               "title": nr5T.article17_question75_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q076",
               "section":"Article17",
               "number":"76",
               "type":"option",
               "title": nr5T.article17_question76_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
               "mandatory":true
            },
            {
               "key":"Q077",
               "section":"Article17",
               "number":"77",
               "type":"option",
               "title": nr5T.article17_question77_title,
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
               "mandatory":true
            },
            {
               "key":"Q078",
               "section":"Article17",
               "number":"78",
               "type":"lstring",
               "title": nr5T.article17_question78_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article18",
         "title": nr5T.article18_title,
         "questions":[
            {
               "key":"Q079",
               "section":"Article18",
               "number":"79",
               "type":"option",
               "title": nr5T.article18_question79_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q082",
                     "type":"&is79Or80Or81",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q080",
               "section":"Article18",
               "number":"80",
               "type":"option",
               "title": nr5T.article18_question80_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q082",
                     "type":"&is79Or80Or81",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q081",
               "section":"Article18",
               "number":"81",
               "type":"option",
               "title": nr5T.article18_question81_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q082",
                     "type":"&is79Or80Or81",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q082",
               "section":"Article18",
               "number":"82",
               "type":"option",
               "title": nr5T.article18_question82_title,
               "multiple":false,
               "options":[
                  {
                     "value":"lmoSpecific",
                     "title": nr5T.documentationSpecificToLMOs
                  },
                  {
                     "value":"nonLmoSpecific",
                     "title": nr5T.asPartOfOtherDocumentation
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q083",
               "section":"Article18",
               "number":"83",
               "type":"option",
               "title": nr5T.article18_question83_title,
               "multiple":false,
               "mandatory":true,
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
               "validations":[
                  {
                     "question":"Q084",
                     "values":[
                        "true",
                        "true.some"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q084",
               "section":"Article18",
               "number":"84",
               "type":"option",
               "title": nr5T.article18_question84_title,
               "multiple":false,
               "options":[
                  {
                     "value":"lmoSpecific",
                     "title": nr5T.documentationSpecificToLMOs
                  },
                  {
                     "value":"nonLmoSpecific",
                     "title": nr5T.asPartOfOtherDocumentation
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q085",
               "section":"Article18",
               "number":"85",
               "type":"option",
               "title": nr5T.article18_question85_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q086",
                     "values":[
                        "false"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q086",
               "section":"Article18",
               "number":"86",
               "type":"option",
               "title": nr5T.article18_question86_title,
               "multiple":false,
               "mandatory": true,
               "options":[
                  {
                     "value":"lmoSpecific",
                     "title": nr5T.documentationSpecificToLMOs
                  },
                  {
                     "value":"nonLmoSpecific",
                     "title": nr5T.asPartOfOtherDocumentation
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q087",
               "section":"Article18",
               "number":"87",
               "type":"option",
               "title": nr5T.article18_question87_title,
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
               "key":"Q088",
               "section":"Article18",
               "number":"88",
               "type":"option",
               "title": nr5T.article18_question88_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
                  {
                     "value":"1+",
                     "title": nr5T.oneToNine
                  },
                  {
                     "value":"10+",
                     "title": nr5T.tenTenFortyNine
                  },
                  {
                     "value":"50+",
                     "title": nr5T.fiftyToNinetyNine
                  },
                  {
                     "value":"100+",
                     "title": nr5T.hundredOrMore
                  }
               ],
               "validations":[
                  {
                     "question":"Q088_adq",
                     "values":[
                        "0"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"visible"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q088_adq",
               "section":"Article18",
               "number":"",
               "type":"option",
               "title": nr5T.isThisNumberAdequate,
               "multiple":false,
               "mandatory": true,
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
               "key":"Q089",
               "section":"Article18",
               "number":"89",
               "type":"option",
               "title": nr5T.article18_question89_title,
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
               "key":"Q090",
               "section":"Article18",
               "number":"90",
               "type":"sub-section",
               "title": nr5T.article18_question90_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q090_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question90_a_title,
                     "mandatory":true,
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
                     "key":"Q090_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question90_b_title,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q091",
               "section":"Article18",
               "number":"91",
               "type":"sub-section",
               "title": nr5T.article18_question91_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q091_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question91_a_title,
                     "multiple":false,
                     "mandatory":true,
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
                     "key":"Q091_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question91_b_title,
                     "multiple":false,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q092",
               "section":"Article18",
               "number":"92",
               "type":"sub-section",
               "title": nr5T.article18_question92_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q092_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question92_a_title,
                     "mandatory":true,
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
                     "key":"Q092_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question92_b_title,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q093",
               "section":"Article18",
               "number":"93",
               "type":"option",
               "title": nr5T.article18_question93_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
                  {
                     "value":"1+",
                     "title": nr5T.oneToNine
                  },
                  {
                     "value":"10+",
                     "title": nr5T.tenTenFortyNine
                  },
                  {
                     "value":"50+",
                     "title": nr5T.fiftyToNinetyNine
                  },
                  {
                     "value":"100+",
                     "title": nr5T.hundredOrMore
                  }
               ],
               "validations":[
                  {
                     "question":"Q093_adq",
                     "values":[
                        "0"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"visible"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q093_adq",
               "section":"Article18",
               "number":"",
               "type":"option",
               "title": nr5T.isThisNumberAdequate,
               "multiple":false,
               "mandatory": true,
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
               "key":"Q094",
               "section":"Article18",
               "number":"94",
               "type":"sub-section",
               "title": nr5T.article18_question94_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q094_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question94_a_title,
                     "mandatory":true,
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
                     "key":"Q094_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question94_b_title,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q095",
               "section":"Article18",
               "number":"95",
               "type":"option",
               "title": nr5T.article18_question95_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
                     "title": nr5T.tenTenFortyNine
                  },
                  {
                     "value":"50+",
                     "title": nr5T.fiftyOrMore
                  }
               ],
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q096",
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q096",
               "section":"Article18",
               "number":"96",
               "type":"option",
               "title": nr5T.article18_question96_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
                     "title": nr5T.tenTenFortyNine
                  },
                  {
                     "value":"50+",
                     "title": nr5T.fiftyOrMore
                  }
               ]
            },
            {
               "key":"Q097",
               "section":"Article18",
               "number":"97",
               "type":"lstring",
               "title": nr5T.article18_question97_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article19",
         "title": nr5T.article19_title,
         "questions":[
            {
               "key":"Q098",
               "section":"Article19",
               "number":"98",
               "type":"option",
               "title": nr5T.article19_question98_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  },
                  {
                     "value":"false.noCna",
                     "title": nr5T.article19_question98_option0_title
                  },
                  {
                     "value":"false.oneCna",
                     "title": nr5T.article19_question98_option1_title
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q099",
               "section":"Article19",
               "number":"99",
               "type":"option",
               "title": nr5T.article19_question99_title,
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
               "key":"Q100",
               "section":"Article19",
               "number":"100",
               "type":"option",
               "title": nr5T.article19_question100_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
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
               "key":"Q101",
               "section":"Article19",
               "number":"101",
               "type":"lstring",
               "title": nr5T.article19_question101_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article20",
         "title": nr5T.article20_title,
         "questions":[
            {
               "key":"Q102",
               "section":"Article20",
               "number":"102",
               "type":"sub-section",
               "title": nr5T.article20_question102_title,
               "footnote": nr5T.article20_question102_footnote_6,
               "questions":[
                  {
                     "key":"Q102_a",
                     "section":"Article20",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article20_question102_a_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_b",
                     "section":"Article20",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article20_question102_b_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_c",
                     "section":"Article20",
                     "number":"c",
                     "type":"option",
                     "title": nr5T.article20_question102_c_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_d",
                     "section":"Article20",
                     "number":"d",
                     "type":"option",
                     "title": nr5T.article20_question102_d_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_e",
                     "section":"Article20",
                     "number":"e",
                     "type":"option",
                     "title": nr5T.article20_question102_e_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_f",
                     "section":"Article20",
                     "number":"f",
                     "type":"option",
                     "title": nr5T.article20_question102_f_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_g",
                     "section":"Article20",
                     "number":"g",
                     "type":"option",
                     "title": nr5T.article20_question102_g_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_h",
                     "section":"Article20",
                     "number":"h",
                     "type":"option",
                     "title": nr5T.article20_question102_h_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_i",
                     "section":"Article20",
                     "number":"i",
                     "type":"option",
                     "title": nr5T.article20_question102_i_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_j",
                     "section":"Article20",
                     "number":"j",
                     "type":"option",
                     "title": nr5T.article20_question102_j_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_k",
                     "section":"Article20",
                     "number":"k",
                     "type":"option",
                     "title": nr5T.article20_question102_k_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_l",
                     "section":"Article20",
                     "number":"l",
                     "type":"option",
                     "title": nr5T.article20_question102_l_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_m",
                     "section":"Article20",
                     "number":"m",
                     "type":"option",
                     "title": nr5T.article20_question102_m_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_n",
                     "section":"Article20",
                     "number":"n",
                     "type":"option",
                     "title": nr5T.article20_question102_n_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_o",
                     "section":"Article20",
                     "number":"o",
                     "type":"option",
                     "title": nr5T.article20_question102_o_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_p",
                     "section":"Article20",
                     "number":"p",
                     "type":"option",
                     "title": nr5T.article20_question102_p_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  },
                  {
                     "key":"Q102_q",
                     "section":"Article20",
                     "number":"q",
                     "type":"option",
                     "title": nr5T.article20_question102_q_title,
                     "multiple":false,
                     "options":[
                        {
                           "value":"true.availableOnBch",
                           "title": nr5T.availableOnBch
                        },
                        {
                           "value":"true.availablePartialyOnBch",
                           "title": nr5T.availablePartialyOnBch
                        },
                        {
                           "value":"true.availableNotOnBch",
                           "title": nr5T.availableNotOnBch
                        },
                        {
                           "value":"false.notAvailable",
                           "title": nr5T.notAvailable
                        }
                     ],
                     "mandatory":true
                  }
               ]
            },
            {
               "key":"Q103",
               "section":"Article20",
               "number":"103",
               "type":"lstring",
               "title": nr5T.article20_question103_title,
               "multiple":false
            },
            {
               "key":"Q104",
               "section":"Article20",
               "number":"104",
               "type":"option",
               "title": nr5T.article20_question104_title,
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
               "key":"Q105",
               "section":"Article20",
               "number":"105",
               "type":"option",
               "title": nr5T.article20_question105_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.yesInSomeCases,
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  },
                  {
                     "value":"false.na",
                     "title": nr5T.notApplicable
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q106",
               "section":"Article20",
               "number":"106",
               "type":"option",
               "title": nr5T.article20_question106_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
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
               "key":"Q107",
               "section":"Article20",
               "number":"107",
               "type":"option",
               "title": nr5T.article20_question107_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring",
                     "caption": nr5T.provideWebsiteAddress
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q108",
               "section":"Article20",
               "number":"108",
               "type":"lstring",
               "title": nr5T.article20_question108_title,
               "multiple":false,
            },
         ]
      },
      {
         "key":"Article21",
         "title": nr5T.article21_title,
         "questions":[
            {
               "key":"Q109",
               "section":"Article21",
               "number":"109",
               "type":"option",
               "title": nr5T.article21_question109_title,
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
               "key":"Q110",
               "section":"Article21",
               "number":"110",
               "type":"option",
               "title": nr5T.article21_question110_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q111",
               "section":"Article21",
               "number":"111",
               "type":"lstring",
               "title": nr5T.article21_question111_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article22",
         "title": nr5T.article22_title,
         "questions":[
            {
               "key":"Q112",
               "section":"Article22",
               "number":"112",
               "type":"option",
               "title": nr5T.article22_question112_title,
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
               ]
            },
            {
               "key":"Q113",
               "section":"Article22",
               "number":"113",
               "type":"option",
               "title": nr5T.article22_question113_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q114",
                     "values":[
                        "true",
                        "true.some"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q114",
               "section":"Article22",
               "number":"114",
               "type":"option",
               "title": nr5T.article22_question114_title,
               "multiple":true,
               "options":[
                  {
                     "value":"channels.bilateral",
                     "title": nr5T.bilateral
                  },
                  {
                     "value":"channels.regional",
                     "title": nr5T.regional
                  },
                  {
                     "value":"channels.multilateral",
                     "title": nr5T.multilateral
                  }
               ]
            },
            {
               "key":"Q115",
               "section":"Article22",
               "number":"115",
               "type":"option",
               "title": nr5T.article22_question115_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q116",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q116",
               "section":"Article22",
               "number":"116",
               "type":"option",
               "title": nr5T.article22_question116_title,
               "multiple":true,
               "options":[
                  {
                     "value":"channels.bilateral",
                     "title": nr5T.bilateral
                  },
                  {
                     "value":"channels.regional",
                     "title": nr5T.regional
                  },
                  {
                     "value":"channels.multilateral",
                     "title": nr5T.multilateral
                  }
               ]
            },
            {
               "key":"Q117",
               "section":"Article22",
               "number":"117",
               "type":"option",
               "title": nr5T.article22_question117_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  },
                  {
                     "value":"false.na",
                     "title": nr5T.notApplicableOnly
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q118",
               "section":"Article22",
               "number":"118",
               "type":"option",
               "title": nr5T.article22_question118_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q119",
                     "values":[
                        "true.some",
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  },
                  {
                     "question":"Q120",
                     "values":[
                        "true.some",
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q119",
               "section":"Article22",
               "number":"119",
               "type":"term",
               "title": nr5T.article22_question119_title,
               "multiple":true,
               "options":[
                  {
                     "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                     "title": nr5T.article22_question119_options0_title
                  },
                  {
                     "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                     "title": nr5T.article22_question119_options1_title
                  },
                  {
                     "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                     "title": nr5T.article22_question119_options2_title
                  },
                  {
                     "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                     "title": nr5T.article22_question119_options3_title
                  },
                  {
                     "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                     "title": nr5T.article22_question119_options4_title
                  },
                  {
                     "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                     "title": nr5T.article22_question119_options5_title
                  },
                  {
                     "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                     "title": nr5T.article22_question119_options6_title
                  },
                  {
                     "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                     "title": nr5T.article22_question119_options7_title
                  },
                  {
                     "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                     "title": nr5T.article22_question119_options8_title
                  },
                  {
                     "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                     "title": nr5T.article22_question119_options9_title
                  },
                  {
                     "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                     "title": nr5T.article22_question119_options10_title
                  },
                  {
                     "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                     "title": nr5T.article22_question119_options11_title
                  },
                  {
                     "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                     "title": nr5T.article22_question119_options12_title
                  },
                  {
                     "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                     "title": nr5T.article22_question119_options13_title
                  },
                  {
                     "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                     "title": nr5T.article22_question119_options14_title
                  },
                  {
                     "value":"667CD9B1-4571-4C2A-A459-F78E004D7D96",
                     "title": nr5T.article22_question119_options15_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q120",
               "section":"Article22",
               "number":"120",
               "type":"option",
               "title": nr5T.article22_question120_title,
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
               "mandatory":true
            },
            {
               "key":"Q121",
               "section":"Article22",
               "number":"121",
               "type":"option",
               "title": nr5T.article22_question121_title,
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
               "mandatory":true
            },
            {
               "key":"Q122",
               "section":"Article22",
               "number":"122",
               "type":"option",
               "title": nr5T.article22_question122_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q123",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  },
                  {
                     "question":"Q124",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q123",
               "section":"Article22",
               "number":"123",
               "type":"term",
               "title": nr5T.article22_question123_title,
               "multiple":true,
               "options":[
                  {
                     "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                     "title": nr5T.article22_question123_options0_title
                  },
                  {
                     "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                     "title": nr5T.article22_question123_options1_title
                  },
                  {
                     "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                     "title": nr5T.article22_question123_options2_title
                  },
                  {
                     "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                     "title": nr5T.article22_question123_options3_title
                  },
                  {
                     "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                     "title": nr5T.article22_question123_options4_title
                  },
                  {
                     "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                     "title": nr5T.article22_question123_options5_title
                  },
                  {
                     "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                     "title": nr5T.article22_question123_options6_title
                  },
                  {
                     "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                     "title": nr5T.article22_question123_options7_title
                  },
                  {
                     "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                     "title": nr5T.article22_question123_options8_title
                  },
                  {
                     "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                     "title": nr5T.article22_question123_options9_title
                  },
                  {
                     "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                     "title": nr5T.article22_question123_options10_title
                  },
                  {
                     "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                     "title": nr5T.article22_question123_options11_title
                  },
                  {
                     "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                     "title": nr5T.article22_question123_options12_title
                  },
                  {
                     "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                     "title": nr5T.article22_question123_options13_title
                  },
                  {
                     "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                     "title": nr5T.article22_question123_options14_title
                  },
                  {
                     "value":"667CD9B1-4571-4C2A-A459-F78E004D7D96",
                     "title": nr5T.article22_question123_options15_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q124",
               "section":"Article22",
               "number":"124",
               "type":"option",
               "title": nr5T.article22_question124_title,
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
               "mandatory":true
            },
            {
               "key":"Q125",
               "section":"Article22",
               "number":"125",
               "type":"option",
               "title": nr5T.article22_question125_title,
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
               "key":"Q126",
               "section":"Article22",
               "number":"126",
               "type":"lstring",
               "title": nr5T.article22_question126_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article23",
         "title": nr5T.article23_title,
         "questions":[
            {
               "key":"Q127",
               "section":"Article23",
               "number":"127",
               "type":"option",
               "title": nr5T.article23_question127_title,
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
               "key":"Q128",
               "section":"Article23",
               "number":"128",
               "type":"option",
               "title": nr5T.article23_question128_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
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
               "key":"Q129",
               "section":"Article23",
               "number":"129",
               "type":"option",
               "title": nr5T.article23_question129_title,
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
               "key":"Q130",
               "section":"Article23",
               "number":"130",
               "type":"option",
               "title": nr5T.article23_question130_title,
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
               "key":"Q131",
               "section":"Article23",
               "number":"131",
               "type":"option",
               "title": nr5T.article23_question131_title,
               "multiple":false,
               "options":[
                  {
                     "value":"none",
                     "title": nr5T.noneDecisions
                  },
                  {
                     "value":"1+",
                     "title": nr5T.oneToFour
                  },
                  {
                     "value":"5+",
                     "title": nr5T.fiveOrMore
                  },
                  {
                     "value":"false.na",
                     "title": nr5T.notApplicable
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q132",
               "section":"Article23",
               "number":"132",
               "type":"option",
               "title": nr5T.article23_question132_title,
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
               "mandatory":true
            },
            {
               "key":"Q133",
               "section":"Article23",
               "number":"133",
               "type":"option",
               "title": nr5T.article23_question133_title,
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
               "mandatory":true
            },
            {
               "key":"Q134",
               "section":"Article23",
               "number":"134",
               "type":"option",
               "title": nr5T.article23_question134_title,
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
               "mandatory":true
            },
            {
               "key":"Q135",
               "section":"Article23",
               "number":"135",
               "type":"option",
               "title": nr5T.article23_question135_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
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
               "key":"Q136",
               "section":"Article23",
               "number":"136",
               "type":"option",
               "title": nr5T.article23_question136_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
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
               "key":"Q137",
               "section":"Article23",
               "number":"137",
               "type":"option",
               "title": nr5T.article23_question137_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type": "lstring",
                     "caption": nr5T.provideWebsiteAddress
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q138",
               "section":"Article23",
               "number":"138",
               "type":"option",
               "title": nr5T.article23_question138_title,
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
               "mandatory":true
            },
            {
               "key":"Q139",
               "section":"Article23",
               "number":"139",
               "type":"lstring",
               "title": nr5T.article23_question139_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article24",
         "title": nr5T.article24_title,
         "questions":[
            {
               "key":"Q140",
               "section":"Article24",
               "number":"140",
               "type":"option",
               "title": nr5T.article24_question140_title,
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
               "mandatory":true
            },
            {
               "key":"Q141",
               "section":"Article24",
               "number":"141",
               "type":"option",
               "title": nr5T.article24_question141_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q143",
                     "type":"&is141Or142",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q142",
               "section":"Article24",
               "number":"142",
               "type":"option",
               "title": nr5T.article24_question142_title,
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q143",
                     "type":"&is141Or142",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q143",
               "section":"Article24",
               "number":"143",
               "type":"option",
               "title": nr5T.article24_question143_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q144",
               "section":"Article24",
               "number":"144",
               "type":"lstring",
               "title": nr5T.article24_question144_title,
               "multiple":false
            }
         ]

      },
      {
         "key":"Article25",
         "title": nr5T.article25_title,
         "footnote": nr5T.article25_footnote_7,
         "questions":[
            {
               "key":"Q145",
               "section":"Article25",
               "number":"145",
               "type":"option",
               "title": nr5T.article25_question145_title,
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
               "key":"Q146",
               "section":"Article25",
               "number":"146",
               "type":"option",
               "title": nr5T.article25_question146_title,
               "multiple":false,
               "options":[
                  {
                     "value":"0",
                     "title": nr5T.none
                  },
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
               "mandatory":true,
               "validations":[
                  {
                     "question":"Q147",
                     "values":[
                        "0"
                     ],
                     "type":"@hasValuesExcept",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q147",
               "section":"Article25",
               "number":"147",
               "type":"option",
               "title": nr5T.article25_question147_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.yesInSomeCases
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q148",
               "section":"Article25",
               "number":"148",
               "type":"lstring",
               "title": nr5T.article25_question148_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article26",
         "title": nr5T.article26_title,
         "questions":[
            {
               "key":"Q149",
               "section":"Article26",
               "number":"149",
               "type":"option",
               "title": nr5T.article26_question149_title,
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
               "mandatory":true
            },
            {
               "key":"Q150",
               "section":"Article26",
               "number":"150",
               "type":"option",
               "title": nr5T.article26_question150_title,
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
               "mandatory":true
            },
            {
               "key":"Q151",
               "section":"Article26",
               "number":"151",
               "type":"option",
               "title": nr5T.article26_question151_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yesAlways
                  },
                  {
                     "value":"true.some",
                     "title": nr5T.inSomeCasesOnly
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  },
                  {
                     "value":"false.na",
                     "title": nr5T.notApplicable
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q152",
               "section":"Article26",
               "number":"152",
               "type":"lstring",
               "title": nr5T.article26_question152_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Article28",
         "title": nr5T.article28_title,
         "questions":[
            {
               "key":"Q153",
               "section":"Article28",
               "number":"153",
               "type":"option",
               "title": nr5T.article28_question153_title,
               "multiple":false,
               "options":[
                  {
                     "value":"USD0",
                     "title": nr5T.none
                  },
                  {
                     "value":"USD1-4999",
                     "title": nr5T.article28_question153_option0_title
                  },
                  {
                     "value":"USD5000-49999",
                     "title": nr5T.article28_question153_option1_title
                  },
                  {
                     "value":"USD50000-99999",
                     "title": nr5T.article28_question153_option2_title
                  },
                  {
                     "value":"USD100000-499000",
                     "title": nr5T.article28_question153_option3_title
                  },
                  {
                     "value":"USD500000+",
                     "title": nr5T.article28_question153_option4_title
                  }
               ],
               "mandatory":true
            }
         ]
      },
      {
         "key":"Article33",
         "title": nr5T.article33_title,
         "description": nr5T.article33_description,
         "questions":[
            {
               "key":"Q154",
               "section":"Article33",
               "number":"154",
               "type":"option",
               "title": nr5T.article33_question154_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  },
               ],
               "mandatory":true
            }
         ]
      },
      {
         "key":"Cooperation",
         "title": nr5T.cooperation_title,
         "description": nr5T.cooperation_description,
         "questions":[
            {
               "key":"Q155",
               "section":"Cooperation",
               "number":"155",
               "type":"sub-section",
               "title": nr5T.cooperation_question155_title,
               "multiple":false,  
               "mandatory":true,             
               "questions":[
                  {
                     "key":"Q155_a",
                     "section":"Cooperation",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.cooperation_question155_a_title,
                     "multiple":false,
                     "mandatory":true,
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
                  },
                  {
                     "key":"Q155_b",
                     "section":"Cooperation",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.cooperation_question155_b_title,
                     "multiple":false,
                     "mandatory":true,
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
                  },
                  {
                     "key":"Q155_c",
                     "section":"Cooperation",
                     "number":"c",
                     "type":"option",
                     "title": nr5T.cooperation_question155_c_title,
                     "multiple":false,
                     "mandatory":true,
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
                           "baseQuestion":"Q155",
                           "question":"Q155_c_adq",
                           "values":[
                              "true"
                           ],
                           "type":"@hasValues",
                           "trigger":"visible"
                        }
                     ],
                  },
                  {
                     "key": "Q155_c_adq",
                     "section": "Cooperation",
                     "number": "",
                     "type": "option",
                     "title": nr5T.cooperation_question155_c_option0_title,
                     "multiple": false,
                     "mandatory":true,
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
                     "key":"Q155_d",
                     "section":"Cooperation",
                     "number":"d",
                     "type":"option",
                     "title": nr5T.cooperation_question155_d_title,
                     "multiple":false,
                     "mandatory":true,                     
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
                     "key":"Q155_e",
                     "section":"Cooperation",
                     "number":"e",
                     "type":"option",
                     "title": nr5T.cooperation_question155_e_title,
                     "multiple":false,
                     "mandatory":true,
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
                  }
               ]
            },
            {
               "key":"Q156",
               "section":"Cooperation",
               "number":"156",
               "type":"option",
               "title": nr5T.cooperation_question156_title,
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
               "mandatory":true
            },
            {
               "key":"Q157",
               "section":"Cooperation",
               "number":"157",
               "type":"sub-section",
               "title": nr5T.cooperation_question157_title,
               "multiple":false,
               "mandatory":true,
               "questions":[
                  {
                     "key":"Q157_a",
                     "section":"Cooperation",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.cooperation_question157_a_title,
                     "multiple":false,
                     "mandatory":true,
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
                     "key":"Q157_b",
                     "section":"Cooperation",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.cooperation_question157_b_title,
                     "multiple":false,
                     "mandatory":true,
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
               ]
            },
            {
               "key":"Q158",
               "section":"Cooperation",
               "number":"158",
               "type":"lstring",
               "title": nr5T.cooperation_question158_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Nagoya",
         "title": nr5T.nagoyaKualaLumpur_title,
         "description": nr5T.nagoyaKualaLumpur_description,
         "questions":[
            {
               "key":"Q159",
               "section":"Nagoya",
               "number":"159",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question159_title,
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
                     "question":"Q159_adq",
                     "values":[
                        "false"
                     ],
                     "type":"@hasValues",
                     "trigger":"visible"
                  }
               ]
            },
            {
               "key":"Q159_adq",
               "section":"Nagoya",
               "number":"",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question159_options0_title,
               "multiple":false,
               "mandatory":true,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring",
                     "caption": nr5T.provideFurtherInformation
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q160",
               "section":"Nagoya",
               "number":"160",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question160_title,
               "multiple":false,
               "options":[
                  {
                     "value":"74B17D51-786F-3D68-3B76-A50121842925",
                     "title": nr5T.nagoyaKualaLumpur_question160_options0_title
                  },
                  {
                     "value":"FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                     "title": nr5T.nagoyaKualaLumpur_question160_options1_title
                  },
                  {
                     "value":"EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                     "title": nr5T.nagoyaKualaLumpur_question160_options2_title
                  },
                  {
                     "value":"2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                     "title": nr5T.nagoyaKualaLumpur_question160_options3_title
                  },
                  {
                     "value":"C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                     "title": nr5T.nagoyaKualaLumpur_question160_options4_title
                  }
               ],
            },
            {
               "key":"Q161",
               "section":"Nagoya",
               "number":"161",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question161_title,
               "multiple":true,
               "options":[
                  {
                     "value":"6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                     "title": nr5T.nagoyaKualaLumpur_question161_options0_title
                  },
                  {
                     "value":"0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                     "title": nr5T.nagoyaKualaLumpur_question161_options1_title
                  },
                  {
                     "value":"BA743C79-B202-4611-16C4-2C7D4678ACEB",
                     "title": nr5T.nagoyaKualaLumpur_question161_options2_title
                  },
                  {
                     "value":"9067DB5B-E33B-655D-83A3-32D4D562618F",
                     "title": nr5T.nagoyaKualaLumpur_question161_options3_title,
                     "exclusive":true
                     
                  }
               ]
            },
            {
               "key":"Q161_a",
               "section":"Nagoya",
               "number":"",
               "type":"lstring",
               "title": nr5T.informationOnInstruments,
               "multiple":false
            },
            {
               "key":"Q162",
               "section":"Nagoya",
               "number":"162",
               "type":"sub-section",
               "title": nr5T.nagoyaKualaLumpur_question162_title,
               "multiple":false,
               "questions":[
                  {
                     "key":"Q162_a",
                     "section":"Nagoya",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.nagoyaKualaLumpur_question162_a_title,
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
                           "question":"Q163",
                           "values":[
                              "true"
                           ],
                           "type":"@hasValues",
                           "trigger":"enable"
                        },
                        {
                           "question":"Q164",
                           "values":[
                              "true"
                           ],
                           "type":"@hasValues",
                           "trigger":"enable"
                        },
                        {
                           "question":"Q165",
                           "type":"&is162_aOr162_b",
                           "trigger":"enable"
                        }
                     ]
                  },
                  {
                     "key":"Q162_b",
                     "section":"Nagoya",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.nagoyaKualaLumpur_question162_b_title,
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
                           "question":"Q165",
                           "type":"&is162_aOr162_b",
                           "trigger":"enable"
                        }
                     ]
                  }
               ]
            },
            {
               "key":"Q163",
               "section":"Nagoya",
               "number":"163",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question163_title,
               "multiple":true,
               "options":[
                  {
                     "value":"true.inform",
                     "title": nr5T.nagoyaKualaLumpur_question163_options0_title
                  },
                  {
                     "value":"true.evaluate",
                     "title": nr5T.nagoyaKualaLumpur_question163_options1_title
                  },
                  {
                     "value":"true.response",
                     "title": nr5T.nagoyaKualaLumpur_question163_options2_title
                  },
                  {
                     "value":"true.other",
                     "title": nr5T.nagoyaKualaLumpur_question163_options3_title,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no,
                     "exclusive":true
                  }
               ]
            },
            {
               "key":"Q164",
               "section":"Nagoya",
               "number":"164",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question164_title,
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
               "key":"Q165",
               "section":"Nagoya",
               "number":"165",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question165_title,
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
                     "question":"Q166",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q166",
               "section":"Nagoya",
               "number":"166",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question166_title,
               "multiple": true,
               "options":[
                  {
                     "value":"8F627A99-7CD4-D892-80EA-12C58607508F",
                     "title": nr5T.nagoyaKualaLumpur_question166_options0_title
                  },
                  {
                     "value":"888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                     "title": nr5T.nagoyaKualaLumpur_question166_options1_title
                  },
                  {
                     "value":"B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                     "title": nr5T.nagoyaKualaLumpur_question166_options2_title
                  },
                  {
                     "value":"ADEF00D6-0901-8750-1069-5CBA877011CC",
                     "title": nr5T.nagoyaKualaLumpur_question166_options3_title
                  },
                  {
                     "value":"3F54E971-E791-FE00-5312-F7FF07C818B1",
                     "title": nr5T.nagoyaKualaLumpur_question166_options4_title
                  },
                  {
                     "value":"2D8B29DD-0703-6130-BE79-389F5278C21D",
                     "title": nr5T.nagoyaKualaLumpur_question166_options5_title
                  },
                  {
                     "value":"D475D239-517E-9D8B-E1F9-4C453039C792",
                     "title": nr5T.nagoyaKualaLumpur_question166_options6_title
                  },
                  {
                     "value":"8BD75295-88DF-2A32-A150-1132670E19A9",
                     "title": nr5T.nagoyaKualaLumpur_question166_options7_title
                  },
                  {
                     "value":"58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                     "title": nr5T.nagoyaKualaLumpur_question166_options8_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q167",
               "section":"Nagoya",
               "number":"167",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question167_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "validations":[
                  {
                     "question":"Q168",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q168",
               "section":"Nagoya",
               "number":"168",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question168_title,
               "multiple":true,
               "options":[
                  {
                     "value":"2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                     "title": nr5T.nagoyaKualaLumpur_question168_options0_title
                  },
                  {
                     "value":"6065EDB8-C5A4-BA81-5271-B2F93159A471",
                     "title": nr5T.nagoyaKualaLumpur_question168_options1_title
                  },
                  {
                     "value":"A038303D-7049-E34F-8381-5B59702BBCF6",
                     "title": nr5T.nagoyaKualaLumpur_question168_options2_title
                  },
                  {
                     "value":"9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                     "title": nr5T.nagoyaKualaLumpur_question168_options3_title
                  },
                  {
                     "value":"34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                     "title": nr5T.nagoyaKualaLumpur_question168_options4_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q169",
               "section":"Nagoya",
               "number":"169",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question169_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring",
                     "caption": " "
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "validations":[
                  {
                     "question":"Q170",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q170",
               "section":"Nagoya",
               "number":"170",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question170_title,
               "multiple":true,
               "options":[
                  {
                     "value":"69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                     "title": nr5T.nagoyaKualaLumpur_question170_options0_title
                  },
                  {
                     "value":"D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                     "title": nr5T.nagoyaKualaLumpur_question170_options1_title
                  },
                  {
                     "value":"89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                     "title": nr5T.nagoyaKualaLumpur_question170_options2_title
                  },
                  {
                     "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ]
            },
            {
               "key":"Q171",
               "section":"Nagoya",
               "number":"171",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question171_title,
               "multiple":true,
               "options":[
                  {
                     "value":"878DF5F5-0B5E-48E1-6A42-80867A101675",
                     "title": nr5T.nagoyaKualaLumpur_question171_options0_title
                  },
                  {
                     "value":"0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                     "title": nr5T.nagoyaKualaLumpur_question171_options1_title
                  },
                  {
                     "value":"true",
                     "title": nr5T.nagoyaKualaLumpur_question171_options2_title,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no,
                     "exclusive":true
                  }
               ]
            },
            {
               "key":"Q172",
               "section":"Nagoya",
               "number":"172",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question172_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ],
               "validations":[
                  {
                     "question":"Q173",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"enable"
                  }
               ]
            },
            {
               "key":"Q173",
               "section":"Nagoya",
               "number":"173",
               "type":"option",
               "title": nr5T.nagoyaKualaLumpur_question173_title,
               "multiple":false,
               "options":[
                  {
                     "value":"true",
                     "title": nr5T.yes,
                     "type":"lstring"
                  },
                  {
                     "value":"false",
                     "title": nr5T.no
                  }
               ]
            },
            {
               "key":"Q174",
               "section":"Nagoya",
               "number":"174",
               "type":"lstring",
               "title": nr5T.nagoyaKualaLumpur_question174_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"OtherInformation",
         "title": nr5T.other_title,
         "questions":[
            {
               "key":"Q175",
               "section":"OtherInformation",
               "number":"175",
               "type":"lstringRte",
               "title": nr5T.other_question175_title,
               "multiple":false
            }
         ]
      },
      {
         "key":"Comments",
         "title": nr5T.Comments_title,
         "questions":[
            {
               "key":"Q176",
               "section":"Comments",
               "number":"176",
               "type":"lstringRte",
               "title": nr5T.comments_question176_title,
               "multiple":false
            }
         ]
      }
]