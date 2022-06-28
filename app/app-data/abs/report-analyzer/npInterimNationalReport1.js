import nr1Data from '~/app-text/report-analyzer/abs-npInterimNationalReport1.json';

export const npInterimNationalReport1 = [
    {
       "key":"General",
       "title" : nr1Data.General_title,
       "questions":[
          {
             "key":"Q003",
             "section":"General",
             "number":"3",
             "type":"option",
             "title" : nr1Data.General_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.General_questions0_additionalInfo1_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q004",
             "section":"General",
             "number":"4",
             "type":"option",
             "title" : nr1Data.General_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.General_questions1_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions1_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q005",
             "section":"General",
             "number":"5",
             "type":"option",
             "title" : nr1Data.General_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions2_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.General_questions2_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions2_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q006",
             "section":"General",
             "number":"6",
             "type":"option",
             "title" : nr1Data.General_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions3_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.General_questions3_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions3_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q007",
             "section":"General",
             "number":"7",
             "type":"option",
             "title" : nr1Data.General_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                },
                {
                   "value":"false.notApplicable",
                   "title" : nr1Data.General_questions4_options2_title
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions4_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.General_questions4_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions4_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q008",
             "section":"General",
             "number":"8",
             "type":"option",
             "title" : nr1Data.General_questions5_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                },
                {
                   "value":"false.notApplicable",
                   "title" : nr1Data.General_questions5_options2_title
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.General_questions5_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions5_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q009",
             "section":"General",
             "number":"9",
             "type":"option",
             "title" : nr1Data.General_questions6_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.General_questions6_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.General_questions6_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions6_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q010",
             "section":"General",
             "number":"10",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.General_questions7_title,
             "subTitle" : nr1Data.General_questions7_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.General_questions7_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.General_questions7_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"Access",
       "title" : nr1Data.Access_title,
       "questions":[
          {
             "key":"Q011",
             "section":"Access",
             "number":"11",
             "type":"option",
             "title" : nr1Data.Access_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.Access_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions0_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions0_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q012",
             "section":"Access",
             "number":"12",
             "type":"option",
             "title" : nr1Data.Access_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q013",
             "section":"Access",
             "number":"13",
             "type":"option",
             "title" : nr1Data.Access_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions2_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions2_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q014",
             "section":"Access",
             "number":"14",
             "type":"option",
             "title" : nr1Data.Access_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions3_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions3_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q015",
             "section":"Access",
             "number":"15",
             "type":"option",
             "title" : nr1Data.Access_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions4_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions4_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q016",
             "section":"Access",
             "number":"16",
             "type":"number",
             "title" : nr1Data.Access_questions5_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions5_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions5_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q017",
             "section":"Access",
             "number":"17",
             "type":"option",
             "title" : nr1Data.Access_questions6_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions6_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions6_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q018",
             "section":"Access",
             "number":"18",
             "type":"option",
             "title" : nr1Data.Access_questions7_title,
             "multiple":true,
             "options":[
                {
                   "value":"geneticResources",
                   "title" : nr1Data.Access_questions7_options0_title
                },
                {
                   "value":"geneticResources.monetary",
                   "title" : nr1Data.Access_questions7_options1_title
                },
                {
                   "value":"geneticResources.nonMonetary",
                   "title" : nr1Data.Access_questions7_options2_title
                },
                {
                   "value":"tk",
                   "title" : nr1Data.Access_questions7_options3_title
                },
                {
                   "value":"tk.monetary",
                   "title" : nr1Data.Access_questions7_options4_title
                },
                {
                   "value":"tk.nonMonetary",
                   "title" : nr1Data.Access_questions7_options5_title
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Access_questions7_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions7_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q019",
             "section":"Access",
             "number":"19",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.Access_questions8_title,
             "subTitle" : nr1Data.Access_questions8_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Access_questions8_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.Access_questions8_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"Benefit-Sharing",
       "title" : nr1Data.Benefit_Sharing_title,
       "questions":[
          {
             "key":"Q020",
             "section":"Benefit-Sharing",
             "number":"20",
             "type":"option",
             "title" : nr1Data.Benefit_Sharing_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Benefit_Sharing_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Benefit_Sharing_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q021",
             "section":"Benefit-Sharing",
             "number":"21",
             "type":"option",
             "title" : nr1Data.Benefit_Sharing_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Benefit_Sharing_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Benefit_Sharing_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q022",
             "section":"Benefit-Sharing",
             "number":"22",
             "type":"option",
             "title" : nr1Data.Benefit_Sharing_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Benefit_Sharing_questions2_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Benefit_Sharing_questions2_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q023",
             "section":"Benefit-Sharing",
             "number":"23",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.Benefit_Sharing_questions3_title,
             "subTitle" : nr1Data.Benefit_Sharing_questions3_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Benefit_Sharing_questions3_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.Benefit_Sharing_questions3_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"Compliance",
       "title" : nr1Data.Compliance_title,
       "questions":[
          {
             "key":"Q024_a",
             "section":"Compliance",
             "number":"24.1",
             "type":"option",
             "title" : nr1Data.Compliance_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q024_b",
             "section":"Compliance",
             "number":"24.2",
             "type":"option",
             "title" : nr1Data.Compliance_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"complianceInfo",
                   "title" : nr1Data.Compliance_questions1_additionalInfo1_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q024_c",
             "section":"Compliance",
             "number":"24.3",
             "type":"option",
             "title" : nr1Data.Compliance_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions2_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q025_a",
             "section":"Compliance",
             "number":"25.1",
             "type":"option",
             "title" : nr1Data.Compliance_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions3_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions3_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q025_b",
             "section":"Compliance",
             "number":"25.2",
             "type":"option",
             "title" : nr1Data.Compliance_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ]
          },
          {
             "key":"Q025_c",
             "section":"Compliance",
             "number":"25.3",
             "type":"option",
             "title" : nr1Data.Compliance_questions5_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions5_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q026_a",
             "section":"Compliance",
             "number":"26.1",
             "type":"option",
             "title" : nr1Data.Compliance_questions6_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions6_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions6_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q026_b",
             "section":"Compliance",
             "number":"26.2",
             "type":"option",
             "title" : nr1Data.Compliance_questions7_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.Compliance_questions7_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q027_a",
             "section":"Compliance",
             "number":"27.1",
             "type":"option",
             "title" : nr1Data.Compliance_questions8_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.Compliance_questions8_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"recordCounts",
                   "title" : nr1Data.Compliance_questions8_additionalInfo1_title,
                   "type":"number"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions8_additionalInfo2_title,
                   "type":"fileLinks"
                }
             ]
          },
          {
             "key":"Q027_b",
             "section":"Compliance",
             "number":"27.2",
             "type":"option",
             "title" : nr1Data.Compliance_questions9_title,
             "multiple":false,
             "options":[
                {
                   "value":"yes",
                   "title": nr1Data.Yes
                },
                {
                   "value":"no",
                   "title": nr1Data.No
                },
                {
                   "value":"other",
                   "title": nr1Data.Other
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions9_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q028",
             "section":"Compliance",
             "number":"28",
             "type":"option",
             "title" : nr1Data.Compliance_questions10_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions10_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions10_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q029",
             "section":"Compliance",
             "number":"29",
             "type":"option",
             "title" : nr1Data.Compliance_questions11_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.Compliance_questions11_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.Compliance_questions11_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions11_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q030",
             "section":"Compliance",
             "number":"30",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.Compliance_questions12_title,
             "subTitle" : nr1Data.Compliance_questions12_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.Compliance_questions12_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.Compliance_questions12_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"ComplianceMat",
       "title" : nr1Data.ComplianceMat_title,
       "questions":[
          {
             "key":"Q031",
             "section":"ComplianceMat",
             "number":"31",
             "type":"option",
             "title" : nr1Data.ComplianceMat_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                },
                {
                   "value":"false.notApplicable",
                   "title" : nr1Data.ComplianceMat_questions0_options2_title
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.ComplianceMat_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.ComplianceMat_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q032",
             "section":"ComplianceMat",
             "number":"32",
             "type":"option",
             "title" : nr1Data.ComplianceMat_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.ComplianceMat_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.ComplianceMat_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q033",
             "section":"ComplianceMat",
             "number":"33",
             "type":"header",
             "title" : nr1Data.ComplianceMat_questions2_title,
             "multiple":false
          },
          {
             "key":"Q033_a",
             "section":"ComplianceMat",
             "number":"33.1",
             "type":"option",
             "title" : nr1Data.ComplianceMat_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.ComplianceMat_questions3_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q033_b",
             "section":"ComplianceMat",
             "number":"33.2",
             "type":"option",
             "title" : nr1Data.ComplianceMat_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.ComplianceMat_questions4_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q034",
             "section":"ComplianceMat",
             "number":"34",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.ComplianceMat_questions5_title,
             "subTitle" : nr1Data.ComplianceMat_questions5_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.ComplianceMat_questions5_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.ComplianceMat_questions5_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"specialConsiderations",
       "title" : nr1Data.specialConsiderations_title,
       "questions":[
          {
             "key":"Q035",
             "section":"specialConsiderations",
             "number":"35",
             "type":"header",
             "title" : nr1Data.specialConsiderations_questions0_title,
             "multiple":false
          },
          {
             "key":"Q035_a",
             "section":"specialConsiderations",
             "number":"35.1",
             "type":"option",
             "title" : nr1Data.specialConsiderations_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.specialConsiderations_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.specialConsiderations_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q035_b",
             "section":"specialConsiderations",
             "number":"35.2",
             "type":"option",
             "title" : nr1Data.specialConsiderations_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.specialConsiderations_questions2_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.specialConsiderations_questions2_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q035_c",
             "section":"specialConsiderations",
             "number":"35.3",
             "type":"option",
             "title" : nr1Data.specialConsiderations_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.specialConsiderations_questions3_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.specialConsiderations_questions3_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q035_d",
             "section":"specialConsiderations",
             "number":"35.4",
             "type":"option",
             "title" : nr1Data.specialConsiderations_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.specialConsiderations_questions4_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.specialConsiderations_questions4_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q036",
             "section":"specialConsiderations",
             "number":"36",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.specialConsiderations_questions5_title,
             "subTitle" : nr1Data.specialConsiderations_questions5_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.specialConsiderations_questions5_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.specialConsiderations_questions5_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"indigenousProvisions",
       "title" : nr1Data.indigenousProvisions_title,
       "questions":[
          {
             "key":"Q037",
             "section":"indigenousProvisions",
             "number":"37",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q038_a",
             "section":"indigenousProvisions",
             "number":"38.1",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q038_b",
             "section":"indigenousProvisions",
             "number":"38.2",
             "type":"text",
             "field":"furtherInfo",
             "subTitle" : nr1Data.indigenousProvisions_questions2_subTitle,
             "title" : nr1Data.indigenousProvisions_questions2_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions2_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q038_c",
             "section":"indigenousProvisions",
             "number":"38.3",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions3_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q038_d",
             "section":"indigenousProvisions",
             "number":"38.4",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions4_additionalInfo0_title,
                   "type":"string"
                }
             ]
          },
          {
             "key":"Q039",
             "section":"indigenousProvisions",
             "number":"39",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions5_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions5_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions5_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q040",
             "section":"indigenousProvisions",
             "number":"40",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions6_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions6_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions6_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q041",
             "section":"indigenousProvisions",
             "number":"41",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions7_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions7_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions7_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q042",
             "section":"indigenousProvisions",
             "number":"42",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions8_title,
             "multiple":true,
             "options":[
                {
                   "value":"community",
                   "title" : nr1Data.indigenousProvisions_questions8_options0_title
                },
                {
                   "value":"mat",
                   "title" : nr1Data.indigenousProvisions_questions8_options1_title
                },
                {
                   "value":"mcc",
                   "title" : nr1Data.indigenousProvisions_questions8_options2_title
                }
             ]
          },
          {
             "key":"Q043",
             "section":"indigenousProvisions",
             "number":"43",
             "type":"option",
             "title" : nr1Data.indigenousProvisions_questions9_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.indigenousProvisions_questions9_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions9_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q044",
             "section":"indigenousProvisions",
             "number":"44",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.indigenousProvisions_questions10_title,
             "subTitle" : nr1Data.indigenousProvisions_questions10_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.indigenousProvisions_questions10_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.indigenousProvisions_questions10_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"conservationSustainable",
       "title" : nr1Data.conservationSustainable_title,
       "questions":[
          {
             "key":"Q045",
             "section":"conservationSustainable",
             "number":"45",
             "type":"option",
             "title" : nr1Data.conservationSustainable_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.conservationSustainable_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.conservationSustainable_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q046",
             "section":"conservationSustainable",
             "number":"46",
             "type":"text",
             "field":"furtherInfo",
             "subTitle" : nr1Data.conservationSustainable_questions1_subTitle,
             "title" : nr1Data.conservationSustainable_questions1_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.conservationSustainable_questions1_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q047",
             "section":"conservationSustainable",
             "number":"47",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.conservationSustainable_questions2_title,
             "subTitle" : nr1Data.conservationSustainable_questions2_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.conservationSustainable_questions2_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.conservationSustainable_questions2_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"transboundary",
       "title" : nr1Data.transboundary_title,
       "questions":[
          {
             "key":"Q048",
             "section":"transboundary",
             "number":"48",
             "type":"option",
             "title" : nr1Data.transboundary_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"ilcInfo",
                   "title" : nr1Data.transboundary_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.transboundary_questions0_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.transboundary_questions0_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q049",
             "section":"transboundary",
             "number":"49",
             "type":"option",
             "title" : nr1Data.transboundary_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                },
                {
                   "value":"false.notApplicable",
                   "title" : nr1Data.transboundary_questions1_options2_title
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.transboundary_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.transboundary_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q050",
             "section":"transboundary",
             "number":"50",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.transboundary_questions2_title,
             "subTitle" : nr1Data.transboundary_questions2_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.transboundary_questions2_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.transboundary_questions2_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"modelContractualClause",
       "title" : nr1Data.modelContractualClause_title,
       "questions":[
          {
             "key":"Q051",
             "section":"modelContractualClause",
             "number":"51",
             "type":"option",
             "title" : nr1Data.modelContractualClause_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.modelContractualClause_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.modelContractualClause_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q052",
             "section":"modelContractualClause",
             "number":"52",
             "type":"option",
             "title" : nr1Data.modelContractualClause_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.modelContractualClause_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.modelContractualClause_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q053",
             "section":"modelContractualClause",
             "number":"53",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.modelContractualClause_questions2_title,
             "subTitle" : nr1Data.modelContractualClause_questions2_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.modelContractualClause_questions2_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.modelContractualClause_questions2_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"awarenessRaising",
       "title" : nr1Data.awarenessRaising_title,
       "questions":[
          {
             "key":"Q054_a",
             "section":"awarenessRaising",
             "number":"54.1",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions0_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q054_b",
             "section":"awarenessRaising",
             "number":"54.2",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions1_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q055_a",
             "section":"awarenessRaising",
             "number":"55.1",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions2_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions2_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q055_b",
             "section":"awarenessRaising",
             "number":"55.2",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions3_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions3_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions3_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q056",
             "section":"awarenessRaising",
             "number":"56",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions4_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions4_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions4_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q057",
             "section":"awarenessRaising",
             "number":"57",
             "type":"option",
             "title" : nr1Data.awarenessRaising_questions5_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.awarenessRaising_questions5_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions5_additionalInfo1_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q058",
             "section":"awarenessRaising",
             "number":"58",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.awarenessRaising_questions6_title,
             "subTitle" : nr1Data.awarenessRaising_questions6_subTitle,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.awarenessRaising_questions6_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.awarenessRaising_questions6_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"technology",
       "title" : nr1Data.technology_title,
       "questions":[
          {
             "key":"Q059",
             "section":"technology",
             "number":"59",
             "type":"option",
             "title" : nr1Data.technology_questions0_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.technology_questions0_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.technology_questions0_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.technology_questions0_additionalInfo2_title,
                   "type":"list"
                }
             ]
          }
       ]
    },
    {
       "key":"optional",
       "title" : nr1Data.optional_title,
       "questions":[
          {
             "key":"Q060",
             "section":"optional",
             "number":"60",
             "type":"text",
             "field":"challengesInfo",
             "title" : nr1Data.optional_questions0_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions0_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q061",
             "section":"optional",
             "number":"61",
             "type":"option",
             "title" : nr1Data.optional_questions1_title,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"additionalInfo",
                   "title" : nr1Data.optional_questions1_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.optional_questions1_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions1_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q062_a",
             "section":"optional",
             "number":"62.1",
             "type":"option",
             "title" : nr1Data.optional_questions2_title,
             "multiple":false,
             "options":[
                {
                   "value":"donor",
                   "title" : nr1Data.optional_questions2_options0_title
                },
                {
                   "value":"recipient",
                   "title" : nr1Data.optional_questions2_options1_title
                },
                {
                   "value":"recipient.parties",
                   "title" : nr1Data.optional_questions2_options2_title
                },
                {
                   "value":"recipient.financialInstitutions",
                   "title" : nr1Data.optional_questions2_options3_title
                },
                {
                   "value":"recipient.gef",
                   "title" : nr1Data.optional_questions2_options4_title
                },
                {
                   "value":"recipient.npImplementationFund",
                   "title" : nr1Data.optional_questions2_options5_title
                },
                {
                   "value":"recipient.otherSources",
                   "title" : nr1Data.optional_questions2_options6_title
                },
                {
                   "value":"no",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions2_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q062_b",
             "section":"optional",
             "number":"62.2",
             "type":"text",
             "shortTitle":"Free text",
             "field":"relevantInformation",
             "title" : nr1Data.optional_questions3_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions3_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q062_c",
             "section":"optional",
             "number":"62.3",
             "type":"text",
             "shortTitle":"Free text",
             "field":"relevantInformation",
             "title" : nr1Data.optional_questions4_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions4_additionalInfo0_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q063_a",
             "section":"optional",
             "number":"63.1",
             "type":"option",
             "title" : nr1Data.optional_questions5_title,
             "subTitle" : nr1Data.optional_questions5_subTitle,
             "multiple":false,
             "options":[
                {
                   "value":"true",
                   "title": nr1Data.Yes
                },
                {
                   "value":"false",
                   "title": nr1Data.No
                }
             ],
             "additionalInfo":[
                {
                   "field":"challengesInfo",
                   "title" : nr1Data.optional_questions5_additionalInfo0_title,
                   "type":"string"
                },
                {
                   "field":"furtherInfo",
                   "title" : nr1Data.optional_questions5_additionalInfo1_title,
                   "type":"string"
                },
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions5_additionalInfo2_title,
                   "type":"list"
                }
             ]
          },
          {
             "key":"Q063_b",
             "section":"optional",
             "number":"63.2",
             "type":"option",
             "title" : nr1Data.optional_questions6_title,
             "multiple":false,
             "options":[
                {
                   "value":"one",
                   "title" : nr1Data.optional_questions6_options0_title
                },
                {
                   "value":"Less than 5",
                   "title" : nr1Data.optional_questions6_options1_title
                },
                {
                   "value":"Less than 10",
                   "title" : nr1Data.optional_questions6_options2_title
                },
                {
                   "value":"10 or more",
                   "title" : nr1Data.optional_questions6_options3_title
                }
             ]
          },
          {
             "key":"Q064",
             "section":"awarenessRaising",
             "number":"64",
             "type":"text",
             "shortTitle":"Free text",
             "field":"furtherInfo",
             "title" : nr1Data.optional_questions7_title,
             "multiple":false,
             "additionalInfo":[
                {
                   "field":"documentReferenceIDs",
                   "title" : nr1Data.optional_questions7_additionalInfo0_title,
                   "type":"list"
                },
                {
                   "field":"relevantDocuments",
                   "title" : nr1Data.optional_questions7_additionalInfo1_title,
                   "type":"fileLinks"
                }
             ]
          }
       ]
    },
    {
       "key":"comments",
       "title" : nr1Data.comments_title,
       "questions":[
          {
             "key":"Q065",
             "section":"comments",
             "number":"65",
             "type":"text",
             "title" : nr1Data.comments_questions0_title,
             "multiple":false
          }
       ]
    }
 ]