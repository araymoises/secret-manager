import standardVersion from 'standard-version';
import getEmoji from './getEmoji';
import { exec } from 'child_process';
import fs from 'fs';
import changeVersion from './changeVersion';
import pkg from '../../../package.json';
import { commitChangeType, emojiType, OptionsType } from './../interfaces';

const commitRelease = (commitMessage: string, commitChange: commitChangeType, options: OptionsType): void => {
  const opt: OptionsType = {
    headerMessage: options.headerMessage || 'Historial de cambios de cada versión.',
    firstRelease: options.firstRelease || false,
    isBreakingChange: options.isBreakingChange || false
  };
  const {newVersion, releaseLevel} = changeVersion(commitChange, opt.isBreakingChange || false);
  const emoji: emojiType = getEmoji(commitChange);

  standardVersion({
    header: `# Changelog\n\n## ${opt.headerMessage}`,
    silent: true,
    releaseCommitMessageFormat: `${commitChange}: ${emoji} ${newVersion} ${commitMessage}`,
    releaseAs: releaseLevel,
    firstRelease: opt.firstRelease
  }).then(async () => {
    fs.copyFile('./package.json', './dist/package.json', (error) => {
      if (error) {
        throw new Error(`Copy package.json failed with message: ${error.message}`);
      }
      console.log('Commit created succesfully!');
      console.log('Pushing commit...');

      exec(`git push`, (error: any) => {
        if (error) {
          throw new Error(`Push failed with message: ${error.message}`);
        }
        console.log('Commit pushed successfully!');
        console.log('Pushing new version tag...');

        exec(`git push origin ${newVersion}`, (error: any) => {
          if (error) {
            throw new Error(`Version tag push failed with message: ${error.message}`);
          }
          console.log('New version pushed successfully!');
          console.log(`Old version v${pkg.version}.`);
          console.log(`New version ${newVersion}.`);
          console.log('Done.');
        });

      });
    });
  }).catch((error: any) => {
      console.error(`Commit failed with message: ${error.message}`)
  });
}

export default commitRelease;
