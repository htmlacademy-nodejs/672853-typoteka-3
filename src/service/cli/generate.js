'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);


const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  ExitCode
} = require(`../../constants`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_ANNOUNCE_LENGTH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  DateRestrict,
  MAX_ID_LENGTH,
  MAX_COMMENTS
} = require(`../serviceConstants`);

const getShuffledArray = (array, maxLength) => {
  return shuffle(array).slice(0, getRandomInt(1, maxLength));
};

const formatedTimestamp = (ISODate)=> {
  const date = ISODate.toLocaleDateString(`ru`);
  const time = ISODate.toLocaleTimeString(`ru`);
  return `${date} ${time}`;
};

const generateOffers = (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: formatedTimestamp(new Date(getRandomInt(DateRestrict.MIN, DateRestrict.MAX))),
    announce: getShuffledArray(sentences, MAX_ANNOUNCE_LENGTH).join(` `),
    fullText: getShuffledArray(sentences, sentences.length).join(` `),
    category: getShuffledArray(categories, categories.length),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);
    console.log(chalk.green(`Operation success. File created.`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file...`));
    process.exit(ExitCode.error);
  }
};

const generateMockData = async (args, titles, categories, sentences, comments) => {
  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
  return JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));

};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const data = await generateMockData(args, titles, categories, sentences, comments);

    writeFile(data);
  }
};
