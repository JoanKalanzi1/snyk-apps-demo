import { slackcallbackController } from '../slack/slackcallbackController';
import type { NextFunction, Request, Response } from 'express';
import { Envars } from '../../types'
const FormData = require('form-data');
const url = 'https://slack.com/api/oauth.access';
const axios = require('axios').default;
import qs from 'qs';
// interface AccessToken {
//     access_token: string,
//     scope: [],
//     team_name: string,
//     team_id: string,
//     enterprise_id: null,
//     incoming_webhook: object;
// }



 export default async function fetchAccessToken(code: string) {
try {
    const response = await axios(url,{
        method: 'POST',
        data:  qs.stringify(
            {
                client_id : process.env[Envars.slackclientid] as string,
                clientSecret : process.env[Envars.slackclientsecret] as string,
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
