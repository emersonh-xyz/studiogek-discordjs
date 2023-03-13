const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('patreon')
        .setDescription('Replies with the link to the Patreon'),
    async execute(interaction) {



        const patreonEmbed = new EmbedBuilder()
            .setTitle('**Patreon**')
            .setColor(0xE7362D)
            .setDescription("Our patreon can be found at ")
            .addFields(
                { name: 'Total member count:', value: `${guild.memberCount}` }
            )
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Patreon_logo.svg/2048px-Patreon_logo.svg.png')
            .setTimestamp();



        await interaction.reply({ content: 'Our patreon can be found at https://www.patreon.com/studiogek/', ephemeral: true });
        return;
    },
};