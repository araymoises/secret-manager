export type OptionsType = {headerMessage?: string, firstRelease?: boolean, isBreakingChange?: boolean};
export type emojiType = ':bug:' | ':sparkles:' | ':rotating_light:' | ':construction_worker:' | ':books:' | ':tada:';
export type commitChangeType = 'fix' | 'feat' | 'test' | 'ci' | 'docs' | 'first';
export type releaseLevelType = 'major' | 'minor' | 'patch';
export type changeVersionType = {newVersion: string, releaseLevel: releaseLevelType};
