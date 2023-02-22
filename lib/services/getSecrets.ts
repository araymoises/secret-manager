import { clientSecretManager } from './clientSecretManager';
/**
 * Get secrets from a specific Secret Manager of Google Cloud Manager (GCP).
 * @async
 * @param {string} project Secret Manager Project.
 * @param {string} secret Secrets to be obtained.
 * @param {string} version The version of the secrets.
 * @return {Promise<object>} Secrets obtained from the GCP Secret Manager.
 */
const getSecrets = async (project: string, secret: string, version: string): Promise<object> => {
  try {
    const [secrets] = await clientSecretManager(`projects/${project}/secrets/${secret}/versions/${version}`);

    const bufferedData = secrets.payload?.data;

    if (!bufferedData) {
      throw new Error('Error while getting DB credentials..');
    }

    const result = JSON.parse(bufferedData.toString());

    if (!result) {
      throw new Error('Error while getting DB credentials.');
    }

    return result;
  } catch (error) {
    throw new Error(`Error while getting DB credentials. ${error}`);
  }
};

export { getSecrets };
