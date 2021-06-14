/* eslint-disable no-undef */
'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./categories`);
const DataService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mockData = require(`./mock-data`);

const app = express();
app.use(express.json());
category(app, new DataService(mockData));


describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 8 categories`, () => expect(response.body.length).toBe(8));

  test(`Category names are "Кино", "Программирование", "Железо", "Мышки", "IT", "Музыка", "Деревья", "Коты"`,
      () => expect(response.body).toEqual(
          expect.arrayContaining([`Кино`, `Программирование`, `Железо`, `Мышки`, `IT`, `Музыка`, `Деревья`, `Коты`])
      )
  );

});
