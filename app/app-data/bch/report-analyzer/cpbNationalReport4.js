import nr4Data from '../../../app-text/report-analyzer/bch-cpbNationalReport4.json';

export const cpbNationalReport4 = [
   {
      "key":"General",
      "title": nr4Data.General_title,
      "questions":[
         {
            "key":"Q012_party",
            "section":"General",
            "number":"11",
            "type":"option",
            "title": nr4Data.General_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q012_partyInProgress",
                  "values":[
                     "false"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q013",
                  "values":[
                     "false"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q012_partyInProgress",
            "section":"General",
            "number":"12",
            "type":"option",
            "title": nr4Data.General_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q013",
            "section":"General",
            "number":"13",
            "type":"lstring",
            "title": nr4Data.General_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article2",
      "title": nr4Data.Article2_title,
      "description": nr4Data.Article2_description,
      "questions":[
         {
            "key":"Q014",
            "section":"Article2",
            "number":"14",
            "type":"option",
            "title": nr4Data.Article2_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"implementation.fullInPlace",
                  "title": nr4Data.Article2_questions0_options0_title
               },
               {
                  "value":"implementation.partiallyInPlace",
                  "title": nr4Data.Article2_questions0_options1_title
               },
               {
                  "value":"implementation.temporaryMeasures",
                  "title": nr4Data.Article2_questions0_options2_title
               },
               {
                  "value":"implementation.draftMeasures",
                  "title": nr4Data.Article2_questions0_options3_title
               },
               {
                  "value":"implementation.none",
                  "title": nr4Data.Article2_questions0_options4_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q015",
            "section":"Article2",
            "number":"15",
            "type":"option",
            "title": nr4Data.Article2_questions1_title,
            "multiple":true,
            "options":[
               {
                  "value":"instrument.nationalBiosafetyLaws",
                  "title": nr4Data.Article2_questions1_options0_title
               },
               {
                  "value":"instrument.nationalBiosafetyRegulations",
                  "title": nr4Data.Article2_questions1_options1_title
               },
               {
                  "value":"instrument.biosafetyGuidelines",
                  "title": nr4Data.Article2_questions1_options2_title
               },
               {
                  "value":"instrument.indirectLaws",
                  "title": nr4Data.Article2_questions1_options3_title
               },
               {
                  "value":"instrument.none",
                  "title": nr4Data.Article2_questions1_options4_title
               }
            ]
         },
         {
            "key":"Q016",
            "section":"Article2",
            "number":"16",
            "type":"option",
            "title": nr4Data.Article2_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               },
               {
                  "value":"false.other",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key":"Q017",
            "section":"Article2",
            "number":"17",
            "type":"option",
            "title": nr4Data.Article2_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article2_questions3_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q018",
            "section":"Article2",
            "number":"18",
            "type":"option",
            "title": nr4Data.Article2_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q019",
                  "type":"@hasValues",
                  "values":[
                     "true"
                  ],
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q019",
            "section":"Article2",
            "number":"19",
            "type":"option",
            "title": nr4Data.Article2_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"1+",
                  "title": nr4Data.Article2_questions5_options0_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article2_questions5_options1_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article2_questions5_options2_title
               }
            ],
            "validations":[
               {
                  "question":"Q019_adq",
                  "type":"@hasValues",
                  "trigger":"visible"
               }
            ]
         },
         {
            "key":"Q019_adq",
            "section":"Article2",
            "number":"",
            "type":"option",
            "title": nr4Data.Article2_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q020",
            "section":"Article2",
            "number":"20",
            "type":"lstring",
            "title": nr4Data.Article2_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article5",
      "title": nr4Data.Article5_title,
      "questions":[
         {
            "key":"Q021",
            "section":"Article5",
            "number":"21",
            "type":"option",
            "title": nr4Data.Article5_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article5_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q022",
            "section":"Article5",
            "number":"22",
            "type":"lstring",
            "title": nr4Data.Article5_questions1_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article6",
      "title": nr4Data.Article6_title,
      "questions":[
         {
            "key":"Q023",
            "section":"Article6",
            "number":"23",
            "type":"option",
            "title": nr4Data.Article6_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article6_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q024",
            "section":"Article6",
            "number":"24",
            "type":"option",
            "title": nr4Data.Article6_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q025",
            "section":"Article6",
            "number":"25",
            "type":"option",
            "title": nr4Data.Article6_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q026",
            "section":"Article6",
            "number":"26",
            "type":"lstring",
            "title": nr4Data.Article6_questions3_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Articles7-10",
      "title": nr4Data.Articles7_10_title,
      "questions":[
         {
            "key":"Q027",
            "section":"Articles7-10",
            "number":"27",
            "type":"option",
            "title": nr4Data.Articles7_10_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q028",
            "section":"Articles7-10",
            "number":"28",
            "type":"option",
            "title": nr4Data.Articles7_10_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions1_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               },
               {
                  "value":"false.notApplicable",
                  "title": nr4Data.Articles7_10_questions1_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q029",
            "section":"Articles7-10",
            "number":"29",
            "type":"option",
            "title": nr4Data.Articles7_10_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q030",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q031",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "baseQuestion":"Q032",
                  "question":"Q032_a",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "baseQuestion":"Q032",
                  "question":"Q032_b",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q030",
            "section":"Articles7-10",
            "number":"30",
            "type":"option",
            "title": nr4Data.Articles7_10_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Articles7_10_questions3_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions3_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q031",
            "section":"Articles7-10",
            "number":"31",
            "type":"option",
            "title": nr4Data.Articles7_10_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Articles7_10_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions4_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q032",
            "section":"Articles7-10",
            "number":"32",
            "type":"sub-section",
            "title": nr4Data.Articles7_10_questions5_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q032_a",
                  "section":"Articles7-10",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Articles7_10_questions5_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Articles7_10_questions5_questions0_options0_title
                     },
                     {
                        "value":"true.some",
                        "title": nr4Data.Articles7_10_questions5_questions0_options1_title
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q032_b",
                  "section":"Articles7-10",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Articles7_10_questions5_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Articles7_10_questions5_questions1_options0_title
                     },
                     {
                        "value":"true.some",
                        "title": nr4Data.Articles7_10_questions5_questions1_options1_title
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true
               }
            ]
         },
         {
            "key":"Q033",
            "section":"Articles7-10",
            "number":"33",
            "type":"option",
            "title": nr4Data.Articles7_10_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q034",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q036",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q034",
            "section":"Articles7-10",
            "number":"34",
            "type":"option",
            "title": nr4Data.Articles7_10_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Articles7_10_questions7_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Articles7_10_questions7_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Articles7_10_questions7_options3_title
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q035",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q035",
            "section":"Articles7-10",
            "number":"35",
            "type":"option",
            "title": nr4Data.Articles7_10_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Articles7_10_questions8_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions8_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q036",
            "section":"Articles7-10",
            "number":"36",
            "type":"option",
            "title": nr4Data.Articles7_10_questions9_title,
            "multiple":true,
            "options":[
               {
                  "value":"3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                  "title": nr4Data.Articles7_10_questions9_options0_title,
                  "type":"int"
               },
               {
                  "value":"3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                  "title": nr4Data.Articles7_10_questions9_options1_title,
                  "type":"int"
               },
               {
                  "value":"6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                  "title": nr4Data.Articles7_10_questions9_options2_title,
                  "type":"int"
               },
               {
                  "value":"8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                  "title": nr4Data.Articles7_10_questions9_options3_title,
                  "type":"int"
               },
               {
                  "value":"19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                  "title": nr4Data.Articles7_10_questions9_options4_title,
                  "type":"int"
               }
            ],
            "validations":[
               {
                  "question":"Q037",
                  "values":[
                     "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                     "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"
                  ],
                  "type":"@hasAdditionalValues",
                  "trigger":"enable"
               }
            ],
            "customValuePlaceholder":"Articles7_10_questions9_customValuePlaceholder"
         },
         {
            "key":"Q037",
            "section":"Articles7-10",
            "number":"37",
            "type":"option",
            "title": nr4Data.Articles7_10_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Articles7_10_questions10_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Articles7_10_questions10_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q038",
            "section":"Articles7-10",
            "number":"38",
            "type":"lstring",
            "title": nr4Data.Articles7_10_questions11_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article11",
      "title": nr4Data.Article11_title,
      "questions":[
         {
            "key":"Q039",
            "section":"Article11",
            "number":"39",
            "type":"option",
            "title": nr4Data.Article11_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q040",
            "section":"Article11",
            "number":"40",
            "type":"option",
            "title": nr4Data.Article11_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article11_questions1_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q041",
            "section":"Article11",
            "number":"41",
            "type":"option",
            "title": nr4Data.Article11_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article11_questions2_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article11_questions2_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article11_questions2_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q042",
            "section":"Article11",
            "number":"42",
            "type":"option",
            "title": nr4Data.Article11_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q043",
            "section":"Article11",
            "number":"43",
            "type":"option",
            "title": nr4Data.Article11_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article11_questions4_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article11_questions4_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article11_questions4_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q044",
            "section":"Article11",
            "number":"44",
            "type":"lstring",
            "title": nr4Data.Article11_questions5_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article12",
      "title": nr4Data.Article12_title,
      "questions":[
         {
            "key":"Q045",
            "section":"Article12",
            "number":"45",
            "type":"option",
            "title": nr4Data.Article12_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article12_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q046",
            "section":"Article12",
            "number":"46",
            "type":"option",
            "title": nr4Data.Article12_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q047",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q048",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q050",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q047",
            "section":"Article12",
            "number":"47",
            "type":"option",
            "title": nr4Data.Article12_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"1+",
                  "title": nr4Data.Article12_questions2_options0_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article12_questions2_options1_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article12_questions2_options2_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q048",
            "section":"Article12",
            "number":"48",
            "type":"option",
            "title": nr4Data.Article12_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q049",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q049",
            "section":"Article12",
            "number":"49",
            "type":"option",
            "title": nr4Data.Article12_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article12_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article12_questions4_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q050",
            "section":"Article12",
            "number":"50",
            "type":"option",
            "title": nr4Data.Article12_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "baseQuestion":"Q051",
                  "question":"Q051_a",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "baseQuestion":"Q051",
                  "question":"Q051_b",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q051",
            "section":"Articles12",
            "number":"51",
            "type":"sub-section",
            "title": nr4Data.Article12_questions6_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q051_a",
                  "section":"Article12",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Article12_questions6_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Article12_questions6_questions0_options0_title
                     },
                     {
                        "value":"true.some",
                        "title": nr4Data.Article12_questions6_questions0_options1_title
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q051_b",
                  "section":"Article12",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Article12_questions6_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Article12_questions6_questions1_options0_title
                     },
                     {
                        "value":"true.some",
                        "title": nr4Data.Article12_questions6_questions1_options1_title
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true
               }
            ]
         },
         {
            "key":"Q052",
            "section":"Article12",
            "number":"52",
            "type":"lstring",
            "title": nr4Data.Article12_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article13",
      "title": nr4Data.Article13_title,
      "questions":[
         {
            "key":"Q053",
            "section":"Article13",
            "number":"53",
            "type":"option",
            "title": nr4Data.Article13_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article13_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q054",
            "section":"Article13",
            "number":"54",
            "type":"option",
            "title": nr4Data.Article13_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q055",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q056",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q055",
            "section":"Article13",
            "number":"55",
            "type":"option",
            "title": nr4Data.Article13_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article13_questions2_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article13_questions2_options2_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q056",
            "section":"Article13",
            "number":"56",
            "type":"option",
            "title": nr4Data.Article13_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article13_questions3_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article13_questions3_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q057",
            "section":"Article13",
            "number":"57",
            "type":"lstring",
            "title": nr4Data.Article13_questions4_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article14",
      "title": nr4Data.Article14_title,
      "questions":[
         {
            "key":"Q058",
            "section":"Article14",
            "number":"58",
            "type":"option",
            "title": nr4Data.Article14_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article14_questions0_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article14_questions0_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article14_questions0_options3_title
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q059",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q059",
            "section":"Article14",
            "number":"59",
            "type":"lstring",
            "title": nr4Data.Article14_questions1_title,
            "multiple":false,
            "mandatory":true
         },
         {
            "key":"Q060",
            "section":"Article14",
            "number":"60",
            "type":"lstring",
            "title": nr4Data.Article14_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article15_16",
      "title": nr4Data.Article15_16_title,
      "questions":[
         {
            "key":"Q061",
            "section":"Article15_16",
            "number":"61",
            "type":"option",
            "title": nr4Data.Article15_16_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q062",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q062",
            "section":"Article15_16",
            "number":"62",
            "type":"option",
            "title": nr4Data.Article15_16_questions1_title,
            "multiple":true,
            "options":[
               {
                  "value":"014054D1-2B72-7ABD-E615-D0A374590A95",
                  "title": nr4Data.Article15_16_questions1_options0_title
               },
               {
                  "value":"94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                  "title": nr4Data.Article15_16_questions1_options1_title
               },
               {
                  "value":"29B97F6B-066E-BE64-0FA3-66060DEE737D",
                  "title": nr4Data.Article15_16_questions1_options2_title
               },
               {
                  "value":"2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                  "title": nr4Data.Article15_16_questions1_options3_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q063",
            "section":"Article15_16",
            "number":"63",
            "type":"option",
            "title": nr4Data.Article15_16_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article15_16_questions2_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q064",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q064",
            "section":"Article15_16",
            "number":"64",
            "type":"option",
            "title": nr4Data.Article15_16_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"legend15_16",
            "section":"Article15_16",
            "number":"",
            "type":"legend",
            "title": nr4Data.Article15_16_questions4_title
         },
         {
            "key":"Q065",
            "section":"Articles12",
            "number":"65",
            "type":"sub-section",
            "title": nr4Data.Article15_16_questions5_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q065_a",
                  "section":"Article15_16",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr4Data.None
                     },
                     {
                        "value":"1+",
                        "title": nr4Data.Article15_16_questions5_questions0_options1_title
                     },
                     {
                        "value":"10+",
                        "title": nr4Data.Article15_16_questions5_questions0_options2_title
                     },
                     {
                        "value":"50+",
                        "title": nr4Data.Article15_16_questions5_questions0_options3_title
                     },
                     {
                        "value":"100+",
                        "title": nr4Data.Article15_16_questions5_questions0_options4_title
                     }
                  ],
                  "validations":[
                     {
                        "baseQuestion":"Q065",
                        "question":"Q065_a_adq",
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
                  "key":"Q065_a_adq",
                  "section":"Article15_16",
                  "number":"",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               },
               {
                  "key":"Q065_b",
                  "section":"Article15_16",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions2_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr4Data.None
                     },
                     {
                        "value":"1+",
                        "title": nr4Data.Article15_16_questions5_questions2_options1_title
                     },
                     {
                        "value":"10+",
                        "title": nr4Data.Article15_16_questions5_questions2_options2_title
                     },
                     {
                        "value":"50+",
                        "title": nr4Data.Article15_16_questions5_questions2_options3_title
                     },
                     {
                        "value":"100+",
                        "title": nr4Data.Article15_16_questions5_questions2_options4_title
                     }
                  ],
                  "validations":[
                     {
                        "baseQuestion":"Q065",
                        "question":"Q065_b_adq",
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
                  "key":"Q065_b_adq",
                  "section":"Article2",
                  "number":"",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions3_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               },
               {
                  "key":"Q065_c",
                  "section":"Article15_16",
                  "number":"c",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions4_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"0",
                        "title": nr4Data.None
                     },
                     {
                        "value":"1+",
                        "title": nr4Data.Article15_16_questions5_questions4_options1_title
                     },
                     {
                        "value":"10+",
                        "title": nr4Data.Article15_16_questions5_questions4_options2_title
                     },
                     {
                        "value":"50+",
                        "title": nr4Data.Article15_16_questions5_questions4_options3_title
                     },
                     {
                        "value":"100+",
                        "title": nr4Data.Article15_16_questions5_questions4_options4_title
                     }
                  ],
                  "validations":[
                     {
                        "baseQuestion":"Q065",
                        "question":"Q065_c_adq",
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
                  "key":"Q065_c_adq",
                  "section":"Article2",
                  "number":"",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions5_questions5_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               }
            ]
         },
         {
            "key":"Q066",
            "section":"Article15_16",
            "number":"66",
            "type":"option",
            "title": nr4Data.Article15_16_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q067",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q068",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q067",
            "section":"Article15_16",
            "number":"67",
            "type":"option",
            "title": nr4Data.Article15_16_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q068",
            "section":"Article15_16",
            "number":"68",
            "type":"option",
            "title": nr4Data.Article15_16_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q069",
            "section":"Article15_16",
            "number":"69",
            "type":"option",
            "title": nr4Data.Article15_16_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q070",
            "section":"Article15_16",
            "number":"70",
            "type":"sub-section",
            "title": nr4Data.Article15_16_questions10_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q070_a",
                  "section":"Article15_16",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions10_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               },
               {
                  "key":"Q070_b",
                  "section":"Article15_16",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions10_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               },
               {
                  "key":"Q070_c",
                  "section":"Article15_16",
                  "number":"c",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions10_questions2_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               },
               {
                  "key":"Q070_d",
                  "section":"Article15_16",
                  "number":"d",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions10_questions3_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ]
               }
            ]
         },
         {
            "key":"legend71_84",
            "section":"Article15_16",
            "number":"",
            "type":"legend",
            "title": nr4Data.Article15_16_questions11_title
         },
         {
            "key":"Q071",
            "section":"Article15_16",
            "number":"71",
            "type":"sub-section",
            "title": nr4Data.Article15_16_questions12_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q071_a",
                  "section":"Article15_16",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions12_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true,
                  "validations":[
                     {
                        "question":"Q072",
                        "type":"&is71aOr71b",
                        "trigger":"enable"
                     }
                  ]
               },
               {
                  "key":"Q071_b",
                  "section":"Article15_16",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Article15_16_questions12_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "mandatory":true,
                  "validations":[
                     {
                        "question":"Q072",
                        "type":"&is71aOr71b",
                        "trigger":"enable"
                     }
                  ]
               }
            ]
         },
         {
            "key":"Q072",
            "section":"Article15_16",
            "number":"72",
            "type":"option",
            "title": nr4Data.Article15_16_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q073",
            "section":"Article15_16",
            "number":"73",
            "type":"option",
            "title": nr4Data.Article15_16_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q074",
            "section":"Article15_16",
            "number":"74",
            "type":"option",
            "title": nr4Data.Article15_16_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q075",
            "section":"Article15_16",
            "number":"75",
            "type":"option",
            "title": nr4Data.Article15_16_questions16_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q076",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q077",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               },
               {
                  "question":"Q078",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q076",
            "section":"Article15_16",
            "number":"76",
            "type":"option",
            "title": nr4Data.Article15_16_questions17_title,
            "multiple":false,
            "options":[
               {
                  "value":"1+",
                  "title": nr4Data.Article15_16_questions17_options0_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article15_16_questions17_options1_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article15_16_questions17_options2_title
               },
               {
                  "value":"100+",
                  "title": nr4Data.Article15_16_questions17_options3_title
               }
            ]
         },
         {
            "key":"Q077",
            "section":"Article15_16",
            "number":"77",
            "type":"term",
            "title": nr4Data.Article15_16_questions18_title,
            "multiple":true,
            "options":[
               {
                  "value":"42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                  "title": nr4Data.Article15_16_questions18_options0_title
               },
               {
                  "value":"D6B59E8A-D82C-4516-917A-A745ACDA5931",
                  "title": nr4Data.Article15_16_questions18_options1_title
               },
               {
                  "value":"015737FC-ABC2-460C-A099-06A1B01E649A",
                  "title": nr4Data.Article15_16_questions18_options2_title
               },
               {
                  "value":"91BEAF12-ABE1-4294-AD3B-507935894C78",
                  "title": nr4Data.Article15_16_questions18_options3_title
               },
               {
                  "value":"1D96153B-1625-44E4-AD5E-D26429044B29",
                  "title": nr4Data.Article15_16_questions18_options4_title
               },
               {
                  "value":"6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                  "title": nr4Data.Article15_16_questions18_options5_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key":"Q078",
            "section":"Article15_16",
            "number":"78",
            "type":"option",
            "title": nr4Data.Article15_16_questions19_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article15_16_questions19_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article15_16_questions19_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q079",
            "section":"Article15_16",
            "number":"79",
            "type":"option",
            "title": nr4Data.Article15_16_questions20_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q080",
            "section":"Article15_16",
            "number":"80",
            "type":"option",
            "title": nr4Data.Article15_16_questions21_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q081",
            "section":"Article15_16",
            "number":"81",
            "type":"option",
            "title": nr4Data.Article15_16_questions22_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article15_16_questions22_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q082",
            "section":"Article15_16",
            "number":"82",
            "type":"option",
            "title": nr4Data.Article15_16_questions23_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article15_16_questions23_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q083",
            "section":"Article15_16",
            "number":"83",
            "type":"option",
            "title": nr4Data.Article15_16_questions24_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q084",
            "section":"Article15_16",
            "number":"84",
            "type":"lstring",
            "title": nr4Data.Article15_16_questions25_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article17",
      "title": nr4Data.Article17_title,
      "footnote": nr4Data.Article17_footnote,
      "questions":[
         {
            "key":"Q085",
            "section":"Article17",
            "number":"85",
            "type":"option",
            "title": nr4Data.Article17_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article17_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q086",
            "section":"Article17",
            "number":"86",
            "type":"option",
            "title": nr4Data.Article17_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article17_questions1_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article17_questions1_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article17_questions1_options3_title
               }
            ],
            "validations":[
               {
                  "question":"Q087",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q087",
            "section":"Article17",
            "number":"87",
            "type":"option",
            "title": nr4Data.Article17_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article17_questions2_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article17_questions2_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q088",
            "section":"Article17",
            "number":"88",
            "type":"option",
            "title": nr4Data.Article17_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q089",
            "section":"Article17",
            "number":"89",
            "type":"option",
            "title": nr4Data.Article17_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article17_questions4_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article17_questions4_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article17_questions4_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q090",
            "section":"Article17",
            "number":"90",
            "type":"lstring",
            "title": nr4Data.Article17_questions5_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article18",
      "title": nr4Data.Article18_title,
      "questions":[
         {
            "key":"Q091",
            "section":"Article18",
            "number":"91",
            "type":"option",
            "title": nr4Data.Article18_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q094",
                  "type":"&is91Or92Or93",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q092",
            "section":"Article18",
            "number":"92",
            "type":"option",
            "title": nr4Data.Article18_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions1_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q094",
                  "type":"&is91Or92Or93",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q093",
            "section":"Article18",
            "number":"93",
            "type":"option",
            "title": nr4Data.Article18_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions2_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q094",
                  "type":"&is91Or92Or93",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q094",
            "section":"Article18",
            "number":"94",
            "type":"option",
            "title": nr4Data.Article18_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"lmoSpecific",
                  "title": nr4Data.Article18_questions3_options0_title
               },
               {
                  "value":"nonLmoSpecific",
                  "title": nr4Data.Article18_questions3_options1_title
               },
               {
                  "value":"other",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q095",
            "section":"Article18",
            "number":"95",
            "type":"option",
            "title": nr4Data.Article18_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions4_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q096",
                  "values":[
                     "true"
                  ],
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
            "title": nr4Data.Article18_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"lmoSpecific",
                  "title": nr4Data.Article18_questions5_options0_title
               },
               {
                  "value":"nonLmoSpecific",
                  "title": nr4Data.Article18_questions5_options1_title
               },
               {
                  "value":"other",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q097",
            "section":"Article18",
            "number":"97",
            "type":"option",
            "title": nr4Data.Article18_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions6_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q098",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q098",
            "section":"Article18",
            "number":"98",
            "type":"option",
            "title": nr4Data.Article18_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"lmoSpecific",
                  "title": nr4Data.Article18_questions7_options0_title
               },
               {
                  "value":"nonLmoSpecific",
                  "title": nr4Data.Article18_questions7_options1_title
               },
               {
                  "value":"other",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q099",
            "section":"Article18",
            "number":"99",
            "type":"option",
            "title": nr4Data.Article18_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q100",
            "section":"Article18",
            "number":"100",
            "type":"option",
            "title": nr4Data.Article18_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions9_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q101",
            "section":"Article18",
            "number":"101",
            "type":"option",
            "title": nr4Data.Article18_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article18_questions10_options1_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article18_questions10_options2_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article18_questions10_options3_title
               },
               {
                  "value":"100+",
                  "title": nr4Data.Article18_questions10_options4_title
               }
            ],
            "validations":[
               {
                  "question":"Q101_adq",
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
            "key":"Q101_adq",
            "section":"Article18",
            "number":"",
            "type":"option",
            "title": nr4Data.Article18_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q102",
            "section":"Article18",
            "number":"102",
            "type":"option",
            "title": nr4Data.Article18_questions12_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article18_questions12_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q103",
            "section":"Article18",
            "number":"103",
            "type":"option",
            "title": nr4Data.Article18_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article18_questions13_options1_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article18_questions13_options2_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article18_questions13_options3_title
               },
               {
                  "value":"100+",
                  "title": nr4Data.Article18_questions13_options4_title
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q103_adq",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"visible"
               }
            ]
         },
         {
            "key":"Q103_adq",
            "section":"Article18",
            "number":"",
            "type":"option",
            "title": nr4Data.Article18_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q104",
            "section":"Article18",
            "number":"104",
            "type":"option",
            "title": nr4Data.Article18_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q105",
            "section":"Article18",
            "number":"105",
            "type":"option",
            "title": nr4Data.Article18_questions16_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article18_questions16_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article18_questions16_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article18_questions16_options3_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article18_questions16_options4_title
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q106",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q106",
            "section":"Article18",
            "number":"106",
            "type":"option",
            "title": nr4Data.Article18_questions17_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article18_questions17_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article18_questions17_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article18_questions17_options3_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article18_questions17_options4_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q107",
            "section":"Article18",
            "number":"107",
            "type":"lstring",
            "title": nr4Data.Article18_questions18_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article19",
      "title": nr4Data.Article19_title,
      "questions":[
         {
            "key":"Q108",
            "section":"Article19",
            "number":"108",
            "type":"option",
            "title": nr4Data.Article19_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               },
               {
                  "value":"false.noCna",
                  "title": nr4Data.Article19_questions0_options2_title
               },
               {
                  "value":"false.oneCna",
                  "title": nr4Data.Article19_questions0_options3_title
               }
            ]
         },
         {
            "key":"Q109",
            "section":"Article19",
            "number":"109",
            "type":"option",
            "title": nr4Data.Article19_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article19_questions1_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q110",
            "section":"Article19",
            "number":"110",
            "type":"option",
            "title": nr4Data.Article19_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q111",
            "section":"Article19",
            "number":"111",
            "type":"lstring",
            "title": nr4Data.Article19_questions3_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article20",
      "title": nr4Data.Article20_title,
      "questions":[
         {
            "key":"Q112",
            "section":"Article20",
            "number":"112",
            "type":"sub-section",
            "title": nr4Data.Article20_questions0_title,
            "questions":[
               {
                  "key":"Q112_a",
                  "section":"Article20",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions0_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions0_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions0_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions0_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_b",
                  "section":"Article20",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions1_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions1_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions1_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions1_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_c",
                  "section":"Article20",
                  "number":"c",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions2_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions2_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions2_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions2_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions2_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_d",
                  "section":"Article20",
                  "number":"d",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions3_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions3_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions3_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions3_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions3_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_e",
                  "section":"Article20",
                  "number":"e",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions4_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions4_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions4_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions4_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions4_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_f",
                  "section":"Article20",
                  "number":"f",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions5_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions5_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions5_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions5_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions5_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_g",
                  "section":"Article20",
                  "number":"g",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions6_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions6_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions6_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions6_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions6_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_h",
                  "section":"Article20",
                  "number":"h",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions7_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions7_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions7_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions7_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions7_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_i",
                  "section":"Article20",
                  "number":"i",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions8_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions8_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions8_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions8_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions8_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_j",
                  "section":"Article20",
                  "number":"j",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions9_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions9_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions9_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions9_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions9_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_k",
                  "section":"Article20",
                  "number":"k",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions10_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions10_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions10_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions10_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions10_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_l",
                  "section":"Article20",
                  "number":"l",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions11_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions11_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions11_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions11_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions11_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_m",
                  "section":"Article20",
                  "number":"m",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions12_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions12_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions12_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions12_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions12_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_n",
                  "section":"Article20",
                  "number":"n",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions13_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions13_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions13_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions13_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions13_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_o",
                  "section":"Article20",
                  "number":"o",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions14_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions14_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions14_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions14_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions14_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_p",
                  "section":"Article20",
                  "number":"p",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions15_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions15_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions15_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions15_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions15_options3_title
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q112_q",
                  "section":"Article20",
                  "number":"q",
                  "type":"option",
                  "title": nr4Data.Article20_questions0_questions16_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true.availableOnBch",
                        "title": nr4Data.Article20_questions0_questions16_options0_title
                     },
                     {
                        "value":"true.availableNotOnBch",
                        "title": nr4Data.Article20_questions0_questions16_options1_title
                     },
                     {
                        "value":"true.availablePartialyOnBch",
                        "title": nr4Data.Article20_questions0_questions16_options2_title
                     },
                     {
                        "value":"false.notAvailable",
                        "title": nr4Data.Article20_questions0_questions16_options3_title
                     }
                  ],
                  "mandatory":true
               }
            ]
         },
         {
            "key":"Q113",
            "section":"Article20",
            "number":"113",
            "type":"lstring",
            "title": nr4Data.Article20_questions1_title,
            "multiple":false
         },
         {
            "key":"Q114",
            "section":"Article20",
            "number":"114",
            "type":"option",
            "title": nr4Data.Article20_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article20_questions2_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q115",
            "section":"Article20",
            "number":"115",
            "type":"option",
            "title": nr4Data.Article20_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article20_questions3_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q116",
            "section":"Article20",
            "number":"116",
            "type":"option",
            "title": nr4Data.Article20_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article20_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article20_questions4_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               },
               {
                  "value":"false.na",
                  "title": nr4Data.Article20_questions4_options3_title
               }
            ]
         },
         {
            "key":"Q117",
            "section":"Article20",
            "number":"117",
            "type":"option",
            "title": nr4Data.Article20_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q118",
            "section":"Article20",
            "number":"118",
            "type":"option",
            "title": nr4Data.Article20_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article20_questions6_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article20_questions6_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article20_questions6_options3_title
               },
               {
                  "value":"25+",
                  "title": nr4Data.Article20_questions6_options4_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q119",
            "section":"Article20",
            "number":"119",
            "type":"option",
            "title": nr4Data.Article20_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article20_questions7_options1_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article20_questions7_options2_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article20_questions7_options3_title
               },
               {
                  "value":"100+",
                  "title": nr4Data.Article20_questions7_options4_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q120",
            "section":"Article20",
            "number":"120",
            "type":"lstring",
            "title": nr4Data.Article20_questions8_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article21",
      "title": nr4Data.Article21_title,
      "questions":[
         {
            "key":"Q121",
            "section":"Article21",
            "number":"121",
            "type":"option",
            "title": nr4Data.Article21_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article21_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q122",
            "section":"Article21",
            "number":"122",
            "type":"option",
            "title": nr4Data.Article21_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article21_questions1_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article21_questions1_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q123",
            "section":"Article21",
            "number":"123",
            "type":"lstring",
            "title": nr4Data.Article21_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article22",
      "title": nr4Data.Article22_title,
      "questions":[
         {
            "key":"Q124",
            "section":"Article22",
            "number":"124",
            "type":"option",
            "title": nr4Data.Article22_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article22_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q125",
            "section":"Article22",
            "number":"125",
            "type":"option",
            "title": nr4Data.Article22_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article22_questions1_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q126",
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
            "key":"Q126",
            "section":"Article22",
            "number":"126",
            "type":"option",
            "title": nr4Data.Article22_questions2_title,
            "multiple":true,
            "options":[
               {
                  "value":"channels.bilateral",
                  "title": nr4Data.Article22_questions2_options0_title
               },
               {
                  "value":"channels.regional",
                  "title": nr4Data.Article22_questions2_options1_title
               },
               {
                  "value":"channels.multilateral",
                  "title": nr4Data.Article22_questions2_options2_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q127",
            "section":"Article22",
            "number":"127",
            "type":"option",
            "title": nr4Data.Article22_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article22_questions3_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q128",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q128",
            "section":"Article22",
            "number":"128",
            "type":"option",
            "title": nr4Data.Article22_questions4_title,
            "multiple":true,
            "options":[
               {
                  "value":"channels.bilateral",
                  "title": nr4Data.Article22_questions4_options0_title
               },
               {
                  "value":"channels.regional",
                  "title": nr4Data.Article22_questions4_options1_title
               },
               {
                  "value":"channels.multilateral",
                  "title": nr4Data.Article22_questions4_options2_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q129",
            "section":"Article22",
            "number":"129",
            "type":"option",
            "title": nr4Data.Article22_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q130",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q130",
            "section":"Article22",
            "number":"130",
            "type":"option",
            "title": nr4Data.Article22_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"veryEasy",
                  "title": nr4Data.Article22_questions6_options0_title
               },
               {
                  "value":"easy",
                  "title": nr4Data.Article22_questions6_options1_title
               },
               {
                  "value":"average",
                  "title": nr4Data.Article22_questions6_options2_title
               },
               {
                  "value":"difficult",
                  "title": nr4Data.Article22_questions6_options3_title
               },
               {
                  "value":"veryDifficult",
                  "title": nr4Data.Article22_questions6_options4_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q131",
            "section":"Article22",
            "number":"131",
            "type":"term",
            "title": nr4Data.Article22_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article22_questions7_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q132",
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
            "key":"Q132",
            "section":"Article22",
            "number":"132",
            "type":"term",
            "title": nr4Data.Article22_questions8_title,
            "multiple":true,
            "options":[
               {
                  "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                  "title": nr4Data.Article22_questions8_options0_title
               },
               {
                  "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                  "title": nr4Data.Article22_questions8_options1_title
               },
               {
                  "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                  "title": nr4Data.Article22_questions8_options2_title
               },
               {
                  "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                  "title": nr4Data.Article22_questions8_options3_title
               },
               {
                  "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                  "title": nr4Data.Article22_questions8_options4_title
               },
               {
                  "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                  "title": nr4Data.Article22_questions8_options5_title
               },
               {
                  "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                  "title": nr4Data.Article22_questions8_options6_title
               },
               {
                  "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                  "title": nr4Data.Article22_questions8_options7_title
               },
               {
                  "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                  "title": nr4Data.Article22_questions8_options8_title
               },
               {
                  "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                  "title": nr4Data.Article22_questions8_options9_title
               },
               {
                  "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                  "title": nr4Data.Article22_questions8_options10_title
               },
               {
                  "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                  "title": nr4Data.Article22_questions8_options11_title
               },
               {
                  "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                  "title": nr4Data.Article22_questions8_options12_title
               },
               {
                  "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                  "title": nr4Data.Article22_questions8_options13_title
               },
               {
                  "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                  "title": nr4Data.Article22_questions8_options14_title
               },
               {
                  "value":"667CD9B1-4571-4C2A-A459-F78E004D7D96",
                  "title": nr4Data.Article22_questions8_options15_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q133",
            "section":"Article22",
            "number":"133",
            "type":"option",
            "title": nr4Data.Article22_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q134",
            "section":"Article22",
            "number":"134",
            "type":"option",
            "title": nr4Data.Article22_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q135",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q135",
            "section":"Article22",
            "number":"135",
            "type":"term",
            "title": nr4Data.Article22_questions11_title,
            "multiple":true,
            "options":[
               {
                  "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                  "title": nr4Data.Article22_questions11_options0_title
               },
               {
                  "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                  "title": nr4Data.Article22_questions11_options1_title
               },
               {
                  "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                  "title": nr4Data.Article22_questions11_options2_title
               },
               {
                  "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                  "title": nr4Data.Article22_questions11_options3_title
               },
               {
                  "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                  "title": nr4Data.Article22_questions11_options4_title
               },
               {
                  "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                  "title": nr4Data.Article22_questions11_options5_title
               },
               {
                  "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                  "title": nr4Data.Article22_questions11_options6_title
               },
               {
                  "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                  "title": nr4Data.Article22_questions11_options7_title
               },
               {
                  "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                  "title": nr4Data.Article22_questions11_options8_title
               },
               {
                  "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                  "title": nr4Data.Article22_questions11_options9_title
               },
               {
                  "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                  "title": nr4Data.Article22_questions11_options10_title
               },
               {
                  "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                  "title": nr4Data.Article22_questions11_options11_title
               },
               {
                  "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                  "title": nr4Data.Article22_questions11_options12_title
               },
               {
                  "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                  "title": nr4Data.Article22_questions11_options13_title
               },
               {
                  "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                  "title": nr4Data.Article22_questions11_options14_title
               },
               {
                  "value":"667CD9B1-4571-4C2A-A459-F78E004D7D96",
                  "title": nr4Data.Article22_questions11_options15_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q136",
            "section":"Article22",
            "number":"136",
            "type":"option",
            "title": nr4Data.Article22_questions12_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q137",
            "section":"Article22",
            "number":"137",
            "type":"option",
            "title": nr4Data.Article22_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q138",
            "section":"Article22",
            "number":"138",
            "type":"lstring",
            "title": nr4Data.Article22_questions14_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article23",
      "title": nr4Data.Article23_title,
      "questions":[
         {
            "key":"Q139",
            "section":"Article23",
            "number":"139",
            "type":"option",
            "title": nr4Data.Article23_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article23_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q140",
            "section":"Article23",
            "number":"140",
            "type":"option",
            "title": nr4Data.Article23_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q141",
            "section":"Article23",
            "number":"141",
            "type":"option",
            "title": nr4Data.Article23_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article23_questions2_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q142",
            "section":"Article23",
            "number":"142",
            "type":"option",
            "title": nr4Data.Article23_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q143",
            "section":"Article23",
            "number":"143",
            "type":"option",
            "title": nr4Data.Article23_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q144",
            "section":"Article23",
            "number":"144",
            "type":"option",
            "title": nr4Data.Article23_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q145",
            "section":"Article23",
            "number":"145",
            "type":"option",
            "title": nr4Data.Article23_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article23_questions6_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article23_questions6_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article23_questions6_options3_title
               }
            ],
            "validations":[
               {
                  "question":"Q145_adq",
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
            "key":"Q145_adq",
            "section":"Article23",
            "number":"",
            "type":"option",
            "title": nr4Data.Article23_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q146",
            "section":"Article23",
            "number":"146",
            "type":"option",
            "title": nr4Data.Article23_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article23_questions8_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article23_questions8_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article23_questions8_options3_title
               },
               {
                  "value":"25+",
                  "title": nr4Data.Article23_questions8_options4_title
               },
               {
                  "value":"100+",
                  "title": nr4Data.Article23_questions8_options5_title
               }
            ],
            "validations":[
               {
                  "question":"Q146_adq",
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
            "key":"Q146_adq",
            "section":"Article23",
            "number":"",
            "type":"option",
            "title": nr4Data.Article23_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q147",
            "section":"Article23",
            "number":"147",
            "type":"option",
            "title": nr4Data.Article23_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article23_questions10_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q148",
            "section":"Article23",
            "number":"148",
            "type":"option",
            "title": nr4Data.Article23_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article23_questions11_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q149",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q149",
            "section":"Article23",
            "number":"149",
            "type":"term",
            "title": nr4Data.Article23_questions12_title,
            "multiple":true,
            "options":[
               {
                  "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                  "title": nr4Data.Article23_questions12_options0_title
               },
               {
                  "value":"6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                  "title": nr4Data.Article23_questions12_options1_title
               },
               {
                  "value":"38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                  "title": nr4Data.Article23_questions12_options2_title
               },
               {
                  "value":"E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                  "title": nr4Data.Article23_questions12_options3_title
               },
               {
                  "value":"51792A07-B3C0-4F7B-830E-0741635F57BB",
                  "title": nr4Data.Article23_questions12_options4_title
               },
               {
                  "value":"887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                  "title": nr4Data.Article23_questions12_options5_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q150",
            "section":"Article23",
            "number":"150",
            "type":"option",
            "title": nr4Data.Article23_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.Article23_questions13_options0_title
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article23_questions13_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article23_questions13_options2_title
               },
               {
                  "value":"na",
                  "title": nr4Data.Article23_questions13_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q151",
            "section":"Article23",
            "number":"151",
            "type":"option",
            "title": nr4Data.Article23_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q152",
            "section":"Article23",
            "number":"152",
            "type":"lstring",
            "title": nr4Data.Article23_questions15_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article24",
      "title": nr4Data.Article24_title,
      "questions":[
         {
            "key":"Q153",
            "section":"Article24",
            "number":"153",
            "type":"option",
            "title": nr4Data.Article24_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q154",
            "section":"Article24",
            "number":"154",
            "type":"option",
            "title": nr4Data.Article24_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q156",
                  "type":"&is154Or155",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q155",
            "section":"Article24",
            "number":"155",
            "type":"option",
            "title": nr4Data.Article24_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q156",
                  "type":"&is154Or155",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q156",
            "section":"Article24",
            "number":"156",
            "type":"option",
            "title": nr4Data.Article24_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article24_questions3_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article24_questions3_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q157",
            "section":"Article24",
            "number":"157",
            "type":"lstring",
            "title": nr4Data.Article24_questions4_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article25",
      "title": nr4Data.Article25_title,
      "footnote": nr4Data.Article25_footnote,
      "questions":[
         {
            "key":"Q158",
            "section":"Article25",
            "number":"158",
            "type":"option",
            "title": nr4Data.Article25_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article25_questions0_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q159",
            "section":"Article25",
            "number":"159",
            "type":"option",
            "title": nr4Data.Article25_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article25_questions1_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article25_questions1_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article25_questions1_options3_title
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q160",
                  "values":[
                     "0"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q160",
            "section":"Article25",
            "number":"160",
            "type":"option",
            "title": nr4Data.Article25_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article25_questions2_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q161",
            "section":"Article25",
            "number":"161",
            "type":"lstring",
            "title": nr4Data.Article25_questions3_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article26",
      "title": nr4Data.Article26_title,
      "questions":[
         {
            "key":"Q162",
            "section":"Article26",
            "number":"162",
            "type":"option",
            "title": nr4Data.Article26_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q163",
            "section":"Article26",
            "number":"163",
            "type":"option",
            "title": nr4Data.Article26_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Article26_questions1_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr4Data.Article26_questions1_options1_title
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               },
               {
                  "value":"false.na",
                  "title": nr4Data.Article26_questions1_options3_title
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q164",
            "section":"Article26",
            "number":"164",
            "type":"option",
            "title": nr4Data.Article26_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr4Data.None
               },
               {
                  "value":"1+",
                  "title": nr4Data.Article26_questions2_options1_title
               },
               {
                  "value":"5+",
                  "title": nr4Data.Article26_questions2_options2_title
               },
               {
                  "value":"10+",
                  "title": nr4Data.Article26_questions2_options3_title
               },
               {
                  "value":"50+",
                  "title": nr4Data.Article26_questions2_options4_title
               }
            ],
            "validations":[
               {
                  "question":"Q164_adq",
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
            "key":"Q164_adq",
            "section":"Article26",
            "number":"",
            "type":"option",
            "title": nr4Data.Article26_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q165",
            "section":"Article26",
            "number":"165",
            "type":"option",
            "title": nr4Data.Article26_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q166",
            "section":"Article26",
            "number":"166",
            "type":"lstring",
            "title": nr4Data.Article26_questions5_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article28",
      "title": nr4Data.Article28_title,
      "questions":[
         {
            "key":"Q167",
            "section":"Article28",
            "number":"167",
            "type":"option",
            "title": nr4Data.Article28_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"USD0",
                  "title": nr4Data.Article28_questions0_options0_title
               },
               {
                  "value":"USD1-4999",
                  "title": nr4Data.Article28_questions0_options1_title
               },
               {
                  "value":"USD5000-49999",
                  "title": nr4Data.Article28_questions0_options2_title
               },
               {
                  "value":"USD50000-99999",
                  "title": nr4Data.Article28_questions0_options3_title
               },
               {
                  "value":"USD100000-499000",
                  "title": nr4Data.Article28_questions0_options4_title
               },
               {
                  "value":"USD500000+",
                  "title": nr4Data.Article28_questions0_options5_title
               }
            ],
            "mandatory":true
         }
      ]
   },
   {
      "key":"Article33",
      "title": nr4Data.Article33_title,
      "description": nr4Data.Article33_description,
      "questions":[
         {
            "key":"Q168",
            "section":"Article33",
            "number":"168",
            "type":"option",
            "title": nr4Data.Article33_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         }
      ]
   },
   {
      "key":"LiabilityRedress",
      "title": nr4Data.LiabilityRedress_title,
      "description": nr4Data.LiabilityRedress_description,
      "questions":[
         {
            "key":"Q169",
            "section":"LiabilityRedress",
            "number":"169",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true,
            "validations":[
               {
                  "question":"Q170",
                  "values":[
                     "false"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q170",
            "section":"LiabilityRedress",
            "number":"170",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "mandatory":true
         },
         {
            "key":"Q171",
            "section":"LiabilityRedress",
            "number":"171",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"74B17D51-786F-3D68-3B76-A50121842925",
                  "title": nr4Data.LiabilityRedress_questions2_options0_title
               },
               {
                  "value":"FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                  "title": nr4Data.LiabilityRedress_questions2_options1_title
               },
               {
                  "value":"EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                  "title": nr4Data.LiabilityRedress_questions2_options2_title
               },
               {
                  "value":"2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                  "title": nr4Data.LiabilityRedress_questions2_options3_title
               },
               {
                  "value":"C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                  "title": nr4Data.LiabilityRedress_questions2_options4_title
               }
            ],
            "validations":[
               {
                  "question":"Q172",
                  "values":[
                     "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9"
                  ],
                  "type":"@hasValuesExcept",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q172",
            "section":"LiabilityRedress",
            "number":"172",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                  "title": nr4Data.LiabilityRedress_questions3_options0_title,
                  "type":"lstring"
               },
               {
                  "value":"0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                  "title": nr4Data.LiabilityRedress_questions3_options1_title,
                  "type":"lstring"
               },
               {
                  "value":"BA743C79-B202-4611-16C4-2C7D4678ACEB",
                  "title": nr4Data.LiabilityRedress_questions3_options2_title,
                  "type":"lstring"
               },
               {
                  "value":"9067DB5B-E33B-655D-83A3-32D4D562618F",
                  "title": nr4Data.LiabilityRedress_questions3_options3_title
               }
            ]
         },
         {
            "key":"Q173",
            "section":"LiabilityRedress",
            "number":"173",
            "type":"sub-section",
            "title": nr4Data.LiabilityRedress_questions4_title,
            "multiple":false,
            "questions":[
               {
                  "key":"Q173_a",
                  "section":"LiabilityRedress",
                  "number":"a",
                  "type":"option",
                  "title": nr4Data.LiabilityRedress_questions4_questions0_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "validations":[
                     {
                        "question":"Q174",
                        "values":[
                           "true"
                        ],
                        "type":"@hasValues",
                        "trigger":"enable"
                     },
                     {
                        "question":"Q175",
                        "values":[
                           "true"
                        ],
                        "type":"@hasValues",
                        "trigger":"enable"
                     },
                     {
                        "question":"Q176",
                        "values":[
                           "true"
                        ],
                        "type":"&is173aOr173b",
                        "trigger":"enable"
                     }
                  ],
                  "mandatory":true
               },
               {
                  "key":"Q173_b",
                  "section":"LiabilityRedress",
                  "number":"b",
                  "type":"option",
                  "title": nr4Data.LiabilityRedress_questions4_questions1_title,
                  "multiple":false,
                  "options":[
                     {
                        "value":"true",
                        "title": nr4Data.Yes
                     },
                     {
                        "value":"false",
                        "title": nr4Data.No
                     }
                  ],
                  "validations":[
                     {
                        "question":"Q176",
                        "values":[
                           "true"
                        ],
                        "type":"&is173aOr173b",
                        "trigger":"enable"
                     }
                  ],
                  "mandatory":true
               }
            ]
         },
         {
            "key":"Q174",
            "section":"LiabilityRedress",
            "number":"174",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions5_title,
            "multiple":true,
            "options":[
               {
                  "value":"true.inform",
                  "title": nr4Data.LiabilityRedress_questions5_options0_title
               },
               {
                  "value":"true.evaluate",
                  "title": nr4Data.LiabilityRedress_questions5_options1_title
               },
               {
                  "value":"true.response",
                  "title": nr4Data.LiabilityRedress_questions5_options2_title
               },
               {
                  "value":"true.other",
                  "title": nr4Data.LiabilityRedress_questions5_options3_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q175",
            "section":"LiabilityRedress",
            "number":"175",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q176",
            "section":"LiabilityRedress",
            "number":"176",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q177",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q177",
            "section":"LiabilityRedress",
            "number":"177",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions8_title,
            "multiple":true,
            "options":[
               {
                  "value":"8F627A99-7CD4-D892-80EA-12C58607508F",
                  "title": nr4Data.LiabilityRedress_questions8_options0_title
               },
               {
                  "value":"888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                  "title": nr4Data.LiabilityRedress_questions8_options1_title
               },
               {
                  "value":"B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                  "title": nr4Data.LiabilityRedress_questions8_options2_title
               },
               {
                  "value":"ADEF00D6-0901-8750-1069-5CBA877011CC",
                  "title": nr4Data.LiabilityRedress_questions8_options3_title
               },
               {
                  "value":"3F54E971-E791-FE00-5312-F7FF07C818B1",
                  "title": nr4Data.LiabilityRedress_questions8_options4_title
               },
               {
                  "value":"2D8B29DD-0703-6130-BE79-389F5278C21D",
                  "title": nr4Data.LiabilityRedress_questions8_options5_title
               },
               {
                  "value":"D475D239-517E-9D8B-E1F9-4C453039C792",
                  "title": nr4Data.LiabilityRedress_questions8_options6_title
               },
               {
                  "value":"8BD75295-88DF-2A32-A150-1132670E19A9",
                  "title": nr4Data.LiabilityRedress_questions8_options7_title
               },
               {
                  "value":"58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                  "title": nr4Data.LiabilityRedress_questions8_options8_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key":"Q178",
            "section":"LiabilityRedress",
            "number":"178",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q179",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q179",
            "section":"LiabilityRedress",
            "number":"179",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions10_title,
            "multiple":true,
            "options":[
               {
                  "value":"2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                  "title": nr4Data.LiabilityRedress_questions10_options0_title
               },
               {
                  "value":"6065EDB8-C5A4-BA81-5271-B2F93159A471",
                  "title": nr4Data.LiabilityRedress_questions10_options1_title
               },
               {
                  "value":"A038303D-7049-E34F-8381-5B59702BBCF6",
                  "title": nr4Data.LiabilityRedress_questions10_options2_title
               },
               {
                  "value":"9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                  "title": nr4Data.LiabilityRedress_questions10_options3_title
               },
               {
                  "value":"34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                  "title": nr4Data.LiabilityRedress_questions10_options4_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key":"Q180",
            "section":"LiabilityRedress",
            "number":"180",
            "type":"option",
            "title": nr4Data.LiabilityRedress_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q181",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q181",
            "section":"LiabilityRedress",
            "number":"181",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions12_title,
            "multiple":true,
            "options":[
               {
                  "value":"69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                  "title": nr4Data.LiabilityRedress_questions12_options0_title
               },
               {
                  "value":"D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                  "title": nr4Data.LiabilityRedress_questions12_options1_title
               },
               {
                  "value":"89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                  "title": nr4Data.LiabilityRedress_questions12_options2_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr4Data.Other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key":"Q182",
            "section":"LiabilityRedress",
            "number":"182",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions13_title,
            "multiple":true,
            "options":[
               {
                  "value":"878DF5F5-0B5E-48E1-6A42-80867A101675",
                  "title": nr4Data.LiabilityRedress_questions13_options0_title
               },
               {
                  "value":"0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                  "title": nr4Data.LiabilityRedress_questions13_options1_title
               },
               {
                  "value":"true",
                  "title": nr4Data.LiabilityRedress_questions13_options2_title,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q183",
            "section":"LiabilityRedress",
            "number":"183",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ],
            "validations":[
               {
                  "question":"Q184",
                  "values":[
                     "true"
                  ],
                  "type":"@hasValues",
                  "trigger":"enable"
               }
            ]
         },
         {
            "key":"Q184",
            "section":"LiabilityRedress",
            "number":"184",
            "type":"term",
            "title": nr4Data.LiabilityRedress_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr4Data.Yes,
                  "type":"lstring"
               },
               {
                  "value":"false",
                  "title": nr4Data.No
               }
            ]
         },
         {
            "key":"Q185",
            "section":"LiabilityRedress",
            "number":"185",
            "type":"lstring",
            "title": nr4Data.LiabilityRedress_questions16_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"AdditionalInformation",
      "title": nr4Data.AdditionalInformation_title,
      "questions":[
         {
            "key":"Q186",
            "section":"AdditionalInformation",
            "number":"186",
            "type":"lstring",
            "title": nr4Data.AdditionalInformation_questions0_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Comments",
      "title": nr4Data.Comments_title,
      "questions":[
         {
            "key":"Q187",
            "section":"Comments",
            "number":"187",
            "type":"lstring",
            "title": nr4Data.Comments_questions0_title,
            "multiple":false
         }
      ]
   }
]