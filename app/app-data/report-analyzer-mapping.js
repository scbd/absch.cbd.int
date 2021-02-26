define(function () { 'use strict';

    var reportAnalyzerMapping = {
    	abs: [
    		{
    			type: "npInterimNationalReport1",
    			title: "ABS - Interim National Report on the Implementation of the Nagoya Protocol",
    			questionsUrl: "app-data/abs/report-analyzer/npInterimNationalReport1",
    			mappingsUrl: "app-data/abs/report-analyzer/mapping/npInterimNationalReport1",
    			dataUrl: "/api/v2017/national-reports-np-1",
    			infoBlockUrl: "views/report-analyzer/includes/npInterimNationalReport1.html",
    			year: "2017",
    			deadline: "2017-11-01",
    			offlineFormats: [
    				{
    					lang: "en",
    					url: "http://www.cbd.int/abs/en/commonformats/NR-en.doc"
    				},
    				{
    					lang: "fr",
    					url: "http://www.cbd.int/abs/fr/commonformats/NR-fr.doc"
    				},
    				{
    					lang: "es",
    					url: "http://www.cbd.int/abs/es/commonformats/NR-es.doc"
    				},
    				{
    					lang: "ru",
    					url: "http://www.cbd.int/abs/ru/commonformats/NR-ru.doc"
    				},
    				{
    					lang: "ar",
    					url: "http://www.cbd.int/abs/ar/commonformats/NR-ar.doc"
    				},
    				{
    					lang: "zh",
    					url: "http://www.cbd.int/abs/zh/commonformats/NR-zh.doc"
    				}
    			]
    		}
    	],
    	bch: [
    		{
    			type: "cpbInterimNationalReport",
    			title: "CPB - Interim National Report",
    			year: "2005",
    			deadline: "2005-09-11",
    			stats: {
    				partyCount: 121,
    				partyReportCount: 55,
    				nonPartyReportCount: 0,
    				regionMapping: {
    					"D50FE62D-8A5E-4407-83F8-AFCAAF708EA4": {
    						count: 9
    					},
    					"5E5B7AA4-2420-4147-825B-0820F7EC5A4B": {
    						count: 7
    					},
    					"942E40CA-4C23-4D3A-A0B4-736CD0EFCD54": {
    						count: 12
    					},
    					"3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E": {
    						count: 9
    					},
    					"0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B": {
    						count: 18
    					}
    				}
    			}
    		},
    		{
    			type: "cpbNationalReport1",
    			title: "CPB - First National Report",
    			year: "2007",
    			deadline: "2007-09-11",
    			stats: {
    				partyCount: 141,
    				partyReportCount: 87,
    				nonPartyReportCount: 4,
    				regionMapping: {
    					"D50FE62D-8A5E-4407-83F8-AFCAAF708EA4": {
    						count: 25
    					},
    					"5E5B7AA4-2420-4147-825B-0820F7EC5A4B": {
    						count: 20
    					},
    					"942E40CA-4C23-4D3A-A0B4-736CD0EFCD54": {
    						count: 16
    					},
    					"3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E": {
    						count: 12
    					},
    					"0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B": {
    						count: 18
    					}
    				}
    			}
    		},
    		{
    			type: "cpbNationalReport2",
    			title: "CPB - Second National Report",
    			questionsUrl: "app-data/bch/report-analyzer/cpbNationalReport2",
    			dataUrl: "/api/v2015/national-reports-cpb-2",
    			infoBlockUrl: "views/report-analyzer/includes/cpbNationalReport2.html",
    			year: "2011",
    			deadline: "2011-09-30",
    			compare: [
    				{
    					title: "",
    					url: "app-data/bch/report-analyzer/mapping/cpbNationalReport2"
    				}
    			]
    		},
    		{
    			type: "cpbNationalReport3",
    			title: "CPB - Third National Report",
    			questionsUrl: "app-data/bch/report-analyzer/cpbNationalReport3",
    			dataUrl: "/api/v2015/national-reports-cpb-3",
    			infoBlockUrl: "views/report-analyzer/includes/cpbNationalReport3.html",
    			year: "2015",
    			deadline: "2015-10-31",
    			compare: [
    				{
    					title: "Compare with 2nd National Report Question",
    					url: "app-data/bch/report-analyzer/mapping/cpbNationalReport3-2"
    				}
    			]
    		},
    		{
    			type: "cpbNationalReport4",
    			title: "CPB - Fourth National Report",
    			questionsUrl: "app-data/bch/report-analyzer/cpbNationalReport4",
    			dataUrl: "/api/v2019/report-analyzer/national-report-cpb-4",
    			infoBlockUrl: "views/report-analyzer/includes/cpbNationalReport4.html",
    			year: "2019",
    			deadline: "2019-10-01",
    			compare: [
    				{
    					title: "Compare with 3rd National Report Question",
    					url: "app-data/bch/report-analyzer/mapping/cpbNationalReport4-3"
    				},
    				{
    					title: "Compare with 2nd National Report Question",
    					url: "app-data/bch/report-analyzer/mapping/cpbNationalReport4-2"
    				}
    			],
    			offlineFormats: [
    				{
    					lang: "en",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_en.doc?download"
    				},
    				{
    					lang: "fr",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_fr.doc?download"
    				},
    				{
    					lang: "es",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_es.doc?download"
    				},
    				{
    					lang: "ru",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_ru.doc?download"
    				},
    				{
    					lang: "ar",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_ar.doc?download"
    				},
    				{
    					lang: "zh",
    					url: "http://bch.cbd.int/protocol/4thnationalreport/format4thnationalreportcartagenaprotocol_zh.doc?download"
    				}
    			]
    		}
    	]
    };

    return reportAnalyzerMapping;

});
