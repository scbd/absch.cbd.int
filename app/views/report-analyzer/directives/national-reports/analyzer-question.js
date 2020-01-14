define(['text!./analyzer-question.html', 'app', 'lodash', 'angular-sanitize'], function(templateHtml, app, _) {

    var WHITE      = { R:255, G:255, B:255 };
    var SHADE_BASE = { R: 70, G:163, B:230 };

    //==============================================
    //
    //
    //==============================================
    app.directive('nationalReportAnalyzerQuestion', ['$timeout', 'realm', function($timeout, realm) {
        return {
            restrict : 'E',
            replace : true,
            template : templateHtml,
            require : '^nationalReportAnalyzer',
            scope :  {
                question : '=',
                reports : '=',
                regionList : '=regions',
                sumType : '=',
                previousQuestionsMapping : '=',
                previousQuestionsValueMapping : '='
            },
            link: function ($scope, el, attr, nrAnalyzer) {

                $scope.selectedMapping = _.keys($scope.previousQuestionsMapping)[0];

                $scope.realm = realm.value
                $scope.getReportType = function() { return nrAnalyzer.getReportType(); }
                initTooltips();

                //==============================================
                //
                //
                //==============================================
                $scope.$on('nr.analyzer.filter', analyze);

                //==============================================
                //
                //
                //==============================================
                $scope.$watch('::previousQuestionsMapping', initTooltips);

                //==============================================
                //
                //
                //==============================================
                $scope.$watch("::regionList", function(regions) {

                    $scope.regions = [];
                    $scope.regionsMap = {};

                    regions.forEach(function(region){

                        region = _.cloneDeep(region);
                        region.countriesMap = _(region.countries).reduce(function(countriesMap, country){
                                countriesMap[country.identifier] = country;
                                return countriesMap;
                            }, {});

                        $scope.regions.push(region);
                        $scope.regionsMap[region.identifier] = region;

                    });

                    $timeout(initTooltips, 250);

                    analyze();

                });

                //==============================================
                //
                //
                //==============================================
                $scope.$watch("previousReports", function(previousReports) {

                    $scope.previousReportsMap = _(previousReports).reduce(function(previousReportsMap, report){

                        previousReportsMap[report.government] = report;

                        return previousReportsMap;

                    },{});
                });

                //==============================================
                //
                //
                //==============================================
                $scope.testAnswer = function(answer, value, valueMapping) {

                    valueMapping = valueMapping||{};
                    
                    value  = nrAnalyzer.normalizeAnswer(value);
                    answer = nrAnalyzer.normalizeAnswer(answer);
                    answer = valueMapping[answer] || answer;

                    if(answer === value)     return true;
                    if(answer === undefined) return false;
                    if(_.isArray  (answer))  return answer.indexOf(value)>=0;
                    if(_.isBoolean(answer))  return value == (answer ? 'true' : 'false');

                    return false;
                };

                //==============================================
                //
                //
                //==============================================
                $scope.hasCustomText = function(answer, field) {
                    
                    if(answer.details)
                        return true;
                    
                    if(!answer.options)
                        return false;

                    return (_.find(answer.options, {identifier:field})||{}).customValue
                };
                //==============================================
                //
                //
                //==============================================
                $scope.hasText = function(government, text, field, type) {
                    if(text && (text.details || text[field]))
                        text =  (text.details || text[field]);
                    else if(!!text.number && type == 'number')
                        text =  text.number;          
                    else if(!field && isLString(text))
                        text = text                          
                    else if(!field && type == 'string'){
                        text = text
                    }
                    else
                        text = undefined;
                    
                    return text!==undefined;
                };

                //==============================================
                //
                //
                //==============================================
                $scope.showText = function(government, text, field, type) {
                    if(text && (text.details ||text[field]))
                        text =  (text.details || text[field]);
                    else if(!!text.number && type == 'number')
                        text =  text.number;         
                    else if(!field && isLString(text))
                        text = text                            
                    else if(!field && type == 'string')
                        text = text
                    else
                        text = undefined;
                    
                    nrAnalyzer.showTexts([{
                        government : government,
                        text : text,
                        field : field,
                        type: type
                    }], $scope.question);
                };

                //==============================================
                //
                //
                //==============================================
                $scope.showTexts = function(governments, field, type) {
                    
                    if(!governments)
                        governments = _.pluck($scope.reports, 'government');
                    
                    governments = _.map(governments, function(g) { return g.identifier || g; } );


                    var filter = nrAnalyzer.filter();

                    var results = _($scope.reports).filter(function(report) {

                        return governments.indexOf(report.government)>=0;

                    }).filter(function(report) {

                        return !_.isEmpty(report[$scope.question.key]);

                    }).filter(function(report) {

                        return !filter || filter.matchingCountriesMap[report.government];

                    }).map(function(report) {

                        var text = report[$scope.question.key];

                        if(text && (text.details ||text[field]))
                            text =  (text.details || text[field]);
                        else if(!!text.number && type == 'number')
                            text =  text.number;         
                        else if(!field && (isLString(text) || type == 'lstring'))
                            text = text          
                        else if((!field && (type == 'text' || type == 'string')))
                            text = text
                        else
                            text = undefined;
                        
                        return {
                            government : report.government,
                            text : text,
                            field : field,
                            type: type
                        };

                    }).value();

                    nrAnalyzer.showTexts(results, $scope.question);
                };

                //==============================================
                //
                //
                //==============================================
                $scope.showCustomText = function(government, answer, field) {
                    var text;

                    if(answer.details)
                        text = answer.details;
                    
                    if(answer.options)
                        text = (_.find(answer.options, {identifier:field})||{}).customValue;
                    
                    nrAnalyzer.showTexts([{
                        government : government,
                        text : text,
                        field : field
                    }], $scope.question);
                };
                //==============================================
                //
                //
                //==============================================
                $scope.toggleRegion = function(region) {

                    if(!$scope.expanded)
                    $scope.expanded = {};

                    $scope.expanded[region.identifier] = !$scope.expanded[region.identifier];

                    if(!_($scope.expanded).values().compact().size())
                    delete $scope.expanded;

                    $timeout(initTooltips, 250);
                };

                //==============================================
                //
                //
                //==============================================
                $scope.toggleFilter = function(option) {

                    var question = $scope.question;
                    var oldFilter = nrAnalyzer.filter();

                    if(!option || (oldFilter && oldFilter.question.key == question.key && oldFilter.option.value == option.value)) {
                        nrAnalyzer.filter(undefined);
                        return;
                    }

                    var countriesMap = _($scope.reports).filter(function(report) {

                        var answer = nrAnalyzer.normalizeAnswer(report[question.key]);

                        return answer && (answer == option.value || answer.indexOf(option.value)>=0);

                    }).reduce(function(ret, report){

                        ret[report.government] = report.government;
                        return ret;

                    }, {});

                    nrAnalyzer.filter({
                        question : question,
                        option : option,
                        matchingCountriesMap : countriesMap
                    });
                };

                //==============================================
                //
                //
                //==============================================
                $scope.toggleCompare = function(selectedMapping) {
                   
                    $scope.selectedMapping = selectedMapping.schema;
                    
                    var reports = $scope.reports;
                    var question = $scope.question;
                    var previousQuestionsMapping = $scope.previousQuestionsMapping[$scope.selectedMapping];

                    if(!previousQuestionsMapping)
                        return;

                    var query = {
                        reportType : previousQuestionsMapping.schema,
                        regions : _.pluck(reports, 'government'),
                        questions : [previousQuestionsMapping[question.key]]
                    };

                    return nrAnalyzer.loadReports(query).then(function(previousReports) {

                        $scope.previousReports = previousReports;

                    }).then(analyze).then(function() {

                        $timeout(initTooltips, 250);
                    });
                };

                $scope.removeCompare = function(){
                    if($scope.previousReports) {
                        delete $scope.previousReports;
                        analyze();

                        return;
                    }
                }

                //==============================================
                //
                //
                //==============================================
                $scope.cleanupQuestionNumber = function(q) {

                    q = (q||{}).question || q;
                    q = (q||'').toString().replace(/^[SQ0]*/, '');

                    if(/\d*_[a-z0-9]+_/i.test(q))
                        q = q.replace(/^(\d*)_([a-z0-9]+)_([a-z]*)$/i, '$1 ($2) ($3)');
                    else if(/[a-z]$/.test(q))
                        q = q.replace(/^(\d*).*?([a-z]*)$/i, '$1 ($2)');

                    return q;
                };

                //==============================================
                //
                //
                //==============================================
                function initTooltips() {

                    el.find('[data-toggle="tooltip"]:not([tooltip-init])').tooltip({trigger:'hover focus'}).attr('tooltip-init', '');
                    el.find('[data-toggle="popover"]:not([popover-init])').popover({trigger:'hover focus'}).attr('popover-init', '');

                }

                //==============================================
                //
                //
                //==============================================
                function analyze() {

                    if(!$scope.reports) return;
                    if(!$scope.regions) return;
                    if(!$scope.question) return;

                    if(_.includes(['text', 'number', 'lstring'], $scope.question.type)) {
                        $scope.question.options = [{ value: $scope.question.type }];  // text responses don't have predefine values; Simulate a fake one
                    }

                    var question = $scope.question;
                    var regions  = $scope.regions;
                    var reports  = $scope.reports;
                    var previousReports = $scope.previousReports;
                    var questionsMapping = $scope.previousQuestionsMapping[$scope.selectedMapping];
                    var questionsValueMapping = $scope.previousQuestionsValueMapping[$scope.selectedMapping];

                    // Only allow countries who answered to this question
                    var restrictedCountries = _(reports)
                        .filter(function(r) { return !!r[question.key]; })
                        .pluck('government')
                        .value();
                    if (previousReports && questionsMapping) {

                        //Only allow countries who answered to this question in both report set

                        var previousCountries = _(previousReports)
                            .filter(function(pr) { return !!pr[questionsMapping[question.key]]; })
                            .pluck('government')
                            .value();

                        restrictedCountries = _.intersection(restrictedCountries, previousCountries);
                    }

                    var restrictedCountriesMap = _(restrictedCountries).reduce(function(restrictedCountriesMap, ctr) {
                            restrictedCountriesMap[ctr] = true;
                            return restrictedCountriesMap;
                        }, {});

                    regions.forEach(function(region){
                        region.countries.forEach(function(country){
                            country.visible = !restrictedCountriesMap || restrictedCountriesMap[country.identifier];
                        });
                    });

                    var data = analyzeReports(reports, {
                        countriesMap: restrictedCountriesMap
                    });

                    if(previousReports && questionsMapping) { // Inject comparaisons

                        var prevData = analyzeReports(previousReports, {
                            key: questionsMapping[question.key],
                            valueMapping: questionsValueMapping[question.key],
                            countriesMap: restrictedCountriesMap
                        });

                        _.forEach(data.rows, function(row) {

                            var prevRow = prevData.rows[row.value];

                            row.previous = {
                                fullSum : { value : prevRow.fullSum, delta : row.fullSum - prevRow.fullSum },
                                sum     : { value : prevRow.sum,     delta : row.sum     - prevRow.sum },
                                percent : { value : prevRow.percent, delta : row.percent - prevRow.percent }
                            };

                            _.forEach(row.cells, function(cell) {

                                var prevCell= prevRow.cells[cell.identifier];

                                // ▲ - U+25B2 BLACK UP-POINTING TRIANGLE
                                // ▼ - U+25BC BLACK DOWN-POINTING TRIANGLE

                                cell.previous = {
                                    sum           : { value : prevCell.sum,           delta : cell.sum           - prevCell.sum },
                                    percentGlobal : { value : prevCell.percentGlobal, delta : cell.percentGlobal - prevCell.percentGlobal },
                                    percentColumn : { value : prevCell.percentColumn, delta : cell.percentColumn - prevCell.percentColumn },
                                    percentRow    : { value : prevCell.percentRow,    delta : cell.percentRow    - prevCell.percentRow }
                                };
                            });
                        });
                    }

                    $scope.filter     = nrAnalyzer.filter();
                    $scope.reportsMap = data.reports;
                    $scope.fullSum    = data.fullSum;
                    $scope.rows       = _.values(data.rows);
                    $scope.additionalInfo       = data.additionalInfo;
                }

                //============================================================
                //
                //
                //============================================================
                function analyzeReports(reports, options) {

                    var question = $scope.question;
                    var regions  = $scope.regions;
                    var filter   = nrAnalyzer.filter();

                    var key = (options||{}).key || question.key;
                    var valueMapping = (options||{}).valueMapping || {};
                    var countriesMap = (options||{}).countriesMap;

                    var data = {
                        sum : 0,
                        fullSum : 0,
                        reports : {},
                        additionalInfo : {}//sum : 0, fullSum : 0
                    };

                    data.columns = _(regions).reduce(function(columns, r){

                        columns[r.identifier] = {
                            identifier : r.identifier,
                            sum : 0,
                            additionalInfo : {}
                        };

                        return columns;

                    }, {});
                    var additionalInfo  = question.additionalInfo||[];
                    _.map(additionalInfo, function(info){
                        info.value = info.field;
                    })
                    // question.options = _.union(question.options, additionalInfo);
                    data.rows = _(question.options).reduce(function (rows, option) {

                        rows[option.value] = _.assign({}, option, {
                            sum : 0,
                            fullSum : 0,
                            filterOn : filter && filter.question.key == key && filter.option.value == option.value,
                            cells : _(regions).reduce(function(cells, r){
                                cells[r.identifier] = {
                                    identifier : r.identifier,
                                    sum : 0,
                                    additionalInfo : {}
                                };
                                return cells;
                            }, {})
                        });

                        return rows;

                    }, {});

                    reports.forEach(function(report) {

                        if(!countriesMap[report.government]){
                            // console.log(report.government)
                            return; // exclud this report
                        }
                        var included = !filter || !!filter.matchingCountriesMap[report.government];

                        if(included)
                            data.reports[report.government] = report;

                        var answers      = getNormalizedAnswers(report, key);
                        var answeredRows = _(answers).map(function(value) { return data.rows[valueMapping[value] || value]; }).compact().value();

                        answeredRows.forEach(function(row){

                            data.fullSum++;
                            row .fullSum++;

                            if(included) {
                                data.sum++;
                                row .sum++;
                            }

                            regions.forEach(function(region){

                                var column = data.columns[region.identifier];
                                var cell   = row .cells  [region.identifier];

                                if(included && region.countriesMap[report.government]) {
                                    column.sum++; // column
                                    cell  .sum++; // column
                                }
                            });
                        });

                        var additionalInfo = getNormalizedAdditionalInfo(report, key);
                        // console.log(additionalInfo)
                        data.question = key;
                        if(additionalInfo){
                            _.each(additionalInfo, function(info, key){
                                if(info){
                                    // console.log(additionalInfo[key],info, key);
                                    if(!data['additionalInfo'][key+'_sum'])
                                        data['additionalInfo'][key+'_sum'] = 0;

                                    data['additionalInfo'][key+'_sum']++;
                                    regions.forEach(function(region){
                                        var column = data.columns[region.identifier];
                                        var cell;
                                        if(!_.isEmpty(data.rows))
                                            cell   = data.rows[_.first(_.keys(data.rows))].cells  [region.identifier];
                                        if(region.countriesMap[report.government]){
                                            //     region.countriesMap[report.government]
                                            if(!column['additionalInfo'][key+'_sum'])
                                                column['additionalInfo'][key+'_sum'] = 0
                                            if(cell){
                                                if(!cell['additionalInfo'][key+'_sum'])
                                                    cell['additionalInfo'][key+'_sum'] = 0
                                                cell['additionalInfo'][key+'_sum']++; // column
                                            }
                                            column['additionalInfo'][key+'_sum']++; // column
                                            
                                        }
                                    });
                                }
                            })
                        }
                    });

                    _.forEach(data.columns, function(column, identifier){

                        _.values(data.rows).forEach(function(row) {

                            var cell = row.cells[identifier];

                            row .percent       = data  .sum ? Math.round((row .sum*100) / data.sum)   : 0;
                            cell.percentGlobal = data  .sum ? Math.round((cell.sum*100) / data.sum)   : 0;
                            cell.percentColumn = column.sum ? Math.round((cell.sum*100) / column.sum) : 0;
                            cell.percentRow    = row   .sum ? Math.round((cell.sum*100) / row.sum)    : 0;

                            cell.backgroundColor = {
                                sum           : htmlColor(blendColor(WHITE, SHADE_BASE, cell.percentGlobal/100)),
                                percentGlobal : htmlColor(blendColor(WHITE, SHADE_BASE, cell.percentGlobal/100)),
                                percentColumn : htmlColor(blendColor(WHITE, SHADE_BASE, cell.percentColumn/100)),
                                percentRow    : htmlColor(blendColor(WHITE, SHADE_BASE, cell.percentRow   /100))
                            };

                            cell.textColor = {
                                sum           : cell.percentGlobal < 75 ? 'inherit' : 'white',
                                percentGlobal : cell.percentGlobal < 75 ? 'inherit' : 'white',
                                percentColumn : cell.percentColumn < 75 ? 'inherit' : 'white',
                                percentRow    : cell.percentRow    < 75 ? 'inherit' : 'white'
                            };
                        });
                    });
                    // console.log(data);
                    return data;
                }

                //============================================================
                //
                //
                //============================================================
                function getNormalizedAnswers(report, key) {

                    key = key || $scope.question.key;

                    var answers = nrAnalyzer.normalizeAnswer(report[key]);

                    if(_.isEmpty(answers))
                        answers = undefined;

                    if(answers && $scope.question.type=='lstring' && !!answers)
                        answers = 'lstring';

                    if(answers && $scope.question.type=='text' && !!answers)
                        answers = 'text';
                        
                    if(answers && $scope.question.type=='number' && !!answers.number)
                        answers = 'number';

                    return _([answers]).flatten().compact().value();
                }

                //============================================================
                //
                //
                //============================================================
                function getNormalizedAdditionalInfo(report, key) {

                    key = key || $scope.question.key;

                    var additionalInfo = $scope.question.additionalInfo;

                    if(_.isEmpty(additionalInfo))
                        return;

                    var answers = {};
                    _.each(additionalInfo, function(info){
                        answers[info.field] = report[key][info.field]; 
                    });
                    return answers;
                }

                //============================================================
                //
                //
                //============================================================
                function blendColor(colorA, colorB, ratio) {
                    return {
                        R : colorA.R + Math.floor((colorB.R-colorA.R) * ratio),
                        G : colorA.G + Math.floor((colorB.G-colorA.G) * ratio),
                        B : colorA.B + Math.floor((colorB.B-colorA.B) * ratio)
                    };
                }

                //============================================================
                //
                //
                //============================================================
                function htmlColor(color) {

                    var RR = color.R.toString(16);
                    var GG = color.G.toString(16);
                    var BB = color.B.toString(16);

                    if(RR.length<2) RR = '0'+RR;
                    if(GG.length<2) GG = '0'+GG;
                    if(BB.length<2) BB = '0'+BB;

                    return '#'+RR+GG+BB;
                }
                
                function isLString(element){
                    return  element.hasOwnProperty('ar') || element.hasOwnProperty('en') ||
                            element.hasOwnProperty('fr') || element.hasOwnProperty('es') || 
                            element.hasOwnProperty('ru') || element.hasOwnProperty('zh');
                }

            }
        };
    }]);
});
