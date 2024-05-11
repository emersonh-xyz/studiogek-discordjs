const { Events } = require('discord.js');
const { guildId } = process.env
// import the number from the numbers file
const fs = require('fs')

module.exports = {
    name: "messageCreate",
    async execute(message) {

        try {
            if (message.author.bot) return;
            if (message.channel.id !== process.env.COUNTING_CHANNEL_ID) return;

            const client = await message.client
            const channel = await client.channels.fetch(process.env.COUNTING_CHANNEL_ID).catch((e) => console.error(e))

            const number = JSON.parse(fs.readFileSync(`${__dirname}/../json/number.json`)).number;
            const nextNumber = number + 1;

            if (parseInt(message.content) === nextNumber) {
                // Update the number in the json file
                fs.writeFileSync(`${__dirname}/../json/number.json`, JSON.stringify({ number: nextNumber }));
            } else {
                message.delete();
                const member = await message.guild.members.fetch(message.author.id);
                member.kick('You broke the counting game!')
                    .then(() => {
                        channel.send(`**${message.author.tag}** doesn't know how to count! They have been kicked from the server.`);
                    })
                    .catch(console.error);
            }

        } catch (e) {
            console.error(e)
        }


    }
}