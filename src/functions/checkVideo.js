const Parser = require("rss-parser");
const parser = new Parser();
const fs = require('fs');
const shows = require("../json/shows.json")

require("dotenv").config();

const { guildId } = process.env

module.exports = (client) => {



    function checkShowTitle(title) {


        // Loop through shows json and compare for a title match
        for (let i = 0; i < shows.length; i++) {
            let show = shows[i];
            if (title.toLowerCase().includes(show.name)) {
                console.log("Found a match ", show)
                return show;
            }
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


            // Get all of our properties from the object
            const { title, link, id, author } = data.items[0];

            console.log(`✅ | New video found ${title}`);

            // Look up the show title
            let show = checkShowTitle(title);

            // Create a new Embed for logs
            // const logsEmbed = new EmbedBuilder()
            //     .setColor(0xFFFFFF)
            //     .setTitle('Gek Logs')
            //     .setDescription("New YouTube Video")
            //     .setThumbnail('https://cdn3.iconfinder.com/data/icons/social-network-30/512/social-06-512.png')
            //     .addFields(
            //         { name: '**Title**', value: `${title}`, inline: false },
            //         { name: '**Show**', value: `${show?.name}`, inline: false },
            //         { name: '**Channel**', value: '<#1084327119259193344>', inline: false },

            //     )
            //     .setTimestamp();

            // Fetch the guild id
            const guild = await client.guilds
                .cache.get(guildId);

            // Fetch the upload channel
            const uploadChannel = await guild.channels
                .fetch("1084327119259193344");

            // Fetch the logs channel
            // const logs = await guild.channels
            //     .fetch("1084318629841088522");

            // Send a log 
            // await logs.send({ embeds: [logsEmbed] });

            // Update video.json with the new ID
            fs.writeFileSync(`${__dirname}/../json/video.json`, JSON.stringify({ id: data.items[0].id }));

            // If we have a role then send it in the message, otherwise dont
            if (show?.role) {
                await uploadChannel.send(`<@&${show.role}> \n\n**${title}** \n\n${link}`);
            } else {
                await uploadChannel.send(`New upload! \n\n**${title}** \n\n${link}`);
            }

        } else {
            console.log("❌ | No new videos were found");
        }
    }
};