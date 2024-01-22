const { EmbedBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
require("dotenv").config();
const { guildId } = process.env

module.exports = (client) => {

    client.sendSkulls = async () => {

        const scoreboard = JSON.parse(fs.readFileSync(`${__dirname}/../json/skulls.json`));
        const guild = await client.guilds.cache.get(guildId);
        const channel = await guild.channels.fetch("1164556619628171366");

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
};