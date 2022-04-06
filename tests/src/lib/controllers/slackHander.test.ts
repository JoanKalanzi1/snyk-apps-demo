
import nock from "nock"
import {postToSlack ,postProjectNames} from "../../../../src/lib/controllers/slack/slackHandler";

describe('works with async/await', () => {
    it.only('should recieve back org names', async () => {

        nock('https://hooks.slack.com')
            .post('/services/T07BJB8CR/B036J2N91FE/GwTwCfJs1aqyUwSrVwLQmMQD')
            .reply(200, { text: "response text" });
        const data = await postToSlack(["hello world"]);
        expect(data).toHaveProperty('text')
        })
    })

    // describe('works with async/await', () => {
    //     it.only('should recieve back org names', async () => {
    
    //         nock('https://hooks.slack.com')
    //             .post('/services/T07BJB8CR/B036J2N91FE/GwTwCfJs1aqyUwSrVwLQmMQD')
    //             .reply(200, { text: "response text" });
    //         const data = await postProjectNames(["hello world"]);
    //         expect(data).toHaveProperty('text')
    //         })
    //     })
    
        


