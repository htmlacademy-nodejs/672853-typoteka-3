'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

const ARTICLES_COUNT_FOR_COMMENTS_PAGE = 3;

const {getAPI} = require(`../api`);
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, {articles});
});
myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`comments`, {articles: articles.slice(0, ARTICLES_COUNT_FOR_COMMENTS_PAGE)});
});


module.exports = myRouter;
