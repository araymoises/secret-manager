import inquirer from 'inquirer';
import standardVersion from 'standard-version';
import pkg from '../../package.json';
import changelogExist from './services/changelogExist';
import commitRelease from './services/commitRelease';

const release = async () => {
  if (!process.stdin.isTTY) {
    throw new Error(`Necesitas utilizar una terminal con TTY.`);
  }

  if (!await changelogExist()) {
    const { firstCommit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'firstCommit',
        message: '¿Éste es el primer commit del proyecto?',
        default: false
      }
    ]);

    if (firstCommit) {
      commitRelease('¡First Commit!', 'feat', {firstRelease: true});
      return;
    }
  }

  const { commitChange } = await inquirer.prompt([
    {
      type: 'list',
      name: 'commitChange',
      message: '¿Qué tipo de cambio estás subiendo? (Si es una suma de varios, utiliza "Feature")',
      choices: [
        {
          name: 'Fix (Corrección de un error)',
          value: 'fix',
          short: 'Fix'
        },
        {
          name: 'Feature (Mejora en el proyecto)',
          value: 'feat',
          short: 'Feature'
        },
        {
          name: 'Cambios en los tests',
          value: 'test',
          short: 'Cambios en test'
        },
        {
          name: 'Cambios en el ci/cd',
          value: 'ci',
          short: 'Cambios en ci/cd'
        },
        {
          name: 'Cambios en la documentación',
          value: 'docs',
          short: 'Cambios en documentación'
        }
      ]
    }
  ]);

  let isBreakingChange;
  if (commitChange === 'feat') {
    const { ...res } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isBreakingChange',
        message: '¿Éste cambio podría corromper una función si se sigue utilizando de la misma manera (BREAKING CHANGE)?',
        default: false
      }
    ]);
    isBreakingChange = res.isBreakingChange;
  } else {
    isBreakingChange = false;
  }

  const { commitMessage } = await inquirer.prompt([
    {
      type: 'input',
      name: 'commitMessage',
      message: 'Escribe un pequeño resumen de tus cambios. (Obligatorio)',
      validate: function (input) {
        if (input === '' || input === '.' || input === ',') {
          return 'Escribe un resumen.';
        }
        return true;
      }
    }
  ]);

  console.log('Creating commit...');

  commitRelease(commitMessage, commitChange, {isBreakingChange});
}

release().catch((error) => {
  console.log('Process with error.');
  console.log(error.message);
});
