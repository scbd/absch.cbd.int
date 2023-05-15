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
   },
   {
            "key":"Article5",
            "title": nr5T.article5_title,
            "questions":[
               {
                  "key":"Q0014",
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
                  "key":"Q0016",
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
                  "key":"Q0017",
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
                  "key":"Q0018",
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
                        "trigger":"visible"
                     },
                     {
                        "question":"Q024",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"visible"
                     },
                     {
                        "baseQuestion":"Q025",
                        "question":"Q025_a",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"visible"
                     },
                     {
                        "baseQuestion":"Q025",
                        "question":"Q025_b",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"visible"
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
                  mandatory:true,
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
                        "trigger":"visible"
                     },
                     {
                        "question":"Q028",
                        "type":"@hasValues",
                        "values":[
                           "true"
                        ],
                        "trigger":"visible"
                     }
                  ]
               },
               {
                  "key":"Q026_adq",
                  "section":"Article2",
                  "number":"",
                  "type":"lstring",
                  "title": nr5T.articles7_10_question26_question0_title,
                  "multiple":false
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
                        "trigger":"visible"
                     },
                     {
                        "question":"Q027_b",
                        "values":[
                           "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"
                        ],
                        "type":"@hasValues",
                        "trigger":"visible"
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
                  "key":"Q0031",
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
                  "key":"Q0032",
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
                  "key":"Q0034",
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
   }
]