// const { Events } = require('discord.js');

// const { guildId } = process.env

// module.exports = {
//     name: "messageCreate",
//     async execute(message) {

//         if (message.author.bot) return;


//         // skullChannel.send(message);
//         // message.channel.send('hi');
//         const guild = await message.client.guilds.cache.get(guildId);

//         const channel = await guild.channels.fetch("1163842054850347081")

//         const collectorFilter = (reaction) => {
//             return ['💀'].includes(reaction.emoji.name);
//         };

//         message.awaitReactions({ filter: collectorFilter, max: 1, time: 300000, errors: ['time'] })
//             .then(collected => {
//                 const reaction = collected.first();
//                 connsole.log(collected);

//                 if (reaction.emoji.name === '💀') {
//                     channel.send(`${message.author.username} reacted with [💀] on <#${message.id}>`);
//                     ch
//                 }
//             })
//         // message.react('💀')

//         // await channel.send(message.author.username)
//     }
// };