const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('skullboard')
        .setDescription('View who has the top skulls in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const guild = await interaction.client.guilds.cache.get(process.env.GUILD_ID);
        const channel = await guild.channels.cache.get(process.env.SKULLBOARD_CHANNEL_ID);
        const leaderboard = new Map();
        const currentMonth = new Date().getMonth()


        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];



        // https://stackoverflow.com/questions/63322284/discord-js-get-an-array-of-all-messages-in-a-channel
        let messages = [];

        let message = await channel.messages
            .fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

        while (message) {
            await channel.messages
                .fetch({ limit: 100, before: message.id })
                .then(messagePage => {
                    messagePage.forEach(msg => messages.push(msg));

                    // Update our message pointer to be the last message on the page of messages
                    message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                });
        }

        console.log(messages)

        // Fetch last one hundred messages
        // await channel.messages.fetch({ limit: 100 }).then((messages) => {
        messages.map((message) => {

            let month = new Date(message.createdTimestamp).getMonth();

            if (month !== currentMonth) {
                // console.log(`skipping, ${month} does not match current month of ${currentMonth}`)
                return;
            }

            if (message.embeds) {
                message.embeds.map((embed) => {

                    let author = embed.data?.author?.name;
                    let title = embed.data.title;
                    let count = parseInt(title.replace(/💀/g, ""));

                    // Author hasn't been added yet
                    if (!leaderboard.has(author)) {
                        leaderboard.set(author, { count: count });
                        return;
                    }

                    let oldEntry = leaderboard.get(author);
                    let newCount = oldEntry.count + count;

                    leaderboard.set(author, { count: newCount })

                })
            }
        })
        // })

        // Convert the map to an array of entries
        const entriesArray = Array.from(leaderboard.entries());

        // Sort the array based on the count property in ascending order
        entriesArray.sort((a, b) => b[1].count - a[1].count);

        // Take the first 10 entries from the sorted array
        const top10Entries = entriesArray.slice(0, 10);

        // console.log(top10Entries)

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`Skullboard Top 10 of ${monthNames[currentMonth]}`)
            .setDescription(`
            ────────────────────────
            \n**#1** ${top10Entries[0][0]}: \`${top10Entries[0][1].count}\` Skulls
            \n**#2** ${top10Entries[1][0]}: \`${top10Entries[1][1].count}\` Skulls
            \n**#3** ${top10Entries[2][0]}: \`${top10Entries[2][1].count}\` Skulls
            \n**#4** ${top10Entries[3][0]}: \`${top10Entries[3][1].count}\` Skulls
            \n**#5** ${top10Entries[4][0]}: \`${top10Entries[4][1].count}\` Skulls
            \n**#6** ${top10Entries[5][0]}: \`${top10Entries[5][1].count}\` Skulls
            \n**#7** ${top10Entries[6][0]}: \`${top10Entries[6][1].count}\` Skulls
            \n**#8** ${top10Entries[7][0]}: \`${top10Entries[7][1].count}\` Skulls
            \n**#9** ${top10Entries[8][0]}: \`${top10Entries[8][1].count}\` Skulls
            \n**#10** ${top10Entries[9][0]}: \`${top10Entries[9][1].count}\` Skulls`)
            .setThumbnail("https://i.gifer.com/XwI7.gif")
            .setFooter({ text: "all skulls belong to their rightful owners" });

        await interaction.reply({ embeds: [embed] });
        return;
    }
};