import app from 'app'
import 'ng-breadcrumbs';
import breadcrumbsHtml from 'text!./breadcrumbs.html';

app.directive('breadcrumbs', ['breadcrumbs',function (breadcrumbs) { 
    return { 
        restrict: 'E', 
        template: breadcrumbsHtml,
        link:($scope)=>{

            $scope.getBreadcrumbs = function(){
                return _.uniqBy(breadcrumbs.get(), item => { return item.path; });
            }

        }
    }; 
}]);   