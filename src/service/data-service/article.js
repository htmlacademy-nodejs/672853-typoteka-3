'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../serviceConstants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  find(id) {
    return this._articles.find((item) => item.id === id);
  }

  drop(id) {
    const article = this.find(id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this.find(id);
  }

  update(id, article) {
    const oldArticle = this.find(id);

    return Object.assign(oldArticle, article);
  }

}

module.exports = ArticleService;
