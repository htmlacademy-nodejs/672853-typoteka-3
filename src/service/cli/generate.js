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
  MAX_ANNOUNCE_LENGTH,
  CATEGORIES,
  DateRestrict,
} = require(`./cliConstants`);

const getShuffledArray = (array, maxLength) => {
  return shuffle(array).slice(0, getRandomInt(1, maxLength));
};

const formatedTimestamp = (ISODate)=> {
  const date = ISODate.toISOString().split(`T`)[0];
  const time = ISODate.toTimeString().split(` `)[0];
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
