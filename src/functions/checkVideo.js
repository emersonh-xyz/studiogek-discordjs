const Parser = require("rss-parser");
const parser = new Parser();
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require("@discordjs/builders");
require("dotenv").config();

const { guildId } = process.env

module.exports = (client) => {


    client.checkVideo = async () => {

        console.log("📺 | Checking for new videos! ")
        const data = await parser.parseURL(
            "https://youtube.com/feeds/videos.xml?channel_id=UCvdcBgHnd2WgJoP1irXxg1g"
        )
            .catch(err => console.log(err));


        const rawData = fs.readFileSync(`${__dirname}/../json/video.json`);
        const jsonData = JSON.parse(rawData);

        // console.log(rawData, data);

        if (jsonData.id !== data.items[0].id) {



            const { title, link, id, author } = data.items[0]

            console.log(`✅ | New video found ${id}`)

            const guild = await client.guilds
                .cache.get(guildId);


            // Fetch the upload channel
            const uploadChannel = await guild.channels
                .fetch("1084327119259193344");



            // Fetch the logs channel
            const logs = await guild.channels
                .fetch("1084318629841088522");

            await logs.send(`**Log**: New video found \n**Title:** ${title} \n**Pushing to**: <#1084327119259193344>`)

            fs.writeFileSync(`${__dirname}/../json/video.json`, JSON.stringify({ id: data.items[0].id }));

            await uploadChannel.send(
                `New upload! \n\n**${title}**
                \n ${link}`
            )

        } else {
            console.log("❌ | No new videos were found")
        }
    }
};