const Parser = require("rss-parser");
const parser = new Parser();
const fs = require('fs');

module.exports = (client) => {
    client.checkVideo = async () => {
        const data = await parser().parseURL(
            "https://youtube.com/feeds/videos.xml?channel_id=UCvdcBgHnd2WgJoP1irXxg1g"
        );
    }

    const rawData = fs.readdirSync(`${__dirname}/../../json/video.json`)

    console.log(rawData, data);

}