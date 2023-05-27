const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders')
const fs = require("fs")
const jsonFile = require("../json/shows.json")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Adds a new show alert with a role')
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("The role to add with a show")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("The title of the show to add")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


    async execute(interaction) {

        if (interaction.user.id !== "117506271715917829") {
            await interaction.reply({ content: "Nice try buddy 😼", ephemeral: true })
        }

        const role = interaction.options.getRole('role');
        const showTitle = interaction.options.getString('title');

        const show = {
            "name": showTitle,
            "role": role.id
        }

        const rawData = fs.readFileSync(`${__dirname}/../json/shows.json`);
        const jsonData = JSON.parse(rawData);

        jsonData.push(show);

        fs.writeFileSync(`${__dirname}/../json/shows.json`, JSON.stringify(jsonData));


        await interaction.reply(`Successfully added new entry\n\`\`\`${JSON.stringify(jsonData)}\`\`\``);
        return;
    },
};