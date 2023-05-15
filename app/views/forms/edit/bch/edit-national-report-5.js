 
import app from '~/app';
import '~/views/forms/edit/edit';
import '~/views/forms/edit/directives/edit-national-report.directive';
import {cpbNationalReport5} from '~/app-data/bch/report-analyzer/cpbNationalReport5';
import {cpbNationalReport4} from '~/app-data/bch/report-analyzer/cpbNationalReport4';
  export { default as template } from './edit-national-report-5.html';

  export default ["$scope", '$routeParams', '$controller', function($scope, $routeParams, $controller) {
		$controller('editController', {
            $scope: $scope
        });
        $scope.tabs = [{
                   "tab":1,
                   "title":"1 - 6",
                   render:true
               },
               {
                   "tab":2,
                   "title":"7 - 13",
                   "sections" : [{key:"General"}, {key:"Article2"}]
               },
               {
                   "tab":3,
                   "title":"14 - 19",
                   "sections" : [{key:"Article5"}, {key:"Article6"}]
               },
               {
                    "tab":4,
                    "title":"20 - 30",
                    "sections" : [{key:"Articles7-10"}]
               },
               {
                    "tab":5,
                    "title":"31 - 36",
                    "sections" : [{key:"Article11"}]
               },
               {
                    "tab":5,
                    "title":"37 - 44",
                    "sections" : [{key:"Article12"}]
               },
               {
                    "tab":6,
                    "title":"45 - 52",
                    "sections" : [{key:"Article13"},{key:"Article14"}]
               },
               {
                    "tab":7,
                    "title":"53 - 72",
                    "sections" : [{key:"Articles15-16"}]
               },
               {
                    "tab":8,
                    "title":"73 - 78",
                    "sections" : [{key:"Article17"}]
               },
               {
                    "tab":9,
                    "title":"79 - 97",
                    "sections" : [{key:"Article18"}]
               }
           ];
           //ToDo Move to report analyzer common folder. 
           //ToDo remove from here, for testing only
          $scope.questions = [cpbNationalReport5, cpbNationalReport4];
          $scope.mapping = {
            "Q02"        : { prevQuestion : "Q09",   showMessage: false },
            "Q03"        : { prevQuestion : "Q010",   showMessage: false },
            "Q04"        : { prevQuestion : "Q011",   showMessage: false },
            "Q05"        : { prevQuestion : "Q012",   showMessage: false },
            "Q06"        : { prevQuestion : "Q013",   showMessage: false },
            "Q07"        : { prevQuestion : "Q014",   showMessage: false },
            "Q08"        : { prevQuestion : "Q015",   showMessage: false },
            "Q011"        : { prevQuestion : "Q018",   showMessage: false },
            "Q012"        : { prevQuestion : "Q019",   showMessage: false },
            "Q013"        : { prevQuestion : "Q020",   showMessage: false },
            "Q014"        : { prevQuestion : "Q021",   showMessage: false },
            "Q015"        : { prevQuestion : "Q022",   showMessage: false },
            "Q016"        : { prevQuestion : "Q023",   showMessage: false },
            "Q017"        : { prevQuestion : "Q024",   showMessage: false },
            "Q018"        : { prevQuestion : "Q025",   showMessage: false },
            "Q019"        : { prevQuestion : "Q026",   showMessage: false },
            "Q020"        : { prevQuestion : "Q027",   showMessage: false },
            "Q021"        : { prevQuestion : "Q028",   showMessage: false },
            "Q022"        : { prevQuestion : "Q029",   showMessage: false },
            "Q023"        : { prevQuestion : "Q030",   showMessage: false },
            "Q024"        : { prevQuestion : "Q031",   showMessage: false },
            "Q025"        : { prevQuestion : "Q032",   showMessage: false },
            "Q026"        : { prevQuestion : "Q033",   showMessage: false },
            "Q027"        : { prevQuestion : "Q036",   showMessage: false },//36 and 37
            "Q028"        : { prevQuestion : "Q034",   showMessage: false },
            "Q029"        : { prevQuestion : "Q035",   showMessage: false },
            "Q030"        : { prevQuestion : "Q038",   showMessage: false },
            "Q031"        : { prevQuestion : "Q039",   showMessage: false },
            "Q032"        : { prevQuestion : "Q040",   showMessage: false },
            "Q033"        : { prevQuestion : "Q041",   showMessage: false },
            "Q034"        : { prevQuestion : "Q042",   showMessage: false },
            "Q035"        : { prevQuestion : "Q043",   showMessage: false },
            "Q036"        : { prevQuestion : "Q044",   showMessage: false },
            "Q037"        : { prevQuestion : "Q045",   showMessage: false },
            "Q038"        : { prevQuestion : "Q046",   showMessage: false },
            "Q039"        : { prevQuestion : "Q047",   showMessage: false },
            "Q040"        : { prevQuestion : "Q048",   showMessage: false },
            "Q041"        : { prevQuestion : "Q049",   showMessage: false },
            "Q042"        : { prevQuestion : "Q050",   showMessage: false },
            "Q043"        : { prevQuestion : "Q051",   showMessage: false },
            "Q044"        : { prevQuestion : "Q052",   showMessage: false },
            "Q045"        : { prevQuestion : "Q053",   showMessage: false },
            "Q046"        : { prevQuestion : "Q054",   showMessage: false },
            "Q047"        : { prevQuestion : "Q055",   showMessage: false },
            "Q048"        : { prevQuestion : "Q056",   showMessage: false },
            "Q049"        : { prevQuestion : "Q057",   showMessage: false },
            "Q050"        : { prevQuestion : "Q058",   showMessage: false },
            "Q051"        : { prevQuestion : "Q059",   showMessage: false },
            "Q052"        : { prevQuestion : "Q060",   showMessage: false }
        }
     }];