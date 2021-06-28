'use strict';

const {writeFile} = require(`../../utils`);
const {readFiles, generateArticles, getCountArticles} = require(`./generateDataUtils`);
const {FILL_DB_SQL} = require(`../serviceConstants`);

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar-1.jpg`
  },
  {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar-2.jpg`
  }
];

const getUsersValues = () => (users.map(({email, passwordHash, firstName, lastName, avatar}) =>
  `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`).join(`,\n`));

const getArticleValues = (articles) => (articles.map(({title, announce, fullText, image, createdDate}) =>
  `('${title}', '${announce}', '${fullText}', '${image}', '${createdDate}')`).join(`,\n`));

const getArticleCategoryValues = (articles) => {
  const articleCategories = articles.map((article, index) => ({articleId: index + 1, categoryId: article.category[0]}));
  return articleCategories.map(({articleId, categoryId}) => `(${articleId}, ${categoryId})`).join(`,\n`);
};

const getCommentsValue = (articles) => {
  const comments = articles.flatMap((article) => article.comments);
  return comments.map(({text, userId, articleId}) => `('${text}', ${userId}, ${articleId})`).join(`,\n`);
};

const getContent = (userValues, categoryValues, articleValues, articleCategoryValues, commentValues) => {
  return `
    INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
    ${userValues};
    INSERT INTO categories(name) VALUES
    ${categoryValues};
    ALTER TABLE articles DISABLE TRIGGER ALL;
    INSERT INTO articles(title, announce, full_text, image, created_date) VALUES
    ${articleValues};
    ALTER TABLE articles ENABLE TRIGGER ALL;
    ALTER TABLE articles_categories DISABLE TRIGGER ALL;
    INSERT INTO articles_categories(article_id, category_id) VALUES
    ${articleCategoryValues};
    ALTER TABLE articles_categories ENABLE TRIGGER ALL;
    ALTER TABLE comments DISABLE TRIGGER ALL;
    INSERT INTO COMMENTS(text, user_id, article_id) VALUES
    ${commentValues};
    ALTER TABLE comments ENABLE TRIGGER ALL;`;
};

module.exports = {
  name: `--fill`,
  async run(args) {
    const {titles, categories, sentences, comments} = await readFiles();

    const countArticles = getCountArticles(args);

    const articles = generateArticles(countArticles, {titles, categoryCount: categories.length, userCount: users.length, sentences, comments});

    const userValues = getUsersValues(users);
    const articleValue = getArticleValues(articles);
    const articleCategoryValues = getArticleCategoryValues(articles);
    const commentValues = getCommentsValue(articles);
    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const content = getContent(userValues, categoryValues, articleValue, articleCategoryValues, commentValues);

    writeFile(FILL_DB_SQL, content);
  }
};
