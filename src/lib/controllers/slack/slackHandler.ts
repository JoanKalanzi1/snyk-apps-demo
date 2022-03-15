
const axios = require('axios').default;

// import  {Envars } from '../../types/envars';
import { fetchOrgNames } from "../getorg/orgsHandlers";
const url = 'https://hooks.slack.com/services/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';
 

 export async  function postToSlack(): Promise<any> {
     try {
        const slackToken = process.env.SLACK_TOKEN as string;
        const names = await fetchOrgNames()
        const stringNames = names.toString()
        console.log(stringNames, "tsringNm");

        const res = await axios.post(url, {
            channel: '#slack-snyk-app-test-channel',
            text: stringNames,
        }, {
            headers: { authorization : `Token${slackToken}`}});
            return res.data;

     }catch(error){
        console.log(error)
        return 'error';
     }

    
}
