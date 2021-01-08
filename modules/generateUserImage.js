const canvas = require('canvas'),
    fs = require('fs'),
    config = require('../config');

module.exports.list = (data) => {
    canvas.registerFont('./resources/fonts/Roboto-Regular.ttf', {family: 'Roboto Regular'});
    canvas.registerFont('./resources/fonts/Roboto-Bold.ttf', {family: 'Roboto Bold'})

    let c = canvas.createCanvas(512, 256);
    let ctx = c.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = 'black';
    ctx.font = '24px "Roboto Regular"';

    if (data.name) {
        ctx.fillText(`${data.name} (${data.id.replace('tr:', '')})`, 220, 70)
    } else {
        ctx.fillText(`${data.id.replace('tr:', '')}`, 220, 70)
    }

    ctx.font = '15px "Roboto Regular"'
    ctx.fillText(`Won ${data.tstats.gamesWon} out of ${data.tstats.cg} games.`, 220, 130);
    ctx.fillText(`All-time Average: ${Math.round(data.tstats.wpm)}WPM`, 220, 150);
    ctx.fillText(`Best Speed: ${Math.round(data.tstats.bestGameWpm)}WPM`, 220, 170)

    canvas.loadImage(`./resources/icons/${data.country}.png`).then(image => {
        ctx.drawImage(image, 220, 80, 30, 20)
    })

    if (data.premium) {
        canvas.loadImage('./resources/icons/crown.png').then(image => {
            ctx.drawImage(image, 260, 80, 20, 20)
        })
    }

    ctx.rect(30, 55, 150, 150);
    ctx.strokeStyle = "#005894";
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.font = '40px "Roboto Regular"'
    ctx.fillStyle = "#005894";
    ctx.fillText(`${Math.round(data.tstats.recentAvgWpm)}`, 50, 120)

    ctx.font = '40px "Roboto Bold"'
    ctx.fillText(`WPM`, 50, 170)

    ctx.font = '20px "Roboto Regular"'
    ctx.fillText(config.typeracer.levels[data.tstats.level], 220, 205)

    let out = fs.createWriteStream(__dirname + `/../images/${data.id.replace('tr:', '')}.png`);
    let stream = c.createPNGStream();
    stream.pipe(out);
    return out
}

module.exports.blocks = (data) => {
    canvas.registerFont('./resources/fonts/Roboto-Regular.ttf', {family: 'Roboto Regular'});
    canvas.registerFont('./resources/fonts/Roboto-Bold.ttf', {family: 'Roboto Bold'})

    let c = canvas.createCanvas(512, 256);
    let ctx = c.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = 'black';
    ctx.font = '24px "Roboto Regular"';

    if (data.name) {
        ctx.fillText(`${data.name} (${data.id.replace('tr:', '')})`, 220, 70)
    } else {
        ctx.fillText(`${data.id.replace('tr:', '')}`, 220, 70)
    }


    ctx.font = '15px "Roboto Regular"'
    ctx.fillText('Win Rate', 220, 160);
    ctx.fillText('All-time', 310, 160);
    ctx.fillText('Best', 400, 160);

    ctx.font = '15px "Roboto Bold"'
    ctx.fillText(`${Math.round(data.tstats.gamesWon / data.tstats.cg * 100)}%`, 220, 140);
    ctx.fillText(`${Math.round(data.tstats.wpm)}wpm`, 310, 140);
    ctx.fillText(`${Math.round(data.tstats.bestGameWpm)}wpm`, 400, 140)

    canvas.loadImage(`./resources/icons/${data.country}.png`).then(image => {
        ctx.drawImage(image, 220, 80, 30, 20)
    })

    if (data.premium) {
        canvas.loadImage('./resources/icons/crown.png').then(image => {
            ctx.drawImage(image, 260, 80, 20, 20)
        })
    }

    ctx.rect(30, 55, 150, 150);
    ctx.strokeStyle = "#005894";
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.font = '40px "Roboto Regular"'
    ctx.fillStyle = "#005894";
    ctx.fillText(`${Math.round(data.tstats.recentAvgWpm)}`, 50, 120)

    ctx.font = '40px "Roboto Bold"'
    ctx.fillText(`WPM`, 50, 170)

    ctx.font = '20px "Roboto Regular"'
    ctx.fillText(config.typeracer.levels[data.tstats.level], 220, 205)

    let out = fs.createWriteStream(__dirname + `/../images/${data.id.replace('tr:', '')}.png`);
    let stream = c.createPNGStream();
    stream.pipe(out);
    return out;
}