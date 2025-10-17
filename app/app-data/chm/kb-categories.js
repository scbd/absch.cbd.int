import categoryTitleTranslations from '~/app-text/components/chm-kb-categories.json';
import { mergeTranslationKeys } from '../../services/translation-merge';
const categoryTitle = mergeTranslationKeys(categoryTitleTranslations);

export const categories = [
  {
    "title": categoryTitle.announcements,
    "adminTags": [
      "chm-announcement"
    ],
    "articles": []
  },{
    "title": categoryTitle.about,
    "adminTags": [
      "about"
    ],
    "articles": [
    ]
  },
  {
    "title": categoryTitle.gettingStarted,
    "adminTags": [
      "getting-started"
    ],
    "articles": [
    ]
  },
  {
    "title": categoryTitle.findingInformation,
    "adminTags": [
      "finding-information"
    ],
    "articles": [
    ]
  },
  {
    "title":categoryTitle.submittingInformation,
    "adminTags": [
      "submitting-information"
    ],
    "articles": [
    ]
  },
  {
    "title": categoryTitle.nationalChm,
    "adminTags": [
      "national-chm"
    ],
    "articles": [
    ]
  },
  {
    "title": categoryTitle.gettingHelp,
    "adminTags": [
      "getting-help"
    ],
    "articles": [       
      {
        "title": "Contact us",
        "identifier": "5cf0296f3bb8b3000197273a"
      }
    ]
  },
  {
    "title":categoryTitle.eLearning,
    "adminTags": [
      "elearning"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.bioland,
    "adminTags": [
      "bioland"
    ],
    "articles": [
    ]
  },
  {
    "title": categoryTitle.chmAwards,
    "adminTags": [
      "chm-awards"
    ],
    "articles": []
  },
  {
    "title":categoryTitle.chmRelatedArticles,
    "adminTags": [
      "chm-related-articles"
    ],
    "articles": []
  },
  {
    "title": categoryTitle.webinars,
    "adminTags": [
      "webinars"
    ],
    "articles": []
  },
]
