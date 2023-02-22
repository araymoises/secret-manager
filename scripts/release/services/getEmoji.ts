import { commitChangeType, emojiType } from './../interfaces';

/**
 * Get the commit emoji by the change type.
 *
 * @param {'fix' | 'feat' | 'test' | 'ci' | 'docs'} commitChange Change type of the new project version.
 */
const getEmoji = (commitChange: commitChangeType): emojiType => {
  let emoji: emojiType;

  switch (commitChange) {
    case 'fix':
      emoji = ':bug:';
      break;

    case 'feat':
      emoji = ':sparkles:';
      break;

    case 'test':
      emoji = ':rotating_light:';
      break;

    case 'ci':
      emoji = ':construction_worker:';
      break;

    case 'docs':
      emoji = ':books:';
      break;

    case 'first':
      emoji = ':tada:';
      break;

    default:
      emoji = ':sparkles:';
      break;
  }

  return emoji;
}

export default getEmoji;
