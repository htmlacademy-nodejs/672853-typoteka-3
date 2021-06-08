'use strict';

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const MAX_COUNT = 1000;

const ExitCode = {
  error: 1,
  success: 0,
};

const API_PREFIX = `/api`;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const DEFAULT_PORT = 3000;
const MOCKS_SOURCE = `mocks.json`;
const NOT_FOUND_MESSAGE_TEXT = `Not found`;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  MAX_COUNT,
  ExitCode,
  HttpCode,
  DEFAULT_PORT,
  MOCKS_SOURCE,
  API_PREFIX,
  NOT_FOUND_MESSAGE_TEXT,
  Env
};
