const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const increaseSkullCount = require('../functions/increaseSkulls');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction) {
        const guild = await reaction.client.guilds.cache.get(process.env.GUILD_ID);
        const channel = await guild.channels.fetch(process.env.SKULLBOARD_CHANNEL_ID);
        const currentMonth = new Date().getMonth();

        let send = true;
        let embedColor;
        let title;

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

        let month = new Date(reaction.message.createdTimestamp).getMonth();

        if (currentMonth !== month) {
            console.log('here')
            return;
        }
        
        // Check if the message was sent within the last 14 days. If not, return. Justice for GalaxyCat.
        if (reaction.message.createdTimestamp < new Date().setDate(new Date().getDate() - 14)) return;

        // 
        if (reaction._emoji.name === "💀" && reaction.count >= 7 && reaction.message.channelId != process.env.SKULLBOARD_CHANNEL_ID) {
            await channel.messages.fetch({ limit: 100 }).then(messages => {
                messages.forEach(message => {
                    if (reaction.message.id === message.embeds[0]?.data?.footer?.text) {
                        // channel.send(`\`Found a match, editing old embed ${reaction.message.id} with new reaction count of ${reaction.count}\``)
                        const newEmbed = EmbedBuilder.from(message.embeds[0]).setTitle(title);
                        message.edit({ embeds: [newEmbed] })
                        send = false;

                        increaseSkullCount(reaction.message.author.username, reaction.message.author.id, 1);
                        return
                    }
                })
            })

            // Build the embed;
            const [attachments] = reaction.message.attachments.values();
            const url = attachments ? attachments.url : null;

            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`${title}`)
                .setAuthor({ name: `${reaction.message.author.username}`, iconURL: reaction.message.author.avatarURL() })
                .setDescription(reaction.message.content ? reaction.message.content : null)
                .addFields({ name: "Original post", value: `${reaction.message.url}` })
                .setImage(url)
                .setTimestamp()
                .setFooter({ text: reaction.message.id });

            if (send) {
                channel.send({ embeds: [embed] })
                increaseSkullCount(reaction.message.author.username, reaction.message.author.id, reaction.count);
            }

        }
    }
}


