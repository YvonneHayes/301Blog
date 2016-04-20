(function(module) {
  function Article (opts) {
  
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };


  Article.createTable = function(callback) {


    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (title TEXT, category TEXT, author TEXT, authorUrl TEXT, publishedOn DATE, body TEXT);',
      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };


  Article.truncateTable = function(callback) {
    webDB.execute(
      'DELETE * FROM articles;',
      callback
    );
  };



  Article.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, category, author, authorUrl, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.body],
        }
      ],
      function () {
        console.log('Success inserting record for ' + this.title);
      }
    );
  };


  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql' : 'DELETE FROM articles WHERE id = 1;'
        }
      ],
      function () {
        console.log('Record deleted');
      }
    );
  };


  Article.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql' : 'UPDATE articles SET author = "Yvonne" WHERE author = "%Card%";'
        }
      ],
      function() {
        console.log('Record Updated.');
      }
    );
  };


  Article.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };


  Article.fetchAll = function(next) {
    webDB.execute('SELECT * FROM articles', function(rows) {
      if (rows.length) {

        Article.loadAll(rows);

        next();

      } else {
        $.getJSON('/data/hackerIpsum.json', function(rawData) {

          rawData.forEach(function(item) {
            var article = new Article(item);

            article.insertRecord(article);


          });

          webDB.execute('SELECT * FROM articles', function(rows) {
            Article.loadAll(rows);
            next();

          });
        });
      }
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.all.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\b\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };

  Article.stats = function() {
    return {
      numArticles: Article.all.length,
      numWords: Article.numwords(),
      Authors: Article.allAuthors(),
    };
  };

  module.Article = Article;
})(window);
