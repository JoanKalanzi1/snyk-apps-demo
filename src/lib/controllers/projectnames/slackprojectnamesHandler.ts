
const axios = require('axios').default;

import { fetchProjectNames} from "../orgprojects/orgprojectsHandler";
const url = 'https://hooks.slack.com/services/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';

 

export async function postProjectNames() : Promise <any> {
    try {
        const slackToken = process.env.SLACK_TOKEN as string;
         const projectNames = await fetchProjectNames()
        const stringProjectNames = projectNames.toString()

        const res = await axios.post(url, {
            channel: '#slack-snyk-app-test-channel',
            text: stringProjectNames,
        }, {
            headers: { authorization : `Token${slackToken}`}});
            return res.data;



    }catch(error){
        console.log(error)
        return 'error';

    }
}