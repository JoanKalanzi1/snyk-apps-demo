const axios = require('axios').default;
// import { fetchProjectNames } from '../orgprojects/orgprojectsHandler';
const url = 'https://hooks.slack.com/services/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';
import { fetchIssueData } from "./getIssues/getIssueData";
import { Envars } from '../../types'


// export async function postToSlack(names: string | string[]): Promise<any> {
//   try {
//     const slackToken = process.env.SLACK_TOKEN as string;

//     const stringNames = names.toString();
//     console.log(stringNames, 'tsringNm');

//     const res = await axios.post(
//       url,
//       {
//         channel: '#slack-snyk-app-test-channel',
//         text: stringNames,
//       },
//       {
//         headers: { authorization: `Token${slackToken}` },
//       },
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return 'error';
//   }
// }

export async function Issues(): Promise<any> {
  try {
    const slackToken = process.env[Envars.SlackToken] as string;
    // const projectNames = await fetchProjectNames();
    const issues = await fetchIssueData();
 
    // const stringProjectNames = projectNames.toString();
    const stringIssues = issues?.toString()

    const res = await axios.post(url, {
      channel: '#slack-snyk-app-test-channel',
      text: 'Testing markdown',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'testing new webhook url',
          },
        },
      ],
      headers: { authorization: `Token${slackToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

// export async function getIssueData(): Promise<string[] | string> {
//     try{
//         const reportingApiData = await getIssueData(url);
//         return reportingApiData.map(data => {
//         return data.issue.severity })

//     }catch(error){
//         console.error(error);
//        return 'error';
//     }
// }
