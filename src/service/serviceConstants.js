'use strict';

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_ANNOUNCE_LENGTH = 5;
const MAX_ID_LENGTH = 6;
const MAX_COMMENTS = 4;

const MONTH_OFFSET = 3;

const getDateRestrict = () => {
  const maxDate = new Date();
  const minDate = new Date().setMonth(maxDate.getMonth() - MONTH_OFFSET);
  return {
    MIN: minDate,
    MAX: maxDate.getTime(),
  };
};

const DateRestrict = getDateRestrict();

const FILL_DB_SQL = `fill-db.sql`;

module.exports = {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_ANNOUNCE_LENGTH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  DateRestrict,
  FILL_DB_SQL
};
