const Parser = require("rss-parser");
const parser = new Parser();
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require("@discordjs/builders");
require("dotenv").config();

const { guildId } = process.env

module.exports = (client) => {


    client.checkVideo = async () => {
        const data = await parser.parseURL(
            "https://youtube.com/feeds/videos.xml?channel_id=UCvdcBgHnd2WgJoP1irXxg1g"
        )
            .catch(err => console.log(err));


        const rawData = fs.readFileSync(`${__dirname}/../json/video.json`);
        const jsonData = JSON.parse(rawData);

        // console.log(rawData, data);

        if (jsonData.id !== data.items[0].id) {

            console.log("New video found...")

            fs.writeFileSync(`${__dirname}/../json/video.json`, JSON.stringify({ id: data.items[0].id }));

            const guild = await client.guilds
                .cache.get(guildId)

            const channel = await guild.channels
                .fetch("1084327119259193344")


            const { title, link, id, author } = data.items[0]

            await channel.send(
                `@here New upload! \n\n**${title}**
                \n ${link}`
            )
        }
    }
};