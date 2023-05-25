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
            "hasValidation": true,
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
            "section": "Part-II",
            "number": "29",
            "type": "link",
            "title": nr1T.part_VI_question29_title,
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
            "section": "Part-V",
            "number": "15",
            "type": "option",
            "title": nr1T.part_IV_question15_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
            "section": "Part-V",
            "number": "16",
            "type": "option",
            "title": nr1T.part_IV_question16_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
            "section": "Part-V",
            "number": "17",
            "type": "option",
            "title": nr1T.part_IV_question17_title,
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
         },
         {
            "key": "Q018",
            "section": "Part-V",
            "number": "18",
            "type": "link",
            "title": nr1T.part_IV_question18_title,
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse,
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
            "hasValidation": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.additionalInformation,
         },
         {
            "key": "Q019_b",
            "section": "Part-V",
            "number": "19.2",
            "type": "option",
            "title": nr1T.part_V_question19_2_title,
            "multiple": false,
            "mandatory": true,
            "hasValidation": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.additionalInformation
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse,
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
            "hasValidation": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.additionalInformation
         },
         {
            "key": "Q020_b",
            "section": "Part-V",
            "number": "20.2",
            "type": "option",
            "title": nr1T.part_V_question20_2_title,
            "multiple": false,
            "mandatory": true,
            "hasValidation": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yes,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.additionalInformation
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse,
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
            "hasValidation": true,
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
            "hasValidation": true,
            "mandatory": true,
            "options": [
               {
                  "value": "true",
                  "title": nr1T.yesInAllCases
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring"
                  
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse,

         },
         {
            "key": "Q021_c",
            "section": "Part-V",
            "number": "21.3",
            "type": "option",
            "title": nr1T.part_V_question21_3_title,
            "multiple": false,
            "hasValidation": true,
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesToSomeExtent,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
   } 
]