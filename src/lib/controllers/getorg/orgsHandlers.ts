const axios = require('axios').default;
const url = 'https://snyk.io/api/v1/user/me';

interface OrgData {
  name: string;
  id: string;
  group: object;
}

async function fetchUserOrgs(): Promise<Array<OrgData> | string> {
  try {
    const apiKey = process.env.API_KEY as string;
    const response = await axios.get(url, {
      headers: { authorization: `Token ${apiKey}` },
    });
    // console.log(response.data)
    return response.data.orgs;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

export async function fetchOrgNames(): Promise<string[] | string> {
  try {
    const userData = await fetchUserOrgs();
    // console.log("orgs names",userData)
    if (typeof userData === 'string') {
      throw Error;
    }
    const orgNames: string[] = [];
    userData.map((org) => {
      orgNames.push(org.name);
    });
    // console.log("orgNames", orgNames);
    return orgNames;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
