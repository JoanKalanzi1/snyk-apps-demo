
import { User } from '../../utils/sqliteDatabase/dbmodel'

interface SlackData {
    app_id: string;
    access_token: string;
    token_type: string;
    bot_user_id:string;
    incoming_webhook : {
        channel: string;
        channel_id:string
        scopes: string;
        configuration_url: string;
        url: string;
    }
}


export async function updateUserDatabase(slackRes:SlackData) {
    try{
      await User.upsert({
              id :1,
              slack_app_id: slackRes.app_id,
              slack_channel: slackRes.incoming_webhook.channel,
              slack_scopes: slackRes.incoming_webhook.channel_id,
              slack_configuration_url: slackRes.incoming_webhook.configuration_url,
              slack_url: slackRes.incoming_webhook.url,
              slack_access_token: slackRes.access_token,
              slack_token_type: slackRes.token_type,
              slack_bot_user_id: slackRes.bot_user_id

      })
    }catch(error){
        console.log(error)
    }
}