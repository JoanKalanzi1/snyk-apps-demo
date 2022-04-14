import { callSnykApi } from '../../utils/api';
import { EncryptDecrypt } from '../../utils/encrypt-decrypt';
import { APIVersion, Envars } from '../../types';
import User from '../../utils/sqliteDatabase/dbmodel';

/**
 * Get projects handler that fetches all user projects
 * from the Snyk API using user access token. This for
 * example purposes. In production it will depend on your
 * token scopes on what you can and can not access
 * @returns List of user project or an empty array
 */
export async function getProjectsFromApi(): Promise<unknown> {
  // Read data from DB
  //TODO : FIX LATER TO GET THE CORRECT USER

  //get all users in the database
  const users = await User.findAll();
  const data = users[0];

  //get users from database

  // Decrypt data(access token)
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  const token_type = data?.token_type;

  //TODO: Get the user to select the ORG
  const getOrg = data.orgs[0];

  // Call the axios instance configured for Snyk API v1

  return callSnykApi(token_type, access_token, APIVersion.V1)
    .post(`/org/${getOrg}/projects`)
    .then((project) => ({
      org: getOrg,
      projects: project.data.projects || [],
    }));
}
