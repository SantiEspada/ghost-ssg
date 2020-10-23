import express from 'express';
import bodyParser from 'body-parser';

import {
  PORT,
  SOURCE_URL,
  DESTINATION_URL,
  CONTENT_FOLDER_NAME,
  GIT_REPOSITORY_URL,
  GIT_EMAIL,
  REPOSITORY_FOLDER_NAME,
  REPOSITORY_PATH,
  BUFFER_TIME,
} from './config';
import { setupGit } from './setupGit';
import { generateSite } from './generateSite';

let generateBufferTimeout = null;

async function main() {
  await setupGit({ repoUrl: GIT_REPOSITORY_URL, email: GIT_EMAIL, folderName: REPOSITORY_FOLDER_NAME });

  const app = express();

  app.use(bodyParser.json());

  app.post('/ghost-hook', async (req, res) => {
    if (generateBufferTimeout) {
      console.log('Cancelling scheduled generation...');

      clearTimeout(generateBufferTimeout);
    }

    generateBufferTimeout = setTimeout(async () => {
      console.log('Generating site...');

      try {
        await generateSite({
          sourceUrl: SOURCE_URL,
          destinationUrl: DESTINATION_URL,
          repoPath: REPOSITORY_PATH,
          outputFolder: CONTENT_FOLDER_NAME,
        });

        console.log('Generated');
      } catch (err) {
        console.error(err);
      }

      generateBufferTimeout = null;
    }, BUFFER_TIME);

    console.log(`Site will be generated in ${BUFFER_TIME / 1000}s`);

    res.status(200).send('ok');
  });

  app.listen(PORT, () => {
    console.log(`SSG server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
