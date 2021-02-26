define(function () { 'use strict';

  var npInterimNationalReport1 = [
  	{
  		key: "General",
  		title: "Institutional structures for the implementation of the Protocol",
  		questions: [
  			{
  				key: "Q003",
  				section: "General",
  				number: "3",
  				type: "option",
  				title: "Has your country made the information available to the ABS Clearing-House as provided in Article 14.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered  and answer all the following questions.",
  						type: "string"
  					},
  					{
  						field: "additionalInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q004",
  				section: "General",
  				number: "4",
  				type: "option",
  				title: "Has your country taken legislative, administrative and policy measures on ABS?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered in setting up these measures.",
  						type: "string"
  					},
  					{
  						field: "additionalInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q005",
  				section: "General",
  				number: "5",
  				type: "option",
  				title: "Has your country designated a national focal point as provided in Article 13? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered for designating a national focal point.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q006",
  				section: "General",
  				number: "6",
  				type: "option",
  				title: "Has your country designated one or more competent national authorities as provided in Article 13?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered for designating one or more competent national authority.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q007",
  				section: "General",
  				number: "7",
  				type: "option",
  				title: "Has your country made available to the ABS Clearing-House permits or their equivalent issued at the time of access as evidence of the decision to grant prior informed consent (PIC) and of the establishment of mutually agreed terms (MAT)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					},
  					{
  						value: "false.notApplicable",
  						title: "Not applicable, since no access requirements are in place"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered for making this information available.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q008",
  				section: "General",
  				number: "8",
  				type: "option",
  				title: "Has your country made available to the ABS Clearing-House permits or their equivalent for the constitution of an internationally recognized certificate of compliance in accordance with Article 17.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					},
  					{
  						value: "false.notApplicable",
  						title: "Not applicable, since no access requirements are in place"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q009",
  				section: "General",
  				number: "9",
  				type: "option",
  				title: "Has your country designated one or more checkpoints as provided in Article 17?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered for designating one or more checkpoints:",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q010",
  				section: "General",
  				number: "10",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "Access",
  		title: "ABS measures : Access to genetic resources (Article 6)",
  		questions: [
  			{
  				key: "Q011",
  				section: "Access",
  				number: "11",
  				type: "option",
  				title: "Is access to genetic resources subject to PIC as provided in Article 6.1?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide further information including indicating if there is any other system in place in relation to access to genetic resources.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q012",
  				section: "Access",
  				number: "12",
  				type: "option",
  				title: "Does your country have fair and non-arbitrary rules and procedures on accessing genetic resources as provided in Article 6.3 (b)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q013",
  				section: "Access",
  				number: "13",
  				type: "option",
  				title: "Does your country provide information on how to apply for PIC as provided in Article 6.3(c)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q014",
  				section: "Access",
  				number: "14",
  				type: "option",
  				title: "Does your country provide for a clear and transparent written decision by a competent national authority as provided in Article 6.3 (d)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q015",
  				section: "Access",
  				number: "15",
  				type: "option",
  				title: "Does your country provide for the issuance at the time of access of a permit or its equivalent as provided in Article 6.3 (e)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q016",
  				section: "Access",
  				number: "16",
  				type: "number",
  				title: "Please provide the number of permits or their equivalents made available through the ABS-Clearing-House since the entry into force of the Protocol for your country.",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q017",
  				section: "Access",
  				number: "17",
  				type: "option",
  				title: "Does your country have rules and procedures for requiring and establishing MAT as provided in Article 6.3 (g)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q018",
  				section: "Access",
  				number: "18",
  				type: "option",
  				title: "Benefits received since entry into force of the Protocol for your country from the utilization of:",
  				multiple: true,
  				options: [
  					{
  						value: "geneticResources",
  						title: "Genetic resources"
  					},
  					{
  						value: "geneticResources.monetary",
  						title: "Monetary benefits"
  					},
  					{
  						value: "geneticResources.nonMonetary",
  						title: "Non-monetary benefits"
  					},
  					{
  						value: "tk",
  						title: "Traditional knowledge associated with genetic resources"
  					},
  					{
  						value: "tk.monetary",
  						title: "Monetary benefits"
  					},
  					{
  						value: "tk.nonMonetary",
  						title: "Non-monetary benefits"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q019",
  				section: "Access",
  				number: "19",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "Benefit-Sharing",
  		title: "ABS measures : Fair and equitable benefit-sharing (Article 5)",
  		questions: [
  			{
  				key: "Q020",
  				section: "Benefit-Sharing",
  				number: "20",
  				type: "option",
  				title: "Has your country taken legislative, administrative or policy measures to implement Article 5.1 that provides that benefits arising from the utilization of genetic resources as well as subsequent applications and commercialization are shared with the Party providing such resources that is the country of origin of such resources or a Party that has acquired the genetic resources in accordance with the Convention as provided in Article 5.3? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q021",
  				section: "Benefit-Sharing",
  				number: "21",
  				type: "option",
  				title: "Has your country taken legislative, administrative or policy measures with the aim of ensuring that the benefits from the utilization of genetic resources held by indigenous and local communities, in accordance with domestic legislation regarding the established rights of these indigenous and local communities over these genetic resources, are shared with the indigenous and local communities concerned as provided in Article 5.2? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q022",
  				section: "Benefit-Sharing",
  				number: "22",
  				type: "option",
  				title: "Has your country taken legislative, administrative or policy measures in order that benefits arising from the utilization of traditional knowledge associated with genetic resources are shared with indigenous and local communities holding such knowledge as provided in Article 5.5?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q023",
  				section: "Benefit-Sharing",
  				number: "23",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges for putting measures in place:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "Compliance",
  		title: "ABS measures : Compliance with domestic legislation or regulatory requirements on ABS (Article 15 and Article 16) and monitoring the utilization of genetic resources (Article 17)",
  		questions: [
  			{
  				key: "Q024_a",
  				section: "Compliance",
  				number: "24.1",
  				type: "option",
  				title: "Has your country taken appropriate, effective and proportionate legislative, administrative or policy measures to provide that genetic resources utilized within your jurisdiction have been accessed in accordance with PIC and that MAT have been established as required by the domestic ABS legislation or regulatory requirements of the other Party as provided in Article 15.1?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q024_b",
  				section: "Compliance",
  				number: "24.2",
  				type: "option",
  				title: "Please indicate whether your country has taken measures to address situations of non-compliance with those measures as provided in Article 15.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information on the measures taken, including when they entered into force",
  						type: "string"
  					},
  					{
  						field: "complianceInfo",
  						title: "Please provide further information on cases of non-compliance",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q024_c",
  				section: "Compliance",
  				number: "24.3",
  				type: "option",
  				title: "Have there been specific cases in which your country cooperated with other Parties in cases of alleged violation of ABS measures as provided in Article 15.3?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q025_a",
  				section: "Compliance",
  				number: "25.1",
  				type: "option",
  				title: "Has your country taken appropriate, effective and proportionate legislative, administrative or policy measures to provide that traditional knowledge associated with genetic resources utilized within your jurisdiction has been accessed in accordance with PIC or approval and involvement of indigenous and local communities and that MAT have been established as required by the domestic ABS legislation or regulatory requirements of the other Party where such indigenous and local communities are located as provided in Article 16.1?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q025_b",
  				section: "Compliance",
  				number: "25.2",
  				type: "option",
  				title: "Please indicate whether your country has taken measures to address situations of non-compliance with those measures as provided in Article 16.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				]
  			},
  			{
  				key: "Q025_c",
  				section: "Compliance",
  				number: "25.3",
  				type: "option",
  				title: "Has your country cooperated in specific cases of alleged violation of ABS measures as provided in Article 16.3?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q026_a",
  				section: "Compliance",
  				number: "26.1",
  				type: "option",
  				title: "Does your country require users of genetic resources to provide information related to PIC, to the source of the genetic resource, to the establishment of MAT and/or utilization of genetic resources at a designated checkpoint, as appropriate, as provided in Article 17.1 (a)(i) and (ii))? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q026_b",
  				section: "Compliance",
  				number: "26.2",
  				type: "option",
  				title: "Has your country taken measures to address situations of non-compliance? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "additionalInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q027_a",
  				section: "Compliance",
  				number: "27.1",
  				type: "option",
  				title: "Has your country provided the information referred to in Article 17.1 (a)(i) to relevant national authorities, to the Party providing PIC and to the ABS Clearing-House as provided in Article 17.1 (a)(iii)",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges",
  						type: "string"
  					},
  					{
  						field: "recordCounts",
  						title: "Please provide the number of checkpoint communiques available in the ABS Clearing-House, if applicable",
  						type: "number"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "fileLinks"
  					}
  				]
  			},
  			{
  				key: "Q027_b",
  				section: "Compliance",
  				number: "27.2",
  				type: "option",
  				title: "Has your country made use of the checkpoint communique?",
  				multiple: false,
  				options: [
  					{
  						value: "yes",
  						title: "Yes"
  					},
  					{
  						value: "no",
  						title: "No"
  					},
  					{
  						value: "other",
  						title: "Other"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q028",
  				section: "Compliance",
  				number: "28",
  				type: "option",
  				title: "Has your country taken measures to encourage users and providers to include provisions in MAT to share information on the implementation of such terms as provided in Article 17.1(b)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q029",
  				section: "Compliance",
  				number: "29",
  				type: "option",
  				title: "Is your country encouraging the use of cost-effective communication tools and systems as provided in Article 17.1 (c)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "additionalInfo",
  						title: "Please provide further information on how your country is encouraging the use of cost-effective communication tools and systems.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q030",
  				section: "Compliance",
  				number: "30",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide further information",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "ComplianceMat",
  		title: "ABS measures :- Compliance with mutually agreed terms (MAT) (Article 18)",
  		questions: [
  			{
  				key: "Q031",
  				section: "ComplianceMat",
  				number: "31",
  				type: "option",
  				title: "Is your country encouraging the inclusion of provisions in MAT to cover dispute resolution as provided in Article 18.1 (a) (b) and (c)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					},
  					{
  						value: "false.notApplicable",
  						title: "Not applicable"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q032",
  				section: "ComplianceMat",
  				number: "32",
  				type: "option",
  				title: "Does your country ensure that opportunity to seek recourse is available under your legal systems in cases of disputes arising from MAT as provided in Article 18.2? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q033",
  				section: "ComplianceMat",
  				number: "33",
  				type: "header",
  				title: "Has your country taken measures regarding the following points as provided in Article 18.3? ",
  				multiple: false
  			},
  			{
  				key: "Q033_a",
  				section: "ComplianceMat",
  				number: "33.1",
  				type: "option",
  				title: "Access to justice?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q033_b",
  				section: "ComplianceMat",
  				number: "33.2",
  				type: "option",
  				title: "Utilization of mechanisms regarding mutual recognition and enforcement of foreign judgements and arbitral awards? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q034",
  				section: "ComplianceMat",
  				number: "34",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide further information",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "specialConsiderations",
  		title: "Special considerations (Article 8)",
  		questions: [
  			{
  				key: "Q035",
  				section: "specialConsiderations",
  				number: "35",
  				type: "header",
  				title: "In the development and implementation of ABS legislation or regulatory requirements has your country:",
  				multiple: false
  			},
  			{
  				key: "Q035_a",
  				section: "specialConsiderations",
  				number: "35.1",
  				type: "option",
  				title: "Created conditions to promote and encourage research which contributes to the conservation and sustainable use of biodiversity including through simplified measures on access for non-commercial research purposes, taking into account the need to address a change of intent for such research as provided in Article 8(a)? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q035_b",
  				section: "specialConsiderations",
  				number: "35.2",
  				type: "option",
  				title: "Paid due regard to cases of present or imminent emergencies that threaten or damage human, animal or plant health as provided in Article 8(b)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q035_c",
  				section: "specialConsiderations",
  				number: "35.3",
  				type: "option",
  				title: "Taken into consideration the need for expeditious access to genetic resources and expeditious fair and equitable sharing of benefits arising out of the use of such genetic resources, including access to affordable treatments by those in need, especially, in developing countries as provided in Article 8(b)? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q035_d",
  				section: "specialConsiderations",
  				number: "35.4",
  				type: "option",
  				title: "Considered the importance of genetic resources for food and agriculture and their special role for food security as provided in Article 8 (c)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q036",
  				section: "specialConsiderations",
  				number: "36",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges for putting measures in place.",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "indigenousProvisions",
  		title: "Provisions related to indigenous and local communities (Articles 6, 7 and 12)",
  		questions: [
  			{
  				key: "Q037",
  				section: "indigenousProvisions",
  				number: "37",
  				type: "option",
  				title: "Does your country have indigenous and local communities?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q038_a",
  				section: "indigenousProvisions",
  				number: "38.1",
  				type: "option",
  				title: "Do indigenous and local communities have the established right to grant access to genetic resources according to your domestic law? (Article 6.2)",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q038_b",
  				section: "indigenousProvisions",
  				number: "38.2",
  				type: "text",
  				field: "furtherInfo",
  				subTitle: "Free text",
  				title: "Please provide further information and reference to the domestic law establishing rights of indigenous and local communities to grant access to genetic resources",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q038_c",
  				section: "indigenousProvisions",
  				number: "38.3",
  				type: "option",
  				title: "Does your country have measures in place with the aim of ensuring that the prior informed consent or approval and involvement of indigenous and local communities is obtained as provided in Article 6.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q038_d",
  				section: "indigenousProvisions",
  				number: "38.4",
  				type: "option",
  				title: "Has your country set out criteria and/or process for obtaining prior informed consent or approval and involvement of indigenous and local communities for access to genetic resources in Article 6.3(f)?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					}
  				]
  			},
  			{
  				key: "Q039",
  				section: "indigenousProvisions",
  				number: "39",
  				type: "option",
  				title: " In accordance with domestic law has your country taken measures with the aim of ensuring that traditional knowledge associated with genetic resources that is held by indigenous and local communities within your country is accessed with the PIC or approval and involvement of these indigenous and local communities and that MAT have been established as provided in Article 7?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q040",
  				section: "indigenousProvisions",
  				number: "40",
  				type: "option",
  				title: "In implementing the Protocol and in accordance with your domestic law, is your country taking into consideration indigenous and local communities’ customary laws, community protocols and procedures with respect to traditional knowledge associated with genetic resources as provided in Article 12.1?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q041",
  				section: "indigenousProvisions",
  				number: "41",
  				type: "option",
  				title: "Has your country established mechanisms to inform potential users of traditional knowledge associated with genetic resources about their obligations as provided in Article 12.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q042",
  				section: "indigenousProvisions",
  				number: "42",
  				type: "option",
  				title: " Is your country supporting the development by indigenous and local communities of the following tools as provided in Article 12.3?",
  				multiple: true,
  				options: [
  					{
  						value: "community",
  						title: "Community protocols"
  					},
  					{
  						value: "mat",
  						title: "Minimum requirements for mutually agreed terms"
  					},
  					{
  						value: "mcc",
  						title: "Model contractual clauses"
  					}
  				]
  			},
  			{
  				key: "Q043",
  				section: "indigenousProvisions",
  				number: "43",
  				type: "option",
  				title: "Has your country endeavoured not to restrict the customary use and exchange of genetic resources and associated traditional knowledge within and among indigenous and local communities as provided in Article 12.4?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q044",
  				section: "indigenousProvisions",
  				number: "44",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges for putting measures in place in relation to traditional knowledge associated with genetic resources:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "conservationSustainable",
  		title: "Contribution to conservation and sustainable use (Article 9)",
  		questions: [
  			{
  				key: "Q045",
  				section: "conservationSustainable",
  				number: "45",
  				type: "option",
  				title: "Is your country encouraging users and providers to direct benefits arising from the utilization of genetic resources towards the conservation of biological diversity and sustainable use of its components as provided in Article 9?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q046",
  				section: "conservationSustainable",
  				number: "46",
  				type: "text",
  				field: "furtherInfo",
  				subTitle: "Please provide further information",
  				title: "Please indicate how the implementation of the Nagoya Protocol has contributed to conservation and sustainable use of biodiversity in your country:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q047",
  				section: "conservationSustainable",
  				number: "47",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "transboundary",
  		title: "Transboundary cooperation (Article 11)",
  		questions: [
  			{
  				key: "Q048",
  				section: "transboundary",
  				number: "48",
  				type: "option",
  				title: "Is your country endeavouring to cooperate, with the involvement of indigenous and local communities concerned, with a view to implementing the Protocol in instances where the same genetic resources are found in situ within the territory of more than one Party as provided in Article 11.1? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "ilcInfo",
  						title: "If your country has indigenous and local communities, please provide further detail of their involvement.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q049",
  				section: "transboundary",
  				number: "49",
  				type: "option",
  				title: "Is your country endeavouring to cooperate with a view to implementing the Protocol in instances where the same traditional knowledge associated with genetic resources is shared by one or more indigenous and local communities in several Parties as provided in Article 11.2?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					},
  					{
  						value: "false.notApplicable",
  						title: "Not applicable, since there are no indigenous and local communities in my country"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q050",
  				section: "transboundary",
  				number: "50",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "modelContractualClause",
  		title: "Model contractual clauses, codes of conduct, guidelines and best practices and/or standards (Article 19 and 20)",
  		questions: [
  			{
  				key: "Q051",
  				section: "modelContractualClause",
  				number: "51",
  				type: "option",
  				title: "Is your country encouraging the development, update and use of model contractual clauses for MAT as provided in Article 19? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q052",
  				section: "modelContractualClause",
  				number: "52",
  				type: "option",
  				title: "Is your country encouraging the development, update and use of codes of conduct, guidelines and best practices or standards as provided in Article 20? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q053",
  				section: "modelContractualClause",
  				number: "53",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "awarenessRaising",
  		title: "Awareness-raising and capacity (Article 21 and 22)",
  		questions: [
  			{
  				key: "Q054_a",
  				section: "awarenessRaising",
  				number: "54.1",
  				type: "option",
  				title: "Has your country taken measures to raise awareness of the importance of genetic resources and traditional knowledge associated with genetic resources and related access and benefit-sharing issues as provided in Article 21?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q054_b",
  				section: "awarenessRaising",
  				number: "54.2",
  				type: "option",
  				title: "Has your country taken measures to implement the awareness-raising strategy for the Nagoya Protocol on ABS? Adopted as descision NP-1/9",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q055_a",
  				section: "awarenessRaising",
  				number: "55.1",
  				type: "option",
  				title: "Has your country taken measures to build and develop capacity and strengthening of human resources and institutional capacities to effectively implement the Protocol as provided in Article 22? ",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q055_b",
  				section: "awarenessRaising",
  				number: "55.2",
  				type: "option",
  				title: "Has your country taken measures to implement the strategic framework for capacity-building and development to support effective implementation of the Nagoya Protocol on ABS?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q056",
  				section: "awarenessRaising",
  				number: "56",
  				type: "option",
  				title: "Has your country received external support for building and developing capacity for the implementation of the Nagoya Protocol?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q057",
  				section: "awarenessRaising",
  				number: "57",
  				type: "option",
  				title: "Has your country provided external support for building and developing capacity for the implementation of the Nagoya Protocol?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q058",
  				section: "awarenessRaising",
  				number: "58",
  				type: "text",
  				field: "challengesInfo",
  				title: "Additional Information",
  				subTitle: "Please provide a summary of the main difficulties and challenges:",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "technology",
  		title: "Technology transfer, collaboration and cooperation (Article 23)",
  		questions: [
  			{
  				key: "Q059",
  				section: "technology",
  				number: "59",
  				type: "option",
  				title: "Is your country collaborating and cooperating in technical and scientific research and development programmes as a means to achieve the objective of the Protocol as provided in Article 23?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "additionalInfo",
  						title: "Please provide a summary of the measures taken.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "optional",
  		title: "Optional additional information",
  		questions: [
  			{
  				key: "Q060",
  				section: "optional",
  				number: "60",
  				type: "text",
  				field: "challengesInfo",
  				title: "Please provide a summary of the main difficulties and challenges encountered for becoming a Party to the Nagoya Protocol.",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q061",
  				section: "optional",
  				number: "61",
  				type: "option",
  				title: "Has your country established a mechanism for budgetary allocations of funds for the implementation of the Nagoya Protocol?",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "additionalInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered.",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q062_a",
  				section: "optional",
  				number: "62.1",
  				type: "option",
  				title: "Has your country made financial resources available to other Parties or received financial resources from other Parties or financial institutions for the purposes of implementation of the Protocol as provided in Article 25?",
  				multiple: false,
  				options: [
  					{
  						value: "donor",
  						title: "Yes, financial resources have been made available"
  					},
  					{
  						value: "recipient",
  						title: "Yes, financial resources have been received"
  					},
  					{
  						value: "recipient.parties",
  						title: "From other Parties"
  					},
  					{
  						value: "recipient.financialInstitutions",
  						title: "From financial institutions"
  					},
  					{
  						value: "recipient.gef",
  						title: "From the Global Environmental Facility"
  					},
  					{
  						value: "recipient.npImplementationFund",
  						title: "From the Nagoya Protocol Implementation Fund"
  					},
  					{
  						value: "recipient.otherSources",
  						title: "From other sources"
  					},
  					{
  						value: "no",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q062_b",
  				section: "optional",
  				number: "62.2",
  				type: "text",
  				shortTitle: "Free text",
  				field: "relevantInformation",
  				title: "Please provide information on experiences related to the mobilization of resources in support of the implementation of the Protocol.",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q062_c",
  				section: "optional",
  				number: "62.3",
  				type: "text",
  				shortTitle: "Free text",
  				field: "relevantInformation",
  				title: "Please provide information on the status of funds mobilized in support of the implementation of the Protocol.",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q063_a",
  				section: "optional",
  				number: "63.1",
  				type: "option",
  				title: "Does your country have specific staff to administer functions directly related to the implementation of the Nagoya Protocol?",
  				subTitle: "The collection of this information could be useful for the evaluation of the effectiveness of the Protocol under Article 31 on assessment and review as well as for measuring progress and identifying difficulties and challenges implementing the Protocol.",
  				multiple: false,
  				options: [
  					{
  						value: "true",
  						title: "Yes"
  					},
  					{
  						value: "false",
  						title: "No"
  					}
  				],
  				additionalInfo: [
  					{
  						field: "challengesInfo",
  						title: "Please provide a summary of the main difficulties and challenges encountered.",
  						type: "string"
  					},
  					{
  						field: "furtherInfo",
  						title: "Please provide further information",
  						type: "string"
  					},
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					}
  				]
  			},
  			{
  				key: "Q063_b",
  				section: "optional",
  				number: "63.2",
  				type: "option",
  				title: "Please indicate how many",
  				multiple: false,
  				options: [
  					{
  						value: "one",
  						title: "One"
  					},
  					{
  						value: "Less than 5",
  						title: "Less than 5"
  					},
  					{
  						value: "Less than 10",
  						title: "Less than 10"
  					},
  					{
  						value: "10 or more",
  						title: "10 or more"
  					}
  				]
  			},
  			{
  				key: "Q064",
  				section: "awarenessRaising",
  				number: "64",
  				type: "text",
  				shortTitle: "Free text",
  				field: "furtherInfo",
  				title: "Any other relevant information",
  				multiple: false,
  				additionalInfo: [
  					{
  						field: "documentReferenceIDs",
  						title: "Please select the relevant ABSCH records",
  						type: "list"
  					},
  					{
  						field: "relevantDocuments",
  						title: "Any other relevant documents",
  						type: "fileLinks"
  					}
  				]
  			}
  		]
  	},
  	{
  		key: "comments",
  		title: "Comments on the reporting format",
  		questions: [
  			{
  				key: "Q065",
  				section: "comments",
  				number: "65",
  				type: "text",
  				title: "Please provide any comment that you may have regarding the format of this report",
  				multiple: false
  			}
  		]
  	}
  ];

  return npInterimNationalReport1;

});
