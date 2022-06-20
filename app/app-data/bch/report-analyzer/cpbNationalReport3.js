import nr3Data from '~/app-text/bch/report-analyzer/cpbNationalReport3.json'

export const cpbNationalReport3 = [
  {
     "key":"General",
     "title" : nr3Data.General_title,
     "questions":[
        {
           "key":"Q012_party",
           "section":"General",
           "number":"11",
           "type":"option",
           "title" : nr3Data.General_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q012",
           "section":"General",
           "number":"12",
           "type":"option",
           "title" : nr3Data.General_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q013",
           "section":"General",
           "number":"13",
           "type":"text",
           "title" : nr3Data.General_questions2_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article2",
     "title" : nr3Data.Article2_title,
     "questions":[
        {
           "key":"Q014",
           "section":"Article2",
           "number":"14",
           "type":"option",
           "title" : nr3Data.Article2_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"implementation.fullFramwork",
                 "title" : nr3Data.Article2_questions0_options0_title
              },
              {
                 "value":"implementation.partialFramwork",
                 "title" : nr3Data.Article2_questions0_options1_title
              },
              {
                 "value":"implementation.temporaryMeasures",
                 "title" : nr3Data.Article2_questions0_options2_title
              },
              {
                 "value":"implementation.draftFramwork",
                 "title" : nr3Data.Article2_questions0_options3_title
              },
              {
                 "value":"implementation.none",
                 "title" : nr3Data.Article2_questions0_options4_title
              }
           ]
        },
        {
           "key":"Q015",
           "section":"Article2",
           "number":"15",
           "type":"option",
           "title" : nr3Data.Article2_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"2001",
                 "title" : nr3Data.Article2_questions1_options0_title
              },
              {
                 "value":"2002",
                 "title" : nr3Data.Article2_questions1_options1_title
              },
              {
                 "value":"2003",
                 "title" : nr3Data.Article2_questions1_options2_title
              },
              {
                 "value":"2004",
                 "title" : nr3Data.Article2_questions1_options3_title
              },
              {
                 "value":"2005",
                 "title" : nr3Data.Article2_questions1_options4_title
              },
              {
                 "value":"2006",
                 "title" : nr3Data.Article2_questions1_options5_title
              },
              {
                 "value":"2007",
                 "title" : nr3Data.Article2_questions1_options6_title
              },
              {
                 "value":"2008",
                 "title" : nr3Data.Article2_questions1_options7_title
              },
              {
                 "value":"2009",
                 "title" : nr3Data.Article2_questions1_options8_title
              },
              {
                 "value":"2010",
                 "title" : nr3Data.Article2_questions1_options9_title
              },
              {
                 "value":"2011",
                 "title" : nr3Data.Article2_questions1_options10_title
              },
              {
                 "value":"2012",
                 "title" : nr3Data.Article2_questions1_options11_title
              },
              {
                 "value":"2013",
                 "title" : nr3Data.Article2_questions1_options12_title
              },
              {
                 "value":"2014",
                 "title" : nr3Data.Article2_questions1_options13_title
              }
           ]
        },
        {
           "key":"Q016",
           "section":"Article2",
           "number":"16",
           "type":"option",
           "title" : nr3Data.Article2_questions2_title,
           "multiple":true,
           "options":[
              {
                 "value":"instrument.nationalBiosafetyLaws",
                 "title" : nr3Data.Article2_questions2_options0_title
              },
              {
                 "value":"instrument.nationalBiosafetyRegulations",
                 "title" : nr3Data.Article2_questions2_options1_title
              },
              {
                 "value":"instrument.biosafetyGuidelines",
                 "title" : nr3Data.Article2_questions2_options2_title
              },
              {
                 "value":"instrument.indirectLaws",
                 "title" : nr3Data.Article2_questions2_options3_title
              },
              {
                 "value":"instrument.none",
                 "title" : nr3Data.Article2_questions2_options4_title
              }
           ]
        },
        {
           "key":"Q017",
           "section":"Article2",
           "number":"17",
           "type":"option",
           "title" : nr3Data.Article2_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article2_questions3_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q018",
           "section":"Article2",
           "number":"18",
           "type":"option",
           "title" : nr3Data.Article2_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q019",
           "section":"Article2",
           "number":"19",
           "type":"option",
           "title" : nr3Data.Article2_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"1",
                 "title" : nr3Data.Article2_questions5_options0_title
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article2_questions5_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article2_questions5_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article2_questions5_options3_title
              }
           ]
        },
        {
           "key":"Q020",
           "section":"Article2",
           "number":"20",
           "type":"option",
           "title" : nr3Data.Article2_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article2_questions6_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q021",
           "section":"Article2",
           "number":"21",
           "type":"text",
           "title" : nr3Data.Article2_questions7_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article5",
     "title" : nr3Data.Article5_title,
     "questions":[
        {
           "key":"Q022",
           "section":"Article5",
           "number":"22",
           "type":"option",
           "title" : nr3Data.Article5_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article5_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q023",
           "section":"Article5",
           "number":"23",
           "type":"option",
           "title" : nr3Data.Article5_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article5_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q024",
           "section":"Article5",
           "number":"24",
           "type":"text",
           "title" : nr3Data.Article5_questions2_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article6",
     "title" : nr3Data.Article6_title,
     "questions":[
        {
           "key":"Q025",
           "section":"Article6",
           "number":"25",
           "type":"option",
           "title" : nr3Data.Article6_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article6_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q026",
           "section":"Article6",
           "number":"26",
           "type":"option",
           "title" : nr3Data.Article6_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q027",
           "section":"Article6",
           "number":"27",
           "type":"option",
           "title" : nr3Data.Article6_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article6_questions2_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q028",
           "section":"Article6",
           "number":"28",
           "type":"text",
           "title" : nr3Data.Article6_questions3_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Articles7-10",
     "title" : nr3Data.Articles7_10_title,
     "questions":[
        {
           "key":"Q029",
           "section":"Articles7-10",
           "number":"29",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q030",
           "section":"Articles7-10",
           "number":"30",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q031",
           "section":"Articles7-10",
           "number":"31",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q032",
           "section":"Articles7-10",
           "number":"32",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions3_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q033",
           "section":"Articles7-10",
           "number":"33",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q034",
           "section":"Articles7-10",
           "number":"34",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q035",
           "section":"Articles7-10",
           "number":"35",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q036",
           "section":"Articles7-10",
           "number":"36",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Articles7_10_questions7_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Articles7_10_questions7_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Articles7_10_questions7_options3_title
              }
           ]
        },
        {
           "key":"Q037",
           "section":"Articles7-10",
           "number":"37",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Articles7_10_questions8_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Articles7_10_questions8_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Articles7_10_questions8_options3_title
              }
           ]
        },
        {
           "key":"Q038",
           "section":"Articles7-10",
           "number":"38",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Articles7_10_questions9_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Articles7_10_questions9_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Articles7_10_questions9_options3_title
              }
           ]
        },
        {
           "key":"Q039",
           "section":"Articles7-10",
           "number":"39",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Articles7_10_questions10_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Articles7_10_questions10_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Articles7_10_questions10_options3_title
              }
           ]
        },
        {
           "key":"Q040",
           "section":"Articles7-10",
           "number":"40",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions11_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q041",
           "section":"Articles7-10",
           "number":"41",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions12_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q042",
           "section":"Articles7-10",
           "number":"42",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions13_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions13_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q043",
           "section":"Articles7-10",
           "number":"43",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Articles7_10_questions14_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions14_options1_title
              },
              {
                 "value":"true.some.notifier",
                 "title" : nr3Data.Articles7_10_questions14_options2_title
              },
              {
                 "value":"true.some.bch",
                 "title" : nr3Data.Articles7_10_questions14_options3_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q044",
           "section":"Articles7-10",
           "number":"44",
           "type":"term",
           "title" : nr3Data.Articles7_10_questions15_title,
           "multiple":true,
           "options":[
              {
                 "value":"3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                 "title" : nr3Data.Articles7_10_questions15_options0_title
              },
              {
                 "value":"3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                 "title" : nr3Data.Articles7_10_questions15_options1_title
              },
              {
                 "value":"6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                 "title" : nr3Data.Articles7_10_questions15_options2_title
              },
              {
                 "value":"8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                 "title" : nr3Data.Articles7_10_questions15_options3_title
              },
              {
                 "value":"19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                 "title" : nr3Data.Articles7_10_questions15_options4_title
              }
           ]
        },
        {
           "key":"Q045",
           "section":"Articles7-10",
           "number":"45",
           "type":"option",
           "title" : nr3Data.Articles7_10_questions16_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Articles7_10_questions16_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Articles7_10_questions16_options1_title
              },
              {
                 "value":"true.some.notifier",
                 "title" : nr3Data.Articles7_10_questions16_options2_title
              },
              {
                 "value":"true.some.bch",
                 "title" : nr3Data.Articles7_10_questions16_options3_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q046",
           "section":"Articles7-10",
           "number":"46",
           "type":"text",
           "title" : nr3Data.Articles7_10_questions17_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article11",
     "title" : nr3Data.Article11_title,
     "questions":[
        {
           "key":"Q047",
           "section":"Article11",
           "number":"47",
           "type":"option",
           "title" : nr3Data.Article11_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q048",
           "section":"Article11",
           "number":"48",
           "type":"option",
           "title" : nr3Data.Article11_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article11_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q049",
           "section":"Article11",
           "number":"49",
           "type":"option",
           "title" : nr3Data.Article11_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q050",
           "section":"Article11",
           "number":"50",
           "type":"option",
           "title" : nr3Data.Article11_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q051",
           "section":"Article11",
           "number":"51",
           "type":"option",
           "title" : nr3Data.Article11_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q052",
           "section":"Article11",
           "number":"52",
           "type":"option",
           "title" : nr3Data.Article11_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q053",
           "section":"Article11",
           "number":"53",
           "type":"option",
           "title" : nr3Data.Article11_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article11_questions6_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article11_questions6_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article11_questions6_options3_title
              }
           ]
        },
        {
           "key":"Q054",
           "section":"Article11",
           "number":"54",
           "type":"option",
           "title" : nr3Data.Article11_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article11_questions7_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article11_questions7_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article11_questions7_options3_title
              }
           ]
        },
        {
           "key":"Q055",
           "section":"Article11",
           "number":"55",
           "type":"option",
           "title" : nr3Data.Article11_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article11_questions8_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article11_questions8_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article11_questions8_options3_title
              }
           ]
        },
        {
           "key":"Q056",
           "section":"Article11",
           "number":"56",
           "type":"option",
           "title" : nr3Data.Article11_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article11_questions9_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article11_questions9_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q057",
           "section":"Article11",
           "number":"57",
           "type":"option",
           "title" : nr3Data.Article11_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article11_questions10_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article11_questions10_options1_title
              },
              {
                 "value":"true.delay",
                 "title" : nr3Data.Article11_questions10_options2_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q058",
           "section":"Article11",
           "number":"58",
           "type":"text",
           "title" : nr3Data.Article11_questions11_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article12",
     "title" : nr3Data.Article12_title,
     "questions":[
        {
           "key":"Q059",
           "section":"Article12",
           "number":"59",
           "type":"option",
           "title" : nr3Data.Article12_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article12_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q060",
           "section":"Article12",
           "number":"60",
           "type":"option",
           "title" : nr3Data.Article12_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q061",
           "section":"Article12",
           "number":"61",
           "type":"option",
           "title" : nr3Data.Article12_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.reviewed",
                 "title" : nr3Data.Article12_questions2_options0_title
              },
              {
                 "value":"true.changed",
                 "title" : nr3Data.Article12_questions2_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q062",
           "section":"Article12",
           "number":"62",
           "type":"option",
           "title" : nr3Data.Article12_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article12_questions3_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article12_questions3_options2_title
              }
           ]
        },
        {
           "key":"Q063",
           "section":"Article12",
           "number":"63",
           "type":"option",
           "title" : nr3Data.Article12_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article12_questions4_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article12_questions4_options1_title
              },
              {
                 "value":"true.some.notifier",
                 "title" : nr3Data.Article12_questions4_options2_title
              },
              {
                 "value":"true.some.bch",
                 "title" : nr3Data.Article12_questions4_options3_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q064",
           "section":"Article12",
           "number":"64",
           "type":"option",
           "title" : nr3Data.Article12_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article12_questions5_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article12_questions5_options1_title
              },
              {
                 "value":"true.delay",
                 "title" : nr3Data.Article12_questions5_options2_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q065",
           "section":"Article12",
           "number":"65",
           "type":"option",
           "title" : nr3Data.Article12_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article12_questions6_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article12_questions6_options1_title
              },
              {
                 "value":"true.some.notifier",
                 "title" : nr3Data.Article12_questions6_options2_title
              },
              {
                 "value":"true.some.bch",
                 "title" : nr3Data.Article12_questions6_options3_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q066",
           "section":"Article12",
           "number":"66",
           "type":"text",
           "title" : nr3Data.Article12_questions7_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article13",
     "title" : nr3Data.Article13_title,
     "questions":[
        {
           "key":"Q067",
           "section":"Article13",
           "number":"67",
           "type":"option",
           "title" : nr3Data.Article13_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article13_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q068",
           "section":"Article13",
           "number":"68",
           "type":"option",
           "title" : nr3Data.Article13_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q069",
           "section":"Article13",
           "number":"69",
           "type":"option",
           "title" : nr3Data.Article13_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article13_questions2_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article13_questions2_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q070",
           "section":"Article13",
           "number":"70",
           "type":"option",
           "title" : nr3Data.Article13_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article13_questions3_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article13_questions3_options2_title
              }
           ]
        },
        {
           "key":"Q071",
           "section":"Article13",
           "number":"71",
           "type":"text",
           "title" : nr3Data.Article13_questions4_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article14",
     "title" : nr3Data.Article14_title,
     "questions":[
        {
           "key":"Q072",
           "section":"Article14",
           "number":"72",
           "type":"option",
           "title" : nr3Data.Article14_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q073",
           "section":"Article14",
           "number":"73",
           "type":"option",
           "title" : nr3Data.Article14_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article14_questions1_options1_title
              },
              {
                 "value":"3+",
                 "title" : nr3Data.Article14_questions1_options2_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article14_questions1_options3_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article14_questions1_options4_title
              }
           ]
        },
        {
           "key":"Q074",
           "section":"Article14",
           "number":"74",
           "type":"option",
           "title" : nr3Data.Article14_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article14_questions2_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article14_questions2_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q075",
           "section":"Article14",
           "number":"75",
           "type":"text",
           "title" : nr3Data.Article14_questions3_title,
           "multiple":false
        },
        {
           "key":"Q076",
           "section":"Article14",
           "number":"76",
           "type":"text",
           "title" : nr3Data.Article14_questions4_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article15_16",
     "title" : nr3Data.Article15_16_title,
     "questions":[
        {
           "key":"Q077",
           "section":"Article15_16",
           "number":"77",
           "type":"option",
           "title" : nr3Data.Article15_16_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article15_16_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q078",
           "section":"Article15_16",
           "number":"78",
           "type":"option",
           "title" : nr3Data.Article15_16_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q079_a",
           "section":"Article15_16",
           "number":"79a",
           "type":"option",
           "title" : nr3Data.Article15_16_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article15_16_questions2_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article15_16_questions2_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article15_16_questions2_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article15_16_questions2_options4_title
              }
           ]
        },
        {
           "key":"Q079_b",
           "section":"Article15_16",
           "number":"79b",
           "type":"option",
           "title" : nr3Data.Article15_16_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article15_16_questions3_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article15_16_questions3_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article15_16_questions3_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article15_16_questions3_options4_title
              }
           ]
        },
        {
           "key":"Q079_c",
           "section":"Article15_16",
           "number":"79c",
           "type":"option",
           "title" : nr3Data.Article15_16_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article15_16_questions4_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article15_16_questions4_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article15_16_questions4_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article15_16_questions4_options4_title
              }
           ]
        },
        {
           "key":"Q080",
           "section":"Article15_16",
           "number":"80",
           "type":"option",
           "title" : nr3Data.Article15_16_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q081",
           "section":"Article15_16",
           "number":"81",
           "type":"option",
           "title" : nr3Data.Article15_16_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q082",
           "section":"Article15_16",
           "number":"82",
           "type":"option",
           "title" : nr3Data.Article15_16_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q083",
           "section":"Article15_16",
           "number":"83",
           "type":"option",
           "title" : nr3Data.Article15_16_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q084_a",
           "section":"Article15_16",
           "number":"84a",
           "type":"option",
           "title" : nr3Data.Article15_16_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q084_b",
           "section":"Article15_16",
           "number":"84b",
           "type":"option",
           "title" : nr3Data.Article15_16_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q084_c",
           "section":"Article15_16",
           "number":"84c",
           "type":"option",
           "title" : nr3Data.Article15_16_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q084_d",
           "section":"Article15_16",
           "number":"84d",
           "type":"option",
           "title" : nr3Data.Article15_16_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q085_a",
           "section":"Article15_16",
           "number":"85a",
           "type":"option",
           "title" : nr3Data.Article15_16_questions13_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q085_b",
           "section":"Article15_16",
           "number":"85b",
           "type":"option",
           "title" : nr3Data.Article15_16_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q086",
           "section":"Article15_16",
           "number":"86",
           "type":"option",
           "title" : nr3Data.Article15_16_questions15_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q087",
           "section":"Article15_16",
           "number":"87",
           "type":"option",
           "title" : nr3Data.Article15_16_questions16_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q088",
           "section":"Article15_16",
           "number":"88",
           "type":"option",
           "title" : nr3Data.Article15_16_questions17_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q089",
           "section":"Article15_16",
           "number":"89",
           "type":"option",
           "title" : nr3Data.Article15_16_questions18_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q090",
           "section":"Article15_16",
           "number":"90",
           "type":"term",
           "title" : nr3Data.Article15_16_questions19_title,
           "multiple":true,
           "options":[
              {
                 "value":"D6B59E8A-D82C-4516-917A-A745ACDA5931",
                 "title" : nr3Data.Article15_16_questions19_options0_title
              },
              {
                 "value":"015737FC-ABC2-460C-A099-06A1B01E649A",
                 "title" : nr3Data.Article15_16_questions19_options1_title
              },
              {
                 "value":"BEBF757E-E3CC-4913-8D9F-2D165CD63ECE",
                 "title" : nr3Data.Article15_16_questions19_options2_title
              },
              {
                 "value":"42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                 "title" : nr3Data.Article15_16_questions19_options3_title
              },
              {
                 "value":"91BEAF12-ABE1-4294-AD3B-507935894C78",
                 "title" : nr3Data.Article15_16_questions19_options4_title
              },
              {
                 "value":"1D96153B-1625-44E4-AD5E-D26429044B29",
                 "title" : nr3Data.Article15_16_questions19_options5_title
              },
              {
                 "value":"6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                 "title" : nr3Data.Article15_16_questions19_options6_title
              }
           ]
        },
        {
           "key":"Q091",
           "section":"Article15_16",
           "number":"91",
           "type":"option",
           "title" : nr3Data.Article15_16_questions20_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article15_16_questions20_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article15_16_questions20_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q092",
           "section":"Article15_16",
           "number":"92",
           "type":"option",
           "title" : nr3Data.Article15_16_questions21_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article15_16_questions21_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article15_16_questions21_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q093",
           "section":"Article15_16",
           "number":"93",
           "type":"option",
           "title" : nr3Data.Article15_16_questions22_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article15_16_questions22_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article15_16_questions22_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article15_16_questions22_options3_title
              }
           ]
        },
        {
           "key":"Q094",
           "section":"Article15_16",
           "number":"94",
           "type":"option",
           "title" : nr3Data.Article15_16_questions23_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article15_16_questions23_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q095",
           "section":"Article15_16",
           "number":"95",
           "type":"option",
           "title" : nr3Data.Article15_16_questions24_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article15_16_questions24_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q096",
           "section":"Article15_16",
           "number":"96",
           "type":"option",
           "title" : nr3Data.Article15_16_questions25_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q097",
           "section":"Article15_16",
           "number":"97",
           "type":"text",
           "title" : nr3Data.Article15_16_questions26_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article17",
     "title" : nr3Data.Article17_title,
     "questions":[
        {
           "key":"Q098",
           "section":"Article17",
           "number":"98",
           "type":"option",
           "title" : nr3Data.Article17_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article17_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q099",
           "section":"Article17",
           "number":"99",
           "type":"option",
           "title" : nr3Data.Article17_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article17_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q100",
           "section":"Article17",
           "number":"100",
           "type":"option",
           "title" : nr3Data.Article17_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q101",
           "section":"Article17",
           "number":"101",
           "type":"option",
           "title" : nr3Data.Article17_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.Article17_questions3_options0_title
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article17_questions3_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article17_questions3_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article17_questions3_options3_title
              }
           ]
        },
        {
           "key":"Q102",
           "section":"Article17",
           "number":"102",
           "type":"option",
           "title" : nr3Data.Article17_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article17_questions4_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article17_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q103",
           "section":"Article17",
           "number":"103",
           "type":"option",
           "title" : nr3Data.Article17_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"state",
                 "title" : nr3Data.Article17_questions5_options0_title
              },
              {
                 "value":"bch",
                 "title" : nr3Data.Article17_questions5_options1_title
              },
              {
                 "value":"organization",
                 "title" : nr3Data.Article17_questions5_options2_title
              }
           ]
        },
        {
           "key":"Q104",
           "section":"Article17",
           "number":"104",
           "type":"option",
           "title" : nr3Data.Article17_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article17_questions6_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article17_questions6_options1_title
              },
              {
                 "value":"false.later",
                 "title" : nr3Data.Article17_questions6_options2_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.Article17_questions6_options3_title
              }
           ]
        },
        {
           "key":"Q105",
           "section":"Article17",
           "number":"105",
           "type":"text",
           "title" : nr3Data.Article17_questions7_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article18",
     "title" : nr3Data.Article18_title,
     "questions":[
        {
           "key":"Q106",
           "section":"Article18",
           "number":"106",
           "type":"option",
           "title" : nr3Data.Article18_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q107",
           "section":"Article18",
           "number":"107",
           "type":"option",
           "title" : nr3Data.Article18_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q108",
           "section":"Article18",
           "number":"108",
           "type":"option",
           "title" : nr3Data.Article18_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions2_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q109",
           "section":"Article18",
           "number":"109",
           "type":"option",
           "title" : nr3Data.Article18_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"existing",
                 "title" : nr3Data.Article18_questions3_options0_title
              },
              {
                 "value":"stand-alone",
                 "title" : nr3Data.Article18_questions3_options1_title
              },
              {
                 "value":"existing|stand-alone",
                 "title" : nr3Data.Article18_questions3_options2_title
              }
           ]
        },
        {
           "key":"Q110",
           "section":"Article18",
           "number":"110",
           "type":"option",
           "title" : nr3Data.Article18_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q111",
           "section":"Article18",
           "number":"111",
           "type":"option",
           "title" : nr3Data.Article18_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"existing",
                 "title" : nr3Data.Article18_questions5_options0_title
              },
              {
                 "value":"stand-alone",
                 "title" : nr3Data.Article18_questions5_options1_title
              },
              {
                 "value":"existing|stand-alone",
                 "title" : nr3Data.Article18_questions5_options2_title
              }
           ]
        },
        {
           "key":"Q112",
           "section":"Article18",
           "number":"112",
           "type":"option",
           "title" : nr3Data.Article18_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions6_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q113",
           "section":"Article18",
           "number":"113",
           "type":"option",
           "title" : nr3Data.Article18_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"existing",
                 "title" : nr3Data.Article18_questions7_options0_title
              },
              {
                 "value":"stand-alone",
                 "title" : nr3Data.Article18_questions7_options1_title
              },
              {
                 "value":"existing|stand-alone",
                 "title" : nr3Data.Article18_questions7_options2_title
              }
           ]
        },
        {
           "key":"Q114",
           "section":"Article18",
           "number":"114",
           "type":"option",
           "title" : nr3Data.Article18_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q115",
           "section":"Article18",
           "number":"115",
           "type":"option",
           "title" : nr3Data.Article18_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions9_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q116",
           "section":"Article18",
           "number":"116",
           "type":"option",
           "title" : nr3Data.Article18_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article18_questions10_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article18_questions10_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article18_questions10_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article18_questions10_options4_title
              }
           ]
        },
        {
           "key":"Q117",
           "section":"Article18",
           "number":"117",
           "type":"option",
           "title" : nr3Data.Article18_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article18_questions11_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q118",
           "section":"Article18",
           "number":"118",
           "type":"option",
           "title" : nr3Data.Article18_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article18_questions12_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article18_questions12_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article18_questions12_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article18_questions12_options4_title
              }
           ]
        },
        {
           "key":"Q119",
           "section":"Article18",
           "number":"119",
           "type":"option",
           "title" : nr3Data.Article18_questions13_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q120",
           "section":"Article18",
           "number":"120",
           "type":"option",
           "title" : nr3Data.Article18_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article18_questions14_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article18_questions14_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article18_questions14_options3_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article18_questions14_options4_title
              }
           ]
        },
        {
           "key":"Q121",
           "section":"Article18",
           "number":"121",
           "type":"option",
           "title" : nr3Data.Article18_questions15_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article18_questions15_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article18_questions15_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article18_questions15_options3_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article18_questions15_options4_title
              }
           ]
        },
        {
           "key":"Q122",
           "section":"Article18",
           "number":"122",
           "type":"text",
           "title" : nr3Data.Article18_questions16_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article19",
     "title" : nr3Data.Article19_title,
     "questions":[
        {
           "key":"Q123",
           "section":"Article19",
           "number":"123",
           "type":"option",
           "title" : nr3Data.Article19_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q124",
           "section":"Article19",
           "number":"124",
           "type":"option",
           "title" : nr3Data.Article19_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article19_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q125",
           "section":"Article19",
           "number":"125",
           "type":"text",
           "title" : nr3Data.Article19_questions2_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article20",
     "title" : nr3Data.Article20_title,
     "questions":[
        {
           "key":"Q126_a",
           "section":"Article20",
           "number":"126a",
           "type":"option",
           "title" : nr3Data.Article20_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions0_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions0_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions0_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions0_options3_title
              }
           ]
        },
        {
           "key":"Q126_b",
           "section":"Article20",
           "number":"126b",
           "type":"option",
           "title" : nr3Data.Article20_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions1_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions1_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions1_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions1_options3_title
              }
           ]
        },
        {
           "key":"Q126_c",
           "section":"Article20",
           "number":"126c",
           "type":"option",
           "title" : nr3Data.Article20_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions2_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions2_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions2_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions2_options3_title
              }
           ]
        },
        {
           "key":"Q126_d",
           "section":"Article20",
           "number":"126d",
           "type":"option",
           "title" : nr3Data.Article20_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions3_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions3_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions3_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions3_options3_title
              }
           ]
        },
        {
           "key":"Q126_e",
           "section":"Article20",
           "number":"126e",
           "type":"option",
           "title" : nr3Data.Article20_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions4_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions4_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions4_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions4_options3_title
              }
           ]
        },
        {
           "key":"Q126_f",
           "section":"Article20",
           "number":"126f",
           "type":"option",
           "title" : nr3Data.Article20_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions5_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions5_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions5_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions5_options3_title
              }
           ]
        },
        {
           "key":"Q126_g",
           "section":"Article20",
           "number":"126g",
           "type":"option",
           "title" : nr3Data.Article20_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions6_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions6_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions6_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions6_options3_title
              }
           ]
        },
        {
           "key":"Q126_h",
           "section":"Article20",
           "number":"126h",
           "type":"option",
           "title" : nr3Data.Article20_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions7_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions7_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions7_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions7_options3_title
              }
           ]
        },
        {
           "key":"Q126_i",
           "section":"Article20",
           "number":"126i",
           "type":"option",
           "title" : nr3Data.Article20_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions8_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions8_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions8_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions8_options3_title
              }
           ]
        },
        {
           "key":"Q126_j",
           "section":"Article20",
           "number":"126j",
           "type":"option",
           "title" : nr3Data.Article20_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions9_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions9_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions9_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions9_options3_title
              }
           ]
        },
        {
           "key":"Q126_k",
           "section":"Article20",
           "number":"126k",
           "type":"option",
           "title" : nr3Data.Article20_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions10_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions10_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions10_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions10_options3_title
              }
           ]
        },
        {
           "key":"Q126_l",
           "section":"Article20",
           "number":"126l",
           "type":"option",
           "title" : nr3Data.Article20_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions11_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions11_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions11_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions11_options3_title
              }
           ]
        },
        {
           "key":"Q126_m",
           "section":"Article20",
           "number":"126m",
           "type":"option",
           "title" : nr3Data.Article20_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions12_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions12_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions12_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions12_options3_title
              }
           ]
        },
        {
           "key":"Q126_n",
           "section":"Article20",
           "number":"126n",
           "type":"option",
           "title" : nr3Data.Article20_questions13_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions13_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions13_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions13_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions13_options3_title
              }
           ]
        },
        {
           "key":"Q126_o",
           "section":"Article20",
           "number":"126o",
           "type":"option",
           "title" : nr3Data.Article20_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions14_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions14_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions14_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions14_options3_title
              }
           ]
        },
        {
           "key":"Q126_p",
           "section":"Article20",
           "number":"126p",
           "type":"option",
           "title" : nr3Data.Article20_questions15_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions15_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions15_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions15_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions15_options3_title
              }
           ]
        },
        {
           "key":"Q126_q",
           "section":"Article20",
           "number":"126q",
           "type":"option",
           "title" : nr3Data.Article20_questions16_title,
           "multiple":false,
           "options":[
              {
                 "value":"true.availableOnBch",
                 "title" : nr3Data.Article20_questions16_options0_title
              },
              {
                 "value":"true.availableNotOnBch",
                 "title" : nr3Data.Article20_questions16_options1_title
              },
              {
                 "value":"true.availablePartialyOnBch",
                 "title" : nr3Data.Article20_questions16_options2_title
              },
              {
                 "value":"false.notAvailable",
                 "title" : nr3Data.Article20_questions16_options3_title
              }
           ]
        },
        {
           "key":"Q127",
           "section":"Article20",
           "number":"127",
           "type":"option",
           "title" : nr3Data.Article20_questions17_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article20_questions17_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q128",
           "section":"Article20",
           "number":"128",
           "type":"option",
           "title" : nr3Data.Article20_questions18_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article20_questions18_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q129",
           "section":"Article20",
           "number":"129",
           "type":"option",
           "title" : nr3Data.Article20_questions19_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article20_questions19_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article20_questions19_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q130",
           "section":"Article20",
           "number":"130",
           "type":"option",
           "title" : nr3Data.Article20_questions20_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q131",
           "section":"Article20",
           "number":"131",
           "type":"option",
           "title" : nr3Data.Article20_questions21_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q132",
           "section":"Article20",
           "number":"132",
           "type":"option",
           "title" : nr3Data.Article20_questions22_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article20_questions22_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article20_questions22_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article20_questions22_options3_title
              },
              {
                 "value":"25+",
                 "title" : nr3Data.Article20_questions22_options4_title
              }
           ]
        },
        {
           "key":"Q133",
           "section":"Article20",
           "number":"133",
           "type":"option",
           "title" : nr3Data.Article20_questions23_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article20_questions23_options1_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article20_questions23_options2_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article20_questions23_options3_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article20_questions23_options4_title
              }
           ]
        },
        {
           "key":"Q134",
           "section":"Article20",
           "number":"134",
           "type":"term",
           "title" : nr3Data.Article20_questions24_title,
           "multiple":true,
           "options":[
              {
                 "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                 "title" : nr3Data.Article20_questions24_options0_title
              },
              {
                 "value":"296200C2-3443-4C0C-B892-56CC1F80EF54",
                 "title" : nr3Data.Article20_questions24_options1_title
              },
              {
                 "value":"6449D16B-F360-4ED5-9EB5-F97F060AA3A7",
                 "title" : nr3Data.Article20_questions24_options2_title
              }
           ]
        },
        {
           "key":"Q135",
           "section":"Article20",
           "number":"135",
           "type":"text",
           "title" : nr3Data.Article20_questions25_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article21",
     "title" : nr3Data.Article21_title,
     "questions":[
        {
           "key":"Q136",
           "section":"Article21",
           "number":"136",
           "type":"option",
           "title" : nr3Data.Article21_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article21_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q137",
           "section":"Article21",
           "number":"137",
           "type":"option",
           "title" : nr3Data.Article21_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article21_questions1_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article21_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q138",
           "section":"Article21",
           "number":"138",
           "type":"text",
           "title" : nr3Data.Article21_questions2_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article22",
     "title" : nr3Data.Article22_title,
     "questions":[
        {
           "key":"Q139",
           "section":"Article22",
           "number":"139",
           "type":"option",
           "title" : nr3Data.Article22_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q140",
           "section":"Article22",
           "number":"140",
           "type":"option",
           "title" : nr3Data.Article22_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article22_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q141",
           "section":"Article22",
           "number":"141",
           "type":"option",
           "title" : nr3Data.Article22_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"channels.bilateral",
                 "title" : nr3Data.Article22_questions2_options0_title
              },
              {
                 "value":"channels.regional",
                 "title" : nr3Data.Article22_questions2_options1_title
              },
              {
                 "value":"channels.multilateral",
                 "title" : nr3Data.Article22_questions2_options2_title
              }
           ]
        },
        {
           "key":"Q142",
           "section":"Article22",
           "number":"142",
           "type":"option",
           "title" : nr3Data.Article22_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article22_questions3_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q143",
           "section":"Article22",
           "number":"143",
           "type":"option",
           "title" : nr3Data.Article22_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"channels.bilateral",
                 "title" : nr3Data.Article22_questions4_options0_title
              },
              {
                 "value":"channels.regional",
                 "title" : nr3Data.Article22_questions4_options1_title
              },
              {
                 "value":"channels.multilateral",
                 "title" : nr3Data.Article22_questions4_options2_title
              }
           ]
        },
        {
           "key":"Q144",
           "section":"Article22",
           "number":"144",
           "type":"option",
           "title" : nr3Data.Article22_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q145",
           "section":"Article22",
           "number":"145",
           "type":"option",
           "title" : nr3Data.Article22_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"veryEasy",
                 "title" : nr3Data.Article22_questions6_options0_title
              },
              {
                 "value":"easy",
                 "title" : nr3Data.Article22_questions6_options1_title
              },
              {
                 "value":"average",
                 "title" : nr3Data.Article22_questions6_options2_title
              },
              {
                 "value":"difficult",
                 "title" : nr3Data.Article22_questions6_options3_title
              },
              {
                 "value":"veryDifficult",
                 "title" : nr3Data.Article22_questions6_options4_title
              }
           ]
        },
        {
           "key":"Q146",
           "section":"Article22",
           "number":"146",
           "type":"term",
           "title" : nr3Data.Article22_questions7_title,
           "multiple":true,
           "options":[
              {
                 "value":"C6F5F985-183C-45F7-8A61-5B6DB2F13D10",
                 "title" : nr3Data.Article22_questions7_options0_title
              },
              {
                 "value":"303E8C81-AE0E-4CDE-A791-3DA21CB2",
                 "title" : nr3Data.Article22_questions7_options1_title
              },
              {
                 "value":"2781FB83-5221-4D8F-ACF6-D71423AF",
                 "title" : nr3Data.Article22_questions7_options2_title
              },
              {
                 "value":"BAA4A44E-39CF-41ED-96B1-216ED265A2C3",
                 "title" : nr3Data.Article22_questions7_options3_title
              },
              {
                 "value":"08A3193F-9F13-4587-8106-E6F4F3A7A7F9",
                 "title" : nr3Data.Article22_questions7_options4_title
              },
              {
                 "value":"7FAF8785-54AA-446B-A61E-89F952FE607B",
                 "title" : nr3Data.Article22_questions7_options5_title
              }
           ]
        },
        {
           "key":"Q147",
           "section":"Article22",
           "number":"147",
           "type":"option",
           "title" : nr3Data.Article22_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article22_questions8_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q148",
           "section":"Article22",
           "number":"148",
           "type":"term",
           "title" : nr3Data.Article22_questions9_title,
           "multiple":true,
           "options":[
              {
                 "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                 "title" : nr3Data.Article22_questions9_options0_title
              },
              {
                 "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                 "title" : nr3Data.Article22_questions9_options1_title
              },
              {
                 "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                 "title" : nr3Data.Article22_questions9_options2_title
              },
              {
                 "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                 "title" : nr3Data.Article22_questions9_options3_title
              },
              {
                 "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                 "title" : nr3Data.Article22_questions9_options4_title
              },
              {
                 "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                 "title" : nr3Data.Article22_questions9_options5_title
              },
              {
                 "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                 "title" : nr3Data.Article22_questions9_options6_title
              },
              {
                 "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                 "title" : nr3Data.Article22_questions9_options7_title
              },
              {
                 "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                 "title" : nr3Data.Article22_questions9_options8_title
              },
              {
                 "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                 "title" : nr3Data.Article22_questions9_options9_title
              },
              {
                 "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                 "title" : nr3Data.Article22_questions9_options10_title
              },
              {
                 "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                 "title" : nr3Data.Article22_questions9_options11_title
              },
              {
                 "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                 "title" : nr3Data.Article22_questions9_options12_title
              },
              {
                 "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                 "title" : nr3Data.Article22_questions9_options13_title
              },
              {
                 "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                 "title" : nr3Data.Article22_questions9_options14_title
              }
           ]
        },
        {
           "key":"Q149",
           "section":"Article22",
           "number":"149",
           "type":"option",
           "title" : nr3Data.Article22_questions10_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q150",
           "section":"Article22",
           "number":"150",
           "type":"option",
           "title" : nr3Data.Article22_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q151",
           "section":"Article22",
           "number":"151",
           "type":"option",
           "title" : nr3Data.Article22_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article22_questions12_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q152",
           "section":"Article22",
           "number":"152",
           "type":"term",
           "title" : nr3Data.Article22_questions13_title,
           "multiple":true,
           "options":[
              {
                 "value":"BB3CA716-E122-4445-9FAD-9F6B440363BD",
                 "title" : nr3Data.Article22_questions13_options0_title
              },
              {
                 "value":"68250AA6-75F1-470D-A8E7-85ECDF703D00",
                 "title" : nr3Data.Article22_questions13_options1_title
              },
              {
                 "value":"7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                 "title" : nr3Data.Article22_questions13_options2_title
              },
              {
                 "value":"B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                 "title" : nr3Data.Article22_questions13_options3_title
              },
              {
                 "value":"8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                 "title" : nr3Data.Article22_questions13_options4_title
              },
              {
                 "value":"AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                 "title" : nr3Data.Article22_questions13_options5_title
              },
              {
                 "value":"85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                 "title" : nr3Data.Article22_questions13_options6_title
              },
              {
                 "value":"6F6C058C-6741-4878-A448-AE56299821A8",
                 "title" : nr3Data.Article22_questions13_options7_title
              },
              {
                 "value":"0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                 "title" : nr3Data.Article22_questions13_options8_title
              },
              {
                 "value":"76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                 "title" : nr3Data.Article22_questions13_options9_title
              },
              {
                 "value":"A16727EE-FE61-43FF-8530-35A9C7261247",
                 "title" : nr3Data.Article22_questions13_options10_title
              },
              {
                 "value":"3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                 "title" : nr3Data.Article22_questions13_options11_title
              },
              {
                 "value":"D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                 "title" : nr3Data.Article22_questions13_options12_title
              },
              {
                 "value":"09063980-88D9-4826-9F54-CB3EAC36641A",
                 "title" : nr3Data.Article22_questions13_options13_title
              },
              {
                 "value":"799CD9B1-4571-4C2A-A459-F78E004D7F32",
                 "title" : nr3Data.Article22_questions13_options14_title
              }
           ]
        },
        {
           "key":"Q153",
           "section":"Article22",
           "number":"153",
           "type":"option",
           "title" : nr3Data.Article22_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q154",
           "section":"Article22",
           "number":"154",
           "type":"option",
           "title" : nr3Data.Article22_questions15_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q155",
           "section":"Article22",
           "number":"155",
           "type":"option",
           "title" : nr3Data.Article22_questions16_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1-",
                 "title" : nr3Data.Article22_questions16_options1_title
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article22_questions16_options2_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article22_questions16_options3_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article22_questions16_options4_title
              }
           ]
        },
        {
           "key":"Q156",
           "section":"Article22",
           "number":"156",
           "type":"option",
           "title" : nr3Data.Article22_questions17_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q157",
           "section":"Article22",
           "number":"157",
           "type":"text",
           "title" : nr3Data.Article22_questions18_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article23",
     "title" : nr3Data.Article23_title,
     "questions":[
        {
           "key":"Q158",
           "section":"Article23",
           "number":"158",
           "type":"option",
           "title" : nr3Data.Article23_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q159",
           "section":"Article23",
           "number":"159",
           "type":"option",
           "title" : nr3Data.Article23_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q160",
           "section":"Article23",
           "number":"160",
           "type":"option",
           "title" : nr3Data.Article23_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q161",
           "section":"Article23",
           "number":"161",
           "type":"text",
           "title" : nr3Data.Article23_questions3_title,
           "multiple":false
        },
        {
           "key":"Q162",
           "section":"Article23",
           "number":"162",
           "type":"option",
           "title" : nr3Data.Article23_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q163",
           "section":"Article23",
           "number":"163",
           "type":"option",
           "title" : nr3Data.Article23_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article23_questions5_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article23_questions5_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article23_questions5_options3_title
              },
              {
                 "value":"25+",
                 "title" : nr3Data.Article23_questions5_options4_title
              }
           ]
        },
        {
           "key":"Q164",
           "section":"Article23",
           "number":"164",
           "type":"option",
           "title" : nr3Data.Article23_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions6_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q165",
           "section":"Article23",
           "number":"165",
           "type":"option",
           "title" : nr3Data.Article23_questions7_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions7_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q166",
           "section":"Article23",
           "number":"166",
           "type":"option",
           "title" : nr3Data.Article23_questions8_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions8_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q167",
           "section":"Article23",
           "number":"167",
           "type":"option",
           "title" : nr3Data.Article23_questions9_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions9_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q168",
           "section":"Article23",
           "number":"168",
           "type":"term",
           "title" : nr3Data.Article23_questions10_title,
           "multiple":true,
           "options":[
              {
                 "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                 "title" : nr3Data.Article23_questions10_options0_title
              },
              {
                 "value":"6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                 "title" : nr3Data.Article23_questions10_options1_title
              },
              {
                 "value":"38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                 "title" : nr3Data.Article23_questions10_options2_title
              },
              {
                 "value":"E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                 "title" : nr3Data.Article23_questions10_options3_title
              },
              {
                 "value":"51792A07-B3C0-4F7B-830E-0741635F57BB",
                 "title" : nr3Data.Article23_questions10_options4_title
              }
           ]
        },
        {
           "key":"Q169",
           "section":"Article23",
           "number":"169",
           "type":"term",
           "title" : nr3Data.Article23_questions11_title,
           "multiple":false,
           "options":[
              {
                 "value":"4E205CD9-9958-497F-A760-F8321771AB3A",
                 "title" : nr3Data.Article23_questions11_options0_title
              },
              {
                 "value":"6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                 "title" : nr3Data.Article23_questions11_options1_title
              },
              {
                 "value":"38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                 "title" : nr3Data.Article23_questions11_options2_title
              },
              {
                 "value":"E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                 "title" : nr3Data.Article23_questions11_options3_title
              },
              {
                 "value":"51792A07-B3C0-4F7B-830E-0741635F57BB",
                 "title" : nr3Data.Article23_questions11_options4_title
              }
           ]
        },
        {
           "key":"Q170",
           "section":"Article23",
           "number":"170",
           "type":"option",
           "title" : nr3Data.Article23_questions12_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q171",
           "section":"Article23",
           "number":"171",
           "type":"option",
           "title" : nr3Data.Article23_questions13_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article23_questions13_options1_title
              },
              {
                 "value":"3+",
                 "title" : nr3Data.Article23_questions13_options2_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article23_questions13_options3_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article23_questions13_options4_title
              }
           ]
        },
        {
           "key":"Q172",
           "section":"Article23",
           "number":"172",
           "type":"option",
           "title" : nr3Data.Article23_questions14_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article23_questions14_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article23_questions14_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article23_questions14_options3_title
              },
              {
                 "value":"25+",
                 "title" : nr3Data.Article23_questions14_options4_title
              },
              {
                 "value":"100+",
                 "title" : nr3Data.Article23_questions14_options5_title
              }
           ]
        },
        {
           "key":"Q173",
           "section":"Article23",
           "number":"173",
           "type":"option",
           "title" : nr3Data.Article23_questions15_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article23_questions15_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q174",
           "section":"Article23",
           "number":"174",
           "type":"option",
           "title" : nr3Data.Article23_questions16_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q175",
           "section":"Article23",
           "number":"175",
           "type":"option",
           "title" : nr3Data.Article23_questions17_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.Article23_questions17_options0_title
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article23_questions17_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article23_questions17_options2_title
              },
              {
                 "value":"n/a",
                 "title" : nr3Data.Article23_questions17_options3_title
              }
           ]
        },
        {
           "key":"Q176",
           "section":"Article23",
           "number":"176",
           "type":"text",
           "title" : nr3Data.Article23_questions18_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article24",
     "title" : nr3Data.Article24_title,
     "questions":[
        {
           "key":"Q177",
           "section":"Article24",
           "number":"177",
           "type":"option",
           "title" : nr3Data.Article24_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q178",
           "section":"Article24",
           "number":"178",
           "type":"option",
           "title" : nr3Data.Article24_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q179",
           "section":"Article24",
           "number":"179",
           "type":"option",
           "title" : nr3Data.Article24_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q180",
           "section":"Article24",
           "number":"180",
           "type":"option",
           "title" : nr3Data.Article24_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article24_questions3_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q181",
           "section":"Article24",
           "number":"181",
           "type":"option",
           "title" : nr3Data.Article24_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article24_questions4_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article24_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q182",
           "section":"Article24",
           "number":"182",
           "type":"option",
           "title" : nr3Data.Article24_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Article24_questions5_options0_title
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article24_questions5_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q183",
           "section":"Article24",
           "number":"183",
           "type":"text",
           "title" : nr3Data.Article24_questions6_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article25",
     "title" : nr3Data.Article25_title,
     "questions":[
        {
           "key":"Q184",
           "section":"Article25",
           "number":"184",
           "type":"option",
           "title" : nr3Data.Article25_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions0_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q185",
           "section":"Article25",
           "number":"185",
           "type":"option",
           "title" : nr3Data.Article25_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q186",
           "section":"Article25",
           "number":"186",
           "type":"option",
           "title" : nr3Data.Article25_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.Article25_questions2_options0_title
              },
              {
                 "value":"5-",
                 "title" : nr3Data.Article25_questions2_options1_title
              },
              {
                 "value":"10-",
                 "title" : nr3Data.Article25_questions2_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article25_questions2_options3_title
              }
           ]
        },
        {
           "key":"Q187",
           "section":"Article25",
           "number":"187",
           "type":"option",
           "title" : nr3Data.Article25_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions3_options1_title
              },
              {
                 "value":"true.parties",
                 "title" : nr3Data.Article25_questions3_options2_title
              },
              {
                 "value":"true.bch",
                 "title" : nr3Data.Article25_questions3_options3_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q188",
           "section":"Article25",
           "number":"188",
           "type":"option",
           "title" : nr3Data.Article25_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q189",
           "section":"Article25",
           "number":"189",
           "type":"option",
           "title" : nr3Data.Article25_questions5_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions5_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q190",
           "section":"Article25",
           "number":"190",
           "type":"option",
           "title" : nr3Data.Article25_questions6_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article25_questions6_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q191",
           "section":"Article25",
           "number":"191",
           "type":"text",
           "title" : nr3Data.Article25_questions7_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article26",
     "title" : nr3Data.Article26_title,
     "questions":[
        {
           "key":"Q192",
           "section":"Article26",
           "number":"192",
           "type":"option",
           "title" : nr3Data.Article26_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q193",
           "section":"Article26",
           "number":"193",
           "type":"option",
           "title" : nr3Data.Article26_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article26_questions1_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              },
              {
                 "value":"n/a",
                 "title" : nr3Data.Article26_questions1_options3_title
              }
           ]
        },
        {
           "key":"Q194",
           "section":"Article26",
           "number":"194",
           "type":"option",
           "title" : nr3Data.Article26_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"0",
                 "title" : nr3Data.None
              },
              {
                 "value":"1+",
                 "title" : nr3Data.Article26_questions2_options1_title
              },
              {
                 "value":"5+",
                 "title" : nr3Data.Article26_questions2_options2_title
              },
              {
                 "value":"10+",
                 "title" : nr3Data.Article26_questions2_options3_title
              },
              {
                 "value":"50+",
                 "title" : nr3Data.Article26_questions2_options4_title
              }
           ]
        },
        {
           "key":"Q195",
           "section":"Article26",
           "number":"195",
           "type":"text",
           "title" : nr3Data.Article26_questions3_title,
           "multiple":false
        },
        {
           "key":"Q196",
           "section":"Article26",
           "number":"196",
           "type":"option",
           "title" : nr3Data.Article26_questions4_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"true.some",
                 "title" : nr3Data.Article26_questions4_options1_title
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q197",
           "section":"Article26",
           "number":"197",
           "type":"text",
           "title" : nr3Data.Article26_questions5_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article27",
     "title" : nr3Data.Article27_title,
     "questions":[
        {
           "key":"Q198",
           "section":"Article27",
           "number":"198",
           "type":"option",
           "title" : nr3Data.Article27_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q199",
           "section":"Article27",
           "number":"199",
           "type":"option",
           "title" : nr3Data.Article27_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q200",
           "section":"Article27",
           "number":"200",
           "type":"option",
           "title" : nr3Data.Article27_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q201",
           "section":"Article27",
           "number":"201",
           "type":"option",
           "title" : nr3Data.Article27_questions3_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q202",
           "section":"Article27",
           "number":"202",
           "type":"text",
           "title" : nr3Data.Article27_questions4_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Article28",
     "title" : nr3Data.Article28_title,
     "questions":[
        {
           "key":"Q203",
           "section":"Article28",
           "number":"203",
           "type":"option",
           "title" : nr3Data.Article28_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"USD5000000+",
                 "title" : nr3Data.Article28_questions0_options0_title
              },
              {
                 "value":"USD1000000+",
                 "title" : nr3Data.Article28_questions0_options1_title
              },
              {
                 "value":"USD500000+",
                 "title" : nr3Data.Article28_questions0_options2_title
              },
              {
                 "value":"USD100000+",
                 "title" : nr3Data.Article28_questions0_options3_title
              },
              {
                 "value":"USD50000+",
                 "title" : nr3Data.Article28_questions0_options4_title
              },
              {
                 "value":"USD5000+",
                 "title" : nr3Data.Article28_questions0_options5_title
              },
              {
                 "value":"USD5000-",
                 "title" : nr3Data.Article28_questions0_options6_title
              }
           ]
        }
     ]
  },
  {
     "key":"Article33",
     "title" : nr3Data.Article33_title,
     "questions":[
        {
           "key":"Q204_a",
           "section":"Article33",
           "number":"204a",
           "type":"option",
           "title" : nr3Data.Article33_questions0_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q204_b",
           "section":"Article33",
           "number":"204b",
           "type":"option",
           "title" : nr3Data.Article33_questions1_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q205",
           "section":"Article33",
           "number":"205",
           "type":"option",
           "title" : nr3Data.Article33_questions2_title,
           "multiple":false,
           "options":[
              {
                 "value":"true",
                 "title" : nr3Data.Yes
              },
              {
                 "value":"false",
                 "title" : nr3Data.No
              }
           ]
        },
        {
           "key":"Q206",
           "section":"Article33",
           "number":"206",
           "type":"term",
           "title" : nr3Data.Article33_questions3_title,
           "multiple":true,
           "options":[
              {
                 "value":"9D149B05-B490-43BC-BE81-473F4A15D5AC",
                 "title" : nr3Data.Article33_questions3_options0_title
              },
              {
                 "value":"CCACEEF3-01E5-4E19-BE04-01E673A0DDE5",
                 "title" : nr3Data.Article33_questions3_options1_title
              },
              {
                 "value":"6EEDA8B0-1096-45C9-BB43-6DA7E6C2FB0F",
                 "title" : nr3Data.Article33_questions3_options2_title
              },
              {
                 "value":"6C994EFC-EF9C-457E-95B4-FA55BFFEAC38",
                 "title" : nr3Data.Article33_questions3_options3_title
              }
           ]
        }
     ]
  },
  {
     "key":"AdditionalInformation",
     "title" : nr3Data.AdditionalInformation_title,
     "questions":[
        {
           "key":"Q207",
           "section":"AdditionalInformation",
           "number":"207",
           "type":"text",
           "title" : nr3Data.AdditionalInformation_questions0_title,
           "multiple":false
        }
     ]
  },
  {
     "key":"Comments",
     "title" : nr3Data.Comments_title,
     "questions":[
        {
           "key":"Q208",
           "section":"Comments",
           "number":"208",
           "type":"text",
           "title" : nr3Data.Comments_questions0_title,
           "multiple":false
        }
     ]
  }
]