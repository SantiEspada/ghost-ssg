import path from 'path';

import { dirname } from './util';

const __dirname = dirname(import.meta.url);

const PORT = process.env.PORT || 3000;
const SOURCE_URL = process.env.SOURCE_URL;
const DESTINATION_URL = process.env.DESTINATION_URL;
const CONTENT_FOLDER_NAME = process.env.CONTENT_FOLDER_NAME;
const GIT_REPOSITORY_URL = process.env.GIT_REPOSITORY_URL;
const GIT_EMAIL = process.env.GIT_EMAIL;

const requiredEnvVars = {
  SOURCE_URL,
  DESTINATION_URL,
  CONTENT_FOLDER_NAME,
  GIT_REPOSITORY_URL,
  GIT_EMAIL,
};

for (let [varName, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing ${varName} env variable`);
  }
}

const REPOSITORY_FOLDER_NAME = 'repo';
const REPOSITORY_PATH = path.resolve(__dirname, './', REPOSITORY_FOLDER_NAME);
const BUFFER_TIME = 1 * 60 * 1000;

export {
  PORT,
  SOURCE_URL,
  DESTINATION_URL,
  CONTENT_FOLDER_NAME,
  GIT_REPOSITORY_URL,
  GIT_EMAIL,
  REPOSITORY_FOLDER_NAME,
  REPOSITORY_PATH,
  BUFFER_TIME,
};
