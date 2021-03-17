import app from 'app';
import _ from 'lodash';
    

    app.factory('reportAnalyzerService', [function(){

        function flattenQuestions(sections){
            _.forEach(sections, function(section){
                var flatQuestions = [];
                _.forEach(section.questions, function(question){
                   
                    if(question.type=='sub-section'){
                        _.forEach(question.questions, function(subQuestion){
                            subQuestion.number = subQuestion.key;
                            subQuestion.title  = question.title + '<br/>' + subQuestion.title;
                            flatQuestions.push(subQuestion);
                        })
                    }
                    else if(question.type == 'legend')
                        question = undefined; //Do nothing
                    else
                        flatQuestions.push(question);
                });

                section.questions = flatQuestions;
            });

            return sections;
        }

        return {
            flattenQuestions : flattenQuestions
        }

    }]);

