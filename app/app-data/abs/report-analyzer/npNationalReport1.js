import nr1T from '../../../app-text/views/forms/edit/abs/edit-national-report-1.json';

export const npNationalReport1 = [
   {
      "key": "Part-II",
      "title": nr1T.part_II_title,
      "questions": [
         {
            "key": "Article13.1",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.article13_1
         },
         {
            "key": "Q003",
            "section": "Part-II",
            "number": "3",
            "type": "option",
            "title": nr1T.part_II_question3_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               }
            ]
         },
         {
            "key": "Article13.2",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.article13_2
         },
         {
            "key": "Q004",
            "section": "Part-II",
            "number": "4",
            "type": "option",
            "title": nr1T.part_II_question4_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               }
            ],
            "validations": [
               {
                  "question": "Q004_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q004_b",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "Q004_a",
            "section": "Part-II",
            "number": "4.1",
            "type": "option",
            "title": nr1T.part_II_question4_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Q004_b",
            "section": "Part-II",
            "number": "4.2",
            "type": "option",
            "title": nr1T.part_II_question4_2_title,
            "multiple": false,
            "mandatory": true,    
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },

         {
            "key": "Article17",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.article17
         },
         {
            "key": "Q005",
            "section": "Part-II",
            "number": "5",
            "type": "option",
            "title": nr1T.part_II_question5_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.provideMoreInfo
               }
            ],
            "validations": [
               {
                  "question": "Q005_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q005_b",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "Q005_a",
            "section": "Part-II",
            "number": "5.1",
            "type": "option",
            "title": nr1T.part_II_question5_1_title,
            "multiple": false,
            "mandatory": true,          
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Q005_b",
            "section": "Part-II",
            "number": "5.2",
            "type": "option",
            "title": nr1T.part_II_question5_2_title,
            "multiple": false,      
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Q006",
            "section": "Part-II",
            "number": "6",
            "type": "link",
            "title": nr1T.part_II_question6_title,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-III",
      "title": nr1T.part_III_title,
      "questions": [
         {
            "key": "Q007",
            "section": "Part-III",
            "number": "7",
            "type": "option",
            "title": nr1T.part_III_question7_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q007_a",
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
            "key": "Q007_a",
            "section": "Part-III",
            "number": "7.1",
            "type": "option",
            "title": nr1T.part_III_question7_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.part_III_question7_1_option0_title
               },
               {
                  "value": "true.some",
                  "title": nr1T.part_III_question7_1_option1_title
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Article6.1",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_1
         },
         {
            "key": "Q008",
            "section": "Part-III",
            "number": "8",
            "type": "option",
            "title": nr1T.part_III_question8_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.part_III_question8_option2_title,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "question9_legend",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.part_III_question9_legend_title
         },
         {
            "key": "Article6.3_b",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_3b
         },
         {
            "key": "Q009",
            "section": "Part-III",
            "number": "9",
            "type": "option",
            "title": nr1T.part_III_question9_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article6.3_c",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_3c
         },
         {
            "key": "Q010",
            "section": "Part-III",
            "number": "10",
            "type": "option",
            "title": nr1T.part_III_question10_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q010_a",
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
            "key": "Q010_a",
            "section": "Part-II",
            "number": "10.1",
            "type": "option",
            "title": nr1T.part_III_question10_1_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },


         {
            "key": "Article6.3_d",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_3d
         },
         {
            "key": "Q011",
            "section": "Part-III",
            "number": "11",
            "type": "option",
            "title": nr1T.part_III_question11_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },




         {
            "key": "Article6.3_e",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_3e
         },
         {
            "key": "Q012",
            "section": "Part-III",
            "number": "12",
            "type": "option",
            "title": nr1T.part_III_question12_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q012_a",
                  "values": [
                     "true",
                     "true.some"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q012_b",
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
            "key": "Q012_a",
            "section": "Part-III",
            "number": "12.1",
            "type": "int",
            "title": nr1T.part_III_question12_1_title,
            "multiple": false,
            "mandatory": true,
            "additionalInformation":[
               {
                  "field":"furtherInfo",
                  "title" : nr1T.additionalInformation,
                  "type":"string"
               }
            ]
         },
         {
            "key": "Q012_b",
            "section": "Part-III",
            "number": "12.2",
            "type": "option",
            "title": nr1T.part_III_question12_2_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases,
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article6.3_g",
            "section": "Part-III",
            "number": "",
            "type": "legend",
            "title": nr1T.article6_3g
         },
         {
            "key": "Q013",
            "section": "Part-III",
            "number": "13",
            "type": "option",
            "title": nr1T.part_III_question13_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q013_a",
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
            "key": "Q013_a",
            "section": "Part-III",
            "number": "13.1",
            "type": "option",
            "title": nr1T.part_III_question13_1_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },

         {
            "key": "Q014",
            "section": "Part-III",
            "number": "14",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }

      ]
   },
   {
      "key": "Part-IV",
      "title": nr1T.part_VI_title,
      "questions": [
         {
            "key": "Article15_3",
            "section": "Part-IV",
            "number": "",
            "type": "legend",
            "title": nr1T.article15_3
         },
         {
            "key": "Q015",
            "section": "Part-IV",
            "number": "15",
            "type": "option",
            "title": nr1T.part_IV_question15_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article15_2",
            "section": "Part-IV",
            "number": "",
            "type": "legend",
            "title": nr1T.article15_2
         },
         {
            "key": "Q016",
            "section": "Part-IV",
            "number": "16",
            "type": "option",
            "title": nr1T.part_IV_question16_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article15_5",
            "section": "Part-IV",
            "number": "",
            "type": "legend",
            "title": nr1T.article15_5
         },
         {
            "key": "Q017",
            "section": "Part-IV",
            "number": "17",
            "type": "option",
            "title": nr1T.part_IV_question17_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q018",
            "section": "Part-IV",
            "number": "18",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-V",
      "title": nr1T.part_V_title,
      "questions": [
         {
            "key": "Article15",
            "section": "Part-V",
            "number": "",
            "type": "legend",
            "title": nr1T.article15
         },
         {
            "key": "Q019",
            "section": "Part-V",
            "number": "19",
            "type": "option",
            "title": nr1T.part_V_question19_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q019_a",
                  "values": [
                     "true",
                     "true.some"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q019_b",
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
            "key": "Q019_a",
            "section": "Part-V",
            "number": "19.1",
            "type": "option",
            "title": nr1T.part_V_question19_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ],
         },
         {
            "key": "Q019_b",
            "section": "Part-V",
            "number": "19.2",
            "type": "option",
            "title": nr1T.part_V_question19_2_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]
         },
         {
            "key": "Article16",
            "section": "Part-V",
            "number": "",
            "type": "legend",
            "title": nr1T.article16
         },
         {
            "key": "Q020",
            "section": "Part-V",
            "number": "20",
            "type": "option",
            "title": nr1T.part_V_question20_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q020_a",
                  "values": [
                     "true",
                     "true.some"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q020_b",
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
            "key": "Q020_a",
            "section": "Part-V",
            "number": "20.1",
            "type": "option",
            "title": nr1T.part_V_question20_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]
         },
         {
            "key": "Q020_b",
            "section": "Part-V",
            "number": "20.2",
            "type": "option",
            "title": nr1T.part_V_question20_2_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]
         },

         {
            "key": "Article17_1_a",
            "section": "Part-V",
            "number": "",
            "type": "legend",
            "title": nr1T.article17_1a
         },
         {
            "key": "Q021",
            "section": "Part-V",
            "number": "21",
            "type": "option",
            "title": nr1T.part_V_question21_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q021_a",
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
            "key": "Q021_a",
            "section": "Part-V",
            "number": "21.1",
            "type": "option",
            "title": nr1T.part_V_question21_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ],
            "validations": [
               {
                  "question": "Q021_b",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q021_c",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "Q021_b",
            "section": "Part-V",
            "number": "21.2",
            "type": "option",
            "title": nr1T.part_V_question21_2_title,
            "multiple": false,    
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
                  
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q021_c",
            "section": "Part-V",
            "number": "21.3",
            "type": "option",
            "title": nr1T.part_V_question21_3_title,
            "multiple": false,   
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Article17_1_b",
            "section": "Part-V",
            "number": "",
            "type": "legend",
            "title": nr1T.article17_1b
         },
         {
            "key": "Q022",
            "section": "Part-V",
            "number": "22",
            "type": "option",
            "title": nr1T.part_V_question22_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article17_1_c",
            "section": "Part-V",
            "number": "",
            "type": "legend",
            "title": nr1T.article17_1c
         },
         {
            "key": "Q023",
            "section": "Part-V",
            "number": "23",
            "type": "option",
            "title": nr1T.part_V_question23_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q024",
            "section": "Part-V",
            "number": "24",
            "type": "link",
            "title": nr1T.part_V_question24_title,
            "multiple": false
         }

      ]
   },
   {
      "key": "Part-VI",
      "title": nr1T.part_VI_title,
      "questions": [
         {
            "key": "Article18.1",
            "section": "Part-VI",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_1
         },
         {
            "key": "Q025",
            "section": "Part-VI",
            "number": "25",
            "type": "option",
            "title": nr1T.part_VI_question25_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article18.2",
            "section": "Part-VI",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_2
         },
         {
            "key": "Q026",
            "section": "Part-VI",
            "number": "26",
            "type": "option",
            "title": nr1T.part_VI_question26_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article18_3_a",
            "section": "Part-VI",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_3a
         },
         {
            "key": "Q027",
            "section": "Part-VI",
            "number": "27",
            "type": "option",
            "title": nr1T.part_VI_question27_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Article_18_3_b",
            "section": "Part-VI",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_3b
         },
         {
            "key": "Q028",
            "section": "Part-VI",
            "number": "28",
            "type": "option",
            "title": nr1T.part_VI_question28_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q029",
            "section": "Part-VI",
            "number": "29",
            "type": "link",
            "title": nr1T.part_VI_question29_title,
            "multiple": false
         }

      ]
   },
 
   {
      "key": "Part-VII",
      "title": nr1T.part_VII_title,
      "questions": [
         {
            "key": "Article18_a",
            "section": "Part-VII",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_a
         },
         {
            "key": "Q030",
            "section": "Part-VII",
            "number": "30",
            "type": "option",
            "title": nr1T.part_VII_question30_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false.na",
                  "title": nr1T.notApplicable,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },


         {
            "key": "Article18_b",
            "section": "Part-VII",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_b
         },
         {
            "key": "Q031",
            "section": "Part-VII",
            "number": "31",
            "type": "option",
            "title": nr1T.part_VII_question31_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ],
            "validations": [
               {
                  "question": "Q031_a",
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
            "key": "Q031_a",
            "section": "Part-VII",
            "number": "31.1",
            "type": "option",
            "title": nr1T.part_VII_question31_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]
         },


         {
            "key": "Article18_c",
            "section": "Part-VII",
            "number": "",
            "type": "legend",
            "title": nr1T.article18_c
         },
         {
            "key": "Q032",
            "section": "Part-VII",
            "number": "32",
            "type": "option",
            "title": nr1T.part_VII_question32_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q033",
            "section": "Part-VII",
            "number": "33",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-VIII",
      "title": nr1T.part_VIII_title,
      "questions": [
         {
            "key": "Q034",
            "section": "Part-VIII",
            "number": "34",
            "type": "option",
            "title": nr1T.part_VIII_question34_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ],
            "validations": [
               {
                  "question": "Q035",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q036",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q037",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q038",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q039",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q040",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q041",
                  "values": [
                     "false"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "question35_legend",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.part_VIII_question35_legend_title
         },
         {
            "key": "Article16.2_and_6.3",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article16_2_and_6_3
         },
         
         {
            "key": "Q035",
            "section": "Part-VIII",
            "number": "35",
            "type": "option",
            "title": nr1T.part_VIII_question35_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.part_VIII_question35_custom_caption
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.part_VIII_question35_custom_caption
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.part_VIII_question35_custom_caption
               }
            ],
            "validations": [
               {
                  "question": "Q035_a",
                  "values": [
                     "true",
                     "true.some"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q035_b",
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
            "key": "Q035_a",
            "section": "Part-VIII",
            "number": "35.1",
            "type": "option",
            "title": nr1T.part_VIII_question35_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Q035_b",
            "section": "Part-VIII",
            "number": "35.2",
            "type": "option",
            "title": nr1T.part_VIII_question35_2_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         },
         {
            "key": "Article7",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article7
         },
         {
            "key": "Q036",
            "section": "Part-VIII",
            "number": "36",
            "type": "option",
            "title": nr1T.part_VIII_question36_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },

         {
            "key": "Article12_1",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article12_1
         },
         {
            "key": "Q037",
            "section": "Part-VIII",
            "number": "37",
            "type": "option",
            "title": nr1T.part_VIII_question37_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },


         {
            "key": "Article12_2",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article12_2
         },
         {
            "key": "Q038",
            "section": "Part-VIII",
            "number": "38",
            "type": "option",
            "title": nr1T.part_VIII_question38_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },

         {
            "key": "Article12_3",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article12_3
         },
         {
            "key": "Q039",
            "section": "Part-VIII",
            "number": "39",
            "type": "option",
            "title": nr1T.part_VIII_question39_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },


         {
            "key": "Article12_4",
            "section": "Part-VIII",
            "number": "",
            "type": "legend",
            "title": nr1T.article12_4
         },
         {
            "key": "Q040",
            "section": "Part-VIII",
            "number": "40",
            "type": "option",
            "title": nr1T.part_VIII_question40_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },

         {
            "key": "Q041",
            "section": "Part-VIII",
            "number": "41",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
         
      ]
   },
   {
      "key": "Part-IX",
      "title": nr1T.part_IX_title,
      "questions": [
         {
            "key": "Article9",
            "section": "Part-IX",
            "number": "",
            "type": "legend",
            "title": nr1T.article9
         },
         {
            "key": "Q042",
            "section": "Part-IX",
            "number": "42",
            "type": "option",
            "title": nr1T.part_IX_question42_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]
         },
         {
            "key": "Q043",
            "section": "Part-IX",
            "number": "43",
            "type": "option",
            "title": nr1T.part_IX_question43_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstringRte",
                  "caption": nr1T.part_IX_question43_custom_caption
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstringRte",
                  "caption": nr1T.part_IX_question43_custom_caption
               }
            ]
         },

         {
            "key": "Q044",
            "section": "Part-IX",
            "number": "44",
            "type": "option",
            "title": nr1T.part_IX_question44_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "false",
                  "title": nr1T.notApplicable
               }
            ],
            "validations": [
               {
                  "question": "Q044_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q044_b",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ],
            "additionalInformation":[
               {
                  "field":"furtherInfo",
                  "title" : nr1T.additionalInformation+'<sup>26</sup>',
                  "type":"lstringRte",
                  "footnote":nr1T.part_IX_question44_1_footnote_26
               }
            ]
         },

         {
            "key": "Q044_a",
            "section": "Part-IX",
            "number": "",
            "type": "option",
            "title": nr1T.pleaseSelectAll,
            "multiple": true,
            "mandatory": true,
            "options": [
               {
                  "value": "C52DEF5B-3062-45AB-968D-B835248C3341",
                  "title": nr1T.part_IX_question44_a_option0_title
               },
               {
                  "value": "5625F27F-CB4F-4C52-9E3E-E3A29057ADFF",
                  "title": nr1T.part_IX_question44_a_option1_title
               },
               {
                  "value": "1A0765A5-93E2-4B98-852F-E23038E8FA48",
                  "title": nr1T.part_IX_question44_a_option2_title
               },
               {
                  "value": "5BA5F92A-660E-4977-B38E-68C109971179",
                  "title": nr1T.part_IX_question44_a_option3_title
               },
               {
                  "value": "2F6B4F32-5052-446A-89CE-34FA569B81EB",
                  "title": nr1T.part_IX_question44_a_option4_title
               },
               {
                  "value": "DA8600D9-FF79-4B08-A800-D2E5B2CC419D",
                  "title": nr1T.part_IX_question44_a_option5_title
               },
               {
                  "value":"5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr1T.other,
                  "type":"lstring"
               }
            ]
         },   
         {
            "key": "Q044_b",
            "section": "Part-IX",
            "number": "44.1",
            "type": "int",
            "title": nr1T.part_IX_question44_1_title,
            "multiple": false,
            "mandatory": true
         },
         {
            "key": "Q045",
            "section": "Part-IX",
            "number": "45",
            "type": "option",
            "title": nr1T.part_IX_question45_title,
            "multiple": false,
            "mandatory": true,
            "footnote": nr1T.part_IX_question45_footnote_27,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation+'<sup>28</sup>',
                  "footnote":nr1T.part_IX_question45_footnote_addInfo_28
               },
               {
                  "value": "false",
                  "title": nr1T.notApplicable,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation+'<sup>28</sup>',
                  "footnote":nr1T.part_IX_question45_footnote_addInfo_28
               }
            ],
            "validations": [
               {
                  "question": "Q045_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },

         {
            "key": "Q045_a",
            "section": "Part-IX",
            "number": "",
            "type": "option",
            "title": nr1T.pleaseSelectAll,
            "multiple": true,
            "mandatory": true,
            "options": [
               {
                  "value": "C8500203-E701-46F6-9388-7E4A4E68B3F2",
                  "title": nr1T.part_IX_question45_a_option0_title
               },
               {
                  "value": "FC0D8F91-EA81-4ED2-87FA-B83C0240FB2A",
                  "title": nr1T.part_IX_question45_a_option1_title
               },
               {
                  "value": "BEC84DD2-496F-48A9-816F-048606BAD40C",
                  "title": nr1T.part_IX_question45_a_option2_title
               },
               {
                  "value": "E5E463F6-6CE2-4EC5-9FC7-D08AB1B75F19",
                  "title": nr1T.part_IX_question45_a_option3_title
               },
               {
                  "value": "EB8A599D-806F-42C6-9609-007FB2111036",
                  "title": nr1T.part_IX_question45_a_option4_title
               },
               {
                  "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                  "title": nr1T.other,
                  "type":"lstring"
               }
            ]
         },
         {
            "key": "Q046",
            "section": "Part-IX",
            "number": "46",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false,
            "mandatory": true
         } 
      ]
   },
   {
      "key": "Part-X",
      "title": nr1T.part_X_title,
      "questions": [
         {
            "key": "Article11.1",
            "section": "Part-X",
            "number": "",
            "type": "legend",
            "title": nr1T.article11_1
         },
         {
            "key": "Q047",
            "section": "Part-X",
            "number": "47",
            "type": "option",
            "title": nr1T.part_X_question47_title,
            "multiple": false,
            "mandatory": true,
            "footnote": nr1T.part_X_question47_title_footnote_29,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>30</sup>',
                  "footnote": nr1T.part_X_question47_title_footnote_30
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>30</sup>',
                  "footnote": nr1T.part_X_question47_title_footnote_30
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>30</sup>',
                  "footnote": nr1T.part_X_question47_title_footnote_30
               },
               {
                  "value": "false.na",
                  "title": nr1T.notApplicable+'<sup>29</sup>',
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>30</sup>',
                  "footnote": nr1T.part_X_question47_title_footnote_30
               }
            ]            
         },
         {
            "key": "Q048",
            "section": "Part-X",
            "number": "48",
            "type": "option",
            "title": nr1T.part_X_question48_title,
            "multiple": false,
            "mandatory": true,
            "footnote": nr1T.part_X_question48_title_footnote_31,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>32</sup>',
                  "footnote": nr1T.part_X_question48_title_footnote_32
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>32</sup>',
                  "footnote": nr1T.part_X_question48_title_footnote_32
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>32</sup>',
                  "footnote": nr1T.part_X_question48_title_footnote_32
               },
               {
                  "value": "false.na",
                  "title": nr1T.notApplicable,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>32</sup>',
                  "footnote": nr1T.part_X_question48_title_footnote_32
               }
            ],
            
         },
         {
            "key": "Q049",
            "section": "Part-X",
            "number": "49",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-XI",
      "title": nr1T.part_XI_title,
      "questions": [
         {
            "key": "article19",
            "section": "Part-XI",
            "number": "",
            "type": "legend",
            "title": nr1T.article19
         },
         {
            "key": "Q050",
            "section": "Part-XI",
            "number": "50",
            "type": "option",
            "title": nr1T.part_XI_question50_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>33</sup>',
                  "footnote": nr1T.part_XI_question50_title_footnote_33
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>33</sup>',
                  "footnote": nr1T.part_XI_question50_title_footnote_33
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>33</sup>',
                  "footnote": nr1T.part_XI_question50_title_footnote_33
               }
            ]
         },
         {
            "key": "Article20",
            "section": "Part-XI",
            "number": "",
            "type": "legend",
            "title": nr1T.article20
         },
         {
            "key": "Q051",
            "section": "Part-XI",
            "number": "51",
            "type": "option",
            "title": nr1T.part_XI_question51_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>34</sup>',
                  "footnote": nr1T.part_XI_question51_title_footnote_34
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>34</sup>',
                  "footnote": nr1T.part_XI_question51_title_footnote_34
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse+'<sup>34</sup>',
                  "footnote": nr1T.part_XI_question51_title_footnote_34
               }
            ]
         },
         {
            "key": "Q052",
            "section": "Part-XI",
            "number": "52",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         } 
      ]
   },
   {
      "key": "Part-XII",
      "title": nr1T.part_XII_title,
      "questions": [
         {
            "key": "article21",
            "section": "Part-XII",
            "number": "",
            "type": "legend",
            "title": nr1T.article21
         },
         {
            "key": "Q053",
            "section": "Part-XII",
            "number": "53",
            "type": "option",
            "title": nr1T.part_XII_question53_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod
               }
            ],
            "validations": [
               {
                  "question": "Q053_a",
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
            "key": "Q053_a",
            "section": "Part-XII",
            "number": "53.1",
            "type": "option",
            "title": nr1T.part_XII_question53_1_title,
            "multiple": false,
            "footnote": nr1T.part_XII_question53_1_footnote_35,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]
         },
         {
            "key": "article22",
            "section": "Part-XII",
            "number": "",
            "type": "legend",
            "title": nr1T.article22
         },
         {
            "key": "Q054",
            "section": "Part-XII",
            "number": "54",
            "type": "option",
            "title": nr1T.part_XII_question54_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sup>36</sup>',
                  "footnote": nr1T.part_XII_question54_footnote_36
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sup>36</sup>',
                  "footnote": nr1T.part_XII_question54_footnote_36
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sup>36</sup>',
                  "footnote": nr1T.part_XII_question54_footnote_36
               }
            ],
            "validations": [
               {
                  "question": "Q054_a",
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
            "key": "Q054_a",
            "section": "Part-XII",
            "number": "54.1",
            "type": "option",
            "title": nr1T.part_XII_question54_1_title,
            "multiple": true,
            "options": [   
               {
                  "value": "10FD7CBC-79AB-4BE9-876B-021E1A41F511",
                  "title": nr1T.part_XII_question54_a_option1_title,
                  "type": "int"
               },
               {
                  "value": "344E105F-C29F-47F4-B6BF-725D3082BFBE",
                  "title": nr1T.part_XII_question54_b_option1_title,
                  "type": "int"
               },
               {
                  "value": "65763772-4533-4AF1-9C46-E2BCDC462F6D",
                  "title": nr1T.part_XII_question54_c_option1_title,
                  "type": "int"
               }
            ],
            "additionalInformation":[ // ToDo need to verify
               {
                  "field":"furtherInfo",
                  "title" : nr1T.additionalInformation,
                  "type":"string"
               }
            ]
         },

         {
            "key": "Q055",
            "section": "Part-XII",
            "number": "55",
            "type": "option",
            "title": nr1T.part_XII_question55_title,
            "multiple": false,
            "mandatory": true,
            "footnote": nr1T.part_XII_question55_footnote_37,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sub>38</sup>',
                  "footnote": nr1T.part_XII_question55_footnote_38
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sub>38</sup>',
                  "footnote": nr1T.part_XII_question55_footnote_38
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.reportingPeriod+'<sub>38</sup>',
                  "footnote": nr1T.part_XII_question55_footnote_38
               }
            ]
         },
         {
            "key": "Q056",
            "section": "Part-XII",
            "number": "56",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-XIII",
      "title": nr1T.part_XIII_title,
      "questions": [
      {
         "key": "article23",
         "section": "Part-XIII",
         "number": "",
         "type": "legend",
         "title": nr1T.article23
      },
      {
         "key": "Q057",
         "section": "Part-XIII",
         "number": "57",
         "type": "option",
         "title": nr1T.part_XIII_question57_title,
         "multiple": false,
         "mandatory": true,
         "options": [
            {
               "value": "true",
               "title": nr1T.yes,
               "type": "lstring",
               "caption": nr1T.pleaseExplainYourResponse
            },
            {
               "value": "true.some",
               "title": nr1T.yesToSomeExtent,
               "type": "lstring",
               "caption": nr1T.pleaseExplainYourResponse
            },
            {
               "value": "false",
               "title": nr1T.no,
               "type": "lstring",
               "caption": nr1T.pleaseExplainYourResponse
            }
         ]
      },
      {
         "key": "Q058",
         "section": "Part-XIII",
         "number": "58",
         "type": "link",
         "title": nr1T.provideInformationOnLessons,
         "multiple": false
      }
      ]
   },
   {
      "key": "Part-XIV",
      "title": nr1T.part_XIV_title,
      "questions": [
         {
            "key": "Article25",
            "section": "Part-XIV",
            "number": "",
            "type": "legend",
            "title": nr1T.article25
         },
         {
            "key": "Q059",
            "section": "Part-XIV",
            "number": "59",
            "type": "option",
            "title": nr1T.part_XIV_question59_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ]            
         },
         {
            "key": "Q060",
            "section": "Part-XIV",
            "number": "60",
            "type": "option",
            "title": nr1T.part_XIV_question60_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.additionalInformation
               }
            ],
            "validations": [
               {
                  "question": "Q060_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "visible"
               },
               {
                  "question": "Q060_b",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },

         {
            "key": "Q060_a",
            "section": "Part-XIV",
            "number": "",
            "type": "option",
            "title": nr1T.pleaseSelectAll,
            "multiple": true,
            "mandatory": true,
            "options": [
               {
                  "value": "EDCF66BE-18E5-4E4D-939E-5767B8BB0983",
                  "title": nr1T.part_XIV_question60_a_option0_title,
                  "type": "lstring"
               },
               {
                  "value": "291C46FC-BEDF-43A1-8202-5DD2C1CEE2AC",
                  "title": nr1T.part_XIV_question60_a_option1_title
               },
               {
                  "value": "FA5475A3-9BF9-4EBA-AF8C-791CDD0C0028",
                  "title": nr1T.part_XIV_question60_a_option2_title,
                  "type": "lstring"
               },
               {
                  "value": "766A436A-5F8D-42DA-A5F0-BE399A0E87A0",
                  "title": nr1T.part_XIV_question60_a_option3_title,
                  "type": "lstring"
               }
            ]
         },
         {
            "key": "Q060_b",
            "section": "Part-XIV",
            "number": "60.1",
            "type": "int",
            "title": nr1T.part_XIV_question60_1_title,
            "multiple": false
         },
         {
            "key": "Q061",
            "section": "Part-XIV",
            "number": "61",
            "type": "option",
            "title": nr1T.part_XIV_question61_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseExplainYourResponse
               }
            ]            
         },
         {
            "key": "Q062",
            "section": "Part-XIV",
            "number": "62",
            "type": "option",
            "title": nr1T.part_XIV_question62_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.provideFurtherInformation+'<sup>39</sup>',
                  "footnote": nr1T.part_XIV_question62_footnote_39
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.provideFurtherInformation+'<sup>39</sup>',
                  "footnote": nr1T.part_XIV_question62_footnote_39
               }
            ],
            "validations": [
               {
                  "question": "Q062_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "Q062_a",
            "section": "Part-XIV",
            "number": "",
            "type": "option",
            "title": nr1T.pleaseSpecify,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "1",
                  "title": nr1T.part_XIV_question62_a_option0_title
               },
               {
                  "value": "1+",
                  "title": nr1T.part_XIV_question62_a_option1_title
               },
               {
                  "value": "3+",
                  "title": nr1T.part_XIV_question62_a_option2_title
               },
               {
                  "value": "5+",
                  "title": nr1T.part_XIV_question62_a_option3_title
               },
               {
                  "value": "10+",
                  "title": nr1T.part_XIV_question62_a_option4_title
               }
            ]            
         },
         {
            "key": "Q063",
            "section": "Part-XIV",
            "number": "63",
            "type": "lstringRte",
            "title": nr1T.part_XIV_question63_title,
            "multiple": false,
            "footnote": nr1T.part_XIV_question63_footnote_40
         },
         {
            "key": "Q064",
            "section": "Part-XIV",
            "number": "64",
            "type": "lstringRte",
            "title": nr1T.part_XIV_question64_title,
            "multiple": false,
            "footnote": nr1T.part_XIV_question64_footnote_41
         },
         {
            "key": "Q065",
            "section": "Part-XIV",
            "number": "65",
            "type": "link",
            "title": nr1T.provideInformationOnLessons,
            "multiple": false
         }
      ]
   },
   {
      "key": "Part-XV",
      "title": nr1T.part_XV_title,
      "questions": [
         {
            "key": "Q066",
            "section": "Part-XV",
            "number": "66",
            "type": "option",
            "title": nr1T.part_XIV_question66_title,
            "multiple": false,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring",
                  "caption": nr1T.pleaseProvideFurtherInformation
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring",
                  "caption": nr1T.pleaseProvideFurtherInformation
               }
            ],
            "validations": [
               {
                  "question": "Q066_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ]
         },
         {
            "key": "Q066_a",
            "section": "Part-XV",
            "number": "66.1",
            "type": "option",
            "title": nr1T.part_XIV_question66_1_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent
               },
               {
                  "value": "false",
                  "title": nr1T.no
               }
            ]
         }
      ]
   },
   {
      "key": "Part-XV",
      "title": nr1T.part_XVI_title,
      "questions": [
         {
            "key": "Q067",
            "section": "Part-XVI",
            "number": "67",
            "type": "link",
            "title": nr1T.part_XVI_question67_title,
            "multiple": false
         },
         {
            "key": "Q068",
            "section": "Part-XVI",
            "number": "68",
            "type": "lstringRte",
            "title": nr1T.part_XVI_question68_title,
            "multiple": false
         }
      ]
   }

]