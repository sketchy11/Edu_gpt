const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY'  // Replace this with your OpenAI key
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
