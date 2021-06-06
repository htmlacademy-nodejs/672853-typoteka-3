'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../serviceConstants`);

class CommentService {
  create(article, comment) {
    const newComment = {
      ...comment,
      id: nanoid(MAX_ID_LENGTH),
    };

    article.comments = [
      ...article.comments,
      newComment
    ];
    return comment;
  }

  drop(article, commentId) {
    const dropComment = article.comments
      .find(({id}) => id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments
      .filter(({id}) => id !== commentId);

    return dropComment;
  }

  findAll(article) {
    return article.comments;
  }

}

module.exports = CommentService;
