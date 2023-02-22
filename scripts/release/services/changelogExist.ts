import fs from 'fs';

/**
 * Check if the changelog file exist.
 *
 * @param {string} changelogFilePath Semi-Optional. Changelog file path. Default: './CHANGELOG.md'
 */
const changelogExist = (changelogFilePath: string = './CHANGELOG.md'): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(changelogFilePath, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export default changelogExist;
