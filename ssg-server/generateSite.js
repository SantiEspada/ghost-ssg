import exec from 'await-exec';
import path from 'path';

import { dirname } from './util';

const __dirname = dirname(import.meta.url);

export async function generateSite({ sourceUrl, destinationUrl, repoPath, outputFolder }) {
  const scriptPath = path.resolve(__dirname, './sh/generate-site.sh');

  await exec(`sh ${scriptPath} ${sourceUrl} ${destinationUrl} ${repoPath} ${outputFolder}`);
}
