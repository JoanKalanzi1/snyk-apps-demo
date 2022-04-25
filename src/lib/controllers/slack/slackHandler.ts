const axios = require('axios').default;
import { fetchProjectNames } from '../orgprojects/orgprojectsHandler';
const url = 'https://hooks.slack.com/services/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';
import { getIssueData } from "./getIssues/getIssueData";
// const url = 'https://api.snyk.io/v1/reporting/issues/latest';

export async function postToSlack(names: string | string[]): Promise<any> {
  try {
    const slackToken = process.env.SLACK_TOKEN as string;

    const stringNames = names.toString();
    console.log(stringNames, 'tsringNm');

    const res = await axios.post(
      url,
      {
        channel: '#slack-snyk-app-test-channel',
        text: stringNames,
      },
      {
        headers: { authorization: `Token${slackToken}` },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
// const issue = {
//     "issue": {
//         "url": "http://security.snyk.io/vuln/SNYK-DEBIAN9-LIBWEBP-1290151",
//         "id": "SNYK-DEBIAN9-LIBWEBP-1290151",
//         "title": "Use of Uninitialized Resource",
//         "type": "vuln",
//         "package": "libwebp/libwebp-dev",
//         "version": "0.5.2-1",
//         "severity": "critical",
//         "originalSeverity": null,
//         "uniqueSeveritiesList": [
//             "critical"
//         ],
//         "language": "linux",
//         "packageManager": "debian:9",
//         "semver": {
//             "vulnerable": [
//                 "<0.5.2-1+deb9u1"
//             ]
//         },
//         "isIgnored": false,
//         "publicationTime": "2021-05-06T15:13:30.065Z",
//         "disclosureTime": "2021-05-21T17:15:00.000Z",
//         "isUpgradable": false,
//         "isPatchable": false,
//         "isPinnable": false,
//         "identifiers": {
//             "CVE": [
//                 "CVE-2018-25014"
//             ],
//             "CWE": [
//                 "CWE-908"
//             ],
//             "ALTERNATIVE": []
//         },
//         "credit": [
//             ""
//         ],
//         "CVSSv3": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
//         "cvssScore": "9.8",
//         "patches": [],
//         "isPatched": false,
//         "exploitMaturity": "no-known-exploit",
//         "reachability": "",
//         "priorityScore": 500
//     },
//     "isFixed": false,
//     "introducedDate": "2022-03-15",
//     "project": {
//         "url": "https://snyk.io/org/joan.kalanzi/project/f9b40e74-64ad-44e5-b5f3-801218110d8e",
//         "id": "f9b40e74-64ad-44e5-b5f3-801218110d8e",
//         "name": "JoanKalanzi1/nodejs-goof:Dockerfile",
//         "source": "github",
//         "packageManager": "dockerfile",
//         "targetFile": "Dockerfile"
//     }
// }

// const formattingData = (issue) => {

// }

export async function Issues(): Promise<any> {
  try {
    const slackToken = process.env.SLACK_TOKEN as string;
    const projectNames = await fetchProjectNames();
    const issues = await getIssueData();
    console.log(issues, 'this is issues data')
    // const stringProjectNames = projectNames.toString();
    const stringIssues = issues.toString()

    const res = await axios.post(url, {
      channel: '#slack-snyk-app-test-channel',
      text: 'Testing markdown',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: stringIssues,
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
