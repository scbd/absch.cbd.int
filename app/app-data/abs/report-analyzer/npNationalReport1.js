﻿import nr1T from '../../../app-text/views/forms/edit/abs/edit-national-report-1.json';

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
   }
]