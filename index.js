const express = require('express'),
    helmet = require('helmet'),
    Journl = require('journl'),
    config = require('./config'),
    fs = require('fs'),
    fetch = require('node-fetch');

const app = express();
global.log = new Journl();

const modules = {};
fs.readdirSync("./modules").forEach(m => {
    let fileName = m.replace(/\.[^/.]+$/, "");
    modules[fileName] = require(`./modules/${m}`);
    log.success(`Loaded ${fileName}`);
})

app.use(helmet())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hola');
})

app.get('/profile/:user', async (req, res) => {
    let params = req.params;
    let query = req.query;

    if (await modules.getUserData(params.user) === 404) return res.send(404);
    if (await modules.getUserData(params.user) === false) return res.send(500)

    if (query.style === 'list') {
        modules.generateUserImage.list(await modules.getUserData(params.user)).on('finish', () => {
            log.success(`Generated image for ${params.user}.`)
            res.sendFile(__dirname + `/images/${params.user}.png`)
        });
    } else {
        modules.generateUserImage.blocks(await modules.getUserData(params.user)).on('finish', () => {
            log.success(`Generated image for ${params.user}.`)
            res.sendFile(__dirname + `/images/${params.user}.png`)
        });
    }
})

app.listen(config.port, () => {
    log.info(`Running on port ${config.port}`);
});

