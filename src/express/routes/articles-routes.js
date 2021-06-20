'use strict';
const multer = require(`multer`);
const path = require(`path`);
const {Router} = require(`express`);
const articlesRouter = new Router();
const {nanoid} = require(`nanoid`);

const {getAPI} = require(`../api`);
const api = getAPI();

const UPLOAD_DIR = `../upload/img`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    if (!file) {
      return;
    }

    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const {body, file} = req;
  const articleData = {
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
    category: body.category || [],
    img: file ? file.filename : ``,
    createdDate: body.date
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`/my`);
  } catch (e) {
    const categories = await api.getCategories();
    res.render(`new-post`, {
      article: articleData,
      categories
    });
  }
});

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`new-post`, {categories});
});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories()
  ]);
  res.render(`new-post`, {article, categories});
});
articlesRouter.get(`/:id`, (req, res) => res.render(`post`));
articlesRouter.post(`/:id`, upload.single(`upload`), async (req, res) => {
  const {body, file, params} = req;
  const {id} = params;
  const articleData = {
    title: body.title,
    announce: body.announcement,
    fullText: body[`full-text`],
    category: body.category || [],
    img: file ? file.filename : ``,
    createdDate: body.date
  };

  try {
    await api.updateArticle(id, articleData);
    res.redirect(`/my`);
  } catch (e) {

    const categories = await api.getCategories();
    res.render(`new-post`, {
      article: {id, ...articleData},
      categories
    });
  }
});


module.exports = articlesRouter;
