const express = require('express');
const app = express();
const PORT = 3000; 
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const objectURL = {
    horse: [['зебра', 'https://ru.wikipedia.org/wiki/%D0%97%D0%B5%D0%B1%D1%80%D1%8B'],
    ['ослы', 'https://ru.wikipedia.org/wiki/%D0%94%D0%BE%D0%BC%D0%B0%D1%88%D0%BD%D0%B8%D0%B9_%D0%BE%D1%81%D1%91%D0%BB'],
    ['лошади', 'https://ru.wikipedia.org/wiki/%D0%9B%D0%BE%D1%88%D0%B0%D0%B4%D0%B8']],

    memes: [['постирония', 'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%BD%D0%B8%D1%8F'],
    ['покер феис', 'https://ru.wikipedia.org/wiki/Poker_face'],
    ['мемы', 'https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B5%D0%BC']],

    rap: [['сикс наин', 'https://ru.wikipedia.org/wiki/6ix9ine'],
    ['моргештерн', 'https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%80%D0%B3%D0%B5%D0%BD%D1%88%D1%82%D0%B5%D1%80%D0%BD'],
    ['кизару', 'https://ru.wikipedia.org/wiki/Kizaru']],

    noLink: [['ненашел или пробел', 'err']]
};

const keyWords = ['horse', 'horse', 'rap'];

app.get('/', (req, res) => {
    res.send(`не сюда зашел`);
});

app.post('/', (req, res) => {
    let sentWord = req.body.text;
    if (keyWords.includes(sentWord)) {
        for (let i of Object.entries(objectURL)) {
            if (i[0] == sentWord) {
                res.send({
                    'links': i[1]
                });
                break;
            }
        }
    } else {
        res.send({
            'links': objectURL.noLink
        });
    }
});

app.post('/links', (req, res) => {
    var request = require('request');

    var URL = req.body.text;
    request(URL, function (err, resp, body) {
        if (err) throw err;
        res.send({"result": body});
    });
});

app.listen(PORT, () => {
    console.log(`заходи вс код короче и запускаи лаив сервер`);
});
