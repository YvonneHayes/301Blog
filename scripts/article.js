
(function(module) {

  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }

  Article.all = [];

  module.Article = Article; //making Article viewable outside the IIFE

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });


    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };



  Article.fetchAll = function(next) {
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      next();
    } else {
      $.getJSON('/data/hackerIpsum.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData); // Cache the json, so we don't need to request it next time.
        next();
      });
    }
  };

  function wordCount(numbs) {
    var words = numbs.split(' ');
    return numbs.length;
  }


  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return wordCount(article.body);
    })
  .reduce(function(a, b) {
    return a+b;
  });
  };


// DONE: Chain together a `map` and a `reduce` call to produce an array of unique author names.
  Article.allAuthors = function() {
    return Article.all.map(function(article) {
      return (article.author); // Grab the words from the `article` `body`.
    })
  .reduce(function(a, b) {
    if (a.indexOf(b) < 0) {
      a.push(b);
    }
    return a;
  },[] );
  };

  // Read docs on .map and .reduce! You can reference the previous
  // `map` in the numWordsAll method to get started here.

  // For our `reduce` -- since we are trying to return an array, we'll need to specify an accumulator type...
  // what data type should this accumulator be and where is it placed?


  Article.numWordsByAuthor = function() {
  // Done: Transform each author string into an object with 2 properties: One for
  // the author's name, and one for the total number of words across the matching articles
  // written by the specified author.
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.all.map(function (article) {
          if (article.author === author){
            return wordCount(article.body);
          } else {
            return 0;
          }
        }).reduce(function(a, b) {
          return a+b;
        })
      };
    });
  };

})(window);
