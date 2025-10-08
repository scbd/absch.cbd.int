import reportTranslation from '../app-text/report-analyzer/report-analyzer-mapping.json' with { type: "json" };
import { mergeTranslationKeys } from '../services/translation-merge.js';
import absOfflineFormats from '../app-data/abs/offline-formats.json' with { type: 'json' };
import bchOfflineFormats from '../app-data/bch/offline-formats.json' with { type: 'json' };

const reportAnalyzerMappingJson = mergeTranslationKeys(reportTranslation);
export const analyzerMapping =
{
    "abs" : [
        {
            "type"         : "npInterimNationalReport1",
            "title"        : reportAnalyzerMappingJson.absNRTitle,
            "questionsUrl" : "app-data/abs/report-analyzer/npInterimNationalReport1",
            "mappingsUrl"  : "app-data/abs/report-analyzer/mapping/npInterimNationalReport1.json",
            "dataUrl"      : "/api/v2017/national-reports-np",
            "year"          : "2017",
            "deadline"      : "2017-11-01",
            "offlineFormats": absOfflineFormats.npInterimNationalReport1,
        },
        {
            "type"         : "absNationalReport1",
            "title"        : reportAnalyzerMappingJson.absNR1Title,
            "questionsUrl" : "app-data/abs/report-analyzer/absNationalReport1",
            "mappingsUrl"  : "app-data/abs/report-analyzer/mapping/absNationalReport1.json",
            "dataUrl"      : "/api/v2019/report-analyzer/abs-national-report-1",
            "year"          : "2024",
            "deadline"      : "2026-02-28",
            "offlineFormats": absOfflineFormats.absNationalReport1,
        }
    ],
    "bch" : [
        {
            "type"          : "cpbInterimNationalReport",
            "title"         : reportAnalyzerMappingJson.bchInterimNRTitle,
            "year"          : "2005",
            "deadline"      : "2005-09-11",
            "stats"         : {
                "partyCount"       : 121,  
                "partyReportCount" : 55,
                "nonPartyReportCount": 0,
                "regionMapping" : {
                    "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4" : { "count" :9 },
                    "5E5B7AA4-2420-4147-825B-0820F7EC5A4B" : { "count" :7 },
                    "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54" : { "count" :12 },
                    "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E" : { "count" :9 },
                    "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B" : { "count" :18 } 
                }
            }
        },
        {
            "type"          : "cpbNationalReport1",
            "title"         : reportAnalyzerMappingJson.bchNR1Title,
            "year"          : "2007",
            "deadline"      : "2007-09-11",
            "stats"         : {
                "partyCount"       : 141,  
                "partyReportCount" : 87,
                "nonPartyReportCount": 4,
                "regionMapping" : {
                    "D50FE62D-8A5E-4407-83F8-AFCAAF708EA4" : { "count" :25 },
                    "5E5B7AA4-2420-4147-825B-0820F7EC5A4B" : { "count" :20 },
                    "942E40CA-4C23-4D3A-A0B4-736CD0EFCD54" : { "count" :16 },
                    "3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E" : { "count" :12 },
                    "0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B" : { "count" :18 }
                }
            }
        },
        {
            "type"          : "cpbNationalReport2",
            "title"         :  reportAnalyzerMappingJson.bchNR2Title,
            "questionsUrl"  : "app-data/bch/report-analyzer/cpbNationalReport2",
            "dataUrl"       : "/api/v2015/national-reports-cpb-2",
            "year"          : "2011",
            "deadline"      : "2011-09-30",
            "compare"       : [{"title": "", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport2.json"}]
        },
        {   
            "type"          : "cpbNationalReport3",
            "title"         :  reportAnalyzerMappingJson.bchNR3Title,
            "questionsUrl"  : "app-data/bch/report-analyzer/cpbNationalReport3",
            "dataUrl"       : "/api/v2015/national-reports-cpb-3",
            "year"          : "2015",
            "deadline"      : "2015-10-31",
            "compare"       : [{"title": "Compare with 2nd National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport3-2.json"}]
        },
        {   
            "type"          : "cpbNationalReport4",
            "title"         :  reportAnalyzerMappingJson.bchNR4Title,
            "questionsUrl"  : "app-data/bch/report-analyzer/cpbNationalReport4",
            "dataUrl"       : "/api/v2019/report-analyzer/national-report-cpb-4",
            "year"          : "2019",
            "deadline"      : "2019-10-01",
            "compare"       : [ 
                                {"title": "Compare with 3rd National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport4-3.json"},
                                {"title": "Compare with 2nd National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport4-2.json"}
                              ],
            "offlineFormats": bchOfflineFormats.cpbNationalReport4,	
        },
        {   
            "type"          : "cpbNationalReport5",
            "title"         :  reportAnalyzerMappingJson.bchNR5Title,                               
            "questionsUrl"  : "app-data/bch/report-analyzer/cpbNationalReport5",
            "dataUrl"       : "/api/v2019/report-analyzer/cpb-national-report-5",
            "year"          : "2024",
            "deadline"      : "2026-02-28",
            "compare"       : [ 
                                {"title": "Compare with 4th National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport5-4.json"},
                                {"title": "Compare with 3rd National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport4-3.json"},
                                {"title": "Compare with 2nd National Report Question", "url":"app-data/bch/report-analyzer/mapping/cpbNationalReport4-2.json"}
                              ],
            "offlineFormats": bchOfflineFormats.cpbNationalReport5,		
        }
    ]
}
