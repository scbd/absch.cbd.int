define(function () {
  'use strict';

  var cpbNationalReport2 = [{
    key: "General",
    title: "Party to the Cartagena Protocol on Biosafety",
    questions: [{
      key: "Q012",
      section: "General",
      number: "12",
      type: "option",
      title: "Is your country a Party to the Cartagena Protocol on Biosafety (CPB)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q013",
      section: "General",
      number: "13",
      type: "option",
      title: "If you answered No to question 12, is there any national process in place towards becoming a Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q014",
      section: "General",
      number: "14",
      type: "text",
      title: "Here you may provide further details",
      multiple: false
    }]
  }, {
    key: "Article2",
    title: "Article 2 – General provisions",
    questions: [{
      key: "Q015",
      section: "Article2",
      number: "15",
      type: "option",
      title: "Has your country introduced the necessary legal, administrative and other measures for the implementation of the Protocol?",
      multiple: false,
      options: [{
        value: "implementation.fullFramwork",
        title: "A domestic regulatory framework is fully in place"
      }, {
        value: "implementation.partialFramwork",
        title: "A domestic regulatory framework is partially in place"
      }, {
        value: "implementation.temporaryMeasures",
        title: "Only temporary measures have been introduced"
      }, {
        value: "implementation.draftFramwork",
        title: "Only a draft framework exists"
      }, {
        value: "implementation.none",
        title: "No measures have yet been taken"
      }]
    }, {
      key: "Q016",
      section: "Article2",
      number: "16",
      type: "option",
      title: "Which specific instruments are in place for the implementation of your national biosafety framework?",
      multiple: true,
      options: [{
        value: "instrument.nationalBiosafetyLaws",
        title: "One or more national biosafety laws"
      }, {
        value: "instrument.nationalBiosafetyRegulations",
        title: "One or more national biosafety regulations"
      }, {
        value: "instrument.biosafetyGuidelines",
        title: "One or more sets of biosafety guidelines"
      }, {
        value: "instrument.indirectLaws",
        title: "Other laws, regulations or guidelines that indirectly apply to biosafety"
      }, {
        value: "instrument.none",
        title: "No instruments are in place"
      }]
    }, {
      key: "Q017",
      section: "Article2",
      number: "17",
      type: "option",
      title: "Has your country established a mechanism for the budgetary allocations of funds for the operation of its national biosafety framework?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q018",
      section: "Article2",
      number: "18",
      type: "option",
      title: "Does your country have permanent staff to administer functions directly related to the national biosafety framework?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q019",
      section: "Article2",
      number: "19",
      type: "option",
      title: "If you answered Yes to question 18, how many permanent staff members are in place whose functions are directly related to the national biosafety framework?",
      multiple: false,
      options: [{
        value: "1",
        title: "One"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q020",
      section: "Article2",
      number: "20",
      type: "option",
      title: "Has your country’s biosafety framework / laws / regulations / guidelines been submitted to the Biosafety Clearing-House (BCH)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Partially"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q021",
      section: "Article2",
      number: "21",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 2 in your country:",
      multiple: false
    }]
  }, {
    key: "Article5",
    title: "Article 5 – Pharmaceuticals",
    questions: [{
      key: "Q022",
      section: "Article5",
      number: "22",
      type: "option",
      title: "Does your country regulate the transboundary movement, handling and use of living modified organisms (LMOs) which are pharmaceuticals?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q023",
      section: "Article5",
      number: "23",
      type: "option",
      title: "If you answered Yes to question 22, has this information been submitted to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Partially"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q024",
      section: "Article5",
      number: "24",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 5 in your country:",
      multiple: false
    }]
  }, {
    key: "Article6",
    title: "Article 6 – Transit and Contained use",
    questions: [{
      key: "Q025",
      section: "Article6",
      number: "25",
      type: "option",
      title: "Does your country regulate the transit of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q026",
      section: "Article6",
      number: "26",
      type: "option",
      title: "Does your country regulate the contained use of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q027",
      section: "Article6",
      number: "27",
      type: "option",
      title: "If you answered Yes to questions 25 or 26, has this information been submitted to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Partially"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q028",
      section: "Article6",
      number: "28",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 6 in your country:",
      multiple: false
    }]
  }, {
    key: "Articles7-10",
    title: "Articles 7 to 10 – Advance Informed Agreement (AIA) and  intentional introduction of LMOs into the environment",
    questions: [{
      key: "Q029",
      section: "Articles7-10",
      number: "29",
      type: "option",
      title: "Has your country adopted law(s) / regulations / administrative measures for the operation of the AIA procedure of the Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q030",
      section: "Articles7-10",
      number: "30",
      type: "option",
      title: "Has your country adopted a domestic regulatory framework consistent with the Protocol regarding the transboundary movement of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q031",
      section: "Articles7-10",
      number: "31",
      type: "option",
      title: "Has your country established a mechanism for taking decisions regarding first intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q032",
      section: "Articles7-10",
      number: "32",
      type: "option",
      title: "If you answered Yes to question 31, does the mechanism also apply to cases of intentional introduction of LMOs into the environment that were not subject to transboundary movement?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q033",
      section: "Articles7-10",
      number: "33",
      type: "option",
      title: "Has your country established a mechanism for monitoring potential effects of LMOs that are released into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q034",
      section: "Articles7-10",
      number: "34",
      type: "option",
      title: "Does your country have the capacity to detect and identify LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q035",
      section: "Articles7-10",
      number: "35",
      type: "option",
      title: "Has your country established legal requirements for exporters under its jurisdiction to notify in writing the competent national authority of the Party of import prior to the intentional transboundary movement of an LMO that falls within the scope of the AIA procedure?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q036",
      section: "Articles7-10",
      number: "36",
      type: "option",
      title: "Has your country established legal requirements for the accuracy of information contained in the notification?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q037",
      section: "Articles7-10",
      number: "37",
      type: "option",
      title: "Has your country ever received an application / notification regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q038",
      section: "Articles7-10",
      number: "38",
      type: "option",
      title: "Has your country ever taken a decision on an application / notification regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q039",
      section: "Articles7-10",
      number: "39",
      type: "option",
      title: "If you answered Yes to question 38, how many LMOs has your country approved to date for import for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q040",
      section: "Articles7-10",
      number: "40",
      type: "option",
      title: "If you answered Yes to question 38, how many LMOs, not imported, has your country approved to date for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q041",
      section: "Articles7-10",
      number: "41",
      type: "option",
      title: "In the current reporting period, how many applications/notifications has your country received regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q042",
      section: "Articles7-10",
      number: "42",
      type: "option",
      title: "In the current reporting period, how many decisions has your country taken regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q043",
      section: "Articles7-10",
      number: "43",
      type: "option",
      title: "With reference to the decisions taken on intentional transboundary movements of LMOs for intentional introduction into the environment, has your country received a notification from the Party(ies) of export or from the exporter(s) prior to the transboundary movement?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q044",
      section: "Articles7-10",
      number: "44",
      type: "option",
      title: "Did the notifications contain complete information (at a minimum the information specified in Annex I of the Cartagena Protocol on Biosafety)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q045",
      section: "Articles7-10",
      number: "45",
      type: "option",
      title: "Has your country acknowledged receipt of the notifications to the notifier within ninety days of receipt?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q046",
      section: "Articles7-10",
      number: "46",
      type: "option",
      title: "Has your country informed the notifier(s) and the BCH of its decision(s)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.some.notifier",
        title: "In some cases only the notifier"
      }, {
        value: "true.some.bch",
        title: "In some cases only the BCH"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q047",
      section: "Articles7-10",
      number: "47",
      type: "option",
      title: "Has your country informed the notifier(s) and the BCH of its decision(s) in due time (within 270 days or the period specified in your communication to the notifier)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q048",
      section: "Articles7-10",
      number: "48",
      type: "term",
      title: "What percentage of your country’s decisions fall into the following categories?",
      multiple: true,
      options: [{
        value: "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
        title: "Approval of the import/use of the LMO(s) without conditions"
      }, {
        value: "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
        title: "Approval of the import/use of the LMO(s) with conditions"
      }, {
        value: "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
        title: "Prohibition of the import/use of the LMO(s)"
      }, {
        value: "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
        title: "Request for additional relevant information"
      }, {
        value: "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
        title: "Inform the notifier that the period for communicating the decision has been extended"
      }]
    }, {
      key: "Q049",
      section: "Articles7-10",
      number: "49",
      type: "option",
      title: "In cases where your country approved an import with conditions or prohibited an import, did it provide reasons on which its decisions were based to the notifier and the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.some.notifier",
        title: "In some cases only the notifier"
      }, {
        value: "true.some.bch",
        title: "In some cases only the BCH"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q050",
      section: "Articles7-10",
      number: "50",
      type: "text",
      title: "Here you may provide further details on the implementation of Articles 7-10 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs for intentional introduction to the environment:",
      multiple: false
    }]
  }, {
    key: "Article11",
    title: "Article 11 – Procedure for living modified organisms  intended for direct use as food or feed, or for processing (LMOs-FFP)",
    questions: [{
      key: "Q051",
      section: "Article11",
      number: "51",
      type: "option",
      title: "Has your country adopted specific law(s) or regulation(s) for decision-making regarding domestic use, including placing on the market, of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q052",
      section: "Article11",
      number: "52",
      type: "option",
      title: "Has your country established legal requirements for the accuracy of information to be provided by the applicant?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q053",
      section: "Article11",
      number: "53",
      type: "option",
      title: "Has your country established a mechanism to ensure that decisions regarding LMOs-FFP that may be subject to transboundary movement will be communicated to the Parties through the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q054",
      section: "Article11",
      number: "54",
      type: "option",
      title: "Has your country established a mechanism for taking decisions on the import of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q055",
      section: "Article11",
      number: "55",
      type: "option",
      title: "Has your country declared through the BCH that in the absence of a regulatory framework its decisions prior to the first import of an LMO-FFP will be taken according to Article 11.6 of the Cartagena Protocol on Biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q056",
      section: "Article11",
      number: "56",
      type: "option",
      title: "Has your country indicated its needs for financial and technical assistance and capacity building in respect of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q057",
      section: "Article11",
      number: "57",
      type: "option",
      title: "Has your country ever taken a decision on LMOs-FFP (either on import or domestic use)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q058",
      section: "Article11",
      number: "58",
      type: "option",
      title: "How many LMOs-FFP has your country approved to date?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q059",
      section: "Article11",
      number: "59",
      type: "option",
      title: "In the current reporting period, how many decisions has your country taken regarding the import of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q060",
      section: "Article11",
      number: "60",
      type: "option",
      title: "In the current reporting period, how many decisions has your country taken regarding domestic use, including placing on the market, of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q061",
      section: "Article11",
      number: "61",
      type: "option",
      title: "Has your country informed the Parties through the BCH of its decision(s) regarding import, of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q062",
      section: "Article11",
      number: "62",
      type: "option",
      title: "Has your country informed the Parties through the BCH of its decision(s) regarding domestic use, including placing on the market, of LMOs-FFP within 15 days?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.delay",
        title: "Yes, but with delays (i.e. longer than 15 days)"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q063",
      section: "Article11",
      number: "63",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 11 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs-FFP:",
      multiple: false
    }]
  }, {
    key: "Article12",
    title: "Article 12 – Review of decision",
    questions: [{
      key: "Q064",
      section: "Article12",
      number: "64",
      type: "option",
      title: "Has your country established a mechanism for the review and change of a decision regarding an intentional transboundary movement of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q065",
      section: "Article12",
      number: "65",
      type: "option",
      title: "Has your country ever received a request for a review of a decision?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q066",
      section: "Article12",
      number: "66",
      type: "option",
      title: "Has your country ever reviewed / changed a decision regarding an intentional transboundary movement of LMOs?",
      multiple: false,
      options: [{
        value: "true.reviewed",
        title: "Yes, decision reviewed"
      }, {
        value: "true.changed",
        title: "Yes, decision reviewed and changed"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q067",
      section: "Article12",
      number: "67",
      type: "option",
      title: "In the current reporting period, how many decisions were reviewed and/or changed regarding an intentional transboundary movement of an LMO?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "5+",
        title: "More than 5"
      }]
    }, {
      key: "Q068",
      section: "Article12",
      number: "68",
      type: "option",
      title: "Has your country informed the notifier and the BCH of the review and/or changes in the decision?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.some.notifier",
        title: "In some cases only the notifier"
      }, {
        value: "true.some.bch",
        title: "In some cases only the BCH"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q069",
      section: "Article12",
      number: "69",
      type: "option",
      title: "Has your country informed the notifier and the BCH of the review and changes in the decision within thirty days?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.delay",
        title: "Yes, but with delays (i.e. longer than 30 days)"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q070",
      section: "Article12",
      number: "70",
      type: "option",
      title: "Has your country provided reasons to the notifier and the BCH for the review and/or changes in the decision?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "true.some.notifier",
        title: "In some cases only the notifier"
      }, {
        value: "true.some.bch",
        title: "In some cases only the BCH"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q071",
      section: "Article12",
      number: "71",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 12 in your country:",
      multiple: false
    }]
  }, {
    key: "Article13",
    title: "Article 13 – Simplified procedure",
    questions: [{
      key: "Q072",
      section: "Article13",
      number: "72",
      type: "option",
      title: "Has your country established a system for the application of the simplified procedure regarding an intentional transboundary movement of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q073",
      section: "Article13",
      number: "73",
      type: "option",
      title: "Has your country ever applied the simplified procedure?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q074",
      section: "Article13",
      number: "74",
      type: "option",
      title: "If you answered Yes to question 73, has your country informed the Parties through the BCH of the cases where the simplified procedure applies?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q075",
      section: "Article13",
      number: "75",
      type: "option",
      title: "In the current reporting period, how many LMOs has your country applied the simplified procedure to?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "5+",
        title: "More than 5"
      }]
    }, {
      key: "Q076",
      section: "Article13",
      number: "76",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 13 in your country:",
      multiple: false
    }]
  }, {
    key: "Article14",
    title: "Article 14 – Bilateral, regional and multilateral agreements and arrangements",
    questions: [{
      key: "Q077",
      section: "Article14",
      number: "77",
      type: "option",
      title: "Has your country entered into any bilateral, regional or multilateral agreements or arrangements?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q078",
      section: "Article14",
      number: "78",
      type: "option",
      title: "If you answered Yes to question 77, has your country informed the Parties through the BCH of the agreements or arrangements?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q079",
      section: "Article14",
      number: "79",
      type: "text",
      title: "If you answered Yes to question 77, please provide a brief description of the scope and objective of the agreements or arrangements entered into:",
      multiple: false
    }, {
      key: "Q080",
      section: "Article14",
      number: "80",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 14 in your country:",
      multiple: false
    }]
  }, {
    key: "Article15",
    title: "Article 15 – Risk assessment",
    questions: [{
      key: "Q081",
      section: "Article15",
      number: "81",
      type: "option",
      title: "Has your country established a mechanism for conducting risk assessments prior to taking decisions regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q082",
      section: "Article15",
      number: "82",
      type: "option",
      title: "If you answered Yes to question 81, does this mechanism include procedures for identifying experts to conduct the risk assessments?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q083",
      section: "Article15",
      number: "83",
      type: "option",
      title: "Has your country established guidelines for how to conduct risk assessments prior to taking decisions regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q084",
      section: "Article15",
      number: "84",
      type: "option",
      title: "Has your country acquired the necessary domestic capacity to conduct risk assessment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q085",
      section: "Article15",
      number: "85",
      type: "option",
      title: "Has your country established a mechanism for training national experts to conduct risk assessments?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q086",
      section: "Article15",
      number: "86",
      type: "option",
      title: "Has your country ever conducted a risk assessment of an LMO for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q087",
      section: "Article15",
      number: "87",
      type: "option",
      title: "Has your country ever conducted a risk assessment of an LMO intended for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q088",
      section: "Article15",
      number: "88",
      type: "option",
      title: "If your country has taken decision(s) on LMOs for intentional introduction into the environment or on domestic use of LMOs-FFP, were risk assessments conducted for all decisions taken?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q089",
      section: "Article15",
      number: "89",
      type: "option",
      title: "Has your country submitted summary reports of the risk assessments to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q090",
      section: "Article15",
      number: "90",
      type: "option",
      title: "In the current reporting period, if your country has taken decisions regarding LMOs, how many risk assessments were conducted in the context of these decisions?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q091",
      section: "Article15",
      number: "91",
      type: "option",
      title: "Has your country ever required the exporter to conduct the risk assessment(s)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q092",
      section: "Article15",
      number: "92",
      type: "option",
      title: "Has your country ever required the notifier to bear the cost of the risk assessment(s) of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q093",
      section: "Article15",
      number: "93",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 15 in your country:",
      multiple: false
    }]
  }, {
    key: "Article16",
    title: "Article 16 – Risk management",
    questions: [{
      key: "Q094_a",
      section: "Article16",
      number: "94.1",
      type: "option",
      title: "LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q094_b",
      section: "Article16",
      number: "94.2",
      type: "option",
      title: "LMOs intended for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q095",
      section: "Article16",
      number: "95",
      type: "option",
      title: "Has your country established and maintained appropriate measures to prevent unintentional transboundary movements of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q096",
      section: "Article16",
      number: "96",
      type: "option",
      title: "Has your country taken measures to ensure that any LMO, whether imported or locally developed, undergoes an appropriate period of observation that is commensurate with its life-cycle or generation time before it is put to its intended use?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q097",
      section: "Article16",
      number: "97",
      type: "option",
      title: "Has your country cooperated with other Parties with a view to identifying LMOs or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q098",
      section: "Article16",
      number: "98",
      type: "option",
      title: "Has your country cooperated with other Parties with a view to taking measures regarding the treatment of LMOs or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q099",
      section: "Article16",
      number: "99",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 16 in your country, including any details regarding risk management strategies, also in case of lack of scientific certainty on potential adverse effects of LMOs:",
      multiple: false
    }]
  }, {
    key: "Article17",
    title: "Article 17 – Unintentional transboundary movements and emergency measures",
    questions: [{
      key: "Q100",
      section: "Article17",
      number: "100",
      type: "option",
      title: "Has your country made available to the BCH the relevant details setting out its point of contact for the purposes of receiving notifications under Article 17?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q101",
      section: "Article17",
      number: "101",
      type: "option",
      title: "Has your country established a mechanism for addressing emergency measures in case of unintentional transboundary movements of LMOs that are likely to have significant adverse effect on biological diversity?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q102",
      section: "Article17",
      number: "102",
      type: "option",
      title: "Has your country implemented emergency measures in response to information about releases that led, or may have led, to unintentional transboundary movements of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q103",
      section: "Article17",
      number: "103",
      type: "option",
      title: "In the current reporting period, how many times has your country received information concerning occurrences that led, or may have led, to unintentional transboundary movement(s) of one or more LMOs to or from territories under its jurisdiction?",
      multiple: false,
      options: [{
        value: "0",
        title: "Never"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q104",
      section: "Article17",
      number: "104",
      type: "option",
      title: "Has your country notified affected or potentially affected States, the BCH and, where appropriate, relevant international organizations, of the above release?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, for every occurence"
      }, {
        value: "true.some",
        title: "Yes, for some occurences"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q105",
      section: "Article17",
      number: "105",
      type: "option",
      title: "If you answered Yes to question 104, who did your country notify?",
      multiple: false,
      options: [{
        value: "affectedStates",
        title: "The affected or potentially affected State"
      }, {
        value: "bch",
        title: "The BCH"
      }, {
        value: "organizations",
        title: "Relevant international organizations"
      }]
    }, {
      key: "Q106",
      section: "Article17",
      number: "106",
      type: "option",
      title: "Has your country immediately consulted the affected or potentially affected States to enable them to determine appropriate responses and initiate necessary action, including emergency measures?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "Yes, in some cases"
      }, {
        value: "false.later",
        title: "No, consultation was made but not immediately"
      }, {
        value: "false",
        title: "No, consultation was never made"
      }]
    }, {
      key: "Q107",
      section: "Article17",
      number: "107",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 17 in your country:",
      multiple: false
    }]
  }, {
    key: "Article18",
    title: "Article 18 – Handling, transport, packaging and identification",
    questions: [{
      key: "Q108",
      section: "Article18",
      number: "108",
      type: "option",
      title: "Has your country taken measures to require that LMOs that are subject to transboundary movement are handled, packaged and transported under conditions of safety, taking into account relevant international rules and standards?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q109",
      section: "Article18",
      number: "109",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs-FFP clearly identifies that, in cases where the identity of the LMOs is not known through means such as identity preservation systems, they may contain living modified organisms and are not intended for intentional introduction into the environment, as well as a contact point for further information?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q110",
      section: "Article18",
      number: "110",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs-FFP clearly identifies that, in cases where the identity of the LMOs is known through means such as identity preservation systems, they contain living modified organisms and are not intended for intentional introduction into the environment, as well as a contact point for further information?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q111",
      section: "Article18",
      number: "111",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs that are destined for contained use clearly identifies them as living modified organisms and specifies any requirements for the safe handling, storage, transport and use, the contact point for further information, including the name and address of the individual and institution to whom the LMO are consigned?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q112",
      section: "Article18",
      number: "112",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs that are intended for intentional introduction into the environment of the Party of import, clearly identifies them as living modified organisms; specifies the identity and relevant traits and/or characteristics, any requirements for the safe handling, storage, transport and use, the contact point for further information and, as appropriate, the name and address of the importer and exporter; and contains a declaration that the movement is in conformity with the requirements of this Protocol applicable to the exporter?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q113",
      section: "Article18",
      number: "113",
      type: "option",
      title: "Does your country have the capacity to enforce the requirements of identification and documentation of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q114",
      section: "Article18",
      number: "114",
      type: "option",
      title: "Has your country established procedures for the sampling and detection of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q115",
      section: "Article18",
      number: "115",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 18 in your country:",
      multiple: false
    }]
  }, {
    key: "Article19",
    title: "Article 19 – Competent National Authorities and National Focal Points",
    questions: [{
      key: "Q116",
      section: "Article19",
      number: "116",
      type: "option",
      title: "Has your country designated one national focal point for the Cartagena Protocol to be responsible for liaison with the Secretariat?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q117",
      section: "Article19",
      number: "117",
      type: "option",
      title: "Has your country designated one national focal point for the Biosafety Clearing-House to liaise with the Secretariat regarding issues of relevance to the development and implementation of the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q118",
      section: "Article19",
      number: "118",
      type: "option",
      title: "Has your country designated one or more competent national authorities, which are responsible for performing the administrative functions required by the Cartagena Protocol on Biosafety and are authorized to act on your country’s behalf with respect to those functions?",
      multiple: false,
      options: [{
        value: "1",
        title: "Yes, one"
      }, {
        value: "1+",
        title: "Yes, more than one"
      }, {
        value: "0",
        title: "No"
      }]
    }, {
      key: "Q119",
      section: "Article19",
      number: "119",
      type: "option",
      title: "In case your country designated more than one competent national authority, has your country conveyed to the Secretariat the respective responsibilities of those authorities?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q120",
      section: "Article19",
      number: "120",
      type: "option",
      title: "Has your country made available the required information referred in questions 116-119 to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, all information"
      }, {
        value: "true.some",
        title: "Yes, some information"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q121",
      section: "Article19",
      number: "121",
      type: "option",
      title: "In case your country has designated more than one competent national authority, has your country established a mechanism for the coordination of their actions prior to taking decisions regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q122",
      section: "Article19",
      number: "122",
      type: "option",
      title: "Has your country established adequate institutional capacity to enable the competent national authority(ies) to perform the administrative functions required by the Cartagena Protocol on Biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q123",
      section: "Article19",
      number: "123",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 19 in your country:",
      multiple: false
    }]
  }, {
    key: "Article20",
    title: "Article 20 – Information Sharing and the Biosafety Clearing-House (BCH)",
    questions: [{
      key: "Q124_a",
      section: "Article20",
      number: "124.a",
      type: "option",
      title: "Existing national legislation, regulations and guidelines for implementing the Protocol, as well as information required by Parties for the advance informed agreement procedure (Article 20, paragraph 3 (a))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_b",
      section: "Article20",
      number: "124.b",
      type: "option",
      title: "National laws, regulations and guidelines applicable to the import of LMOs intended for direct use as food or feed, or for processing (Article 11, paragraph 5)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_c",
      section: "Article20",
      number: "124.c",
      type: "option",
      title: "Bilateral, multilateral and regional agreements and arrangements (Articles 14, paragraph 2 and 20, paragraph 3 (b))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_d",
      section: "Article20",
      number: "124.d",
      type: "option",
      title: "Contact details for competent national authorities (Article 19, paragraphs 2 and 3), national focal points (Article 19, paragraphs 1 and 3), and emergency contacts (Article 17, paragraph 3 (e))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_e",
      section: "Article20",
      number: "124.e",
      type: "option",
      title: "Reports submitted by the Parties on the operation of the Protocol (Article 20, paragraph 3 (e))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_f",
      section: "Article20",
      number: "124.f",
      type: "option",
      title: "Decisions by a Party on regulating the transit of specific living modified organisms (LMOs) (Article 6, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_g",
      section: "Article20",
      number: "124.g",
      type: "option",
      title: "Occurrence of unintentional transboundary movements that are likely to have significant adverse effects on biological diversity (Article 17, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_h",
      section: "Article20",
      number: "124.h",
      type: "option",
      title: "Illegal transboundary movements of LMOs (Article 25, paragraph 3)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_i",
      section: "Article20",
      number: "124.i",
      type: "option",
      title: "Final decisions regarding the importation or release of LMOs (i.e. approval or prohibition, any conditions, requests for further information, extensions granted, reasons for decision) (Articles 10, paragraph 3 and 20, paragraph 3(d))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_j",
      section: "Article20",
      number: "124.j",
      type: "option",
      title: "Information on the application of domestic regulations to specific imports of LMOs (Article 14, paragraph 4)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_k",
      section: "Article20",
      number: "124.k",
      type: "option",
      title: "Final decisions regarding the domestic use of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing (Article 11, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_l",
      section: "Article20",
      number: "124.l",
      type: "option",
      title: "Final decisions regarding the import of LMOs intended for direct use as food or feed, or for processing that are taken under domestic regulatory frameworks (Article 11, paragraph 4) or in accordance with annex III (Article 11, paragraph 6) (requirement of Article 20, paragraph 3(d))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_m",
      section: "Article20",
      number: "124.m",
      type: "option",
      title: "Declarations regarding the framework to be used for LMOs intended for direct use as food or feed, or for processing (Article 11, paragraph 6)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_n",
      section: "Article20",
      number: "124.n",
      type: "option",
      title: "Review and change of decisions regarding intentional transboundary movements of LMOs (Article 12, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_o",
      section: "Article20",
      number: "124.o",
      type: "option",
      title: "LMOs granted exemption status by each Party (Article 13, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_p",
      section: "Article20",
      number: "124.p",
      type: "option",
      title: "Cases where intentional transboundary movement may take place at the same time as the movement is notified to the Party of import (Article 13, paragraph 1)",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q124_q",
      section: "Article20",
      number: "124.q",
      type: "option",
      title: "Summaries of risk assessments or environmental reviews of LMOs generated by regulatory processes and relevant information regarding products thereof (Article 20, paragraph 3 (c))",
      multiple: false,
      options: [{
        value: "true.availableOnBch",
        title: "Information available and in the BCH"
      }, {
        value: "true.availableNotOnBch",
        title: "Information available but not in the BCH"
      }, {
        value: "true.availablePartialyOnBch",
        title: "Information available but only partially available in the BCH"
      }, {
        value: "false.notAvailable",
        title: "Information not available"
      }]
    }, {
      key: "Q125",
      section: "Article20",
      number: "125",
      type: "option",
      title: "Has your country established a mechanism for strengthening the capacity of the BCH National Focal Point to perform its administrative functions?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q126",
      section: "Article20",
      number: "126",
      type: "option",
      title: "Has your country established a mechanism for the coordination among the BCH National Focal Point, the Cartagena Protocol focal point, and the competent national authority(ies) for making information available to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q127",
      section: "Article20",
      number: "127",
      type: "option",
      title: "Does your country use the information available in the BCH in its decision making processes on LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "Yes, in some cases"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q128",
      section: "Article20",
      number: "128",
      type: "option",
      title: "Has your country experienced difficulties accessing or using the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q129",
      section: "Article20",
      number: "129",
      type: "option",
      title: "If you answered Yes to question 128, has your country reported these problems to the BCH or the Secretariat?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q130",
      section: "Article20",
      number: "130",
      type: "option",
      title: "Is the information submitted by your country to the BCH complete and up-to date?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q131",
      section: "Article20",
      number: "131",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 20 in your country:",
      multiple: false
    }]
  }, {
    key: "Article21",
    title: "Article 21 – Confidential information",
    questions: [{
      key: "Q132",
      section: "Article21",
      number: "132",
      type: "option",
      title: "Has your country established procedures to protect confidential information received under the Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q133",
      section: "Article21",
      number: "133",
      type: "option",
      title: "Does your country allow the notifier to identify information that is to be treated as confidential?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q134",
      section: "Article21",
      number: "134",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 21 in your country:",
      multiple: false
    }]
  }, {
    key: "Article22",
    title: "Article 22 – Capacity-building",
    questions: [{
      key: "Q135",
      section: "Article22",
      number: "135",
      type: "option",
      title: "Has your country received external support or benefited from collaborative activities with other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q136",
      section: "Article22",
      number: "136",
      type: "option",
      title: "If you answered Yes to question 135, how were these resources made available?",
      multiple: false,
      options: [{
        value: "channels.bilateral",
        title: "Bilateral channels"
      }, {
        value: "channels.regional",
        title: "Regional channels"
      }, {
        value: "channels.multilateral",
        title: "Multilateral channels"
      }]
    }, {
      key: "Q137",
      section: "Article22",
      number: "137",
      type: "option",
      title: "Has your country provided support to other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q138",
      section: "Article22",
      number: "138",
      type: "option",
      title: "If you answered Yes to question 137, how were these resources made available?",
      multiple: false,
      options: [{
        value: "channels.bilateral",
        title: "Bilateral channels"
      }, {
        value: "channels.regional",
        title: "Regional channels"
      }, {
        value: "channels.multilateral",
        title: "Multilateral channels"
      }]
    }, {
      key: "Q139",
      section: "Article22",
      number: "139",
      type: "option",
      title: "Is your country eligible to receive funding from the Global Environment Facility (GEF)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q140",
      section: "Article22",
      number: "140",
      type: "option",
      title: "Has your country ever initiated a process to access GEF funds for building capacity in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q141",
      section: "Article22",
      number: "141",
      type: "option",
      title: "If you answered Yes to question 140, how would you characterize the process?",
      multiple: false,
      options: [{
        value: "veryEasy",
        title: "Very easy"
      }, {
        value: "easy",
        title: "Easy"
      }, {
        value: "average",
        title: "Average"
      }, {
        value: "difficult",
        title: "Difficult"
      }, {
        value: "veryDifficult",
        title: "Very difficult"
      }]
    }, {
      key: "Q142",
      section: "Article22",
      number: "142",
      type: "term",
      title: "Has your country ever received funding from the GEF for building capacity in biosafety?",
      multiple: true,
      options: [{
        value: "C6F5F985-183C-45F7-8A61-5B6DB2F13D10",
        title: "Pilot Biosafety Enabling Activity"
      }, {
        value: "303E8C81-AE0E-4CDE-A791-3DA21CB2",
        title: "Development of national biosafety frameworks"
      }, {
        value: "2781FB83-5221-4D8F-ACF6-D71423AF",
        title: "Implementation of national biosafety frameworks"
      }, {
        value: "BAA4A44E-39CF-41ED-96B1-216ED265A2C3",
        title: "Building Capacity for Effective Participation in the BCH (Phase I)"
      }, {
        value: "08A3193F-9F13-4587-8106-E6F4F3A7A7F9",
        title: "Building Capacity for Effective Participation in the BCH (Phase II)"
      }, {
        value: "7FAF8785-54AA-446B-A61E-89F952FE607B",
        title: "Building Capacity for Effective Participation in the BCH (Phase III)"
      }]
    }, {
      key: "Q143",
      section: "Article22",
      number: "143",
      type: "option",
      title: "During the current reporting period, has your country undertaken activities for the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q144",
      section: "Article22",
      number: "144",
      type: "term",
      title: "If you answered Yes to question 143, in which of the following areas were these activities undertaken?",
      multiple: true,
      options: [{
        value: "BB3CA716-E122-4445-9FAD-9F6B440363BD",
        title: "Institutional capacity"
      }, {
        value: "68250AA6-75F1-470D-A8E7-85ECDF703D00",
        title: "Human resources capacity development and training"
      }, {
        value: "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
        title: "Risk assessment and other scientific and technical expertise"
      }, {
        value: "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
        title: "Risk management"
      }, {
        value: "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
        title: "Public awareness, participation and education in biosafety"
      }, {
        value: "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
        title: "Information exchange and data management including participation in the Biosafety Clearing-House"
      }, {
        value: "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
        title: "Scientific, technical and institutional collaboration at subregional, regional and international levels"
      }, {
        value: "6F6C058C-6741-4878-A448-AE56299821A8",
        title: "Technology transfer"
      }, {
        value: "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
        title: "Identification of LMOs, including their detection"
      }, {
        value: "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
        title: "Socio-economic considerations"
      }, {
        value: "A16727EE-FE61-43FF-8530-35A9C7261247",
        title: "Implementation of the documentation requirements under Article 18.2 of the Protocol"
      }, {
        value: "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
        title: "Handling of confidential information "
      }, {
        value: "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
        title: "Measures to address unintentional and/or illegal transboundary movements of LMOs"
      }, {
        value: "09063980-88D9-4826-9F54-CB3EAC36641A",
        title: "Scientific biosafety research relating to LMOs"
      }, {
        value: "799CD9B1-4571-4C2A-A459-F78E004D7F32",
        title: "Taking into account risks to human health"
      }]
    }, {
      key: "Q145",
      section: "Article22",
      number: "145",
      type: "option",
      title: "During the current reporting period, has your country carried out a capacity-building needs assessment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q146",
      section: "Article22",
      number: "146",
      type: "option",
      title: "Does your country still have capacity-building needs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, a few"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q147",
      section: "Article22",
      number: "147",
      type: "term",
      title: "If you answered Yes to question 146, indicate which of the following areas still need capacity-building.",
      multiple: true,
      options: [{
        value: "BB3CA716-E122-4445-9FAD-9F6B440363BD",
        title: "Institutional capacity"
      }, {
        value: "68250AA6-75F1-470D-A8E7-85ECDF703D00",
        title: "Human resources capacity development and training"
      }, {
        value: "7C980FF4-3C5B-4711-81F9-BA6F28C12598",
        title: "Risk assessment and other scientific and technical expertise"
      }, {
        value: "B6B916B4-1700-430C-BCFB-FCE81D6F1349",
        title: "Risk management"
      }, {
        value: "8419162A-8A34-46AC-8AF2-3D2905F9BA08",
        title: "Public awareness, participation and education in biosafety"
      }, {
        value: "AF59E45F-3AC2-4F71-889C-B42E83F75A8A",
        title: "Information exchange and data management including participation in the Biosafety Clearing-House"
      }, {
        value: "85C0A7F0-D527-40C1-B50D-2363EA600F2D",
        title: "Scientific, technical and institutional collaboration at subregional, regional and international levels"
      }, {
        value: "6F6C058C-6741-4878-A448-AE56299821A8",
        title: "Technology transfer"
      }, {
        value: "0FF8F112-C0E9-4A18-83E1-40D4EF61503E",
        title: "Identification of LMOs, including their detection"
      }, {
        value: "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
        title: "Socio-economic considerations"
      }, {
        value: "A16727EE-FE61-43FF-8530-35A9C7261247",
        title: "Implementation of the documentation requirements under Article 18.2 of the Protocol"
      }, {
        value: "3E7615C5-7DFC-4E04-9D26-6C80B4B1DED8",
        title: "Handling of confidential information "
      }, {
        value: "D9AC6B7F-316B-483B-8E74-A5EC87343C81",
        title: "Measures to address unintentional and/or illegal transboundary movements of LMOs"
      }, {
        value: "09063980-88D9-4826-9F54-CB3EAC36641A",
        title: "Scientific biosafety research relating to LMOs"
      }, {
        value: "799CD9B1-4571-4C2A-A459-F78E004D7F32",
        title: "Taking into account risks to human health"
      }]
    }, {
      key: "Q148",
      section: "Article22",
      number: "148",
      type: "option",
      title: "Has your country developed a capacity-building strategy or action plan?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q149",
      section: "Article22",
      number: "149",
      type: "option",
      title: "Has your country submitted the details of national biosafety experts to the Roster of Experts in the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q150",
      section: "Article22",
      number: "150",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 22 in your country, including further details about your experience in accessing GEF funds:",
      multiple: false
    }]
  }, {
    key: "Article23",
    title: "Article 23 – Public awareness and participation",
    questions: [{
      key: "Q151",
      section: "Article23",
      number: "151",
      type: "option",
      title: "Has your country established a strategy or put in place legislation for promoting and facilitating public awareness, education and participation concerning the safe transfer, handling and use of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q152",
      section: "Article23",
      number: "152",
      type: "option",
      title: "Has your country established a biosafety website?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q153",
      section: "Article23",
      number: "153",
      type: "option",
      title: "Has your country established a mechanism to ensure public access to information on living modified organisms that may be imported?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.limited",
        title: "Yes, to a limited extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q154",
      section: "Article23",
      number: "154",
      type: "option",
      title: "Has your country established a mechanism to consult the public in the decision-making process regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.limited",
        title: "Yes, to a limited extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q155",
      section: "Article23",
      number: "155",
      type: "option",
      title: "Has your country established a mechanism to make available to the public the results of decisions taken on LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.limited",
        title: "Yes, to a limited extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q156",
      section: "Article23",
      number: "156",
      type: "option",
      title: "Has your country taken any initiative to inform its public about the means of public access to the Biosafety Clearing-House?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q157",
      section: "Article23",
      number: "157",
      type: "option",
      title: "In the current reporting period, has your country promoted and facilitated public awareness, education and participation concerning the safe transfer, handling and use of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.limited",
        title: "Yes, to a limited extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q158",
      section: "Article23",
      number: "158",
      type: "option",
      title: "If you answered Yes to question 157, has your country cooperated with other States and international bodies?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q159",
      section: "Article23",
      number: "159",
      type: "option",
      title: "In the current reporting period, how many times has your country consulted the public in the decision-making process regarding LMOs and made the results of such decisions available to the public?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "5+",
        title: "More than 5"
      }]
    }, {
      key: "Q160",
      section: "Article23",
      number: "160",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 23 in your country:",
      multiple: false
    }]
  }, {
    key: "Article24",
    title: "Article 24 – Non-Parties",
    questions: [{
      key: "Q161",
      section: "Article24",
      number: "161",
      type: "option",
      title: "Has your country entered into any bilateral, regional, or multilateral agreement with non-Parties regarding transboundary movements of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q162",
      section: "Article24",
      number: "162",
      type: "option",
      title: "Has your country ever imported LMOs from a non-Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q163",
      section: "Article24",
      number: "163",
      type: "option",
      title: "Has your country ever exported LMOs to a non-Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q164",
      section: "Article24",
      number: "164",
      type: "option",
      title: "If you answered Yes to questions 162 or 163, were the transboundary movements of LMOs consistent with the objective of the Cartagena Protocol on Biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q165",
      section: "Article24",
      number: "165",
      type: "option",
      title: "If you answered Yes to questions 162 or 163, was information about these transboundary movements submitted to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q166",
      section: "Article24",
      number: "166",
      type: "option",
      title: "If your country is not a Party to the Cartagena Protocol, has it contributed information to the BCH on LMOs released in, or moved into, or out of, areas within its national jurisdiction?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q167",
      section: "Article24",
      number: "167",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 24 in your country:",
      multiple: false
    }]
  }, {
    key: "Article25",
    title: "Article 25 – Illegal transboundary movements",
    questions: [{
      key: "Q168",
      section: "Article25",
      number: "168",
      type: "option",
      title: "Has your country adopted domestic measures aimed at preventing and/or penalizing transboundary movements of LMOs carried out in contravention of its domestic measures to implement this Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q169",
      section: "Article25",
      number: "169",
      type: "option",
      title: "Has your country established a strategy for detecting illegal transboundary movements of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q170",
      section: "Article25",
      number: "170",
      type: "option",
      title: "In the current reporting period, how many times has your country received information concerning cases of illegal transboundary movements of an LMO to or from territories under its jurisdiction?",
      multiple: false,
      options: [{
        value: "0",
        title: "Never"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "10-",
        title: "Less than 10"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q171",
      section: "Article25",
      number: "171",
      type: "option",
      title: "Has your country informed the BCH and the other Party(ies) involved?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Only in some cases"
      }, {
        value: "true.parties",
        title: "Only the other Party(ies) involved"
      }, {
        value: "true.bch",
        title: "Only the BCH"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q172",
      section: "Article25",
      number: "172",
      type: "option",
      title: "Has your country established the origin of the LMO(s)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, some cases"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q173",
      section: "Article25",
      number: "173",
      type: "option",
      title: "Has your country established the nature of the LMO(s)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, some cases"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q174",
      section: "Article25",
      number: "174",
      type: "option",
      title: "Has your country established the circumstances of the illegal transboundary movement(s)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, some cases"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q175",
      section: "Article25",
      number: "175",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 25 in your country:",
      multiple: false
    }]
  }, {
    key: "Article26",
    title: "Article 26 – Socio-economic considerations",
    questions: [{
      key: "Q176",
      section: "Article26",
      number: "176",
      type: "option",
      title: "If your country has taken a decision on import, has it ever taken into account socio-economic considerations arising from the impact of the LMO on the conservation and sustainable use of biological diversity?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Only in some cases"
      }, {
        value: "false",
        title: "No"
      }, {
        value: "n/a",
        title: "Not applicable"
      }]
    }, {
      key: "Q177",
      section: "Article26",
      number: "177",
      type: "option",
      title: "Has your country cooperated with other Parties on research and information exchange on any socio-economic impacts of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to a limited extent"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q178",
      section: "Article26",
      number: "178",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 26 in your country:",
      multiple: false
    }]
  }, {
    key: "Article27",
    title: "Article 27 – Liability and Redress",
    questions: [{
      key: "Q179",
      section: "Article27",
      number: "179",
      type: "option",
      title: "Has your country signed the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q180",
      section: "Article27",
      number: "180",
      type: "option",
      title: "Has your country initiated steps towards ratification, acceptance or approval of the Nagoya-Kuala Lumpur Supplementary Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q181",
      section: "Article27",
      number: "181",
      type: "text",
      title: "Here you may provide further details on any activities undertaken in your country towards the implementation of the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress:",
      multiple: false
    }]
  }, {
    key: "Article33",
    title: "Article 33 – Monitoring and reporting",
    questions: [{
      key: "Q182",
      section: "Article33",
      number: "182",
      type: "option",
      title: "Has your country submitted the previous national reports (Interim and First National Reports)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.interimReportOnly",
        title: "Yes, Interim report only"
      }, {
        value: "true.firstReportOnly",
        title: "Yes, First report only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q183",
      section: "Article33",
      number: "183",
      type: "term",
      title: "If your country did not submit previous reports, indicate the main challenges that hindered the submission",
      multiple: true,
      options: [{
        value: "9D149B05-B490-43BC-BE81-473F4A15D5AC",
        title: "Lack of financial resources to gather the necessary information"
      }, {
        value: "CCACEEF3-01E5-4E19-BE04-01E673A0DDE5",
        title: "Lack of relevant information at the national level"
      }, {
        value: "6EEDA8B0-1096-45C9-BB43-6DA7E6C2FB0F",
        title: "Difficulty in compiling the information from various sectors"
      }, {
        value: "6C994EFC-EF9C-457E-95B4-FA55BFFEAC38",
        title: "No obligation to submit (e.g. country was not a Party at the time)"
      }]
    }]
  }, {
    key: "AdditionalInformation",
    title: "Other information",
    questions: [{
      key: "Q184",
      section: "AdditionalInformation",
      number: "184",
      type: "text",
      title: "Please use this field to provide any other information on issues related to national implementation of the Protocol, including any obstacles or impediments encountered.",
      multiple: false
    }]
  }, {
    key: "Comments",
    title: "Comments on reporting format",
    questions: [{
      key: "Q185",
      section: "Comments",
      number: "185",
      type: "text",
      title: "Please use this field to provide any other information on difficulties that you have encountered in filling in this report.",
      multiple: false
    }]
  }, {
    key: "Survey",
    title: "Survey on indicators of the Strategic Plan (2014)",
    questions: [{
      key: "S003",
      section: "Survey",
      number: "3",
      type: "option",
      title: "When did your national biosafety framework become operational?",
      multiple: false,
      options: [{
        value: "2001",
        title: "2001 or earlier"
      }, {
        value: "2002",
        title: "2002"
      }, {
        value: "2003",
        title: "2003"
      }, {
        value: "2004",
        title: "2004"
      }, {
        value: "2005",
        title: "2005"
      }, {
        value: "2006",
        title: "2006"
      }, {
        value: "2007",
        title: "2007"
      }, {
        value: "2008",
        title: "2008"
      }, {
        value: "2009",
        title: "2009"
      }, {
        value: "2010",
        title: "2010"
      }, {
        value: "2011",
        title: "2011"
      }, {
        value: "2012",
        title: "2012"
      }, {
        value: "2013",
        title: "2013"
      }, {
        value: "2014",
        title: "2014"
      }]
    }, {
      key: "S004",
      section: "Survey",
      number: "4",
      type: "option",
      title: "How many biosafety short-term training programmes and/or academic courses are offered annually in your country?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1-",
        title: "Less than 1 per year"
      }, {
        value: "1+",
        title: "1 per year or more"
      }, {
        value: "5+",
        title: "5 per year or more"
      }, {
        value: "10+",
        title: "10 per year or more"
      }]
    }, {
      key: "S005",
      section: "Survey",
      number: "5",
      type: "option",
      title: "Does your country have in place a functional national mechanism for coordinating biosafety capacity-building initiatives?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S006",
      section: "Survey",
      number: "6",
      type: "option",
      title: "How much additional funding (in the equivalent of US dollars) has your country mobilized in the last four years to support implementation of the Biosafety Protocol, beyond the regular national budgetary allocation?",
      multiple: false,
      options: [{
        value: "USD5000-",
        title: "Less than 5,000 USD"
      }, {
        value: "USD5000+",
        title: "5,000 USD or more"
      }, {
        value: "USD50000+",
        title: "50,000 USD or more"
      }, {
        value: "USD100000+",
        title: "100,000 USD or more"
      }, {
        value: "USD500000+",
        title: "500,000 USD or more"
      }, {
        value: "USD1000000+",
        title: "1,000,000 USD or more"
      }, {
        value: "USD5000000+",
        title: "5,000,000 USD or more"
      }]
    }, {
      key: "S007",
      section: "Survey",
      number: "7",
      type: "option",
      title: "Does your country have predictable and reliable funding for building capacity for the effective implementation of the Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S008",
      section: "Survey",
      number: "8",
      type: "option",
      title: "How many LMO-related collaborative bilateral/multilateral arrangements has your country established with other Parties/non-Parties?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "3+",
        title: "3 or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }]
    }, {
      key: "S009_a",
      section: "Survey",
      number: "9.a",
      type: "option",
      title: "Has your country adopted or used any guidance documents for the purpose of conducting risk assessment and/or risk management?\r\nRisk assessment",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S009_b",
      section: "Survey",
      number: "9.b",
      type: "option",
      title: "Has your country adopted or used any guidance documents for the purpose of conducting risk assessment and/or risk management?\r\nRisk management",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S010",
      section: "Survey",
      number: "10",
      type: "option",
      title: "Has your country adopted or used any guidance documents for the purpose of evaluating risk assessment reports submitted by notifiers?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S011",
      section: "Survey",
      number: "11",
      type: "option",
      title: "Has your country adopted any common approaches to risk assessment with other countries?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S012",
      section: "Survey",
      number: "12",
      type: "option",
      title: "Has your country ever conducted a risk assessment of an LMO?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S013_a",
      section: "Survey",
      number: "13.a",
      type: "option",
      title: "Does your country have the capacity to identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nIdentify",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S013_b",
      section: "Survey",
      number: "13.b",
      type: "option",
      title: "Does your country have the capacity to identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nAssess",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S013_c",
      section: "Survey",
      number: "13.c",
      type: "option",
      title: "Does your country have the capacity to identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nMonitor",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S014",
      section: "Survey",
      number: "14",
      type: "option",
      title: "Does your country have available any guidance for the purpose of ensuring the safe handling, transport, and packaging of living modified organisms?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S015",
      section: "Survey",
      number: "15",
      type: "option",
      title: "Does your country have any specific approaches or requirements that facilitate how socio-economic considerations should be taken into account in LMO decision making?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S016",
      section: "Survey",
      number: "16",
      type: "option",
      title: "How many peer-reviewed published materials has your country used for the purpose of elaborating or determining national actions with regard to socio-economic considerations?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }]
    }, {
      key: "S017",
      section: "Survey",
      number: "17",
      type: "text",
      title: "What is your country's experience, if any, in taking socio-economic considerations into account in LMO decision making?",
      multiple: false
    }, {
      key: "S018",
      section: "Survey",
      number: "18",
      type: "option",
      title: "Does your country have the capacity to take appropriate measures in the event that an LMO is unintentionally released?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S019_a",
      section: "Survey",
      number: "19.a",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nRisk assessment",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S019_b",
      section: "Survey",
      number: "19.b",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nMonitoring",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S019_c",
      section: "Survey",
      number: "19.c",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nManagement / Control",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S020",
      section: "Survey",
      number: "20",
      type: "option",
      title: "Does your country have the infrastructure (e.g. laboratory facilities) for monitoring or managing LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S021",
      section: "Survey",
      number: "21",
      type: "option",
      title: "Is your country using training material and/or technical guidance for training in risk assessment and risk management of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S022_a",
      section: "Survey",
      number: "22.a",
      type: "option",
      title: "Are the available training materials and technical guidance on risk assessment and risk management of LMOs sufficient and effective?\r\nSufficient",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S022_b",
      section: "Survey",
      number: "22.b",
      type: "option",
      title: "Are the available training materials and technical guidance on risk assessment and risk management of LMOs sufficient and effective?\r\nEffective",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S023",
      section: "Survey",
      number: "23",
      type: "option",
      title: "How many customs officers in your country have received training in the identification of LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S024",
      section: "Survey",
      number: "24",
      type: "option",
      title: "How many laboratory personnel in your country have received training in detection of LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S025",
      section: "Survey",
      number: "25",
      type: "option",
      title: "Does your country have reliable access to laboratory facilities for the detection of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S026",
      section: "Survey",
      number: "26",
      type: "option",
      title: "How many laboratories in your country are certified for LMO detection?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }]
    }, {
      key: "S027",
      section: "Survey",
      number: "27",
      type: "option",
      title: "How many of the certified laboratories in the previous question are operational?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }]
    }, {
      key: "S028",
      section: "Survey",
      number: "28",
      type: "option",
      title: "Has your country received any financial and/or technical assistance for capacity-building in the area of liability and redress relating to living modified organisms?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S029",
      section: "Survey",
      number: "29",
      type: "option",
      title: "Does your country have administrative or legal instrument that provide for response measures for damage to biodiversity resulting from living modified organisms?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S030",
      section: "Survey",
      number: "30",
      type: "option",
      title: "Has your country informed the public about existing modalities for public participation in the decision-making process regarding living modified organisms?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S031",
      section: "Survey",
      number: "31",
      type: "term",
      title: "If you answered yes to the previous question, please indicate the modalities used to inform the public?",
      multiple: true,
      options: [{
        value: "4E205CD9-9958-497F-A760-F8321771AB3A",
        title: "National website"
      }, {
        value: "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
        title: "Newspaper"
      }, {
        value: "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
        title: "Forums"
      }, {
        value: "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
        title: "Mailing lists"
      }, {
        value: "51792A07-B3C0-4F7B-830E-0741635F57BB",
        title: "Public hearings"
      }]
    }, {
      key: "S032",
      section: "Survey",
      number: "32",
      type: "term",
      title: "If you indicated multiple modalities for public participation in the question above, which one was most used?",
      multiple: false,
      options: [{
        value: "4E205CD9-9958-497F-A760-F8321771AB3A",
        title: "National website"
      }, {
        value: "6400c117-0d9a-4e5d-a0df-ac696f7c0611",
        title: "Newspaper"
      }, {
        value: "38A7618F-D953-4e5c-8AD1-8AC794971EB0",
        title: "Forums"
      }, {
        value: "E8FAF86C-4202-4ABB-9B89-D3D2F2B2BABF",
        title: "Mailing lists"
      }, {
        value: "51792A07-B3C0-4F7B-830E-0741635F57BB",
        title: "Public hearings"
      }]
    }, {
      key: "S033",
      section: "Survey",
      number: "33",
      type: "option",
      title: "How many academic institutions in your country are offering biosafety education and training courses and programmes?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "3+",
        title: "3 or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }]
    }, {
      key: "S034",
      section: "Survey",
      number: "34",
      type: "option",
      title: "How many biosafety training materials and/or online modules are available in your country?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "25+",
        title: "25 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S035_a",
      section: "Survey",
      number: "35.a",
      type: "option",
      title: "Does your country have in place a monitoring and/or an enforcement system?\r\nMonitoring system",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S035_b",
      section: "Survey",
      number: "35.b",
      type: "option",
      title: "Does your country have in place a monitoring and/or an enforcement system?\r\nEnforcement system",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S036",
      section: "Survey",
      number: "36",
      type: "option",
      title: "Please indicate the number of regional, national and international events organized in relation to biosafety (e.g. seminars, workshops, press conferences, educational events, etc.,) in the last 2 years.",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "25+",
        title: "25 or more"
      }]
    }, {
      key: "S037",
      section: "Survey",
      number: "37",
      type: "option",
      title: "Please indicate the number of biosafety related publications that has been made available in your country in the last year.",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "50+",
        title: "50 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "S038",
      section: "Survey",
      number: "38",
      type: "term",
      title: "If biosafety related publications were made available (see question above), please indicate which modalities were preferred.",
      multiple: true,
      options: [{
        value: "4E205CD9-9958-497F-A760-F8321771AB3A",
        title: "National website"
      }, {
        value: "296200C2-3443-4C0C-B892-56CC1F80EF54",
        title: "National Libraries"
      }, {
        value: "6449D16B-F360-4ED5-9EB5-F97F060AA3A7",
        title: "BCH Central Portal"
      }]
    }, {
      key: "S039",
      section: "Survey",
      number: "39",
      type: "option",
      title: "How many collaborative initiatives (including joint activities) on the Cartagena Protocol and other Conventions and processes has your government established in the last 4 years?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "25+",
        title: "25 or more"
      }]
    }, {
      key: "S040",
      section: "Survey",
      number: "40",
      type: "option",
      title: "Does your country have any awareness and outreach programmes on biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S041",
      section: "Survey",
      number: "41",
      type: "text",
      title: "If you answered yes to the question above, please indicate what entity is responsible for carrying out the programmes and/or services and at which level the programmes take place.",
      multiple: false
    }, {
      key: "S042",
      section: "Survey",
      number: "42",
      type: "option",
      title: "Has your country designed and/or implemented an outreach/communication strategy on biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "S043",
      section: "Survey",
      number: "43",
      type: "option",
      title: "Please indicate the number of educational materials on biosafety that are available and accessible to the public.",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "One or more"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "10+",
        title: "10 or more"
      }, {
        value: "25+",
        title: "25 or more"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }]
  }];
  return cpbNationalReport2;
});
