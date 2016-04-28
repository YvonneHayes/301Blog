// In the index.html on line 41 when the user clickes the home nav item the URL will add append a /.
//The page.js library will call loadAll on articlesController object which is defined in articleController.js on line 47. It will then assess whether data exists in our article.all array. If not it will run fetchAll on article object create them. If it does exist it creates a copy of it in ctx. articles. Then it goes to articlesController.index. That one takes this new ctx.articles array and passes it to ARticleView.index as a parameter wich shows and hides the html elements. At the end it gets appended to the articles id in html. After that it renders to the handlebars template.
//In sum when the user clicks on the home button articles will be shown on the homepage. 

page('/',
  articlesController.loadAll,
  articlesController.index);

page('/about', aboutController.index);

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
