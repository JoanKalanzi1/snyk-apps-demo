import { APIVersion, Envars, Org } from '../../types';
import { callSnykApi } from '../api';

interface APIOrg {
  id: string;
  type: string;
  attributes: {
    name: string;
    is_personal : boolean;
    slug: string;
  };
}

/**
 * Function to get app's accessible Snyk Org IDs, which are used in other API requests
 * @param {String} tokenType token type which is normally going to be bearer
 * @param {String} accessToken access token fetched on users behalf
 * @returns Org data or throws and error
 */
export async function getAppOrgs(tokenType: string, accessToken: string): Promise<string[]> {
  try {
    const result = await callSnykApi(
      tokenType,
      accessToken,
      APIVersion.V1,
    )({
      method: 'GET',
      url: `/orgs?version=2022-02-16~experimental`,
     
    });
    // Fetch the first org for demo purposes
    const orgs: APIOrg[] = result.data.orgs;
    console.log("orgs--->", orgs)
    const orgsArray: string[] = [];
    orgs.forEach(org => {
        orgsArray.push(org.id)
    })
    return orgsArray
  } catch (error) {
    console.error('Error fetching org info: ' + error);
    throw error;
  }
}
