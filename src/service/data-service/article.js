'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../serviceConstants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...article
    };

    this._articles = [
      ...this._articles,
      newArticle
    ];
    return newArticle;
  }

  find(articleId) {
    return this._articles.find(({id}) => id === articleId);
  }

  drop(articleId) {
    const article = this.find(articleId);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter(({id}) => id !== articleId);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this.find(id);
  }

  update(id, newArticle) {
    let article = this.find(id);

    return Object.assign(article, newArticle);
  }

}

module.exports = ArticleService;
