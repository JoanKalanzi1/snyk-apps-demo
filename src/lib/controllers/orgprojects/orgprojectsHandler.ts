const axios = require('axios').default;

interface ProjectData {
  type: string;
  id: string;
  attributes: any;
  relationships: object;
  links: object;
  importingUser: object;
}

async function fetchProjectData(): Promise<Array<ProjectData> | string> {
  try {
    const apiKey = process.env.API_KEY as string;
    const orgId = process.env.ORG_ID as string;
    const response = await axios.get(`https://api.snyk.io/rest/orgs/${orgId}/projects`, {
      headers: { authorization: `Token ${apiKey}` },
      params: { version: '2022-03-15~experimental' },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

interface ProjectDataNames {
  name: string;
}
async function fetchProjectAttributesData(): Promise<ProjectDataNames[] | string> {
  try {
    const projectData = await fetchProjectData();
    //  console.log("projectData--->",projectData)
    if (typeof projectData === 'string') {
      throw Error;
    }
    // const projectAttribute: {}[]= []
    return projectData.map(function (data) {
      // console.log("attributes--->",data.attributes)
      return { name: data.attributes.name as string };
      // projectAttribute.push(data.attributes)
    }) as ProjectDataNames[];
    // return projectData;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

export async function fetchProjectNames(): Promise<string[] | string> {
  try {
    const attributesData = await fetchProjectAttributesData();
    // console.log("attributesData at the start-->", attributesData)
    if (typeof attributesData === 'string') {
      throw Error;
    }
    return attributesData.map((data) => data.name);
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
