const { EmbedBuilder } = require("@discordjs/builders");
const { GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",


    execute(member) {
        const { user, guild } = member;
        const memberLogs = member.guild.channels.cache.get('1084317814405484545')
        const welcomeMessage = `Welcome <@${member.id}> to the **Studio Gek** Discord Server!`


        // const welcomeEmbed = new EmbedBuilder()
        //     .setTitle('**Welcome to Studio Gek**')
        //     .setColor(0xE7362D)
        //     .setDescription(welcomeMessage)
        //     .addFields(
        //         { name: 'Total member count:', value: `${guild.memberCount}` }
        //     )
        //     .setThumbnail('https://media.tenor.com/Jb4AgNt1T3oAAAAC/attack-on-titan-aot.gif')
        //     .setTimestamp();

        memberLogs.send(welcomeMessage)
        console.log(`${member.id} joined the guild.`)
    }
}