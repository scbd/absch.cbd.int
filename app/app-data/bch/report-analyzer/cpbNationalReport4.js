define(function () {
  'use strict';

  var cpbNationalReport4 = [{
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
      }],
      validations: [{
        question: "Q012_partyInProgress",
        values: ["false"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q013",
        values: ["false"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q012_partyInProgress",
      section: "General",
      number: "12",
      type: "option",
      title: "If your country is not a Party to the Cartagena Protocol on Biosafety (CPB), is there any national process in place towards becoming a Party?",
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
      type: "lstring",
      title: "Here you may provide further details",
      multiple: false
    }]
  }, {
    key: "Article2",
    title: "Article 2 – General provisions",
    description: "<i>Article 2 requires each Party to take the necessary and appropriate legal, administrative and other measures to implement its obligations under the Protocol</i>",
    questions: [{
      key: "Q014",
      section: "Article2",
      number: "14",
      type: "option",
      title: "Has your country introduced the necessary national measures for the implementation of the Protocol?",
      multiple: false,
      options: [{
        value: "implementation.fullInPlace",
        title: "National measures are fully in place"
      }, {
        value: "implementation.partiallyInPlace",
        title: "National measures are partially in place"
      }, {
        value: "implementation.temporaryMeasures",
        title: "Only temporary measures have been introduced"
      }, {
        value: "implementation.draftMeasures",
        title: "Only draft measures exist"
      }, {
        value: "implementation.none",
        title: "No measures have yet been taken"
      }],
      mandatory: true
    }, {
      key: "Q015",
      section: "Article2",
      number: "15",
      type: "option",
      title: "Which specific instruments are in place for the implementation of national biosafety measures? (select all that apply)",
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
      key: "Q016",
      section: "Article2",
      number: "16",
      type: "option",
      title: "Has your country undertaken initiatives to mainstream biosafety into national biodiversity strategies and action plans, other policies, or legislation?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }, {
        value: "false.other",
        title: "Other",
        type: "lstring"
      }]
    }, {
      key: "Q017",
      section: "Article2",
      number: "17",
      type: "option",
      title: "Has your country established a mechanism for budget allocations for the operation of its national biosafety measures?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q018",
      section: "Article2",
      number: "18",
      type: "option",
      title: "Does your country have permanent staff to administer functions directly related to biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q019",
        type: "@hasValues",
        values: ["true"],
        trigger: "enable"
      }]
    }, {
      key: "Q019",
      section: "Article2",
      number: "19",
      type: "option",
      title: "If you answered <i>Yes</i> to question 18, how many permanent staff members are in place whose functions are directly related to  biosafety ? ",
      multiple: false,
      options: [{
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      validations: [{
        question: "Q019_adq",
        type: "@hasValues",
        trigger: "visible"
      }]
    }, {
      key: "Q019_adq",
      section: "Article2",
      number: "",
      type: "option",
      title: "Is this number adequate",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q020",
      section: "Article2",
      number: "20",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 2 in your country",
      multiple: false
    }]
  }, {
    key: "Article5",
    title: "Article 5 - Pharmaceuticals",
    questions: [{
      key: "Q021",
      section: "Article5",
      number: "21",
      type: "option",
      title: "Does your country regulate the transboundary movement, handling or use of living modified organisms (LMOs) which are pharmaceuticals to humans?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q022",
      section: "Article5",
      number: "22",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 5 in your country",
      multiple: false
    }]
  }, {
    key: "Article6",
    title: "Article 6 – Transit and Contained use",
    questions: [{
      key: "Q023",
      section: "Article6",
      number: "23",
      type: "option",
      title: "Does your country regulate the transit of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q024",
      section: "Article6",
      number: "24",
      type: "option",
      title: "Does your country regulate the contained use of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q025",
      section: "Article6",
      number: "25",
      type: "option",
      title: "Has your country taken a decision concerning the import of LMOs for contained use?",
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
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 6 in your country",
      multiple: false
    }]
  }, {
    key: "Articles7-10",
    title: "Articles 7 to 10 – Advance Informed Agreement (AIA) and intentional introduction of LMOs into the environment",
    questions: [{
      key: "Q027",
      section: "Articles7-10",
      number: "27",
      type: "option",
      title: "Has your country established legal requirements for exporters under its jurisdiction to notify in writing the competent national authority of the Party of import prior to the intentional transboundary movement of an LMO that falls within the scope of the AIA procedure?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q028",
      section: "Articles7-10",
      number: "28",
      type: "option",
      title: "When acting as the Party of export, has your country established legal requirements for the accuracy of information contained in the notification provided by the exporter?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }, {
        value: "false.notApplicable",
        title: "Not applicable (Party currently not exporting LMOs)"
      }],
      mandatory: true
    }, {
      key: "Q029",
      section: "Articles7-10",
      number: "29",
      type: "option",
      title: "In the current reporting period, has your country received a notification regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q030",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q031",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        baseQuestion: "Q032",
        question: "Q032_a",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        baseQuestion: "Q032",
        question: "Q032_b",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q030",
      section: "Articles7-10",
      number: "30",
      type: "option",
      title: "If you answered <i>Yes</i> to question 29, did the notification(s) contain complete information (at a minimum the information specified in Annex I to the Cartagena Protocol on Biosafety)?",
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
      }],
      mandatory: true
    }, {
      key: "Q031",
      section: "Articles7-10",
      number: "31",
      type: "option",
      title: "If you answered <i>Yes</i> to question 29, has your country acknowledged receipt of the notification(s) to the notifier within ninety days of receipt?",
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
      }],
      mandatory: true
    }, {
      key: "Q032",
      section: "Articles7-10",
      number: "32",
      type: "sub-section",
      title: "If you answered <i>Yes</i> to question 29, has your country informed of its decision(s)",
      multiple: false,
      questions: [{
        key: "Q032_a",
        section: "Articles7-10",
        number: "a",
        type: "option",
        title: "The notifier?",
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
        }],
        mandatory: true
      }, {
        key: "Q032_b",
        section: "Articles7-10",
        number: "b",
        type: "option",
        title: "The Biosafety Clearing-House (BCH)?",
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
        }],
        mandatory: true
      }]
    }, {
      key: "Q033",
      section: "Articles7-10",
      number: "33",
      type: "option",
      title: "In the current reporting period, has your country taken a decision in response to the notification(s) regarding intentional transboundary movements of LMOs for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q034",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q036",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q034",
      section: "Articles7-10",
      number: "34",
      type: "option",
      title: "If you answered <i>Yes</i> to question 33, how many LMOs has your country approved for import for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true,
      validations: [{
        question: "Q035",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q035",
      section: "Articles7-10",
      number: "35",
      type: "option",
      title: "If you answered <i>under question 34</i> that <i>LMOs were approved</i>, have all these LMOs actually been imported into your country?",
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
      }],
      mandatory: true
    }, {
      key: "Q036",
      section: "Articles7-10",
      number: "36",
      type: "option",
      title: "If you answered <i>Yes</i> to question 33, what percentage of your country’s decisions fall into the following categories? (select all that apply)",
      multiple: true,
      options: [{
        value: "3B9ECE67-B35C-40FF-8C06-4EA5FF762899",
        title: "Approval of the import/use of the LMO(s) without conditions",
        type: "int"
      }, {
        value: "3EFF4792-A896-4DC7-9945-04FE9C8B5B4F",
        title: "Approval of the import/use of the LMO(s) with conditions",
        type: "int"
      }, {
        value: "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE",
        title: "Prohibition of the import/use of the LMO(s)",
        type: "int"
      }, {
        value: "8D91ACEE-C6B3-4204-8FE6-00AE424013FF",
        title: "Request for additional relevant information",
        type: "int"
      }, {
        value: "19F9F13E-195E-45B5-88DD-058A07E0D6F6",
        title: "Inform the notifier that the period for communicating the decision has been extended",
        type: "int"
      }],
      validations: [{
        question: "Q037",
        values: ["3EFF4792-A896-4DC7-9945-04FE9C8B5B4F", "6DD1B161-4CDB-4900-BD31-DBB97E86B2AE"],
        type: "@hasAdditionalValues",
        trigger: "enable"
      }],
      customValuePlaceholder: "%"
    }, {
      key: "Q037",
      section: "Articles7-10",
      number: "37",
      type: "option",
      title: "If you answered <i>under question 36</i> that your country has taken a decision to <i>approve the import with conditions</i> or to <i>prohibit the import</i>, were the reasons provided?",
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
      }],
      mandatory: true
    }, {
      key: "Q038",
      section: "Articles7-10",
      number: "38",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Articles 7 to 10 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs for intentional introduction to the environment",
      multiple: false
    }]
  }, {
    key: "Article11",
    title: "Article 11 – Procedure for living modified organisms intended for direct use as food or feed, or for processing (LMOs-FFP)",
    questions: [{
      key: "Q039",
      section: "Article11",
      number: "39",
      type: "option",
      title: "Does your country have law(s), regulation(s) or administrative measures for decision-making regarding domestic use, including placing on the market, of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q040",
      section: "Article11",
      number: "40",
      type: "option",
      title: "Has your country established legal requirements for the accuracy of information to be provided by the applicant regarding the domestic use, including placing on the market, of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q041",
      section: "Article11",
      number: "41",
      type: "option",
      title: "In the current reporting period, how many decisions has your country taken <u>regarding domestic use</u>, including placing on the market, of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true
    }, {
      key: "Q042",
      section: "Article11",
      number: "42",
      type: "option",
      title: "Does your country have law(s), regulation(s) or administrative measures for decision-making regarding the import of LMOs for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q043",
      section: "Article11",
      number: "43",
      type: "option",
      title: "In the current reporting period, how many decisions has your country taken <u>regarding the import</u> of LMOs for direct use as food or feed, or for processing?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true
    }, {
      key: "Q044",
      section: "Article11",
      number: "44",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 11 in your country, including measures in case of lack of scientific certainty on potential adverse effects of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing",
      multiple: false
    }]
  }, {
    key: "Article12",
    title: "Article 12 – Review of decision",
    questions: [{
      key: "Q045",
      section: "Article12",
      number: "45",
      type: "option",
      title: "Has your country established a mechanism for the review and change of a decision regarding an intentional transboundary movement of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q046",
      section: "Article12",
      number: "46",
      type: "option",
      title: "In the current reporting period, has your country reviewed and/or changed a decision regarding an intentional transboundary movement of an LMO?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q047",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q048",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q050",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q047",
      section: "Article12",
      number: "47",
      type: "option",
      title: "If you answered <i>Yes</i> to question 46, how many decisions were reviewed and/or changed?",
      multiple: false,
      options: [{
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true
    }, {
      key: "Q048",
      section: "Article12",
      number: "48",
      type: "option",
      title: "If you answered <i>Yes</i> to question 46, were any of the reviews triggered by a request from the Party of export or the notifier?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q049",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }],
      mandatory: true
    }, {
      key: "Q049",
      section: "Article12",
      number: "49",
      type: "option",
      title: "If you answered <i>Yes</i> to question 48, did your country provide a response within ninety days setting out the reasons for the decision?",
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
      }],
      mandatory: true
    }, {
      key: "Q050",
      section: "Article12",
      number: "50",
      type: "option",
      title: "If you answered <i>Yes</i> to question 46, were any of the reviews initiated by your country as the Party of import?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        baseQuestion: "Q051",
        question: "Q051_a",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        baseQuestion: "Q051",
        question: "Q051_b",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }],
      mandatory: true
    }, {
      key: "Q051",
      section: "Articles12",
      number: "51",
      type: "sub-section",
      title: "If you answered <i>Yes</i> to question 50, did your country, within thirty days, set out the reasons for the decision and inform",
      multiple: false,
      questions: [{
        key: "Q051_a",
        section: "Article12",
        number: "a",
        type: "option",
        title: "The notifier",
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
        }],
        mandatory: true
      }, {
        key: "Q051_b",
        section: "Article12",
        number: "b",
        type: "option",
        title: "The BCH?",
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
        }],
        mandatory: true
      }]
    }, {
      key: "Q052",
      section: "Article12",
      number: "52",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 12 in your country",
      multiple: false
    }]
  }, {
    key: "Article13",
    title: "Article 13 – Simplified procedure",
    questions: [{
      key: "Q053",
      section: "Article13",
      number: "53",
      type: "option",
      title: "Has your country established a mechanism for the application of the simplified procedure regarding an intentional transboundary movement of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q054",
      section: "Article13",
      number: "54",
      type: "option",
      title: "In the current reporting period, has your country applied the simplified procedure?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q055",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q056",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q055",
      section: "Article13",
      number: "55",
      type: "option",
      title: "If you answered <i>Yes</i> to question 54, for how many LMOs has your country applied the simplified procedure?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 5"
      }, {
        value: "5+",
        title: "5 or more"
      }],
      mandatory: true
    }, {
      key: "Q056",
      section: "Article13",
      number: "56",
      type: "option",
      title: "If you answered <i>Yes</i> to question 54, has your country informed the Parties through the BCH of the cases where the simplified procedure was applied?",
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
      }],
      mandatory: true
    }, {
      key: "Q057",
      section: "Article13",
      number: "57",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 13 in your country",
      multiple: false
    }]
  }, {
    key: "Article14",
    title: "Article 14 – Bilateral, regional and multilateral agreements and arrangements",
    questions: [{
      key: "Q058",
      section: "Article14",
      number: "58",
      type: "option",
      title: "How many bilateral, regional or multilateral agreements or arrangements relevant to biosafety has your country established with other Parties/non-Parties?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true,
      validations: [{
        question: "Q059",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q059",
      section: "Article14",
      number: "59",
      type: "lstring",
      title: "If you answered <i>under question 58</i> that <i>agreements or arrangements were established</i>, please provide a brief description of their scope and objective",
      multiple: false,
      mandatory: true
    }, {
      key: "Q060",
      section: "Article14",
      number: "60",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 14 in your country",
      multiple: false
    }]
  }, {
    key: "Article15_16",
    title: "Articles 15 & 16 – Risk Assessment and Risk Management",
    questions: [{
      key: "Q061",
      section: "Article15_16",
      number: "61",
      type: "option",
      title: "Does the domestic regulatory framework of your country require risk assessments of LMOs to be conducted?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q062",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q062",
      section: "Article15_16",
      number: "62",
      type: "option",
      title: "If you answered <i>Yes</i> to question 61, with regard to which LMOs does the requirement apply (select all that apply)?",
      multiple: true,
      options: [{
        value: "014054D1-2B72-7ABD-E615-D0A374590A95",
        title: "For imports of LMOs for intentional introduction into the environment"
      }, {
        value: "94C9FDC9-49C0-7F7C-9A36-90571DBA6442",
        title: "For imports of LMOs intended for direct use as food or feed, or for processing"
      }, {
        value: "29B97F6B-066E-BE64-0FA3-66060DEE737D",
        title: "For decisions regarding domestic use, including placing on the market, of LMOs that may be subject to transboundary movements for direct use as food or feed, or for processing"
      }, {
        value: "2314EDF6-3B1D-D44D-253D-18B14EFC5C67",
        title: "For imports of LMOs for contained use"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q063",
      section: "Article15_16",
      number: "63",
      type: "option",
      title: "Has your country established a mechanism to conduct risk assessments prior to taking decisions regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q064",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q064",
      section: "Article15_16",
      number: "64",
      type: "option",
      title: "If you answered <i>Yes</i> to question 63, does the mechanism include procedures to identify and/or train national experts to conduct risk assessments?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "legend15_16",
      section: "Article15_16",
      number: "",
      type: "legend",
      title: "<i>Capacity-building in risk assessment or risk management</i>"
    }, {
      key: "Q065",
      section: "Articles12",
      number: "65",
      type: "sub-section",
      title: "How many people in your country have been trained in risk assessment, risk management and monitoring of LMOs?",
      multiple: false,
      questions: [{
        key: "Q065_a",
        section: "Article15_16",
        number: "a",
        type: "option",
        title: "Risk assessment",
        multiple: false,
        options: [{
          value: "0",
          title: "None"
        }, {
          value: "1+",
          title: "1 to 9"
        }, {
          value: "10+",
          title: "10 to 49"
        }, {
          value: "50+",
          title: "50 to 99"
        }, {
          value: "100+",
          title: "100 or more"
        }],
        validations: [{
          baseQuestion: "Q065",
          question: "Q065_a_adq",
          values: ["0"],
          type: "@hasValuesExcept",
          trigger: "visible"
        }],
        mandatory: true
      }, {
        key: "Q065_a_adq",
        section: "Article15_16",
        number: "",
        type: "option",
        title: "Is this number adequate",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }, {
        key: "Q065_b",
        section: "Article15_16",
        number: "b",
        type: "option",
        title: "Risk management",
        multiple: false,
        options: [{
          value: "0",
          title: "None"
        }, {
          value: "1+",
          title: "1 to 9"
        }, {
          value: "10+",
          title: "10 to 49"
        }, {
          value: "50+",
          title: "50 to 99"
        }, {
          value: "100+",
          title: "100 or more"
        }],
        validations: [{
          baseQuestion: "Q065",
          question: "Q065_b_adq",
          values: ["0"],
          type: "@hasValuesExcept",
          trigger: "visible"
        }],
        mandatory: true
      }, {
        key: "Q065_b_adq",
        section: "Article2",
        number: "",
        type: "option",
        title: "Is this number adequate",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }, {
        key: "Q065_c",
        section: "Article15_16",
        number: "c",
        type: "option",
        title: "Monitoring",
        multiple: false,
        options: [{
          value: "0",
          title: "None"
        }, {
          value: "1+",
          title: "1 to 9"
        }, {
          value: "10+",
          title: "10 to 49"
        }, {
          value: "50+",
          title: "50 to 99"
        }, {
          value: "100+",
          title: "100 or more"
        }],
        validations: [{
          baseQuestion: "Q065",
          question: "Q065_c_adq",
          values: ["0"],
          type: "@hasValuesExcept",
          trigger: "visible"
        }],
        mandatory: true
      }, {
        key: "Q065_c_adq",
        section: "Article2",
        number: "",
        type: "option",
        title: "Is this number adequate",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }]
    }, {
      key: "Q066",
      section: "Article15_16",
      number: "66",
      type: "option",
      title: "Is your country using training material and/or technical guidance for training in risk assessment and risk management of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q067",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q068",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q067",
      section: "Article15_16",
      number: "67",
      type: "option",
      title: "If you answered <i>Yes</i> to question 66, is your country using the “Manual on Risk Assessment of LMOs” (developed by the CBD Secretariat) for training in risk assessment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q068",
      section: "Article15_16",
      number: "68",
      type: "option",
      title: "If you answered <i>Yes</i> to question 66, is your country using the “Guidance on Risk Assessment of LMOs” (developed by the Online Forum and the AHTEG on Risk Assessment and Risk Management) for training in risk assessment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q069",
      section: "Article15_16",
      number: "69",
      type: "option",
      title: "Does your country have specific needs for further guidance on specific topics of risk assessment of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q070",
      section: "Article15_16",
      number: "70",
      type: "sub-section",
      title: "Does your country have the capacity to detect, identify, assess the risk of and/or monitor living modified organisms or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity, taking into account risks to human health?",
      multiple: false,
      questions: [{
        key: "Q070_a",
        section: "Article15_16",
        number: "a",
        type: "option",
        title: "Detect",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }, {
        key: "Q070_b",
        section: "Article15_16",
        number: "b",
        type: "option",
        title: "Identify",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }, {
        key: "Q070_c",
        section: "Article15_16",
        number: "c",
        type: "option",
        title: "Assess the risk",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }, {
        key: "Q070_d",
        section: "Article15_16",
        number: "d",
        type: "option",
        title: "Monitor",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }]
      }]
    }, {
      key: "legend71_84",
      section: "Article15_16",
      number: "",
      type: "legend",
      title: "<i>Conducting risk assessment or risk management</i>"
    }, {
      key: "Q071",
      section: "Article15_16",
      number: "71",
      type: "sub-section",
      title: "Has your country adopted or used any guidance documents for the purpose of conducting risk assessment or risk management, or for evaluating risk assessment reports submitted by notifiers?",
      multiple: false,
      questions: [{
        key: "Q071_a",
        section: "Article15_16",
        number: "a",
        type: "option",
        title: "Risk assessment",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }],
        mandatory: true,
        validations: [{
          question: "Q072",
          type: "&is71aOr71b",
          trigger: "enable"
        }]
      }, {
        key: "Q071_b",
        section: "Article15_16",
        number: "b",
        type: "option",
        title: "Risk management",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }],
        mandatory: true,
        validations: [{
          question: "Q072",
          type: "&is71aOr71b",
          trigger: "enable"
        }]
      }]
    }, {
      key: "Q072",
      section: "Article15_16",
      number: "72",
      type: "option",
      title: "If you answered <i>Yes</i> to question 71, is your country using the “Guidance on Risk Assessment of LMOs” (developed by the Online Forum and the AHTEG on Risk Assessment and Risk Management) for conducting  risk assessment or risk management, or for evaluating risk assessment reports submitted by notifiers?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q073",
      section: "Article15_16",
      number: "73",
      type: "option",
      title: "Has your country adopted common approaches or methodologies to risk assessment in coordination with other countries?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q074",
      section: "Article15_16",
      number: "74",
      type: "option",
      title: "Has your country cooperated with other Parties with a view to identifying LMOs or specific traits that may have adverse effects on the conservation and sustainable use of biological diversity?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q075",
      section: "Article15_16",
      number: "75",
      type: "option",
      title: "In the current reporting period, has your country conducted any kind of risk assessment of LMOs, including for contained use, field trials, commercial purposes, direct use as food, feed, or for processing?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q076",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q077",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }, {
        question: "Q078",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q076",
      section: "Article15_16",
      number: "76",
      type: "option",
      title: "If you answered <i>Yes</i> to question 75, how many risk assessments were conducted?",
      multiple: false,
      options: [{
        value: "1+",
        title: "1 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 to 99"
      }, {
        value: "100+",
        title: "100 or more"
      }]
    }, {
      key: "Q077",
      section: "Article15_16",
      number: "77",
      type: "term",
      title: "If you answered <i>Yes</i> to question 75, please indicate the scope of the risk assessments (select all that apply)",
      multiple: true,
      options: [{
        value: "42A3DCAE-5FD8-4218-941D-DF11D4AE65FA",
        title: "LMOs for contained use (in accordance with Article 3)"
      }, {
        value: "D6B59E8A-D82C-4516-917A-A745ACDA5931",
        title: "LMOs for intentional introduction into the environment for experimental testing or field trials"
      }, {
        value: "015737FC-ABC2-460C-A099-06A1B01E649A",
        title: "LMOs for intentional introduction into the environment for commercial purposes"
      }, {
        value: "91BEAF12-ABE1-4294-AD3B-507935894C78",
        title: "LMOs for direct use as food"
      }, {
        value: "1D96153B-1625-44E4-AD5E-D26429044B29",
        title: "LMOs for direct use as feed"
      }, {
        value: "6430E4F4-9E5F-48BE-B4ED-9E1A4FED981E",
        title: "LMOs for processing"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }]
    }, {
      key: "Q078",
      section: "Article15_16",
      number: "78",
      type: "option",
      title: "If you answered <i>Yes</i> to question 75, were risk assessments conducted for all decisions taken on LMOs for intentional introduction into the environment or on domestic use of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing?",
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
      }],
      mandatory: true
    }, {
      key: "Q079",
      section: "Article15_16",
      number: "79",
      type: "option",
      title: "Has your country established appropriate mechanisms, measures and strategies to regulate and manage risks identified in the risk assessment of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q080",
      section: "Article15_16",
      number: "80",
      type: "option",
      title: "Has your country taken appropriate measures to prevent unintentional transboundary movements of LMOs, including such measures as requiring a risk assessment to be carried out prior to the first release of a LMO?",
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
      title: "Has your country taken measures to ensure that any LMO, whether imported or locally developed, undergoes an appropriate period of observation that is commensurate with its life-cycle or generation time before it is put to its intended use?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q082",
      section: "Article15_16",
      number: "82",
      type: "option",
      title: "Has your country established a mechanism for monitoring potential effects of LMOs released into the environment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q083",
      section: "Article15_16",
      number: "83",
      type: "option",
      title: "Does your country have the necessary infrastructure (e.g. laboratory facilities) for monitoring or managing LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q084",
      section: "Article15_16",
      number: "84",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Articles 15 and 16 in your country",
      multiple: false
    }]
  }, {
    key: "Article17",
    title: "Article 17 – Unintentional transboundary movements<sup>2</sup>  and emergency measures",
    footnote: "<sup>2</sup> In accordance with the operational definition adopted in decision CP-VIII/16, “‘Unintentional transboundary movement’ is a transboundary movement of a living modified organism that has inadvertently crossed the national borders of a Party where the living modified organism was released, and the requirements of Article 17 of the Protocol apply to such transboundary movements only if the living modified organism involved is likely to have significant adverse effects on the conservation and sustainable use of biological diversity, taking also into account risks to human health, in the affected or potentially affected States.”",
    questions: [{
      key: "Q085",
      section: "Article17",
      number: "85",
      type: "option",
      title: "Has your country established measures to notify affected or potentially affected States, the Biosafety Clearing-House and, where appropriate, relevant international organizations in case of a release under its jurisdiction that leads, or may lead, to an unintentional transboundary movement?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q086",
      section: "Article17",
      number: "86",
      type: "option",
      title: "In the current reporting period, how many releases of LMOs occurred under your country’s jurisdiction that led, or may have led, to an unintentional transboundary movement?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      validations: [{
        question: "Q087",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q087",
      section: "Article17",
      number: "87",
      type: "option",
      title: "If you answered <i>under question 86</i> that a <i>release occurred</i>, has your country notified affected or potentially affected States, the Biosafety Clearing-House and, where appropriate, relevant international organizations?",
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
      }],
      mandatory: true
    }, {
      key: "Q088",
      section: "Article17",
      number: "88",
      type: "option",
      title: "Does your country have the capacity to take appropriate response measures in response to unintentional transboundary movements?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q089",
      section: "Article17",
      number: "89",
      type: "option",
      title: "In the current reporting period, how many times has your country become aware of an unintentional transboundary movement into its territory?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true
    }, {
      key: "Q090",
      section: "Article17",
      number: "90",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 17 in your country",
      multiple: false
    }]
  }, {
    key: "Article18",
    title: "Article 18 – Handling, transport, packaging and identification",
    questions: [{
      key: "Q091",
      section: "Article18",
      number: "91",
      type: "option",
      title: "Has your country taken measures to require that <i>LMOs that are subject to transboundary movement</i> are handled, packaged and transported under conditions of safety, taking into account relevant international rules and standards?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q094",
        type: "&is91Or92Or93",
        trigger: "enable"
      }]
    }, {
      key: "Q092",
      section: "Article18",
      number: "92",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs-FFP, <i>in cases where the identity of the LMOs <u>is not known</u></i>, clearly identifies that they <i>may contain LMOs</i> and are not intended for intentional introduction into the environment, as well as a contact point for further information?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q094",
        type: "&is91Or92Or93",
        trigger: "enable"
      }]
    }, {
      key: "Q093",
      section: "Article18",
      number: "93",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying LMOs-FFP, <i>in cases where the identity of the LMOs <u>is known</u></i>, clearly identifies that they <i>contain LMOs</i> and are not intended for intentional introduction into the environment, as well as a contact point for further information?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q094",
        type: "&is91Or92Or93",
        trigger: "enable"
      }]
    }, {
      key: "Q094",
      section: "Article18",
      number: "94",
      type: "option",
      title: "If you answered <i>Yes</i> to question(s) 91, 92 and/or 93, what type of documentation accompanying LMOs does your country require?",
      multiple: false,
      options: [{
        value: "lmoSpecific",
        title: "Documentation specific for LMOs"
      }, {
        value: "nonLmoSpecific",
        title: "As part of other documentation (not specific for LMOs)"
      }, {
        value: "other",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q095",
      section: "Article18",
      number: "95",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying <i>LMOs that are destined for contained use clearly identifies</i> them as <i>LMOs</i> and specifies any requirements for the safe handling, storage, transport and use, the contact point for further information, including the name and address of the individual and institution to whom the LMO are consigned?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q096",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q096",
      section: "Article18",
      number: "96",
      type: "option",
      title: "If you answered <i>Yes</i> to question 95, what type of documentation does your country require for the identification of LMOs that are destined for contained use?",
      multiple: false,
      options: [{
        value: "lmoSpecific",
        title: "Documentation specific for LMOs"
      }, {
        value: "nonLmoSpecific",
        title: "As part of other documentation (not specific for LMOs)"
      }, {
        value: "other",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q097",
      section: "Article18",
      number: "97",
      type: "option",
      title: "Has your country taken measures to require that documentation accompanying <i>LMOs that are intended for intentional introduction into the environment of the Party of import</i> clearly identifies them as <i>living modified organisms</i>; specifies the identity and relevant traits and/or characteristics, any requirements for the safe handling, storage, transport and use, the contact point for further information and, as appropriate, the name and address of the importer and exporter; and contains a declaration that the movement is in conformity with the requirements of this Protocol applicable to the exporter?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q098",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q098",
      section: "Article18",
      number: "98",
      type: "option",
      title: "If you answered <i>Yes</i> to question 97, what type of documentation does your country require for the identification of LMOs that are intended for intentional introduction into the environment?",
      multiple: false,
      options: [{
        value: "lmoSpecific",
        title: "Documentation specific for LMOs"
      }, {
        value: "nonLmoSpecific",
        title: "As part of other documentation (not specific for LMOs)"
      }, {
        value: "other",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q099",
      section: "Article18",
      number: "99",
      type: "option",
      title: "Does your country have available any guidance for the purpose of ensuring the safe handling, transport, and packaging of living modified organisms?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q100",
      section: "Article18",
      number: "100",
      type: "option",
      title: "Does your country have the capacity to enforce the requirements of identification and documentation of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q101",
      section: "Article18",
      number: "101",
      type: "option",
      title: "How many customs officers in your country have received training in the identification of LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 to 99"
      }, {
        value: "100+",
        title: "100 or more"
      }],
      validations: [{
        question: "Q101_adq",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "visible"
      }],
      mandatory: true
    }, {
      key: "Q101_adq",
      section: "Article18",
      number: "",
      type: "option",
      title: "Is this number adequate",
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
      section: "Article18",
      number: "102",
      type: "option",
      title: "Has your country established procedures for the sampling and detection of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q103",
      section: "Article18",
      number: "103",
      type: "option",
      title: "How many laboratory personnel in your country have received training in detection of LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 to 99"
      }, {
        value: "100+",
        title: "100 or more"
      }],
      mandatory: true,
      validations: [{
        question: "Q103_adq",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "visible"
      }]
    }, {
      key: "Q103_adq",
      section: "Article18",
      number: "",
      type: "option",
      title: "Is this number adequate",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q104",
      section: "Article18",
      number: "104",
      type: "option",
      title: "Does your country have reliable access to laboratory facilities for the detection of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q105",
      section: "Article18",
      number: "105",
      type: "option",
      title: "How many laboratories in your country are certified for LMO detection?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 or more"
      }],
      mandatory: true,
      validations: [{
        question: "Q106",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q106",
      section: "Article18",
      number: "106",
      type: "option",
      title: "If you answered <i>under question 105</i> that <i>certified laboratories exist in your country</i>, how many of them are currently operating in the detection of LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 or more"
      }],
      mandatory: true
    }, {
      key: "Q107",
      section: "Article18",
      number: "107",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 18 in your country",
      multiple: false
    }]
  }, {
    key: "Article19",
    title: "Article 19 – Competent National Authorities and National Focal Points",
    questions: [{
      key: "Q108",
      section: "Article19",
      number: "108",
      type: "option",
      title: "In case your country has designated more than one competent national authority, has your country established a mechanism for the coordination of their actions prior to taking decisions regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }, {
        value: "false.noCna",
        title: "Not applicable (no competent national authority was designated)"
      }, {
        value: "false.oneCna",
        title: "Not applicable (only one competent national authority was designated)"
      }]
    }, {
      key: "Q109",
      section: "Article19",
      number: "109",
      type: "option",
      title: "Has your country established adequate institutional capacity to enable the competent national authority(ies) to perform the administrative functions required by the Cartagena Protocol on Biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q110",
      section: "Article19",
      number: "110",
      type: "option",
      title: "Has your country undertaken initiatives to strengthen collaboration among national focal points, competent national authority(ies) and other institutions on biosafety-related matters?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q111",
      section: "Article19",
      number: "111",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 19 in your country",
      multiple: false
    }]
  }, {
    key: "Article20",
    title: "Article 20 – Information Sharing and the Biosafety Clearing-House (BCH)",
    questions: [{
      key: "Q112",
      section: "Article20",
      number: "112",
      type: "sub-section",
      title: "Please provide an overview of the status of the mandatory information provided by your country to the BCH by specifying for each category of information whether it is available and whether it has been submitted to the BCH.",
      questions: [{
        key: "Q112_a",
        section: "Article20",
        number: "a",
        type: "option",
        title: "Existing legislation, regulations and guidelines for implementing the Protocol, as well as information required by Parties for the advance informed agreement procedure (Article 20, paragraph 3 (a))",
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
        }],
        mandatory: true
      }, {
        key: "Q112_b",
        section: "Article20",
        number: "b",
        type: "option",
        title: "Legislation, regulations and guidelines applicable to the import of LMOs intended for direct use as food or feed, or for processing (Article 11, paragraph 5)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_c",
        section: "Article20",
        number: "c",
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
        }],
        mandatory: true
      }, {
        key: "Q112_d",
        section: "Article20",
        number: "d",
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
        }],
        mandatory: true
      }, {
        key: "Q112_e",
        section: "Article20",
        number: "e",
        type: "option",
        title: "Decisions by a Party regarding transit of LMOs (Article 6, paragraph 1)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_f",
        section: "Article20",
        number: "f",
        type: "option",
        title: "Decisions by a Party regarding import of LMOs for contained use (Article 6, paragraph 2)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_g",
        section: "Article20",
        number: "g",
        type: "option",
        title: "Notifications regarding the release under your country’s jurisdiction that leads, or may lead, to an unintentional transboundary movement of a LMO that is likely to have significant adverse effects on biological diversity (Article 17, paragraph 1)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_h",
        section: "Article20",
        number: "h",
        type: "option",
        title: "Information concerning cases of illegal transboundary movements of LMOs (Article 25, paragraph 3)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_i",
        section: "Article20",
        number: "i",
        type: "option",
        title: "Decisions regarding the importation of LMOs for intentional introduction into the environment (Article 10, paragraph 3)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_j",
        section: "Article20",
        number: "j",
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
        }],
        mandatory: true
      }, {
        key: "Q112_k",
        section: "Article20",
        number: "k",
        type: "option",
        title: "Decisions regarding the domestic use of LMOs that may be subject to transboundary movement for direct use as food or feed, or for processing (Article 11, paragraph 1)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_l",
        section: "Article20",
        number: "l",
        type: "option",
        title: "Decisions regarding the import of LMOs intended for direct use as food or feed, or for processing that are taken under domestic regulatory frameworks (Article 11, paragraph 4) or in accordance with Annex III to the Protocol (Article 11, paragraph 6)",
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
        }],
        mandatory: true
      }, {
        key: "Q112_m",
        section: "Article20",
        number: "m",
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
        }],
        mandatory: true
      }, {
        key: "Q112_n",
        section: "Article20",
        number: "n",
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
        }],
        mandatory: true
      }, {
        key: "Q112_o",
        section: "Article20",
        number: "o",
        type: "option",
        title: "Cases where intentional transboundary movement may take place at the same time as the movement is notified to the Party of import (Article 13, paragraph 1 (a))",
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
        }],
        mandatory: true
      }, {
        key: "Q112_p",
        section: "Article20",
        number: "p",
        type: "option",
        title: "LMOs granted exemption status by each Party (Article 13, paragraph 1 (b))",
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
        }],
        mandatory: true
      }, {
        key: "Q112_q",
        section: "Article20",
        number: "q",
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
        }],
        mandatory: true
      }]
    }, {
      key: "Q113",
      section: "Article20",
      number: "113",
      type: "lstring",
      title: "Please provide a brief explanation if you answered that the information is available <i>but not in the BCH or only partially available in the BCH</i> to any item under question 112",
      multiple: false
    }, {
      key: "Q114",
      section: "Article20",
      number: "114",
      type: "option",
      title: "Has your country established a mechanism for strengthening the capacity of the BCH National Focal Point to perform its administrative functions?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q115",
      section: "Article20",
      number: "115",
      type: "option",
      title: "Has your country established a mechanism for the coordination among the BCH National Focal Point, the Cartagena Protocol focal point, and the competent national authority(ies) for making information available to the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q116",
      section: "Article20",
      number: "116",
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
      }, {
        value: "false.na",
        title: "Not applicable (no decisions were taken)"
      }]
    }, {
      key: "Q117",
      section: "Article20",
      number: "117",
      type: "option",
      title: "Has your country experienced difficulties accessing or using the BCH?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q118",
      section: "Article20",
      number: "118",
      type: "option",
      title: "In the current reporting period, how many biosafety-related events (e.g. seminars, workshops, press conferences, educational events) has your country organized?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 to 24"
      }, {
        value: "25+",
        title: "25 or more"
      }],
      mandatory: true
    }, {
      key: "Q119",
      section: "Article20",
      number: "119",
      type: "option",
      title: "In the current reporting period, how many biosafety-related publications has your country published?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 to 99"
      }, {
        value: "100+",
        title: "100 or more"
      }],
      mandatory: true
    }, {
      key: "Q120",
      section: "Article20",
      number: "120",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 20 in your country",
      multiple: false
    }]
  }, {
    key: "Article21",
    title: "Article 21 – Confidential information",
    questions: [{
      key: "Q121",
      section: "Article21",
      number: "121",
      type: "option",
      title: "Has your country established procedures to protect confidential information received under the Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q122",
      section: "Article21",
      number: "122",
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
      }],
      mandatory: true
    }, {
      key: "Q123",
      section: "Article21",
      number: "123",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 21 in your country",
      multiple: false
    }]
  }, {
    key: "Article22",
    title: "Article 22 – Capacity-building",
    questions: [{
      key: "Q124",
      section: "Article22",
      number: "124",
      type: "option",
      title: "Does your country have predictable and reliable funding for building capacity for the effective implementation of the Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q125",
      section: "Article22",
      number: "125",
      type: "option",
      title: "Has your country received external support or benefited from collaborative activities with other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q126",
        values: ["true", "true.some"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q126",
      section: "Article22",
      number: "126",
      type: "option",
      title: "If you answered <i>Yes</i> to question 125, how were these resources made available? (select all that apply)",
      multiple: true,
      options: [{
        value: "channels.bilateral",
        title: "Bilateral channels"
      }, {
        value: "channels.regional",
        title: "Regional channels"
      }, {
        value: "channels.multilateral",
        title: "Multilateral channels"
      }],
      mandatory: true
    }, {
      key: "Q127",
      section: "Article22",
      number: "127",
      type: "option",
      title: "Has your country provided support to other Parties in the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q128",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q128",
      section: "Article22",
      number: "128",
      type: "option",
      title: "If you answered <i>Yes</i> to question 127, how were these resources made available? (select all that apply)",
      multiple: true,
      options: [{
        value: "channels.bilateral",
        title: "Bilateral channels"
      }, {
        value: "channels.regional",
        title: "Regional channels"
      }, {
        value: "channels.multilateral",
        title: "Multilateral channels"
      }],
      mandatory: true
    }, {
      key: "Q129",
      section: "Article22",
      number: "129",
      type: "option",
      title: "In the reporting period, has your country initiated a process to access funds from the Global Environment Facility (GEF) for building capacity in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q130",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q130",
      section: "Article22",
      number: "130",
      type: "option",
      title: "If you answered <i>Yes</i> to question 129, how would you characterize the process?",
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
      }],
      mandatory: true
    }, {
      key: "Q131",
      section: "Article22",
      number: "131",
      type: "term",
      title: "In the current reporting period, has your country undertaken activities for the development and/or strengthening of human resources and institutional capacities in biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q132",
        values: ["true.some", "true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q132",
      section: "Article22",
      number: "132",
      type: "term",
      title: "If you answered <i>Yes</i> to question 131, in which of the following areas were these activities undertaken (select all that apply)?",
      multiple: true,
      options: [{
        value: "BB3CA716-E122-4445-9FAD-9F6B440363BD",
        title: "Institutional capacity and human resources"
      }, {
        value: "68250AA6-75F1-470D-A8E7-85ECDF703D00",
        title: "Integration of biosafety in cross-sectoral and sectoral legislation, policies and institutions (mainstreaming biosafety)"
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
      }, {
        value: "667CD9B1-4571-4C2A-A459-F78E004D7D96",
        title: "Liability and redress"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q133",
      section: "Article22",
      number: "133",
      type: "option",
      title: "In the current reporting period, has your country carried out a capacity-building needs assessment?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q134",
      section: "Article22",
      number: "134",
      type: "option",
      title: "Does your country still have capacity-building needs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q135",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q135",
      section: "Article22",
      number: "135",
      type: "term",
      title: "If you answered <i>Yes</i> to question 134, which of the following areas still need capacity-building (select all that apply)?",
      multiple: true,
      options: [{
        value: "BB3CA716-E122-4445-9FAD-9F6B440363BD",
        title: "Institutional capacity and human resources"
      }, {
        value: "68250AA6-75F1-470D-A8E7-85ECDF703D00",
        title: "Integration of biosafety in cross-sectoral and sectoral legislation, policies and institutions (mainstreaming biosafety)"
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
        title: "Sampling, detection and identification of LMOs"
      }, {
        value: "76DB23A3-F880-4AC8-8602-DF9DC45EECAF",
        title: "Socio-economic considerations"
      }, {
        value: "A16727EE-FE61-43FF-8530-35A9C7261247",
        title: "Implementation of the documentation requirements for handling, transport, packaging and identification"
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
      }, {
        value: "667CD9B1-4571-4C2A-A459-F78E004D7D96",
        title: "Liability and redress"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q136",
      section: "Article22",
      number: "136",
      type: "option",
      title: "Has your country developed a capacity-building strategy or action plan?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q137",
      section: "Article22",
      number: "137",
      type: "option",
      title: "Does your country have in place a functional national mechanism for coordinating biosafety capacity-building initiatives?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q138",
      section: "Article22",
      number: "138",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 22 in your country, including further details about your experience in accessing GEF funds",
      multiple: false
    }]
  }, {
    key: "Article23",
    title: "Article 23 – Public awareness and participation",
    questions: [{
      key: "Q139",
      section: "Article23",
      number: "139",
      type: "option",
      title: "Is biosafety public awareness, education and/or participation addressed in legislation or policy in your country?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q140",
      section: "Article23",
      number: "140",
      type: "option",
      title: "In the current reporting period, has your country cooperated with other States and international bodies in relation to public awareness, education and participation?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q141",
      section: "Article23",
      number: "141",
      type: "option",
      title: "Has your country established a mechanism to ensure public access to information on LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q142",
      section: "Article23",
      number: "142",
      type: "option",
      title: "Does your country have in place a national communication strategy on biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q143",
      section: "Article23",
      number: "143",
      type: "option",
      title: "Does your country have any awareness and outreach programmes on biosafety?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q144",
      section: "Article23",
      number: "144",
      type: "option",
      title: "Does your country currently have a national biosafety website?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q145",
      section: "Article23",
      number: "145",
      type: "option",
      title: "How many academic institutions in your country are offering biosafety education and training courses and programmes?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      validations: [{
        question: "Q145_adq",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "visible"
      }],
      mandatory: true
    }, {
      key: "Q145_adq",
      section: "Article23",
      number: "",
      type: "option",
      title: "Is this number adequate",
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
      section: "Article23",
      number: "146",
      type: "option",
      title: "How many educational materials and/or online modules on biosafety are available and accessible to the public in your country?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 to 24"
      }, {
        value: "25+",
        title: "25 to 99"
      }, {
        value: "100+",
        title: "100 or more"
      }],
      validations: [{
        question: "Q146_adq",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "visible"
      }],
      mandatory: true
    }, {
      key: "Q146_adq",
      section: "Article23",
      number: "",
      type: "option",
      title: "Is this number adequate",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q147",
      section: "Article23",
      number: "147",
      type: "option",
      title: "Has your country established a mechanism to consult the public in the decision-making process regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q148",
      section: "Article23",
      number: "148",
      type: "option",
      title: "Has your country informed the public about existing modalities for public participation in the decision-making process regarding LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q149",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q149",
      section: "Article23",
      number: "149",
      type: "term",
      title: "If you answered <i>Yes</i> to question 148, please indicate the modalities used to inform the public: (select all that apply)",
      multiple: true,
      options: [{
        value: "4E205CD9-9958-497F-A760-F8321771AB3A",
        title: "National websites"
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
      }, {
        value: "887CD9B1-4571-5Z6A-A459-F78E004D7D28",
        title: "Social media"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }],
      mandatory: true
    }, {
      key: "Q150",
      section: "Article23",
      number: "150",
      type: "option",
      title: "In the current reporting period, how many times has your country consulted the public in the decision-making process regarding LMOs?",
      multiple: false,
      options: [{
        value: "0",
        title: "None (decisions taken without consultation)"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 or more"
      }, {
        value: "na",
        title: "Not applicable (no decisions were taken)"
      }],
      mandatory: true
    }, {
      key: "Q151",
      section: "Article23",
      number: "151",
      type: "option",
      title: "Has your country informed the public about the means to access the Biosafety Clearing-House?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q152",
      section: "Article23",
      number: "152",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 23 in your country",
      multiple: false
    }]
  }, {
    key: "Article24",
    title: "Article 24 – Non-Parties",
    questions: [{
      key: "Q153",
      section: "Article24",
      number: "153",
      type: "option",
      title: "Has your country entered into any bilateral, regional, or multilateral agreement with non-Parties regarding transboundary movements of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q154",
      section: "Article24",
      number: "154",
      type: "option",
      title: "In the current reporting period, has your country imported LMOs from a non-Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q156",
        type: "&is154Or155",
        trigger: "enable"
      }]
    }, {
      key: "Q155",
      section: "Article24",
      number: "155",
      type: "option",
      title: "In the current reporting period, has your country exported LMOs to a non-Party?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q156",
        type: "&is154Or155",
        trigger: "enable"
      }]
    }, {
      key: "Q156",
      section: "Article24",
      number: "156",
      type: "option",
      title: "If you answered <i>Yes</i> to question 154 and/or 155, were the transboundary movements of LMOs consistent with the objective of the Cartagena Protocol on Biosafety?",
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
      }],
      mandatory: true
    }, {
      key: "Q157",
      section: "Article24",
      number: "157",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 24 in your country",
      multiple: false
    }]
  }, {
    key: "Article25",
    title: "Article 25 – Illegal transboundary movements<sup>3</sup>",
    footnote: "<sup>3</sup>In accordance with the operational definition adopted in decision CP VIII/16, “‘Illegal transboundary movement’ is a transboundary movement of living modified organisms carried out in contravention of the domestic measures to implement the Protocol that have been adopted by the Party concerned”.",
    questions: [{
      key: "Q158",
      section: "Article25",
      number: "158",
      type: "option",
      title: "Has your country adopted domestic measures aimed at preventing and/or penalizing transboundary movements of LMOs carried out in contravention of its domestic measures to implement the Cartagena Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, to some extent",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q159",
      section: "Article25",
      number: "159",
      type: "option",
      title: "In the current reporting period, how many cases of illegal transboundary movements of LMOs has your country become aware of?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 or more"
      }],
      mandatory: true,
      validations: [{
        question: "Q160",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q160",
      section: "Article25",
      number: "160",
      type: "option",
      title: "If you indicated <i>under question 159</i> that <i>your country became aware of cases of illegal transboundary movements</i>, has the origin of the LMO(s) been established?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "true.some",
        title: "Yes, in some cases"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q161",
      section: "Article25",
      number: "161",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 25 in your country",
      multiple: false
    }]
  }, {
    key: "Article26",
    title: "Article 26 – Socio-economic considerations",
    questions: [{
      key: "Q162",
      section: "Article26",
      number: "162",
      type: "option",
      title: "Does your country have any specific approaches or requirements that facilitate how socioeconomic considerations should be taken into account in LMO decision-making?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q163",
      section: "Article26",
      number: "163",
      type: "option",
      title: "In the current reporting period, have socioeconomic considerations arising from the impact of LMOs been taken into account in decision-making?",
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
      }, {
        value: "false.na",
        title: "Not applicable (no decisions were taken)"
      }],
      mandatory: true
    }, {
      key: "Q164",
      section: "Article26",
      number: "164",
      type: "option",
      title: "How many peer-reviewed published materials has your country used for the purpose of elaborating or determining national actions with regard to socioeconomic considerations?",
      multiple: false,
      options: [{
        value: "0",
        title: "None"
      }, {
        value: "1+",
        title: "1 to 4"
      }, {
        value: "5+",
        title: "5 to 9"
      }, {
        value: "10+",
        title: "10 to 49"
      }, {
        value: "50+",
        title: "50 or more"
      }],
      validations: [{
        question: "Q164_adq",
        values: ["0"],
        type: "@hasValuesExcept",
        trigger: "visible"
      }],
      mandatory: true
    }, {
      key: "Q164_adq",
      section: "Article26",
      number: "",
      type: "option",
      title: "Is this number adequate",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q165",
      section: "Article26",
      number: "165",
      type: "option",
      title: "Has your country cooperated with other Parties on research and information exchange on any socioeconomic impacts of LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q166",
      section: "Article26",
      number: "166",
      type: "lstring",
      title: "Here you may provide further details on the implementation of Article 26 in your country",
      multiple: false
    }]
  }, {
    key: "Article28",
    title: "Article 28 – Financial Mechanism and Resources",
    questions: [{
      key: "Q167",
      section: "Article28",
      number: "167",
      type: "option",
      title: "In the current reporting period, how much funding (in the equivalent of US dollars) has your country mobilized to support implementation of the Cartagena Protocol beyond the regular national budgetary allocation?",
      multiple: false,
      options: [{
        value: "USD0",
        title: "Nothing"
      }, {
        value: "USD1-4999",
        title: "1 to 4,999 USD"
      }, {
        value: "USD5000-49999",
        title: "5,000 to 49,999 USD"
      }, {
        value: "USD50000-99999",
        title: "50,000 to 99,999 USD"
      }, {
        value: "USD100000-499000",
        title: "100,000 to 499,000 USD"
      }, {
        value: "USD500000+",
        title: "500,000 USD or more"
      }],
      mandatory: true
    }]
  }, {
    key: "Article33",
    title: "Article 33 – Monitoring and reporting",
    description: "<i>Article 33 requires Parties to monitor the <u>implementation of its obligations</u> under the Cartagena Protocol and to report to the Conference of the Parties serving as the meeting of the Parties to the Cartagena Protocol on measures taken to implement the Protocol</i>",
    questions: [{
      key: "Q168",
      section: "Article33",
      number: "168",
      type: "option",
      title: "Does your country have in place a system to monitor and enforce the implementation of the Cartagena Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }]
  }, {
    key: "LiabilityRedress",
    title: "Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress",
    description: "<i>Parties to the Cartagena Protocol that are not yet Party to the Supplementary Protocol are also invited to respond to the questions below</i>",
    questions: [{
      key: "Q169",
      section: "LiabilityRedress",
      number: "169",
      type: "option",
      title: "Is your country a Party to the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true,
      validations: [{
        question: "Q170",
        values: ["false"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q170",
      section: "LiabilityRedress",
      number: "170",
      type: "option",
      title: "If you answered <i>No</i> to question 169, is there any national process in place towards becoming a Party to the Supplementary Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      mandatory: true
    }, {
      key: "Q171",
      section: "LiabilityRedress",
      number: "171",
      type: "term",
      title: "Has your country introduced the necessary measures for the implementation of the Supplementary Protocol?",
      multiple: false,
      options: [{
        value: "74B17D51-786F-3D68-3B76-A50121842925",
        title: "National measures are fully in place"
      }, {
        value: "FAA03A2A-F79E-1347-22E3-0EB4815DF05B",
        title: "National measures are partially in place"
      }, {
        value: "EFCE3DC1-BED6-041D-0AEA-93B0F04AE166",
        title: "Only temporary measures have been introduced"
      }, {
        value: "2B4110FC-8B86-50E6-851F-08AF1A43CFEC",
        title: "Only draft measures exist"
      }, {
        value: "C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9",
        title: "No measures have yet been taken"
      }],
      validations: [{
        question: "Q172",
        values: ["C9B01C6D-6B40-1A67-B5A0-DDB7FF6B9CE9"],
        type: "@hasValuesExcept",
        trigger: "enable"
      }]
    }, {
      key: "Q172",
      section: "LiabilityRedress",
      number: "172",
      type: "term",
      title: "Which instruments are in place for the implementation of the Supplementary Protocol?",
      multiple: false,
      options: [{
        value: "6BAF09B7-6331-04E6-479D-C1C1B0D55ECD",
        title: "One or more national laws",
        type: "lstring"
      }, {
        value: "0D3A9BB1-B378-174D-F4DD-1217D79D8B21",
        title: "One or more national regulations",
        type: "lstring"
      }, {
        value: "BA743C79-B202-4611-16C4-2C7D4678ACEB",
        title: "One or more sets of guidelines",
        type: "lstring"
      }, {
        value: "9067DB5B-E33B-655D-83A3-32D4D562618F",
        title: "No instruments are in place"
      }]
    }, {
      key: "Q173",
      section: "LiabilityRedress",
      number: "173",
      type: "sub-section",
      title: "Does your country have administrative or legal instruments that require response measures to be taken",
      multiple: false,
      questions: [{
        key: "Q173_a",
        section: "LiabilityRedress",
        number: "a",
        type: "option",
        title: "In case of damage resulting from LMOs?",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }],
        validations: [{
          question: "Q174",
          values: ["true"],
          type: "@hasValues",
          trigger: "enable"
        }, {
          question: "Q175",
          values: ["true"],
          type: "@hasValues",
          trigger: "enable"
        }, {
          question: "Q176",
          values: ["true"],
          type: "&is173aOr173b",
          trigger: "enable"
        }],
        mandatory: true
      }, {
        key: "Q173_b",
        section: "LiabilityRedress",
        number: "b",
        type: "option",
        title: "In case there is sufficient likelihood that damage will result if response measures are not taken?",
        multiple: false,
        options: [{
          value: "true",
          title: "Yes"
        }, {
          value: "false",
          title: "No"
        }],
        validations: [{
          question: "Q176",
          values: ["true"],
          type: "&is173aOr173b",
          trigger: "enable"
        }],
        mandatory: true
      }]
    }, {
      key: "Q174",
      section: "LiabilityRedress",
      number: "174",
      type: "term",
      title: "If you answered <i>Yes</i> to question 173a, do these instruments impose requirements on an operator (select all that apply)?",
      multiple: true,
      options: [{
        value: "true.inform",
        title: "Yes, the operator must inform the competent authority of the damage"
      }, {
        value: "true.evaluate",
        title: "Yes, the operator must evaluate the damage"
      }, {
        value: "true.response",
        title: "Yes, the operator must take response measures"
      }, {
        value: "true.other",
        title: "Yes, other requirements",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q175",
      section: "LiabilityRedress",
      number: "175",
      type: "option",
      title: "If you answered <i>Yes</i> to question 173a, do these instruments require the operator to take response measures to avoid damage?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q176",
      section: "LiabilityRedress",
      number: "176",
      type: "option",
      title: "If you answered <i>Yes</i> to question 173a or 173b, do these instruments provide for a definition of “operator”?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q177",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q177",
      section: "LiabilityRedress",
      number: "177",
      type: "term",
      title: "If you answered <i>Yes</i> to question 176, which of the following could be an ‘operator’ (select all that apply)?",
      multiple: true,
      options: [{
        value: "8F627A99-7CD4-D892-80EA-12C58607508F",
        title: "Permit holder"
      }, {
        value: "888E88C5-0C25-76A8-B3C8-48C3FDAE5215",
        title: "Person who placed the LMO on the market"
      }, {
        value: "B985EF7B-B94E-BF56-3D56-BE2ACE2BB835",
        title: "Developer"
      }, {
        value: "ADEF00D6-0901-8750-1069-5CBA877011CC",
        title: "Producer"
      }, {
        value: "3F54E971-E791-FE00-5312-F7FF07C818B1",
        title: "Notifier"
      }, {
        value: "2D8B29DD-0703-6130-BE79-389F5278C21D",
        title: "Exporter"
      }, {
        value: "D475D239-517E-9D8B-E1F9-4C453039C792",
        title: "Importer"
      }, {
        value: "8BD75295-88DF-2A32-A150-1132670E19A9",
        title: "Carrier"
      }, {
        value: "58FE50CB-9958-4F9F-FEE4-861628BDC6F7",
        title: "Supplier"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }]
    }, {
      key: "Q178",
      section: "LiabilityRedress",
      number: "178",
      type: "option",
      title: "Has a competent authority been identified for carrying out the functions set out in the Supplementary Protocol?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q179",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q179",
      section: "LiabilityRedress",
      number: "179",
      type: "term",
      title: "If you answered <i>Yes</i> to question 178, what measures may the competent authority take (select all that apply)?",
      multiple: true,
      options: [{
        value: "2DAA6BFF-9EB2-F99E-AA11-CB348A25E7F2",
        title: "Identify the operator that caused the damage"
      }, {
        value: "6065EDB8-C5A4-BA81-5271-B2F93159A471",
        title: "Evaluate the damage"
      }, {
        value: "A038303D-7049-E34F-8381-5B59702BBCF6",
        title: "Determine response measures to be taken by operator"
      }, {
        value: "9C54DE71-9B5A-5579-7B7B-E49DA2AB43CA",
        title: "Implement response measures"
      }, {
        value: "34BCA89E-DCBF-586E-02FD-37E6FFD186A4",
        title: "Recover costs and expenses of the evaluation of the damage and the implementation of any response measures from the operator"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }]
    }, {
      key: "Q180",
      section: "LiabilityRedress",
      number: "180",
      type: "option",
      title: "Does your country have measures in place to provide for financial security for damage resulting from LMOs?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q181",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q181",
      section: "LiabilityRedress",
      number: "181",
      type: "term",
      title: "If you answered <i>Yes</i> to question 180, what type of financial security measures are in place (select all that apply)?",
      multiple: true,
      options: [{
        value: "69C39AF0-E97E-A277-5741-BC14BB5FFCB7",
        title: "Requirement to provide evidence for secure source of funding"
      }, {
        value: "D12679C3-AE57-50EA-648E-9F0DC02B18E8",
        title: "Mandatory insurance"
      }, {
        value: "89B8212D-4CB0-FF9E-2107-F1D8D77C86D5",
        title: "Government schemes, including funds"
      }, {
        value: "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED",
        title: "Other",
        type: "lstring"
      }]
    }, {
      key: "Q182",
      section: "LiabilityRedress",
      number: "182",
      type: "term",
      title: "Does your country have rules and procedures on civil liability that address damage resulting from LMOs, or has such damage been recognized in court rulings (select all that apply)?",
      multiple: true,
      options: [{
        value: "878DF5F5-0B5E-48E1-6A42-80867A101675",
        title: "Yes, in a civil liability instrument"
      }, {
        value: "0FC0DC50-EFAE-1C83-74F5-7A7D0205DB0A",
        title: "Yes, in court rulings"
      }, {
        value: "true",
        title: "Yes, in other instruments",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q183",
      section: "LiabilityRedress",
      number: "183",
      type: "term",
      title: "Have there been any occurrences of damage resulting from LMOs in your country?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }],
      validations: [{
        question: "Q184",
        values: ["true"],
        type: "@hasValues",
        trigger: "enable"
      }]
    }, {
      key: "Q184",
      section: "LiabilityRedress",
      number: "184",
      type: "term",
      title: "If you answered <i>Yes</i> to question 183, have response measures been taken?",
      multiple: false,
      options: [{
        value: "true",
        title: "Yes",
        type: "lstring"
      }, {
        value: "false",
        title: "No"
      }]
    }, {
      key: "Q185",
      section: "LiabilityRedress",
      number: "185",
      type: "lstring",
      title: "Here you may provide further details on any activities undertaken in your country towards the implementation of the Nagoya-Kuala Lumpur Supplementary Protocol on Liability and Redress",
      multiple: false
    }]
  }, {
    key: "AdditionalInformation",
    title: "Other information",
    questions: [{
      key: "Q186",
      section: "AdditionalInformation",
      number: "186",
      type: "lstring",
      title: "Please use this field to provide any other information on issues related to national implementation of the Protocol, including any obstacles or impediments encountered.",
      multiple: false
    }]
  }, {
    key: "Comments",
    title: "Comments on reporting format",
    questions: [{
      key: "Q187",
      section: "Comments",
      number: "187",
      type: "lstring",
      title: "Please use this field to provide any other information on difficulties that you have encountered in filling in this report",
      multiple: false
    }]
  }];
  return cpbNationalReport4;
});
