'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

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
  TITLES,
  ANNOUNCE,
  MAX_ANNOUNCE_LENGTH,
  CATEGORIES,
  DateRestrict,
} = require(`./cliConstants`);

const getShuffledArray = (array, maxLength) => {
  return shuffle(array).slice(0, getRandomInt(1, maxLength));
};

const formatedTimestamp = (ISODate)=> {
  const date = ISODate.toLocaleDateString(`ru`);
  const time = ISODate.toLocaleTimeString(`ru`);
  return `${date} ${time}`;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: formatedTimestamp(new Date(getRandomInt(DateRestrict.MIN, DateRestrict.MAX))),
    announce: getShuffledArray(ANNOUNCE, MAX_ANNOUNCE_LENGTH).join(` `),
    fullText: getShuffledArray(ANNOUNCE, ANNOUNCE.length).join(` `),
    category: getShuffledArray(CATEGORIES, CATEGORIES.length),
  }));

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

const generateMockData = (args) => {
  const [count] = args;
  const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
  return JSON.stringify(generateOffers(countOffer));

};

module.exports = {
  name: `--generate`,
  run(args) {
    const data = generateMockData(args);
    writeFile(data);
  }
};
