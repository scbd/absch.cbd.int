import categoryTitleTranslations from '~/app-text/components/abs-kb-categories.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const categoryTitle = mergeTranslationKeys(categoryTitleTranslations);

export const categories = [
  {
    "title": categoryTitle.nr1,
    "adminTags": [
      "nr1"
    ],
    "articles": []
  },
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
        "title": "Introduction",
        "identifier": "5bbcfe17f05916000167781d"
      },
      {
        "title": "What is it?",
        "identifier": "5bbd0fae7788250001467951"
      },
      {
        "title": "What does it do?",
        "identifier": "5bbe18b36669e20001f9ff7c"
      },
      {
        "title": "Who is it for?",
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
        "title": "For Governments",
        "identifier": "5b3e8c527ae83a00018c7058"
      },
      {
        "title": "For other stakeholders",
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
        "title": "Types of information available",
        "identifier": "5bc4a6d913c9a60001fc161c"
      },
      {
        "title": "Search",
        "identifier": "5bc4a88313c9a60001fc1623"
      },
      {
        "title": "Country profiles",
        "identifier": "5bc4a775c085230001d1d9f1"
      },
      {
        "title": "Email alerts",
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
        "title": "Information-sharing obligations",
        "identifier": "5bc4a96ec085230001d1d9fe"
      },
      {
        "title": "Interim national report",
        "identifier": "5bc4b948c085230001d1da12"
      },
      {
        "title": "CBD Account",
        "identifier": "5bc4ae8dc085230001d1da07"
      },
      {
        "title": "Offline common formats",
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
        "title": "Overview",
        "identifier": "5b05922ed763290001e1e437"
      },
      {
        "title": "Key entities and concepts",
        "identifier": "5be48690e9f3c10001911a01"
      },
      {
        "title": "Flow of information",
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
        "title": "Training",
        "identifier": "5bc4b35813c9a60001fc1637"
      },
      {
        "title": "Step-by-step guides",
        "identifier": "5bc4d04bd70fbc00017d1fd6"
      },
      {
        "title": "Contact us",
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
    "title": categoryTitle.indigenousPeoplesAndLocalCommunities,
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