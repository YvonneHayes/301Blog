// In the index.html on line 41 when the user clickes the home nav item the URL will add append a /.
//The page.js library will call loadAll on articlesController object which is defined in articleController.js on line 47. It will then assess whether data exists in our article.all array. If not it will run fetchAll on article object create them. If it does exist it creates a copy of it in ctx. articles. Then it goes to articlesController.index. That one takes this new ctx.articles array and passes it to ARticleView.index as a parameter wich shows and hides the html elements. At the end it gets appended to the articles id in html. After that it renders to the handlebars template.
//In sum when the user clicks on the home button articles will be shown on the homepage.

page('/',
  articlesController.loadAll,
  articlesController.index);


// In the index.html on line 42 when the user clicks on the about nav item the url will append /about to the end of the URL. Then aboutController.index requests info from the github repo and renders that data to the #about ul, which is cached to avoid being processed every time the user clicks this.  In sum when the user clicks the about button the repos from github will be displayed.
page('/about', aboutController.index);


// In line 23 in index.html a link is created. This link dynamically inserts the id of the article that the user selects. So this adds / + articleId to the end of the URL. The click first leads to articlesController.loadById on the articlesController.js page. That method creates a function called articleData but does not call it. Article.FindWhere is called first on line 23 of the same file which takes the id of the selected article and queries the aricle data and calls the article data function. Then articleData assigns the selected article to the ctx.articles variable and runs the articlesController.indes which is right here on line 17 and was defined in articleController.js on line 6. There articleView.index appends the article to the #articles tag renders the handlebars template with the full article. In sum the user clicks on the button and the rest of the aricle is shown. 
page('/article/:id',
  articlesController.loadById,
  articlesController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName',
  articlesController.loadByAuthor,
  articlesController.index);

page('/category/:categoryName',
  articlesController.loadByCategory,
  articlesController.index);

page();
