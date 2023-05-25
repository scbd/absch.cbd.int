import nr1T from '../../../app-text/views/forms/edit/abs/edit-national-report-1.json';
;
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
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.provideMoreInfo
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
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
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
            ],
            "caption": nr1T.provideMoreInfo
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
            "hasValidation": true,
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
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
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
            ],
            "caption": nr1T.provideMoreInfo
         },
         {
            "key": "Q005_a",
            "section": "Part-II",
            "number": "5.1",
            "type": "option",
            "title": nr1T.part_II_question5_1_title,
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
            "key": "Q005_b",
            "section": "Part-II",
            "number": "5.2",
            "type": "option",
            "title": nr1T.part_II_question5_2_title,
            "multiple": false,
            "hasValidation": true,
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
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
                  "value": "60CD889F-4E08-450C-A67C-5F29A2B1E704",
                  "title": nr1T.part_III_question7_1_option0_title
               },
               {
                  "value": "0C4A8689-6DA4-4EC1-8AC3-9017941C67A6",
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
                  "type": "lstring"
               },
               {
                  "value": "true.some",
                  "title": nr1T.yesInSomeCases,
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.part_III_question8_option2_title,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
            "mandatory": true
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
            "caption": nr1T.pleaseExplainYourResponse
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
            "title": nr1T.part_III_question14_title,
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
               // {
               //    "question": "Q019_a",
               //    "values": [
               //       "true",
               //       "true.some"
               //    ],
               //    "type": "@hasValues",
               //    "trigger": "enable"
               // },
               // {
               //    "question": "Q019_b",
               //    "values": [
               //       "true",
               //       "true.some"
               //    ],
               //    "type": "@hasValues",
               //    "trigger": "enable"
               // }
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
                  "type": "richText"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "richText"
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
            "hasValidation": "hasValidation",
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
            "hasValidation": "hasValidation",
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
               },
               {
                  "value": "false.na",
                  "title": nr1T.notApplicable,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
            ],
            "caption": nr1T.pleaseExplainYourResponse
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
            "key": "Q033",
            "section": "Part-VII",
            "number": "33",
            "type": "link",
            "title": nr1T.part_VII_question33_title,
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
            "key": "Article16.2_and_6.3",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.article16_2_and_6_3
         },
         {
            "key": "question35_legend",
            "section": "Part-II",
            "number": "",
            "type": "legend",
            "title": nr1T.part_VIII_question35_legend_title
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
            ],
            "caption": nr1T.part_VIII_question35_custom_caption
         },
         {
            "key": "Q035_a",
            "section": "Part-VIII",
            "number": "35.1",
            "type": "option",
            "title": nr1T.part_VIII_question35_1_title,
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
            ],
         "caption": nr1T.pleaseExplainYourResponse
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
            ],
         "caption": nr1T.pleaseExplainYourResponse
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
            ],
         "caption": nr1T.pleaseExplainYourResponse
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
            ],
         "caption": nr1T.pleaseExplainYourResponse
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
            ],
         "caption": nr1T.pleaseExplainYourResponse
         },

         {
            "key": "Q041",
            "section": "Part-VIII",
            "number": "41",
            "type": "link",
            "title": nr1T.part_VIII_question41_title,
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
                  "type": "lstring"
               },
               {
                  "value": "false",
                  "title": nr1T.no,
                  "type": "lstring"
               }
            ],
            "caption": nr1T.part_IX_question43_custom_caption
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
                     "0"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               }
            ],
            "caption": nr1T.part_IX_question43_custom_caption
         },

         {
            "key": "Q044_a",
            "section": "Part-IX",
            "number": "44.1",
            "type": "option",
            "title": nr1T.pleaseSelectAll,
            "multiple": false,
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
            "title": nr1T.part_II_question6_title,
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
                  "question": "Q045_a",
                  "values": [
                     "true"
                  ],
                  "type": "@hasValues",
                  "trigger": "enable"
               },
               {
                  "question": "Q045_b",
                  "values": [
                     "0"
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
            "multiple": false,
            "mandatory": true,
            "options": [
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option0_title
               },
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option1_title
               },
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option2_title
               },
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option3_title
               },
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option4_title
               },
               {
                  "value": "ToDo-GUID",
                  "title": nr1T.part_IX_question45_a_option5_title
               },
               {
                  "value": "ToDo-GUID",
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
            "title": nr1T.part_II_question6_title,
            "multiple": false,
            "mandatory": true
         } 
      ]
   }


  
]