const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patreon')
        .setDescription('Information about the Studio Gek Patreon'),
    async execute(interaction) {


        const patreonEmbed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('Studio Gek Patreon')
            .setURL('https://www.patreon.com/studiogek/')
            .setDescription("Can't wait until our next upload? Unlike our Youtube videos, you can find our raw, uncut footage here. Thanks for your support and we hope you enjoy!")
            .setThumbnail('https://c5.patreon.com/external/favicon/android-chrome-512x512.png')
            .addFields(

                { name: '**Chunin Package**', value: 'Exclusive Poll Voting Power', inline: true },
                { name: '**Jonin Package**', value: 'Chunin + \nFull, Uncut Reaction Footage', inline: true },
                { name: '**Hokage Package**', value: 'Jonin + \nOne Week Early Access', inline: true },
                { name: '\u200B', value: 'https://www.patreon.com/studiogek/', inline: true }

            )


        await interaction.reply({ embeds: [patreonEmbed], ephemeral: true });
        return;
    },
};