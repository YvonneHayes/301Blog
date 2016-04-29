(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    console.log(ctx);
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?

  //loadById gets executed when URL contains /aricle/:id.
  //routes.js calls page.js library and activates and calls articlesController which defines the function articlesData. FindWhere runs a SQL query by id and calls articleData with that returned id.

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {

      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };


/*FindWhere is defined in article.js line 94. It generates a SQL query that selects everything from the articles table with a conditional parameter ('field') and then calls a function using the results of the query. Article.findWhere() passes a field, value and callback function, in this case webdb.execute() which will then execute the SQL query. Anytime an articlesController method is called by page it goes back to the findWhere query and then follows through the logic using the results of the query (in the given articleController method).

The value argument in .findWhere is the author name. This we get from the ctx argument that was passed by page.js into the page() call that calls articlesController.loadByAuthor. It is the part that goes after /author/ in the URL.

Line 27 is one such method that will use the results of the query in line 33. For the user it displays articles by a chosen author.

How is the page call in routes.js on line 15 related? When the URL changes an event handler is triggered. Strings that have been there before will be matched against this change in the URL. When a match is found the correct function call will happen.

How is the parameter ctx related?
ctx is an object that comes from page.js. It gets passed to all the functions that get called when a new URL change matches a string (see above). */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };


  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
