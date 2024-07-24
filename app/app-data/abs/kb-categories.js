import categoryTitleTranslations from '~/app-text/components/abs-kb-categories.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const categoryTitle = mergeTranslationKeys(categoryTitleTranslations);

export const categories = [
  {
    "title": categoryTitle.announcements,
    "adminTags": [
      "absch-announcement"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.aboutAbsch,
    "adminTags": [
      "about"
    ],
    "articles": [{
        
        "identifier": "5bbcfe17f05916000167781d"
      },
      {
        
        "identifier": "5bbd0fae7788250001467951"
      },
      {
        
        "identifier": "5bbe18b36669e20001f9ff7c"
      },
      {
        
        "identifier": "5bbe14b867b79e0001630ca2"
      }
    ]
  },
  {
    "title": categoryTitle.gettingStarted,
    "adminTags": [
      "getting-started"
    ],
    "articles": [{
        
        "identifier": "5b3e8c527ae83a00018c7058"
      },
      {
        
        "identifier": "5bbe3a4d64f00600011e20d9"
      }
    ]
  },
  {
    "title": categoryTitle.findingInformation,
    "adminTags": [
      "finding-information"
    ],
    "articles": [{
        
        "identifier": "5bc4a6d913c9a60001fc161c"
      },
      {
        
        "identifier": "5bc4a88313c9a60001fc1623"
      },
      {
        
        "identifier": "5bc4a775c085230001d1d9f1"
      },
      {
        
        "identifier": "5bc4a8b4ddca1500014152ba"
      }
    ]
  },
  {
    "title": categoryTitle.submittingInformation,
    "adminTags": [
      "submitting-information"
    ],
    "articles": [{
        
        "identifier": "5bc4a96ec085230001d1d9fe"
      },
      {
        
        "identifier": "5bc4b948c085230001d1da12"
      },
      {
        
        "identifier": "5bc4ae8dc085230001d1da07"
      },
      {
        
        "identifier": "5bc4aecac085230001d1da09"
      }
    ]
  },
  {
    "title": categoryTitle.monitoringUtilization,
    "adminTags": [
      "monitoring"
    ],
    "articles": [{
        
        "identifier": "5b05922ed763290001e1e437"
      },
      {
        
        "identifier": "5be48690e9f3c10001911a01"
      },
      {
        
        "identifier": "5be4876871ac250001aadc45"
      }
    ]
  },
  {
    "title": categoryTitle.needHelp,
    "adminTags": [
      "getting-help"
    ],
    "articles": [{
        
        "identifier": "5bc4b35813c9a60001fc1637"
      },
      {
        
        "identifier": "5bc4d04bd70fbc00017d1fd6"
      },
      {
        
        "identifier": "5cf0296f3bb8b3000197273a"
      }
    ]
  },
  {
    "title": categoryTitle.eLearning,
    "adminTags": [
      "elearning"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.informalAdvisoryCommittee,
    "adminTags": [
      "meetings",
      "iac"
    ],
    "articles": [{
        "urlTitle": categoryTitle.fourthIACMeeting,
        "url": "https://www.cbd.int/meetings/NP-ABSCH-IAC-2019-01"
      },
      {
        "urlTitle": categoryTitle.thirdIACMeeting,
        "url": "https://www.cbd.int/meetings/ABSCHIAC-2017-01"
      },
      {
        "urlTitle": categoryTitle.secondIACMeeting,
        "url": "https://www.cbd.int/meetings/ABSCHIAC-2016-01"
      },
      {
        "urlTitle": categoryTitle.firstIACMeeting,
        "url": "https://www.cbd.int/meetings/ABSCH-IAC-01"
      },
      {
        "urlTitle": categoryTitle.pilotIACMeeting,
        "url": "https://www.cbd.int/meetings/ABS-IAC-CH-01"
      }
    ]
  },
  {
    "title": categoryTitle.governments,
    "adminTags": [
      "governments"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.parties,
    "adminTags": [
      "parties"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.nonParties,
    "adminTags": [
      "non-parties"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.usersGeneticResources,
    "adminTags": [
      "users"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.businessPrivateSector,
    "adminTags": [
      "business"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.researchAcademia,
    "adminTags": [
      "research"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.indigenousPeoples,
    "adminTags": [
      "iplc"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.localCommunities,
    "adminTags": [
      "iplc"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.capacityBuildingPartners,
    "adminTags": [
      "partner"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.donors,
    "adminTags": [
      "donors"
    ],
    "articles": []
  }

]