/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `sQbXSV`,
    "title": `Ёлки. История деревьев`,
    "createdDate": `05.06.2021 05:47:20`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`, "fullText": `Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вышивайте крестиком. Читайте все Гарри Поттера. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "category": [`Кино`, `Программирование`, `Железо`, `Музыка`, `Разное`, `За жизнь`, `IT`, `Коты`, `Собаки`, `Мышки`, `Деревья`],
    "comments": [
      {
        "id": `_Uh8r2`,
        "text": `Хочу такую же футболку :-) Это где ж такие красоты?`
      },
      {
        "id": `F2pE_t`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы!`
      },
      {
        "id": `VPcR3j`,
        "text": `Планируете записать видосик на эту тему?`
      },
      {
        "id": `aMJfLY`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    "id": `HLs80a`,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "createdDate": `17.05.2021 02:39:29`,
    "announce": `Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Он написал больше 30 хитов.`, "fullText": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Читайте все Гарри Поттера. Достичь успеха помогут ежедневные повторения. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Кто рано встает - тому бог подает. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов.`,
    "category": [`Программирование`, `Мышки`, `Железо`, `За жизнь`, `Музыка`, `Коты`, `Пупсики`],
    "comments": [
      {
        "id": `TW_01l`,
        "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `VeQp-i`,
        "text": `Совсем немного...`
      },
      {
        "id": `RM_kSE`,
        "text": `Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `mH1IaG`,
    "title": `Борьба с прокрастинацией`,
    "createdDate": `18.03.2021 08:36:18`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов.`, "fullText": `Это один из лучших рок-музыкантов. Читайте все Гарри Поттера. Вышивайте крестиком. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Из под его пера вышло 8 платиновых альбомов. Тише едешь - дальше будешь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Кто рано встает - тому бог подает. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    "category": [`Железо`, `Музыка`, `Мышки`, `Кино`, `Коты`, `Без рамки`, `IT`, `Программирование`, `За жизнь`, `Деревья`],
    "comments": [
      {
        "id": `rNhsLt`,
        "text": `Совсем немного...`
      },
      {
        "id": `7gWB23`,
        "text": `Совсем немного... Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `s5yCqQ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `79VNLJ`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`
      }
    ]
  },
  {
    "id": `8bHT-M`,
    "title": `Как начать программировать`,
    "createdDate": `06.05.2021 13:21:21`,
    "announce": `Читайте все Гарри Поттера. Это один из лучших рок-музыкантов. Вышивайте крестиком. Собрать камни бесконечности легко, если вы прирожденный герой.`, "fullText": `Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "category": [`Пупсики`, `Кино`, `IT`, `Железо`, `Без рамки`, `Музыка`, `Мышки`],
    "comments": [
      {
        "id": `ROKcMb`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `66FJq2`,
    "title": `Учим HTML и CSS`,
    "createdDate": `12.04.2021 01:20:57`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят.`, "fullText": `Из под его пера вышло 8 платиновых альбомов. Читайте все Гарри Поттера. Он написал больше 30 хитов. Тише едешь - дальше будешь. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Программировать не настолько сложно, как об этом говорят. Вышивайте крестиком. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "category": [`Железо`, `Программирование`, `IT`, `Музыка`, `Деревья`, `Кино`, `Коты`, `Мышки`],
    "comments": [
      {
        "id": `8yi4nU`,
        "text": `Это где ж такие красоты?`
      }
    ]
  }
];

const newArticle = {
  title: `Есть ли жизнь без кота`,
  category: [`Все тлен`],
  announce: `Нету жизни без кота)`,
  fullText: `Нету жизни без кота, совсем нет`,
  createdDate: `05.06.2021 05:47:20`

};

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "sQbXSV"`, () => expect(response.body[0].id).toBe(`sQbXSV`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/sQbXSV`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Ёлки. История деревьев"`, () => expect(response.body.title).toBe(`Ёлки. История деревьев`));

});

describe(`API creates an article if data is valid`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});


describe(`API refuses to create an article if data is invalid`, () => {

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});


describe(`API changes existent article`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/sQbXSV`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/sQbXSV`)
    .expect((res) => expect(res.body.title).toBe(`Есть ли жизнь без кота`))
  );

});


test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    title: `Это`,
    category: `валидный`,
    announce: `объект`,
    fullText: `статьи`,
    createdDate: `05.06.2021 05:47:20`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    title: `Это`,
    category: `невалидный`,
    announce: `объект статьи`,
    fullText: `нет поля createdDate`,
  };

  return request(app)
    .put(`/articles/sQbXSV`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/sQbXSV`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`sQbXSV`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/sQbXSV/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
