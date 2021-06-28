'use strict';

const {nanoid} = require(`nanoid`);

const {getRandomInt, shuffle} = require(`../../utils`);
const {readContent} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  DateRestrict,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_ANNOUNCE_LENGTH,
} = require(`../serviceConstants`);
const IMAGES = [`forest`, `sea-fullsize`, `sea`, `skyscraper`];

const getPictureFileName = () => `${IMAGES[getRandomInt(0, IMAGES.length - 1)]}@1x.jpg`;

const getShuffledArray = (array, maxLength) => {
  return shuffle(array).slice(0, getRandomInt(1, maxLength));
};

const formatedTimestamp = (ISODate)=> {
  const date = ISODate.toLocaleDateString(`ru`, {formatMatcher: `best fit`}).split(`/`);
  const time = ISODate.toLocaleTimeString(`ru`);
  [date[0], date[1]] = [date[1], date[0]];
  return `${date} ${time}`;
};

const generateArticles = (count, data) => {
  const {titles, categories, sentences, comments, userCount, categoryCount} = data;
  return Array(count).fill({}).map((_, index) => {
    const fields = userCount ? {
      category: [getRandomInt(1, categoryCount)],
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments, index + 1, userCount),
    } : {
      id: nanoid(MAX_ID_LENGTH),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
      category: getShuffledArray(categories, categories.length),
    };
    return {
      ...fields,
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: formatedTimestamp(new Date(getRandomInt(DateRestrict.MIN, DateRestrict.MAX))),
      announce: getShuffledArray(sentences, MAX_ANNOUNCE_LENGTH).join(` `),
      fullText: getShuffledArray(sentences, sentences.length).join(` `),
      image: getPictureFileName(getRandomInt(1, 2)),
    };
  });
};

const generateComments = (count, comments, articleId, userCount) =>
  (Array(count).fill({}).map(() => {
    const data = userCount ? {
      userId: getRandomInt(1, userCount),
      articleId,
    } : {
      id: nanoid(MAX_ID_LENGTH),
    };
    return {...data, text: getComment(comments)};
  }));

const getComment = (comments) => shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `);

const readFiles = async () => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);
  return {titles, categories, sentences, comments};
};

const getCountArticles = (args) => {
  const [count] = args;
  return Number.parseInt(count, 10) || DEFAULT_COUNT;
};

module.exports = {
  getPictureFileName,
  generateArticles,
  readFiles,
  getCountArticles
};
