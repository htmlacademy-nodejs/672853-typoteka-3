'use strict';

const {writeFile} = require(`../../utils`);
const {generateArticles, readFiles, getCountArticles} = require(`./generateDataUtils`);

const {FILE_NAME} = require(`../serviceConstants`);


module.exports = {
  name: `--generate`,
  async run(args) {
    const contentData = await readFiles();
    const countArticles = getCountArticles(args);
    const data = JSON.stringify(generateArticles(countArticles, contentData));
    writeFile(FILE_NAME, data);
  }
};
