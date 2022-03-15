
import nock from "nock"
import {postToSlack} from "../../../../src/lib/controllers/slack/slackHandler";

describe('works with async/await', () => {
    it.only('should  recieve back org names', async () => {

        nock('https://hooks.slack.com')
            .post('/T07BJB8CR/B036J2N91FE/GwTwCfJs1aqyUwSrVwLQmMQD')
            .reply(200, { channel: '#slack-snyk-app-test-channel', text: 'stringNames' });
        const data = await postToSlack();
        console.log(data)
        expect(data).toHaveProperty('text')
        })
    })


