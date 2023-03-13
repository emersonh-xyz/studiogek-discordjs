const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patreon')
        .setDescription('Replies with the link to the Patreon'),
    async execute(interaction) {

        await interaction.reply({ content: 'https://www.patreon.com/studiogek/', ephemeral: true });
        return;
    },
};