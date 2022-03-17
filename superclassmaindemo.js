const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.type("html");
  res.send(`
    <h1>Agify!!</h1>
    <h2>How old does your name sound like? </h2>
    <form action="/submit-info" method="POST">
      <p><label for="info">What is your name?</label></p>
      <p><textarea id="info" name="info"></textarea></p>
      <button type="submit">Submit your name!</button>
    </form>
  `);
});

app.post("/submit-info", async (req, res) => {
  const info = req.body.info;
  const name = await getAge(info);
  res.type("html");
  res.send(`
  <h1>Thank you for your submission!</h1>
  <p>You entered:</p>
  <blockquote>${info}</blockquote>
  <p>Your predicted age, ${name.age}:</p>
  <img src="${name.imageUrl}" alt="${name.age}" />
  `);
}); 

async function getAge(info) {
  const response = await fetch(`https://api.agify.io?name=${info}`);
  const results = await response.json();
  console.log(results);
  return {
    age: results.age,
    name: info,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/MontreGousset001.jpg/220px-MontreGousset001.jpg"
  };
}
app.post('/sms-submit', async (req,res) => {
    const text = req.body.Body;
    console.log(`text ${text}`);
    const resp = await getAge(text);
    res.type("xml");
    res.send(`
    <Response>
    <Message>
    ${resp.name} is predicted to be ${resp.age}
    </Message>
    </Response>
    `);
})


app.post("/play-msg", (req, res) => {
    res.type("xml");
    res.send(`
      <Response>
        <Play>https://demo.twilio.com/docs/classic.mp3</Play>
      </Response>
    `);
  });

console.log(`Server is listening on port ${PORT}`);
app.listen(PORT);