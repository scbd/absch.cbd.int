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
                  "type":"int",
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
                     "trigger":"visible"
                  },
                  {
                     "question":"Q040",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"visible"
                  },
                  {
                     "question":"Q042",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"visible"
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
                     "trigger":"visible"
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
                     "trigger":"visible"
                  },
                  {
                     "question":"Q048",
                     "type":"@hasValues",
                     "values":[
                        "true"
                     ],
                     "trigger":"visible"
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
                     "value":"1+",
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
               mandatory:true,
               "validations":[
                  {
                     "question":"Q051",
                     "type":"@hasValues",
                     "trigger":"visible"
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
                     "trigger":"visible"
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
                     "trigger":"visible"
                  },
                  {
                     "question":"Q057",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"visible"
                  },
                  {
                     "question":"Q058",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"visible"
                  },
                  {
                     "question":"Q059",
                     "values":[
                        "true"
                     ],
                     "type":"@hasValues",
                     "trigger":"visible"
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
                     "key":"Q066_b",
                     "section":"Articles15-16",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.riskManagement,
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
               "key":"Q067",
               "section":"Articles15-16",
               "number":"67",
               "type":"option",
               "title": nr5T.articles15_16_question67_title,
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
                     "trigger":"visible"
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
                     "trigger":"visible"
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
               "mandatory":true
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
               "mandatory":true
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
               "mandatory":true
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
                     "value":"other",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ],
               "mandatory":true
            },
            {
               "key":"Q083",
               "section":"Article18",
               "number":"83",
               "type":"option",
               "title": nr5T.article18_question83_title,
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
                     "value":"other",
                     "title": nr5T.other,
                     "type":"lstring"
                  }
               ],
               "mandatory":true
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
               "mandatory":true
            },
            {
               "key":"Q086",
               "section":"Article18",
               "number":"86",
               "type":"option",
               "title": nr5T.article18_question86_title,
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
                     "value":"other",
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
               "questions":[
                  {
                     "key":"Q090_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question90_a_title,
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
                     "key":"Q090_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question90_b_title,
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
               "questions":[
                  {
                     "key":"Q091_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question91_a_title,
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
                     "key":"Q091_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question91_b_title,
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
               "questions":[
                  {
                     "key":"Q092_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question92_a_title,
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
                     "key":"Q092_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question92_b_title,
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
               "questions":[
                  {
                     "key":"Q094_a",
                     "section":"Article18",
                     "number":"a",
                     "type":"option",
                     "title": nr5T.article18_question94_a_title,
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
                     "key":"Q094_b",
                     "section":"Article18",
                     "number":"b",
                     "type":"option",
                     "title": nr5T.article18_question94_b_title,
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
               "mandatory":true
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
               ],
               "mandatory":true
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
      }
]