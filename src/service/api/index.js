'use strict';

const {Router} = require(`express`);
const articles = require(`../api/articles`);
const categories = require(`../api/categories`);
const search = require(`../api/search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

const getData = async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
  articles(app, new ArticleService(mockData), new CommentService());
};

getData();

module.exports = app;
