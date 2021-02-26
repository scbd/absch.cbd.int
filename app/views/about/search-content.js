define(['app','text!views/about/search-content.html', 'lunr', 'jquery-highlight'], function(app, template, lunr){

    app.directive("searchContent", function(){
      return {
          restrict   : "EAC",
          template : template,
          link : function(scope, elem, attrs){
            
            var content, searchResults;
            var highlightOpts = { element: 'span', className: 'search-highlight' };
            
            var index = new lunr(function(){

                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('body');
                this.pipeline.add(lunr.trimmer, lunr.stopWordFilter);
                var documents = getDocuments(this);
                documents.forEach(function(document){
                    this.add(document);
                }, this);
                bind();
            });

            function getDocuments() {
                var documents = [];
                $('h1, h2, h3, h4, h5').each(function() {
                    var title = $(this);
                    var body = title.nextUntil('h1, h2, h3, h4, h5');
                    var id = title.prop('id');
                    if(id == ''){
                        id = title.text().trim()
                                  .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
                                  .replace(/\s/g, '-')//'absch-'+ Math.floor((Math.random()*1000)+1)
                        title.prop('id', id)
                    }
                    documents.push({
                        id: id,
                        title: title.text(),
                        body: body.text()
                    });
                });
                return documents;
            }

            function bind() {
                content = $('.content');
                searchResults = $('.search-results');

                $('#input-search').on('keyup', search);
            }

            function search(event) {
                unhighlight();
                searchResults.addClass('visible');

                // ESC clears the field
                if (event.keyCode === 27) this.value = '';

                if (this.value && this.value.length >= 3) {
                var results = index.search(this.value).filter(function(r) {
                    // console.log(r)
                    return r.score > 0.0001;
                });

                if (results.length) {
                    searchResults.empty();
                    $.each(results, function (index, result) {
                    var elem = document.getElementById(result.ref);
                    searchResults.append("<li><a rel=\"noopener\" href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
                    });
                    highlight.call(this);
                } else {
                    searchResults.html('<li></li>');
                    $('.search-results li').text('No Results Found for "' + this.value + '"');
                }
                } 
                else if(this.value && this.value.length < 3){
                searchResults.html('<li></li>');
                $('.search-results li').text('enter at least 3 letters to search');
                }
                else {
                unhighlight();
                searchResults.removeClass('visible');
                }
            }

            function highlight() {
                if (this.value) content.highlight(this.value, highlightOpts);
            }

            function unhighlight() {
                content.unhighlight(highlightOpts);
            }
          }
      }  
    })
    
})
