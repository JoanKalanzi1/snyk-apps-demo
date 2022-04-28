
import { Envars } from '../../types'
const url = 'https://slack.com/api/oauth.v2.access';
const axios = require('axios').default;
import qs from 'qs';
export default async function fetchAccessToken(code: string) {
try {
    const response = await axios(url,{
        method: 'POST',
        data:  qs.stringify(
            {
                client_id : process.env[Envars.slackclientid] as string,
                client_secret : process.env[Envars.slackclientsecret] as string,
                redirect_uri : process.env[Envars.slackredirectUri] as string,
                code : code,
                single_channel: false,
    
            },
        ), 
        headers: { 'content-type' :'application/x-www-form-urlencoded'}

    })
    return response;

} catch(error: any){
    return (error);
}
}
