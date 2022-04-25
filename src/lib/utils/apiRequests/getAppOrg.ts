<<<<<<< HEAD
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

=======
import { APIVersion, Org } from '../../types';
import { callSnykApi } from '../api';

interface RestApiOrg {
  id: string;
  attributes: {
    name: string;
  };
}

interface V1ApiOrg {
  id: string;
  name: string;
}

>>>>>>> c07f074e556a9d57212f426d346b6109f47bf6d0
/**
 * Function to get app's accessible Snyk Org IDs, which are used in other API requests
 * @param {String} tokenType token type which is normally going to be bearer
 * @param {String} accessToken access token fetched on users behalf
 * @returns Org data or throws and error
 */
<<<<<<< HEAD
export async function getAppOrgs(tokenType: string, accessToken: string): Promise<string[]> {
=======
export async function getAppOrgs(tokenType: string, accessToken: string): Promise<{ orgs: Org[] }> {
>>>>>>> c07f074e556a9d57212f426d346b6109f47bf6d0
  try {
    const result = await callSnykApi(
      tokenType,
      accessToken,
      APIVersion.V1,
    )({
      method: 'GET',
      url: `/orgs?version=2022-02-16~experimental`,
<<<<<<< HEAD
     
    });
    // Fetch the first org for demo purposes
    const orgs: APIOrg[] = result.data.data;
    console.log("orgs--->", orgs)
    const orgsArray: string[] = [];
    orgs.forEach(org => {
        orgsArray.push(org.id)
    })
    return orgsArray
=======
    });

    return {
      // Use v1 until rest endpoint supports indirect org access
      //orgs: result.data.data.map((org: RestApiOrg) => ({ id: org.id, name: org.attributes.name })),
      orgs: result.data.orgs.map((org: V1ApiOrg) => ({ id: org.id, name: org.name })),
    };
>>>>>>> c07f074e556a9d57212f426d346b6109f47bf6d0
  } catch (error) {
    console.error('Error fetching org info: ' + error);
    throw error;
  }
}
