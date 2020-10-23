import path from 'path';
import url from 'url';

export function dirname(importMetaUrl) {
  return path.dirname(url.fileURLToPath(importMetaUrl));
}
