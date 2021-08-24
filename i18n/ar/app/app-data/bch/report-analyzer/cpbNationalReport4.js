define(function () {
  'use strict';

  var cpbNationalReport4 = [
    {
       "key": "General",
       "title": "طرف لبروتوكول قرطاجنة للسلامة الأحيائية",
       "questions": [
          {
             "key": "Q012_party",
             "section": "General",
             "number": "11",
             "type": "option",
             "title": "هل تقع دولتك ضمن أطراف بروتوكول قرطاجنة للسلامة الإحيائية (CPB)؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q012_partyInProgress",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q013",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q012_partyInProgress",
             "section": "General",
             "number": "12",
             "type": "option",
             "title": "إذا لم يكن بلدك أحد الأطراف في بروتوكول قرطاجنة للسلامة الأحيائية؟ هل هناك عملية وطنية قائمة كي يصبح البلد طرفا فيه؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q013",
             "section": "General",
             "number": "13",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article2",
       "title": "المادة 2 - أحكام عامة",
       "description": "<i>تقتضي المادة 2 من كل طرف اتخاذ التدابير القانونية والإدارية وغيرها من التدابير اللازمة والمناسبة لتنفيذ التزاماته بموجب البروتوكول</i>",
       "questions": [
          {
             "key": "Q014",
             "section": "Article2",
             "number": "14",
             "type": "option",
             "title": "هل أدخل بلدك التدابير الوطنية الضرورية لتنفيذ البروتوكول؟",
             "multiple": false,
             "options": [
                {
                   "value": "implementation.fullInPlace",
                   "title": "توجد تدابير وطنية كاملة"
                },
                {
                   "value": "implementation.partiallyInPlace",
                   "title": "توجد تدابير وطنية جزئية"
                },
                {
                   "value": "implementation.temporaryMeasures",
                   "title": "لم توضع إلا تدابير مؤقتة فقط"
                },
                {
                   "value": "implementation.draftMeasures",
                   "title": "لا يوجد إلا مشروع تدابير"
                },
                {
                   "value": "implementation.none",
                   "title": "لم تتخذ تدابير بعد"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q015",
             "section": "Article2",
             "number": "15",
             "type": "option",
             "title": "ما هي الأدوات القائمة لتنفيذ التدابير الوطنية للسلامة الأحيائية؟ (اختر كل ما ينطبق)",
             "multiple": true,
             "options": [
                {
                   "value": "instrument.nationalBiosafetyLaws",
                   "title": "قانون وطني واحد أو أكثر بشأن السلامة الأحيائية"
                },
                {
                   "value": "instrument.nationalBiosafetyRegulations",
                   "title": "لائحة وطنية واحدة أو أكثر بشأن السلامة الأحيائية"
                },
                {
                   "value": "instrument.biosafetyGuidelines",
                   "title": "مجموعة واحدة أو أكثر من المبادئ التوجيهية بشأن السلامة الأحيائية"
                },
                {
                   "value": "instrument.indirectLaws",
                   "title": "القوانين أو اللوائح أو المبادئ التوجيهية الأخرى التي تطبق على السلامة الأحيائية على نحو غير مباشر"
                },
                {
                   "value": "instrument.none",
                   "title": "لا توجد أدوات قائمة"
                }
             ]
          },
          {
             "key": "Q016",
             "section": "Article2",
             "number": "16",
             "type": "option",
             "title": "هل اضطلع بلدك بمبادرات لتعميم السلامة الأحيائية في الاستراتيجيات وخطط العمل الوطنية للتنوع البيولوجي، أو السياسات أو التشريعات الأخرى؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                },
                {
                   "value": "false.other",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q017",
             "section": "Article2",
             "number": "17",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لتخصيص أموال من الميزانية لتفعيل تدابيره الوطنية للسلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q018",
             "section": "Article2",
             "number": "18",
             "type": "option",
             "title": "هل لدى بلدك موظفون دائمون لإدارة الوظائف المتعلقة مباشرة بالسلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q019",
                   "type": "@hasValues",
                   "values": [
                      "true"
                   ],
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q019",
             "section": "Article2",
             "number": "19",
             "type": "option",
             "title": "إذا كانت إجابتك <i> نعم</i> على السؤال 18، ما هو عدد الموظفين الدائمين الذين تتعلق وظائفهم بصورة مباشرة بالسلامة الأحيائية؟ ",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q019_adq",
                   "type": "@hasValues",
                   "trigger": "visible"
                }
             ]
          },
          {
             "key": "Q019_adq",
             "section": "Article2",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q020",
             "section": "Article2",
             "number": "20",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 2 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article5",
       "title": "الفقرة 5 - المستحضرات الصيدلانية",
       "questions": [
          {
             "key": "Q021",
             "section": "Article5",
             "number": "21",
             "type": "option",
             "title": "هل ينظم بلدك الحركة العابرة للحدود للكائنات الحية المحورة ومناولتها أو استخدامها والتي تعتبر مستحضرات صيدلانية للبشر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q022",
             "section": "Article5",
             "number": "22",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 5 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article6",
       "title": "المادة 6- المرور العابر والاستخدام المعزول",
       "questions": [
          {
             "key": "Q023",
             "section": "Article6",
             "number": "23",
             "type": "option",
             "title": "هل ينظم بلدك المرور العابر للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q024",
             "section": "Article6",
             "number": "24",
             "type": "option",
             "title": "هل ينظم بلدك الاستخدام المعزول للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q025",
             "section": "Article6",
             "number": "25",
             "type": "option",
             "title": "هل اتخذ بلدك قرارا بشأن استيراد الكائنات الحية المحورة للاستخدام المعزول؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q026",
             "section": "Article6",
             "number": "26",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 6 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Articles7-10",
       "title": "المواد 7 إلى 10 - الاتفاق المسبق عن علم وإدخال الكائنات الحية المحورة عن عمد في البيئة",
       "questions": [
          {
             "key": "Q027",
             "section": "Articles7-10",
             "number": "27",
             "type": "option",
             "title": "هل وضع بلدك متطلبات قانونية للمصدرين بموجب ولايته القضائية بإبلاغ السلطة الوطنية المختصة لطرف الاستيراد قبل الحركة العابرة للحدود عن عمد للكائنات الحية المحورة التي تقع في إطار إجراء الاتفاق المسبق عن علم؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q028",
             "section": "Articles7-10",
             "number": "28",
             "type": "option",
             "title": "عند قيام بلدك بالعمل كطرف التصدير، هل وضع متطلبات قانونية بشأن دقة المعلومات الواردة في الإخطار المقدم من المُصدر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                },
                {
                   "value": "false.notApplicable",
                   "title": "لا ينطبق (الطرف لا يقوم حاليا بتصدير الكائنات الحية المحورة)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q029",
             "section": "Articles7-10",
             "number": "29",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل استلم بلدك إخطارا يتعلق بالحركة العابرة للحدود عن عمد للكائنات الحية المحورة لإدخالها عن عمد في البيئة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q030",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q031",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "baseQuestion":"Q032",
                   "question": "Q032_a",
                   "values"  : ["true"],
                   "type"    : "@hasValues",
                   "trigger" : "enable"
                },
                {
                   "baseQuestion":"Q032",
                   "question": "Q032_b",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q030",
             "section": "Articles7-10",
             "number": "30",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 29، هل اشتمل الإخطار (الإخطارات) على معلومات كاملة (كحد أدنى المعلومات المحددة في المرفق الأول ببروتوكول قرطاجنة للسلامة الأحيائية)؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q031",
             "section": "Articles7-10",
             "number": "31",
             "type": "option",
             "title": "إذا كانت إجابتك  <i>نعم</i>  على السؤال 29، هل أقر بلدك للمخطر باستلام الإخطار (الإخطارات) خلال تسعين يوما من الاستلام؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q032",
             "section": "Articles7-10",
             "number": "32",
             "type": "sub-section",
             "title": "إذا كانت إجابتك<i>نعم</i> على السؤال 29، هل أبلغ بلدك قراره (قراراته) إلى",
             "multiple": false,
             "questions": [
                {
                   "key": "Q032_a",
                   "section": "Articles7-10",
                   "number": "أ",
                   "type": "option",
                   "title": "المخطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم، دائما"
                      },
                      {
                         "value": "true.some",
                         "title": "في بعض الحالات فقط"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q032_b",
                   "section": "Articles7-10",
                   "number": "ب",
                   "type": "option",
                   "title": "غرفة تبادل معلومات السلامة الأحيائية",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم، دائما"
                      },
                      {
                         "value": "true.some",
                         "title": "في بعض الحالات فقط"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q033",
             "section": "Articles7-10",
             "number": "33",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل اتخذ بلدك قرارا استجابة لإخطار (إخطارات) فيما يتعلق بالحركة العابرة للحدود عن عمد للكائنات الحية المحورة لإدخالها عن عمد في البيئة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q034",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q036",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q034",
             "section": "Articles7-10",
             "number": "34",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 33، كم عدد الكائنات الحية المحورة التي وافق بلدك على استيرادها لإدخالها عن عمد في البيئة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q035",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q035",
             "section": "Articles7-10",
             "number": "35",
             "type": "option",
             "title": "إذا كانت إجابتك على السؤال 34 أنه تمت الموافقة على كائنات حية محورة،هل تم بالفعل استيراد كل هذه الكائنات الحية المحورة إلى بلدك؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q036",
             "section": "Articles7-10",
             "number": "36",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 33، ما هي النسبة المئوية من قرارات بلدك التي تقع في الفئات التالية؟ (اختر كل ما ينطبق)",
             "multiple": true,
             "options": [
                {
                   "value": "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                   "title": "الموافقة على استيراد/استخدام الكائنات الحية المحورة بدون شروط",
                   "type": "int"
                },
                {
                   "value": "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                   "title": "الموافقة على استيراد/استخدام الكائنات الحية المحورة بشروط",
                   "type": "int"
                },
                {
                   "value": "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                   "title": "حظر استيراد/استخدام الكائنات الحية المحورة طلب معلومات إضافية",
                   "type": "int"
                },
                {
                   "value": "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                   "title": "طلب معلومات إضافية",
                   "type": "int"
                },
                {
                   "value": "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                   "title": "إبلاغ المخطر بأنه تم تمديد فترة إرسال القرار",
                   "type": "int"
                }
             ],
             "validations": [
                {
                   "question": "Q037",
                   "values": [
                      "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                      "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"
                   ],
                   "type": "@hasAdditionalValues",
                   "trigger": "enable"
                }
             ],
             "customValuePlaceholder": "%"
          },
          {
             "key": "Q037",
             "section": "Articles7-10",
             "number": "37",
             "type": "option",
             "title": "إذا كانت إجابتك <i>على السؤال 36</i> أن بلدك اتخذ قرارا  <i>بالموافقة على الاستيراد بشروط أو حظر الاستيراد</i>، هل قدمت الأسباب؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q038",
             "section": "Articles7-10",
             "number": "38",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المواد من 7 إلى 10 في بلدك، بما في ذلك التدابير في حالة عدم وجود يقين علمي بشأن الآثار الضارة المحتملة للكائنات الحية المحورة لإدخالها عن عمد في البيئة",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article11",
       "title": "المادة 11 - إجراء بشأن الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز",
       "questions": [
          {
             "key": "Q039",
             "section": "Article11",
             "number": "39",
             "type": "option",
             "title": "هل لدى بلدك قانونا (قوانين) أو لائحة (لوائح) أو تدابير إدارية لصنع القرار المتعلق بالاستخدام المحلي للكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز، بما في ذلك طرحها في الأسواق؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q040",
             "section": "Article11",
             "number": "40",
             "type": "option",
             "title": "هل وضع بلدك متطلبات قانونية بشأن دقة المعلومات التي يتعين أن يقدمها الطالب فيما يتعلق بالاستخدام المحلي للكائنات الحية المحورة التي قد تخضع للحركة العابرة للحدود والمراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز، بما في ذلك طرحها في الأسواق؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q041",
             "section": "Article11",
             "number": "41",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، ما هو عدد القرارات التي اتخذها بلدك <u>فيما يتعلق بالاستخدام المحلي</u> للكائنات الحية المحورة التي قد تخضع للحركة العابرة للحدود والمراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز، بما في ذلك طرحها في الأسواق؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q042",
             "section": "Article11",
             "number": "42",
             "type": "option",
             "title": "هل لدى بلدك قانونا (قوانين) أو لائحة (لوائح) أو تدابير إدارية لصنع القرار المتعلق باستيراد الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q043",
             "section": "Article11",
             "number": "43",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، ما هو عدد القرارات التي اتخذها بلدك <u>فيما يتعلق باستيراد</u> الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q044",
             "section": "Article11",
             "number": "44",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 11 في بلدك، بما في ذلك التدابير في حالة عدم وجود يقين علمي بشأن الآثار الضارة المحتملة للكائنات الحية المحورة التي قد تكون عرضة للحركة العابرة للحدود لاستخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article12",
       "title": "المادة 12 - استعراض القرار",
       "questions": [
          {
             "key": "Q045",
             "section": "Article12",
             "number": "45",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لاستعراض وتغيير أي قرار يتعلق بالحركة العابرة للحدود عن عمد للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q046",
             "section": "Article12",
             "number": "46",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل سبق أن استعرض/غير بلدك قرارا يتعلق بالحركة العابرة للحدود عن عمد للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q047",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q048",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q050",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q047",
             "section": "Article12",
             "number": "47",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 46، ما هو عدد القرارات التي تم استعرضها و/أو غيرها؟",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q048",
             "section": "Article12",
             "number": "48",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 46، هل كانت أي من الاستعراضات ناتجة عن طلب من طرف التصدير أو المخطر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q049",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q049",
             "section": "Article12",
             "number": "49",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 48، هل قدم بلدك ردا في غضون تسعين يوما موضحا أسباب القرار؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q050",
             "section": "Article12",
             "number": "50",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 46، هل بدأ أي من الاستعراضات بلدك بوصفه طرف الاستيراد؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "baseQuestion": "Q051",
                   "question": "Q051_a",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "baseQuestion": "Q051",
                   "question": "Q051_b",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q051",
             "section": "Articles12",
             "number": "51",
             "type": "sub-section",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 50، هل أوضح بلدك، في غضون ثلاثين يوما، أسباب القرار وأخبر",
             "multiple": false,
             "questions": [
                {
                   "key": "Q051_a",
                   "section": "Article12",
                   "number": "أ",
                   "type": "option",
                   "title": "المخطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم، دائما"
                      },
                      {
                         "value": "true.some",
                         "title": "في بعض الحالات فقط"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q051_b",
                   "section": "Article12",
                   "number": "ب",
                   "type": "option",
                   "title": "غرفة تبادل معلومات السلامة الأحيائية",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم، دائما"
                      },
                      {
                         "value": "true.some",
                         "title": "في بعض الحالات فقط"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q052",
             "section": "Article12",
             "number": "52",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 12 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article13",
       "title": "المادة 13 - الإجراء المبسط",
       "questions": [
          {
             "key": "Q053",
             "section": "Article13",
             "number": "53",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لتطبيق الإجراء المبسط فيما يتعلق بالحركة العابرة للحدود عن عمد للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q054",
             "section": "Article13",
             "number": "54",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل طبق بلدك الإجراء المبسط؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q055",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q056",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q055",
             "section": "Article13",
             "number": "55",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 54، كم عدد الكائنات الحية المحورة التي طبق عليها بلدك الإجراء المبسط؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 5"
                },
                {
                   "value": "5+",
                   "title": "5 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q056",
             "section": "Article13",
             "number": "56",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 54، هل أبلغ بلدك الأطراف من خلال غرفة تبادل معلومات السلامة الأحيائية بالحالات التي طُبق فيها الإجراء المبسط؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q057",
             "section": "Article13",
             "number": "57",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 13 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article14",
       "title": "المادة 14 - الاتفاقات والترتيبات الثنائية والإقليمية والمتعددة الأطراف",
       "questions": [
          {
             "key": "Q058",
             "section": "Article14",
             "number": "58",
             "type": "option",
             "title": "كم عدد الاتفاقات أو الترتيبات الثنائية أو الإقليمية أو المتعددة الأطراف المتعلقة بالسلامة الأحيائية التي ابرمها بلدك مع الأطراف الأخرى/غير الأطراف؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q059",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q059",
             "section": "Article14",
             "number": "59",
             "type": "lstring",
             "title": "إذا كانت إجابتك <i>على السؤال 59 أن تم إبرام اتفاقات أو ترتيبات</i>، يرجى تقديم وصف مختصر عن نطاقها وهدفها",
             "multiple": false,
             "mandatory": true
          },
          {
             "key": "Q060",
             "section": "Article14",
             "number": "60",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 14 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article15_16",
       "title": "المادتان 15 و16 - تقييم المخاطر وإدارة المخاطر",
       "questions": [
          {
             "key": "Q061",
             "section": "Article15_16",
             "number": "61",
             "type": "option",
             "title": "هل يتطلب الإطار التنظيمي الداخلي لبلدك إجراء تقييمات مخاطر للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q062",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q062",
             "section": "Article15_16",
             "number": "62",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 61، ما هي الكائنات الحية المحورة التي تنطبق عليها المتطلبات (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "014054D1-2B72-7ABD-E615-D0A374590A95",
                   "title": "للواردات من الكائنات الحية المحورة المراد إدخالها عن عمد في البيئة"
                },
                {
                   "value": "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                   "title": "للواردات من الكائنات الحية المحورة المراد استخدامها كأغذية أو كأعلاف أو للتجهيز"
                },
                {
                   "value": "29B97F6B-066E-BE64-0FA3-66060DEE737D",
                   "title": "للقرارات المتعلقة بالاستخدام المحلي للكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز، بما في ذلك طرحها في الأسواق"
                },
                {
                   "value": "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                   "title": "للواردات من الكائنات الحية المحورة للاستخدام المعزول"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q063",
             "section": "Article15_16",
             "number": "63",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لإجراء تقييمات المخاطر قبل اتخاذ قرارات تتعلق بالكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q064",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q064",
             "section": "Article15_16",
             "number": "64",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 63، هل تتضمن الآلية إجراءات لتحديد و/أو تدريب الخبراء الوطنيين لإجراء تقييمات المخاطر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "legend15_16",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>بناء القدرات في مجال تقييم المخاطر أو إدارة المخاطر</i>"
          },
          {
             "key": "Q065",
             "section": "Articles12",
             "number": "65",
             "type": "sub-section",
             "title": "ما هو عدد الأشخاص في بلدك الذين تم تدريبهم على تقييم مخاطر الكائنات الحية المحورة وإدارتها ورصدها؟",
             "multiple": false,
             "questions": [
                {
                   "key": "Q065_a",
                   "section": "Article15_16",
                   "number": "أ",
                   "type": "option",
                   "title": "تقييم المخاطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "لا يوجد"
                      },
                      {
                         "value": "1+",
                         "title": "1 إلى 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 إلى 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 إلى 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 أو أكثر"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_a_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_a_adq",
                   "section": "Article15_16",
                   "number": "",
                   "type": "option",
                   "title": "هل هذا العدد كاف",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                },
                {
                   "key": "Q065_b",
                   "section": "Article15_16",
                   "number": "ب",
                   "type": "option",
                   "title": "إدارة المخاطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "لا يوجد"
                      },
                      {
                         "value": "1+",
                         "title": "1 إلى 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 إلى 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 إلى 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 أو أكثر"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_b_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_b_adq",
                   "section": "Article2",
                   "number": "",
                   "type": "option",
                   "title": "هل هذا العدد كاف",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                },
                {
                   "key": "Q065_c",
                   "section": "Article15_16",
                   "number": "‌ج",
                   "type": "option",
                   "title": "الرصد:",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "لا يوجد"
                      },
                      {
                         "value": "1+",
                         "title": "1 إلى 9"
                      },
                      {
                         "value": "10+",
                         "title": "10 إلى 49"
                      },
                      {
                         "value": "50+",
                         "title": "50 إلى 99"
                      },
                      {
                         "value": "100+",
                         "title": "100 أو أكثر"
                      }
                   ],
                   "validations": [
                      {
                         "baseQuestion": "Q065",
                         "question": "Q065_c_adq",
                         "values": [
                            "0"
                         ],
                         "type": "@hasValuesExcept",
                         "trigger": "visible"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q065_c_adq",
                   "section": "Article2",
                   "number": "",
                   "type": "option",
                   "title": "هل هذا العدد كاف",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                }
             ]
          },
          {
             "key": "Q066",
             "section": "Article15_16",
             "number": "66",
             "type": "option",
             "title": "هل يستخدم بلدك مواد تدريبية و/أو  إرشادات تقنية للتدريب على تقييم مخاطر وإدارة مخاطر الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q067",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q068",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q067",
             "section": "Article15_16",
             "number": "67",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 66، هل يستخدم بلدك \"دليل تقييم مخاطر الكائنات الحية المحورة\" (الذي أعدته أمانة اتفاقية التنوع البيولوجي) للتدريب على تقييم المخاطر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q068",
             "section": "Article15_16",
             "number": "68",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 66، هل يستخدم بلدك \"دليل تقييم مخاطر الكائنات الحية المحورة\" (الذي أعده المنتدى الإلكتروني وفريق الخبراء التقنيين المخصص لتقييم المخاطر وإدارة المخاطر) للتدريب على تقييم المخاطر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q069",
             "section": "Article15_16",
             "number": "69",
             "type": "option",
             "title": "هل لدى بلدك احتياجات خاصة لمزيد من الإرشاد بشأن موضوعات محددة لتقييم مخاطر الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q070",
             "section": "Article15_16",
             "number": "70",
             "type": "sub-section",
             "title": "هل لدى بلدك القدرة على كشف وتحديد وتقييم مخاطر و/أو رصد الكائنات الحية المحورة أو السمات المحددة التي قد يكون لها آثار ضارة على حفظ التنوع البيولوجي واستخدامه المستدام، مع الأخذ في الاعتبار المخاطر على الصحة البشرية؟",
             "multiple": false,
             "questions": [
                {
                   "key": "Q070_a",
                   "section": "Article15_16",
                   "number": "أ",
                   "type": "option",
                   "title": "الكشف",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                },
                {
                   "key": "Q070_b",
                   "section": "Article15_16",
                   "number": "ب",
                   "type": "option",
                   "title": "التحديد",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                },
                {
                   "key": "Q070_c",
                   "section": "Article15_16",
                   "number": "‌ج",
                   "type": "option",
                   "title": "تقييم المخاطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                },
                {
                   "key": "Q070_d",
                   "section": "Article15_16",
                   "number": "د",
                   "type": "option",
                   "title": "الرصد",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ]
                }
             ]
          },
          {
             "key": "legend71_84",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>إجراء تقييم المخاطر أو إدارة المخاط</i>"
          },
          {
             "key": "Q071",
             "section": "Article15_16",
             "number": "71",
             "type": "sub-section",
             "title": "هل اعتمد بلدك أو استخدم أي وثائق إرشادية لغرض إجراء تقييم المخاطر أو إدارة المخاطر، أو لتقييم تقارير تقييم المخاطر المقدمة من المخطرين؟",
             "multiple": false,
             "questions": [
                {
                   "key": "Q071_a",
                   "section": "Article15_16",
                   "number": "أ",
                   "type": "option",
                   "title": "تقييم المخاطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true,
                   "validations": [
                      {
                         "question": "Q072",
                         "type": "&is71aOr71b",
                         "trigger": "enable"
                      }
                   ]
                },
                {
                   "key": "Q071_b",
                   "section": "Article15_16",
                   "number": "ب",
                   "type": "option",
                   "title": "إدارة المخاطر",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "mandatory": true,
                   "validations": [
                      {
                         "question": "Q072",
                         "type": "&is71aOr71b",
                         "trigger": "enable"
                      }
                   ]
                }
             ]
          },
          {
             "key": "Q072",
             "section": "Article15_16",
             "number": "72",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 71، هل يستخدم بلدك \"الإرشاد بشأن تقييم مخاطر الكائنات الحية المحورة\" (الذي أعده المنتدى الإلكتروني وفريق الخبراء التقنيين المخصص لتقييم المخاطر وإدارة المخاطر) لإجراء تقييم المخاطر أو إدارة المخاطر، أو لتقييم تقارير تقييم المخاطر المقدمة من المخطرين؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q073",
             "section": "Article15_16",
             "number": "73",
             "type": "option",
             "title": "هل اعتمد بلدك نُهجا أو منهجيات مشتركة لتقييم المخاطر بالتنسيق مع دول أخرى؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q074",
             "section": "Article15_16",
             "number": "74",
             "type": "option",
             "title": "هل تعاون بلدك مع أطراف أخرى بغية تحديد الكائنات الحية المحورة أو السمات المحددة التي يمكن أن تكون لها آثار ضارة على حفظ التنوع البيولوجي واستخدامه المستدام؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q075",
             "section": "Article15_16",
             "number": "75",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل أجرى بلدك أي نوع من أنواع تقييم مخاطر الكائنات الحية المحورة، بما في ذلك للاستخدام المعزول، أو التجارب الميدانية، أو الأغراض التجارية، أو الاستخدام المباشر كأغذية أو كأعلاف أو للتجهيز؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q076",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q077",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                },
                {
                   "question": "Q078",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q076",
             "section": "Article15_16",
             "number": "76",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 75، كم عدد تقييمات المخاطر التي أجريت؟",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 إلى 99"
                },
                {
                   "value": "100+",
                   "title": "100 أو أكثر"
                }
             ]
          },
          {
             "key": "Q077",
             "section": "Article15_16",
             "number": "77",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 75، يرجى الإشارة إلى نطاق تقييمات المخاطر (اختر كل ما ينطبق)",
             "multiple": true,
             "options": [
                {
                   "value": "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                   "title": "الكائنات الحية المحورة للاستخدام المعزول (وفقا للمادة 3)"
                },
                {
                   "value": "D6B59E8A-D82C-4516-917A-A745ACDA5931",
                   "title": "الكائنات الحية المحورة المراد إدخالها عن عمد في البيئة للاختبار التجريبي أو التجارب الميدانية"
                },
                {
                   "value": "015737FC-ABC2-460C-A099-06A1B01E649A",
                   "title": "الكائنات الحية المحورة المراد إدخالها عن عمد في البيئة للأغراض التجارية"
                },
                {
                   "value": "91BEAF12-ABE1-4294-AD3B-507935894C78",
                   "title": "الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية"
                },
                {
                   "value": "1D96153B-1625-44E4-AD5E-D26429044B29",
                   "title": "الكائنات الحية المحورة المراد استخدامها مباشرة كأعلاف"
                },
                {
                   "value": "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                   "title": "الكائنات الحية المحورة المراد استخدامها مباشرة للتجهيز"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q078",
             "section": "Article15_16",
             "number": "78",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 75، هل أجريت تقييمات المخاطر لجميع القرارات المتخذة بشأن الكائنات الحية المحورة للإدخال عن عمد في البيئة أو بشأن الاستخدام المحلي للكائنات الحية المحورة التي قد تخضع لحركة عابرة للحدود لاستخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز ؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q079",
             "section": "Article15_16",
             "number": "79",
             "type": "option",
             "title": "هل وضع بلدك آليات وتدابير واستراتيجيات مناسبة لتنظيم وإدارة  المخاطر المحددة في تقييمات مخاطر الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q080",
             "section": "Article15_16",
             "number": "80",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير مناسبة لمنع الحركات العابرة للحدود عن غير عمد للكائنات الحية المحورة، بما في ذلك تدابير مثل اشتراط إجراء تقييم للمخاطر قبل أول إطلاق لكائن حي محور؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q081",
             "section": "Article15_16",
             "number": "81",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير لضمان أن يخضع أي كائن حي محور، سواء كان مستوردا أو مطورا محليا، إلى فترة ملاحظة ملائمة تتناسب مع دورة حياته أو فترة إنتاجه قبل بدء استخدامه المنشود؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q082",
             "section": "Article15_16",
             "number": "82",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لرصد الآثار المحتملة للكائنات الحية المحورة التي تطلق في البيئة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q083",
             "section": "Article15_16",
             "number": "83",
             "type": "option",
             "title": "هل لدى بلدك البنية التحتية (مثل مرافق المختبرات) اللازمة لرصد أو إدارة الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q084",
             "section": "Article15_16",
             "number": "84",
             "type": "lstring",
             "title": "يمكنك من هنا الحصول على المزيد من المعلومات حول تنفيذ الفقرات 15 و16 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article17",
       "title": "المادة 17 - الحركات العابرة للحدود عن غير عمد<sup>2</sup>  وتدابير الطوارئ",
       "footnote": "<sup>2</sup> وفقا للتعريف التشغيلي المعتمد في المقرر CP VIII/16 فإن، \" النقل غير المقصود عبر الحدود\" هو نقل عبر الحدود لكائن حي محور عبر الحدود الوطنية لطرف ما دون قصد، حيث تم إطلاق الكائن الحي المحور، ولا تنطبق متطلبات المادة 17 من البروتوكول على عمليات النقل عبر الحدود هذه إلا إذا كان الكائن الحي المحور المعني يُحتمل أن تكون له آثار ضارة كبيرة على حفظ التنوع البيولوجي واستخدامه المستدام، مع مراعاة أيضا المخاطر على صحة الإنسان، وذلك في الدول المتضررة أو التي يحتمل أن تتضرر.\"",
       "questions": [
          {
             "key": "Q085",
             "section": "Article17",
             "number": "85",
             "type": "option",
             "title": "هل وضع بلدك تدابير لإخطار الدول المتأثرة أو المحتمل أن تكون متأثرة، وغرفة تبادل معلومات السلامة الأحيائية، وعند الاقتضاء، المنظمات الدولية ذات الصلة في حالة إطلاق في ولايتها القضائية يؤدي إلى، أو قد يؤدي إلى، حركة عابرة للحدود عن غير عمد؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q086",
             "section": "Article17",
             "number": "86",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، كم عدد إطلاقات الكائنات الحية المحورة التي حدثت في الولاية القضائية لبلدك والتي أدت، أو قد تكون قد أدت، إلى حركة عابرة للحدود عن غير عمد؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q087",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q087",
             "section": "Article17",
             "number": "87",
             "type": "option",
             "title": "إذا كانت إجابتك <i>على السؤال رقم 86</i> هي أن <i>لإطلاق حدث</i>ا، هل أخطر بلدك الدول المتأثرة أو المحتمل أن تكون متأثرة، وغرفة تبادل معلومات السلامة الأحيائية، والمنظمات الدولية ذات الصلة، عند الاقتضاء؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q088",
             "section": "Article17",
             "number": "88",
             "type": "option",
             "title": "هل لدى بلدك القدرة على اتخاذ تدابير الاستجابة المناسبة للحركات العابرة للحدود عن غير عمد؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q089",
             "section": "Article17",
             "number": "89",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، كم عدد المرات التي أصبح فيها بلدك على علم بحركة عابرة للحدود عن غير عمد في أراضيه؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q090",
             "section": "Article17",
             "number": "90",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 17 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article18",
       "title": "المادة 18 - المناولة والنقل والتعبئة وتحديد الهوية",
       "questions": [
          {
             "key": "Q091",
             "section": "Article18",
             "number": "91",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير تشترط مناولة وتعبئة ونقل <i>الكائنات الحية المحورة الخاضعة للحركة العابرة للحدود</i> بموجب شروط السلامة مع مراعاة القواعد والمعايير الدولية ذات الصلة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q092",
             "section": "Article18",
             "number": "92",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير تشترط أن تشير بوضوح الوثائق المصاحبة للكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز،  <i>في الحالات التي تكون فيها هوية الكائنات الحية المحورة</i> ، أنها <i>قد تحتوي على كائنات حية محورة</i>  وهي غير معدة للإدخال عن عمد في البيئة، فضلا عن نقطة اتصال للحصول على المزيد من المعلومات؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q093",
             "section": "Article18",
             "number": "93",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير تشترط أن تشير بوضوح الوثائق المصاحبة للكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز، أنه في الحالات التي تكون فيها هوية الكائنات الحية المحورة<u>معروفة</u> أنها <i>تحتوي على كائنات حية محورة</i> وهي غير معدة للإدخال عن عمد في البيئة، فضلا عن نقطة اتصال للحصول على المزيد من المعلومات؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q094",
                   "type": "&is91Or92Or93",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q094",
             "section": "Article18",
             "number": "94",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال (الأسئلة) 91 و/أو 92 و/أو 93، ما هو نوع الوثائق التي يقتضيها بلدك لمصاحبة الكائنات الحية المحورة ؟",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "وثيقة خاصة بالكائنات الحية المحورة"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "كجزء من وثيقة أخرى (غير مخصصة للكائنات الحية المحورة)"
                },
                {
                   "value": "other",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q095",
             "section": "Article18",
             "number": "95",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير تشترط أن تشير الوثائق المصاحبة <i>للكائنات الحية المحورة المعدة للاستخدام المعزول بوضوح إلى أنها كائنات حية محورة</i> وتحدد أي شروط لسلامة المناولة والتخزين والنقل والاستخدام ونقطة الاتصال للحصول على المزيد من المعلومات، بما في ذلك اسم وعنوان الشخص أو المؤسسة التي ستشحن إليها الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q096",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q096",
             "section": "Article18",
             "number": "96",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 95، ما نوع الوثائق التي يقتضيها بلدك لتحديد الكائنات الحية المحورة الموجهة للاستخدام المعزول؟",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "وثيقة خاصة بالكائنات الحية المحورة"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "كجزء من وثيقة أخرى (غير مخصصة للكائنات الحية المحورة)"
                },
                {
                   "value": "other",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q097",
             "section": "Article18",
             "number": "97",
             "type": "option",
             "title": "هل اتخذ بلدك تدابير تشترط أن تشير الوثائق المصاحبة <i>للكائنات الحية المحورة المراد إدخالها عن عمد في بيئة طرف الاستيراد بوضوح إلى أنها كائنات حية محورة</i>، وتحدد هويتها والسمات و/أو الخصائص ذات الصلة، وأي متطلبات بشأن سلامة المناولة والتخزين والنقل والاستخدام، ونقطة الاتصال للحصول على المزيد من المعلومات، وحسب الاقتضاء اسم وعنوان المستورد والمصدر؛ وتحتوي على إعلان يفيد بأن الحركة تتوافق مع متطلبات هذا البروتوكول بالنسبة للمصدر؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q098",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q098",
             "section": "Article18",
             "number": "98",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 97، ما نوع الوثائق التي يقتضيها بلدك لتحديد الكائنات الحية المحورة المراد إدخالها عن عمد في البيئة؟",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "وثيقة خاصة بالكائنات الحية المحورة"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "كجزء من وثيقة أخرى (غير مخصصة للكائنات الحية المحورة)"
                },
                {
                   "value": "other",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q099",
             "section": "Article18",
             "number": "99",
             "type": "option",
             "title": "هل يتوافر لدى بلدك أي إرشاد لغرض ضمان سلامة مناولة الكائنات الحية المحورة ونقلها وتعبئتها؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q100",
             "section": "Article18",
             "number": "100",
             "type": "option",
             "title": "هل لدى بلدك القدرة على إنفاذ متطلبات تحديد الكائنات الحية المحورة وتوثيقها؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q101",
             "section": "Article18",
             "number": "101",
             "type": "option",
             "title": "كم عدد موظفي الجمارك في بلدك الذين حصلوا على تدريب على تحديد الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 إلى 99"
                },
                {
                   "value": "100+",
                   "title": "100 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q101_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q101_adq",
             "section": "Article18",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q102",
             "section": "Article18",
             "number": "102",
             "type": "option",
             "title": "هل وضع بلدك إجراءات لأخذ عينات من الكائنات الحية المحورة والكشف عنها؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q103",
             "section": "Article18",
             "number": "103",
             "type": "option",
             "title": "كم عدد أخصائيي المختبرات في بلدك الذين حصلوا على تدريب على الكشف عن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 إلى 99"
                },
                {
                   "value": "100+",
                   "title": "100 أو أكثر"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q103_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ]
          },
          {
             "key": "Q103_adq",
             "section": "Article18",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q104",
             "section": "Article18",
             "number": "104",
             "type": "option",
             "title": "هل لدى بلدك إمكانية الوصول بشكل موثوق إلى مرافق مختبرات الكشف عن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q105",
             "section": "Article18",
             "number": "105",
             "type": "option",
             "title": "كم عدد المختبرات المعتمدة في بلدك للكشف عن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 أو أكثر"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q106",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q106",
             "section": "Article18",
             "number": "106",
             "type": "option",
             "title": "إذا كانت إجابتك  <i>على السؤال 105</i> هي <i>وجود مختبرات معتمدة في بلدك</i>، ما هو عدد المختبرات التي تعمل حاليا للكشف عن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q107",
             "section": "Article18",
             "number": "107",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 18 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article19",
       "title": "المادة 19 - السلطات الوطنية المختصة ونقاط الاتصال الوطنية",
       "questions": [
          {
             "key": "Q108",
             "section": "Article19",
             "number": "108",
             "type": "option",
             "title": "في حالة ما إذا كان بلدك عين أكثر من سلطة وطنية مختصة، هل أنشأ بلدك آلية لتنسيق أنشطتها قبل اتخاذ قرارات تتعلق بالكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                },
                {
                   "value": "false.noCna",
                   "title": "لا ينطبق (لم يتم تعيين سلطة وطنية مختصة)"
                },
                {
                   "value": "false.oneCna",
                   "title": "لا ينطبق (لم يتم تعيين سوى سلطة وطنية مختصة واحدة)"
                }
             ]
          },
          {
             "key": "Q109",
             "section": "Article19",
             "number": "109",
             "type": "option",
             "title": "هل وضع بلدك قدرات مؤسسية مناسبة لتمكين السلطة/السلطات الوطنية المختصة من أداء الوظائف الإدارية المطلوبة بموجب بروتوكول قرطاجنة للسلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q110",
             "section": "Article19",
             "number": "110",
             "type": "option",
             "title": "هل اضطلع بلدك بمبادرات لتعزيز التعاون بين نقاط الاتصال الوطنية والسلطة (السلطات) الوطنية المختصة والمؤسسات الأخرى بشأن المسائل المتعلقة بالسلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q111",
             "section": "Article19",
             "number": "111",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 19 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article20",
       "title": "المادة 20 -  تقاسم المعلومات وغرفة تبادل معلومات السلامة الأحيائية",
       "questions": [
          {
             "key": "Q112",
             "section": "Article20",
             "number": "112",
             "type": "sub-section",
             "title": "يرجى تقديم نظرة عامة على حالة المعلومات الإلزامية التي قدمها بلدك إلى غرفة تبادل معلومات السلامة الأحيائية عن طريق تحديد لكل فئة من المعلومات ما إذا كانت متاحة وما إذا كانت قُدمت إلى غرفة تبادل معلومات السلامة الأحيائية.",
             "questions": [
                {
                   "key": "Q112_a",
                   "section": "Article20",
                   "number": "أ",
                   "type": "option",
                   "title": "التشريعات واللوائح والمبادئ التوجيهية القائمة لتنفيذ البروتوكول، فضلا عن المعلومات المطلوبة من قبل الأطراف لإجراء الاتفاق المسبق عن علم (الفقرة 3(أ) من المادة 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_b",
                   "section": "Article20",
                   "number": "ب",
                   "type": "option",
                   "title": "التشريعات واللوائح والمبادئ التوجيهية المطبقة على استيراد الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز (الفقرة 5 من المادة 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_c",
                   "section": "Article20",
                   "number": "‌ج",
                   "type": "option",
                   "title": "الاتفاقات والترتيبات الثنائية والمتعددة الأطراف والإقليمية (الفقرة 2 من المادة 14 والفقرة 3(ب) من المادة 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_d",
                   "section": "Article20",
                   "number": "د",
                   "type": "option",
                   "title": "بيانات الاتصال الخاصة بالسلطات الوطنية المختصة (الفقرتان 2 و3 من المادة 19)، ونقاط الاتصال الوطنية (الفقرتان 1 و3 من المادة 19)، وجهات الاتصال في حالات الطوارئ (الفقرة 3(ﻫ) من المادة 17)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_e",
                   "section": "Article20",
                   "number": "ﻫ",
                   "type": "option",
                   "title": "‌القرارات التي تتخذها الأطراف بشأن المرور العابر للكائنات الحية المحورة (الفقرة 1 من المادة 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_f",
                   "section": "Article20",
                   "number": "‌و",
                   "type": "option",
                   "title": "القرارات التي تتخذها الأطراف بشأن استيراد الكائنات الحية المحورة للاستخدام المعزول (الفقرة 2 من المادة 6)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_g",
                   "section": "Article20",
                   "number": "‌ز",
                   "type": "option",
                   "title": "إخطارات فيما يتعلق بالإطلاق في إطار الولاية القضائية لبلدك تؤدي، أو من الممكن أن تؤدي، إلى حركات عابرة للحدود عن غير عمد لكائن حي محور ومن المرجح أن يكون لها آثار ضارة كبيرة على التنوع البيولوجي (الفقرة 1 من المادة 17)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_h",
                   "section": "Article20",
                   "number": "‌ح",
                   "type": "option",
                   "title": "معلومات عن حالات الحركات العابرة للحدود غير المشروعة للكائنات الحية المحورة (الفقرة 3 من المادة 25)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_i",
                   "section": "Article20",
                   "number": "ط",
                   "type": "option",
                   "title": "‌القرارات المتعلقة باستيراد الكائنات الحية المحورة لإدخالها عن عمد في البيئة (الفقرة 3 من المادة 10)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_j",
                   "section": "Article20",
                   "number": "‌ي",
                   "type": "option",
                   "title": "معلومات عن تطبيق اللوائح المحلية على واردات معينة من الكائنات الحية المحورة (الفقرة 4 من المادة 14)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_k",
                   "section": "Article20",
                   "number": "‌ك",
                   "type": "option",
                   "title": "القرارات المتعلقة بالاستخدام المحلي للكائنات الحية المحورة التي قد تخضع لحركة عابرة للحدود لاستخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز (الفقرة 1 من المادة 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_l",
                   "section": "Article20",
                   "number": "‌ل",
                   "type": "option",
                   "title": "القرارات المتعلقة باستيراد الكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو كأعلاف أو للتجهيز المتخذة بموجب الأطر التنظيمية المحلية (الفقرة 4 من المادة 11) أو وفقا للمرفق الثالث بالبروتوكول (الفقرة 6 من المادة 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_m",
                   "section": "Article20",
                   "number": "م‌",
                   "type": "option",
                   "title": "الإعلانات المتعلقة بالإطار الذي يتعين استخدامه للكائنات الحية المحورة المراد استخدامها مباشرة كأغذية أو أعلاف أو للتجهيز (الفقرة 6 من المادة 11)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_n",
                   "section": "Article20",
                   "number": "ن",
                   "type": "option",
                   "title": "‌استعراض وتغيير القرارات المتعلقة بالحركات العابرة للحدود عن عمد للكائنات الحية المحورة (الفقرة 1 من المادة 12)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_o",
                   "section": "Article20",
                   "number": "س",
                   "type": "option",
                   "title": "‌الحالات التي قد تتم فيها الحركة العابرة للحدود للكائنات الحية المحورة في نفس وقت إخطار طرف الاستيراد (الفقرة 1(أ) من المادة 13)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_p",
                   "section": "Article20",
                   "number": "‌ع",
                   "type": "option",
                   "title": "الكائنات الحية المحورة التي مُنحت صفة الإعفاء من كل طرف (الفقرة 1(ب) من المادة 13)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_q",
                   "section": "Article20",
                   "number": "‌ف",
                   "type": "option",
                   "title": "موجزات عن تقييمات المخاطر أو الاستعراضات البيئية للكائنات الحية المحورة الناشئة عن العمليات التنظيمية والمعلومات ذات الصلة الخاصة بنواتجها (الفقرة 3(ج) من المادة 20)",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "المعلومات متوفرة ومتاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "المعلومات متوفرة ولكن غير متاحة في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "المعلومات متوفرة ولكن متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "المعلومات غير متاحة"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q113",
             "section": "Article20",
             "number": "113",
             "type": "lstring",
             "title": "يرجى تقديم شرح موجز إذا كانت إجابتك هي أن المعلومات متاحة <i>ولكن ليس في غرفة تبادل معلومات السلامة الأحيائية أو متاحة جزئيا فقط في غرفة تبادل معلومات السلامة الأحيائية</i>  لأي بند تحت السؤال 112",
             "multiple": false
          },
          {
             "key": "Q114",
             "section": "Article20",
             "number": "114",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لتعزيز قدرات نقطة الاتصال الوطنية التابعة لغرفة تبادل معلومات السلامة الأحيائية للقيام بوظائفها الإدارية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q115",
             "section": "Article20",
             "number": "115",
             "type": "option",
             "title": "هل أنشأ بلدك آلية للتنسيق بين نقطة الاتصال الوطنية التابعة لغرفة تبادل معلومات السلامة الأحيائية ونقطة الاتصال التابعة لبروتوكول قرطاجنة والسلطة (السلطات) الوطنية المختصة لإتاحة المعلومات لغرفة تبادل معلومات السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q116",
             "section": "Article20",
             "number": "116",
             "type": "option",
             "title": "هل يستخدم بلدك المعلومات المتاحة في غرفة تبادل معلومات السلامة الأحيائية في عمليات صنع القرارات بشأن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "نعم، في بعض الحالات"
                },
                {
                   "value": "false",
                   "title": "لا"
                },
                {
                   "value": "false.na",
                   "title": "لا ينطبق (لم تتخذ قرارات)"
                }
             ]
          },
          {
             "key": "Q117",
             "section": "Article20",
             "number": "117",
             "type": "option",
             "title": "هل واجه بلدك صعوبات في الوصول إلى غرفة تبادل معلومات السلامة الأحيائية أو استخدامها؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q118",
             "section": "Article20",
             "number": "118",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، كم عدد الأحداث المتصلة بالسلامة الأحيائية (مثل الحلقات الدراسية وحلقات العمل والمؤتمرات الصحفية والأحداث التعليمية) التي نظمها بلدك؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 24"
                },
                {
                   "value": "25+",
                   "title": "25 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q119",
             "section": "Article20",
             "number": "119",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، كم عدد المطبوعات المتعلقة بالسلامة الأحيائية التي نشرها بلدك؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 إلى 99"
                },
                {
                   "value": "100+",
                   "title": "100 أو أكثر"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q120",
             "section": "Article20",
             "number": "120",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 20 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article21",
       "title": "المادة 21 - المعلومات السرية",
       "questions": [
          {
             "key": "Q121",
             "section": "Article21",
             "number": "121",
             "type": "option",
             "title": "هل وضع بلدك إجراءات لحماية المعلومات السرية المستلمة بموجب البروتوكول؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q122",
             "section": "Article21",
             "number": "122",
             "type": "option",
             "title": "هل يسمح بلدك للمخطر بتحديد المعلومات التي يتعين تناولها كمعلومات سرية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q123",
             "section": "Article21",
             "number": "123",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 21 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article22",
       "title": "المادة 22 - بناء القدرات",
       "questions": [
          {
             "key": "Q124",
             "section": "Article22",
             "number": "124",
             "type": "option",
             "title": "هل لدى بلدك تمويل يمكن التنبؤ به وموثوق لبناء القدرات من أجل التنفيذ الفعال للبروتوكول؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q125",
             "section": "Article22",
             "number": "125",
             "type": "option",
             "title": "هل حصل بلدك على دعم خارجي أو استفاد من الأنشطة التعاونية مع الأطراف الأخرى في تنمية و/أو تعزيز الموارد البشرية والقدرات المؤسسية في مجال السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q126",
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
             "key": "Q126",
             "section": "Article22",
             "number": "126",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 125، كيف أتيحت هذه الموارد؟ [يرجى التحديد]",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "قنوات ثنائية"
                },
                {
                   "value": "channels.regional",
                   "title": "قنوات إقليمية"
                },
                {
                   "value": "channels.multilateral",
                   "title": "قنوات متعددة الأطراف"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q127",
             "section": "Article22",
             "number": "127",
             "type": "option",
             "title": "هل قدم بلدك دعما إلى الأطراف الأخرى لتنمية و/أو تعزيز الموارد البشرية والقدرات المؤسسية في مجال السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q128",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q128",
             "section": "Article22",
             "number": "128",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 127، كيف أتيحت هذه الموارد؟ [يرجى التحديد]",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "قنوات ثنائية"
                },
                {
                   "value": "channels.regional",
                   "title": "قنوات إقليمية"
                },
                {
                   "value": "channels.multilateral",
                   "title": "قنوات متعددة الأطراف"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q129",
             "section": "Article22",
             "number": "129",
             "type": "option",
             "title": "في الفترة المشمولة بالتقرير، هل شرع بلدك في عملية للحصول على أموال من مرفق البيئة العالمية لبناء القدرات في مجال السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q130",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q130",
             "section": "Article22",
             "number": "130",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 129، كيف تصف هذه العملية؟",
             "multiple": false,
             "options": [
                {
                   "value": "veryEasy",
                   "title": "سهلة للغاية"
                },
                {
                   "value": "easy",
                   "title": "سهلة"
                },
                {
                   "value": "average",
                   "title": "متوسطة الصعوبة"
                },
                {
                   "value": "difficult",
                   "title": "صعبة"
                },
                {
                   "value": "veryDifficult",
                   "title": "صعبة للغاية"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q131",
             "section": "Article22",
             "number": "131",
             "type": "term",
             "title": "خلال المرحلة الحالية المشمولة بالتقرير، هل اضطلع بلدك بأنشطة لتنمية و/أو تعزيز الموارد البشرية والقدرات المؤسسية في مجال السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q132",
                   "values": [
                      "true.some",
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q132",
             "section": "Article22",
             "number": "132",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 131، في أي مجال من المجالات التالية اضطلع فيها بهذه الأنشطة؟",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "القدرات المؤسسية والموارد البشرية"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "إدماج السلامة الأحيائية في التشريعات والسياسات والمؤسسات متعددة القطاعات والقطاعية (تعميم السلامة الأحيائية)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "تقييم المخاطر والخبرات العلمية والتقنية الأخرى"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "إدارة المخاطر"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "التوعية العامة والمشاركة والتعليم في مجال السلامة الأحيائية"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "تبادل المعلومات وإدارة البيانات بما في ذلك المشاركة في غرفة تبادل معلومات السلامة الأحيائية"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "التعاون العلمي والتقني والمؤسسي على الصعيد دون الإقليمي والإقليمي والدولي نقل التكنولوجيا"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "نقل التكنولوجيا"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "تحديد الكائنات الحية المحورة بما في ذلك الكشف عنها"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "الاعتبارات الاجتماعية والاقتصادية"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "تنفيذ متطلبات التوثيق بموجب المادة 18-2 من البروتوكول"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "تناول المعلومات السرية "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "تدابير لمعالجة الحركات العابرة للحدود عن غير عمد و/أو غير المشروعة للكائنات الحية المحورة"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "البحوث العلمية في مجال السلامة الأحيائية المتعلقة بالكائنات الحية المحورة"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "مراعاة المخاطر على الصحة البشرية"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "المسؤولية والجبر التعويضي"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q133",
             "section": "Article22",
             "number": "133",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل أجرى بلدك تقييما بشأن الاحتياجات من حيث بناء القدرات؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q134",
             "section": "Article22",
             "number": "134",
             "type": "option",
             "title": "هل ما زال لدى بلدك احتياجات من حيث بناء القدرات؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q135",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q135",
             "section": "Article22",
             "number": "135",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 134، في أي مجال من المجالات التالية لا تزال هناك حاجة إلى بناء القدرات (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "القدرات المؤسسية والموارد البشرية"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "إدماج السلامة الأحيائية في التشريعات والسياسات والمؤسسات متعددة القطاعات والقطاعية (تعميم السلامة الأحيائية)"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "تقييم المخاطر والخبرات العلمية والتقنية الأخرى"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "إدارة المخاطر"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "التوعية العامة والمشاركة والتعليم في مجال السلامة الأحيائية"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "تبادل المعلومات وإدارة البيانات بما في ذلك المشاركة في غرفة تبادل معلومات السلامة الأحيائية"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "التعاون العلمي والتقني والمؤسسي على الصعيد دون الإقليمي والإقليمي والدولي نقل التكنولوجيا"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "نقل التكنولوجيا"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "تحديد الكائنات الحية المحورة بما في ذلك الكشف عنها"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "الاعتبارات الاجتماعية والاقتصادية"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "تنفيذ متطلبات التوثيق بموجب المادة 18-2 من البروتوكول"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "مناولة المعلومات السرية "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "تدابير لمعالجة الحركات العابرة للحدود عن غير عمد و/أو غير المشروعة للكائنات الحية"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "البحوث العلمية في مجال السلامة الأحيائية المتعلقة بالكائنات الحية المحورة"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "مراعاة المخاطر على الصحة البشرية"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "المسؤولية والجبر التعويضي"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q136",
             "section": "Article22",
             "number": "136",
             "type": "option",
             "title": "هل أعد بلدك استراتيجية أو خطة عمل لبناء القدرات؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q137",
             "section": "Article22",
             "number": "137",
             "type": "option",
             "title": "هل لدى بلدك آلية وطنية عاملة لتنسيق مبادرات بناء القدرة في مجال السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q138",
             "section": "Article22",
             "number": "138",
             "type": "lstring",
             "title": "يمكنك الحصول على المزيد من المعلومات حول تنفيذ الفقرة 22 في بلدك، بما في ذلك المزيد من المعلومات حول تجربتك في الحصول على أموال من مرفق البيئة العالمي",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article23",
       "title": "المادة 23 - التوعية العامة والمشاركة",
       "questions": [
          {
             "key": "Q139",
             "section": "Article23",
             "number": "139",
             "type": "option",
             "title": "هل تتناول التشريعات أو السياسات في بلدك التوعية العامة و/أو التعليم و/أو المشاركة فيما يتعلق بالسلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q140",
             "section": "Article23",
             "number": "140",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل تعاون بلدك مع دول وهيئات دولية أخرى فيما يتعلق بالتوعية العامة والتعليم والمشاركة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q141",
             "section": "Article23",
             "number": "141",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لضمان إمكانية حصول عامة الجمهور على معلومات بشأن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q142",
             "section": "Article23",
             "number": "142",
             "type": "option",
             "title": "هل لدى بلدك استراتيجية اتصال وطنية بشأن السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q143",
             "section": "Article23",
             "number": "143",
             "type": "option",
             "title": "هل لدى بلدك أي برامج توعية وترويج بشأن السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q144",
             "section": "Article23",
             "number": "144",
             "type": "option",
             "title": "هل لدى بلدك حاليا موقعا وطنيا على الإنترنت بشأن السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145",
             "section": "Article23",
             "number": "145",
             "type": "option",
             "title": "كم عدد المؤسسات الأكاديمية في بلدك التي تقدم دورات وبرامج تعليمية وتدريبية بشأن السلامة الأحيائية؟ (3)",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q145_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145_adq",
             "section": "Article23",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q146",
             "section": "Article23",
             "number": "146",
             "type": "option",
             "title": "كم عدد المواد التعليمية و/أو الوحدات القائمة على الإنترنت بشأن السلامة الأحيائية المتاحة ويمكن للجمهور الوصول إليها في بلدك؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 24"
                },
                {
                   "value": "25+",
                   "title": "25 إلى 99"
                },
                {
                   "value": "100+",
                   "title": "100 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q146_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q146_adq",
             "section": "Article23",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q147",
             "section": "Article23",
             "number": "147",
             "type": "option",
             "title": "هل أنشأ بلدك آلية لاستشارة الجمهور في عملية صنع القرار بشأن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q148",
             "section": "Article23",
             "number": "148",
             "type": "option",
             "title": "هل أبلغ بلدك الجمهور بالطرائق الحالية للمشاركة العامة في عملية صنع القرار المتعلق بالكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q149",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q149",
             "section": "Article23",
             "number": "149",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 148، يرجى بيان الطرائق المستخدمة لإبلاغ الجمهور: (اختر كل ما ينطبق)",
             "multiple": true,
             "options": [
                {
                   "value": "4E205CD9-9958-497F-A760-F8321771AB3A",
                   "title": "مواقع الإنترنت الوطنية"
                },
                {
                   "value": "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                   "title": "الصحف"
                },
                {
                   "value": "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                   "title": "المنتديات"
                },
                {
                   "value": "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                   "title": "القوائم البريدية"
                },
                {
                   "value": "51792A07-B3C0-4F7B-830E-0741635F57BB",
                   "title": "الجلسات العلنية"
                },
                {
                   "value": "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                   "title": "وسائل التواصل الاجتماعي"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q150",
             "section": "Article23",
             "number": "150",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، كم عدد المرات التي استشار فيها بلدك الجمهور في عملية صنع القرار المتعلق بالكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد (القرارات اتخذت بدون استشارة)"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 أو أكثر"
                },
                {
                   "value": "na",
                   "title": "لا ينطبق (لم تتخذ قرارات)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q151",
             "section": "Article23",
             "number": "151",
             "type": "option",
             "title": "هل أبلغ بلدك الجمهور بوسائل الوصول إلى غرفة تبادل معلومات السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q152",
             "section": "Article23",
             "number": "152",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 23 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article24",
       "title": "المادة 24 - غير الأطراف",
       "questions": [
          {
             "key": "Q153",
             "section": "Article24",
             "number": "153",
             "type": "option",
             "title": "هل دخل بلدك في ترتيب ثنائي أو إقليمي أو متعدد الأطراف مع بلد من غير الأطراف فيما يتعلق بالحركات العابرة للحدود للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q154",
             "section": "Article24",
             "number": "154",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل استورد بلدك كائنات حية محورة من بلد من غير الأطراف؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q156",
                   "type": "&is154Or155",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q155",
             "section": "Article24",
             "number": "155",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل صدر بلدك كائنات حية محورة إلى بلد من غير الأطراف؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q156",
                   "type": "&is154Or155",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q156",
             "section": "Article24",
             "number": "156",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 154 و/أو 155، هل كانت الحركات العابرة للحدود للكائنات الحية المحورة متسقة مع هدف بروتوكول قرطاجنة السلامة الأحيائية؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q157",
             "section": "Article24",
             "number": "157",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 24 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article25",
       "title": "المادة 25 - الحركات العابرة للحدود غير المشروعة<sup>3</sup>",
       "footnote": "<sup>3</sup>وفقا للتعريف التشغيلي المعتمد في المقرر CP VIII/16، فإن، \"\"النقل غير المشروع عبر الحدود\" هو نقل عبر الحدود للكائنات الحية المحورة يتم بالمخالفة للتدابير المحلية لتنفيذ البروتوكول التي اعتمدها الطرف المعني \".",
       "questions": [
          {
             "key": "Q158",
             "section": "Article25",
             "number": "158",
             "type": "option",
             "title": "هل اعتمد بلدك تدابير محلية تهدف إلى منع الحركات العابرة للحدود للكائنات الحية المحورة المضطلع بها بما يتعارض مع تدابير البلد المحلية المتعلقة بتنفيذ بروتوكول قرطاجنة و/أو معاقبة المسؤولين عنها؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، إلى حد ما",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q159",
             "section": "Article25",
             "number": "159",
             "type": "option",
             "title": "في الفترة المشمولة بالتقرير، كم عدد حالات الحركات العابرة للحدود غير المشروعة للكائنات الحية المحورة الذي أصبح بلدك على علم بها؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 أو أكثر"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q160",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q160",
             "section": "Article25",
             "number": "160",
             "type": "option",
             "title": "إذا كانت إجابتك <i>على السؤال 159 هي أن بلدك أصبح على علم بالحركات العابرة للحدود غير المشروعة</i>، هل تم تحديد منشأ الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "true.some",
                   "title": "نعم، في بعض الحالات"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q161",
             "section": "Article25",
             "number": "161",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 25 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article26",
       "title": "المادة 26 - الاعتبارات الاجتماعية والاقتصادية",
       "questions": [
          {
             "key": "Q162",
             "section": "Article26",
             "number": "162",
             "type": "option",
             "title": "هل لدى بلدك أي نُهُج أو متطلبات محددة تيسر كيفية مراعاة الاعتبارات الاجتماعية والاقتصادية في صناعة القرار المتعلق بالكائنات الحية المحورة؟(3)",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q163",
             "section": "Article26",
             "number": "163",
             "type": "option",
             "title": "في الفترة الحالية المشمولة بالتقرير، هل تم أخذ الاعتبارات الاجتماعية والاقتصادية الناشئة عن أثر الكائنات الحية المحورة في الاعتبار عند اتخاذ القرار؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم، دائما"
                },
                {
                   "value": "true.some",
                   "title": "في بعض الحالات فقط"
                },
                {
                   "value": "false",
                   "title": "لا"
                },
                {
                   "value": "false.na",
                   "title": "لا ينطبق (لم تتخذ قرارات)"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164",
             "section": "Article26",
             "number": "164",
             "type": "option",
             "title": "كم عدد المواد المنشورة التي خضعت لاستعراض النظراء التي استخدمها بلدك لغرض وضع أو تحديد الإجراءات الوطنية فيما يتعلق بالاعتبارات الاجتماعية والاقتصادية؟",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "لا يوجد"
                },
                {
                   "value": "1+",
                   "title": "1 إلى 4"
                },
                {
                   "value": "5+",
                   "title": "5 إلى 9"
                },
                {
                   "value": "10+",
                   "title": "10 إلى 49"
                },
                {
                   "value": "50+",
                   "title": "50 أو أكثر"
                }
             ],
             "validations": [
                {
                   "question": "Q164_adq",
                   "values": [
                      "0"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "visible"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164_adq",
             "section": "Article26",
             "number": "",
             "type": "option",
             "title": "هل هذا العدد كاف",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q165",
             "section": "Article26",
             "number": "165",
             "type": "option",
             "title": "هل تعاون بلدك مع أطراف أخرى بشأن البحوث وتبادل المعلومات المتعلقة بأي آثار اجتماعية واقتصادية للكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q166",
             "section": "Article26",
             "number": "166",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن تنفيذ المادة 26 في بلدك",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article28",
       "title": "المادة 28 - الآلية المالية والموارد",
       "questions": [
          {
             "key": "Q167",
             "section": "Article28",
             "number": "167",
             "type": "option",
             "title": "في الفترة المشمولة بالتقرير، ما حجم التمويل (بما يعادل الدولارات الأمريكية) الذي حشده بلدك لدعم تنفيذ بروتوكول قرطاجنة بما يتجاوز مخصصات الميزانية الوطنية العادية؟",
             "multiple": false,
             "options": [
                {
                   "value": "USD0",
                   "title": "لا يوجد"
                },
                {
                   "value": "USD1-4999",
                   "title": "1 إلى 999 4 دولارا أمريكيا"
                },
                {
                   "value": "USD5000-49999",
                   "title": "5,000 إلى 999 49 دولارا أمريكيا"
                },
                {
                   "value": "USD50000-99999",
                   "title": "50,000 إلى 999 99 دولارا أمريكيا"
                },
                {
                   "value": "USD100000-499000",
                   "title": "100,000 إلى 999 499 دولارا أمريكيا"
                },
                {
                   "value": "USD500000+",
                   "title": "500.000 دولار أمريكي أو أكثر"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "Article33",
       "title": "المادة 33 - الرصد وإعداد التقارير",
       "description": "<i>تقضي المادة 33 <u>تنفيذ التزاماتها</u> من الأطراف أن ترصد بموجب بروتوكول قرطاجنة وتقديم تقرير إلى مؤتمر الأطراف العامل كاجتماع للأطراف في البروتوكول بشأن التدابير المتخذة لتنفيذ بروتوكول قرطاجن</i>",
       "questions": [
          {
             "key": "Q168",
             "section": "Article33",
             "number": "168",
             "type": "option",
             "title": "هل لدى بلدك نظام لرصد وإنفاذ تنفيذ بروتوكول قرطاجنة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "LiabilityRedress",
       "title": "بروتوكول ناغويا-كوالا لامبور التكميلي بشأن المسؤولية والجبر التعويضي",
       "description": "<i>تدعى الأطراف في بروتوكول قرطاجنة أيضا التي لم تصبح بعد أطرافا في البروتوكول التكميلي إلى الإجابة على الأسئلة الواردة أدنا</i>",
       "questions": [
          {
             "key": "Q169",
             "section": "LiabilityRedress",
             "number": "169",
             "type": "option",
             "title": "هل بلدك طرف في بروتوكول ناغويا-كوالالمبور التكميلي بشأن المسؤولية والجبر التعويضي؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true,
             "validations": [
                {
                   "question": "Q170",
                   "values": [
                      "false"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q170",
             "section": "LiabilityRedress",
             "number": "170",
             "type": "option",
             "title": "إذا كانت إجابتك <i>لا</i> على السؤال 169، هل هناك أي عملية وطنية لكي يصبح طرفا في البروتوكول التكميلي؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q171",
             "section": "LiabilityRedress",
             "number": "171",
             "type": "term",
             "title": "هل أدخل بلدك التدابير الوطنية الضرورية لتنفيذ البروتوكول التكميلي؟",
             "multiple": false,
             "options": [
                {
                   "value": "74B17D51-786F-3D68-3B76-A50121842925",
                   "title": "توجد تدابير وطنية كاملة"
                },
                {
                   "value": "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                   "title": "توجد تدابير وطنية جزئية"
                },
                {
                   "value": "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                   "title": "لم توضع إلا تدابير مؤقتة فقط"
                },
                {
                   "value": "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                   "title": "لا يوجد إلا مشروع تدابير"
                },
                {
                   "value": "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                   "title": "لم تتخذ تدابير بعد"
                }
             ],
             "validations": [
                {
                   "question": "Q172",
                   "values": [
                      "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9"
                   ],
                   "type": "@hasValuesExcept",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q172",
             "section": "LiabilityRedress",
             "number": "172",
             "type": "term",
             "title": "ما هي الأدوات القائمة لتنفيذ البروتوكول التكميلي؟",
             "multiple": false,
             "options": [
                {
                   "value": "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                   "title": "قانون وطني واحد أو أكثر",
                   "type": "lstring"
                },
                {
                   "value": "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                   "title": "لائحة وطنية واحدة أو أكثر",
                   "type": "lstring"
                },
                {
                   "value": "BA743C79-B202-4611-16C4-2C7D4678ACEB",
                   "title": "مجموعة واحدة أو أكثر من المبادئ التوجيهية",
                   "type": "lstring"
                },
                {
                   "value": "9067DB5B-E33B-655D-83A3-32D4D562618F",
                   "title": "لا توجد أدوات قائمة"
                }
             ]
          },
          {
             "key": "Q173",
             "section": "LiabilityRedress",
             "number": "173",
             "type": "sub-section",
             "title": "هل لدى بلدك أدوات إدارية أو قانونية تقتضي اتخاذ تدابير استجابة",
             "multiple": false,
             "questions": [
                {
                   "key": "Q173_a",
                   "section": "LiabilityRedress",
                   "number": "أ",
                   "type": "option",
                   "title": "في حالة الأضرار الناجمة عن الكائنات الحية المحورة؟",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "validations": [
                      {
                         "question": "Q174",
                         "values": [
                            "true"
                         ],
                         "type": "@hasValues",
                         "trigger": "enable"
                      },
                      {
                         "question": "Q175",
                         "values": [
                            "true"
                         ],
                         "type": "@hasValues",
                         "trigger": "enable"
                      },
                      {
                         "question": "Q176",
                         "values": [
                            "true"
                         ],
                         "type": "&is173aOr173b",
                         "trigger": "enable"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q173_b",
                   "section": "LiabilityRedress",
                   "number": "ب",
                   "type": "option",
                   "title": "في حالة ما إذا كان من المحتمل بدرجة كافية أن يكون هناك ضرر إذا لم تُتخذ تدابير الاستجابة؟",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "نعم"
                      },
                      {
                         "value": "false",
                         "title": "لا"
                      }
                   ],
                   "validations": [
                      {
                         "question": "Q176",
                         "values": [
                            "true"
                         ],
                         "type": "&is173aOr173b",
                         "trigger": "enable"
                      }
                   ],
                   "mandatory": true
                }
             ]
          },
          {
             "key": "Q174",
             "section": "LiabilityRedress",
             "number": "174",
             "type": "term",
             "title": "ذا كانت إجابتك <i>نعم</i> على السؤال 173أ، هل تفرض هذه الأدوات متطلبات على المشغل (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "true.inform",
                   "title": "نعم، على المشغل أن يبلغ السلطة المختصة بالضرر"
                },
                {
                   "value": "true.evaluate",
                   "title": "نعم، على المشغل أن يقيّم الضرر"
                },
                {
                   "value": "true.response",
                   "title": "نعم، على المشغل أن يتخذ تدابير استجابة"
                },
                {
                   "value": "true.other",
                   "title": "نعم، متطلبات أخرى",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q175",
             "section": "LiabilityRedress",
             "number": "175",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 173أ، هل تفرض هذه الأدوات متطلبات على المشغل (اختر كل ما ينطبق)؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q176",
             "section": "LiabilityRedress",
             "number": "176",
             "type": "option",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 173أ أو 173ب، هل توفر هذه الأدوات تعريفا لكلمة \"المشغل\"؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q177",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q177",
             "section": "LiabilityRedress",
             "number": "177",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 176، في أي مجال من المجالات التالية لا تزال هناك حاجة إلى بناء القدرات (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "8F627A99-7CD4-D892-80EA-12C58607508F",
                   "title": "الحائز على تصريح"
                },
                {
                   "value": "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                   "title": "شخص طرح الكائن الحي المحور في السوق"
                },
                {
                   "value": "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                   "title": "مطور"
                },
                {
                   "value": "ADEF00D6-0901-8750-1069-5CBA877011CC",
                   "title": "منتج"
                },
                {
                   "value": "3F54E971-E791-FE00-5312-F7FF07C818B1",
                   "title": "مخطر"
                },
                {
                   "value": "2D8B29DD-0703-6130-BE79-389F5278C21D",
                   "title": "مصدر"
                },
                {
                   "value": "D475D239-517E-9D8B-E1F9-4C453039C792",
                   "title": "مستورد"
                },
                {
                   "value": "8BD75295-88DF-2A32-A150-1132670E19A9",
                   "title": "ناقل"
                },
                {
                   "value": "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                   "title": "مورد"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q178",
             "section": "LiabilityRedress",
             "number": "178",
             "type": "option",
             "title": "هل تم تحديد سلطة مختصة للقيام بالوظائف المنصوص عليها في البروتوكول التكميلي؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q179",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q179",
             "section": "LiabilityRedress",
             "number": "179",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 178، ما هي التدابير التي يمكن أن تتخذها السلطة المختصة (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                   "title": "تحديد المشغل الذي يتسبب في الضرر"
                },
                {
                   "value": "6065EDB8-C5A4-BA81-5271-B2F93159A471",
                   "title": "تقييم الضرر"
                },
                {
                   "value": "A038303D-7049-E34F-8381-5B59702BBCF6",
                   "title": "تحديد تدابير الاستجابة التي يتعين أن يتخذها المشغل"
                },
                {
                   "value": "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                   "title": "تنفيذ تدابير الاستجابة"
                },
                {
                   "value": "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                   "title": "استرداد تكاليف ونفقات تقييم الضرر وتنفيذ تدابير الاستجابة من المشغل"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q180",
             "section": "LiabilityRedress",
             "number": "180",
             "type": "option",
             "title": "هل لدى بلدك تدابير لتوفير الأمن المالي للضرر الناتج عن الكائنات الحية المحورة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q181",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q181",
             "section": "LiabilityRedress",
             "number": "181",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 180، ما نوع تدابير الأمن المالي الموجودة (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                   "title": "متطلبات بتوفير أدلة على مصدر تمويل آمن"
                },
                {
                   "value": "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                   "title": "تأمين إلزامي"
                },
                {
                   "value": "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                   "title": "خطط حكومية، بما في ذلك صناديق"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "أخرى",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q182",
             "section": "LiabilityRedress",
             "number": "182",
             "type": "term",
             "title": "هل لدى بلدك قواعد وإجراءات متعلقة بالمسؤولية المدنية التي تتناول الضرر الناتج عن الكائنات الحية المحورة أو إذا كان قد تم الإقرار بأضرار من هذا القبيل في أحكام المحاكم (اختر كل ما ينطبق)؟",
             "multiple": true,
             "options": [
                {
                   "value": "878DF5F5-0B5E-48E1-6A42-80867A101675",
                   "title": "نعم، في أداة عن المسؤولية المدنية"
                },
                {
                   "value": "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                   "title": "نعم، في أحكام المحاكم"
                },
                {
                   "value": "true",
                   "title": "نعم، في أدوات أخرى",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q183",
             "section": "LiabilityRedress",
             "number": "183",
             "type": "term",
             "title": "هل حدثت أي أضرار ناتجة عن الكائنات الحية المحورة في بلدك؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ],
             "validations": [
                {
                   "question": "Q184",
                   "values": [
                      "true"
                   ],
                   "type": "@hasValues",
                   "trigger": "enable"
                }
             ]
          },
          {
             "key": "Q184",
             "section": "LiabilityRedress",
             "number": "184",
             "type": "term",
             "title": "إذا كانت إجابتك <i>نعم</i> على السؤال 183، هل اتُخذت تدابير استجابة؟",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "نعم",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "لا"
                }
             ]
          },
          {
             "key": "Q185",
             "section": "LiabilityRedress",
             "number": "185",
             "type": "lstring",
             "title": "يمكن أن تقدم هنا المزيد من التفاصيل عن أي أنشطة اضطلع بها في بلدك من أجل تنفيذ بروتوكول ناغويا-كوالالمبور التكميلي بشأن المسؤولية والجبر التعويضي",
             "multiple": false
          }
       ]
    },
    {
       "key": "AdditionalInformation",
       "title": "معلومات أخرى",
       "questions": [
          {
             "key": "Q186",
             "section": "AdditionalInformation",
             "number": "186",
             "type": "lstring",
             "title": "يرجى استخدام هذا الإطار لتقديم أي معلومات أخرى بشأن القضايا المتعلقة بتنفيذ البروتوكول على الصعيد الوطني، بما في ذلك أي عوائق أو عقبات ووجهت.",
             "multiple": false
          }
       ]
    },
    {
       "key": "Comments",
       "title": "تعليقات على نموذج التقرير",
       "questions": [
          {
             "key": "Q187",
             "section": "Comments",
             "number": "187",
             "type": "lstring",
             "title": "يرجى استخدام هذا الإطار لتقديم أي معلومات أخرى بشأن الصعوبات التي واجهتها أثناء كتابة التقرير.",
             "multiple": false
          }
       ]
    }
 ];
  return cpbNationalReport4;
});
