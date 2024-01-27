const { EmbedBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
require("dotenv").config();

module.exports = (client) => {

    client.sendSkulls = async () => {

        const scoreboard = JSON.parse(fs.readFileSync(`${__dirname}/../json/skulls.json`));
        const guild = await client.guilds.cache.get(process.env.GUILD_ID);
        const channel = await guild.channels.fetch(process.env.SKULLBOARD_CHANNEL_ID);

        const role = guild.roles.cache.find(role => role.name === "Skull King");
        const oldKing = JSON.parse(fs.readFileSync(`${__dirname}/../json/skullking.json`))
        const oldMember = await guild.members.fetch(oldKing.id);

        oldMember.roles.remove(role)

        console.log('Removing old king role from ', oldKing.id)

        let max = 0;
        let username;
        let id;

        for (let item of scoreboard) {
            if (max < item.count) {
                max = item.count;
                username = item.user;
                id = item.userId;
            }
        }

        if(max >= 7) {
            const user = await client.users.fetch(id)
            const member = await guild.members.fetch(id);

            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle(`${user.username} had the top skulls of today with **${max}**!`)
                .setDescription(`<@${id}> Rewarded <@&1196958513667260486> for 24 hours`)
                .setTimestamp()
                .setAuthor({ name: "Skullboard", iconURL: "https://media4.giphy.com/media/ySeqU9tC1eFjy/200w.gif" })
                .setThumbnail(user.displayAvatarURL())

            await channel.send({ embeds: [embed] });
            member.roles.add(role)

            client.user.setPresence({ activities: [{ name: `💀👑 ${user.username}`, type: ActivityType.Watching }], status: 'online' });

            fs.writeFileSync(`${__dirname}/../json/skullking.json`, JSON.stringify({ id: id }));
            fs.writeFileSync(`${__dirname}/../json/skulls.json`, JSON.stringify([{}]));
        }
        else {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle(`Nobody had the top skulls of today!`)
                .setDescription(`No one was rewarded <@&1196958513667260486> :(`)
                .setTimestamp()
                .setAuthor({ name: "Skullboard", iconURL: "https://media4.giphy.com/media/ySeqU9tC1eFjy/200w.gif" })

            await channel.send({ embeds: [embed] });
            client.user.setPresence({ activities: [{ name: `💀👑 Nobody`, type: ActivityType.Watching }], status: 'online' });
            fs.writeFileSync(`${__dirname}/../json/skulls.json`, JSON.stringify([{}]));
        }
    }
};