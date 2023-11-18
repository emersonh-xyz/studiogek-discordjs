const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,

    async execute(client) {

        console.log(`${client.user.tag} is now ready`)

        client.user.setPresence({ activities: [{ name: 'beep boop bop', type: ActivityType.Listening }], status: 'online' });

        // Check for a new video on start-up
        client.checkVideo()

        // Check for new videos every set interval
        setInterval(client.checkVideo, 600000);


    }
}