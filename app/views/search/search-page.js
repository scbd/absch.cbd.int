import app from 'app';
import exportExcel from 'lodash';
import 'components/scbd-angularjs-services/main';
import 'views/search/search-directive';
import 'css!/app/css/search.css';
    
    export default ["$scope", '$sce', 'ngMeta', 'realm', 'locale', 'testResolve',
     function($scope, $sce, ngMeta, realm, locale, testResolve) {

        console.log(testResolve)
            
            $('[role="tooltip"]').hide();
            
            ngMeta.resetMeta();  
            var url   = realm.originalObject.baseURL + '/' + locale + '/search'
            ngMeta.setTitle('Search')
            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
        }
    ];

