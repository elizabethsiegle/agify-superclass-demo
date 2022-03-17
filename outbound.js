const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendMsgs = async() => {
    const msgs = await client.messages.list({to: '+19165456664'});
    const uniqueNums = new Set(msgs.map(msg => msg.from));
    for(const num of uniqueNums) {
        const call = await client.calls.create({
            to: num,
            from: '+19165456664',
            url: 'https://lizzie.ngrok.io/play-msg'
        });
        console.log(call.sid)
    }
}
sendMsgs()
.then(() => console.log("done"))
.catch((err) => console.log(err));