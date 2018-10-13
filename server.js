const express = require('express');
const cors = require('cors');
const path = require('path');
const rp = require('request-promise');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

const config = {
    client_id: "2_K6k9Gv",
    client_secret: "xNZBXFm-QNK92-OPTwfKItae6OB2oTX_IfJc8dQUY5srMN_XISdn0TH92i6_asLX",
    username: "offinbed",
    password: "gfycatsucks",
}

const { client_secret, client_id, username, password } = config;

const router = express.Router();
const PORT = process.env.PORT || 8000;


const getClientAuth = (client_secret, client_id, username, password) => {
    const options = {
        method: 'POST',
        url: 'https://api.gfycat.com/v1/oauth/token',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*'
        },
        body: {
            grant_type: 'client_credentials',
            client_id,
            client_secret,
        },
        json: true,
    }

    return rp(options)
}

app.post('/getClientAuth', (req, res) => {
    getClientAuth(client_secret, client_id, username, password)
        .then(data => {
            res.send(data)
        })
        .catch(err => res.status(400).json(err))
})

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});