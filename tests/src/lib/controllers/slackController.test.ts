import { string } from "yargs";
import  nock from "nock"
import run from  "../src/lib/controllers/slack/slackController";



describe('works with async/await',async () => {
    it('should  recieve back channel name', async() => {
        
        nock('https://hooks.slack.com/services/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')
        .post('/post', { channnel: '#slack-snyk-app-test-channel', text:  'Hello, World!' })
        .reply(200, { status: 'OK' });
      

        const slackController= await run();
        expect(slackController).toMatchObject({
            statusCode: 200,
            body: {
                channel: expect.any(string),
                text: expect.any(string)
            }
        })
    

    } )
    
})
