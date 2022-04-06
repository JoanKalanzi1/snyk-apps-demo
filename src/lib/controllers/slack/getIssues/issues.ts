import fetch, { RequestInfo } from 'node-fetch';


const url = 'https://api.snyk.io/v1/reporting/issues/latest';
// const apiKey = process.env.API_KEY as string;
// console.log('api--->', apiKey)
// const headers = {
//     "Content-Type": "application/json",
//     "Authorization": `token ${apiKey}`,
   
// }

const body = {
    "filters": {
        "orgs": ["15f061f9-6a0e-46a0-a702-1f46efb781a4"],
        "severity": [
          "critical",
        
        ],
        "projects": []
      }

}
interface Issue{
    issue: {
        id: string;
        severity: string;
        type: string;
        package: string;
        version: string;
        originalSeverity: boolean;
        uniqueSeveritiesList: string[];

    }; 
 }

 export async function getIssueData(): Promise<Issue[]> {
  
    const apiKey = process.env.API_KEY as string;
    const url = 'https://api.snyk.io/v1/reporting/issues/latest'
    const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json",
    "Authorization": `token ${apiKey}`,},
    body: JSON.stringify(body) });
    const json = await response.json();
    // console.log('result',json.results)
    return json.results as Issue[];
   

}


