import pkg from '../../../package.json';
import { commitChangeType, releaseLevelType, changeVersionType } from './../interfaces';

/**
 * Shows the new project version.
 *
 * @param {'fix' | 'feat' | 'test' | 'ci' | 'docs'} commitChange Change type of the new project version.
 */
const changeVersion = (commitChange: commitChangeType, isBreakingChange: boolean): changeVersionType => {
  let releaseLevel: releaseLevelType;
  let [major, minor, patch]: Array<string | number> = pkg.version.split('.');

  if(commitChange === 'feat' && isBreakingChange){
    releaseLevel = 'major';
    major = Number(major);
    major++;
    minor = 0;
    patch = 0;
  } else if(commitChange === 'feat' && !isBreakingChange) {
    releaseLevel = 'minor';
    minor = Number(minor);
    minor++;
    patch = 0;
  } else {
    releaseLevel = 'patch';
    patch = Number(patch);
    patch++;
  }
  const newVersion =  `v${[major, minor, patch].join('.')}`;

  return {newVersion, releaseLevel};
}

export default changeVersion;
