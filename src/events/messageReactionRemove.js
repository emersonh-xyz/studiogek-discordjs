const { Events } = require('discord.js');
const increaseSkullCount = require('../functions/increaseSkulls');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.MessageReactionRemove,
	async execute(reaction) {
        const guild = await reaction.client.guilds.cache.get(process.env.GUILD_ID);
        const channel = await guild.channels.fetch(process.env.SKULLBOARD_CHANNEL_ID);
        // When a reaction is received, check if the structure is partial
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
		
        if (reaction.count < 10) {
            embedColor = "FF8A8A";
            title = `💀 ${reaction.count}`
        } else if (reaction.count >= 10 && reaction.count < 15) {
            embedColor = "FF5C5C"
            title = `💀💀 ${reaction.count}`
        } else if (reaction.count >= 15 && reaction.count < 19) {
            embedColor = "FF2E2E"
            title = `💀💀💀 ${reaction.count}`
        } else {
            embedColor = "FF0000"
            title = `💀💀💀💀 ${reaction.count}`

        }

        if (reaction._emoji.name === "💀" && reaction.count >= 1 && reaction.message.channelId != process.env.SKULLBOARD_CHANNEL_ID) {
            console.log("test");
            await channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(message => {
                    if (reaction.message.id === message.embeds[0]?.data?.footer?.text) {
                        // channel.send(`\`Found a match, editing old embed ${reaction.message.id} with new reaction count of ${reaction.count}\``)
                        const newEmbed = EmbedBuilder.from(message.embeds[0]).setTitle(title);
                        message.edit({ embeds: [newEmbed] })
                        send = false;

                        increaseSkullCount(reaction.message.author.username, reaction.message.author.id, -1);
                        return
                    }
                })
            })
        }
	},
};
