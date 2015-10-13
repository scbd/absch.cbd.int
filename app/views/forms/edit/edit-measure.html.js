define(['app', 'underscore', 'angular', '/app/views/forms/edit/edit.js', '/app/js/common.js'], function (app, _, angular) {

  app.controller("editMeasure", ["$scope", "$http", "$filter", "$q", "Enumerable", "$controller", "$location", 'commonjs',
   function ($scope, $http, $filter, $q, Enumerable, $controller, $location, commonjs) {
    $controller('editController', { $scope: $scope });


    $scope.path = $location.path();

    _.extend($scope.options, {
      languages: function () {
        return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function (o) { return $filter("orderBy")(o.data, "name"); });
      },
      other		: function () {
        return $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true });
      },
      absMeasures: function () {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/50616B56-12F3-4C46-BC43-2DFC26679177/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true })
        ]).then(function (o) {
          //TODO: this function appears generic to returning from .all, perhaps cut code by making this function and reusing it?
          var data = o[0].data;
          data.push(o[1].data);
          return data;
        });
      },
      typeOfDocuments: function () {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/144CF550-7629-43F3-817E-CACDED34837E/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true })
        ]).then(function (o) {
          var data = o[0].data;
          data.push(o[1].data);
          return data;
        });
      },
      jurisdictions: function () {
        return $q.all([
          $http.get("/api/v2013/thesaurus/domains/7A56954F-7430-4B8B-B733-54B8A5E7FF40/terms", { cache: true }),
          $http.get("/api/v2013/thesaurus/terms/5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", { cache: true })
        ]).then(function (o) {
          var jurisdictions = o[0].data;
          jurisdictions.push(o[1].data)

          _.each(jurisdictions, function (element) {
            element.__value = element.name;
          });

          return jurisdictions;
        });
      },
      statuses: function () {
        return $http.get("/api/v2013/thesaurus/domains/ED7CDBD8-7762-4A84-82DD-30C01458A799/terms", { cache: true }).then(function (o) {
          var statuses = o.data;
          _.each(statuses, function (element) {
            element.__value = element.name;
          });
          return statuses;
        });
      },
      measures :  function(){
          return commonjs.loadSchemaDocumentsForDropdown('measure', $scope.document.header.identifier);
      },
      documentLinksExt: [{
        model: "language",
        title: "Language",
        required: true,
        options: function () {
          return $http.get(
            "/api/v2013/thesaurus/domains/ISO639-2/terms",
            { cache: true }
            ).then(function (o) {
              $scope.options.documentLinksExt[0].options = $filter("orderBy")(o.data, "name");
              _.each($scope.options.documentLinksExt[0].options, function (element) {
                element.__value = element.name;
              });

              return $scope.options.documentLinksExt[0].options;
            });
        },
      }],
      documentTranslationsExt: [
        {
          model: "language",
          title: "Language",
          required: true,
          options: function () {
            return $http.get("/api/v2013/thesaurus/domains/52AFC0EE-7A02-4EFA-9277-8B6C327CE21F/terms", { cache: true }).then(function (o) {
              $scope.options.documentTranslationsExt[0].options = $filter("orderBy")(o.data, "name");
              _.each($scope.options.documentTranslationsExt[0].options, function (element) {
                element.__value = element.name;
              });

              return $scope.options.documentTranslationsExt[0].options;
            });
          },
        },
        {
          model: "translationType",
          title: "Translation Type",
          required: true,
          options: function () {
            return $http.get("/api/v2013/thesaurus/domains/19E3C535-2919-4804-966C-E62728507291/terms", { cache: true }).then(function (o) {

              $scope.options.documentTranslationsExt[1].options = $filter("orderBy")(o.data, "name");
              _.each($scope.options.documentTranslationsExt[1].options, function (element) {
                element.__value = element.name;
              });
              return $scope.options.documentTranslationsExt[1].options;
            });
          },
        },

      ],
    });


    //==================================
    //
    //==================================
    $scope.getCleanDocument = function (document) {

      document = document || $scope.document;

      if (!document)
        return undefined;

      document = angular.fromJson(angular.toJson(document));

      if (!document.isAmendment) {
        document.amendedMeasures = undefined;
        document.amendmentsDescriptio = undefined;
      }
      if (document.expires !== undefined)
        delete document.expires;

      if (!$scope.isInLibrary("absch", document))
        document.absMeasures = undefined;

      if (!$scope.isInLibrary("bch", document)) {
        document.cpbSubjectAreas = undefined;
        document.cpbSubjectLmos = undefined;
      }

      if (!$scope.isJurisdictionRegional(document))
        document.jurisdictionRegions = undefined;

      if (!$scope.isJurisdictionSubNationalOrCommunity(document))
        document.jurisdictionName = undefined;

      if (!$scope.isNotLegallyBinded(document))
        document.adoption = undefined;

      if (!$scope.isLegallyBinded(document))
        document.entryIntoForce = undefined;

      if (!$scope.isRetired(document))
        document.retired = undefined;

      if (/^\s*$/g.test(document.notes))
        document.notes = undefined;

      if (document.limitedApplication == '')
        document.limitedApplication = undefined;

      if (document.absMeasures && !_.findWhere(document.absMeasures, { identifier: '5B6177DD-5E5E-434E-8CB7-D63D67D5EBED' }))
        document.otherAbsMeasure = undefined;

      return document;
    };

    $scope.setDocument({ libraries: [{ identifier: "cbdLibrary:abs-ch" }] });

    //==================================
    //
    //==================================
    $scope.isTypeOther = function (document) {
      document = document || $scope.document;

      if (!document || !document.type)
        return false;

      var qStatus = Enumerable.from([document.type]);

      return qStatus.any(function (o) { return o.identifier == "5B6177DD-5E5E-434E-8CB7-D63D67D5EBED" });
    }

    $scope.$on("loadDocument", function (evt, info) {
      if (info.schema != "measure")
        return;


        // if($scope.document && $scope.document.absMeasures){
           var queries = [$scope.options.absMeasures(), $scope.options.other()]
          $q.all(queries)
            .then(function(data){
              var elementMeasures = data[0];
              var other           = data[1].data;
              elementMeasures = appendOthers(elementMeasures, other);
              $scope.absMeasureApi.updateTerms(elementMeasures);

            });
        // }
    });

    function appendOthers(elementMeasures, other){
       _.each(elementsForOthers, function(element){
          var otherElement = angular.copy(other);

          otherElement.identifier = otherElement.identifier + '#' + element;
          otherElement.broaderTerms.push(element);
          elementMeasures.push(otherElement)

          var parentElement = _.find(elementMeasures, {identifier:element})
          if(parentElement)
            parentElement.narrowerTerms.push(otherElement.identifier);

        });
        return elementMeasures;
    }

    var elementsForOthers = [
      "24E809DA-20F4-4457-9A8A-87C08DF81E8A","E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63","9847FA8A-16C3-4466-A378-F20AF9FF883B","08B2CDEC-786F-4977-AD0A-6A709695528D","01DA2D8E-F2BB-4E85-A17E-AB0219194A17"
    ]


  }]);


  //============================================================
  //
  //
  //============================================================
  app.directive("editMeasureAbs", function () {
    return {
      restrict: "EAC",
      templateUrl: "/app/views/forms/edit/edit-measure.directive/abs",
      replace: true,
      transclude: false,
      require: "?ngModel",
      scope: {
        binding: "=ngModel",
        locales: "=",
        termsFn: "&terms",
        required: "@",
        layout: "@",
        document: "=document",
        api     : '=?'
      },
      link: function ($scope, $element, $attr, ngModelController) {
        $scope.identifiers = null;
        $scope.sections = null;
        $scope.otherCustomValues = null;
        $scope.terms = null;
        $scope.rootTerms = [];

        $scope.$watch("terms", $scope.onTerms);
        $scope.$watch("binding", $scope.load);
        $scope.$watch("binding", function () {
          ngModelController.$setViewValue($scope.binding);
        });

        $scope.$watch(function () { return angular.toJson($scope.identifiers) },       $scope.save); //use tojson to detect changes
        $scope.$watch(function () { return angular.toJson($scope.sections) },          $scope.save);
        $scope.$watch(function () { return angular.toJson($scope.otherCustomValues) }, $scope.save);

        $scope.init();

        if (!$attr["class"])
          $element.addClass("list-unstyled");

      },
      controller: ["$scope", "$q", "Thesaurus", "Enumerable",'$element', function ($scope, $q, thesaurus, Enumerable, $element) {

        var readOnlyElements = [
          "24E809DA-20F4-4457-9A8A-87C08DF81E8A","A862ABFC-B97D-4E6A-9A70-812A82A7CC19","4E2974DF-216E-46C8-8797-8E3A33D6A048","E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63","08B2CDEC-786F-4977-AD0A-6A709695528D","08B2CDEC-786F-4977-AD0A-6A709695528D","01DA2D8E-F2BB-4E85-A17E-AB0219194A17"
        ];

        var mainElements = [
          "24E809DA-20F4-4457-9A8A-87C08DF81E8A","E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63","9847FA8A-16C3-4466-A378-F20AF9FF883B","08B2CDEC-786F-4977-AD0A-6A709695528D","01DA2D8E-F2BB-4E85-A17E-AB0219194A17","1D2710D3-75C8-475D-8634-F912F06DAF25", "7CB2A03A-F0CF-4458-BB3B-A60DEC1F942E", "ECE508D3-26C6-42E6-A8B8-162606E5BA04", "ECBDB95A-B389-4DB4-AD9B-DA3590DF7781","5B6177DD-5E5E-434E-8CB7-D63D67D5EBED"
        ];
        var secondaryElements = [
          "4E2974DF-216E-46C8-8797-8E3A33D6A048","A862ABFC-B97D-4E6A-9A70-812A82A7CC19","1E824A31-BDFB-4C47-9593-8006B5FC7D60","B8A150E054154AD3AD97856ABD485E90","A896179F-833E-4F76-B3F4-81CC95C66592","E3E5D8F1-F25C-49AA-89D2-FF8F8974CD63","4C57FDB4-3B92-46DD-B4C2-BB93D3B2167C","1FCC6CA9-022F-42FD-BD02-43AE674FEB56","A71B36E8-D2CE-4254-A628-6DBFB902394C","5427EB8F-5532-4AE2-88EE-5B9619917480","5B6177DD-5E5E-434E-8CB7-D63D67D5EBED", "F2E6038A-6E99-4BCE-9582-155B72CC7730"
        ];

        $scope.api = {
          updateTerms : updateTerms
        }
        function updateTerms(newElements){
            $scope.terms = newElements;
           // $scope.onTerms(newElements);
        }
        //==============================
        //
        //==============================
        $scope.init = function () {
          $scope.setError(null);
          $scope.__loading = true;

          $q.when($scope.termsFn(),
            function (data) { // on success
              $scope.__loading = false;
              $scope.terms = data;
            }, function (error) { // on error
              $scope.__loading = false;
              $scope.setError(error);
            });
        }

        //==============================
        //
        //==============================
        $scope.load = function () {
          if (!$scope.terms) // Not initialized
            return;

          var oNewIdentifiers = {};
          var oNewSections = {};
          var oNewOtherCustomValues = {};

          if (!$.isArray($scope.terms))
            throw "Type must be array";

          if ($scope.binding) {

            if (!$.isArray($scope.binding))
              throw "Type must be array";

            for (var i = 0; i < $scope.binding.length; ++i) {
              var identifier = $scope.binding[i].identifier;
              //handle others
              if($scope.binding[i].parent){
                  identifier += '#' + $scope.binding[i].parent;
                  oNewOtherCustomValues[identifier] = $scope.binding[i].customValue
              }
              oNewIdentifiers[identifier] = true;
              oNewSections[identifier] = $scope.binding[i].section
            }
          }

          if (!angular.equals(oNewIdentifiers, $scope.identifiers))             $scope.identifiers = oNewIdentifiers;
          if (!angular.equals(oNewSections, $scope.sections))                   $scope.sections = oNewSections;
          if (!angular.equals(oNewOtherCustomValues, $scope.otherCustomValues)) $scope.otherCustomValues = oNewOtherCustomValues;
        }

        //==============================
        //
        //==============================
        $scope.save = function () {
          if (!$scope.identifiers)
            return;

          var oNewBinding = [];

          angular.forEach($scope.terms, function (term, i) {
            if (term == undefined) return //IE8 BUG

            if ($scope.identifiers[term.identifier]) {

              var oTerm = { identifier: term.identifier };
              //handle others
              if(oTerm.identifier.indexOf('#')>0){
                var identifiers   = oTerm.identifier.split('#');
                oTerm.identifier  = identifiers[0];
                oTerm.parent      = identifiers[1];
                oTerm.customValue = $scope.otherCustomValues[term.identifier];
              }


              if ($scope.sections[term.identifier])
                oTerm.section = $scope.sections[term.identifier];

              oNewBinding.push(oTerm);
            }
          });

          if ($.isEmptyObject(oNewBinding))
            oNewBinding = undefined;

          if (!angular.equals(oNewBinding, $scope.binding))
            $scope.binding = oNewBinding;
        }

        //==============================
        //
        //==============================
        $scope.isRequired = function () {
          return $scope.required != undefined
            && $.isEmptyObject($scope.binding);
        }

        //==============================
        //
        //==============================
        $scope.onTerms = function (refTerms) {

          $scope.rootTerms = [];

          if (refTerms) {
            if (($scope.layout || "tree") == "tree") //Default layout
              $scope.rootTerms = thesaurus.buildTree(refTerms);
            else
              $scope.rootTerms = Enumerable.from(refTerms).Select("o=>{identifier : o.identifier, name : o.name, title : o.title, description : o.description}").ToArray();
          }

          $scope.load();
        }

        //==============================
        //
        //==============================
        $scope.setError = function (error) {
          if (!error) {
            $scope.error = null;
            return;
          }

          if (error.status == 404) $scope.error = "Terms not found";
          else $scope.error = error.data || "unkown error";
        }

        $scope.$emit("getDocumentInfo", {});

        $scope.isReadOnly = function(identifier){
          return _.indexOf(readOnlyElements, identifier)>=0;
        }

         $scope.isMainElement = function(identifier){
          return _.indexOf(mainElements, identifier)>=0;
        }
          $scope.isSecondaryElement = function(identifier){
          return _.indexOf(secondaryElements, identifier)>=0;
        }

        $scope.showHideNode = function(elementId){
            $element.find('#'+elementId).toggle();
        };

      }]
    }
  });

});
