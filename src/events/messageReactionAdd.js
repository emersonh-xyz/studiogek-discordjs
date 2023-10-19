const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const { guildId } = process.env

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {

        // When a reaction is received, check if the structure is partial
        const guild = await reaction.client.guilds.cache.get(guildId);
        const channel = await guild.channels.fetch("1164556619628171366")


        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        // Now the message has been cached and is fully available
        // channel.send(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
        // // The reaction is now also fully available and the properties will be reflected accurately:
        // channel.send(`${reaction.count} user(s) have given the same reaction to this message!`);

        if (reaction._emoji.name === "💀" && reaction.count >= 8) {
            channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(message => {
                    if (reaction.message.id === message.embeds[0]?.data?.footer?.text) {
                        console.log('Found a match, deleting old embed')
                        // const newEmbed = EmbedBuilder.from(message.embeds[0]).setTitle(`💀 ${reaction.count}`);
                        message.delete();
                    }
                })
            })

            const [attachments] = reaction.message.attachments.values();
            const url = attachments ? attachments.url : null;

            let embedColor;
            let title;

            if (reaction.count < 10) {
                embedColor = "FF8A8A";
                title = `💀 ${reaction.count}`
            } else if (reaction.count >= 10 && reaction.count < 15) {
                embedColor = "FF5C5C"
                title = `💀💀 ${reaction.count}`
            } else if (reaction.cont >= 15 && reaction.count < 19) {
                embedColor = "FF2E2E"
                title = `💀💀💀 ${reaction.count}`
            } else {
                embedColor = "FF0000"
                title = `💀💀💀💀 ${reaction.count}`

            }

            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`${title}`)
                .setAuthor({ name: `${reaction.message.author.username}`, iconURL: reaction.message.author.avatarURL() })
                .setDescription(reaction.message.content ? reaction.message.content : null)
                .addFields({ name: "Original post", value: `${reaction.message.url}` })
                .setImage(url)
                .setTimestamp()
                .setFooter({ text: reaction.message.id });

            channel.send({ embeds: [embed] })

        }
    }
}


