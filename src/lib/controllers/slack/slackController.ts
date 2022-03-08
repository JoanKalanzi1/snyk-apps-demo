
const axios = require('axios').default;

const slackToken = 'xoxb-7392382433-3200979732211-acsb3AXi5j6dUOIV4Ei5I67o';

run().catch(error => console.log(error));

 export default async  function run() {
    const url = 'https://hooks.slack.com/services/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';
    const res = await axios.post(url, {
        channel: '#slack-snyk-app-test-channel',
        text: 'Hello, World'
    }, {
        headers: { authorization : `Bearer ${slackToken}`}});

        console.log('Done', res.data)

    
}

console.log(run);
