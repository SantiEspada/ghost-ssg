import exec from 'await-exec';
import path from 'path';

import { dirname } from './util';

const __dirname = dirname(import.meta.url);

export async function setupGit({ repoUrl, email, folderName }) {
  const scriptPath = path.resolve(__dirname, './sh/setup-git.sh');

  await exec(`sh ${scriptPath} ${repoUrl} ${email} ${folderName}`);
}
