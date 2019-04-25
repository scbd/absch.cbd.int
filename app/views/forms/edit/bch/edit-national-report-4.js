﻿define(['app', 'lodash', 'json!app-data/bch/report-analyzer/cpbNationalReport4.json', 
    'json!app-data/bch/report-analyzer/cpbNationalReport3.json',
    'views/forms/edit/edit', 'services/thesaurus-service', 'views/forms/directives/nr-yes-no',
	'views/forms/edit/document-selector', 'js/common', 'views/directives/block-region-directive',
    'views/forms/view/bch/view-national-report-4.directive'], 
function (app, _, nr4Data, nr3Data) {
    
	app.controller("editBchNationalReport4", ["$scope", "$http", "$rootScope", "locale", "$q", "$controller", "$timeout", 'commonjs',
	function($scope, $http, $rootScope, locale, $q, $controller, $timeout, commonjs) {
        
        // since it was decided to use string type for terms fields in schema
        // map string to ETerm ({identifier:'xxxx-xxx'}) type which is the type expected by term-checkbox.
        $scope.multiTermModel = {};

        var user = $rootScope.user;
        $scope.activeTab = 1
        $scope.nr4Tabs = [{
                "tab":1,
                "title":"Question 1 - 11"
            },
            {
                "tab":2,
                "title":"Question 12 - 25",
                "sections" : [{key:"General"}, {key:"Article2"}, {key:"Article5"}, {key:"Article6"}]
            },
            {
                "tab":3,
                "title":"Question 26 - 38",
                "sections" : [{key:"Articles7-10"}]
            },
            {
                "tab":4,
                "title":"Question 39 - 52",
                "sections" : [{key:"Article11"}, {key:"Article12"}]
            },
            {
                "tab":5,
                "title":"Question 53 - 60",
                "sections" : [{key:"Article13"}, {key:"Article14"}]
            },
            {
                "tab":6,
                "title":"Question 61 - 90",
                "sections" : [{key:"Article15_16"}, {key:"Article17"}]
            },
            {
                "tab":7,
                "title":"Question 91 - 111",
                "sections" : [{key:"Article18"}, {key:"Article19"}]
            },
            {
                "tab":8,
                "title":"Question 112 - 138",
                "sections" : [{key:"Article20"},{key:"Article21"}, {key:"Article22"}]
            },
            {
                "tab":9,
                "title":"Question 139 - 161",
                "sections" : [{key:"Article23"}, {key:"Article24"}, {key:"Article25"}]
            },
            {
                "tab":10,
                "title":"Question 161 - 188",
                "sections" : [{key:"Article26"}, {key:"Article28"}, {key:"Article33"}, {key:"LiabilityRedress"} ]
            },
            {
                "tab":11,
                "title":"Question 186 - 187",
                "sections" : [{key:"AdditionalInformation"}, {key:"Comments"}]
            }
        ];

        // TODO: read from mapping file
        var previousAnswerMapping = $scope.previousAnswerMapping = {
            "Q012"        : { prevQuestion : "Q013",   showMessage: false },
            "Q012_partyInProgress"  : { prevQuestion : "Q012",   showMessage: false },
            "Q014"        : { prevQuestion : "Q014",   showMessage: false },
            "Q015"        : { prevQuestion : "Q016",   showMessage: false },
            "Q017"        : { prevQuestion : "Q017",   showMessage: false },
            "Q018"        : { prevQuestion : "Q018",   showMessage: false },
            "Q019"        : { prevQuestion : "Q019",   showMessage: false },
            "Q020"        : { prevQuestion : "Q021",   showMessage: false },
            "Q021"        : { prevQuestion : "Q022",   showMessage: false },
            "Q022"        : { prevQuestion : "Q024",   showMessage: false },
            "Q023"        : { prevQuestion : "Q025",   showMessage: false },
            "Q024"        : { prevQuestion : "Q026",   showMessage: false },
            "Q026"        : { prevQuestion : "Q028",   showMessage: false },
            "Q027"        : { prevQuestion : "Q032",   showMessage: false },
            "Q028"        : { prevQuestion : "Q033",   showMessage: false },
            "Q029"        : { prevQuestion : "Q034",   showMessage: false },
            "Q030"        : { prevQuestion : "Q041",   showMessage: true  },
            "Q031"        : { prevQuestion : "Q042",   showMessage: true  },
            "Q033"        : { prevQuestion : "Q035",   showMessage: true  },
            "Q034"        : { prevQuestion : "Q036",   showMessage: true  },
            "Q036"        : { prevQuestion : "Q044",   showMessage: true  },
            "Q037"        : { prevQuestion : "Q045",   showMessage: true  },
            "Q038"        : { prevQuestion : "Q046",   showMessage: false },
            "Q039"        : { prevQuestion : "Q047",   showMessage: false },
            "Q040"        : { prevQuestion : "Q048",   showMessage: false },
            "Q041"        : { prevQuestion : "Q055",   showMessage: false },
            "Q042"        : { prevQuestion : "Q050",   showMessage: false },
            "Q043"        : { prevQuestion : "Q054",   showMessage: false },
            "Q044"        : { prevQuestion : "Q058",   showMessage: false },
            "Q045"        : { prevQuestion : "Q059",   showMessage: false },
            "Q046"        : { prevQuestion : "Q061",   showMessage: true  },
            "Q047"        : { prevQuestion : "Q062",   showMessage: true  },
            "Q052"        : { prevQuestion : "Q066",   showMessage: false },
            "Q053"        : { prevQuestion : "Q067",   showMessage: false },
            "Q054"        : { prevQuestion : "Q068",   showMessage: true  },
            "Q055"        : { prevQuestion : "Q070",   showMessage: true  },
            "Q056"        : { prevQuestion : "Q069",   showMessage: true  },
            "Q057"        : { prevQuestion : "Q071",   showMessage: false },
            "Q058"        : { prevQuestion : "Q073",   showMessage: false },
            "Q059"        : { prevQuestion : "Q075",   showMessage: false },
            "Q060"        : { prevQuestion : "Q076",   showMessage: false },
            "Q063"        : { prevQuestion : "Q077",   showMessage: false },
            "Q064"        : { prevQuestion : "Q078",   showMessage: false },
            "Q065_a"        : { prevQuestion : "Q079_a",   showMessage: false },
            "Q065_b"        : { prevQuestion : "Q079_b",   showMessage: false },
            "Q065_c"        : { prevQuestion : "Q079_c",   showMessage: false },
            "Q066"        : { prevQuestion : "Q080",   showMessage: false },
            "Q067"        : { prevQuestion : "Q081",   showMessage: false },
            "Q068"        : { prevQuestion : "Q082",   showMessage: false },
            "Q070_a"        : { prevQuestion : "Q084_a",   showMessage: false },
            "Q070_b"        : { prevQuestion : "Q084_b",   showMessage: false },
            "Q070_c"        : { prevQuestion : "Q084_c",   showMessage: false },
            "Q070_d"        : { prevQuestion : "Q084_d",   showMessage: false },
            "Q071_a"        : { prevQuestion : "Q085_a",   showMessage: false },
            "Q071_b"        : { prevQuestion : "Q085_b",   showMessage: false },
            "Q072"        : { prevQuestion : "Q086",   showMessage: false },
            "Q073"        : { prevQuestion : "Q087",   showMessage: false },
            "Q074"        : { prevQuestion : "Q088",   showMessage: false },
            "Q075"        : { prevQuestion : "Q089",   showMessage: true  },
            "Q077"        : { prevQuestion : "Q090",   showMessage: true  },
            "Q078"        : { prevQuestion : "Q092",   showMessage: true  },
            "Q081"        : { prevQuestion : "Q094",   showMessage: false },
            "Q082"        : { prevQuestion : "Q095",   showMessage: false },
            "Q083"        : { prevQuestion : "Q096",   showMessage: false },
            "Q084"        : { prevQuestion : "Q097",   showMessage: false },
            "Q087"        : { prevQuestion : "Q102",   showMessage: true  },
            "Q088"        : { prevQuestion : "Q100",   showMessage: false },
            "Q089"        : { prevQuestion : "Q101",   showMessage: true  },
            "Q090"        : { prevQuestion : "Q105",   showMessage: false },
            "Q091"        : { prevQuestion : "Q106",   showMessage: false },
            "Q092"        : { prevQuestion : "Q107",   showMessage: false },
            "Q093"        : { prevQuestion : "Q108",   showMessage: false },
            "Q095"        : { prevQuestion : "Q110",   showMessage: false },
            "Q097"        : { prevQuestion : "Q112",   showMessage: false },
            "Q099"        : { prevQuestion : "Q114",   showMessage: false },
            "Q100"        : { prevQuestion : "Q115",   showMessage: false },
            "Q101"        : { prevQuestion : "Q116",   showMessage: false },
            "Q102"        : { prevQuestion : "Q117",   showMessage: false },
            "Q103"        : { prevQuestion : "Q118",   showMessage: false },
            "Q104"        : { prevQuestion : "Q119",   showMessage: false },
            "Q105"        : { prevQuestion : "Q120",   showMessage: false },
            "Q106"        : { prevQuestion : "Q121",   showMessage: false },
            "Q107"        : { prevQuestion : "Q122",   showMessage: false },
            "Q108"        : { prevQuestion : "Q123",   showMessage: false },
            "Q109"        : { prevQuestion : "Q124",   showMessage: false },
            "Q111"        : { prevQuestion : "Q125",   showMessage: false },
            "Q112_a"      : { prevQuestion : "Q126_a", showMessage: false },
            "Q112_b"      : { prevQuestion : "Q126_b", showMessage: false },
            "Q112_c"      : { prevQuestion : "Q126_c", showMessage: false },
            "Q112_d"      : { prevQuestion : "Q126_d", showMessage: false },
            "Q112_e"      : { prevQuestion : "Q126_f", showMessage: false },
            "Q112_g"      : { prevQuestion : "Q126_g", showMessage: false },
            "Q112_j"      : { prevQuestion : "Q126_j", showMessage: false },
            "Q112_k"      : { prevQuestion : "Q126_k", showMessage: false },
            "Q112_l"      : { prevQuestion : "Q126_l", showMessage: false },
            "Q112_m"      : { prevQuestion : "Q126_m", showMessage: false },
            "Q112_n"      : { prevQuestion : "Q126_n", showMessage: false },
            "Q112_o"      : { prevQuestion : "Q126_p", showMessage: false },
            "Q112_p"      : { prevQuestion : "Q126_o", showMessage: false },
            "Q112_q"      : { prevQuestion : "Q126_q", showMessage: false },
            "Q114"        : { prevQuestion : "Q127",   showMessage: false },
            "Q115"        : { prevQuestion : "Q128",   showMessage: false },
            "Q116"        : { prevQuestion : "Q129",   showMessage: false },
            "Q117"        : { prevQuestion : "Q130",   showMessage: false },
            "Q120"        : { prevQuestion : "Q135",   showMessage: false },
            "Q121"        : { prevQuestion : "Q136",   showMessage: false },
            "Q122"        : { prevQuestion : "Q137",   showMessage: false },
            "Q123"        : { prevQuestion : "Q138",   showMessage: false },
            "Q124"        : { prevQuestion : "Q139",   showMessage: false },
            "Q125"        : { prevQuestion : "Q140",   showMessage: false },
            "Q126"        : { prevQuestion : "Q141",   showMessage: false },
            "Q127"        : { prevQuestion : "Q142",   showMessage: false },
            "Q128"        : { prevQuestion : "Q143",   showMessage: false },
            "Q129"        : { prevQuestion : "Q144",   showMessage: true  },
            "Q130"        : { prevQuestion : "Q145",   showMessage: true  },
            "Q131"        : { prevQuestion : "Q147",   showMessage: true  },
            "Q132"        : { prevQuestion : "Q148",   showMessage: false },
            "Q133"        : { prevQuestion : "Q149",   showMessage: true  },
            "Q134"        : { prevQuestion : "Q151",   showMessage: false },
            "Q135"        : { prevQuestion : "Q152",   showMessage: false },
            "Q136"        : { prevQuestion : "Q153",   showMessage: false },
            "Q137"        : { prevQuestion : "Q154",   showMessage: false },
            "Q138"        : { prevQuestion : "Q157",   showMessage: false },
            "Q139"        : { prevQuestion : "Q158",   showMessage: false },
            "Q140"        : { prevQuestion : "Q174",   showMessage: true  },
            "Q141"        : { prevQuestion : "Q164",   showMessage: false },
            "Q142"        : { prevQuestion : "Q159",   showMessage: false },
            "Q143"        : { prevQuestion : "Q160",   showMessage: false },
            "Q144"        : { prevQuestion : "Q162",   showMessage: false },
            "Q145"        : { prevQuestion : "Q171",   showMessage: false },
            "Q146"        : { prevQuestion : "Q172",   showMessage: false },
            "Q147"        : { prevQuestion : "Q165",   showMessage: false },
            "Q148"        : { prevQuestion : "Q167",   showMessage: false },
            "Q149"        : { prevQuestion : "Q168",   showMessage: false },
            "Q150"        : { prevQuestion : "Q175",   showMessage: true  },
            "Q151"        : { prevQuestion : "Q170",   showMessage: false },
            "Q152"        : { prevQuestion : "Q176",   showMessage: false },
            "Q153"        : { prevQuestion : "Q177",   showMessage: false },
            "Q154"        : { prevQuestion : "Q178",   showMessage: true  },
            "Q155"        : { prevQuestion : "Q179",   showMessage: true  },
            "Q156"        : { prevQuestion : "Q180",   showMessage: true  },
            "Q157"        : { prevQuestion : "Q183",   showMessage: false },
            "Q158"        : { prevQuestion : "Q184",   showMessage: false },
            "Q159"        : { prevQuestion : "Q186",   showMessage: true  },
            "Q160"        : { prevQuestion : "Q188",   showMessage: true  },
            "Q161"        : { prevQuestion : "Q191",   showMessage: false },
            "Q162"        : { prevQuestion : "Q192",   showMessage: false },
            "Q163"        : { prevQuestion : "Q193",   showMessage: true  },
            "Q164"        : { prevQuestion : "Q194",   showMessage: false },
            "Q165"        : { prevQuestion : "Q196",   showMessage: false },
            "Q166"        : { prevQuestion : "Q197",   showMessage: false },
            "Q167"        : { prevQuestion : "Q203",   showMessage: false },
            "Q169"        : { prevQuestion : "Q198",   showMessage: false },
            "Q170"        : { prevQuestion : "Q199",   showMessage: false },
            "Q185"        : { prevQuestion : "Q202",   showMessage: false },
            "Q186"        : { prevQuestion : "Q207",   showMessage: false },
            "Q187"        : { prevQuestion : "Q208",   showMessage: false }
        }

		$controller('editController', {
			$scope: $scope
		});

		//==================================
		//
		//==================================
		$scope.getCleanDocument = function(document) {

			document = document || $scope.document;

			if (!document)
				return undefined;

			if (/^\s*$/g.test(document.notes))
				document.notes = undefined;

			return document;
		};
        
        $scope.setTab = function(index){
            $(".tab-pane").removeClass("active");
            $('#tab'+index).tab('show');
            $scope.activeTab = index + 1;
        }

        $scope.updateAnswer = function(question, baseQuestionNumber){

            if(question.multiple){
                if(!$scope.multiTermModel[question.key])
                    $scope.document[question.key] = undefined;
                else{
                    $scope.document[question.key] = _.map($scope.multiTermModel[question.key], function(t){return { value : t}})
                }
            }

            var lQuestion = question;
            if(question.validations){

                var mappings = question.validations||[];
                    
                _.each(mappings, function(mapping){

                    var dataSection = _.find(nr4Data, {key:mapping.key||question.section});
                    if(dataSection){
                        var mapQuestion; 
                        var validationPositive = false;
                        var baseQuestion;
                        if(baseQuestionNumber || mapping.baseQuestion){
                            baseQuestion          = _.find(dataSection.questions, {key:baseQuestionNumber||mapping.baseQuestion});
                            mapQuestion           = _.find(baseQuestion.questions, {key:mapping.question});
                        }
                        else{
                            mapQuestion          = _.find(dataSection.questions, {key:mapping.question});
                        }

                        var answer      = $scope.document[lQuestion.key];

                        if(/&[a-z]*/.test(mapping.type)){
                            validationPositive   =$scope.customValidations[mapping.type.repalce(/^&/, '')];
                        }
                        else if(mapping.type === '@hasValues' || mapping.type === '@hasAdditionalValues'){
                            if(mapping.values){
                                var answeredValues = [];
                                if(question.multiple)
                                    answeredValues = _.map(answer, 'value');
                                else
                                    answeredValues = [(answer||{}).value];

                                validationPositive   = ~_.intersection(mapping.values, answeredValues).length;
                            }
                            else
                                validationPositive   = !_.isEmpty(answer)
                            
                            if(mapping.type === '@hasAdditionalValues' && validationPositive){
                               
                                var additionalInformation = [];
                                if(question.multiple)
                                    additionalInformation = _.map(answer, 'additionalInformation');
                                else
                                    additionalInformation = [(answer||{}).additionalInformation];
                                
                                if(_.compact(additionalInformation||[]).length==0)
                                    validationPositive = false;
                            }
                        }
                        else if(mapping.type === '@hasValuesExcept' && mapping.values){
                            validationPositive   = answer && mapping.values.indexOf((answer||{}).value)<0;
                        }
                        else{
                            console.log(mapping)
                        }

                        if(!mapQuestion)
                            console.log(mapping)
                        mapQuestion.hasValidation = true;
                        if(validationPositive){
                            mapQuestion[mapping.trigger] = true;                            
                            if(baseQuestion)
                                baseQuestion[mapping.trigger] = true;
                        }
                        else{
                            $scope.document[mapQuestion.key] = undefined;
                            mapQuestion[mapping.trigger] = false
                            if(baseQuestion)
                                baseQuestion[mapping.trigger] = false;
                        }   

                        if(mapQuestion && mapQuestion.validations){
                            $scope.updateAnswer(mapQuestion, mapQuestion.baseQuestion);
                        }
                    }
                })
            }

        }

        $scope.spaceSubQuestion = function(number){
            if((number||'')=='')return '';            
           return number.replace(/([0-9]{1,3})([a-z])/, '$1 $2') + '. '
            
        }

        $scope.userHasGovernment = function(){
            return user.government;
        }
        $scope.onGovernmentChange = function(government){
            if(government && $scope.document){

                commonjs.getCountry(government.identifier).then(function(country){
                    $scope.document['Q012_party'] = { value : country.isCPParty.toString() };
                    if(country.isCPParty){
                        $scope.document['Q012_progressForParty'] = undefined;
                        $scope.document['Q013'] = undefined;
                    }
                    var question = $scope.nr4Tabs[1].sections[0].questions[0];
                    question.hasValidation = true;
                    question.enable = false;
                    $scope.updateAnswer(question);
                    loadPreviousReport();
                })
            }
        }

        $scope.isQuestionDisabled = function(question){
            if(question.hasValidation){

                if(question.visible && !question.hasOwnProperty("enable"))
                    return false;

                if(!question.enable )
                    return true;
            }
            
            return false;
        }


        function transformNr4Data(){

            _.each($scope.nr4Tabs, function(tab){
                
                _.each(tab.sections, function(section){

                    var dataSection = _.find(nr4Data, {key:section.key});
                    
                    _.extend(section, dataSection||{})

                    _.each(section.questions, function(question){
                       
                        if(question.type!='sub-section')
                            transformQuestion(question)
                        else{
                            question.visible    =   true;
                            _.each(question.questions, function(subQuestion){
                                transformQuestion(subQuestion);//, question.key1
                            })
                        }
                        
                    });
                })

            })
        }

        function transformQuestion(question, baseQuestion){
            if(question.multiple){
                question.optionsMapping =  _.map(question.options, function(option){
                    return { identifier: option.value, 
                        title: option.title, type:option.type }
                });
            }
            if(question.visible===undefined)
                question.visible    =   true;
            if(question.validations)
                $scope.updateAnswer(question, baseQuestion);
        }

        function loadPreviousReport(){
            if(!$scope.document)
                return;
            var params = { q: {'government.identifier':$scope.document.government.identifier }};
            $http.get('https://api.cbd.int/api/v2015/national-reports-cpb-3', { params : params} )
                 .then(function(result){
                     var prevReportAnswers = result.data[0];
                     var prevReportQuestions = _(nr3Data).pluck('questions').compact().flatten().value();

                     _.each(previousAnswerMapping, function(mapping, key){
                        
                        var prevQuestion    = _.find(prevReportQuestions, {key:mapping.prevQuestion})
                        if(prevQuestion){
                            mapping.previousQuestion          = { title : prevQuestion.title };
                            if(prevReportAnswers){
                                var prevAnswer = prevReportAnswers[mapping.prevQuestion];
                                if(_.isArray(prevAnswer)){
                                    mapping.previousQuestion.type = 'array';
                                    mapping.previousQuestion.answer   = _.map(prevAnswer, function(answer){ 
                                            return (_.find(prevQuestion.options, {value: answer.identifier||answer})||{}).title
                                    })
                                }
                                else if(_.isObject(prevAnswer)){
                                    if(prevAnswer.en||prevAnswer.fr||prevAnswer.es||prevAnswer.ar||prevAnswer.ru||prevAnswer.zh){
                                        mapping.previousQuestion.answer   = prevAnswer;
                                        mapping.previousQuestion.type = 'lstring';
                                    }
                                    else{
                                        mapping.previousQuestion.answer   = (_.find(prevQuestion.options, {value: prevAnswer.identifier||prevAnswer})||{}).title;
                                        mapping.previousQuestion.type = 'string';
                                    }
                                }
                                else{
                                    mapping.previousQuestion.answer   = (_.find(prevQuestion.options, {value: prevAnswer})||{}).title;
                                    mapping.previousQuestion.type = 'string'
                                }
                            }
                        }
                        else 
                            console.log(mapping)
                     })

                     return prevReportAnswers;
                })
        }

        $timeout(function(){
            transformNr4Data();
            // loadPreviousReport();
        }, 200);

        $scope.setDocument({}).then(function(document){
            if(document && document.header.identifier){
                _.each(document, function(element, key){
                    if(/^Q/.test(key) && _.isArray(element)){//only fields starting with Q
                        $scope.multiTermModel[key] = _.map(element, 'value');
                    }
                })
                transformNr4Data();//workaround as in the first call not all questions are built so the disable/visible clause does not work.

            }
        });
   }]);


   
});
