import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const client = new SecretManagerServiceClient();

const clientSecretManager = async (secretPath: string): Promise<any> => {
  return await client.accessSecretVersion({ name: secretPath });
}

export { clientSecretManager };
