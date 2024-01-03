const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const {Configuration, OpenAiApi} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAiApi(configuration);

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.post('/get-script', async(req, res) => {

    try {
        const response = await openai.createCompletion({
            model:"Meditation Guide",
            prompt: req.body.prompt
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
