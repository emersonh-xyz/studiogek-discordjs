const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        console.log(`${client.user.tag} is now ready`)

        client.user.setPresence({ activities: [{ name: '💀👑 explorer0123', type: ActivityType.Watching }], status: 'online' });

        // Check for new videos every set interval
        setInterval(client.checkVideo, 600000);
        setInterval(client.sendSkulls, 86400000)

    }
}