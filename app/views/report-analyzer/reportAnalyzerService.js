define(['app'], function(app){
    

    app.factory('reportAnalyzerService', [function(){

        function flattenQuestions(sections){
            _.each(sections, function(section){
                var flatQuestions = [];
                _.each(section.questions, function(question){
                   
                    if(question.type=='sub-section'){
                        _.each(question.questions, function(subQuestion){
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
})
