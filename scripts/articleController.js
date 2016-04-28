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

  // FindWhere is defined in article.js line 94. It generates a SQL query that selects everything from the articles table with a conditional parameter ('field') and then calls a function using the results of the query. Anytime an ariclesController methos is called by page it goes back to the findWhere query and then follows through the logic using the results of the query (in the given ariclerController method). Line 27 is one such method that will use the results of the query in line 33. For the user it displays aricles by a chosen author.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
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
