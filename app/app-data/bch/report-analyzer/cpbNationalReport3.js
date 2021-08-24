define(function () {
  'use strict';

  var cpbNationalReport3 = [{
    key: "General",
    title: "Party to the Cartagena Protocol on Biosafety",
    questions: [{
      key: "Q012_party",
      section: "General",
      number: "11",
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
      key: "Q012",
      section: "General",
      number: "12",
      type: "option",
      title: "If your country is not a Party to the Cartagena Protocol on Biosafety (CPB), is there any national process in place towards becoming a party?",
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
      type: "text",
      title: "Here you may provide further details",
      multiple: false
    }]
  }, {
    key: "Article2",
    title: "Article 2 – General provisions",
    questions: [{
      key: "Q014",
      section: "Article2",
      number: "14",
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
      key: "Q015",
      section: "Article2",
      number: "15",
      type: "option",
      title: "If you indicated that a national biosafety framework exists in the above question, when did it become operational?",
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
        title: "2006"
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
        value: "true.some",
        title: "Yes, to some extent"
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
      title: "Here you may provide further details on the implementation of Article 2 in your country",
      multiple: false
    }]
  }, {
    key: "Article5",
    title: "Article 5 - Pharmaceuticals",
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
        value: "true.some",
        title: "Yes, to some extent"
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
    title: "Articles 7 to 10 – Advance Informed Agreement (AIA) and intentional introduction of LMOs into the environment",
    questions: [{
      key: "Q029",
      section: "Articles7-10",
      number: "29",
      type: "option",
      title: "Has your country adopted law(s) / regulations / administrative measures for the operation of the AIA procedure of the Protocol OR a domestic regulatory framework consistent with the Protocol regarding the transboundary movement of LMOs for intentional introduction into the environment?",
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
      title: "Has your country established a mechanism for taking decisions regarding first intentional transboundary movements of LMOs for intentional introduction into the environment?",
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
      key: "Q031",
      section: "Articles7-10",
      number: "31",
      type: "option",
      title: "If you answered Yes to question 30, does the mechanism also apply to cases of intentional introduction of LMOs into the environment that were not subject to transboundary movement?",
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
      title: "Has your country established legal requirements for exporters under its jurisdiction to notify in writing the competent national authority of the Party of import prior to the intentional transboundary movement of an LMO that falls within the scope of the AIA procedure?",
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
      key: "Q033",
      section: "Articles7-10",
      number: "33",
      type: "option",
      title: "Has your country established legal requirements for the accuracy of information contained in the notification?",
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
      key: "Q034",
      section: "Articles7-10",
      number: "34",
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
      key: "Q035",
      section: "Articles7-10",
      number: "35",
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
      key: "Q036",
      section: "Articles7-10",
      number: "36",
      type: "option",
      title: "If you answered Yes to question 35, how many LMOs has your country approved to date for import for intentional introduction into the environment?",
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
      key: "Q037",
      section: "Articles7-10",
      number: "37",
      type: "option",
      title: "If you answered Yes to question 35, how many LMOs, not imported, has your country approved to date for intentional introduction into the environment?",
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
      key: "Q038",
      section: "Articles7-10",
      number: "38",
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
      key: "Q039",
      section: "Articles7-10",
      number: "39",
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
      key: "Q040",
      section: "Articles7-10",
      number: "40",
      type: "option",
      title: "With reference to the decisions taken on intentional transboundary movements of LMOs for intentional introduction into the environment, has your country received a notification from the Party(ies) of export or from the exporter(s) prior to the transboundary movement?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q041",
      section: "Articles7-10",
      number: "41",
      type: "option",
      title: "Did the notifications contain complete information (at a minimum the information specified in Annex I of the Cartagena Protocol on Biosafety)?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q042",
      section: "Articles7-10",
      number: "42",
      type: "option",
      title: "Has your country acknowledged receipt of the notifications to the notifier within ninety days of receipt?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "In some cases only"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q043",
      section: "Articles7-10",
      number: "43",
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
      key: "Q044",
      section: "Articles7-10",
      number: "44",
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
      key: "Q045",
      section: "Articles7-10",
      number: "45",
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
      key: "Q046",
      section: "Articles7-10",
      number: "46",
      type: "text",
      title: "Here you may provide further details on the implementation of Articles 7-10 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs for intentional introduction to the environment",
      multiple: false
    }]
  }, {
    key: "Article11",
    title: "Article 11 – Procedure for living modified organisms intended for direct use as food or feed, or for processing (LMOs-FFP)",
    questions: [{
      key: "Q047",
      section: "Article11",
      number: "47",
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
      key: "Q048",
      section: "Article11",
      number: "48",
      type: "option",
      title: "Has your country established legal requirements for the accuracy of information to be provided by the applicant?",
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
      key: "Q049",
      section: "Article11",
      number: "49",
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
      key: "Q050",
      section: "Article11",
      number: "50",
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
      key: "Q051",
      section: "Article11",
      number: "51",
      type: "option",
      title: "Has your country indicated its needs for financial and technical assistance and capacity-building in respect of LMOs-FFP?",
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
      key: "Q053",
      section: "Article11",
      number: "53",
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
      key: "Q054",
      section: "Article11",
      number: "54",
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
      key: "Q055",
      section: "Article11",
      number: "55",
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
      key: "Q056",
      section: "Article11",
      number: "56",
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
      key: "Q057",
      section: "Article11",
      number: "57",
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
      key: "Q058",
      section: "Article11",
      number: "58",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 11 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs-FFP",
      multiple: false
    }]
  }, {
    key: "Article12",
    title: "Article 12 – Review of decision",
    questions: [{
      key: "Q059",
      section: "Article12",
      number: "59",
      type: "option",
      title: "Has your country established a mechanism for the review and change of a decision regarding an intentional transboundary movement of LMOs?",
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
      key: "Q060",
      section: "Article12",
      number: "60",
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
      key: "Q061",
      section: "Article12",
      number: "61",
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
      key: "Q062",
      section: "Article12",
      number: "62",
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
      key: "Q063",
      section: "Article12",
      number: "63",
      type: "option",
      title: "Has your country informed both the notifier and the BCH of the review and/or changes in the decision?",
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
      key: "Q064",
      section: "Article12",
      number: "64",
      type: "option",
      title: "Has your country informed both the notifier and the BCH of the review and changes in the decision within thirty days?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, always"
      }, {
        value: "true.some",
        title: "Yes, to some extent"
      }, {
        value: "true.delay",
        title: "Yes, but with delays (i.e. longer than 30 days)"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q065",
      section: "Article12",
      number: "65",
      type: "option",
      title: "Has your country provided reasons to both the notifier and the BCH for the review and/or changes in the decision?",
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
      key: "Q066",
      section: "Article12",
      number: "66",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 12 in your country",
      multiple: false
    }]
  }, {
    key: "Article13",
    title: "Article 13 – Simplified procedure",
    questions: [{
      key: "Q067",
      section: "Article13",
      number: "67",
      type: "option",
      title: "Has your country established a system for the application of the simplified procedure regarding an intentional transboundary movement of LMOs?",
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
      key: "Q068",
      section: "Article13",
      number: "68",
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
      key: "Q069",
      section: "Article13",
      number: "69",
      type: "option",
      title: "If you answered Yes to question 68, has your country informed the Parties through the BCH of the cases where the simplified procedure applies?",
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
      key: "Q070",
      section: "Article13",
      number: "70",
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
      key: "Q071",
      section: "Article13",
      number: "71",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 13 in your country",
      multiple: false
    }]
  }, {
    key: "Article14",
    title: "Article 14 – Bilateral, regional and multilateral agreements and arrangements",
    questions: [{
      key: "Q072",
      section: "Article14",
      number: "72",
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
      key: "Q073",
      section: "Article14",
      number: "73",
      type: "option",
      title: "If you answered Yes to question 72, how many LMO-related collaborative bilateral/multilateral arrangements has your country established with other Parties/non-Parties?",
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
      key: "Q074",
      section: "Article14",
      number: "74",
      type: "option",
      title: "If you answered Yes to question 72, has your country informed the Parties through the BCH of the agreements or arrangements?",
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
      section: "Article14",
      number: "75",
      type: "text",
      title: "If you answered Yes to question 72, please provide a brief description of the scope and objective of the agreements or arrangements entered into",
      multiple: false
    }, {
      key: "Q076",
      section: "Article14",
      number: "76",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 14 in your country",
      multiple: false
    }]
  }, {
    key: "Article15_16",
    title: "Articles 15 & 16 – Risk Assessment and Risk Management",
    questions: [{
      key: "Q077",
      section: "Article15_16",
      number: "77",
      type: "option",
      title: "Has your country established a national framework for conducting risk assessments prior to taking decisions regarding LMOs?",
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
      key: "Q078",
      section: "Article15_16",
      number: "78",
      type: "option",
      title: "If you answered Yes to question 77, does this framework include procedures for identifying and/or training national experts to conduct risk assessments?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q079_a",
      section: "Article15_16",
      number: "79a",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nRisk assessment:",
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
      key: "Q079_b",
      section: "Article15_16",
      number: "79b",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nManagement / Control:",
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
      key: "Q079_c",
      section: "Article15_16",
      number: "79c",
      type: "option",
      title: "How many people in your country have been trained in risk assessment, monitoring, management and control of LMOs?\r\nMonitoring:",
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
      key: "Q080",
      section: "Article15_16",
      number: "80",
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
      key: "Q081",
      section: "Article15_16",
      number: "81",
      type: "option",
      title: "Is your country using the \"ManualonRiskAssessmentofLMOs\" (developed by CBD Secretariat) for training in risk assessment?",
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
      section: "Article15_16",
      number: "82",
      type: "option",
      title: "Is your country using the \"GuidanceonRiskAssessmentofLMOs\" (developed by the Online Forum and the AHTEG on Risk Assessment and Risk Management) for training in risk assessment?",
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
      section: "Article15_16",
      number: "83",
      type: "option",
      title: "Are the currently available training materials or technical guidance on risk assessment and/or risk management of LMOs sufficient?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q084_a",
      section: "Article15_16",
      number: "84a",
      type: "option",
      title: "Does your country have the capacity to detect, identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nDetect:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q084_b",
      section: "Article15_16",
      number: "84b",
      type: "option",
      title: "Does your country have the capacity to detect, identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nIdentify:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q084_c",
      section: "Article15_16",
      number: "84c",
      type: "option",
      title: "Does your country have the capacity to detect, identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nAssess:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q084_d",
      section: "Article15_16",
      number: "84d",
      type: "option",
      title: "Does your country have the capacity to detect, identify, assess and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?\r\nMonitor:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q085_a",
      section: "Article15_16",
      number: "85a",
      type: "option",
      title: "Has your country adopted or used any guidance documents for the purpose of conducting risk assessment or risk management, or for evaluating risk assessment reports submitted by notifiers?\r\nRisk assessment:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q085_b",
      section: "Article15_16",
      number: "85b",
      type: "option",
      title: "Has your country adopted or used any guidance documents for the purpose of conducting risk assessment or risk management, or for evaluating risk assessment reports submitted by notifiers?\r\nRisk management:",
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
      section: "Article15_16",
      number: "86",
      type: "option",
      title: "Is your country using the \"GuidanceonRiskAssessmentofLMOs\" (developed by the Online Forum and the AHTEG on Risk Assessment and Risk Management) for conducting risk assessment or risk management, or for evaluating risk assessment reports submitted by notifiers?",
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
      section: "Article15_16",
      number: "87",
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
      key: "Q088",
      section: "Article15_16",
      number: "88",
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
      key: "Q089",
      section: "Article15_16",
      number: "89",
      type: "option",
      title: "Has your country ever conducted a risk assessment of an LMO including any type of risk assessment of LMOs, e.g. for contained use, field trials, commercial purposes, direct use as food, feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q090",
      section: "Article15_16",
      number: "90",
      type: "term",
      title: "If you answered Yes to question 89, please indicate the scope of the risk assessments (select all that apply):",
      multiple: true,
      options: [{
        value: "D6B59E8A-D82C-4516-917A-A745ACDA5931",
        title: "LMOs for Introduction into the environment"
      }, {
        value: "015737FC-ABC2-460C-A099-06A1B01E649A",
        title: "Commercial production"
      }, {
        value: "BEBF757E-E3CC-4913-8D9F-2D165CD63ECE",
        title: "Field trial"
      }, {
        value: "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
        title: "LMOs for Contained use"
      }, {
        value: "91BEAF12-ABE1-4294-AD3B-507935894C78",
        title: "LMOs for direct use as food"
      }, {
        value: "1D96153B-1625-44E4-AD5E-D26429044B29",
        title: "LMOs for direct use as feed"
      }, {
        value: "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
        title: "LMOs for processing"
      }]
    }, {
      key: "Q091",
      section: "Article15_16",
      number: "91",
      type: "option",
      title: "If you answered Yes to question 89, were the summary reports of the risk assessments submitted to the BCH?",
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
      section: "Article15_16",
      number: "92",
      type: "option",
      title: "If you answered Yes to question 89, were risk assessments conducted for all decisions taken on LMOs for intentional introduction into the environment or on domestic use of LMOs for direct use as food, feed, or for processing?",
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
      section: "Article15_16",
      number: "93",
      type: "option",
      title: "If you answered Yes to question 89, how many risk assessments were conducted in the current reporting period?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "5-",
        title: "5 or less"
      }, {
        value: "10-",
        title: "10 or less"
      }, {
        value: "10+",
        title: "More than 10"
      }]
    }, {
      key: "Q094",
      section: "Article15_16",
      number: "94",
      type: "option",
      title: "Has your country taken measures to ensure that any LMO, whether imported or locally developed, undergoes an appropriate period of observation that is commensurate with its life-cycle or generation time before it is put to its intended use?",
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
      section: "Article15_16",
      number: "95",
      type: "option",
      title: "Has your country established a mechanism for monitoring potential effects of LMOs that are released into the environment?",
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
      section: "Article15_16",
      number: "96",
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
      key: "Q097",
      section: "Article15_16",
      number: "97",
      type: "text",
      title: "Here you may provide further details on the implementation of Articles 15 and 16 in your country",
      multiple: false
    }]
  }, {
    key: "Article17",
    title: "Article 17 – Unintentional transboundary movements and emergency measures",
    questions: [{
      key: "Q098",
      section: "Article17",
      number: "98",
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
      key: "Q099",
      section: "Article17",
      number: "99",
      type: "option",
      title: "Has your country established a mechanism for addressing emergency measures in case of unintentional transboundary movements of LMOs that are likely to have significant adverse effect on biological diversity?",
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
      key: "Q100",
      section: "Article17",
      number: "100",
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
      key: "Q101",
      section: "Article17",
      number: "101",
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
      key: "Q102",
      section: "Article17",
      number: "102",
      type: "option",
      title: "If you answered Yes to question 101, has your country notified affected or potentially affected States, the BCH and, where appropriate, relevant international organizations, of the above release?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes, for every occurrence"
      }, {
        value: "true.some",
        title: "Yes, for some occurrences"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q103",
      section: "Article17",
      number: "103",
      type: "option",
      title: "If you answered Yes to question 101, who did your country notify?",
      multiple: false,
      options: [{
        value: "state",
        title: "The affected or potentially affected State"
      }, {
        value: "bch",
        title: "The BCH"
      }, {
        value: "organization",
        title: "Relevant international organizations"
      }]
    }, {
      key: "Q104",
      section: "Article17",
      number: "104",
      type: "option",
      title: "If you answered Yes to question 101, has your country immediately consulted the affected or potentially affected States to enable them to determine appropriate responses and initiate necessary action, including emergency measures?",
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
      key: "Q105",
      section: "Article17",
      number: "105",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 17 in your country",
      multiple: false
    }]
  }, {
    key: "Article18",
    title: "Article 18 – Handling, transport, packaging and identification",
    questions: [{
      key: "Q106",
      section: "Article18",
      number: "106",
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
      key: "Q107",
      section: "Article18",
      number: "107",
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
      key: "Q108",
      section: "Article18",
      number: "108",
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
      key: "Q109",
      section: "Article18",
      number: "109",
      type: "option",
      title: "If you answered Yes or Yes, to some extent to question(s) 107 and/or 108, what type of documentation does your country require for the identification of LMOs-FFP?",
      multiple: false,
      options: [{
        value: "existing",
        title: "Existing types of documentation"
      }, {
        value: "stand-alone",
        title: "A stand-alone document"
      }, {
        value: "existing|stand-alone",
        title: "Existing or a stand-alone document"
      }]
    }, {
      key: "Q110",
      section: "Article18",
      number: "110",
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
      key: "Q111",
      section: "Article18",
      number: "111",
      type: "option",
      title: "If you answered Yes or Yes, to some extent to question 110, what type of documentation does your country require for the identification of LMOs that are destined for contained?",
      multiple: false,
      options: [{
        value: "existing",
        title: "Existing types of documentation"
      }, {
        value: "stand-alone",
        title: "A stand-alone document"
      }, {
        value: "existing|stand-alone",
        title: "Existing or a stand-alone document"
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
      title: "If you answered Yes or Yes, to some extent to question 112, what type of documentation does your country require for the identification of LMOs that are intended for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "existing",
        title: "Existing types of documentation"
      }, {
        value: "stand-alone",
        title: "A stand-alone document"
      }, {
        value: "existing|stand-alone",
        title: "Existing or a stand-alone document"
      }]
    }, {
      key: "Q114",
      section: "Article18",
      number: "114",
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
      key: "Q115",
      section: "Article18",
      number: "115",
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
      key: "Q116",
      section: "Article18",
      number: "116",
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
      key: "Q117",
      section: "Article18",
      number: "117",
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
      key: "Q118",
      section: "Article18",
      number: "118",
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
      key: "Q119",
      section: "Article18",
      number: "119",
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
      key: "Q120",
      section: "Article18",
      number: "120",
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
      key: "Q121",
      section: "Article18",
      number: "121",
      type: "option",
      title: "How many of the certified laboratories in the previous question are currently operating in the detection of LMOs?",
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
      key: "Q122",
      section: "Article18",
      number: "122",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 18 in your country:",
      multiple: false
    }]
  }, {
    key: "Article19",
    title: "Article 19 – Competent National Authorities and National Focal Points",
    questions: [{
      key: "Q123",
      section: "Article19",
      number: "123",
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
      key: "Q124",
      section: "Article19",
      number: "124",
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
      key: "Q125",
      section: "Article19",
      number: "125",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 19 in your country",
      multiple: false
    }]
  }, {
    key: "Article20",
    title: "Article 20 – Information Sharing and the Biosafety Clearing-House (BCH)",
    questions: [{
      key: "Q126_a",
      section: "Article20",
      number: "126a",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nExisting national legislation, regulations and guidelines for implementing the Protocol, as well as information required by Parties for the advance informed agreement procedure (Article 20, paragraph 3 (a))",
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
      key: "Q126_b",
      section: "Article20",
      number: "126b",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nNational laws, regulations and guidelines applicable to the import of LMOs intended for direct use as food or feed, or for processing (Article 11, paragraph 5)",
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
      key: "Q126_c",
      section: "Article20",
      number: "126c",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nBilateral, multilateral and regional agreements and arrangements (Articles 14, paragraph 2 and 20, paragraph 3 (b))",
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
      key: "Q126_d",
      section: "Article20",
      number: "126d",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nContact details for competent national authorities (Article 19, paragraphs 2 and 3), national focal points (Article 19, paragraphs 1 and 3), and emergency contacts (Article 17, paragraph 3 (e))",
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
      key: "Q126_e",
      section: "Article20",
      number: "126e",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nReports submitted by the Parties on the operation of the Protocol (Article 20, paragraph 3 (e))",
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
      key: "Q126_f",
      section: "Article20",
      number: "126f",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nDecisions by a Party on regulating the transit of specific living modified organisms (LMOs) (Article 6, paragraph 1)",
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
      key: "Q126_g",
      section: "Article20",
      number: "126g",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nOccurrence of unintentional transboundary movements that are likely to have significant adverse effects on biological diversity (Article 17, paragraph 1)",
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
      key: "Q126_h",
      section: "Article20",
      number: "126h",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nIllegal transboundary movements of LMOs (Article 25, paragraph 3)",
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
      key: "Q126_i",
      section: "Article20",
      number: "126i",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nFinal decisions regarding the importation or release of LMOs (i.e. approval or prohibition, any conditions, requests for further information, extensions granted, reasons for decision) (Articles 10, paragraph 3 and 20, paragraph 3(d))",
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
      key: "Q126_j",
      section: "Article20",
      number: "126j",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nInformation on the application of domestic regulations to specific imports of LMOs (Article 14, paragraph 4)",
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
      key: "Q126_k",
      section: "Article20",
      number: "126k",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nFinal decisions regarding the domestic use of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing (Article 11, paragraph 1)",
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
      key: "Q126_l",
      section: "Article20",
      number: "126l",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nFinal decisions regarding the import of LMOs intended for direct use as food or feed, or for processing that are taken under domestic regulatory frameworks (Article 11, paragraph 4) or in accordance with annex III (Article 11, paragraph 6) (requirement of Article 20, paragraph 3(d))",
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
      key: "Q126_m",
      section: "Article20",
      number: "126m",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nDeclarations regarding the framework to be used for LMOs intended for direct use as food or feed, or for processing (Article 11, paragraph 6)",
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
      key: "Q126_n",
      section: "Article20",
      number: "126n",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nReview and change of decisions regarding intentional transboundary movements of LMOs (Article 12, paragraph 1)",
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
      key: "Q126_o",
      section: "Article20",
      number: "126o",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nLMOs granted exemption status by each Party (Article 13, paragraph 1)",
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
      key: "Q126_p",
      section: "Article20",
      number: "126p",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nCases where intentional transboundary movement may take place at the same time as the movement is notified to the Party of import (Article 13, paragraph 1)",
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
      key: "Q126_q",
      section: "Article20",
      number: "126q",
      type: "option",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.\r\nSummaries of risk assessments or environmental reviews of LMOs generated by regulatory processes and relevant information regarding products thereof (Article 20, paragraph 3 (c))",
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
      key: "Q127",
      section: "Article20",
      number: "127",
      type: "option",
      title: "Has your country established a mechanism for strengthening the capacity of the BCH National Focal Point to perform its administrative functions?",
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
      key: "Q128",
      section: "Article20",
      number: "128",
      type: "option",
      title: "Has your country established a mechanism for the coordination among the BCH National Focal Point, the Cartagena Protocol focal point, and the competent national authority(ies) for making information available to the BCH?",
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
      key: "Q129",
      section: "Article20",
      number: "129",
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
      key: "Q130",
      section: "Article20",
      number: "130",
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
      key: "Q131",
      section: "Article20",
      number: "131",
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
      key: "Q132",
      section: "Article20",
      number: "132",
      type: "option",
      title: "Please indicate the number of regional, national and international events organized in relation to biosafety (e.g. seminars, workshops, press conferences, educational events, etc.,) in the last 2 years:",
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
      key: "Q133",
      section: "Article20",
      number: "133",
      type: "option",
      title: "Please indicate the number of biosafety related publications that has been made available in your country in the last year:",
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
      key: "Q134",
      section: "Article20",
      number: "134",
      type: "term",
      title: "If biosafety related publications were made available (see question above), please indicate which modalities were preferred:",
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
      key: "Q135",
      section: "Article20",
      number: "135",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 20 in your country",
      multiple: false
    }]
  }, {
    key: "Article21",
    title: "Article 21 – Confidential information",
    questions: [{
      key: "Q136",
      section: "Article21",
      number: "136",
      type: "option",
      title: "Has your country established procedures to protect confidential information received under the Protocol?",
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
      key: "Q137",
      section: "Article21",
      number: "137",
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
      key: "Q138",
      section: "Article21",
      number: "138",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 21 in your country",
      multiple: false
    }]
  }, {
    key: "Article22",
    title: "Article 22 – Capacity-building",
    questions: [{
      key: "Q139",
      section: "Article22",
      number: "139",
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
      key: "Q140",
      section: "Article22",
      number: "140",
      type: "option",
      title: "Has your country received external support or benefited from collaborative activities with other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
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
      key: "Q141",
      section: "Article22",
      number: "141",
      type: "option",
      title: "If you answered Yes to question 140, how were these resources made available?",
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
      key: "Q142",
      section: "Article22",
      number: "142",
      type: "option",
      title: "Has your country provided support to other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
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
      key: "Q143",
      section: "Article22",
      number: "143",
      type: "option",
      title: "If you answered Yes to question 142, how were these resources made available?",
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
      key: "Q144",
      section: "Article22",
      number: "144",
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
      key: "Q145",
      section: "Article22",
      number: "145",
      type: "option",
      title: "If you answered Yes to question 144, how would you characterize the process?",
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
      key: "Q146",
      section: "Article22",
      number: "146",
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
      key: "Q147",
      section: "Article22",
      number: "147",
      type: "option",
      title: "During the current reporting period, has your country undertaken activities for the development and/or strengthening of human resources and institutional capacities in biosafety?",
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
      key: "Q148",
      section: "Article22",
      number: "148",
      type: "term",
      title: "If you answered Yes to question 147, in which of the following areas were these activities undertaken?",
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
      key: "Q149",
      section: "Article22",
      number: "149",
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
      key: "Q150",
      section: "Article22",
      number: "150",
      type: "option",
      title: "If you answered Yes to question 149, has this information been submitted to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q151",
      section: "Article22",
      number: "151",
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
      key: "Q152",
      section: "Article22",
      number: "152",
      type: "term",
      title: "If you answered Yes to question 151, indicate which of the following areas still need capacity-building.",
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
      key: "Q153",
      section: "Article22",
      number: "153",
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
      key: "Q154",
      section: "Article22",
      number: "154",
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
      key: "Q155",
      section: "Article22",
      number: "155",
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
      key: "Q156",
      section: "Article22",
      number: "156",
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
      key: "Q157",
      section: "Article22",
      number: "157",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 22 in your country, including further details about your experience in accessing GEF funds",
      multiple: false
    }]
  }, {
    key: "Article23",
    title: "Article 23 – Public awareness and participation",
    questions: [{
      key: "Q158",
      section: "Article23",
      number: "158",
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
      key: "Q159",
      section: "Article23",
      number: "159",
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
      key: "Q160",
      section: "Article23",
      number: "160",
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
      key: "Q161",
      section: "Article23",
      number: "161",
      type: "text",
      title: "If you answered Yes to question 160, please indicate what entity is responsible for carrying out the programmes and/or services and at which level the programmes take place (e.g. local, national, etc.):",
      multiple: false
    }, {
      key: "Q162",
      section: "Article23",
      number: "162",
      type: "option",
      title: "Has your country established a biosafety website searchable archives, national resource centres or sections in existing national libraries dedicated to biosafety educational materials?",
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
      section: "Article23",
      number: "163",
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
      key: "Q164",
      section: "Article23",
      number: "164",
      type: "option",
      title: "Has your country established a mechanism to ensure public access to information on living modified organisms that may be imported?",
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
      key: "Q165",
      section: "Article23",
      number: "165",
      type: "option",
      title: "Has your country established a mechanism to consult the public in the decision-making process regarding LMOs?",
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
      key: "Q166",
      section: "Article23",
      number: "166",
      type: "option",
      title: "Has your country established a mechanism to make available to the public the results of decisions taken on LMOs?",
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
      key: "Q167",
      section: "Article23",
      number: "167",
      type: "option",
      title: "Has your country informed the public about existing modalities for public participation in the decision-making process regarding living modified organisms?",
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
      key: "Q168",
      section: "Article23",
      number: "168",
      type: "term",
      title: "If you answered Yes to question 167, please indicate the modalities used to inform the public:",
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
      key: "Q169",
      section: "Article23",
      number: "169",
      type: "term",
      title: "If you indicated more than one modality for public participation in question 168, which one was most used?",
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
      key: "Q170",
      section: "Article23",
      number: "170",
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
      key: "Q171",
      section: "Article23",
      number: "171",
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
      key: "Q172",
      section: "Article23",
      number: "172",
      type: "option",
      title: "Please indicate the number of educational materials and/or online modules on biosafety that are available and accessible to the public in your country:",
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
      key: "Q173",
      section: "Article23",
      number: "173",
      type: "option",
      title: "In the current reporting period, has your country promoted and facilitated public awareness, education and participation concerning the safe transfer, handling and use of LMOs?",
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
      key: "Q174",
      section: "Article23",
      number: "174",
      type: "option",
      title: "If you answered Yes to question 173, has your country cooperated with other States and international bodies?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q175",
      section: "Article23",
      number: "175",
      type: "option",
      title: "In the current reporting period, how many times has your country consulted the public in the decision-making process regarding LMOs and made the results of such decisions available to the public?",
      multiple: false,
      options: [{
        value: "0",
        title: "Never"
      }, {
        value: "5-",
        title: "Less than 5"
      }, {
        value: "5+",
        title: "More than 5"
      }, {
        value: "n/a",
        title: "Not applicable"
      }]
    }, {
      key: "Q176",
      section: "Article23",
      number: "176",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 23 in your country",
      multiple: false
    }]
  }, {
    key: "Article24",
    title: "Article 24 – Non-Parties",
    questions: [{
      key: "Q177",
      section: "Article24",
      number: "177",
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
      key: "Q178",
      section: "Article24",
      number: "178",
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
      key: "Q179",
      section: "Article24",
      number: "179",
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
      key: "Q180",
      section: "Article24",
      number: "180",
      type: "option",
      title: "If you answered Yes to questions 178 or 179, were the transboundary movements of LMOs consistent with the objective of the Cartagena Protocol on Biosafety?",
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
      key: "Q181",
      section: "Article24",
      number: "181",
      type: "option",
      title: "If you answered Yes to questions 178 or 179, was information about these transboundary movements submitted to the BCH?",
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
      key: "Q182",
      section: "Article24",
      number: "182",
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
      key: "Q183",
      section: "Article24",
      number: "183",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 24 in your country:",
      multiple: false
    }]
  }, {
    key: "Article25",
    title: "Article 25 – Illegal transboundary movements",
    questions: [{
      key: "Q184",
      section: "Article25",
      number: "184",
      type: "option",
      title: "Has your country adopted domestic measures aimed at preventing and/or penalizing transboundary movements of LMOs carried out in contravention of its domestic measures to implement this Protocol?",
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
      key: "Q185",
      section: "Article25",
      number: "185",
      type: "option",
      title: "Has your country established a strategy for detecting illegal transboundary movements of LMOs?",
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
      key: "Q186",
      section: "Article25",
      number: "186",
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
      key: "Q187",
      section: "Article25",
      number: "187",
      type: "option",
      title: "If your country received information concerning cases of illegal transboundary movements of an LMO in the current reporting period, has your country informed the BCH and the other Party(ies) involved?",
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
      key: "Q188",
      section: "Article25",
      number: "188",
      type: "option",
      title: "If your country received information concerning cases of illegal transboundary movements of an LMO in the current reporting period, has your country established the origin of the LMO(s)?",
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
      key: "Q189",
      section: "Article25",
      number: "189",
      type: "option",
      title: "If your country received information concerning cases of illegal transboundary movements of an LMO in the current reporting period, has your country established the nature of the LMO(s)?",
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
      key: "Q190",
      section: "Article25",
      number: "190",
      type: "option",
      title: "If your country received information concerning cases of illegal transboundary movements of an LMO in the current reporting period, has your country established the circumstances of the illegal transboundary movement(s)?",
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
      key: "Q191",
      section: "Article25",
      number: "191",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 25 in your country",
      multiple: false
    }]
  }, {
    key: "Article26",
    title: "Article 26 – Socio-economic considerations",
    questions: [{
      key: "Q192",
      section: "Article26",
      number: "192",
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
      key: "Q193",
      section: "Article26",
      number: "193",
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
      key: "Q194",
      section: "Article26",
      number: "194",
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
      key: "Q195",
      section: "Article26",
      number: "195",
      type: "text",
      title: "What is your country's experience, if any, in taking socio-economic considerations into account in LMO decision making? Please give details:",
      multiple: false
    }, {
      key: "Q196",
      section: "Article26",
      number: "196",
      type: "option",
      title: "Has your country cooperated with other Parties on research and information exchange on any socio-economic impacts of LMOs?",
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
      key: "Q197",
      section: "Article26",
      number: "197",
      type: "text",
      title: "Here you may provide further details on the implementation of Article 26 in your country",
      multiple: false
    }]
  }, {
    key: "Article27",
    title: "Article 27 – Liability and Redress",
    questions: [{
      key: "Q198",
      section: "Article27",
      number: "198",
      type: "option",
      title: "Has your country ratified or acceded to the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q199",
      section: "Article27",
      number: "199",
      type: "option",
      title: "If you answered No to question 198, is there any national process in place towards becoming a Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q200",
      section: "Article27",
      number: "200",
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
      key: "Q201",
      section: "Article27",
      number: "201",
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
      key: "Q202",
      section: "Article27",
      number: "202",
      type: "text",
      title: "Here you may provide further details on any activities undertaken in your country towards the implementation of the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress",
      multiple: false
    }]
  }, {
    key: "Article28",
    title: "Article 28 – Financial Mechanism and Resources",
    questions: [{
      key: "Q203",
      section: "Article28",
      number: "203",
      type: "option",
      title: "How much additional funding (in the equivalent of US dollars) has your country mobilized in the last four years to support implementation of the Biosafety Protocol, beyond the regular national budgetary allocation?",
      multiple: false,
      options: [{
        value: "USD5000000+",
        title: "5,000,000 USD or more"
      }, {
        value: "USD1000000+",
        title: "1,000,000 USD or more"
      }, {
        value: "USD500000+",
        title: "500,000 USD or more"
      }, {
        value: "USD100000+",
        title: "100,000 USD or more"
      }, {
        value: "USD50000+",
        title: "50,000 USD or more"
      }, {
        value: "USD5000+",
        title: "5,000 USD or more"
      }, {
        value: "USD5000-",
        title: "Less than 5,000 USD"
      }]
    }]
  }, {
    key: "Article33",
    title: "Article 33 – Monitoring and reporting",
    questions: [{
      key: "Q204_a",
      section: "Article33",
      number: "204a",
      type: "option",
      title: "Does your country have in place a monitoring and/or an enforcement system for the implementation of the Cartagena Protocol?\r\nMonitoring system:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q204_b",
      section: "Article33",
      number: "204b",
      type: "option",
      title: "Does your country have in place a monitoring and/or an enforcement system for the implementation of the Cartagena Protocol?\r\nEnforcement system:",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q205",
      section: "Article33",
      number: "205",
      type: "option",
      title: "Has your country submitted all the previous due National Reports?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q206",
      section: "Article33",
      number: "206",
      type: "term",
      title: "If you answered No to question 205, indicate the main challenges that hindered the submission:",
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
      key: "Q207",
      section: "AdditionalInformation",
      number: "207",
      type: "text",
      title: "Please use this field to provide any other information on issues related to national implementation of the Protocol, including any obstacles or impediments encountered.",
      multiple: false
    }]
  }, {
    key: "Comments",
    title: "Comments on reporting format",
    questions: [{
      key: "Q208",
      section: "Comments",
      number: "208",
      type: "text",
      title: "Please use this field to provide any other information on difficulties that you have encountered in filling in this report",
      multiple: false
    }]
  }];
  return cpbNationalReport3;
});