const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        console.log(`${client.user.tag} is now ready`)
        client.user.setPresence({ activities: [{ name: 'Attack on Titan', type: ActivityType.Watching }], status: 'online' });

        // Check for new videos every set interval
        setInterval(client.checkVideo, 30000);


    }
}