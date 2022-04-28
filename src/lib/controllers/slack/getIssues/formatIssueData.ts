import { fetchIssueData } from './getIssueData'
import fetch from 'node-fetch';




 export async function fetchIssueAttributes() {
   const attributes = await fetchIssueData();
   console.log(attributes)
}