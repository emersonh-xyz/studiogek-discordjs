const Parser = require("rss-parser");
const parser = new Parser();
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require("@discordjs/builders");
require("dotenv").config();

const { guildId } = process.env

module.exports = (client) => {



    function checkShowTitle(title) {

        // Check titles for a match
        let aot = title.toLowerCase().includes("attack on titan");
        let lastOfUs = title.toLowerCase().includes("the last of us");
        let mandolorian = title.toLowerCase().includes("the mandalorian");

        // Show objects
        let aotObject = {
            display: "Attack on Titan",
            role: "1085213383315443722"
        }

        let lastOfUsObject = {
            display: "Last Of Us",
            role: "1085213455289683969"
        }

        let mandolrianObject = {
            display: "The Mandalorian",
            role: "1085213424658686003"
        }

        // Just return the respected object if one of these is true
        if (aot) {
            return aotObject;
        } else if (lastOfUs) {
            return lastOfUsObject
        } else if (mandolorian) {
            return mandolrianObject
        } else {
            return "null"
        }
    }

    client.checkVideo = async () => {

        console.log("📺 | Checking for new videos! ")

        // Parse YouTube link for new shit
        const data = await parser.parseURL(
            "https://youtube.com/feeds/videos.xml?channel_id=UCvdcBgHnd2WgJoP1irXxg1g"
        )
            .catch(err => console.log(err));

        // Get our Raw Data and Parse to JSON
        const rawData = fs.readFileSync(`${__dirname}/../json/video.json`);
        const jsonData = JSON.parse(rawData);


        // Check if there is a new ID in the .JSON
        if (jsonData.id !== data.items[0].id) {


            // A new id was compared
            console.log(`✅ | New video found ${title}`);

            // Get all of our properties from the object
            const { title, link, id, author } = data.items[0];

            // Look up the show title
            let show = checkShowTitle(title);

            // Create a new Embed for logs
            const logsEmbed = new EmbedBuilder()
                .setColor(0xFFFFFF)
                .setTitle('Gek Logs')
                .setDescription("New YouTube Video")
                .setThumbnail('https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png')
                .addFields(

                    { name: '**Title**', value: `${title}`, inline: false },
                    { name: '**Show**', value: `${show.display}`, inline: false },
                    { name: '**Channel**', value: '<#1084327119259193344>', inline: false },

                )
                .setTimestamp();



            // Fetch the guild id
            const guild = await client.guilds
                .cache.get(guildId);

            // Fetch the upload channel
            const uploadChannel = await guild.channels
                .fetch("1084327119259193344");

            // Fetch the logs channel
            const logs = await guild.channels
                .fetch("1084318629841088522");

            // Send a log 
            await logs.send({ embeds: [logsEmbed] });

            // Update JSON to have a new ID
            fs.writeFileSync(`${__dirname}/../json/video.json`, JSON.stringify({ id: data.items[0].id }));

            // If we have a role then send it in the message, otherwise don't
            if (show.role) {
                await uploadChannel.send(`New upload! <@&${show.role}> \n\n**${title}** \n${link}`);
            } else {
                await uploadChannel.send(`New upload! \n\n**${title}** \n${link}`);
            }


        } else {
            console.log("❌ | No new videos were found");
        }
    }
};