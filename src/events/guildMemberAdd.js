require("dotenv").config();
let moment = require('moment');
const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember } = require("discord.js");
const { logsId } = process.env;


module.exports = {
    name: "guildMemberAdd",


    execute(member) {
        const { user, guild } = member;

        const welcomeChannel = member.guild.channels.cache.get('1084317814405484545');
        const logsChannel = member.guild.channels.cache.get(logsId);

        const welcomeMessage = `Welcome <@${member.id}> to the Discord Server!`
        const memberCount = moment.localeData().ordinal(guild.memberCount);

        const gifArray = [
            "https://media1.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif",
            "https://media.giphy.com/media/xUPGcC4A6ElcqtUJck/giphy.gif",
            "https://media.giphy.com/media/9KCPkAcRqU9j2/giphy.gif",
            "https://media.giphy.com/media/FuUFDCe51pDKo/giphy.gif",
            "https://media.giphy.com/media/vcY5zhQ9QDhCw/giphy.gif",
            "https://media.giphy.com/media/5IcKBfNkfbYpG/giphy.gif",
            "https://media.giphy.com/media/c4sF8kUpkL1Cw/giphy.gif",
            "https://media.giphy.com/media/wJ8QGSXasDvPy/giphy.gif",
        ]

        const gif = gifArray[Math.floor(Math.random() * gifArray.length)];

        console.log(member)

        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL()}` })
            .setImage(gif)
            .setTitle(`**Welcome to Studio Gek, ${user.username}**`)
            .setColor(0xE74C4C)
            .setDescription("- View our rules in <#1084315963232628776>\n- Get your roles in <#1086118916557897779>")
            .setFooter({ text: `you are our ${memberCount} member!` })
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] })
    }
}