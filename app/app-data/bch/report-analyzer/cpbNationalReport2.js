import nr2Data from '~/app-text/app-data/bch/report-analyzer/cpbNationalReport2.json'

export const cpbNationalReport2 = [
   {
      "key":"General",
      "title": nr2Data.General_title,
      "questions":[
         {
            "key":"Q012",
            "section":"General",
            "number":"12",
            "type":"option",
            "title": nr2Data.General_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q013",
            "section":"General",
            "number":"13",
            "type":"option",
            "title": nr2Data.General_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q014",
            "section":"General",
            "number":"14",
            "type":"text",
            "title": nr2Data.General_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article2",
      "title": nr2Data.Article2_title,
      "questions":[
         {
            "key":"Q015",
            "section":"Article2",
            "number":"15",
            "type":"option",
            "title": nr2Data.Article2_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"implementation.fullFramwork",
                  "title": nr2Data.Article2_questions0_options0_title
               },
               {
                  "value":"implementation.partialFramwork",
                  "title": nr2Data.Article2_questions0_options1_title
               },
               {
                  "value":"implementation.temporaryMeasures",
                  "title": nr2Data.Article2_questions0_options2_title
               },
               {
                  "value":"implementation.draftFramwork",
                  "title": nr2Data.Article2_questions0_options3_title
               },
               {
                  "value":"implementation.none",
                  "title": nr2Data.Article2_questions0_options4_title
               }
            ]
         },
         {
            "key":"Q016",
            "section":"Article2",
            "number":"16",
            "type":"option",
            "title": nr2Data.Article2_questions1_title,
            "multiple":true,
            "options":[
               {
                  "value":"instrument.nationalBiosafetyLaws",
                  "title": nr2Data.Article2_questions1_options0_title
               },
               {
                  "value":"instrument.nationalBiosafetyRegulations",
                  "title": nr2Data.Article2_questions1_options1_title
               },
               {
                  "value":"instrument.biosafetyGuidelines",
                  "title": nr2Data.Article2_questions1_options2_title
               },
               {
                  "value":"instrument.indirectLaws",
                  "title": nr2Data.Article2_questions1_options3_title
               },
               {
                  "value":"instrument.none",
                  "title": nr2Data.Article2_questions1_options4_title
               }
            ]
         },
         {
            "key":"Q017",
            "section":"Article2",
            "number":"17",
            "type":"option",
            "title": nr2Data.Article2_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q018",
            "section":"Article2",
            "number":"18",
            "type":"option",
            "title": nr2Data.Article2_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q019",
            "section":"Article2",
            "number":"19",
            "type":"option",
            "title": nr2Data.Article2_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"1",
                  "title": nr2Data.Article2_questions4_options0_title
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article2_questions4_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article2_questions4_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article2_questions4_options3_title
               }
            ]
         },
         {
            "key":"Q020",
            "section":"Article2",
            "number":"20",
            "type":"option",
            "title": nr2Data.Article2_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article2_questions5_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q021",
            "section":"Article2",
            "number":"21",
            "type":"text",
            "title": nr2Data.Article2_questions6_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article5",
      "title": nr2Data.Article5_title,
      "questions":[
         {
            "key":"Q022",
            "section":"Article5",
            "number":"22",
            "type":"option",
            "title": nr2Data.Article5_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article5_questions0_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q023",
            "section":"Article5",
            "number":"23",
            "type":"option",
            "title": nr2Data.Article5_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article5_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q024",
            "section":"Article5",
            "number":"24",
            "type":"text",
            "title": nr2Data.Article5_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article6",
      "title": nr2Data.Article6_title,
      "questions":[
         {
            "key":"Q025",
            "section":"Article6",
            "number":"25",
            "type":"option",
            "title": nr2Data.Article6_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q026",
            "section":"Article6",
            "number":"26",
            "type":"option",
            "title": nr2Data.Article6_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q027",
            "section":"Article6",
            "number":"27",
            "type":"option",
            "title": nr2Data.Article6_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article6_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q028",
            "section":"Article6",
            "number":"28",
            "type":"text",
            "title": nr2Data.Article6_questions3_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Articles7-10",
      "title": nr2Data.Articles7_10_title,
      "questions":[
         {
            "key":"Q029",
            "section":"Articles7-10",
            "number":"29",
            "type":"option",
            "title": nr2Data.Articles7_10_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q030",
            "section":"Articles7-10",
            "number":"30",
            "type":"option",
            "title": nr2Data.Articles7_10_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q031",
            "section":"Articles7-10",
            "number":"31",
            "type":"option",
            "title": nr2Data.Articles7_10_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q032",
            "section":"Articles7-10",
            "number":"32",
            "type":"option",
            "title": nr2Data.Articles7_10_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q033",
            "section":"Articles7-10",
            "number":"33",
            "type":"option",
            "title": nr2Data.Articles7_10_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q034",
            "section":"Articles7-10",
            "number":"34",
            "type":"option",
            "title": nr2Data.Articles7_10_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions5_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q035",
            "section":"Articles7-10",
            "number":"35",
            "type":"option",
            "title": nr2Data.Articles7_10_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q036",
            "section":"Articles7-10",
            "number":"36",
            "type":"option",
            "title": nr2Data.Articles7_10_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q037",
            "section":"Articles7-10",
            "number":"37",
            "type":"option",
            "title": nr2Data.Articles7_10_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q038",
            "section":"Articles7-10",
            "number":"38",
            "type":"option",
            "title": nr2Data.Articles7_10_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q039",
            "section":"Articles7-10",
            "number":"39",
            "type":"option",
            "title": nr2Data.Articles7_10_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Articles7_10_questions10_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Articles7_10_questions10_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Articles7_10_questions10_options3_title
               }
            ]
         },
         {
            "key":"Q040",
            "section":"Articles7-10",
            "number":"40",
            "type":"option",
            "title": nr2Data.Articles7_10_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Articles7_10_questions11_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Articles7_10_questions11_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Articles7_10_questions11_options3_title
               }
            ]
         },
         {
            "key":"Q041",
            "section":"Articles7-10",
            "number":"41",
            "type":"option",
            "title": nr2Data.Articles7_10_questions12_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Articles7_10_questions12_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Articles7_10_questions12_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Articles7_10_questions12_options3_title
               }
            ]
         },
         {
            "key":"Q042",
            "section":"Articles7-10",
            "number":"42",
            "type":"option",
            "title": nr2Data.Articles7_10_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Articles7_10_questions13_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Articles7_10_questions13_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Articles7_10_questions13_options3_title
               }
            ]
         },
         {
            "key":"Q043",
            "section":"Articles7-10",
            "number":"43",
            "type":"option",
            "title": nr2Data.Articles7_10_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions14_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions14_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q044",
            "section":"Articles7-10",
            "number":"44",
            "type":"option",
            "title": nr2Data.Articles7_10_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions15_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions15_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q045",
            "section":"Articles7-10",
            "number":"45",
            "type":"option",
            "title": nr2Data.Articles7_10_questions16_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions16_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions16_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q046",
            "section":"Articles7-10",
            "number":"46",
            "type":"option",
            "title": nr2Data.Articles7_10_questions17_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions17_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions17_options1_title
               },
               {
                  "value":"true.some.notifier",
                  "title": nr2Data.Articles7_10_questions17_options2_title
               },
               {
                  "value":"true.some.bch",
                  "title": nr2Data.Articles7_10_questions17_options3_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q047",
            "section":"Articles7-10",
            "number":"47",
            "type":"option",
            "title": nr2Data.Articles7_10_questions18_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions18_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions18_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q048",
            "section":"Articles7-10",
            "number":"48",
            "type":"term",
            "title": nr2Data.Articles7_10_questions19_title,
            "multiple":true,
            "options":[
               {
                  "value":"3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                  "title": nr2Data.Articles7_10_questions19_options0_title
               },
               {
                  "value":"3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                  "title": nr2Data.Articles7_10_questions19_options1_title
               },
               {
                  "value":"6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                  "title": nr2Data.Articles7_10_questions19_options2_title
               },
               {
                  "value":"8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                  "title": nr2Data.Articles7_10_questions19_options3_title
               },
               {
                  "value":"19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                  "title": nr2Data.Articles7_10_questions19_options4_title
               }
            ]
         },
         {
            "key":"Q049",
            "section":"Articles7-10",
            "number":"49",
            "type":"option",
            "title": nr2Data.Articles7_10_questions20_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Articles7_10_questions20_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Articles7_10_questions20_options1_title
               },
               {
                  "value":"true.some.notifier",
                  "title": nr2Data.Articles7_10_questions20_options2_title
               },
               {
                  "value":"true.some.bch",
                  "title": nr2Data.Articles7_10_questions20_options3_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q050",
            "section":"Articles7-10",
            "number":"50",
            "type":"text",
            "title": nr2Data.Articles7_10_questions21_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article11",
      "title": nr2Data.Article11_title,
      "questions":[
         {
            "key":"Q051",
            "section":"Article11",
            "number":"51",
            "type":"option",
            "title": nr2Data.Article11_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q052",
            "section":"Article11",
            "number":"52",
            "type":"option",
            "title": nr2Data.Article11_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q053",
            "section":"Article11",
            "number":"53",
            "type":"option",
            "title": nr2Data.Article11_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q054",
            "section":"Article11",
            "number":"54",
            "type":"option",
            "title": nr2Data.Article11_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q055",
            "section":"Article11",
            "number":"55",
            "type":"option",
            "title": nr2Data.Article11_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q056",
            "section":"Article11",
            "number":"56",
            "type":"option",
            "title": nr2Data.Article11_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q057",
            "section":"Article11",
            "number":"57",
            "type":"option",
            "title": nr2Data.Article11_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q058",
            "section":"Article11",
            "number":"58",
            "type":"option",
            "title": nr2Data.Article11_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article11_questions7_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article11_questions7_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article11_questions7_options3_title
               }
            ]
         },
         {
            "key":"Q059",
            "section":"Article11",
            "number":"59",
            "type":"option",
            "title": nr2Data.Article11_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article11_questions8_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article11_questions8_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article11_questions8_options3_title
               }
            ]
         },
         {
            "key":"Q060",
            "section":"Article11",
            "number":"60",
            "type":"option",
            "title": nr2Data.Article11_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article11_questions9_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article11_questions9_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article11_questions9_options3_title
               }
            ]
         },
         {
            "key":"Q061",
            "section":"Article11",
            "number":"61",
            "type":"option",
            "title": nr2Data.Article11_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article11_questions10_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article11_questions10_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q062",
            "section":"Article11",
            "number":"62",
            "type":"option",
            "title": nr2Data.Article11_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article11_questions11_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article11_questions11_options1_title
               },
               {
                  "value":"true.delay",
                  "title": nr2Data.Article11_questions11_options2_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q063",
            "section":"Article11",
            "number":"63",
            "type":"text",
            "title": nr2Data.Article11_questions12_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article12",
      "title": nr2Data.Article12_title,
      "questions":[
         {
            "key":"Q064",
            "section":"Article12",
            "number":"64",
            "type":"option",
            "title": nr2Data.Article12_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q065",
            "section":"Article12",
            "number":"65",
            "type":"option",
            "title": nr2Data.Article12_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q066",
            "section":"Article12",
            "number":"66",
            "type":"option",
            "title": nr2Data.Article12_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.reviewed",
                  "title": nr2Data.Article12_questions2_options0_title
               },
               {
                  "value":"true.changed",
                  "title": nr2Data.Article12_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q067",
            "section":"Article12",
            "number":"67",
            "type":"option",
            "title": nr2Data.Article12_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article12_questions3_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Article12_questions3_options2_title
               }
            ]
         },
         {
            "key":"Q068",
            "section":"Article12",
            "number":"68",
            "type":"option",
            "title": nr2Data.Article12_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article12_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article12_questions4_options1_title
               },
               {
                  "value":"true.some.notifier",
                  "title": nr2Data.Article12_questions4_options2_title
               },
               {
                  "value":"true.some.bch",
                  "title": nr2Data.Article12_questions4_options3_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q069",
            "section":"Article12",
            "number":"69",
            "type":"option",
            "title": nr2Data.Article12_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article12_questions5_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article12_questions5_options1_title
               },
               {
                  "value":"true.delay",
                  "title": nr2Data.Article12_questions5_options2_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q070",
            "section":"Article12",
            "number":"70",
            "type":"option",
            "title": nr2Data.Article12_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article12_questions6_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article12_questions6_options1_title
               },
               {
                  "value":"true.some.notifier",
                  "title": nr2Data.Article12_questions6_options2_title
               },
               {
                  "value":"true.some.bch",
                  "title": nr2Data.Article12_questions6_options3_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q071",
            "section":"Article12",
            "number":"71",
            "type":"text",
            "title": nr2Data.Article12_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article13",
      "title": nr2Data.Article13_title,
      "questions":[
         {
            "key":"Q072",
            "section":"Article13",
            "number":"72",
            "type":"option",
            "title": nr2Data.Article13_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q073",
            "section":"Article13",
            "number":"73",
            "type":"option",
            "title": nr2Data.Article13_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q074",
            "section":"Article13",
            "number":"74",
            "type":"option",
            "title": nr2Data.Article13_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article13_questions2_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article13_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q075",
            "section":"Article13",
            "number":"75",
            "type":"option",
            "title": nr2Data.Article13_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article13_questions3_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Article13_questions3_options2_title
               }
            ]
         },
         {
            "key":"Q076",
            "section":"Article13",
            "number":"76",
            "type":"text",
            "title": nr2Data.Article13_questions4_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article14",
      "title": nr2Data.Article14_title,
      "questions":[
         {
            "key":"Q077",
            "section":"Article14",
            "number":"77",
            "type":"option",
            "title": nr2Data.Article14_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q078",
            "section":"Article14",
            "number":"78",
            "type":"option",
            "title": nr2Data.Article14_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article14_questions1_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article14_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q079",
            "section":"Article14",
            "number":"79",
            "type":"text",
            "title": nr2Data.Article14_questions2_title,
            "multiple":false
         },
         {
            "key":"Q080",
            "section":"Article14",
            "number":"80",
            "type":"text",
            "title": nr2Data.Article14_questions3_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article15",
      "title": nr2Data.Article15_title,
      "questions":[
         {
            "key":"Q081",
            "section":"Article15",
            "number":"81",
            "type":"option",
            "title": nr2Data.Article15_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q082",
            "section":"Article15",
            "number":"82",
            "type":"option",
            "title": nr2Data.Article15_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q083",
            "section":"Article15",
            "number":"83",
            "type":"option",
            "title": nr2Data.Article15_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q084",
            "section":"Article15",
            "number":"84",
            "type":"option",
            "title": nr2Data.Article15_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q085",
            "section":"Article15",
            "number":"85",
            "type":"option",
            "title": nr2Data.Article15_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q086",
            "section":"Article15",
            "number":"86",
            "type":"option",
            "title": nr2Data.Article15_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q087",
            "section":"Article15",
            "number":"87",
            "type":"option",
            "title": nr2Data.Article15_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q088",
            "section":"Article15",
            "number":"88",
            "type":"option",
            "title": nr2Data.Article15_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article15_questions7_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article15_questions7_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q089",
            "section":"Article15",
            "number":"89",
            "type":"option",
            "title": nr2Data.Article15_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article15_questions8_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article15_questions8_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q090",
            "section":"Article15",
            "number":"90",
            "type":"option",
            "title": nr2Data.Article15_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article15_questions9_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article15_questions9_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article15_questions9_options3_title
               }
            ]
         },
         {
            "key":"Q091",
            "section":"Article15",
            "number":"91",
            "type":"option",
            "title": nr2Data.Article15_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article15_questions10_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article15_questions10_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q092",
            "section":"Article15",
            "number":"92",
            "type":"option",
            "title": nr2Data.Article15_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article15_questions11_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article15_questions11_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q093",
            "section":"Article15",
            "number":"93",
            "type":"text",
            "title": nr2Data.Article15_questions12_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article16",
      "title": nr2Data.Article16_title,
      "questions":[
         {
            "key":"Q094_a",
            "section":"Article16",
            "number":"94.1",
            "type":"option",
            "title": nr2Data.Article16_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article16_questions0_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q094_b",
            "section":"Article16",
            "number":"94.2",
            "type":"option",
            "title": nr2Data.Article16_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article16_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q095",
            "section":"Article16",
            "number":"95",
            "type":"option",
            "title": nr2Data.Article16_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article16_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q096",
            "section":"Article16",
            "number":"96",
            "type":"option",
            "title": nr2Data.Article16_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q097",
            "section":"Article16",
            "number":"97",
            "type":"option",
            "title": nr2Data.Article16_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q098",
            "section":"Article16",
            "number":"98",
            "type":"option",
            "title": nr2Data.Article16_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q099",
            "section":"Article16",
            "number":"99",
            "type":"text",
            "title": nr2Data.Article16_questions6_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article17",
      "title": nr2Data.Article17_title,
      "questions":[
         {
            "key":"Q100",
            "section":"Article17",
            "number":"100",
            "type":"option",
            "title": nr2Data.Article17_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q101",
            "section":"Article17",
            "number":"101",
            "type":"option",
            "title": nr2Data.Article17_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q102",
            "section":"Article17",
            "number":"102",
            "type":"option",
            "title": nr2Data.Article17_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q103",
            "section":"Article17",
            "number":"103",
            "type":"option",
            "title": nr2Data.Article17_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr2Data.Article17_questions3_options0_title
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article17_questions3_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article17_questions3_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article17_questions3_options3_title
               }
            ]
         },
         {
            "key":"Q104",
            "section":"Article17",
            "number":"104",
            "type":"option",
            "title": nr2Data.Article17_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article17_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article17_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q105",
            "section":"Article17",
            "number":"105",
            "type":"option",
            "title": nr2Data.Article17_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"affectedStates",
                  "title": nr2Data.Article17_questions5_options0_title
               },
               {
                  "value":"bch",
                  "title": nr2Data.Article17_questions5_options1_title
               },
               {
                  "value":"organizations",
                  "title": nr2Data.Article17_questions5_options2_title
               }
            ]
         },
         {
            "key":"Q106",
            "section":"Article17",
            "number":"106",
            "type":"option",
            "title": nr2Data.Article17_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article17_questions6_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article17_questions6_options1_title
               },
               {
                  "value":"false.later",
                  "title": nr2Data.Article17_questions6_options2_title
               },
               {
                  "value":"false",
                  "title": nr2Data.Article17_questions6_options3_title
               }
            ]
         },
         {
            "key":"Q107",
            "section":"Article17",
            "number":"107",
            "type":"text",
            "title": nr2Data.Article17_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article18",
      "title": nr2Data.Article18_title,
      "questions":[
         {
            "key":"Q108",
            "section":"Article18",
            "number":"108",
            "type":"option",
            "title": nr2Data.Article18_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions0_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q109",
            "section":"Article18",
            "number":"109",
            "type":"option",
            "title": nr2Data.Article18_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q110",
            "section":"Article18",
            "number":"110",
            "type":"option",
            "title": nr2Data.Article18_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q111",
            "section":"Article18",
            "number":"111",
            "type":"option",
            "title": nr2Data.Article18_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions3_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q112",
            "section":"Article18",
            "number":"112",
            "type":"option",
            "title": nr2Data.Article18_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q113",
            "section":"Article18",
            "number":"113",
            "type":"option",
            "title": nr2Data.Article18_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions5_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q114",
            "section":"Article18",
            "number":"114",
            "type":"option",
            "title": nr2Data.Article18_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article18_questions6_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q115",
            "section":"Article18",
            "number":"115",
            "type":"text",
            "title": nr2Data.Article18_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article19",
      "title": nr2Data.Article19_title,
      "questions":[
         {
            "key":"Q116",
            "section":"Article19",
            "number":"116",
            "type":"option",
            "title": nr2Data.Article19_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q117",
            "section":"Article19",
            "number":"117",
            "type":"option",
            "title": nr2Data.Article19_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q118",
            "section":"Article19",
            "number":"118",
            "type":"option",
            "title": nr2Data.Article19_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"1",
                  "title": nr2Data.Article19_questions2_options0_title
               },
               {
                  "value":"1+",
                  "title": nr2Data.Article19_questions2_options1_title
               },
               {
                  "value":"0",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q119",
            "section":"Article19",
            "number":"119",
            "type":"option",
            "title": nr2Data.Article19_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q120",
            "section":"Article19",
            "number":"120",
            "type":"option",
            "title": nr2Data.Article19_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article19_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article19_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q121",
            "section":"Article19",
            "number":"121",
            "type":"option",
            "title": nr2Data.Article19_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q122",
            "section":"Article19",
            "number":"122",
            "type":"option",
            "title": nr2Data.Article19_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article19_questions6_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q123",
            "section":"Article19",
            "number":"123",
            "type":"text",
            "title": nr2Data.Article19_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article20",
      "title": nr2Data.Article20_title,
      "questions":[
         {
            "key":"Q124_a",
            "section":"Article20",
            "number":"124.a",
            "type":"option",
            "title": nr2Data.Article20_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions0_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions0_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions0_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions0_options3_title
               }
            ]
         },
         {
            "key":"Q124_b",
            "section":"Article20",
            "number":"124.b",
            "type":"option",
            "title": nr2Data.Article20_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions1_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions1_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions1_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions1_options3_title
               }
            ]
         },
         {
            "key":"Q124_c",
            "section":"Article20",
            "number":"124.c",
            "type":"option",
            "title": nr2Data.Article20_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions2_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions2_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions2_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions2_options3_title
               }
            ]
         },
         {
            "key":"Q124_d",
            "section":"Article20",
            "number":"124.d",
            "type":"option",
            "title": nr2Data.Article20_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions3_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions3_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions3_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions3_options3_title
               }
            ]
         },
         {
            "key":"Q124_e",
            "section":"Article20",
            "number":"124.e",
            "type":"option",
            "title": nr2Data.Article20_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions4_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions4_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions4_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions4_options3_title
               }
            ]
         },
         {
            "key":"Q124_f",
            "section":"Article20",
            "number":"124.f",
            "type":"option",
            "title": nr2Data.Article20_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions5_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions5_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions5_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions5_options3_title
               }
            ]
         },
         {
            "key":"Q124_g",
            "section":"Article20",
            "number":"124.g",
            "type":"option",
            "title": nr2Data.Article20_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions6_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions6_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions6_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions6_options3_title
               }
            ]
         },
         {
            "key":"Q124_h",
            "section":"Article20",
            "number":"124.h",
            "type":"option",
            "title": nr2Data.Article20_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions7_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions7_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions7_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions7_options3_title
               }
            ]
         },
         {
            "key":"Q124_i",
            "section":"Article20",
            "number":"124.i",
            "type":"option",
            "title": nr2Data.Article20_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions8_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions8_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions8_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions8_options3_title
               }
            ]
         },
         {
            "key":"Q124_j",
            "section":"Article20",
            "number":"124.j",
            "type":"option",
            "title": nr2Data.Article20_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions9_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions9_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions9_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions9_options3_title
               }
            ]
         },
         {
            "key":"Q124_k",
            "section":"Article20",
            "number":"124.k",
            "type":"option",
            "title": nr2Data.Article20_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions10_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions10_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions10_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions10_options3_title
               }
            ]
         },
         {
            "key":"Q124_l",
            "section":"Article20",
            "number":"124.l",
            "type":"option",
            "title": nr2Data.Article20_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions11_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions11_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions11_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions11_options3_title
               }
            ]
         },
         {
            "key":"Q124_m",
            "section":"Article20",
            "number":"124.m",
            "type":"option",
            "title": nr2Data.Article20_questions12_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions12_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions12_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions12_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions12_options3_title
               }
            ]
         },
         {
            "key":"Q124_n",
            "section":"Article20",
            "number":"124.n",
            "type":"option",
            "title": nr2Data.Article20_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions13_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions13_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions13_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions13_options3_title
               }
            ]
         },
         {
            "key":"Q124_o",
            "section":"Article20",
            "number":"124.o",
            "type":"option",
            "title": nr2Data.Article20_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions14_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions14_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions14_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions14_options3_title
               }
            ]
         },
         {
            "key":"Q124_p",
            "section":"Article20",
            "number":"124.p",
            "type":"option",
            "title": nr2Data.Article20_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions15_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions15_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions15_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions15_options3_title
               }
            ]
         },
         {
            "key":"Q124_q",
            "section":"Article20",
            "number":"124.q",
            "type":"option",
            "title": nr2Data.Article20_questions16_title,
            "multiple":false,
            "options":[
               {
                  "value":"true.availableOnBch",
                  "title": nr2Data.Article20_questions16_options0_title
               },
               {
                  "value":"true.availableNotOnBch",
                  "title": nr2Data.Article20_questions16_options1_title
               },
               {
                  "value":"true.availablePartialyOnBch",
                  "title": nr2Data.Article20_questions16_options2_title
               },
               {
                  "value":"false.notAvailable",
                  "title": nr2Data.Article20_questions16_options3_title
               }
            ]
         },
         {
            "key":"Q125",
            "section":"Article20",
            "number":"125",
            "type":"option",
            "title": nr2Data.Article20_questions17_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q126",
            "section":"Article20",
            "number":"126",
            "type":"option",
            "title": nr2Data.Article20_questions18_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q127",
            "section":"Article20",
            "number":"127",
            "type":"option",
            "title": nr2Data.Article20_questions19_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article20_questions19_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article20_questions19_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q128",
            "section":"Article20",
            "number":"128",
            "type":"option",
            "title": nr2Data.Article20_questions20_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q129",
            "section":"Article20",
            "number":"129",
            "type":"option",
            "title": nr2Data.Article20_questions21_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q130",
            "section":"Article20",
            "number":"130",
            "type":"option",
            "title": nr2Data.Article20_questions22_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q131",
            "section":"Article20",
            "number":"131",
            "type":"text",
            "title": nr2Data.Article20_questions23_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article21",
      "title": nr2Data.Article21_title,
      "questions":[
         {
            "key":"Q132",
            "section":"Article21",
            "number":"132",
            "type":"option",
            "title": nr2Data.Article21_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q133",
            "section":"Article21",
            "number":"133",
            "type":"option",
            "title": nr2Data.Article21_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article21_questions1_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article21_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q134",
            "section":"Article21",
            "number":"134",
            "type":"text",
            "title": nr2Data.Article21_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article22",
      "title": nr2Data.Article22_title,
      "questions":[
         {
            "key":"Q135",
            "section":"Article22",
            "number":"135",
            "type":"option",
            "title": nr2Data.Article22_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q136",
            "section":"Article22",
            "number":"136",
            "type":"option",
            "title": nr2Data.Article22_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"channels.bilateral",
                  "title": nr2Data.Article22_questions1_options0_title
               },
               {
                  "value":"channels.regional",
                  "title": nr2Data.Article22_questions1_options1_title
               },
               {
                  "value":"channels.multilateral",
                  "title": nr2Data.Article22_questions1_options2_title
               }
            ]
         },
         {
            "key":"Q137",
            "section":"Article22",
            "number":"137",
            "type":"option",
            "title": nr2Data.Article22_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q138",
            "section":"Article22",
            "number":"138",
            "type":"option",
            "title": nr2Data.Article22_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"channels.bilateral",
                  "title": nr2Data.Article22_questions3_options0_title
               },
               {
                  "value":"channels.regional",
                  "title": nr2Data.Article22_questions3_options1_title
               },
               {
                  "value":"channels.multilateral",
                  "title": nr2Data.Article22_questions3_options2_title
               }
            ]
         },
         {
            "key":"Q139",
            "section":"Article22",
            "number":"139",
            "type":"option",
            "title": nr2Data.Article22_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q140",
            "section":"Article22",
            "number":"140",
            "type":"option",
            "title": nr2Data.Article22_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q141",
            "section":"Article22",
            "number":"141",
            "type":"option",
            "title": nr2Data.Article22_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"veryEasy",
                  "title": nr2Data.Article22_questions6_options0_title
               },
               {
                  "value":"easy",
                  "title": nr2Data.Article22_questions6_options1_title
               },
               {
                  "value":"average",
                  "title": nr2Data.Article22_questions6_options2_title
               },
               {
                  "value":"difficult",
                  "title": nr2Data.Article22_questions6_options3_title
               },
               {
                  "value":"veryDifficult",
                  "title": nr2Data.Article22_questions6_options4_title
               }
            ]
         },
         {
            "key":"Q142",
            "section":"Article22",
            "number":"142",
            "type":"term",
            "title": nr2Data.Article22_questions7_title,
            "multiple":true,
            "options":[
               {
                  "value":"C6F5F985-183C-45F7-8A61-5B6DB2F13D10",
                  "title": nr2Data.Article22_questions7_options0_title
               },
               {
                  "value":"303E8C81-AE0E-4CDE-A791-3DA21CB2",
                  "title": nr2Data.Article22_questions7_options1_title
               },
               {
                  "value":"2781FB83-5221-4D8F-ACF6-D71423AF",
                  "title": nr2Data.Article22_questions7_options2_title
               },
               {
                  "value":"BAA4A44E-39CF-41ED-96B1-216ED265A2C3",
                  "title": nr2Data.Article22_questions7_options3_title
               },
               {
                  "value":"08A3193F-9F13-4587-8106-E6F4F3A7A7F9",
                  "title": nr2Data.Article22_questions7_options4_title
               },
               {
                  "value":"7FAF8785-54AA-446B-A61E-89F952FE607B",
                  "title": nr2Data.Article22_questions7_options5_title
               }
            ]
         },
         {
            "key":"Q143",
            "section":"Article22",
            "number":"143",
            "type":"option",
            "title": nr2Data.Article22_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q144",
            "section":"Article22",
            "number":"144",
            "type":"term",
            "title": nr2Data.Article22_questions9_title,
            "multiple":true,
            "options":[
               {
                  "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                  "title": nr2Data.Article22_questions9_options0_title
               },
               {
                  "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                  "title": nr2Data.Article22_questions9_options1_title
               },
               {
                  "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                  "title": nr2Data.Article22_questions9_options2_title
               },
               {
                  "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                  "title": nr2Data.Article22_questions9_options3_title
               },
               {
                  "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                  "title": nr2Data.Article22_questions9_options4_title
               },
               {
                  "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                  "title": nr2Data.Article22_questions9_options5_title
               },
               {
                  "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                  "title": nr2Data.Article22_questions9_options6_title
               },
               {
                  "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                  "title": nr2Data.Article22_questions9_options7_title
               },
               {
                  "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                  "title": nr2Data.Article22_questions9_options8_title
               },
               {
                  "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                  "title": nr2Data.Article22_questions9_options9_title
               },
               {
                  "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                  "title": nr2Data.Article22_questions9_options10_title
               },
               {
                  "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                  "title": nr2Data.Article22_questions9_options11_title
               },
               {
                  "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                  "title": nr2Data.Article22_questions9_options12_title
               },
               {
                  "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                  "title": nr2Data.Article22_questions9_options13_title
               },
               {
                  "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                  "title": nr2Data.Article22_questions9_options14_title
               }
            ]
         },
         {
            "key":"Q145",
            "section":"Article22",
            "number":"145",
            "type":"option",
            "title": nr2Data.Article22_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q146",
            "section":"Article22",
            "number":"146",
            "type":"option",
            "title": nr2Data.Article22_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article22_questions11_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q147",
            "section":"Article22",
            "number":"147",
            "type":"term",
            "title": nr2Data.Article22_questions12_title,
            "multiple":true,
            "options":[
               {
                  "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                  "title": nr2Data.Article22_questions12_options0_title
               },
               {
                  "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                  "title": nr2Data.Article22_questions12_options1_title
               },
               {
                  "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                  "title": nr2Data.Article22_questions12_options2_title
               },
               {
                  "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                  "title": nr2Data.Article22_questions12_options3_title
               },
               {
                  "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                  "title": nr2Data.Article22_questions12_options4_title
               },
               {
                  "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                  "title": nr2Data.Article22_questions12_options5_title
               },
               {
                  "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                  "title": nr2Data.Article22_questions12_options6_title
               },
               {
                  "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                  "title": nr2Data.Article22_questions12_options7_title
               },
               {
                  "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                  "title": nr2Data.Article22_questions12_options8_title
               },
               {
                  "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                  "title": nr2Data.Article22_questions12_options9_title
               },
               {
                  "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                  "title": nr2Data.Article22_questions12_options10_title
               },
               {
                  "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                  "title": nr2Data.Article22_questions12_options11_title
               },
               {
                  "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                  "title": nr2Data.Article22_questions12_options12_title
               },
               {
                  "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                  "title": nr2Data.Article22_questions12_options13_title
               },
               {
                  "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                  "title": nr2Data.Article22_questions12_options14_title
               }
            ]
         },
         {
            "key":"Q148",
            "section":"Article22",
            "number":"148",
            "type":"option",
            "title": nr2Data.Article22_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q149",
            "section":"Article22",
            "number":"149",
            "type":"option",
            "title": nr2Data.Article22_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q150",
            "section":"Article22",
            "number":"150",
            "type":"text",
            "title": nr2Data.Article22_questions15_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article23",
      "title": nr2Data.Article23_title,
      "questions":[
         {
            "key":"Q151",
            "section":"Article23",
            "number":"151",
            "type":"option",
            "title": nr2Data.Article23_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article23_questions0_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q152",
            "section":"Article23",
            "number":"152",
            "type":"option",
            "title": nr2Data.Article23_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q153",
            "section":"Article23",
            "number":"153",
            "type":"option",
            "title": nr2Data.Article23_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.limited",
                  "title": nr2Data.Article23_questions2_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q154",
            "section":"Article23",
            "number":"154",
            "type":"option",
            "title": nr2Data.Article23_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.limited",
                  "title": nr2Data.Article23_questions3_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q155",
            "section":"Article23",
            "number":"155",
            "type":"option",
            "title": nr2Data.Article23_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.limited",
                  "title": nr2Data.Article23_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q156",
            "section":"Article23",
            "number":"156",
            "type":"option",
            "title": nr2Data.Article23_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q157",
            "section":"Article23",
            "number":"157",
            "type":"option",
            "title": nr2Data.Article23_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.limited",
                  "title": nr2Data.Article23_questions6_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q158",
            "section":"Article23",
            "number":"158",
            "type":"option",
            "title": nr2Data.Article23_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q159",
            "section":"Article23",
            "number":"159",
            "type":"option",
            "title": nr2Data.Article23_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article23_questions8_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Article23_questions8_options2_title
               }
            ]
         },
         {
            "key":"Q160",
            "section":"Article23",
            "number":"160",
            "type":"text",
            "title": nr2Data.Article23_questions9_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article24",
      "title": nr2Data.Article24_title,
      "questions":[
         {
            "key":"Q161",
            "section":"Article24",
            "number":"161",
            "type":"option",
            "title": nr2Data.Article24_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q162",
            "section":"Article24",
            "number":"162",
            "type":"option",
            "title": nr2Data.Article24_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q163",
            "section":"Article24",
            "number":"163",
            "type":"option",
            "title": nr2Data.Article24_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q164",
            "section":"Article24",
            "number":"164",
            "type":"option",
            "title": nr2Data.Article24_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article24_questions3_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article24_questions3_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q165",
            "section":"Article24",
            "number":"165",
            "type":"option",
            "title": nr2Data.Article24_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article24_questions4_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article24_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q166",
            "section":"Article24",
            "number":"166",
            "type":"option",
            "title": nr2Data.Article24_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title": nr2Data.Article24_questions5_options0_title
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article24_questions5_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q167",
            "section":"Article24",
            "number":"167",
            "type":"text",
            "title": nr2Data.Article24_questions6_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article25",
      "title": nr2Data.Article25_title,
      "questions":[
         {
            "key":"Q168",
            "section":"Article25",
            "number":"168",
            "type":"option",
            "title": nr2Data.Article25_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q169",
            "section":"Article25",
            "number":"169",
            "type":"option",
            "title": nr2Data.Article25_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q170",
            "section":"Article25",
            "number":"170",
            "type":"option",
            "title": nr2Data.Article25_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title": nr2Data.Article25_questions2_options0_title
               },
               {
                  "value":"5-",
                  "title": nr2Data.Article25_questions2_options1_title
               },
               {
                  "value":"10-",
                  "title": nr2Data.Article25_questions2_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Article25_questions2_options3_title
               }
            ]
         },
         {
            "key":"Q171",
            "section":"Article25",
            "number":"171",
            "type":"option",
            "title": nr2Data.Article25_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article25_questions3_options1_title
               },
               {
                  "value":"true.parties",
                  "title": nr2Data.Article25_questions3_options2_title
               },
               {
                  "value":"true.bch",
                  "title": nr2Data.Article25_questions3_options3_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q172",
            "section":"Article25",
            "number":"172",
            "type":"option",
            "title": nr2Data.Article25_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article25_questions4_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q173",
            "section":"Article25",
            "number":"173",
            "type":"option",
            "title": nr2Data.Article25_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article25_questions5_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q174",
            "section":"Article25",
            "number":"174",
            "type":"option",
            "title": nr2Data.Article25_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article25_questions6_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q175",
            "section":"Article25",
            "number":"175",
            "type":"text",
            "title": nr2Data.Article25_questions7_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article26",
      "title": nr2Data.Article26_title,
      "questions":[
         {
            "key":"Q176",
            "section":"Article26",
            "number":"176",
            "type":"option",
            "title": nr2Data.Article26_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article26_questions0_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               },
               {
                  "value":"n/a",
                  "title": nr2Data.Article26_questions0_options3_title
               }
            ]
         },
         {
            "key":"Q177",
            "section":"Article26",
            "number":"177",
            "type":"option",
            "title": nr2Data.Article26_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.some",
                  "title": nr2Data.Article26_questions1_options1_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q178",
            "section":"Article26",
            "number":"178",
            "type":"text",
            "title": nr2Data.Article26_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article27",
      "title": nr2Data.Article27_title,
      "questions":[
         {
            "key":"Q179",
            "section":"Article27",
            "number":"179",
            "type":"option",
            "title": nr2Data.Article27_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q180",
            "section":"Article27",
            "number":"180",
            "type":"option",
            "title": nr2Data.Article27_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q181",
            "section":"Article27",
            "number":"181",
            "type":"text",
            "title": nr2Data.Article27_questions2_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Article33",
      "title": nr2Data.Article33_title,
      "questions":[
         {
            "key":"Q182",
            "section":"Article33",
            "number":"182",
            "type":"option",
            "title": nr2Data.Article33_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"true.interimReportOnly",
                  "title": nr2Data.Article33_questions0_options1_title
               },
               {
                  "value":"true.firstReportOnly",
                  "title": nr2Data.Article33_questions0_options2_title
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"Q183",
            "section":"Article33",
            "number":"183",
            "type":"term",
            "title": nr2Data.Article33_questions1_title,
            "multiple":true,
            "options":[
               {
                  "value":"9D149B05-B490-43BC-BE81-473F4A15D5AC",
                  "title": nr2Data.Article33_questions1_options0_title
               },
               {
                  "value":"CCACEEF3-01E5-4E19-BE04-01E673A0DDE5",
                  "title": nr2Data.Article33_questions1_options1_title
               },
               {
                  "value":"6EEDA8B0-1096-45C9-BB43-6DA7E6C2FB0F",
                  "title": nr2Data.Article33_questions1_options2_title
               },
               {
                  "value":"6C994EFC-EF9C-457E-95B4-FA55BFFEAC38",
                  "title": nr2Data.Article33_questions1_options3_title
               }
            ]
         }
      ]
   },
   {
      "key":"AdditionalInformation",
      "title": nr2Data.AdditionalInformation_title,
      "questions":[
         {
            "key":"Q184",
            "section":"AdditionalInformation",
            "number":"184",
            "type":"text",
            "title": nr2Data.AdditionalInformation_questions0_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Comments",
      "title": nr2Data.Comments_title,
      "questions":[
         {
            "key":"Q185",
            "section":"Comments",
            "number":"185",
            "type":"text",
            "title": nr2Data.Comments_questions0_title,
            "multiple":false
         }
      ]
   },
   {
      "key":"Survey",
      "title": nr2Data.Survey_title,
      "questions":[
         {
            "key":"S003",
            "section":"Survey",
            "number":"3",
            "type":"option",
            "title": nr2Data.Survey_questions0_title,
            "multiple":false,
            "options":[
               {
                  "value":"2001",
                  "title": nr2Data.Survey_questions0_options0_title
               },
               {
                  "value":"2002",
                  "title": nr2Data.Survey_questions0_options1_title
               },
               {
                  "value":"2003",
                  "title": nr2Data.Survey_questions0_options2_title
               },
               {
                  "value":"2004",
                  "title": nr2Data.Survey_questions0_options3_title
               },
               {
                  "value":"2005",
                  "title": nr2Data.Survey_questions0_options4_title
               },
               {
                  "value":"2006",
                  "title": nr2Data.Survey_questions0_options5_title
               },
               {
                  "value":"2007",
                  "title": nr2Data.Survey_questions0_options6_title
               },
               {
                  "value":"2008",
                  "title": nr2Data.Survey_questions0_options7_title
               },
               {
                  "value":"2009",
                  "title": nr2Data.Survey_questions0_options8_title
               },
               {
                  "value":"2010",
                  "title": nr2Data.Survey_questions0_options9_title
               },
               {
                  "value":"2011",
                  "title": nr2Data.Survey_questions0_options10_title
               },
               {
                  "value":"2012",
                  "title": nr2Data.Survey_questions0_options11_title
               },
               {
                  "value":"2013",
                  "title": nr2Data.Survey_questions0_options12_title
               },
               {
                  "value":"2014",
                  "title": nr2Data.Survey_questions0_options13_title
               }
            ]
         },
         {
            "key":"S004",
            "section":"Survey",
            "number":"4",
            "type":"option",
            "title": nr2Data.Survey_questions1_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1-",
                  "title": nr2Data.Survey_questions1_options1_title
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions1_options2_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions1_options3_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions1_options4_title
               }
            ]
         },
         {
            "key":"S005",
            "section":"Survey",
            "number":"5",
            "type":"option",
            "title": nr2Data.Survey_questions2_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S006",
            "section":"Survey",
            "number":"6",
            "type":"option",
            "title": nr2Data.Survey_questions3_title,
            "multiple":false,
            "options":[
               {
                  "value":"USD5000-",
                  "title": nr2Data.Survey_questions3_options0_title
               },
               {
                  "value":"USD5000+",
                  "title": nr2Data.Survey_questions3_options1_title
               },
               {
                  "value":"USD50000+",
                  "title": nr2Data.Survey_questions3_options2_title
               },
               {
                  "value":"USD100000+",
                  "title": nr2Data.Survey_questions3_options3_title
               },
               {
                  "value":"USD500000+",
                  "title": nr2Data.Survey_questions3_options4_title
               },
               {
                  "value":"USD1000000+",
                  "title": nr2Data.Survey_questions3_options5_title
               },
               {
                  "value":"USD5000000+",
                  "title": nr2Data.Survey_questions3_options6_title
               }
            ]
         },
         {
            "key":"S007",
            "section":"Survey",
            "number":"7",
            "type":"option",
            "title": nr2Data.Survey_questions4_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S008",
            "section":"Survey",
            "number":"8",
            "type":"option",
            "title": nr2Data.Survey_questions5_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions5_options1_title
               },
               {
                  "value":"3+",
                  "title": nr2Data.Survey_questions5_options2_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions5_options3_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions5_options4_title
               }
            ]
         },
         {
            "key":"S009_a",
            "section":"Survey",
            "number":"9.a",
            "type":"option",
            "title": nr2Data.Survey_questions6_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S009_b",
            "section":"Survey",
            "number":"9.b",
            "type":"option",
            "title": nr2Data.Survey_questions7_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S010",
            "section":"Survey",
            "number":"10",
            "type":"option",
            "title": nr2Data.Survey_questions8_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S011",
            "section":"Survey",
            "number":"11",
            "type":"option",
            "title": nr2Data.Survey_questions9_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S012",
            "section":"Survey",
            "number":"12",
            "type":"option",
            "title": nr2Data.Survey_questions10_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S013_a",
            "section":"Survey",
            "number":"13.a",
            "type":"option",
            "title": nr2Data.Survey_questions11_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S013_b",
            "section":"Survey",
            "number":"13.b",
            "type":"option",
            "title": nr2Data.Survey_questions12_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S013_c",
            "section":"Survey",
            "number":"13.c",
            "type":"option",
            "title": nr2Data.Survey_questions13_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S014",
            "section":"Survey",
            "number":"14",
            "type":"option",
            "title": nr2Data.Survey_questions14_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S015",
            "section":"Survey",
            "number":"15",
            "type":"option",
            "title": nr2Data.Survey_questions15_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S016",
            "section":"Survey",
            "number":"16",
            "type":"option",
            "title": nr2Data.Survey_questions16_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions16_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions16_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions16_options3_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions16_options4_title
               }
            ]
         },
         {
            "key":"S017",
            "section":"Survey",
            "number":"17",
            "type":"text",
            "title": nr2Data.Survey_questions17_title,
            "multiple":false
         },
         {
            "key":"S018",
            "section":"Survey",
            "number":"18",
            "type":"option",
            "title": nr2Data.Survey_questions18_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S019_a",
            "section":"Survey",
            "number":"19.a",
            "type":"option",
            "title": nr2Data.Survey_questions19_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions19_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions19_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions19_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions19_options4_title
               }
            ]
         },
         {
            "key":"S019_b",
            "section":"Survey",
            "number":"19.b",
            "type":"option",
            "title": nr2Data.Survey_questions20_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions20_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions20_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions20_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions20_options4_title
               }
            ]
         },
         {
            "key":"S019_c",
            "section":"Survey",
            "number":"19.c",
            "type":"option",
            "title": nr2Data.Survey_questions21_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions21_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions21_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions21_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions21_options4_title
               }
            ]
         },
         {
            "key":"S020",
            "section":"Survey",
            "number":"20",
            "type":"option",
            "title": nr2Data.Survey_questions22_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S021",
            "section":"Survey",
            "number":"21",
            "type":"option",
            "title": nr2Data.Survey_questions23_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S022_a",
            "section":"Survey",
            "number":"22.a",
            "type":"option",
            "title": nr2Data.Survey_questions24_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S022_b",
            "section":"Survey",
            "number":"22.b",
            "type":"option",
            "title": nr2Data.Survey_questions25_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S023",
            "section":"Survey",
            "number":"23",
            "type":"option",
            "title": nr2Data.Survey_questions26_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions26_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions26_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions26_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions26_options4_title
               }
            ]
         },
         {
            "key":"S024",
            "section":"Survey",
            "number":"24",
            "type":"option",
            "title": nr2Data.Survey_questions27_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions27_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions27_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions27_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions27_options4_title
               }
            ]
         },
         {
            "key":"S025",
            "section":"Survey",
            "number":"25",
            "type":"option",
            "title": nr2Data.Survey_questions28_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S026",
            "section":"Survey",
            "number":"26",
            "type":"option",
            "title": nr2Data.Survey_questions29_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions29_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions29_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions29_options3_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions29_options4_title
               }
            ]
         },
         {
            "key":"S027",
            "section":"Survey",
            "number":"27",
            "type":"option",
            "title": nr2Data.Survey_questions30_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions30_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions30_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions30_options3_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions30_options4_title
               }
            ]
         },
         {
            "key":"S028",
            "section":"Survey",
            "number":"28",
            "type":"option",
            "title": nr2Data.Survey_questions31_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S029",
            "section":"Survey",
            "number":"29",
            "type":"option",
            "title": nr2Data.Survey_questions32_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S030",
            "section":"Survey",
            "number":"30",
            "type":"option",
            "title": nr2Data.Survey_questions33_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S031",
            "section":"Survey",
            "number":"31",
            "type":"term",
            "title": nr2Data.Survey_questions34_title,
            "multiple":true,
            "options":[
               {
                  "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                  "title": nr2Data.Survey_questions34_options0_title
               },
               {
                  "value":"6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                  "title": nr2Data.Survey_questions34_options1_title
               },
               {
                  "value":"38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                  "title": nr2Data.Survey_questions34_options2_title
               },
               {
                  "value":"E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                  "title": nr2Data.Survey_questions34_options3_title
               },
               {
                  "value":"51792A07-B3C0-4F7B-830E-0741635F57BB",
                  "title": nr2Data.Survey_questions34_options4_title
               }
            ]
         },
         {
            "key":"S032",
            "section":"Survey",
            "number":"32",
            "type":"term",
            "title": nr2Data.Survey_questions35_title,
            "multiple":false,
            "options":[
               {
                  "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                  "title": nr2Data.Survey_questions35_options0_title
               },
               {
                  "value":"6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                  "title": nr2Data.Survey_questions35_options1_title
               },
               {
                  "value":"38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                  "title": nr2Data.Survey_questions35_options2_title
               },
               {
                  "value":"E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                  "title": nr2Data.Survey_questions35_options3_title
               },
               {
                  "value":"51792A07-B3C0-4F7B-830E-0741635F57BB",
                  "title": nr2Data.Survey_questions35_options4_title
               }
            ]
         },
         {
            "key":"S033",
            "section":"Survey",
            "number":"33",
            "type":"option",
            "title": nr2Data.Survey_questions36_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions36_options1_title
               },
               {
                  "value":"3+",
                  "title": nr2Data.Survey_questions36_options2_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions36_options3_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions36_options4_title
               }
            ]
         },
         {
            "key":"S034",
            "section":"Survey",
            "number":"34",
            "type":"option",
            "title": nr2Data.Survey_questions37_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions37_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions37_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions37_options3_title
               },
               {
                  "value":"25+",
                  "title": nr2Data.Survey_questions37_options4_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions37_options5_title
               }
            ]
         },
         {
            "key":"S035_a",
            "section":"Survey",
            "number":"35.a",
            "type":"option",
            "title": nr2Data.Survey_questions38_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S035_b",
            "section":"Survey",
            "number":"35.b",
            "type":"option",
            "title": nr2Data.Survey_questions39_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S036",
            "section":"Survey",
            "number":"36",
            "type":"option",
            "title": nr2Data.Survey_questions40_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions40_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions40_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions40_options3_title
               },
               {
                  "value":"25+",
                  "title": nr2Data.Survey_questions40_options4_title
               }
            ]
         },
         {
            "key":"S037",
            "section":"Survey",
            "number":"37",
            "type":"option",
            "title": nr2Data.Survey_questions41_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions41_options1_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions41_options2_title
               },
               {
                  "value":"50+",
                  "title": nr2Data.Survey_questions41_options3_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions41_options4_title
               }
            ]
         },
         {
            "key":"S038",
            "section":"Survey",
            "number":"38",
            "type":"term",
            "title": nr2Data.Survey_questions42_title,
            "multiple":true,
            "options":[
               {
                  "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                  "title": nr2Data.Survey_questions42_options0_title
               },
               {
                  "value":"296200C2-3443-4C0C-B892-56CC1F80EF54",
                  "title": nr2Data.Survey_questions42_options1_title
               },
               {
                  "value":"6449D16B-F360-4ED5-9EB5-F97F060AA3A7",
                  "title": nr2Data.Survey_questions42_options2_title
               }
            ]
         },
         {
            "key":"S039",
            "section":"Survey",
            "number":"39",
            "type":"option",
            "title": nr2Data.Survey_questions43_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions43_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions43_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions43_options3_title
               },
               {
                  "value":"25+",
                  "title": nr2Data.Survey_questions43_options4_title
               }
            ]
         },
         {
            "key":"S040",
            "section":"Survey",
            "number":"40",
            "type":"option",
            "title": nr2Data.Survey_questions44_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S041",
            "section":"Survey",
            "number":"41",
            "type":"text",
            "title": nr2Data.Survey_questions45_title,
            "multiple":false
         },
         {
            "key":"S042",
            "section":"Survey",
            "number":"42",
            "type":"option",
            "title": nr2Data.Survey_questions46_title,
            "multiple":false,
            "options":[
               {
                  "value":"true",
                  "title" : nr2Data.Yes
               },
               {
                  "value":"false",
                  "title" : nr2Data.No
               }
            ]
         },
         {
            "key":"S043",
            "section":"Survey",
            "number":"43",
            "type":"option",
            "title": nr2Data.Survey_questions47_title,
            "multiple":false,
            "options":[
               {
                  "value":"0",
                  "title" : nr2Data.None
               },
               {
                  "value":"1+",
                  "title": nr2Data.Survey_questions47_options1_title
               },
               {
                  "value":"5+",
                  "title": nr2Data.Survey_questions47_options2_title
               },
               {
                  "value":"10+",
                  "title": nr2Data.Survey_questions47_options3_title
               },
               {
                  "value":"25+",
                  "title": nr2Data.Survey_questions47_options4_title
               },
               {
                  "value":"100+",
                  "title": nr2Data.Survey_questions47_options5_title
               }
            ]
         }
      ]
   }
]