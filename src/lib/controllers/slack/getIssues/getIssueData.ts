import fetch from 'node-fetch';
import { User } from '../../../utils/sqliteDatabase/dbmodel';
import { EncryptDecrypt } from '../../../utils/encrypt-decrypt';
import { Envars } from '../../../types';
// import { getAppOrgs } from '../../../utils';
 const url = 'https://api.snyk.io/v1/reporting/issues/latest';
 interface Issue {
  issue: {
    id: string;
    severity: string[];
    type: string;
    package: string;
    version: string;
    originalSeverity: boolean;
    uniqueSeveritiesList: string[];
  };
}


export async function getIssueData(): Promise<Issue[]> {
  const users = await User.findAll({
   
  });
  const data = users[0]
  console.log(data, 'data-->')
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  // const token_type = data?.token_type;
  const getOrg = data.orgs[0];
  console.log(getOrg, 'this is org')

  const body = {
    filters: {
      orgs: [`${getOrg}`],
      severity: ['critical', 'high', 'medium'],
      projects: [],
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `token ${access_token}` },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  // console.log('result',json.results)
  return json.results as Issue[];
}
