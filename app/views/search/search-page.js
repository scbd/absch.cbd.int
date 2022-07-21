import '~/app';

import '~/components/scbd-angularjs-services/main';
import '~/views/register/user-preferences/user-alerts';
import '~/views/search/search-directive';
import 'css!~/css/search.css';
    
    export { default as template } from './search-page.html';
export default ["$scope", '$sce', 'ngMeta', 'realm', 'locale',
     function($scope, $sce, ngMeta, realm, locale) {
            
            $('[role="tooltip"]').hide();
            
            ngMeta.resetMeta();  
            var url   = realm.baseURL + '/' + locale + '/search'
            ngMeta.setTitle('Search')
            ngMeta.setTag('canonical', $sce.trustAsResourceUrl(url))
        }
    ];

