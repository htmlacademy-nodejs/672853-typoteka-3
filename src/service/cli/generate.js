'use strict';

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  ExitCode
} = require(`../../constants`);

const fs = require(`fs`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  TITLES,
  ANNOUNCE,
  CATEGORIES,
  DateRestrict,
} = require(`./cliConstants`);

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(getRandomInt(DateRestrict.MIN, DateRestrict.MAX)),
    announce: shuffle(ANNOUNCE).slice(1, 5).join(` `),
    fullText: shuffle(ANNOUNCE).slice(1, getRandomInt(1, ANNOUNCE.length - 1)).join(` `),
    category: CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)],
  }));

};

const writeFile = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      console.error(`Can't write data to file...`);
      process.exit(ExitCode.error);
    }

    return console.info(`Operation success. File created.`);
  });
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
