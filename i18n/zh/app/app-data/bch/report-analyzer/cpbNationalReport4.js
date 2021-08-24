define(function () {
  'use strict';

  var cpbNationalReport4 = [
    {
       "key": "General",
       "title": "《卡塔赫纳生物安全议定书》缔约方",
       "questions": [
          {
             "key": "Q012_party",
             "section": "General",
             "number": "11",
             "type": "option",
             "title": "贵国是否为《卡塔赫纳生物安全议定书》(CPB) 的缔约方？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "贵国若不是《卡塔赫纳生物安全议定书》缔约方，那么是否已经启动了成为缔约方的任何国家进程？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q013",
             "section": "General",
             "number": "13",
             "type": "lstring",
             "title": "您可以在此提供更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article2",
       "title": "第 2 条 –一般规定",
       "description": "<i>第2条要求每一缔约方为履行本议定书为之规定的各项义务采取必要和适当的法律、行政和其他措施。</i>",
       "questions": [
          {
             "key": "Q014",
             "section": "Article2",
             "number": "14",
             "type": "option",
             "title": "贵国是否已采取必要的国家性措施执行《议定书》？",
             "multiple": false,
             "options": [
                {
                   "value": "implementation.fullInPlace",
                   "title": "全面采取了国家措施"
                },
                {
                   "value": "implementation.partiallyInPlace",
                   "title": "部分采取了国家措施"
                },
                {
                   "value": "implementation.temporaryMeasures",
                   "title": "仅采取了临时措施"
                },
                {
                   "value": "implementation.draftMeasures",
                   "title": "仅有措施草案"
                },
                {
                   "value": "implementation.none",
                   "title": "未采取任何措施"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q015",
             "section": "Article2",
             "number": "15",
             "type": "option",
             "title": "贵国已制定哪些用于执行国家生物安全措施的具体文书？（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "instrument.nationalBiosafetyLaws",
                   "title": "一部或多部国家生物安全法律"
                },
                {
                   "value": "instrument.nationalBiosafetyRegulations",
                   "title": "一部或多部国家生物安全条例"
                },
                {
                   "value": "instrument.biosafetyGuidelines",
                   "title": "一套或多套生物安全准则"
                },
                {
                   "value": "instrument.indirectLaws",
                   "title": "间接适用于生物安全的其他法律、条例或准则"
                },
                {
                   "value": "instrument.none",
                   "title": "未出台任何文书"
                }
             ]
          },
          {
             "key": "Q016",
             "section": "Article2",
             "number": "16",
             "type": "option",
             "title": "贵国是否已采取举措，将生物安全纳入国家生物多样性战略和行动计划及其他政策或立法的主流？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                },
                {
                   "value": "false.other",
                   "title": "其他",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q017",
             "section": "Article2",
             "number": "17",
             "type": "option",
             "title": "贵国是否已经建立了运作国家生物安全措施的预算分配机制？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q018",
             "section": "Article2",
             "number": "18",
             "type": "option",
             "title": "贵国是否有常设工作人员管理与生物安全直接相关的各项职能？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第18个问题的回答为 <i>是</i>那么，其职能与生物安全直接相关的常设工作人员已有多少人？ ",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 至 4人"
                },
                {
                   "value": "5+",
                   "title": "5 至 9人"
                },
                {
                   "value": "10+",
                   "title": "10人或以上"
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
             "title": "人数是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q020",
             "section": "Article2",
             "number": "20",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第2条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article5",
       "title": "第 5 条 –  药物",
       "questions": [
          {
             "key": "Q021",
             "section": "Article5",
             "number": "21",
             "type": "option",
             "title": "贵国是否规范了作为药物的改性活生物体的越境转移、处理或使用？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q022",
             "section": "Article5",
             "number": "22",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第5条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article6",
       "title": "第 6 条 – 过境和封闭使用",
       "questions": [
          {
             "key": "Q023",
             "section": "Article6",
             "number": "23",
             "type": "option",
             "title": "贵国是否规范了改性活生物体的过境？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q024",
             "section": "Article6",
             "number": "24",
             "type": "option",
             "title": "贵国是否规范了改性活生物体的封闭使用？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q025",
             "section": "Article6",
             "number": "25",
             "type": "option",
             "title": "贵国是否已经就进口用于封闭使用的改性活生物体作出决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q026",
             "section": "Article6",
             "number": "26",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第6条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Articles7-10",
       "title": "第 7 至 10 条 – 事先知情同意 (AIA) 及有意向环境中引入改性活生物体",
       "questions": [
          {
             "key": "Q027",
             "section": "Articles7-10",
             "number": "27",
             "type": "option",
             "title": "贵国是否已为其所管辖的出口者规定了法律要求，在有意越境转移属于事先知情同意程序范围内的改性活生物体之前以书面形式通知进口缔约方的国家主管部门？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q028",
             "section": "Articles7-10",
             "number": "28",
             "type": "option",
             "title": "作为出口缔约方时，贵国是否已就出口者提供的通知中所载信息的准确性规定了法律要求？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                },
                {
                   "value": "false.notApplicable",
                   "title": "不适用（缔约方目前未出口改性活生物体）"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q029",
             "section": "Articles7-10",
             "number": "29",
             "type": "option",
             "title": "在本报告所述期间，贵国是否收到过有意向环境中引入改性活生物体的有意越境转移的相关通知？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第29个问题的回答为 <i>是</i> 那么，通知是否载有完整信息（至少载有《卡塔赫纳生物安全议定书》附件一具体规定的信息）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q031",
             "section": "Articles7-10",
             "number": "31",
             "type": "option",
             "title": "若您对第29个问题的回答为<i>是</i> 那么，贵国是否会在收到通知九十天之内向通知人确认收到该通知？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q032",
             "section": "Articles7-10",
             "number": "32",
             "type": "sub-section",
             "title": "若您对第29个问题的回答为 <i>是</i>那么，贵国是否向以下方面通报了本国的决定？",
             "multiple": false,
             "questions": [
                {
                   "key": "Q032_a",
                   "section": "Articles7-10",
                   "number": "a",
                   "type": "option",
                   "title": "通知人",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是，经常"
                      },
                      {
                         "value": "true.some",
                         "title": "仅在某些情况下"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q032_b",
                   "section": "Articles7-10",
                   "number": "b",
                   "type": "option",
                   "title": "生物安全信息交换所 （BCH）?",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是，经常"
                      },
                      {
                         "value": "true.some",
                         "title": "仅在某些情况下"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "在本报告所述期间，贵国是否针对关于有意向环境中引入改性活生物体的有意越境转移的通知作出决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第33个问题的回答为 <i>是</i> 那么，贵国已核准进口多少种有意向环境中引入的改性活生物体？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4种"
                },
                {
                   "value": "5+",
                   "title": "5 至 9种"
                },
                {
                   "value": "10+",
                   "title": "10种或以上"
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
             "title": "若您对 <i>第34个问题</i> 的回答为<i>已经核准了改性活生物体</i>，那么，已经核准的改性活生物体是否都已经实际进口至贵国？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q036",
             "section": "Articles7-10",
             "number": "36",
             "type": "option",
             "title": "如果您对第33个问题的回答为<i>是</i> ，那么，贵国以下类别决定所占的百分比是多少？（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
                   "title": "对改性活生物体准予无条件进口/使用",
                   "type": "int"
                },
                {
                   "value": "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
                   "title": "对改性活生物体准予有条件进口/使用",
                   "type": "int"
                },
                {
                   "value": "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
                   "title": "禁止进口/使用改性活生物体",
                   "type": "int"
                },
                {
                   "value": "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
                   "title": "要求提供更多相关资料",
                   "type": "int"
                },
                {
                   "value": "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
                   "title": "告知通知人延期通报决定",
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
             "title": "如果您对 <i>第36个问题</i> 的回答为贵国作出决定 <i>准予有条件进口</i> 或 <i>禁止进口</i>，贵国是否就其决定所依据的理由作出说明？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q038",
             "section": "Articles7-10",
             "number": "38",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第7至10条的更多细节，包括在对有意向环境中引入的改性活生物体的潜在不利影响没有科学上的把握时可能采取的措施",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article11",
       "title": "第 11 条 – 关于拟直接用作食品或饲料、或用于加工目的的改性活生物体的程序",
       "questions": [
          {
             "key": "Q039",
             "section": "Article11",
             "number": "39",
             "type": "option",
             "title": "贵国是否订有法律、条例或行政措施，用于对予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的国内用途（包括投放市场）作出决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q040",
             "section": "Article11",
             "number": "40",
             "type": "option",
             "title": "贵国是否就申请者所提供关于可能予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的国内用途（包括投放市场）之资料的准确性规定了法律要求？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q041",
             "section": "Article11",
             "number": "41",
             "type": "option",
             "title": "在本报告所述期间，贵国已就可能予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的 <u>国内用途</u>（包括市场投放）作出过多少项决定？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4项"
                },
                {
                   "value": "5+",
                   "title": "5 至 9项"
                },
                {
                   "value": "10+",
                   "title": "10项或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q042",
             "section": "Article11",
             "number": "42",
             "type": "option",
             "title": "贵国是否订有法律、条例或行政措施，用于对拟直接作食物或饲料或加工之用的改性活生物体的进口作出决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q043",
             "section": "Article11",
             "number": "43",
             "type": "option",
             "title": "在本报告所述期间，贵国已就拟直接作食物或饲料或加工之用的改性活生物体的 <u>进口</u>作出过多少项决定？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4项"
                },
                {
                   "value": "5+",
                   "title": "5 至 9项"
                },
                {
                   "value": "10+",
                   "title": "10项或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q044",
             "section": "Article11",
             "number": "44",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第11条的更多细节，包括在对可能予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的潜在不利影响没有科学上的把握性可能采取的措施",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article12",
       "title": "第 12 条 – 对决定的复审",
       "questions": [
          {
             "key": "Q045",
             "section": "Article12",
             "number": "45",
             "type": "option",
             "title": "贵国是否已建立了相关机制用于审查并更改其已就改性活生物体的有意越境转移所作出的决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q046",
             "section": "Article12",
             "number": "46",
             "type": "option",
             "title": "在本报告所述期间，贵国是否审查和/或更改过就改性活生物体的有意越境转移所作出的决定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第46个问题的回答为<i>是</i> ，那么，对多少项决定进行过审查和/或更改？",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 至 4项"
                },
                {
                   "value": "5+",
                   "title": "5 至 9项"
                },
                {
                   "value": "10+",
                   "title": "10项或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q048",
             "section": "Article12",
             "number": "48",
             "type": "option",
             "title": "若您对第46个问题的回答为 <i>是</i> ，那么，是否有因出口缔约方或通知人的要求而引发的审查？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第48个问题的回答为 <i>是</i> ，那么，贵国是否在九十天之内作出回复并说明决定的理由？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q050",
             "section": "Article12",
             "number": "50",
             "type": "option",
             "title": "若您对第46个问题的回答为 <i>是</i> ，那么，是否存在由贵国作为进口缔约方启动的审查？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第50个问题的回答为 <i>是</i> ，那么，贵国是否在三十天之内说明决定的理由并通报",
             "multiple": false,
             "questions": [
                {
                   "key": "Q051_a",
                   "section": "Article12",
                   "number": "a",
                   "type": "option",
                   "title": "通知人",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是，经常"
                      },
                      {
                         "value": "true.some",
                         "title": "仅在某些情况下"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q051_b",
                   "section": "Article12",
                   "number": "b",
                   "type": "option",
                   "title": "生物安全信息交换所",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是，经常"
                      },
                      {
                         "value": "true.some",
                         "title": "仅在某些情况下"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "您可以在此提供贵国执行第12条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article13",
       "title": "第 13 条 –  简化程序",
       "questions": [
          {
             "key": "Q053",
             "section": "Article13",
             "number": "53",
             "type": "option",
             "title": "贵国是否已就改性活生物体的有意越境转移简化程序建立了应用系统？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q054",
             "section": "Article13",
             "number": "54",
             "type": "option",
             "title": "在本报告所述期间，贵国是否已经应用该简化程序？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第54个问题的回答为 <i>是</i> ，那么，贵国对多少种改性活生物体适用了简化程序？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 5种"
                },
                {
                   "value": "5+",
                   "title": "5 种或 5 种以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q056",
             "section": "Article13",
             "number": "56",
             "type": "option",
             "title": "若您对第54个问题的回答为 <i>是</i> ，那么，贵国是否曾通过生物安全信息交换所向缔约方通报了适用该简化程序的相关案例？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q057",
             "section": "Article13",
             "number": "57",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第13条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article14",
       "title": "第 14 条 – 双边、区域及多边协定和安排",
       "questions": [
          {
             "key": "Q058",
             "section": "Article14",
             "number": "58",
             "type": "option",
             "title": "贵国与其他缔约方/非缔约方订立了多少项与生物安全相关的双边、区域或多边协定或安排？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4项"
                },
                {
                   "value": "5+",
                   "title": "5 至 9项"
                },
                {
                   "value": "10+",
                   "title": "10项或以上"
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
             "title": "若您对 <i>第58个问题</i> 的回答为 <i>订立了协定或安排</i>，请简要描述所订立协定或安排的范围和目标",
             "multiple": false,
             "mandatory": true
          },
          {
             "key": "Q060",
             "section": "Article14",
             "number": "60",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第14条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article15_16",
       "title": "第 15 和 16 条 – 风险评估和风险管理",
       "questions": [
          {
             "key": "Q061",
             "section": "Article15_16",
             "number": "61",
             "type": "option",
             "title": "贵国的国内监管框架是否要求对改性活生物体开展风险评估？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第61个问题的回答为<i>是</i> ，那么，该要求适用于哪些改性活生物体（请选择所有适用的改性活生物体）？",
             "multiple": true,
             "options": [
                {
                   "value": "014054D1-2B72-7ABD-E615-D0A374590A95",
                   "title": "进口有意向环境中引入的改性活生物体"
                },
                {
                   "value": "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
                   "title": "进口拟直接作食物或饲料或加工之用的改性活生物体"
                },
                {
                   "value": "29B97F6B-066E-BE64-0FA3-66060DEE737D",
                   "title": "关于可能予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的国内用途（包括市场投放）之决定"
                },
                {
                   "value": "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
                   "title": "进口用于封闭使用的改性活生物体"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
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
             "title": "贵国是否已经建立了机制用于在作出与改性活生物体相关的决定之前开展风险评估？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第63个问题的回答为 <i>是</i> ，那么，该机制是否包括对开展风险评估的本国专家的认定和培训程序？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "legend15_16",
             "section": "Article15_16",
             "number": "",
             "type": "legend",
             "title": "<i>风险评估或风险管理方面的能力建设</i>"
          },
          {
             "key": "Q065",
             "section": "Articles12",
             "number": "65",
             "type": "sub-section",
             "title": "在贵国有多少人接受了关于改性活生物体风险评估、风险管理和监测的相关培训？",
             "multiple": false,
             "questions": [
                {
                   "key": "Q065_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "风险评估",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "无"
                      },
                      {
                         "value": "1+",
                         "title": "1 至 9人"
                      },
                      {
                         "value": "10+",
                         "title": "10 至 49人"
                      },
                      {
                         "value": "50+",
                         "title": "50 至 99人"
                      },
                      {
                         "value": "100+",
                         "title": "100人或以上"
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
                   "title": "数量是否充足",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ]
                },
                {
                   "key": "Q065_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "风险管理",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "无"
                      },
                      {
                         "value": "1+",
                         "title": "1 至 9人"
                      },
                      {
                         "value": "10+",
                         "title": "10 至 49人"
                      },
                      {
                         "value": "50+",
                         "title": "50 至 99人"
                      },
                      {
                         "value": "100+",
                         "title": "100人或以上"
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
                   "title": "数量是否充足",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ]
                },
                {
                   "key": "Q065_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "监测",
                   "multiple": false,
                   "options": [
                      {
                         "value": "0",
                         "title": "无"
                      },
                      {
                         "value": "1+",
                         "title": "1 至 9人"
                      },
                      {
                         "value": "10+",
                         "title": "10 至 49人"
                      },
                      {
                         "value": "50+",
                         "title": "50 至 99人"
                      },
                      {
                         "value": "100+",
                         "title": "100人或以上"
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
                   "title": "数量是否充足",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "贵国是否在改性活生物体风险评估和风险管理培训中使用了培训材料和/或技术指导？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第66个问题的回答为 <i>是</i> ，那么，贵国在风险评估培训中是否使用了《改性活生物体风险评估手册》（由生物多样性公约秘书处编写）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q068",
             "section": "Article15_16",
             "number": "68",
             "type": "option",
             "title": "若您对第66个问题的回答为 <i>是</i> ，那么，贵国在风险评估培训中是否使用了《改性活生物体风险评估指南》（由风险评估和风险管理特设技术专家组网络论坛编写）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q069",
             "section": "Article15_16",
             "number": "69",
             "type": "option",
             "title": "贵国在改性活生物体风险评估的具体专题方面是否需要进一步的具体指导意见？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q070",
             "section": "Article15_16",
             "number": "70",
             "type": "sub-section",
             "title": "考虑到可能会对人类健康造成风险，贵国是否具有检测、识别、评估和/或监测可能对生物多样性的保护和可持续利用造成不利影响的改性活生物体或具体特性的能力？",
             "multiple": false,
             "questions": [
                {
                   "key": "Q070_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "检测",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ]
                },
                {
                   "key": "Q070_b",
                   "section": "Article15_16",
                   "number": "b",
                   "type": "option",
                   "title": "识别",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ]
                },
                {
                   "key": "Q070_c",
                   "section": "Article15_16",
                   "number": "c",
                   "type": "option",
                   "title": "评估风险",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
                      }
                   ]
                },
                {
                   "key": "Q070_d",
                   "section": "Article15_16",
                   "number": "d",
                   "type": "option",
                   "title": "监测",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "<i>开展风险评估或风险管理</i>"
          },
          {
             "key": "Q071",
             "section": "Article15_16",
             "number": "71",
             "type": "sub-section",
             "title": "贵国在开展风险评估或风险管理或者评估通知人提交的风险评估报告时是否采用或使用过任何指导性文件？",
             "multiple": false,
             "questions": [
                {
                   "key": "Q071_a",
                   "section": "Article15_16",
                   "number": "a",
                   "type": "option",
                   "title": "风险评估",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
                   "number": "b",
                   "type": "option",
                   "title": "风险管理",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "若您对第71个问题的回答为 <i>是</i> ，那么，贵国在开展风险评估或风险管理或者评估通知人提交的风险评估报告时是否使用了《改性活生物体风险评估指南》（由风险评估和风险管理特设技术专家组网络论坛编写）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q073",
             "section": "Article15_16",
             "number": "73",
             "type": "option",
             "title": "贵国在与其他国家一同开展风险评估时是否采用了通用办法或方法？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q074",
             "section": "Article15_16",
             "number": "74",
             "type": "option",
             "title": "贵国是否与其他缔约方进行合作，以期识别可能对生物多样性保护和可持续利用产生不利影响的改性活生物体或其具体特性？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q075",
             "section": "Article15_16",
             "number": "75",
             "type": "option",
             "title": "在本报告所述期间，贵国是否曾对改性活生物体开展过任何风险评估，包括针对改性活生物体开展的用于封闭使用、现场试验、商业目的、拟直接作食物或饲料或加工之用等类型的风险评估？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第75个问题的回答为 <i>是</i> ，那么，贵国已开展过多少次风险评估？",
             "multiple": false,
             "options": [
                {
                   "value": "1+",
                   "title": "1 至 9次"
                },
                {
                   "value": "10+",
                   "title": "10 至 49次"
                },
                {
                   "value": "50+",
                   "title": "50 至 99次"
                },
                {
                   "value": "100+",
                   "title": "100次或以上"
                }
             ]
          },
          {
             "key": "Q077",
             "section": "Article15_16",
             "number": "77",
             "type": "term",
             "title": "若您对第75个问题的回答为 <i>是</i> 那么，请指出这些风险评估的范围（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
                   "title": "用于封闭使用的改性活生物体（根据第3条）"
                },
                {
                   "value": "D6B59E8A-D82C-4516-917A-A745ACDA5931",
                   "title": "有意向环境中引入以进行实验测试或现场试验的改性活生物体"
                },
                {
                   "value": "015737FC-ABC2-460C-A099-06A1B01E649A",
                   "title": "出于商业目的有意向环境中引入的改性活生物体"
                },
                {
                   "value": "91BEAF12-ABE1-4294-AD3B-507935894C78",
                   "title": "拟直接用作食物的改性活生物体"
                },
                {
                   "value": "1D96153B-1625-44E4-AD5E-D26429044B29",
                   "title": "拟直接用作饲料的改性活生物体"
                },
                {
                   "value": "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
                   "title": "拟作加工之用的改性活生物体"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q078",
             "section": "Article15_16",
             "number": "78",
             "type": "option",
             "title": "若您对第75个问题的回答为<i>是</i> ，那么，是否针对关于有意向环境中引入的改性活生物体或者可能予以越境转移的拟直接作食物或饲料或加工之用的改性活生物体的国内用途（包括投放市场）的所有决定开展了风险评估？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q079",
             "section": "Article15_16",
             "number": "79",
             "type": "option",
             "title": "贵国是否已经建立了适当的机制、措施和战略以规范和管理在改性活生物体风险评估中识别的风险？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q080",
             "section": "Article15_16",
             "number": "80",
             "type": "option",
             "title": "贵国是否已采取了适当的措施以防止改性活生物体的无意越境转移，包括要求在首次释放改性活生物体之前开展风险评估等措施？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q081",
             "section": "Article15_16",
             "number": "81",
             "type": "option",
             "title": "贵国是否采取了措施来确保任何改性活生物体（无论是进口的还是本地研制的）在用作预期用途之前均接受与其生命周期或增代时间相应的适当期限的观察？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q082",
             "section": "Article15_16",
             "number": "82",
             "type": "option",
             "title": "贵国是否建立了相关机制来监测释放至环境中的改性活生物体的潜在影响？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q083",
             "section": "Article15_16",
             "number": "83",
             "type": "option",
             "title": "贵国是否具有监测或管理改性活生物体的必要基础设施（例如实验室设施）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q084",
             "section": "Article15_16",
             "number": "84",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第15和第16条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article17",
       "title": "第17条——无意中造成的越境转移<sup>2</sup>  和应急措施",
       "footnote": "<sup>2</sup> 根据第CP-VIII/16号决定通过的工作定义，“‘无意中造成的越境转移’指的是无意中跨越了某个缔约方的国界，造成改性活生物体释放的越境转移。只有在所涉改性活生物体可能对生物多样性的保护和可持续利用产生重大有害影响的情况下，才对此种越境转移适用《议定书》第17条的规定，同时顾及受影响或可能受影响国家的人类健康风险”。",
       "questions": [
          {
             "key": "Q085",
             "section": "Article17",
             "number": "85",
             "type": "option",
             "title": "贵国是否已经建立措施，在其管辖范围内发生的某一释放将会导致或可能导致无意造成的越境转移时，向受到影响或可能会受到影响的国家、生物安全信息交换所并酌情向有关的国际组织发出通知？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q086",
             "section": "Article17",
             "number": "86",
             "type": "option",
             "title": "在本报告所述期间，在贵国管辖范围内发生了多少次导致或可能会导致无意越境转移的改性活生物体释放？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4次"
                },
                {
                   "value": "5+",
                   "title": "5 至 9次"
                },
                {
                   "value": "10+",
                   "title": "10次或以上"
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
             "title": "若您对 <i>第86个问题</i> 的回答为 <i>发生了释放</i>，那么，贵国是否通知了受到影响或可能会受到影响的国家、生物安全信息交换所并酌情通知有关国际组织？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q088",
             "section": "Article17",
             "number": "88",
             "type": "option",
             "title": "贵国是否有能力采取适当措施应对无意越境转移？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q089",
             "section": "Article17",
             "number": "89",
             "type": "option",
             "title": "在本报告所述期间，贵国多少次意识到无意越境转移进入其领土？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4次"
                },
                {
                   "value": "5+",
                   "title": "5 至 9次"
                },
                {
                   "value": "10+",
                   "title": "10次或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q090",
             "section": "Article17",
             "number": "90",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第17条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article18",
       "title": "第 18 条 – 处理、运输、包装和标志",
       "questions": [
          {
             "key": "Q091",
             "section": "Article18",
             "number": "91",
             "type": "option",
             "title": "贵国是否参照有关国际规则和标准，采取措施要求在安全的条件下处理、包装和运输<i>属于拟越境转移的改性活生物体</i> ？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "贵国是否采取措施要求拟直接作食物或饲料或加工之用的改性活生物体所附单据，在 <i>改性活生物体名称 <u>无法获知的情况下</u></i>明确说明其中 <i>可能含有改性活生物体</i> 且不打算有意将其引入环境，并附上供进一步获取信息的联络点？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "贵国是否采取措施要求拟直接作食物或饲料或加工之用的改性活生物体所附单据，在 <i>改性活生物体名称 <u>获知的情况下</u></i>明确说明其中 <i>含有改性活生物体</i> 且不打算有意将其引入环境，并附上供进一步获取信息的联络点？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第91、92和/或93个问题的回答为 <i>是</i> ，那么，贵国要求改性活生物体须附有哪些单据？",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "专门的改性活生物体单据"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "作为其他单据的一部分（并非专门的改性活生物体的）"
                },
                {
                   "value": "other",
                   "title": "其他",
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
             "title": "贵国是否采取措施要求 <i>预定用于封闭使用的改性活生物体</i> 所附单据明确将其标明为 <i>改性活生物体</i> ，并具体说明安全处理、储存、运输和使用的任何要求，以及供进一步索取信息的联络点（包括接收改性活生物体的个人和机构名称和地址）？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第95个问题的回答为 <i>是</i> ，那么，贵国要求哪些类别的识别预定用于封闭使用的改性活生物体的单据？",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "专门的改性活生物体单据"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "作为其他单据的一部分（并非专门的改性活生物体的）"
                },
                {
                   "value": "other",
                   "title": "其他",
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
             "title": "贵国是否采取措施要求 <i>有意向进口缔约方环境中引入的改性活生物体</i> 所附单据明确将其标明为 <i>改性活生物体</i>；具体说明其名称和相关特性和/或特点、关于安全处理、储存、运输和使用的任何要求以及供进一步索取信息的联络点，并酌情提供进口者和出口者名称和地址；以及列出关于所涉转移符合本《议定书》中适用于出口者的规定的声明？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第97个问题的回答为 <i>是</i> ，那么，贵国要求哪些类别的识别有意引入环境的改性活生物体的单据？",
             "multiple": false,
             "options": [
                {
                   "value": "lmoSpecific",
                   "title": "专门的改性活生物体单据"
                },
                {
                   "value": "nonLmoSpecific",
                   "title": "作为其他单据的一部分（并非专门的改性活生物体的）"
                },
                {
                   "value": "other",
                   "title": "其他",
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
             "title": "贵国是否具有可用的指南来确保改性活生物体的安全处理、运输和包装？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q100",
             "section": "Article18",
             "number": "100",
             "type": "option",
             "title": "贵国是否有能力实施改性活生物体识别和单据方面的要求？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q101",
             "section": "Article18",
             "number": "101",
             "type": "option",
             "title": "贵国有多少名海关人员接受过识别改性活生物体的培训？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 9人"
                },
                {
                   "value": "10+",
                   "title": "10 至 49人"
                },
                {
                   "value": "50+",
                   "title": "50 至 99人"
                },
                {
                   "value": "100+",
                   "title": "100人或以上"
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
             "title": "数量是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q102",
             "section": "Article18",
             "number": "102",
             "type": "option",
             "title": "贵国是否建立了改性活生物体的采样和检测程序？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q103",
             "section": "Article18",
             "number": "103",
             "type": "option",
             "title": "贵国有多少名实验室人员接受过检测改性活生物体的培训？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 9人"
                },
                {
                   "value": "10+",
                   "title": "10 至 49人"
                },
                {
                   "value": "50+",
                   "title": "50 至 99人"
                },
                {
                   "value": "100+",
                   "title": "100人或以上"
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
             "title": "数量是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q104",
             "section": "Article18",
             "number": "104",
             "type": "option",
             "title": "贵国是否拥有用于改性活生物体检测之实验室设施的可靠使用权？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q105",
             "section": "Article18",
             "number": "105",
             "type": "option",
             "title": "贵国有多少个实验室具有检测改性活生物体的资格？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4个"
                },
                {
                   "value": "5+",
                   "title": "5 至 9个"
                },
                {
                   "value": "10+",
                   "title": "10 至 49个"
                },
                {
                   "value": "50+",
                   "title": "50个或以上"
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
             "title": "若您对 <i>第105个问题</i> 的回答为 <i>贵国拥有具有资格的实验室</i>，那么，其中有多少个实验室目前正在进行改性活生物体检测？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4个"
                },
                {
                   "value": "5+",
                   "title": "5 至 9个"
                },
                {
                   "value": "10+",
                   "title": "10 至 49个"
                },
                {
                   "value": "50+",
                   "title": "50个或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q107",
             "section": "Article18",
             "number": "107",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第18条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article19",
       "title": "第 19 条 – 国家主管部门和国家联络点",
       "questions": [
          {
             "key": "Q108",
             "section": "Article19",
             "number": "108",
             "type": "option",
             "title": "如果贵国已指定了一个以上的国家主管部门，那么，贵国是否已经建立相关机制以在就改性活生物体作出决定之前对所述主管部门的行动进行协调？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                },
                {
                   "value": "false.noCna",
                   "title": "不适用（未指定国家主管部门）"
                },
                {
                   "value": "false.oneCna",
                   "title": "不适用（只指定了一个国家主管部门）"
                }
             ]
          },
          {
             "key": "Q109",
             "section": "Article19",
             "number": "109",
             "type": "option",
             "title": "贵国是否已建立充分的体制能力，使国家主管部门能够执行《卡塔赫纳生物安全议定书》所要求的行政职能？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q110",
             "section": "Article19",
             "number": "110",
             "type": "option",
             "title": "贵国是否已采取举措加强国家联络点、国家主管部门以及与生物安全事务相关的其他机构之间的协作？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q111",
             "section": "Article19",
             "number": "111",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第19条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article20",
       "title": "第 20 条 – 信息共享与生物安全信息交换所（BCH）",
       "questions": [
          {
             "key": "Q112",
             "section": "Article20",
             "number": "112",
             "type": "sub-section",
             "title": "请概述贵国向生物安全信息交换所提供规定信息的情况，具体说明各类信息是否存在、是否已向生物安全信息交换所提交。",
             "questions": [
                {
                   "key": "Q112_a",
                   "section": "Article20",
                   "number": "a",
                   "type": "option",
                   "title": "用于执行《议定书》的现有的国家立法、条例和准则，以及缔约方用于事先知情同意程序所需要的信息（第 20 条第 3(a) 款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_b",
                   "section": "Article20",
                   "number": "b",
                   "type": "option",
                   "title": "适用于拟直接作食物或饲料或加工之用的进口改性活生物体的立法、条例和准则（第11条第5款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_c",
                   "section": "Article20",
                   "number": "c",
                   "type": "option",
                   "title": "双边、多边及区域协议和安排（第14条第2款和第20条第3（b）款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_d",
                   "section": "Article20",
                   "number": "d",
                   "type": "option",
                   "title": "国家主管部门（第 19 条第 2 和 3 款）和国家联络点（第 19 条第 1 和 3 款）的详细联系方式以及紧急联系方式（第 17 条第 3(e) 款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_e",
                   "section": "Article20",
                   "number": "e",
                   "type": "option",
                   "title": "某一缔约方对改性活生物体的过境所作的决定（第6条第1款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_f",
                   "section": "Article20",
                   "number": "f",
                   "type": "option",
                   "title": "某一缔约方对进口用于封闭使用的改性活生物体所作的决定（第6条第2款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_g",
                   "section": "Article20",
                   "number": "g",
                   "type": "option",
                   "title": "关于在贵国管辖范围内发生的释放将会导致或可能导致改性活生物体的无意越境转移，从而可能对生物多样性造成重大不利影响的通知（第17条第1款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_h",
                   "section": "Article20",
                   "number": "h",
                   "type": "option",
                   "title": "关于改性活生物体的非法越境转移的案例信息（第25条第3款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_i",
                   "section": "Article20",
                   "number": "i",
                   "type": "option",
                   "title": "关于进口有意向环境中引入的改性活生物体的决定（第10条第3款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_j",
                   "section": "Article20",
                   "number": "j",
                   "type": "option",
                   "title": "关于特定改性活生物体进口时国内条例适用性的信息（第 14 条第 4 款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_k",
                   "section": "Article20",
                   "number": "k",
                   "type": "option",
                   "title": "关于在国内使用可能属于越境转移的拟直接作食物或饲料或加工之用的改性活生物体的决定（第11条第1款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_l",
                   "section": "Article20",
                   "number": "l",
                   "type": "option",
                   "title": "关于在国内监管框架下（第11条第4款）或按照《议定书》附件三（第11条第6款）进口拟直接作食物或饲料或加工之用的改性活生物体的决定",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_m",
                   "section": "Article20",
                   "number": "m",
                   "type": "option",
                   "title": "关于针对拟直接作食物或饲料或加工之用的改性活生物体所采用的相关框架的声明（第11条第6款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_n",
                   "section": "Article20",
                   "number": "n",
                   "type": "option",
                   "title": "关于改性活生物体有意越境转移的决定的审查和更改（第12条第1款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_o",
                   "section": "Article20",
                   "number": "o",
                   "type": "option",
                   "title": "可能在通知进口缔约方的同时发生的有意越境转移案例（第 13 条第 1（a）款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_p",
                   "section": "Article20",
                   "number": "p",
                   "type": "option",
                   "title": "由各缔约方赋予豁免权的改性活生物体（第 13 条第 1（b）款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
                      }
                   ],
                   "mandatory": true
                },
                {
                   "key": "Q112_q",
                   "section": "Article20",
                   "number": "q",
                   "type": "option",
                   "title": "在监管过程中产生的改性活生物体风险评估或环境审查以及有关产品相关信息的概述（第20条第3（c）款）",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true.availableOnBch",
                         "title": "有信息且已向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availableNotOnBch",
                         "title": "有信息但尚未向生物安全信息交换所提交"
                      },
                      {
                         "value": "true.availablePartialyOnBch",
                         "title": "有信息但只向生物安全信息交换所提交了一部分"
                      },
                      {
                         "value": "false.notAvailable",
                         "title": "没有信息"
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
             "title": "若您对第112个问题中任何一项的回答为有信息<i>但尚未向生物安全信息交换所提交或只向生物安全信息交换所提交了一部分</i> ，请简要说明",
             "multiple": false
          },
          {
             "key": "Q114",
             "section": "Article20",
             "number": "114",
             "type": "option",
             "title": "贵国是否已建立相关机制以强化生物安全信息交换所国家联络点履行其行政职能的能力？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q115",
             "section": "Article20",
             "number": "115",
             "type": "option",
             "title": "贵国是否已建立相关机制以协调生物安全信息交换所国家联络点、《卡塔赫纳生物安全议定书》联络点以及国家主管部门以便向生物安全信息交换所提供信息？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q116",
             "section": "Article20",
             "number": "116",
             "type": "option",
             "title": "贵国是否在改性活生物体的决策过程中使用了向生物安全信息交换所提供的信息？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "是，有时"
                },
                {
                   "value": "false",
                   "title": "否"
                },
                {
                   "value": "false.na",
                   "title": "不适用（没有作出决定）"
                }
             ]
          },
          {
             "key": "Q117",
             "section": "Article20",
             "number": "117",
             "type": "option",
             "title": "贵国是否在访问和使用生物安全信息交换所方面遇到过困难？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q118",
             "section": "Article20",
             "number": "118",
             "type": "option",
             "title": "在本报告所述期间，贵国组织了多少次与生物多样性相关的活动（例如专题研讨会、讲习班、新闻发布会、教育活动）？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4次"
                },
                {
                   "value": "5+",
                   "title": "5 至 9次"
                },
                {
                   "value": "10+",
                   "title": "10 至 24次"
                },
                {
                   "value": "25+",
                   "title": "25次或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q119",
             "section": "Article20",
             "number": "119",
             "type": "option",
             "title": "在本报告所述期间，贵国出版了多少份与生物多样性相关的出版物？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 9份"
                },
                {
                   "value": "10+",
                   "title": "10 至 49份"
                },
                {
                   "value": "50+",
                   "title": "50 至 99份"
                },
                {
                   "value": "100+",
                   "title": "100份或以上"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q120",
             "section": "Article20",
             "number": "120",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第20条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article21",
       "title": "第 21 条 – 机密资料",
       "questions": [
          {
             "key": "Q121",
             "section": "Article21",
             "number": "121",
             "type": "option",
             "title": "贵国是否制定了相关程序来对《议定书》下所获得的机密资料予以保护？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q122",
             "section": "Article21",
             "number": "122",
             "type": "option",
             "title": "贵国是否允许通知人确认哪些资料将被视为机密资料？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q123",
             "section": "Article21",
             "number": "123",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第21条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article22",
       "title": "第22条——能力建设",
       "questions": [
          {
             "key": "Q124",
             "section": "Article22",
             "number": "124",
             "type": "option",
             "title": "贵国是否拥有可预见和可靠的资金来进行能力建设以有效实施《议定书》？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q125",
             "section": "Article22",
             "number": "125",
             "type": "option",
             "title": "贵国是否在开发和/或加强生物安全人力资源和机构能力方面得到了外部支持，或受益于与其他缔约方的共同行动？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第125个问题的回答为 <i>是</i> ，那么，贵国是如何提供这些资源的？（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "双边渠道"
                },
                {
                   "value": "channels.regional",
                   "title": "区域渠道"
                },
                {
                   "value": "channels.multilateral",
                   "title": "多边渠道"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q127",
             "section": "Article22",
             "number": "127",
             "type": "option",
             "title": "贵国是否在开发和/或加强生物安全人力资源和机构能力方面向其他缔约方提供了支持？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第127个问题的回答为 <i>是</i> ，那么，贵国是如何提供这些资源的？（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "channels.bilateral",
                   "title": "双边渠道"
                },
                {
                   "value": "channels.regional",
                   "title": "区域渠道"
                },
                {
                   "value": "channels.multilateral",
                   "title": "多边渠道"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q129",
             "section": "Article22",
             "number": "129",
             "type": "option",
             "title": "在本报告所述期间，贵国是否启动过任何程序来获得全球环境基金（全环基金）的资金以开展生物安全方面的能力建设？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第129个问题的回答为 <i>是</i> ，您如何描述这一程序？",
             "multiple": false,
             "options": [
                {
                   "value": "veryEasy",
                   "title": "很容易"
                },
                {
                   "value": "easy",
                   "title": "容易"
                },
                {
                   "value": "average",
                   "title": "一般"
                },
                {
                   "value": "difficult",
                   "title": "困难"
                },
                {
                   "value": "veryDifficult",
                   "title": "很困难"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q131",
             "section": "Article22",
             "number": "131",
             "type": "term",
             "title": "在本报告所述期间内，贵国是否采取行动发展和/或加强生物安全人力资源和机构能力？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第131个问题的回答为 <i>是</i> ，那么，在下列哪些领域开展了此类行动（请选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "机构能力和人力资源"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "将生物安全纳入跨部门和部门立法、政策及机构（将生物安全纳入主流）"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "风险评估及其他科学技术专业知识"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "风险管理"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "生物安全方面的公众认识、参与和教育"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "信息交换和数据管理，包括参与生物安全信息交换所的活动"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "在次区域、区域和国际层次上的科学、技术和机构合作"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "技术转让"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "改性活生物体的识别，包括其检测"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "社会经济因素"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "执行《议定书》第18.2条的单据要求"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "机密资料的处理 "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "改性活生物体无意和/或非法越境转移的应对措施"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "与改性活生物体相关的科学生物安全研究"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "考虑对人类健康的风险"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "赔偿责任和补救"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
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
             "title": "在本报告所述期间，贵国是否开展过一次能力建设需求评估？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q134",
             "section": "Article22",
             "number": "134",
             "type": "option",
             "title": "贵国是否仍有能力建设方面的需求？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第134个问题的回答为 <i>是</i> ，那么，下列哪些领域仍需要能力建设（请选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "BB3CA716-E122-4445-9FAD-9F6B440363BD",
                   "title": "机构能力和人力资源"
                },
                {
                   "value": "68250AA6-75F1-470D-A8E7-85ECDF703D00",
                   "title": "将生物安全纳入跨部门和部门立法、政策及机构（将生物安全纳入主流）"
                },
                {
                   "value": "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
                   "title": "风险评估及其他科学技术专业知识"
                },
                {
                   "value": "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
                   "title": "风险管理"
                },
                {
                   "value": "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
                   "title": "生物安全方面的公众认识、参与和教育"
                },
                {
                   "value": "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
                   "title": "信息交换和数据管理，包括参与生物安全信息交换所的活动"
                },
                {
                   "value": "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
                   "title": "在次区域、区域和国际层次上的科学、技术和机构合作"
                },
                {
                   "value": "6F6C058C-6741-4878-A448-AE56299821A8",
                   "title": "技术转让"
                },
                {
                   "value": "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
                   "title": "改性活生物体的采样、检测和识别"
                },
                {
                   "value": "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
                   "title": "社会经济因素"
                },
                {
                   "value": "A16727EE-FE61-43FF-8530-35A9C7261247",
                   "title": "执行关于处理、运输、包装和标志的单据要求"
                },
                {
                   "value": "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
                   "title": "机密资料的处理 "
                },
                {
                   "value": "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
                   "title": "改性活生物体无意和/或非法越境转移的应对措施"
                },
                {
                   "value": "09063980-88D9-4826-9F54-CB3EAC36641A",
                   "title": "与改性活生物体相关的科学生物安全研究"
                },
                {
                   "value": "799CD9B1-4571-4C2A-A459-F78E004D7F32",
                   "title": "考虑对人类健康的风险"
                },
                {
                   "value": "667CD9B1-4571-4C2A-A459-F78E004D7D96",
                   "title": "赔偿责任和补救"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
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
             "title": "贵国是否已制定有能力建设战略或行动计划？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q137",
             "section": "Article22",
             "number": "137",
             "type": "option",
             "title": "贵国是否已拥有功能性的国家机制来协调生物安全方面的能力建设举措？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q138",
             "section": "Article22",
             "number": "138",
             "type": "lstring",
             "title": "138.\t您可以在此提供贵国执行第22条（包括贵国获得全球环境基金资金的经验）的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article23",
       "title": "第 23 条 – 公众意识和参与",
       "questions": [
          {
             "key": "Q139",
             "section": "Article23",
             "number": "139",
             "type": "option",
             "title": "贵国的立法或政策是否涉及生物安全方面的公众意识、教育和参与？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q140",
             "section": "Article23",
             "number": "140",
             "type": "option",
             "title": "在本报告所述期间，贵国是否在公众意识、教育和参与方面与其他国家或国际机构合作过？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q141",
             "section": "Article23",
             "number": "141",
             "type": "option",
             "title": "贵国是否已建立了机制以确保公众获得关于改性活生物体的信息？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q142",
             "section": "Article23",
             "number": "142",
             "type": "option",
             "title": "贵国是否已出台关于生物安全问题的国家沟通战略？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q143",
             "section": "Article23",
             "number": "143",
             "type": "option",
             "title": "贵国是否拥有任何关于生物安全的意识和推广方案？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q144",
             "section": "Article23",
             "number": "144",
             "type": "option",
             "title": "贵国目前是否拥有国家生物安全网站？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q145",
             "section": "Article23",
             "number": "145",
             "type": "option",
             "title": "贵国有多少个学术机构正在提供生物安全教育和培训课程和方案？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4个"
                },
                {
                   "value": "5+",
                   "title": "5 至 9个"
                },
                {
                   "value": "10+",
                   "title": "10个或以上"
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
             "title": "人数是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q146",
             "section": "Article23",
             "number": "146",
             "type": "option",
             "title": "贵国有多少个公众可用和可访问的教育资料和/或在线模块？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4个"
                },
                {
                   "value": "5+",
                   "title": "5 至 9个"
                },
                {
                   "value": "10+",
                   "title": "10 至 24个"
                },
                {
                   "value": "25+",
                   "title": "25 至 99个"
                },
                {
                   "value": "100+",
                   "title": "100个或以上"
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
             "title": "数量是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q147",
             "section": "Article23",
             "number": "147",
             "type": "option",
             "title": "贵国是否已建立了机制以在关于改性活生物体的决策过程中征求公众的意见？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q148",
             "section": "Article23",
             "number": "148",
             "type": "option",
             "title": "贵国是否向公众通报了公众参与改性活生物体相关决策过程的现有方式？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第148个问题的回答为 <i>是</i> ，那么，请指出向公众进行通报所用的方式：（请选择所有适用项）",
             "multiple": true,
             "options": [
                {
                   "value": "4E205CD9-9958-497F-A760-F8321771AB3A",
                   "title": "国家网站"
                },
                {
                   "value": "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
                   "title": "报纸"
                },
                {
                   "value": "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
                   "title": "论坛"
                },
                {
                   "value": "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
                   "title": "通讯名单"
                },
                {
                   "value": "51792A07-B3C0-4F7B-830E-0741635F57BB",
                   "title": "公众听证会"
                },
                {
                   "value": "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
                   "title": "社交媒体"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
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
             "title": "在本报告所述期间，贵国有过几次在关于改性活生物体的决策过程中征求公众的意见？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无（不征求意见即作出决定）"
                },
                {
                   "value": "1+",
                   "title": "1 至 4次"
                },
                {
                   "value": "5+",
                   "title": "5 次或 5 次以上"
                },
                {
                   "value": "na",
                   "title": "不适用（没有作出决定）"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q151",
             "section": "Article23",
             "number": "151",
             "type": "option",
             "title": "贵国是否向公众通报了获得生物安全信息交换所信息的方式？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q152",
             "section": "Article23",
             "number": "152",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第23条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article24",
       "title": "第 24 条 – 非缔约方",
       "questions": [
          {
             "key": "Q153",
             "section": "Article24",
             "number": "153",
             "type": "option",
             "title": "贵国是否已与非缔约方就改性活生物体的越境转移问题订立有任何双边、区域及多边协定？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q154",
             "section": "Article24",
             "number": "154",
             "type": "option",
             "title": "在本报告所述期间，贵国是否从某非缔约方进口改性活生物体？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "在本报告所述期间，贵国是否向某非缔约方出口改性活生物体？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第154和/或155个问题的回答为 <i>是</i> ，那么，这些改性活生物体的越境转移是否符合《卡塔赫纳生物安全议定书》的目标？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q157",
             "section": "Article24",
             "number": "157",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第24条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article25",
       "title": "第25条——非法越境转移<sup>3</sup>",
       "footnote": "<sup>3</sup>根据第CP-VIII/16号决定通过的工作定义，“‘非法越境转移’指的是违反有关缔约方为执行《议定书》而采取的国内措施进行的改性活生物体越境转移”。",
       "questions": [
          {
             "key": "Q158",
             "section": "Article25",
             "number": "158",
             "type": "option",
             "title": "贵国是否已在国内采取适当措施，以便防止和/或惩处违反其执行《卡塔赫纳议定书》的国内措施而进行的改性活生物体越境转移？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某种程度上",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q159",
             "section": "Article25",
             "number": "159",
             "type": "option",
             "title": "在本报告所述期间，贵国多少次获悉改性活生物体非法越境转移案件？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4次"
                },
                {
                   "value": "5+",
                   "title": "5 至 9次"
                },
                {
                   "value": "10+",
                   "title": "10次或以上"
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
             "title": "若您对 <i>第159问题</i> 的回答为 <i>贵国获悉非法越境转移案件</i>，那么，贵国是否确定了改性活生物体的来源？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "true.some",
                   "title": "是，某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q161",
             "section": "Article25",
             "number": "161",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第25条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article26",
       "title": "第26条——社会-经济因素",
       "questions": [
          {
             "key": "Q162",
             "section": "Article26",
             "number": "162",
             "type": "option",
             "title": "贵国是否在促进如何将改性活生物体之社会经济影响纳入决策制定过程方面拥有一些特定方法或要求？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q163",
             "section": "Article26",
             "number": "163",
             "type": "option",
             "title": "在本报告所述期间，贵国是否在决策过程中考虑到了改性活生物体造成的社会经济影响？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是，经常"
                },
                {
                   "value": "true.some",
                   "title": "仅在某些情况下"
                },
                {
                   "value": "false",
                   "title": "否"
                },
                {
                   "value": "false.na",
                   "title": "不适用（没有作出决定）"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q164",
             "section": "Article26",
             "number": "164",
             "type": "option",
             "title": "贵国在说明或决定与社会经济影响相关的国家行动中使用了多少份经同行评议的已公布资料？",
             "multiple": false,
             "options": [
                {
                   "value": "0",
                   "title": "无"
                },
                {
                   "value": "1+",
                   "title": "1 至 4份"
                },
                {
                   "value": "5+",
                   "title": "5 至 9份"
                },
                {
                   "value": "10+",
                   "title": "10 至 49份"
                },
                {
                   "value": "50+",
                   "title": "50份或以上"
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
             "title": "数量是否充足",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q165",
             "section": "Article26",
             "number": "165",
             "type": "option",
             "title": "贵国是否就改性活生物体的任何社会经济影响与其他缔约方开展合作研究和信息交流？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q166",
             "section": "Article26",
             "number": "166",
             "type": "lstring",
             "title": "您可以在此提供贵国执行第26条的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "Article28",
       "title": "第 28 条 – 财务机制和财政资源",
       "questions": [
          {
             "key": "Q167",
             "section": "Article28",
             "number": "167",
             "type": "option",
             "title": "167.\t在本报告所述期间，贵国除常规国家预算拨款外，动用了多少（美元等值资金来支持《卡塔赫纳议定书》的执行？",
             "multiple": false,
             "options": [
                {
                   "value": "USD0",
                   "title": "无"
                },
                {
                   "value": "USD1-4999",
                   "title": "1至4,999美元"
                },
                {
                   "value": "USD5000-49999",
                   "title": "5,000至49,999美元"
                },
                {
                   "value": "USD50000-99999",
                   "title": "50,000至99,999美元"
                },
                {
                   "value": "USD100000-499000",
                   "title": "100,000至499,000美元"
                },
                {
                   "value": "USD500000+",
                   "title": "500,000 美元或以上"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "Article33",
       "title": "第 33 条 – 监测与汇报",
       "description": "<i>第33条要求缔约方对《卡塔赫纳议定书》为之规定的 <u>各项义务的履行情况</u> 进行监测，并就其为履行《卡塔赫纳议定书》所采取的措施向作为本议定书缔约方会议的缔约方大会作出汇报</i>",
       "questions": [
          {
             "key": "Q168",
             "section": "Article33",
             "number": "168",
             "type": "option",
             "title": "贵国是否启动了监测和强制执行《卡塔赫纳议定书》的系统？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          }
       ]
    },
    {
       "key": "LiabilityRedress",
       "title": "赔偿责任和补救名古屋-吉隆坡补充议定书",
       "description": "<i>也邀请非补充议定书缔约方的卡塔赫纳议定书缔约方答复下列问题</i>",
       "questions": [
          {
             "key": "Q169",
             "section": "LiabilityRedress",
             "number": "169",
             "type": "option",
             "title": "贵国是否为《赔偿责任和补救问题名古屋－吉隆坡补充议定书》缔约方？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第169个问题的回答为 <i>否</i> ，那么，贵国是否启动了成为《补充议定书》缔约方的任何国家进程？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ],
             "mandatory": true
          },
          {
             "key": "Q171",
             "section": "LiabilityRedress",
             "number": "171",
             "type": "term",
             "title": "贵国是否采取了执行《补充议定书》的必要措施？",
             "multiple": false,
             "options": [
                {
                   "value": "74B17D51-786F-3D68-3B76-A50121842925",
                   "title": "全面采取了国家措施"
                },
                {
                   "value": "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
                   "title": "部分采取了国家措施"
                },
                {
                   "value": "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
                   "title": "仅采取了临时措施"
                },
                {
                   "value": "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
                   "title": "仅有措施草案"
                },
                {
                   "value": "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
                   "title": "未采取任何措施"
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
             "title": "为执行《补充议定书》出台了哪些文书？",
             "multiple": false,
             "options": [
                {
                   "value": "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
                   "title": "一项或更多项国家法律",
                   "type": "lstring"
                },
                {
                   "value": "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
                   "title": "一项或更多项国家条例",
                   "type": "lstring"
                },
                {
                   "value": "BA743C79-B202-4611-16C4-2C7D4678ACEB",
                   "title": "一套或更多套准则",
                   "type": "lstring"
                },
                {
                   "value": "9067DB5B-E33B-655D-83A3-32D4D562618F",
                   "title": "未出台任何文书"
                }
             ]
          },
          {
             "key": "Q173",
             "section": "LiabilityRedress",
             "number": "173",
             "type": "sub-section",
             "title": "贵国是否已有行政或法律文书要求在以下情况下采取应对措施",
             "multiple": false,
             "questions": [
                {
                   "key": "Q173_a",
                   "section": "LiabilityRedress",
                   "number": "a",
                   "type": "option",
                   "title": "改性活生物体造成损害时？",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
                   "number": "b",
                   "type": "option",
                   "title": "如不采取应对措施非常有可能造成损害时？",
                   "multiple": false,
                   "options": [
                      {
                         "value": "true",
                         "title": "是"
                      },
                      {
                         "value": "false",
                         "title": "否"
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
             "title": "若您对173a个的回答为 <i>是</i> ，那么，这些文书是否对经营人提出要求（请选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "true.inform",
                   "title": "是，经营人必须告知主管部门损害情况"
                },
                {
                   "value": "true.evaluate",
                   "title": "是，经营人必须对损害作出评价"
                },
                {
                   "value": "true.response",
                   "title": "是，经营人必须采取应对措施"
                },
                {
                   "value": "true.other",
                   "title": "是，其他要求",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q175",
             "section": "LiabilityRedress",
             "number": "175",
             "type": "option",
             "title": "若您对173a的回答为 <i>是</i> ，那么，这些文书是否要求经营人采取应对措施以避免损害？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q176",
             "section": "LiabilityRedress",
             "number": "176",
             "type": "option",
             "title": "若您对173a或173b的回答为 <i>是</i> ，那么，这些文书是否提供了“经营人”的定义？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第176个问题的回答为 <i>是</i> ，那么，下列选项中哪些可能是“经营人”（请选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "8F627A99-7CD4-D892-80EA-12C58607508F",
                   "title": "许可证持有者"
                },
                {
                   "value": "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
                   "title": "将改性活生物体投放市场者"
                },
                {
                   "value": "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
                   "title": "开发者"
                },
                {
                   "value": "ADEF00D6-0901-8750-1069-5CBA877011CC",
                   "title": "生产者"
                },
                {
                   "value": "3F54E971-E791-FE00-5312-F7FF07C818B1",
                   "title": "通知人"
                },
                {
                   "value": "2D8B29DD-0703-6130-BE79-389F5278C21D",
                   "title": "出口者"
                },
                {
                   "value": "D475D239-517E-9D8B-E1F9-4C453039C792",
                   "title": "进口者"
                },
                {
                   "value": "8BD75295-88DF-2A32-A150-1132670E19A9",
                   "title": "承运人"
                },
                {
                   "value": "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
                   "title": "供应者"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q178",
             "section": "LiabilityRedress",
             "number": "178",
             "type": "option",
             "title": "是否已确定了履行《补充议定书》所列职能的主管部门？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第178个问题的回答为 <i>是</i> ，那么，主管部门有可能采取什么措施（选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
                   "title": "查明造成损害的经营人"
                },
                {
                   "value": "6065EDB8-C5A4-BA81-5271-B2F93159A471",
                   "title": "对损害作出评价"
                },
                {
                   "value": "A038303D-7049-E34F-8381-5B59702BBCF6",
                   "title": "确定将由经营人采取的应对措施"
                },
                {
                   "value": "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
                   "title": "落实应对措施"
                },
                {
                   "value": "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
                   "title": "向经营人追回对损害作出评价和落实任何应对措施产生的费用和开支"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q180",
             "section": "LiabilityRedress",
             "number": "180",
             "type": "option",
             "title": "贵国是否启动了向改性活生物体造成的损害提供财政担保的措施？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第180个问题的回答为 <i>是</i> ，那么，贵国拥有哪些类别的财政担保措施（选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
                   "title": "要求提供资金来源可靠的证据"
                },
                {
                   "value": "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
                   "title": "强制保险"
                },
                {
                   "value": "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
                   "title": "包括基金在内的政府计划"
                },
                {
                   "value": "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
                   "title": "其他",
                   "type": "lstring"
                }
             ]
          },
          {
             "key": "Q182",
             "section": "LiabilityRedress",
             "number": "182",
             "type": "term",
             "title": "贵国是否针对改性活生物体造成的损害规定了民事赔偿责任的规则和程序，或者曾在法院裁决中承认此类损害（选择所有适用项）？",
             "multiple": true,
             "options": [
                {
                   "value": "878DF5F5-0B5E-48E1-6A42-80867A101675",
                   "title": "是，在民事赔偿责任文书中规定"
                },
                {
                   "value": "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
                   "title": "是，在法院裁决中承认"
                },
                {
                   "value": "true",
                   "title": "是，在其他文书中规定",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q183",
             "section": "LiabilityRedress",
             "number": "183",
             "type": "term",
             "title": "贵国是否曾经发生过改性活生物体造成损害的事件？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
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
             "title": "若您对第183个问题的回答为 <i>是</i> ，那么，贵国是否采取了应对措施？",
             "multiple": false,
             "options": [
                {
                   "value": "true",
                   "title": "是",
                   "type": "lstring"
                },
                {
                   "value": "false",
                   "title": "否"
                }
             ]
          },
          {
             "key": "Q185",
             "section": "LiabilityRedress",
             "number": "185",
             "type": "lstring",
             "title": "您可以在此提供贵国为成为《赔偿责任和补救问题名古屋－吉隆坡补充议定书》缔约方所进行的任何国家进程的更多细节",
             "multiple": false
          }
       ]
    },
    {
       "key": "AdditionalInformation",
       "title": "其他信息",
       "questions": [
          {
             "key": "Q186",
             "section": "AdditionalInformation",
             "number": "186",
             "type": "lstring",
             "title": "请在此处提供与《卡塔赫纳议定书》和《补充议定书》执行情况有关的任何其他信息，包括遇到的任何障碍或阻碍。",
             "multiple": false
          }
       ]
    },
    {
       "key": "Comments",
       "title": "对报告格式的评论",
       "questions": [
          {
             "key": "Q187",
             "section": "Comments",
             "number": "187",
             "type": "lstring",
             "title": "请在此处说明贵国填写本报告时遇到的困难。",
             "multiple": false
          }
       ]
    }
 ];
  return cpbNationalReport4;
});
