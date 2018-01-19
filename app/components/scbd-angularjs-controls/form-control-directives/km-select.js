define(['app', 'angular', 'jquery', 'lodash', 'text!./km-select.html','scbd-angularjs-filters',
       'scbd-angularjs-services/locale'], 
function(app, angular, $, _, template) {
  //============================================================
  //
  //
  //============================================================
  app.directive('kmSelect', function() {
    return {
      restrict: 'EAC',
      template: template,
      replace: true,
      transclude: false,
      require: "?ngModel",
      scope: {
        binding: "=ngModel",
        itemsFn: "&items",
        ngDisabledFn: "&ngDisabled",
        required: "@",
        placeholder: "@",
        bindingType: "@",
        allowOther: "@",
        minimumFn: "&minimum",
        maximumFn: "&maximum",
        api: "=?",
        showDescription: '@?'
        // ,locale: '@?'
      },
      link: function($scope, $element, $attrs, ngModelController) {
       
        $scope.identifier = null;
        $scope.rootItems = null;
        $scope.attr = $attrs;
        $scope.multiple = $attrs.multiple !== undefined && $attrs.multiple !== null;
        $scope.watchItems = $attrs.watchItems !== undefined && $attrs.watchItems !== null;
        $scope.displayCount = $attrs.displayCount || 3;

        if ($scope.showDescription === undefined)
          $scope.showDescription = 'false';

        $scope.$watch('identifier', $scope.save);
        $scope.$watch('items', $scope.load);

        $scope.$watch('binding', function(newBinding) {
          ngModelController.$setViewValue($scope.binding);
          if (newBinding)
            $scope.autoInit().then($scope.load);
          // else {
          //     $scope.clearSelection();
          // }
        });

        if ($scope.watchItems)
          $scope.$watch($scope.itemsFn, function(items) {
            if (items)
              $scope.autoInit(true).then($scope.load);
          });

        $element.find('.dropdown-menu').click(function(event) {
          if ($scope.multiple && $scope.getSelectedItems().length !== 0)
            event.stopPropagation();
        });

        if ($scope.multiple && $attrs.showSelectionPopOver)
          $element.find('.dropdown-toggle').popover({
            trigger: "hover",
            html: true,
            placement: "top",
            content: function() {
              var oNames = _.map($scope.getTitles(), function(o) {
                return o;
              });
          
              if (!oNames || !oNames.length)
                return null;
          
              return "<ul><li style=\"width:500px;\">" + oNames.join("</li>\n<li>") + "</li></ul>";
            }
          });


        $scope.$on('clearSelectSelection', function(info) {
          $scope.clearSelection(info && info.data ? info.data.identifier : undefined);
        });
      },
      controller: ["$scope", "$q", "$filter", "$timeout", "locale", function($scope, $q, $filter, $timeout, locale) {

        var revisionRegex =  /@([0-9]{1,3})/;
        
        $scope.currentLocale = locale;


        $scope.api = {
          unSelectItem: onUnSelectItem,
          unSelectAll: onUnSelectAll,
          getItem: onGetItem,
          selectItem: onSelectItem,
          selectAll: onSelectAll,
        };

        function onUnSelectItem(item) {

          if (item.identifier) {
            $scope.clearSelection(item.identifier);
          }
        }

        function onUnSelectAll() {
          $scope.clearSelection();
        }

        function onSelectAll() {
          _.each($scope.allItems || [], function(item) {
            item.selected = true;
          });
          $scope.save();
        }

        function onSelectItem(item) {

          if (item.identifier) {
            var element = _.findWhere($scope.allItems || [], {identifier: item.identifier})
            if(element){
              element.selected = true;
              $scope.save();
            }
          }
        }

        function onGetItem(identifier) {
          return _.find($scope.allItems, {
            identifier: identifier
          });
        }

        //==============================
        //
        //==============================
        function transform(data) {
          if (_.isArray(data)) {
            data = _.filter(data, _.isObject);
            data = _.map(data, function(d) {
              return {
                identifier: d.identifier || d._id,
                title: d.title || d.name || d.name[$scope.currentLocale],
                children: transform(d.children || d.narrowerTerms),
                selected: false,
                metadata: d.metadata,
                description: d.description
              };
            });
          }

          return data;
        }

        //==============================
        //
        //==============================
        function flaten(subTree, parent) {
          var oResult = [];

          _.each(subTree, function(o) {
            oResult.push(o);
            if(parent)
              o.parent = parent;
            if (o.children)
              oResult = _.union(oResult, flaten(o.children, o.identifier));
          });

          return oResult;
        }
        //==============================
        //
        //==============================
        $scope.autoInit = function(forceReinit) {

          if (forceReinit) {
            $scope.isInit = false;
            $scope.__loading = false;
          }

          var deferred = $q.defer();

          if ($scope.isInit) {
            $timeout(function() {
              if ($scope.allItems)
                deferred.resolve();
              else
                deferred.reject("Data not loaded");
            });
          } else {
            $scope.isInit = true;
            $scope.setError(null);
            $scope.__loading = true;

            $q.when($scope.itemsFn(),
              function(data) { // on success
                $scope.__loading = false;
                $scope.rootItems = transform(data); //clone values
                $scope.allItems = flaten($scope.rootItems);

                deferred.resolve();
              },
              function(error) { // on error
                $scope.__loading = false;
                $scope.setError(error);
                deferred.reject(error);
              });
          }

          return deferred.promise;
        };

        //==============================
        //
        //==============================
        $scope.getTitle = function(maxCount, truncate) {
          if ($scope.__loading)
            return "Loading...";

          if (maxCount === undefined || maxCount === null)
            maxCount = -1;

          var oNames = $scope.getTitles();

          if (truncate) {
            oNames = _.map(oNames, function(name) {
              return $filter('truncate')(name, 60, '...');
            });
          }

          if (oNames.length === 0)
            return $scope.placeholder || "Nothing selected...";
          else if (maxCount < 0 || oNames.length <= maxCount)
            return oNames.join(', ');

          return "" + oNames.length + " of " + $scope.allItems.length + " selected";
        };

        //==============================
        //
        //==============================
        $scope.getTitles = function() {
          return _.map($scope.getSelectedItems(), function(o) {
            return $filter("lstring")(o.title || o.name, $scope.currentLocale);
          });
        };

        //==============================
        //
        //==============================
        $scope.getMinimum = function() {
          var value = $scope.minimumFn();

          if (isNaN(value))
            value = 0;

          return Math.max(value, 0);
        };

        //==============================
        //
        //==============================
        $scope.getMaximum = function() {
          var value = $scope.maximumFn();

          if (isNaN(value))
            value = 2147483647;

          return Math.min(value, 2147483647);
        };

        //==============================
        // in tree order /deep first
        //==============================
        $scope.getSelectedItems = function() {
          return _.where($scope.allItems || [], {
            selected: true
          });
        };

        //==============================
        //
        //==============================
        $scope.hasSelectedItems = function(subItems) {
          return _.findWhere($scope.allItems || [], {
            selected: true
          }) !== undefined;
        };

        //==============================
        //
        //==============================
        $scope.load = function() {
          if (!$scope.allItems) // Not initialized
            return;

          var oBinding = $scope.binding || [];

          if (!_.isArray(oBinding) && (_.isString(oBinding) || _.isObject(oBinding)))
            oBinding = [oBinding];

          if (!_.isArray(oBinding))
            throw "Value must be array";

          oBinding = _.map(oBinding, function(item) {
            return _.isString(item) ? {
              identifier: item
            } : item;
          });

          angular.forEach($scope.allItems, function(item) {
            item.selected = _.find(oBinding, function(o) {
              return o.identifier === item.identifier ||
                    // if the identifier has revision attached with it remove revison for comparision
                     o.identifier.replace(revisionRegex,'') === item.identifier.replace(revisionRegex,'');
            }) !== undefined;
          });
        };

        //==============================
        //
        //==============================
        $scope.save = function() {
          if (!$scope.allItems) // Not initialized
            return;
          var retObj={};
          var oBindings = _.map($scope.getSelectedItems(), function(o) {

            if(o.customValue)
              retObj={
                identifier: o.identifier,
                customValue: o.customValue
              };
              else
              retObj={
                identifier: o.identifier,
              };
            return retObj;
          });

          if ($scope.bindingType == "string" || $scope.bindingType == "string[]")
            oBindings = _.pluck(oBindings, 'identifier');

          if (!$scope.multiple)
            oBindings = _.first(oBindings);

          if ($.isEmptyObject(oBindings))
            oBindings = undefined;

          $scope.binding = oBindings;
        };

        //==============================
        //
        //==============================
        $scope.isRequired = function() {
          return $scope.required !== undefined;
        };

        //==============================
        //
        //==============================
        $scope.setError = function(error) {
          if (!error) {
            $scope.error = null;
            return;
          }

          if (error.status == 404) $scope.error = "Items not found";
          else $scope.error = error.data || "unkown error";
        };

        //==============================
        //
        //==============================
        $scope.chooseOther = function() {
          alert("todo");
        };

        //==============================
        //
        //==============================
        $scope.clearSelection = function(identifier) {
          if (!identifier) {
            _.each($scope.allItems || [], function(item) {
              item.selected = false;
            });
          } else {
            var item = _.find($scope.allItems, {
              identifier: identifier
            });
            if (item)
              item.selected = false;
          }

          $scope.save();
        };

        //==============================
        //
        //==============================
        $scope.itemEnabled = function(item) {

          if ($scope.getMinimum() > 0 && $scope.getSelectedItems().length <= $scope.getMinimum())
            if (item === null || $scope.getSelectedItems().indexOf(item) >= 0)
              return false;

          if ($scope.getMaximum() < $scope.allItems.length && $scope.getSelectedItems().length >= $scope.getMaximum())
            if (item !== null && $scope.getSelectedItems().indexOf(item) < 0)
              return false;
          return true;
        };

        //==============================
        //
        //==============================
        $scope.clicked = function(clickedItem) {

          if (!$scope.itemEnabled(clickedItem))
            return;

          if ($scope.multiple && clickedItem)
            clickedItem.selected = !clickedItem.selected;

          if (!$scope.multiple || !clickedItem) {
            _.each($scope.allItems || [], function(item) {
              item.selected = (item == clickedItem);
            });
          }

          $scope.save();
        };
        $('#filterText').on("click", "*", function(e) {
          e.stopPropagation();
        });
        $(document).on('click', '#filterText input', function(e) {
          e.stopPropagation();
        });

      }]
    };
  });
});
