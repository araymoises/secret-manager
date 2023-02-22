import { describe, it } from "node:test";
import { getSecrets } from "../../../lib/services/getSecrets";
import { clientSecretManager } from './../../../lib/services/clientSecretManager';
jest.mock('./../../../lib/services/clientSecretManager');

describe('getSecrets', () => {
  it('should return the secrets from the GCP Secret Manager', async () => {
    const project = 'test-project';
    const secret = 'test-secret';
    const version = 'test-version';
    const fakeData = { data: 'fake data' };
    (clientSecretManager as jest.Mock).mockResolvedValue(fakeData);
    const result = await getSecrets(project, secret, version);

    expect(clientSecretManager).toHaveBeenCalled();
    expect(result).toEqual(fakeData);
  });

  // it('should throw an error if the secrets cannot be obtained', async () => {
  //   const project = 'test-project';
  //   const secret = 'test-secret';
  //   const version = 'test-version';
  //   const fakeData = { data: 'fake data' };
  //   (clientSecretManager as jest.Mock).mockResolvedValue(fakeData);
  //   const result = await getSecrets(project, secret, version);

  //   expect(clientSecretManager).toHaveBeenCalled();
  //   await expect(result).rejects.toThrow(
  //     'Error while getting DB credentials. TypeError: (intermediate value) is not iterable'
  //   );
  // });
});
