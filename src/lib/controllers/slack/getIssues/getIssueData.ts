import fetch from 'node-fetch';
import { User } from '../../../utils/sqliteDatabase/dbmodel';
import { EncryptDecrypt } from '../../../utils/encrypt-decrypt';
import { APIVersion, Envars } from '../../../types';
 const url = '/reporting/issues/latest?page=1&perPage=100&sortBy=issueTitle&order=asc&groupBy=issue';
import { callSnykApi } from '../../../utils/api/callSnykApi'
 interface Result {
  issue: {
    url: string;
    title: string;
    id: string;
    severity: string[];
    type: string;
    package: string;
    version: string;
    originalSeverity: boolean;
    uniqueSeveritiesList: string[];
  };
}


 export async function fetchIssueData(): Promise<Result[] | undefined> {
   try{
  const users = await User.findAll()
  const data = users[0]
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  const access_token = eD.decryptString(data?.access_token);
  console.log(access_token, 'in getdata')
  const getOrg = data.orgs[0];

 
  const body = {
    filters: {
      orgs: [`${getOrg}`],
      severity: ['critical', 'high', 'medium'],
      projects: [],
    },
  };

  const response = await callSnykApi( 'bearer', access_token, APIVersion.V1).post(url,body)
  // const json = await response.json();
  console.log(response.data)
  console.log(response.status)
  return 
  // json.result as Result[];
}catch(error){
  console.error(error)
}
}



